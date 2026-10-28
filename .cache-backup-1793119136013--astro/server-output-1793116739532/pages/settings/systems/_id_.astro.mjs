import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../../chunks/astro/server_B2vzoAaT.mjs';
import 'piccolore';
import { r as renderEntry, a as getCollection } from '../../../chunks/_astro_content_BhGu97-X.mjs';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_B8CqUevJ.mjs';
import { $ as $$SectionHeading } from '../../../chunks/SectionHeading_CKN9Gf6S.mjs';
import { u as url } from '../../../chunks/site_DwFBVW5O.mjs';
import { $ as $$WikiLinks } from '../../../chunks/WikiLinks_DtzgpweB.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://mo-righ.github.io");
const getStaticPaths = (async () => {
  const lore = await getCollection("lore");
  return lore.map((entry) => ({ params: { id: entry.id }, props: { entry } }));
});
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { entry } = Astro2.props;
  const d = entry.data;
  const { Content } = await renderEntry(entry);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": d.name, "description": d.summary, "kicker": d.enName ?? "SYSTEM FILE", "accent": d.accent, "wikiSelf": `system:${entry.id}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="rise"${addAttribute(`--accent:${d.accent}`, "style")}> <div class="flex flex-col gap-5 sm:flex-row sm:items-start"> <div class="grid h-20 w-20 shrink-0 place-items-center rounded-xl border text-4xl"${addAttribute(`border-color:${d.accent}55;color:${d.accent};background:radial-gradient(circle at 30% 20%, ${d.accent}26, transparent 70%), #0e0e18;box-shadow:0 0 40px -18px ${d.accent}`, "style")}> ${d.icon} </div> <div class="min-w-0 flex-1"> <div class="flex flex-wrap items-center gap-x-3 gap-y-2"> <h1 class="text-3xl font-black tracking-tight text-ink sm:text-4xl">${d.name}</h1> <span class="chip"${addAttribute(`color:${d.accent};border-color:${d.accent}55`, "style")}>${d.category}</span> </div> ${d.enName && renderTemplate`<p class="mt-1 font-mono text-[11px] tracking-[0.22em] text-dust-2">${d.enName}</p>`} <p class="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-dust">${d.summary}</p> </div> </div> </header>  ${d.terms.length > 0 && renderTemplate`${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "title": "\u5173\u952E\u6761\u76EE", "en": "KEY TERMS", "icon": "\u2317", "accent": d.accent, "id": "terms" }, { "default": async ($$result3) => renderTemplate` <dl class="grid gap-px overflow-hidden rounded-lg border border-edge bg-edge/60 sm:grid-cols-2"> ${d.terms.map((t) => renderTemplate`<div class="bg-panel px-4 py-3"> <dt class="font-mono text-[10px] tracking-[0.18em]"${addAttribute(`color:${d.accent}`, "style")}> ${t.key} </dt> <dd class="mt-1 text-[13.5px] leading-relaxed text-ink/90">${t.value}</dd> </div>`)} </dl> ` })}`}<div class="prose-oc mt-10"> ${renderComponent($$result2, "Content", Content, {})} </div> ${d.tags.length > 0 && renderTemplate`<div class="mt-8 flex flex-wrap gap-1.5"> ${d.tags.map((t) => renderTemplate`<span class="chip">${t}</span>`)} </div>`}${renderComponent($$result2, "WikiLinks", $$WikiLinks, { "kind": "system", "id": entry.id })} <div class="mt-14 flex flex-wrap gap-3 border-t border-edge pt-6"> <a${addAttribute(url("/settings"), "href")} class="btn">← 返回设定总览</a> </div> ` })}`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/pages/settings/systems/[id].astro", void 0);

const $$file = "D:/工作地点/the world/oc-s-world/src/pages/settings/systems/[id].astro";
const $$url = "/oc-s-world/settings/systems/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
