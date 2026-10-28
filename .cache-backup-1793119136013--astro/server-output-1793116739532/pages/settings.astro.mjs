import { d as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_B2vzoAaT.mjs';
import 'piccolore';
import { a as getCollection } from '../chunks/_astro_content_BhGu97-X.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_B8CqUevJ.mjs';
import { $ as $$SectionHeading } from '../chunks/SectionHeading_CKN9Gf6S.mjs';
import 'clsx';
import { u as url, b as byOrder } from '../chunks/site_DwFBVW5O.mjs';
import { $ as $$Timeline } from '../chunks/Timeline_DAWHEJga.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("https://mo-righ.github.io");
const $$LocationCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LocationCard;
  const {
    id,
    name,
    enName,
    type = "\u5730\u533A",
    region,
    danger,
    icon = "\u25C8",
    accent = "#8b5cf6",
    tags = [],
    summary
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url(`/settings/locations/${id}`), "href")} class="panel hoverable group flex flex-col overflow-hidden p-5"${addAttribute(`--accent:${accent}`, "style")}> <div class="flex items-start gap-3"> <span class="neon-text mt-0.5 shrink-0 font-mono text-xl">${icon}</span> <div class="min-w-0 flex-1"> <h3 class="text-[17px] font-bold leading-tight text-ink transition-colors group-hover:text-[var(--accent)]"> ${name} </h3> <p class="mt-0.5 truncate font-mono text-[10px] tracking-[0.18em] text-dust-2"> ${enName ?? type} </p> </div> ${danger && renderTemplate`<span class="chip shrink-0"${addAttribute(`color:${accent};border-color:${accent}44`, "style")}>威胁 ${danger}</span>`} </div> <p class="mt-3.5 line-clamp-3 text-[13.5px] leading-relaxed text-dust">${summary}</p> <div class="mt-4 flex flex-wrap items-center gap-1.5"> ${region && renderTemplate`<span class="chip">${region}</span>`} ${tags.slice(0, 3).map((t) => renderTemplate`<span class="chip">${t}</span>`)} </div> <div class="mt-4 flex items-center justify-end border-t border-edge/70 pt-3"> <span class="font-mono text-[11px] text-dust-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)]">
勘查记录 →
</span> </div> </a>`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/LocationCard.astro", void 0);

const $$Astro = createAstro("https://mo-righ.github.io");
const $$LoreCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LoreCard;
  const {
    id,
    name,
    enName,
    category = "\u4F53\u7CFB",
    icon = "\u2699",
    accent = "#b6ff3c",
    tags = [],
    summary
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url(`/settings/systems/${id}`), "href")} class="panel corners hoverable group flex flex-col p-5"${addAttribute(`--accent:${accent}`, "style")}> <div class="flex items-center gap-3"> <span class="grid h-10 w-10 shrink-0 place-items-center rounded-md border text-lg"${addAttribute(`border-color:${accent}44;color:${accent};background:#0e0e18`, "style")}>${icon}</span> <div class="min-w-0"> <h3 class="truncate text-[16px] font-bold text-ink transition-colors group-hover:text-[var(--accent)]"> ${name} </h3> <p class="truncate font-mono text-[10px] tracking-[0.18em] text-dust-2">${enName ?? category}</p> </div> </div> <p class="mt-3.5 line-clamp-3 text-[13.5px] leading-relaxed text-dust">${summary}</p> <div class="mt-4 flex flex-wrap gap-1.5"> <span class="chip"${addAttribute(`color:${accent};border-color:${accent}44`, "style")}>${category}</span> ${tags.slice(0, 2).map((t) => renderTemplate`<span class="chip">${t}</span>`)} </div> <div class="mt-auto flex items-center justify-end pt-4"> <span class="font-mono text-[11px] text-dust-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)]">
展开条目 →
</span> </div> </a>`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/LoreCard.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const locations = (await getCollection("locations")).sort(byOrder);
  const lore = (await getCollection("lore")).sort(byOrder);
  const events = (await getCollection("timeline")).sort(byOrder);
  const tabs = [
    { href: "#geography", label: "\u5730\u7406", en: "GEO" },
    { href: "#history", label: "\u5386\u53F2", en: "HISTORY" },
    { href: "#systems", label: "\u4F53\u7CFB", en: "SYSTEMS" }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u8BBE\u5B9A\u603B\u89C8", "description": "\u661F\u9668\u7EAA\u754C\u7684\u5730\u7406\u3001\u7F16\u5E74\u53F2\u4E0E\u6280\u672F\u4F53\u7CFB\u3002", "kicker": "CODEX / \u8BBE\u5B9A\u6863\u6848", "accent": "#8b5cf6" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="rise"> <h1 class="text-3xl font-black tracking-tight text-ink sm:text-4xl">设定总览</h1> <p class="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-dust">
这个世界有三根支柱：<strong class="font-semibold text-neon">一片被灰烬重新划过的地图</strong>、<strong class="font-semibold text-amber">一条从太阳开始的编年史</strong>，以及<strong class="font-semibold text-acid">一套让科学和神秘学互相顶住的体系</strong>。
</p> <nav class="mt-6 flex flex-wrap gap-2" aria-label="设定分类"> ${tabs.map((t) => renderTemplate`<a${addAttribute(t.href, "href")} class="btn"> ${t.label} <span class="text-[9px] text-dust-2">${t.en}</span> </a>`)} </nav> </header>  ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "title": "\u5730\u7406", "en": "GEOGRAPHY", "icon": "\u25C8", "accent": "#8b5cf6", "desc": "\u707E\u540E\u7684\u5730\u56FE\u4E0D\u518D\u7531\u56FD\u754C\u5212\u5206\uFF0C\u800C\u662F\u7531\u300C\u8C01\u80FD\u5B88\u4F4F\u4E00\u7247\u6DE1\u6C34\u300D\u5212\u5206\u3002", "id": "geography" }, { "default": async ($$result3) => renderTemplate` <div class="grid gap-4 sm:grid-cols-2"> ${locations.map((l) => renderTemplate`${renderComponent($$result3, "LocationCard", $$LocationCard, { "id": l.id, "name": l.data.name, "enName": l.data.enName, "type": l.data.type, "region": l.data.region, "danger": l.data.danger, "icon": l.data.icon, "accent": l.data.accent, "tags": l.data.tags, "summary": l.data.summary })}`)} </div> ${locations.length === 0 && renderTemplate`<p class="font-mono text-[12px] text-dust-2">
还没有地点。在 src/content/locations/ 里新建 .md 即可。
</p>`}` })}  ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "title": "\u5386\u53F2", "en": "CHRONICLE", "icon": "\u231B", "accent": "#ffb020", "desc": "\u4ECE 2026 \u5E74 5 \u6708 26 \u65E5\u90A3\u9897\u5C0F\u884C\u661F\u88AB\u6355\u83B7\u5F00\u59CB\uFF0C\u5230\u300C\u79D1\u5B66\u2248\u795E\u79D8\u5B66\u300D\u7684\u4ECA\u5929\u3002", "id": "history" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Timeline", $$Timeline, { "items": events.map((e) => ({
    time: e.data.date,
    title: e.data.title,
    desc: e.data.summary,
    tag: e.data.tag,
    accent: e.data.accent
  })) })} ` })}  ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "title": "\u4F53\u7CFB", "en": "SYSTEMS", "icon": "\u2699", "accent": "#b6ff3c", "desc": "\u6C61\u67D3\u662F\u8D77\u56E0\uFF0C\u5F02\u80FD\u662F\u4EE3\u4EF7\uFF0C\u5F02\u80FD\u79D1\u6280\u662F\u4EBA\u7C7B\u4E3A\u4E86\u4E0D\u4ED8\u8FD9\u4E2A\u4EE3\u4EF7\u800C\u9020\u51FA\u6765\u7684\u4E1C\u897F\u3002", "id": "systems" }, { "default": async ($$result3) => renderTemplate` <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"> ${lore.map((l) => renderTemplate`${renderComponent($$result3, "LoreCard", $$LoreCard, { "id": l.id, "name": l.data.name, "enName": l.data.enName, "category": l.data.category, "icon": l.data.icon, "accent": l.data.accent, "tags": l.data.tags, "summary": l.data.summary })}`)} </div> ` })} ` })}`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/pages/settings/index.astro", void 0);

const $$file = "D:/工作地点/the world/oc-s-world/src/pages/settings/index.astro";
const $$url = "/oc-s-world/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
