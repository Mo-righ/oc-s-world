import { d as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate } from './astro/server_B2vzoAaT.mjs';
import 'piccolore';
import 'clsx';
import { a as getCollection } from './_astro_content_DAbBInOs.mjs';
import { u as url } from './site_DwFBVW5O.mjs';

const $$Astro = createAstro("https://mo-righ.github.io");
const $$WikiLinks = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$WikiLinks;
  const { kind, id, exclude = [] } = Astro2.props;
  const [characters, factions, locations, lore, timeline, items] = await Promise.all([
    getCollection("characters"),
    getCollection("factions"),
    getCollection("locations"),
    getCollection("lore"),
    getCollection("timeline"),
    getCollection("items")
  ]);
  const rows = [];
  const add = (coll, kindName, kindLabel, icon, to, nameOf, enOf, aliasOf, accentOf) => {
    for (const e of coll) {
      rows.push({
        key: `${kindName}:${e.id}`,
        name: nameOf(e.data),
        en: enOf(e.data) ?? "",
        aliases: aliasOf(e.data),
        path: to(e.id),
        kindLabel,
        icon,
        accent: accentOf(e.data),
        body: e.body ?? ""
      });
    }
  };
  add(characters, "character", "\u4EBA\u7269", "\u25C9", (i) => `/characters/${i}`, (d) => d.name, (d) => d.enName, (d) => [d.alias ?? "", ...d.aliases].filter(Boolean), (d) => d.accent);
  add(factions, "faction", "\u52BF\u529B", "\u25C6", (i) => `/factions/${i}`, (d) => d.name, (d) => d.enName, (d) => d.aliases, (d) => d.accent);
  add(locations, "location", "\u5730\u70B9", "\u25C8", (i) => `/settings/locations/${i}`, (d) => d.name, (d) => d.enName, (d) => d.aliases, (d) => d.accent);
  add(lore, "system", "\u4F53\u7CFB", "\u2699", (i) => `/settings/systems/${i}`, (d) => d.name, (d) => d.enName, (d) => d.aliases, (d) => d.accent);
  add(timeline, "event", "\u4E8B\u4EF6", "\u231B", () => "/settings#history", (d) => d.title, (d) => d.date, (d) => d.aliases, (d) => d.accent);
  add(items, "item", "\u7269\u54C1", "\u232C", (i) => `/items/${i}`, (d) => d.name, (d) => d.enName, (d) => d.aliases, (d) => d.accent);
  const escapeRe = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const selfKey = `${kind}:${id}`;
  const skip = /* @__PURE__ */ new Set([selfKey, ...exclude]);
  const selfRow = rows.find((r) => r.key === selfKey);
  const terms = selfRow ? [selfRow.name, selfRow.en, ...selfRow.aliases].filter((t) => t && t.length >= 2).map(escapeRe) : [];
  const back = terms.length ? rows.filter((r) => {
    if (skip.has(r.key) || !r.body) return false;
    return terms.some(
      (t) => /[A-Za-z]/.test(t) ? new RegExp(`\\b${t}\\b`, "i").test(r.body) : r.body.includes(t)
    );
  }) : [];
  return renderTemplate`${back.length > 0 && renderTemplate`${maybeRenderHead()}<section class="mt-12 rise" aria-label="引用本词条的档案"><div class="mb-4 flex items-baseline gap-3"><h2 class="text-lg font-bold tracking-wide text-ink"><span class="mr-2 font-mono text-dust-2">⟠</span>引用本词条的档案
</h2><span class="font-mono text-[9.5px] tracking-[0.24em] text-dust-2">WHAT LINKS HERE · ${back.length}</span></div><div class="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">${back.map((e) => renderTemplate`<a${addAttribute(url(e.path), "href")} class="panel hoverable flex items-center gap-3 px-4 py-3"${addAttribute(`--accent:${e.accent || "#8b5cf6"}`, "style")}><span class="font-mono text-lg"${addAttribute(`color:${e.accent || "#8b5cf6"}`, "style")}>${e.icon}</span><span class="min-w-0 flex-1"><span class="block truncate text-[14px] font-semibold text-ink">${e.name}</span><span class="mt-0.5 block font-mono text-[10px] tracking-[0.18em] text-dust-2">${e.kindLabel}${e.en ? ` \xB7 ${e.en}` : ""}</span></span><span class="font-mono text-dust-2 transition-transform group-hover:translate-x-0.5">→</span></a>`)}</div></section>`}`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/WikiLinks.astro", void 0);

export { $$WikiLinks as $ };
