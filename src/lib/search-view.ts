/**
 * 搜索界面逻辑（浏览器端）
 * ------------------------------------------------------------------
 * 全局搜索浮层与 /search 页面共用这一套：过滤、打分、高亮、键盘导航。
 * 纯前端，数据来自构建好的静态索引。
 */

import { KIND_INFO, KIND_ORDER } from './search-types';
import type { SearchItem, SearchKind } from './search-types';

const norm = (s: string): string => (s || '').toLowerCase().trim();

export function tokenize(q: string): string[] {
  return norm(q)
    .split(/\s+/)
    .filter(Boolean);
}

function escapeHtml(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeRe(s: string): string {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 关键词命中给分；任一词完全没命中就淘汰整条（多词是「且」的关系） */
export function scoreItem(item: SearchItem, words: string[]): number {
  if (!words.length) return 1;
  const title = norm(item.t);
  const en = norm(item.e);
  const alias = norm(item.a);
  const tags = norm((item.g || []).join(' '));
  const sum = norm(item.s);
  const body = norm(item.x);

  let total = 0;
  for (const w of words) {
    let hit = 0;
    if (title === w) hit += 120;
    else if (title.startsWith(w)) hit += 70;
    else if (title.includes(w)) hit += 45;
    if (en && en.includes(w)) hit += 26;
    if (alias && alias.includes(w)) hit += 20;
    if (tags.includes(w)) hit += 12;
    if (sum.includes(w)) hit += 8;
    if (body.includes(w)) hit += 4;
    if (!hit) return 0;
    total += hit;
  }
  return total;
}

export function filterIndex(
  items: SearchItem[],
  q: string,
  kind: SearchKind | 'all' = 'all'
): SearchItem[] {
  const words = tokenize(q);
  const pool = kind === 'all' ? items : items.filter((i) => i.k === kind);
  if (!words.length) return pool.slice();

  const scored: { item: SearchItem; score: number }[] = [];
  for (const item of pool) {
    const score = scoreItem(item, words);
    if (score > 0) scored.push({ item, score });
  }
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const ka = KIND_ORDER.indexOf(a.item.k);
    const kb = KIND_ORDER.indexOf(b.item.k);
    if (ka !== kb) return ka - kb;
    return a.item.o - b.item.o;
  });
  return scored.map((s) => s.item);
}

/** 摘一段最相关的文字，把命中位置摆在中间 */
export function snippetFor(item: SearchItem, words: string[]): string {
  const word = words[0] || '';
  const hay = `${item.s} ${item.x}`;
  if (word) {
    const idx = norm(hay).indexOf(word);
    if (idx >= 0) {
      const start = Math.max(0, idx - 26);
      const end = Math.min(hay.length, start + 108);
      return `${start > 0 ? '…' : ''}${hay.slice(start, end)}${end < hay.length ? '…' : ''}`;
    }
  }
  const s = item.s || item.x;
  return s.length > 96 ? `${s.slice(0, 96)}…` : s;
}

/** 高亮命中词（已转义，可直接放进 innerHTML） */
export function mark(text: string, words: string[]): string {
  let out = escapeHtml(text);
  for (const w of words) {
    if (!w) continue;
    const re = new RegExp(escapeRe(escapeHtml(w)), 'gi');
    out = out.replace(re, (m) => `<mark class="sr-mark">${m}</mark>`);
  }
  return out;
}

export function itemHtml(item: SearchItem, words: string[], idx: number, active: boolean): string {
  const info = KIND_INFO[item.k];
  const en = item.e ? `<span class="sr-en">${mark(item.e, words)}</span>` : '';
  const alias = item.a ? `<span class="sr-alias">${mark(item.a, words)}</span>` : '';
  return `<li>
  <a class="sr-item${active ? ' is-active' : ''}" href="${item.u}" data-idx="${idx}" data-kind="${item.k}">
    <span class="sr-badge" data-k="${item.k}">${info.icon}<span>${info.label}</span></span>
    <span class="sr-text">
      <span class="sr-title">${mark(item.t, words)}${en}${alias}</span>
      <span class="sr-sum">${mark(snippetFor(item, words), words)}</span>
    </span>
    <span class="sr-go" aria-hidden="true">↵</span>
  </a>
</li>`;
}

export interface SearchControllerOptions {
  input: HTMLInputElement;
  list: HTMLElement;
  /** 数据来源：页面可内联传入，浮层可等打开时再懒加载 */
  source: () => SearchItem[];
  /** 当前分类筛选，只有 /search 页面用到 */
  kind?: () => SearchKind | 'all';
  empty?: HTMLElement | null;
  meta?: HTMLElement | null;
  /** 空查询时最多显示几条（0 表示显示全部） */
  maxOnEmpty?: number;
  /** 结果为空时的提示文案 */
  emptyLabel?: string;
  /** 选中某项时调用；不传则直接跳转 */
  onPick?: (item: SearchItem) => void;
  /** 结果变化时回调 */
  onChange?: (items: SearchItem[], q: string) => void;
}

export function createSearchController(opts: SearchControllerOptions) {
  const { input, list, empty, meta } = opts;
  let results: SearchItem[] = [];
  let active = 0;
  let timer: number | undefined;

  const words = () => tokenize(input.value);

  const paint = () => {
    const w = words();
    if (!results.length) {
      list.innerHTML = '';
      if (empty) {
        empty.hidden = false;
        empty.textContent = input.value.trim()
          ? `没有找到与「${input.value.trim()}」相关的档案`
          : opts.emptyLabel || '暂无档案';
      }
      if (meta) meta.textContent = '0 条';
      opts.onChange?.(results, input.value.trim());
      return;
    }
    if (empty) empty.hidden = true;
    list.innerHTML = results.map((it, i) => itemHtml(it, w, i, i === active)).join('');
    if (meta) meta.textContent = `${results.length} 条`;
    opts.onChange?.(results, input.value.trim());
  };

  const moveActive = (delta: number) => {
    if (!results.length) return;
    const max = results.length;
    active = (active + delta + max) % max;
    const nodes = list.querySelectorAll<HTMLElement>('.sr-item');
    nodes.forEach((n, i) => n.classList.toggle('is-active', i === active));
    nodes[active]?.scrollIntoView({ block: 'nearest' });
  };

  const pick = () => {
    const item = results[active];
    if (!item) return;
    if (opts.onPick) opts.onPick(item);
    else window.location.href = item.u;
  };

  input.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(refresh, 60);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveActive(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveActive(-1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      pick();
    }
  });

  // 鼠标点击：让链接正常跳转，同时把它设为当前项
  list.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('.sr-item');
    if (!a) return;
    const idx = Number(a.dataset.idx || '0');
    active = idx;
  });
  list.addEventListener('mousemove', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('.sr-item');
    if (!a) return;
    const idx = Number(a.dataset.idx || '0');
    if (idx !== active) {
      active = idx;
      list.querySelectorAll('.sr-item').forEach((n, i) => n.classList.toggle('is-active', i === active));
    }
  });

  function refresh() {
    const q = input.value.trim();
    const all = opts.source();
    const filtered = filterIndex(all, q, opts.kind?.() ?? 'all');
    const limit = !q && opts.maxOnEmpty ? opts.maxOnEmpty : 0;
    results = limit > 0 ? filtered.slice(0, limit) : filtered;
    active = 0;
    paint();
  }

  return {
    refresh,
    rerender: () => refresh(),
    get items() {
      return results;
    },
    focus: () => input.focus(),
  };
}
