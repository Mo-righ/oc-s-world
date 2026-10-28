import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../../chunks/astro/server_B2vzoAaT.mjs';
import 'piccolore';
import { r as renderEntry, a as getCollection } from '../../../chunks/_astro_content_BhGu97-X.mjs';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_B8CqUevJ.mjs';
import { $ as $$SectionHeading } from '../../../chunks/SectionHeading_CKN9Gf6S.mjs';
import { $ as $$Timeline } from '../../../chunks/Timeline_DAWHEJga.mjs';
import { u as url } from '../../../chunks/site_DwFBVW5O.mjs';
import { $ as $$WikiLinks } from '../../../chunks/WikiLinks_DtzgpweB.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://mo-righ.github.io");
const getStaticPaths = (async () => {
  const locations = await getCollection("locations");
  return locations.map((entry) => ({ params: { id: entry.id }, props: { entry } }));
});
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { entry } = Astro2.props;
  const d = entry.data;
  const { Content } = await renderEntry(entry);
  const factions = (await getCollection("factions")).filter((f) => d.factions.includes(f.id));
  const characters = (await getCollection("characters")).filter((c) => d.characters.includes(c.id));
  const metaRows = [
    { k: "\u7C7B\u578B", v: d.type },
    { k: "\u6240\u5C5E", v: d.region },
    { k: "\u6C14\u5019", v: d.climate },
    { k: "\u4EBA\u53E3", v: d.population },
    { k: "\u5A01\u80C1\u7B49\u7EA7", v: d.danger }
  ].filter((r) => Boolean(r.v));
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": d.name, "description": d.summary, "kicker": d.enName ?? "LOCATION FILE", "accent": d.accent, "wikiSelf": `location:${entry.id}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="rise"${addAttribute(`--accent:${d.accent}`, "style")}> <div class="flex flex-col gap-5 sm:flex-row sm:items-start"> <div class="grid h-20 w-20 shrink-0 place-items-center rounded-xl border font-mono text-4xl"${addAttribute(`border-color:${d.accent}55;color:${d.accent};background:radial-gradient(circle at 30% 20%, ${d.accent}26, transparent 70%), #0e0e18;box-shadow:0 0 40px -18px ${d.accent}`, "style")}> ${d.icon} </div> <div class="min-w-0 flex-1"> <div class="flex flex-wrap items-center gap-x-3 gap-y-2"> <h1 class="text-3xl font-black tracking-tight text-ink sm:text-4xl">${d.name}</h1> <span class="chip"${addAttribute(`color:${d.accent};border-color:${d.accent}55`, "style")}>${d.type}</span> ${d.danger && renderTemplate`<span class="chip" style="color:#ff4d5e;border-color:#ff4d5e44">威胁 ${d.danger}</span>`} </div> ${d.enName && renderTemplate`<p class="mt-1 font-mono text-[11px] tracking-[0.22em] text-dust-2">${d.enName}</p>`} <p class="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-dust">${d.summary}</p> </div> </div> </header> ${metaRows.length > 0 && renderTemplate`<dl class="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-edge bg-edge/60 sm:grid-cols-3"> ${metaRows.map((r) => renderTemplate`<div class="bg-panel px-4 py-3"> <dt class="font-mono text-[10px] tracking-[0.2em] text-dust-2">${r.k}</dt> <dd class="mt-1 truncate text-[13.5px] text-ink">${r.v}</dd> </div>`)} </dl>`}<div class="prose-oc mt-10"> ${renderComponent($$result2, "Content", Content, {})} </div> ${d.tags.length > 0 && renderTemplate`<div class="mt-8 flex flex-wrap gap-1.5"> ${d.tags.map((t) => renderTemplate`<span class="chip">${t}</span>`)} </div>`}${factions.length > 0 && renderTemplate`${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "title": "\u6B64\u5730\u52BF\u529B", "en": "FACTIONS", "icon": "\u2B22", "accent": d.accent, "id": "factions" }, { "default": async ($$result3) => renderTemplate` <div class="flex flex-wrap gap-2.5"> ${factions.map((f) => renderTemplate`<a${addAttribute(url(`/factions/${f.id}`), "href")} class="panel hoverable px-3.5 py-2.5 text-[13.5px] text-ink"${addAttribute(`--accent:${f.data.accent}`, "style")}> <span class="mr-2 font-mono"${addAttribute(`color:${f.data.accent}`, "style")}>${f.data.emblem}</span> ${f.data.name} </a>`)} </div> ` })}`}${characters.length > 0 && renderTemplate`${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "title": "\u6B64\u5730\u4EBA\u7269", "en": "PERSONS", "icon": "\u25C9", "accent": d.accent, "id": "characters" }, { "default": async ($$result3) => renderTemplate` <div class="flex flex-wrap gap-2.5"> ${characters.map((c) => renderTemplate`<a${addAttribute(url(`/characters/${c.id}`), "href")} class="panel hoverable px-3.5 py-2.5 text-[13.5px] text-ink"${addAttribute(`--accent:${c.data.accent}`, "style")}> ${c.data.name} </a>`)} </div> ` })}`}${d.events.length > 0 && renderTemplate`${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "title": "\u76F8\u5173\u4E8B\u4EF6", "en": "TIMELINE", "icon": "\u231B", "accent": d.accent, "id": "timeline" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Timeline", $$Timeline, { "items": d.events.map((e) => ({
    time: e.time,
    title: e.title,
    desc: e.desc,
    accent: d.accent
  })) })} ` })}`}${renderComponent($$result2, "WikiLinks", $$WikiLinks, { "kind": "location", "id": entry.id, "exclude": [...factions.map((f) => `faction:${f.id}`), ...characters.map((c) => `character:${c.id}`)] })} <div class="mt-14 flex flex-wrap gap-3 border-t border-edge pt-6"> <a${addAttribute(url("/settings"), "href")} class="btn">← 返回设定总览</a> </div> ` })}`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/pages/settings/locations/[id].astro", void 0);

const $$file = "D:/工作地点/the world/oc-s-world/src/pages/settings/locations/[id].astro";
const $$url = "/oc-s-world/settings/locations/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
