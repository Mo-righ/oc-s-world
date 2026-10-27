/**
 * Remark 插件：把正文里的词条名自动变成站内链接（维基式内链）
 * ------------------------------------------------------------------
 * 两种写法：
 *   1. 自动  —— 正文里出现过的已知词条名，会被自动加上链接
 *   2. 手动  —— [[词条名]] 或 [[词条名|显示的文字]]
 *
 * 默认设置是为「可读」考虑的：
 *   · 同一词条在一篇里只链接第一次出现，避免满屏都是蓝字
 *   · 标题、代码块、已有的链接内部不做替换
 */

import { loadLexicon, buildMatcher } from './lexicon.mjs';

/** 这些节点内部不做替换（避免破坏代码、已有链接、图片） */
const SKIP = new Set([
  'link',
  'linkReference',
  'definition',
  'image',
  'imageReference',
  'inlineCode',
  'code',
  'html',
  'footnoteReference',
]);

function escapeRe(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function linkNode(href, text, entry) {
  return {
    type: 'link',
    url: href,
    data: {
      hProperties: {
        class: 'wikilink',
        'data-wiki': `${entry.kind}:${entry.id}`,
        'data-kind': entry.kind,
        title: `${entry.kindLabel}档案 · ${entry.name}`,
      },
    },
    children: [{ type: 'text', value: text }],
  };
}

export function remarkWikilink(options = {}) {
  const {
    /** 站点 base，例如 /oc-s-world。子路径部署时链接才不会 404 */
    base = '',
    /** 是否开启自动内链 */
    autoLink = true,
    /** 同一词条在单篇里最多链接几次，1 = 只链第一次 */
    maxPerPage = 1,
    /** 是否也处理标题里的文字（默认不处理，标题通常就是当前词条） */
    linkHeadings = false,
  } = options;

  let matcherCache = null;

  const getMatcher = (entries) => {
    const sign = entries
      .map((e) => `${e.kind}:${e.id}:${e.name}:${e.en}:${e.aliases.join(',')}:${e.autoLink !== false}`)
      .join('|');
    if (matcherCache && matcherCache.sign === sign) return matcherCache.matcher;
    const matcher = buildMatcher(entries);
    matcherCache = { sign, matcher };
    return matcher;
  };

  return (tree) => {
    const { entries } = loadLexicon();
    const matcher = getMatcher(entries);
    if (!matcher.count) return;

    // 先找出所有需要处理的 text 节点（连父节点一起记下，方便后面整段替换）
    const targets = [];
    const walk = (node, parent) => {
      if (SKIP.has(node.type)) return;
      if (node.type === 'heading' && !linkHeadings) return;

      if (node.type === 'text') targets.push({ node, parent });
      if (Array.isArray(node.children)) {
        for (const child of node.children) walk(child, node);
      }
    };
    for (const child of tree.children) walk(child, tree);

    if (!targets.length) return;

    // [[手动内链]]：优先处理，这样自动内链不会再去动它生成的文字
    const bracketRe = /\[\[([^[\]|]+)(?:\|([^[\]]+))?\]\]/g;

    const findEntry = (word) => {
      const w = word.trim().toLowerCase();
      if (!w) return null;
      return (
        entries.find((e) => e.name.toLowerCase() === w) ||
        entries.find((e) => (e.en || '').toLowerCase() === w) ||
        entries.find((e) => e.aliases.some((a) => a.toLowerCase() === w)) ||
        null
      );
    };

    const used = new Map();
    const autoRe = new RegExp(`(${matcher.pattern})`, 'gi');

    // 倒序处理，保证前面节点的下标不会因为后面的替换而错位
    for (let i = targets.length - 1; i >= 0; i--) {
      const { node, parent } = targets[i];
      if (!parent) continue;
      const index = parent.children.indexOf(node);
      if (index < 0) continue;

      let out = [];

      /* ---------- 第一遍：[[手动内链]] ---------- */
      let last = 0;
      let m;
      bracketRe.lastIndex = 0;
      while ((m = bracketRe.exec(node.value))) {
        if (m.index > last) out.push({ type: 'text', value: node.value.slice(last, m.index) });
        const entry = findEntry(m[1]);
        if (entry) {
          out.push(linkNode(`${base}${entry.path}`, m[2] || m[1], entry));
        } else {
          // 找不到对应词条：原样保留，不破坏正文
          out.push({ type: 'text', value: m[0] });
        }
        last = m.index + m[0].length;
      }
      if (last < node.value.length) out.push({ type: 'text', value: node.value.slice(last) });
      if (!out.length) out = [node];

      /* ---------- 第二遍：自动内链 ---------- */
      if (autoLink) {
        const withLinks = [];
        for (const part of out) {
          if (part.type !== 'text' || !part.value) {
            withLinks.push(part);
            continue;
          }
          const value = part.value;
          let pos = 0;
          let hit;
          autoRe.lastIndex = 0;
          while ((hit = autoRe.exec(value))) {
            const matched = hit[0];
            // 空匹配保护
            if (!matched) {
              autoRe.lastIndex++;
              continue;
            }
            const entry = matcher.byText.get(matched.toLowerCase());
            if (!entry) {
              if (hit.index > pos) withLinks.push({ type: 'text', value: value.slice(pos, hit.index) });
              withLinks.push({ type: 'text', value: matched });
              pos = hit.index + matched.length;
              continue;
            }

            const key = `${entry.kind}:${entry.id}`;
            const times = used.get(key) || 0;
            if (times >= maxPerPage) {
              // 已经链过，保留纯文本
              if (hit.index > pos) withLinks.push({ type: 'text', value: value.slice(pos, hit.index) });
              withLinks.push({ type: 'text', value: matched });
              pos = hit.index + matched.length;
              continue;
            }
            used.set(key, times + 1);

            if (hit.index > pos) withLinks.push({ type: 'text', value: value.slice(pos, hit.index) });
            withLinks.push(linkNode(`${base}${entry.path}`, matched, entry));
            pos = hit.index + matched.length;
          }
          if (pos < value.length) withLinks.push({ type: 'text', value: value.slice(pos) });
        }
        out = withLinks;
      }

      if (out.length === 1 && out[0] === node) continue;
      parent.children.splice(index, 1, ...out);
    }
  };
}

export default remarkWikilink;
