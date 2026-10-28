import { d as createAstro, c as createComponent, a as renderTemplate, e as renderScript, b as addAttribute, m as maybeRenderHead, r as renderComponent } from '../chunks/astro/server_B2vzoAaT.mjs';
import 'piccolore';
import { g as getEntry, r as renderEntry, a as getCollection } from '../chunks/_astro_content_BhGu97-X.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_B8CqUevJ.mjs';
import 'clsx';
import { b as byOrder, u as url } from '../chunks/site_DwFBVW5O.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://mo-righ.github.io");
const $$BootGate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BootGate;
  const {
    name,
    mark,
    motto,
    prompt = "\u6309\u4EFB\u610F\u952E\u8FDB\u884C\u8EAB\u4EFD\u8BA4\u8BC1",
    touchPrompt = "\u8F7B\u89E6\u5C4F\u5E55\u4EFB\u610F\u4F4D\u7F6E\u4EE5\u7EE7\u7EED",
    bootLines = [],
    footnotes = [],
    operator = "STARRY",
    role = "",
    clearance = "",
    node = "NODE-07"
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["<!-- \u653E\u5728\u6700\u524D\u9762\uFF1A\u672C\u6B21\u4F1A\u8BDD\u5DF2\u8BA4\u8BC1\u8FC7\u5C31\u76F4\u63A5\u9690\u85CF\uFF0C\u907F\u514D\u5237\u65B0\u65F6\u95EA\u4E00\u4E0B --><script>\n  (function () {\n    var root = document.documentElement;\n    try {\n      if (sessionStorage.getItem('gl-gate-auth') === '1') {\n        root.classList.add('gl-authed');\n      } else {\n        // \u8BA4\u8BC1\u671F\u95F4\u9501\u4F4F\u9875\u9762\u6EDA\u52A8\uFF0C\u907F\u514D\u5728\u906E\u7F69\u4E0B\u9762\u5077\u5077\u6ED1\u52A8\n        root.classList.add('gl-locked');\n      }\n    } catch (e) {\n      root.classList.add('gl-locked');\n    }\n  })();\n<\/script> ", '<div class="gl-gate" id="gl-gate" role="dialog" aria-modal="true" aria-label="\u5FAE\u5149\u6570\u636E\u5E93\u8EAB\u4EFD\u8BA4\u8BC1"> <!-- \u5E95\u5C42\u88C5\u9970\uFF1A\u70B9\u9635 + \u626B\u63CF\u6A2A\u7EB9 + \u626B\u8FC7\u7AD6\u7EBF --> <div class="gl-gate__grid" aria-hidden="true"></div> <div class="gl-gate__scan" aria-hidden="true"></div> <div class="gl-gate__vscan" aria-hidden="true"></div> <!-- \u5185\u6846\u56DB\u89D2 --> <div class="gl-gate__frame" aria-hidden="true"> <i></i><i></i><i></i><i></i> </div> <!-- \u8FB9\u89D2 HUD \u8BFB\u6570 --> <div class="gl-gate__hud gl-gate__hud--tl" aria-hidden="true"> <span>', '</span> <span>SESSION <b id="gl-sid">\xB7\xB7\xB7\xB7</b></span> </div> <div class="gl-gate__hud gl-gate__hud--bl" aria-hidden="true"> <span>LAT 53.55N \xB7 LON 108.16E</span> <span>PROTOCOL GLIMMER/2.7</span> </div> <div class="gl-gate__hud gl-gate__hud--br" aria-hidden="true"> <span>LOCAL TIME <b id="gl-gtime">--:--:--</b></span> <span>BUILD GL-2610</span> </div> <a class="gl-gate__skip" href="#main" id="gl-skip">\u8DF3\u8FC7\u8BA4\u8BC1</a> <div class="gl-gate__inner"> <!-- \u6807\u9898\u533A\uFF1A\u80CC\u540E\u5957\u4E00\u7EC4\u540C\u5FC3\u73AF\u4E0E\u523B\u5EA6\uFF0C\u7F13\u6162\u53CD\u5411\u65CB\u8F6C --> <div class="gl-gate__hero"> <div class="gl-gate__reticle" aria-hidden="true"> <i class="rt-r1"></i> <i class="rt-r2"></i> <i class="rt-r3"></i> <b class="rt-c1"></b><b class="rt-c2"></b><b class="rt-c3"></b><b class="rt-c4"></b> </div> <p class="gl-gate__mark">', '</p> <h1 class="gl-gate__title glitch gl-flicker"', ">", '</h1> <p class="gl-gate__motto">', '</p> </div> <!-- \u8BBF\u95EE\u8005\u8EAB\u4EFD --> <div class="gl-gate__id"> <span class="gl-gate__id-k">OPERATOR</span> <b class="gl-gate__id-n">', "</b> ", " ", ` </div> <div class="gl-gate__log" id="gl-log" aria-live="polite"> <!-- \u5F85\u673A\u6001\uFF1A\u4FE1\u53F7\u6CE2\u52A8\u6761\uFF0C\u6309\u4E0B\u4EFB\u610F\u952E\u540E\u968F log.innerHTML='' \u4E00\u8D77\u6E05\u6389 --> <div class="gl-gate__idle" aria-hidden="true"> <span class="gl-gate__idle-tag">SIG</span> <span class="gl-gate__idle-bars"> `, ' </span> </div> </div> <p class="gl-gate__prompt" id="gl-prompt"', ">", '</p> <!-- \u5E95\u90E8\u8FDB\u5EA6\u6761\uFF1A\u7B49\u5F85\u65F6\u6765\u56DE\u626B\uFF0C\u8BA4\u8BC1\u65F6\u6309\u884C\u63A8\u8FDB --> <div class="gl-gate__meter"> <span class="gl-gate__meter-bar" id="gl-meter-bar" aria-hidden="true"><i id="gl-meter"></i></span> <span class="gl-gate__meter-txt" id="gl-meter-txt" aria-hidden="true">AWAITING INPUT</span> </div> </div> ', ' </div> <!-- \u8BA4\u8BC1\u65F6\u9010\u884C\u6253\u51FA\u6765\u7684\u65E5\u5FD7\uFF1B\u653E\u5728\u9690\u85CF\u5BB9\u5668\u91CC\uFF0C\u811A\u672C\u8BFB\u53D6\u6587\u672C --> <div id="gl-lines" hidden> ', " </div> ", ""])), maybeRenderHead(), node, mark, addAttribute(name, "data-text"), name, motto, operator, role && renderTemplate`<span class="gl-gate__id-role">${role}</span>`, clearance && renderTemplate`<span class="gl-gate__id-clr">${clearance}</span>`, Array.from({ length: 44 }).map((_, i) => renderTemplate`<i${addAttribute(`animation-delay:${(i % 11 * 0.09).toFixed(2)}s`, "style")}></i>`), addAttribute(touchPrompt, "data-touch"), prompt, footnotes.length > 0 && renderTemplate`<div class="gl-gate__foot"> ${footnotes.map((f) => renderTemplate`<span>${f}</span>`)} </div>`, bootLines.map((line) => renderTemplate`<span data-line>${line}</span>`), renderScript($$result, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/BootGate.astro?astro&type=script&index=0&lang.ts"));
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/BootGate.astro", void 0);

const $$DataRain = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<canvas class="data-rain" id="data-rain" aria-hidden="true"></canvas> ${renderScript($$result, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/DataRain.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/DataRain.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const home = await getEntry("pages", "home");
  if (!home) throw new Error("\u7F3A\u5C11 src/content/pages/home.md \u2014\u2014 \u9996\u9875\u6587\u6848\u662F\u5FC5\u9700\u7684\u3002");
  const { Content } = await renderEntry(home);
  const d = home.data;
  const t = d.terminal ?? {};
  const characters = (await getCollection("characters")).sort(byOrder);
  const factions = (await getCollection("factions")).sort(byOrder);
  const locations = (await getCollection("locations")).sort(byOrder);
  const lore = (await getCollection("lore")).sort(byOrder);
  const events = (await getCollection("timeline")).sort(byOrder);
  const readouts = [
    { label: "\u4EBA\u7269\u6863\u6848", code: "PERSONS", value: characters.length },
    { label: "\u52BF\u529B\u8282\u70B9", code: "FACTIONS", value: factions.length },
    { label: "\u5730\u7406\u8282\u70B9", code: "GEO", value: locations.length },
    { label: "\u7F16\u5E74\u53F2", code: "CHRONICLE", value: events.length }
  ];
  const sections = d.sections ?? [];
  const recentLog = [...events].slice(-5).reverse();
  const topFactions = factions.slice(0, 7);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "bare": true, "title": d.title, "description": d.description, "accent": d.accent, "kicker": d.kicker }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "DataRain", $$DataRain, {})}  ${maybeRenderHead()}<div class="mx-auto w-full max-w-6xl px-5 pt-6 sm:px-8"> <div class="term-bar rounded-md border border-edge bg-panel/70 backdrop-blur-sm"> <span class="term-bar__dots"><i></i><i></i><i></i></span> <span class="truncate">${t.mark}</span> <span class="ml-auto flex items-center gap-2"> <span class="led"></span> <span class="hidden sm:inline">${t.statusLine}</span> </span> <span class="hidden items-center gap-1.5 border-l border-edge pl-2.5 md:flex"> <span class="text-dust-2">OPERATOR</span> <b class="font-medium tracking-[0.22em] text-amber">${t.operator ?? "STARRY"}</b> </span> <span class="text-amber tabular-nums" id="gl-clock">--:--:--</span> </div> </div>  <section class="relative"> <div class="mx-auto w-full max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20"> <p class="kicker rise"${addAttribute(`color:${d.accent}`, "style")}> ${t.node ?? "NODE-07"} · ACCESS ${t.accessCode ?? "GL-0000"} </p> <h1 class="glitch rise mt-4 text-[clamp(4rem,18vw,10rem)] font-black leading-[0.82] tracking-tight text-ink"${addAttribute(d.title, "data-text")}${addAttribute(`text-shadow:0 0 60px ${d.accent}66, 0 0 160px ${d.accent}26`, "style")}> ${d.title} </h1> ${d.subtitle && renderTemplate`<p class="rise mt-4 font-mono text-[11px] tracking-[0.5em] text-dust-2" style="animation-delay:80ms"> ${d.subtitle} </p>`} ${d.motto && renderTemplate`<p class="rise mt-7 font-mono text-[clamp(0.85rem,3vw,1.15rem)] tracking-[0.35em]"${addAttribute(`color:${d.accent};text-indent:.35em;animation-delay:160ms`, "style")}>
「${d.motto}」
</p>`} ${d.description && renderTemplate`<p class="rise mt-7 max-w-xl text-[14.5px] leading-relaxed text-dust" style="animation-delay:240ms"> ${d.description} </p>`} <div class="rise mt-10 flex flex-wrap gap-3" style="animation-delay:320ms"> <a${addAttribute(url("/settings"), "href")} class="btn"${addAttribute(`border-color:${d.accent}66;color:${d.accent}`, "style")}> <span>▶</span> 打开档案索引
</a> <a${addAttribute(url("/characters"), "href")} class="btn">查阅人物</a> <button type="button" class="btn" id="gl-relogin"> <span class="led led--amber"></span> 重新认证
</button> </div> </div> </section>  <section class="mx-auto w-full max-w-6xl px-5 sm:px-8"> <div class="grid grid-cols-2 gap-3 sm:grid-cols-4"> ${readouts.map((r) => renderTemplate`<div class="readout"${addAttribute(`--accent:${d.accent}`, "style")}> <p class="font-mono text-[9.5px] tracking-[0.2em] text-dust-2">${r.code}</p> <p class="mt-1.5 flex items-baseline gap-1.5"> <span class="font-mono text-2xl font-bold tabular-nums"${addAttribute(`color:${d.accent}`, "style")} data-scramble> ${String(r.value).padStart(2, "0")} </span> <span class="font-mono text-[10px] text-dust-2">条</span> </p> <p class="mt-0.5 text-[11.5px] text-dust">${r.label}</p> </div>`)} </div> </section>  <section class="mx-auto mt-12 grid w-full max-w-6xl gap-5 px-5 sm:px-8 lg:grid-cols-5"> <div class="term-panel lg:col-span-3"> <div class="term-bar"> <span class="led"></span> <span class="text-dust">ARCHIVE INDEX</span> <span class="ml-auto">3 CHANNELS</span> </div> <div class="p-1.5"> ${sections.map((s, i) => renderTemplate`<a${addAttribute(url(s.href), "href")} class="term-row"> <span class="term-row__idx">${String(i + 1).padStart(2, "0")}</span> <span class="font-mono"${addAttribute(`color:${d.accent}`, "style")}> ${s.icon} </span> <span class="min-w-0 flex-1"> <span class="block text-ink">${s.title}</span> <span class="mt-0.5 block font-sans text-[12px] leading-snug text-dust-2"> ${s.desc} </span> </span> <span class="term-row__idx shrink-0 text-right">OPEN →</span> </a>`)} </div> </div> <div class="term-panel lg:col-span-2"> <div class="term-bar"> <span class="led led--plasma"></span> <span class="text-dust">LOG STREAM</span> <span class="ml-auto">TAIL -5</span> </div> <ul class="p-1.5"> ${recentLog.map((e) => renderTemplate`<li class="term-row"> <span class="term-row__idx shrink-0">${e.data.date.slice(0, 10)}</span> <span class="min-w-0 flex-1 truncate text-ink/90"${addAttribute(e.data.title, "title")}> ${e.data.title} </span> <span class="chip shrink-0"${addAttribute(`color:${e.data.accent};border-color:${e.data.accent}44`, "style")}> ${e.data.tag} </span> </li>`)} <li class="term-row"> <span class="term-row__idx">…</span> <span class="min-w-0 flex-1 text-dust-2"> <a class="hover:underline"${addAttribute(url("/settings#history"), "href")}>读取完整编年史</a> </span> </li> </ul> </div> </section>  <section class="mx-auto mt-5 w-full max-w-6xl px-5 sm:px-8"> <div class="term-panel"> <div class="term-bar"> <span class="led led--amber"></span> <span class="text-dust">CONNECTED NODES</span> <span class="ml-auto">${topFactions.length} ONLINE</span> </div> <div class="grid gap-px bg-edge/25 sm:grid-cols-2 lg:grid-cols-3"> ${topFactions.map((f) => renderTemplate`<a${addAttribute(url(`/factions/${f.id}`), "href")} class="flex items-center gap-3 bg-void/85 px-4 py-3 transition-colors hover:bg-panel"> <span class="font-mono text-base"${addAttribute(`color:${f.data.accent}`, "style")}> ${f.data.emblem} </span> <span class="min-w-0 flex-1"> <span class="block truncate text-[13px] text-ink">${f.data.name}</span> <span class="block truncate font-mono text-[10px] text-dust-2">${f.data.type}</span> </span> <span class="led shrink-0"${addAttribute(`background:${f.data.accent};box-shadow:0 0 8px ${f.data.accent}`, "style")}></span> </a>`)} </div> </div> </section>  <section class="mx-auto mt-12 w-full max-w-6xl px-5 pb-20 sm:px-8"> <div class="term-panel"> <div class="term-bar"> <span class="term-bar__dots"><i></i><i></i><i></i></span> <span class="text-dust">briefing.md</span> <span class="ml-auto hidden sm:inline">${t.clearance ?? "FULL ACCESS"}</span> </div> <div class="prose-oc max-w-none px-5 py-7 sm:px-8"> ${renderComponent($$result2, "Content", Content, {})} </div> </div> <p class="mt-6 text-center font-mono text-[10.5px] tracking-[0.24em] text-dust-2"> ${lore.length} SYSTEMS INDEXED · ${locations.length} GEO NODES · MIRROR SYNCED
</p> </section> ${renderScript($$result2, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/pages/index.astro?astro&type=script&index=0&lang.ts")} `, "overlay": async ($$result2) => renderTemplate`${renderComponent($$result2, "BootGate", $$BootGate, { "slot": "overlay", "name": d.title, "mark": t.mark ?? "GLIMMER // INTERNAL DATABASE", "motto": d.motto ?? "", "prompt": t.prompt, "touchPrompt": t.touchPrompt, "bootLines": t.bootLines, "footnotes": t.footnotes, "operator": t.operator, "role": t.role, "clearance": t.clearance, "node": t.node })}` })}`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/pages/index.astro", void 0);

const $$file = "D:/工作地点/the world/oc-s-world/src/pages/index.astro";
const $$url = "/oc-s-world";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
