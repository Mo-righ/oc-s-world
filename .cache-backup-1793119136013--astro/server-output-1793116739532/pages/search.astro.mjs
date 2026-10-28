import { d as createAstro, c as createComponent, r as renderComponent, e as renderScript, a as renderTemplate, b as addAttribute, m as maybeRenderHead, u as unescapeHTML } from '../chunks/astro/server_B2vzoAaT.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_B8CqUevJ.mjs';
import { b as buildSearchIndex, K as KIND_ORDER, a as KIND_INFO } from '../chunks/search-index_CzRz6BB9.mjs';
import { u as url } from '../chunks/site_DwFBVW5O.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://mo-righ.github.io");
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Search;
  const items = await buildSearchIndex();
  const initialQ = (Astro2.url.searchParams.get("q") ?? "").trim();
  const indexJson = JSON.stringify(items).replace(/</g, "\\u003c");
  const chips = [
    { k: "all", label: "\u5168\u90E8", icon: "\u2261" },
    ...KIND_ORDER.map((k) => ({ k, label: KIND_INFO[k].label, icon: KIND_INFO[k].icon }))
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u6863\u6848\u68C0\u7D22", "kicker": "ARCHIVE QUERY", "accent": "#00e5ff" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([' <script type="application/json" id="oc-index-data">', "<\/script> ", '<header class="rise"> <h1 class="text-3xl font-black tracking-tight text-ink sm:text-4xl">\u6863\u6848\u68C0\u7D22</h1> <p class="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-dust">\n\u5728\u5168\u90E8\u4EBA\u7269\u3001\u52BF\u529B\u3001\u5730\u70B9\u3001\u4F53\u7CFB\u3001\u4E8B\u4EF6\u4E0E\u9875\u9762\u6587\u6848\u4E2D\u67E5\u627E\u3002\u652F\u6301\u540D\u79F0\u3001\u522B\u540D\u3001\u82F1\u6587\u540D\u3001\u6807\u7B7E\u4E0E\u6B63\u6587\u5185\u5BB9\uFF0C\n      \u591A\u4E2A\u5173\u952E\u8BCD\u7528\u7A7A\u683C\u5206\u9694\uFF08\u9700\u540C\u65F6\u547D\u4E2D\uFF09\u3002\n</p> </header> <div class="mt-8 rise" style="animation-delay:.08s"> <label class="sr-page__box"> <span class="sr-page__icon" aria-hidden="true">\u2315</span> <input id="sr-input" class="sr-page__input" type="text" placeholder="\u8F93\u5165\u5173\u952E\u8BCD\uFF0C\u4F8B\u5982\uFF1A\u5FAE\u5149 UOSC \u6C61\u67D3" autocomplete="off" spellcheck="false" aria-label="\u68C0\u7D22\u5173\u952E\u8BCD"', '> <span id="sr-count" class="sr-page__count">\u2014</span> </label> <div class="mt-4 flex flex-wrap gap-2" id="sr-chips"> ', ' </div> </div> <ul id="sr-list" class="sr-page__list mt-6" aria-label="\u68C0\u7D22\u7ED3\u679C"></ul> <p id="sr-empty" class="sr-page__empty" hidden></p> <div class="mt-10 flex flex-wrap gap-3 border-t border-edge pt-6"> <a', ' class="btn">\u2190 \u8FD4\u56DE\u7EC8\u7AEF</a> </div> '])), unescapeHTML(indexJson), maybeRenderHead(), addAttribute(initialQ, "value"), chips.map((c) => renderTemplate`<button class="sr-chip" type="button"${addAttribute(c.k, "data-kind")}${addAttribute(c.k === "all" ? "true" : "false", "aria-pressed")}> <span class="sr-chip__icon">${c.icon}</span> ${c.label} </button>`), addAttribute(url("/"), "href")) })} ${renderScript($$result, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/pages/search.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/pages/search.astro", void 0);

const $$file = "D:/工作地点/the world/oc-s-world/src/pages/search.astro";
const $$url = "/oc-s-world/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Search,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
