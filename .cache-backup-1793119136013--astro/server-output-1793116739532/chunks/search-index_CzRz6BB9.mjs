import { a as getCollection } from './_astro_content_BhGu97-X.mjs';
import { u as url } from './site_DwFBVW5O.mjs';

const KIND_ORDER = ["character", "faction", "location", "system", "event", "page"];
const KIND_INFO = {
  character: { label: "人物", icon: "◉" },
  faction: { label: "势力", icon: "◆" },
  location: { label: "地点", icon: "◈" },
  system: { label: "体系", icon: "⚙" },
  event: { label: "事件", icon: "⌛" },
  page: { label: "页面", icon: "▤" }
};

function stripMarkdown(md) {
  return md.replace(/```[\s\S]*?```/g, " ").replace(/`[^`\n]*`/g, " ").replace(/!\[[^\]]*\]\([^)]*\)/g, " ").replace(/\[\[([^[\]|]+)(?:\|([^[\]]+))?\]\]/g, (_m, a, b) => b || a).replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/^>\s?/gm, " ").replace(/^#{1,6}\s+/gm, " ").replace(/^\s*[-*+]\s+/gm, " ").replace(/[*_~]/g, "").replace(/\s+/g, " ").trim();
}
const PAGE_ROUTES = {
  home: { href: "/", order: 10 },
  "character-graph": { href: "/characters#relations", order: 20 }
};
async function buildSearchIndex() {
  const [characters, factions, locations, lore, timeline, pages] = await Promise.all([
    getCollection("characters"),
    getCollection("factions"),
    getCollection("locations"),
    getCollection("lore"),
    getCollection("timeline"),
    getCollection("pages")
  ]);
  const items = [
    ...characters.map((c) => ({
      t: c.data.name,
      k: "character",
      kl: KIND_INFO.character.label,
      ki: KIND_INFO.character.icon,
      u: url(`/characters/${c.id}`),
      e: c.data.enName ?? "",
      a: [c.data.alias, ...c.data.aliases].filter(Boolean).join(" · "),
      s: c.data.summary,
      g: c.data.tags,
      x: stripMarkdown(c.body ?? "").slice(0, 420),
      c: c.data.accent,
      o: c.data.order
    })),
    ...factions.map((f) => ({
      t: f.data.name,
      k: "faction",
      kl: KIND_INFO.faction.label,
      ki: KIND_INFO.faction.icon,
      u: url(`/factions/${f.id}`),
      e: f.data.enName ?? "",
      a: f.data.aliases.join(" · "),
      s: f.data.summary,
      g: f.data.tags,
      x: stripMarkdown(f.body ?? "").slice(0, 420),
      c: f.data.accent,
      o: f.data.order
    })),
    ...locations.map((l) => ({
      t: l.data.name,
      k: "location",
      kl: KIND_INFO.location.label,
      ki: KIND_INFO.location.icon,
      u: url(`/settings/locations/${l.id}`),
      e: l.data.enName ?? "",
      a: [l.data.region, ...l.data.aliases].filter(Boolean).join(" · "),
      s: l.data.summary,
      g: l.data.tags,
      x: stripMarkdown(l.body ?? "").slice(0, 420),
      c: l.data.accent,
      o: l.data.order
    })),
    ...lore.map((s) => ({
      t: s.data.name,
      k: "system",
      kl: KIND_INFO.system.label,
      ki: KIND_INFO.system.icon,
      u: url(`/settings/systems/${s.id}`),
      e: s.data.enName ?? "",
      a: [s.data.category, ...s.data.aliases].filter(Boolean).join(" · "),
      s: s.data.summary,
      g: s.data.tags,
      x: stripMarkdown(s.body ?? "").slice(0, 420),
      c: s.data.accent,
      o: s.data.order
    })),
    ...timeline.map((t) => ({
      t: t.data.title,
      k: "event",
      kl: KIND_INFO.event.label,
      ki: KIND_INFO.event.icon,
      u: url("/settings#history"),
      e: t.data.date,
      a: [t.data.era, ...t.data.aliases].filter(Boolean).join(" · "),
      s: t.data.summary,
      g: [t.data.tag],
      x: stripMarkdown(t.body ?? "").slice(0, 420),
      c: t.data.accent,
      o: t.data.order
    })),
    ...pages.flatMap((p) => {
      const route = PAGE_ROUTES[p.id];
      if (!route) return [];
      return [
        {
          t: p.data.title,
          k: "page",
          kl: KIND_INFO.page.label,
          ki: KIND_INFO.page.icon,
          u: url(route.href),
          e: p.data.subtitle ?? "",
          a: p.data.kicker ?? "",
          s: p.data.description ?? "",
          g: [],
          x: stripMarkdown(p.body ?? "").slice(0, 420),
          c: p.data.accent,
          o: route.order
        }
      ];
    })
  ];
  items.sort((a, b) => {
    const ka = KIND_ORDER.indexOf(a.k);
    const kb = KIND_ORDER.indexOf(b.k);
    if (ka !== kb) return ka - kb;
    if (a.o !== b.o) return a.o - b.o;
    return a.t.localeCompare(b.t, "zh-Hans-CN");
  });
  return items;
}

export { KIND_ORDER as K, KIND_INFO as a, buildSearchIndex as b };
