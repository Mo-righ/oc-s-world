import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_B2vzoAaT.mjs';
import 'piccolore';
import { r as renderEntry, a as getCollection } from '../../chunks/_astro_content_BhGu97-X.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_B8CqUevJ.mjs';
import { $ as $$SectionHeading } from '../../chunks/SectionHeading_CKN9Gf6S.mjs';
import { $ as $$CharacterCard } from '../../chunks/CharacterCard_X6mJqdX3.mjs';
import { a as $$Mermaid } from '../../chunks/StatRadar_CeQsGn_3.mjs';
import { $ as $$Timeline } from '../../chunks/Timeline_DAWHEJga.mjs';
import { b as byOrder, u as url } from '../../chunks/site_DwFBVW5O.mjs';
import { $ as $$WikiLinks } from '../../chunks/WikiLinks_DtzgpweB.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://mo-righ.github.io");
const getStaticPaths = (async () => {
  const factions = await getCollection("factions");
  return factions.map((entry) => ({ params: { id: entry.id }, props: { entry } }));
});
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { entry } = Astro2.props;
  const d = entry.data;
  const { Content } = await renderEntry(entry);
  const characters = await getCollection("characters");
  const members = characters.filter((c) => c.data.faction === entry.id).sort(byOrder);
  const locations = (await getCollection("locations")).filter((l) => l.data.factions.includes(entry.id));
  const metaRows = [
    { k: "\u7C7B\u578B", v: d.type },
    { k: "\u6210\u7ACB", v: d.founded },
    { k: "\u9996\u9886", v: d.leader },
    { k: "\u636E\u70B9", v: d.headquarters },
    { k: "\u5F71\u54CD\u529B", v: d.influence },
    { k: "\u72B6\u6001", v: d.status }
  ].filter((r) => Boolean(r.v));
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": d.name, "description": d.summary, "kicker": d.enName ?? "FACTION FILE", "accent": d.accent, "wikiSelf": `faction:${entry.id}` }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<header class="rise"${addAttribute(`--accent:${d.accent}`, "style")}> <div class="flex flex-col gap-5 sm:flex-row sm:items-start"> <div class="grid h-20 w-20 shrink-0 place-items-center rounded-xl border text-4xl"${addAttribute(`border-color:${d.accent}55;color:${d.accent};background:radial-gradient(circle at 30% 20%, ${d.accent}26, transparent 70%), #0e0e18;box-shadow:0 0 40px -18px ${d.accent}`, "style")}> ${d.emblem} </div> <div class="min-w-0 flex-1"> <div class="flex flex-wrap items-center gap-x-3 gap-y-2"> <h1 class="text-3xl font-black tracking-tight text-ink sm:text-4xl">${d.name}</h1> <span class="chip"${addAttribute(`color:${d.accent};border-color:${d.accent}55`, "style")}>${d.type}</span> </div> ${d.enName && renderTemplate`<p class="mt-1 font-mono text-[11px] tracking-[0.22em] text-dust-2">${d.enName}</p>`} <p class="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-dust">${d.summary}</p> </div> </div> ${d.motto && renderTemplate`<blockquote class="mt-7 border-l-2 py-1 pl-4 text-[15px] italic leading-relaxed"${addAttribute(`border-color:${d.accent};color:${d.accent}`, "style")}>
「${d.motto}」
</blockquote>`} </header>  ${metaRows.length > 0 && renderTemplate`<dl class="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-edge bg-edge/60 sm:grid-cols-3"> ${metaRows.map((r) => renderTemplate`<div class="bg-panel px-4 py-3"> <dt class="font-mono text-[10px] tracking-[0.2em] text-dust-2">${r.k}</dt> <dd class="mt-1 truncate text-[13.5px] text-ink">${r.v}</dd> </div>`)} </dl>`} <div class="prose-oc mt-10"> ${renderComponent($$result2, "Content", Content, {})} </div>  ${d.tags.length > 0 && renderTemplate`<div class="mt-8 flex flex-wrap gap-1.5"> ${d.tags.map((t) => renderTemplate`<span class="chip">${t}</span>`)} </div>`} ${d.relations && renderTemplate`${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "title": "\u5173\u7CFB\u7F51\u7EDC", "en": "RELATIONS", "icon": "\u27E0", "accent": d.accent, "id": "relations" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Mermaid", $$Mermaid, { "chart": d.relations, "accent": d.accent })} ` })}`} ${members.length > 0 && renderTemplate`${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "title": "\u6210\u5458\u540D\u518C", "en": "MEMBERS", "icon": "\u25C9", "accent": d.accent, "id": "members" }, { "default": async ($$result3) => renderTemplate` <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"> ${members.map((c) => renderTemplate`${renderComponent($$result3, "CharacterCard", $$CharacterCard, { "id": c.id, "name": c.data.name, "enName": c.data.enName, "alias": c.data.alias, "title": c.data.title, "factionLabel": c.data.factionLabel, "status": c.data.status, "avatar": c.data.avatar, "accent": c.data.accent, "tags": c.data.tags, "summary": c.data.summary })}`)} </div> ` })}`} ${locations.length > 0 && renderTemplate`${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "title": "\u6D3B\u52A8\u533A\u57DF", "en": "TERRITORY", "icon": "\u25C8", "accent": d.accent, "id": "territory" }, { "default": async ($$result3) => renderTemplate` <div class="flex flex-wrap gap-2.5"> ${locations.map((l) => renderTemplate`<a${addAttribute(url(`/settings/locations/${l.id}`), "href")} class="panel hoverable px-3.5 py-2.5 text-[13.5px] text-ink"${addAttribute(`--accent:${l.data.accent}`, "style")}> <span class="mr-2 font-mono"${addAttribute(`color:${l.data.accent}`, "style")}>${l.data.icon}</span> ${l.data.name} </a>`)} </div> ` })}`} ${d.events.length > 0 && renderTemplate`${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "title": "\u5173\u952E\u8282\u70B9", "en": "TIMELINE", "icon": "\u231B", "accent": d.accent, "id": "timeline" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Timeline", $$Timeline, { "items": d.events.map((e) => ({
    time: e.time,
    title: e.title,
    desc: e.desc,
    accent: d.accent
  })) })} ` })}`} ${renderComponent($$result2, "WikiLinks", $$WikiLinks, { "kind": "faction", "id": entry.id, "exclude": [...members.map((m) => `character:${m.id}`), ...locations.map((l) => `location:${l.id}`)] })} <div class="mt-14 flex flex-wrap gap-3 border-t border-edge pt-6"> <a${addAttribute(url("/factions"), "href")} class="btn">← 返回势力名录</a> <a${addAttribute(url("/characters"), "href")} class="btn">全部人物</a> </div> ` })}`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/pages/factions/[id].astro", void 0);

const $$file = "D:/工作地点/the world/oc-s-world/src/pages/factions/[id].astro";
const $$url = "/oc-s-world/factions/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
