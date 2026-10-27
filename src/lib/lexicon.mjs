/**
 * 词条表（Lexicon）
 * ------------------------------------------------------------------
 * 直接扫描 src/content 下的 Markdown 文件，产出：
 *   1. entries  —— 所有可链接的词条（名字 / 英文名 / 别名 / 目标地址）
 *   2. mentions —— 反向引用：哪些档案的正文里提到了本词条
 *
 * 为什么要自己扫文件，而不用 getCollection？
 * 因为 remark 插件是在 astro.config.mjs 里注册的，那时内容集合还没加载。
 * 这里只解析 frontmatter 里几个简单字段，不依赖任何 YAML 库。
 * 扫描结果按文件签名缓存；文件有增删改时会自动重扫（dev 模式下也生效）。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CONTENT_DIR = fileURLToPath(new URL('../content/', import.meta.url));

/** 五类档案：目录名 -> 类型标识、显示名、图标、详情页地址 */
export const KIND_META = {
  characters: { kind: 'character', label: '人物', icon: '◉', to: (id) => `/characters/${id}` },
  factions: { kind: 'faction', label: '势力', icon: '◆', to: (id) => `/factions/${id}` },
  locations: {
    kind: 'location',
    label: '地点',
    icon: '◈',
    to: (id) => `/settings/locations/${id}`,
  },
  lore: { kind: 'system', label: '体系', icon: '⚙', to: (id) => `/settings/systems/${id}` },
  timeline: { kind: 'event', label: '事件', icon: '⌛', to: () => `/settings#history` },
};

/** 去掉首尾引号 */
function unquote(v) {
  const s = String(v).trim();
  if (s.length >= 2 && ((s[0] === '"' && s.endsWith('"')) || (s[0] === "'" && s.endsWith("'")))) {
    return s.slice(1, -1);
  }
  return s;
}

/** 极简 frontmatter 解析：只取顶层标量，以及 `key:` 下面跟着的 `- 项` 列表 */
function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  if (!m) return { _end: 0, _data: {} };

  const out = {};
  let cur = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;

    // 顶层 key（必须顶格，缩进行是嵌套结构，直接忽略）
    const kv = /^([A-Za-z0-9_]+)\s*:\s*(.*)$/.exec(line);
    if (kv) {
      const [, k, rawV] = kv;
      const v = unquote(rawV);
      if (v === '' || v === '[]') {
        out[k] = [];
        cur = k;
      } else if (v.startsWith('[') && v.endsWith(']')) {
        // 行内数组：aliases: [甲, 乙]
        out[k] = v
          .slice(1, -1)
          .split(',')
          .map((s) => unquote(s))
          .filter(Boolean);
        cur = null;
      } else {
        out[k] = v;
        cur = null;
      }
      continue;
    }

    const item = /^\s*-\s+(.*)$/.exec(line);
    if (item && cur && Array.isArray(out[cur])) out[cur].push(unquote(item[1]));
  }

  return { _end: m[0].length, _data: out };
}

function escapeRe(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 当前内容目录的指纹：文件名 + 大小 + 修改时间 */
function signature() {
  let s = '';
  for (const dir of Object.keys(KIND_META)) {
    const abs = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs).sort()) {
      if (!f.endsWith('.md')) continue;
      const st = fs.statSync(path.join(abs, f));
      s += `${dir}/${f}:${st.size}:${Math.round(st.mtimeMs)};`;
    }
  }
  return s;
}

function scan() {
  const entries = [];
  const bodies = new Map();

  for (const [dir, meta] of Object.entries(KIND_META)) {
    const abs = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(abs)) continue;

    for (const file of fs.readdirSync(abs).filter((f) => f.endsWith('.md'))) {
      const raw = fs.readFileSync(path.join(abs, file), 'utf8');
      const { _end, _data: fm } = parseFrontmatter(raw);
      const id = file.replace(/\.md$/, '');
      // 时间线用 title 当词条名，其余集合用 name
      const nameKey = meta.kind === 'event' ? 'title' : 'name';

      const name = fm[nameKey] ? String(fm[nameKey]) : id;
      const en = fm.enName ? String(fm.enName) : '';
      const aliases = [];
      if (fm.alias) aliases.push(String(fm.alias));
      if (Array.isArray(fm.aliases)) aliases.push(...fm.aliases.map(String));

      const entry = {
        id,
        kind: meta.kind,
        kindLabel: meta.label,
        icon: meta.icon,
        path: meta.to(id),
        name,
        en,
        aliases,
        // 词条级开关：false 时仍可手动 [[内链]]，但不参与自动替换
        autoLink: fm.autoLink !== 'false' && fm.autoLink !== false,
        accent: fm.accent ? String(fm.accent) : '',
      };
      entries.push(entry);
      bodies.set(`${meta.kind}:${id}`, raw.slice(_end));
    }
  }

  // 反向引用：谁的正文里提到了本词条
  const mentions = new Map();
  const cache = new Map();
  for (const e of entries) {
    const terms = [e.name, e.en, ...e.aliases].filter((t) => t && t.length >= 2);
    const res = terms.map((t) => {
      const key = `${e.kind}:${e.id}|${t}`;
      if (!cache.has(key)) {
        const hasAscii = /[A-Za-z]/.test(t);
        cache.set(key, new RegExp(hasAscii ? `\\b${escapeRe(t)}\\b` : escapeRe(t), 'i'));
      }
      return cache.get(key);
    });

    const hits = [];
    for (const other of entries) {
      if (other === e) continue;
      const body = bodies.get(`${other.kind}:${other.id}`) || '';
      if (body && res.some((re) => re.test(body))) hits.push(other);
    }
    if (hits.length) mentions.set(`${e.kind}:${e.id}`, hits);
  }

  return { entries, mentions };
}

let cached = { sig: '', data: null };

/** 获取词条表（自动缓存，内容变动后自动重扫） */
export function loadLexicon() {
  const sig = signature();
  if (cached.data && cached.sig === sig) return cached.data;
  cached = { sig, data: scan() };
  return cached.data;
}

/** 供 Remark 插件使用：拿到「匹配词 -> 词条」的映射与正则 */
export function buildMatcher(entries) {
  const terms = [];
  for (const e of entries) {
    if (e.autoLink === false) continue;
    for (const t of [e.name, e.en, ...e.aliases]) {
      if (!t || t.length < 2) continue;
      const hasAscii = /[A-Za-z]/.test(t);
      terms.push({ text: t, re: hasAscii ? `\\b${escapeRe(t)}\\b` : escapeRe(t), entry: e });
    }
  }
  // 长词优先，避免「贝加尔湖研究所」被「贝加尔湖」先吃掉
  terms.sort((a, b) => b.text.length - a.text.length);

  const byText = new Map();
  for (const t of terms) {
    const k = t.text.toLowerCase();
    if (!byText.has(k)) byText.set(k, t.entry);
  }

  return { pattern: terms.map((t) => t.re).join('|'), byText, count: terms.length };
}

export default loadLexicon;
