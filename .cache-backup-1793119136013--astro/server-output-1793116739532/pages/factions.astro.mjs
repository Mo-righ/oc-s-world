import { d as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_B2vzoAaT.mjs';
import 'piccolore';
import { a as getCollection } from '../chunks/_astro_content_BhGu97-X.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_B8CqUevJ.mjs';
import 'clsx';
import { u as url, b as byOrder } from '../chunks/site_DwFBVW5O.mjs';
import { $ as $$SectionHeading } from '../chunks/SectionHeading_CKN9Gf6S.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://mo-righ.github.io");
const $$FactionCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FactionCard;
  const {
    id,
    name,
    enName,
    type = "\u7EC4\u7EC7",
    emblem = "\u25C6",
    accent = "#ff2e97",
    motto,
    leader,
    headquarters,
    influence,
    tags = [],
    summary,
    memberCount = 0
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url(`/factions/${id}`), "href")} class="panel corners hoverable group flex flex-col overflow-hidden"${addAttribute(`--accent:${accent}`, "style")}> <!-- 顶部色带 --> <div class="flex items-center gap-3 border-b border-edge/70 px-5 py-4"${addAttribute(`background:linear-gradient(100deg, ${accent}1f, transparent 65%)`, "style")}> <span class="grid h-11 w-11 shrink-0 place-items-center rounded-md border text-xl"${addAttribute(`border-color:${accent}55;color:${accent};background:#0e0e18`, "style")}>${emblem}</span> <div class="min-w-0"> <h3 class="truncate text-[17px] font-bold text-ink transition-colors group-hover:text-[var(--accent)]"> ${name} </h3> <p class="truncate font-mono text-[10px] tracking-[0.18em] text-dust-2"> ${enName ?? type} </p> </div> <span class="chip ml-auto shrink-0"${addAttribute(`color:${accent};border-color:${accent}44`, "style")}>${type}</span> </div> <div class="flex flex-1 flex-col px-5 py-4"> ${motto && renderTemplate`<p class="mb-3 border-l-2 pl-3 text-[13px] italic text-dust"${addAttribute(`border-color:${accent}66`, "style")}>「${motto}」</p>`} <p class="line-clamp-4 text-[13.5px] leading-relaxed text-dust">${summary}</p> <dl class="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-edge/70 pt-3 font-mono text-[11px]"> <div class="min-w-0"> <dt class="text-dust-2">LEADER</dt> <dd class="truncate text-ink/90">${leader ?? "\u2014"}</dd> </div> <div class="min-w-0"> <dt class="text-dust-2">BASE</dt> <dd class="truncate text-ink/90">${headquarters ?? "\u2014"}</dd> </div> <div class="min-w-0"> <dt class="text-dust-2">INFLUENCE</dt> <dd class="truncate text-ink/90">${influence ?? "\u2014"}</dd> </div> <div class="min-w-0"> <dt class="text-dust-2">MEMBERS</dt> <dd class="truncate text-ink/90">${memberCount > 0 ? `${memberCount} \u4F4D\u5DF2\u767B\u8BB0` : "\u2014"}</dd> </div> </dl> <div class="mt-4 flex flex-wrap gap-1.5"> ${tags.slice(0, 4).map((t) => renderTemplate`<span class="chip">${t}</span>`)} </div> <div class="mt-auto flex items-center justify-end pt-4"> <span class="font-mono text-[11px] text-dust-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)]">
查阅档案 →
</span> </div> </div> </a>`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/FactionCard.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const factions = (await getCollection("factions")).sort(byOrder);
  const characters = await getCollection("characters");
  const countOf = (factionId) => characters.filter((c) => c.data.faction === factionId).length;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u52BF\u529B\u683C\u5C40", "description": "\u661F\u9668\u7EAA\u754C\u4E2D\u7684\u7EC4\u7EC7\u4E0E\u52BF\u529B\uFF1A\u4ECE UOSC \u7684\u4F1A\u8BAE\u5BA4\u5230\u8D1D\u52A0\u5C14\u6E56\u7554\u7684\u8425\u5730\uFF0C\u4E03\u65B9\u52BF\u529B\u5404\u6709\u5404\u7684\u7B97\u76D8\u3002", "kicker": "FACTIONS & ORGANIZATIONS", "accent": "#ff2e97" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="rise"> <h1 class="text-3xl font-black tracking-tight text-ink sm:text-4xl">势力格局</h1> <p class="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-dust">
灾后没有赢家，只有不同程度的幸存者。有人想恢复旧秩序，有人想换掉人类本身，还有人只想把下个月的账做平。
</p> <p class="mt-2 font-mono text-[11px] text-dust-2">
共 <span class="text-plasma">${factions.length}</span> 个已登记组织
</p> </header> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "title": "\u7EC4\u7EC7\u540D\u5F55", "en": "REGISTRY", "icon": "\u2B22", "accent": "#ff2e97", "id": "registry" }, { "default": async ($$result3) => renderTemplate` <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"> ${factions.map((f) => renderTemplate`${renderComponent($$result3, "FactionCard", $$FactionCard, { "id": f.id, "name": f.data.name, "enName": f.data.enName, "type": f.data.type, "emblem": f.data.emblem, "accent": f.data.accent, "motto": f.data.motto, "leader": f.data.leader, "headquarters": f.data.headquarters, "influence": f.data.influence, "tags": f.data.tags, "summary": f.data.summary, "memberCount": countOf(f.id) })}`)} </div> ` })} ` })}`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/pages/factions/index.astro", void 0);

const $$file = "D:/工作地点/the world/oc-s-world/src/pages/factions/index.astro";
const $$url = "/oc-s-world/factions";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
