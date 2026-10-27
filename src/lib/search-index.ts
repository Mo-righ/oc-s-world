/**
 * 全站搜索索引
 * ------------------------------------------------------------------
 * 纯静态：构建时把全部档案压成一份 JSON，浏览器里直接做匹配，
 * 不需要任何后端接口。索引不大（几十条），加载很快。
 */

import { getCollection } from 'astro:content';
import { url } from './site';
import { KIND_INFO, KIND_ORDER } from './search-types';
import type { SearchItem } from './search-types';

export type { SearchItem, SearchKind } from './search-types';

/** 把 Markdown 压成纯文本，用于搜索与展示 */
export function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`\n]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[\[([^[\]|]+)(?:\|([^[\]]+))?\]\]/g, (_m, a, b) => b || a)
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^>\s?/gm, ' ')
    .replace(/^#{1,6}\s+/gm, ' ')
    .replace(/^\s*[-*+]\s+/gm, ' ')
    .replace(/[*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** 构建索引：人物 / 势力 / 地点 / 体系 / 事件，五类合一 */
export async function buildSearchIndex(): Promise<SearchItem[]> {
  const [characters, factions, locations, lore, timeline] = await Promise.all([
    getCollection('characters'),
    getCollection('factions'),
    getCollection('locations'),
    getCollection('lore'),
    getCollection('timeline'),
  ]);

  const items: SearchItem[] = [
    ...characters.map((c) => ({
      t: c.data.name,
      k: 'character' as const,
      kl: KIND_INFO.character.label,
      ki: KIND_INFO.character.icon,
      u: url(`/characters/${c.id}`),
      e: c.data.enName ?? '',
      a: [c.data.alias, ...c.data.aliases].filter(Boolean).join(' · '),
      s: c.data.summary,
      g: c.data.tags,
      x: stripMarkdown(c.body ?? '').slice(0, 420),
      c: c.data.accent,
      o: c.data.order,
    })),
    ...factions.map((f) => ({
      t: f.data.name,
      k: 'faction' as const,
      kl: KIND_INFO.faction.label,
      ki: KIND_INFO.faction.icon,
      u: url(`/factions/${f.id}`),
      e: f.data.enName ?? '',
      a: f.data.aliases.join(' · '),
      s: f.data.summary,
      g: f.data.tags,
      x: stripMarkdown(f.body ?? '').slice(0, 420),
      c: f.data.accent,
      o: f.data.order,
    })),
    ...locations.map((l) => ({
      t: l.data.name,
      k: 'location' as const,
      kl: KIND_INFO.location.label,
      ki: KIND_INFO.location.icon,
      u: url(`/settings/locations/${l.id}`),
      e: l.data.enName ?? '',
      a: [l.data.region, ...l.data.aliases].filter(Boolean).join(' · '),
      s: l.data.summary,
      g: l.data.tags,
      x: stripMarkdown(l.body ?? '').slice(0, 420),
      c: l.data.accent,
      o: l.data.order,
    })),
    ...lore.map((s) => ({
      t: s.data.name,
      k: 'system' as const,
      kl: KIND_INFO.system.label,
      ki: KIND_INFO.system.icon,
      u: url(`/settings/systems/${s.id}`),
      e: s.data.enName ?? '',
      a: [s.data.category, ...s.data.aliases].filter(Boolean).join(' · '),
      s: s.data.summary,
      g: s.data.tags,
      x: stripMarkdown(s.body ?? '').slice(0, 420),
      c: s.data.accent,
      o: s.data.order,
    })),
    ...timeline.map((t) => ({
      t: t.data.title,
      k: 'event' as const,
      kl: KIND_INFO.event.label,
      ki: KIND_INFO.event.icon,
      u: url('/settings#history'),
      e: t.data.date,
      a: [t.data.era, ...t.data.aliases].filter(Boolean).join(' · '),
      s: t.data.summary,
      g: [t.data.tag],
      x: stripMarkdown(t.body ?? '').slice(0, 420),
      c: t.data.accent,
      o: t.data.order,
    })),
  ];

  // 按类型分组、组内按 order 排序，保证结果顺序稳定
  items.sort((a, b) => {
    const ka = KIND_ORDER.indexOf(a.k);
    const kb = KIND_ORDER.indexOf(b.k);
    if (ka !== kb) return ka - kb;
    if (a.o !== b.o) return a.o - b.o;
    return a.t.localeCompare(b.t, 'zh-Hans-CN');
  });

  return items;
}
