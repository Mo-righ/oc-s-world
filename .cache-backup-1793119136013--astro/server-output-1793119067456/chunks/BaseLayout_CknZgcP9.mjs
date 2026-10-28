import { d as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate, e as renderScript, g as renderHead, r as renderComponent, f as renderSlot } from './astro/server_B2vzoAaT.mjs';
import 'piccolore';
/* empty css                        */
import 'clsx';
import { S as SITE_TITLE, a as SITE_TITLE_EN, u as url, i as isActive, c as SITE_AUTHOR, d as SITE_DESCRIPTION } from './site_DwFBVW5O.mjs';

const $$Astro$2 = createAstro("https://mo-righ.github.io");
const $$Nav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Nav;
  const items = [
    { href: "/", label: "\u9996\u9875", en: "INDEX" },
    { href: "/characters", label: "\u4EBA\u7269", en: "DRAMATIS" },
    { href: "/settings", label: "\u8BBE\u5B9A", en: "CODEX" },
    { href: "/factions", label: "\u52BF\u529B", en: "FACTIONS" },
    { href: "/items", label: "\u7269\u54C1", en: "ITEMS" }
  ];
  const current = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 border-b border-edge/80 bg-void/80 backdrop-blur-md supports-[backdrop-filter]:bg-void/60"> <nav class="mx-auto flex w-full max-w-6xl items-center gap-4 px-5 py-3 sm:px-8"> <a${addAttribute(url("/"), "href")} class="group flex items-center gap-2.5 shrink-0"> <span class="grid h-8 w-8 place-items-center rounded border border-neon/50 bg-neon/10 font-mono text-[13px] text-neon shadow-[0_0_18px_-4px_var(--color-neon)]">◎</span> <span class="flex flex-col leading-none"> <span class="text-[15px] font-semibold tracking-wide">${SITE_TITLE}</span> <span class="mt-0.5 font-mono text-[9px] tracking-[0.22em] text-dust-2"> ${SITE_TITLE_EN} </span> </span> </a> <span class="hidden flex-1 sm:block"></span> <!-- 桌面导航 --> <ul class="ml-auto hidden items-center gap-1 sm:flex"> ${items.map((it) => {
    const active = isActive(current, it.href);
    return renderTemplate`<li> <a${addAttribute(url(it.href), "href")}${addAttribute(active ? "page" : void 0, "aria-current")}${addAttribute([
      "group relative block rounded px-3 py-1.5 font-mono text-[12.5px] tracking-wider transition-colors",
      active ? "text-neon" : "text-dust hover:text-ink"
    ], "class:list")}> ${it.label} <span class="ml-1.5 text-[9px] text-dust-2 group-hover:text-dust">${it.en}</span> <span${addAttribute([
      "pointer-events-none absolute inset-x-2 -bottom-px h-px bg-neon transition-transform duration-300",
      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
    ], "class:list")} style="box-shadow:0 0 10px var(--color-neon)"></span> </a> </li>`;
  })} <!-- 桌面检索按钮 --> <li class="ml-2"> <button data-search-open type="button" class="nav-search group flex items-center gap-1.5 rounded border border-edge bg-panel/60 px-2.5 py-1.5 font-mono text-[12px] tracking-wider text-dust transition-colors hover:border-neon/60 hover:text-neon" aria-label="打开档案检索" title="档案检索（Ctrl/⌘ + K 或 /）"> <span class="text-[13px] leading-none">⌕</span> <span class="hidden lg:inline">检索</span> <kbd class="nav-search__kbd hidden lg:inline">⌘K</kbd> </button> </li> </ul> <!-- 移动端检索按钮 --> <button data-search-open type="button" class="ml-auto grid h-9 w-9 place-items-center rounded border border-edge text-dust transition-colors hover:border-neon hover:text-neon sm:hidden" aria-label="打开档案检索"> <span class="text-[15px] leading-none">⌕</span> </button> <!-- 移动端菜单按钮 --> <button id="oc-nav-toggle" type="button" class="ml-1.5 grid h-9 w-9 place-items-center rounded border border-edge text-dust transition-colors hover:border-neon hover:text-neon sm:hidden" aria-controls="oc-nav-mobile" aria-expanded="false" aria-label="打开导航菜单"> <span class="block h-px w-4 bg-current shadow-[0_-5px_0_currentColor,0_5px_0_currentColor]"></span> </button> </nav> <!-- 移动端下拉 --> <ul id="oc-nav-mobile" class="hidden border-t border-edge bg-void-2/95 px-5 py-2 sm:hidden"> <li> <button data-search-open type="button" class="flex w-full items-center justify-between border-b border-edge/60 py-3 font-mono text-sm text-dust"> <span>档案检索</span> <span class="text-[10px] tracking-[0.2em] text-dust-2">QUERY</span> </button> </li> ${items.map((it) => {
    const active = isActive(current, it.href);
    return renderTemplate`<li> <a${addAttribute(url(it.href), "href")}${addAttribute(active ? "page" : void 0, "aria-current")}${addAttribute([
      "flex items-center justify-between border-b border-edge/60 py-3 font-mono text-sm last:border-0",
      active ? "text-neon" : "text-dust"
    ], "class:list")}> <span>${it.label}</span> <span class="text-[10px] tracking-[0.2em] text-dust-2">${it.en}</span> </a> </li>`;
  })} </ul> </header> ${renderScript($$result, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/Nav.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/Nav.astro", void 0);

const $$Astro$1 = createAstro("https://mo-righ.github.io");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="mt-auto border-t border-edge/70 bg-void-2/50"> <div class="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8"> <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"> <div> <p class="font-mono text-[10px] tracking-[0.28em] text-dust-2">${SITE_TITLE_EN}</p> <p class="mt-1.5 text-sm text-dust"> ${SITE_TITLE} · 原创世界观设定集
</p> <p class="mt-1 font-mono text-[11px] text-dust-2">
静态站点由 Astro + Tailwind CSS 构建 · 数据全部来自本地 Markdown
</p> </div> <div class="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-dust-2"> <a class="transition-colors hover:text-neon"${addAttribute(url("/characters"), "href")}>人物</a> <a class="transition-colors hover:text-neon"${addAttribute(url("/settings"), "href")}>设定</a> <a class="transition-colors hover:text-neon"${addAttribute(url("/factions"), "href")}>势力</a> </div> </div> <div class="mt-8 flex flex-col gap-2 border-t border-edge/60 pt-5 font-mono text-[11px] text-dust-2 sm:flex-row sm:items-center sm:justify-between"> <span>© ${year} ${SITE_AUTHOR} · All original settings reserved.</span> <span class="flex items-center gap-2"> <i class="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-neon"></i>
SYSTEM ONLINE
</span> </div> </div> </footer>`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/Footer.astro", void 0);

const $$FxCursor = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="fx-cursor-layer" id="fx-cursor-layer" data-hover="0" data-down="0" aria-hidden="true"> <span class="fx-ring" id="fx-ring"></span> <span class="fx-dot" id="fx-dot"></span> </div> ${renderScript($$result, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/FxCursor.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/FxCursor.astro", void 0);

const $$CrtLayer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="crt-layer" aria-hidden="true"> <span class="crt-sweep"></span> <span class="crt-vignette"></span> </div> <!-- 胶片噪点：独立一层，压在最上面（但仍在光标之下） --> <div class="grain" aria-hidden="true"></div>`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/CrtLayer.astro", void 0);

const $$CityBackdrop = createComponent(($$result, $$props, $$slots) => {
  const base = "/oc-s-world".replace(/\/$/, "");
  let seed = 20261019;
  const rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647;
  const NEON = ["#00e5ff", "#ff2e97", "#ffb020", "#b6ff3c"];
  const row = (width, hMin, hMax, wMin, wMax) => {
    const out = [];
    let x = -30;
    while (x < width + 30) {
      const w = wMin + rnd() * (wMax - wMin);
      const h = hMin + rnd() * (hMax - hMin);
      const lit = [];
      const cols = Math.max(1, Math.floor(w / 10));
      const rows = Math.max(1, Math.floor(h / 15));
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (rnd() > 0.84) {
            lit.push({
              x: 5 + i * 10,
              y: 8 + j * 15,
              w: 3,
              h: 4,
              c: NEON[Math.floor(rnd() * NEON.length)]
            });
          }
        }
      }
      out.push({ x, w, h, lit });
      x += w + 3 + rnd() * 9;
    }
    return out;
  };
  const VB_W = 1440;
  const VB_H = 340;
  const far = row(VB_W, 70, 180, 24, 58);
  const near = row(VB_W, 120, 300, 34, 86);
  return renderTemplate`${maybeRenderHead()}<div class="city-bg" aria-hidden="true"${addAttribute(`--city:url('${base}/bg/city.jpg');--city-sm:url('${base}/bg/city-sm.jpg');`, "style")}> <div class="city-bg__photo"></div> <div class="city-bg__haze"></div> <!-- 远景楼群：更淡、更矮，视差慢 --> <div class="city-bg__layer city-bg__layer--far"> <svg${addAttribute(`0 0 ${VB_W} ${VB_H}`, "viewBox")} preserveAspectRatio="none"> ${far.map((b) => renderTemplate`<g> <rect${addAttribute(b.x, "x")}${addAttribute(VB_H - b.h, "y")}${addAttribute(b.w, "width")}${addAttribute(b.h, "height")} fill="#08080f"></rect> ${b.lit.map((l) => renderTemplate`<rect${addAttribute(b.x + l.x, "x")}${addAttribute(VB_H - b.h + l.y, "y")}${addAttribute(l.w, "width")}${addAttribute(l.h, "height")}${addAttribute(l.c, "fill")} opacity="0.5"></rect>`)} </g>`)} </svg> </div> <!-- 近景楼群：压到最暗，视差快 --> <div class="city-bg__layer city-bg__layer--near"> <svg${addAttribute(`0 0 ${VB_W} ${VB_H}`, "viewBox")} preserveAspectRatio="none"> ${near.map((b) => renderTemplate`<g> <rect${addAttribute(b.x, "x")}${addAttribute(VB_H - b.h, "y")}${addAttribute(b.w, "width")}${addAttribute(b.h, "height")} fill="#04040a"></rect> ${b.lit.map((l) => renderTemplate`<rect${addAttribute(b.x + l.x, "x")}${addAttribute(VB_H - b.h + l.y, "y")}${addAttribute(l.w, "width")}${addAttribute(l.h, "height")}${addAttribute(l.c, "fill")} opacity="0.75"></rect>`)} </g>`)} </svg> </div> <div class="city-bg__grade"></div> </div> ${renderScript($$result, "D:/工作地点/the world/oc-s-world/src/components/CityBackdrop.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/工作地点/the world/oc-s-world/src/components/CityBackdrop.astro", void 0);

const $$AmbientAudio = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button class="bgm" id="bgm" type="button" aria-pressed="false" title="背景音乐开关"> <span class="bgm__bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span> <span class="bgm__label" aria-hidden="true">BGM</span> <span class="sr-only">背景音乐开关</span> </button> ${renderScript($$result, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/AmbientAudio.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/AmbientAudio.astro", void 0);

const $$SearchDialog = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="oc-search" class="oc-search" hidden> <div class="oc-search__scrim" data-close></div> <div class="oc-search__panel" role="dialog" aria-modal="true" aria-label="档案检索"> <div class="oc-search__head"> <span class="oc-search__icon" aria-hidden="true">⌕</span> <input id="oc-search-input" class="oc-search__input" type="text" placeholder="检索档案与页面…" autocomplete="off" spellcheck="false" aria-label="检索关键词"> <button id="oc-search-close" class="oc-search__x" type="button" aria-label="关闭检索">✕</button> </div> <div class="oc-search__bar"> <span id="oc-search-count" class="oc-search__count">—</span> <span class="oc-search__tip">↑↓ 选择 · ↵ 打开 · Esc 关闭</span> </div> <ul id="oc-search-list" class="oc-search__list"></ul> <p id="oc-search-empty" class="oc-search__empty" hidden></p> <div class="oc-search__foot"> <span class="font-mono text-[10px] tracking-[0.2em] text-dust-2">GLIMMER · ARCHIVE QUERY</span> <a${addAttribute(url("/search"), "href")} class="oc-search__more">完整检索页 →</a> </div> </div> </div> ${renderScript($$result, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/SearchDialog.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/SearchDialog.astro", void 0);

const $$Astro = createAstro("https://mo-righ.github.io");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description = SITE_DESCRIPTION,
    accent = "#00e5ff",
    kicker = SITE_TITLE_EN,
    bare = false,
    wikiSelf
  } = Astro2.props;
  const pageTitle = title ? `${title} \xB7 ${SITE_TITLE}` : `${SITE_TITLE} \xB7 \u4E16\u754C\u89C2\u6863\u6848`;
  const canonical = new URL(Astro2.url.pathname, Astro2.site ?? "https://example.com").href;
  return renderTemplate`<html lang="zh-CN"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="theme-color" content="#0a0a0f"><meta name="color-scheme" content="dark"><title>${pageTitle}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonical, "href")}><meta property="og:type" content="website"><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:locale" content="zh_CN"><meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/svg+xml"${addAttribute(url("/favicon.svg"), "href")}>${renderHead()}</head> <body${addAttribute(wikiSelf, "data-wiki-self")}> <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded focus:border focus:border-neon focus:bg-void focus:px-4 focus:py-2 focus:text-neon">
跳到正文
</a>  ${renderComponent($$result, "CityBackdrop", $$CityBackdrop, {})} <div${addAttribute(`--accent:${accent};`, "style")} class="relative flex min-h-screen flex-col"> ${renderComponent($$result, "Nav", $$Nav, {})} ${bare ? renderTemplate`<main id="main" class="relative z-10 flex-1"> ${renderSlot($$result, $$slots["default"])} </main>` : renderTemplate`<main id="main" class="relative z-10 mx-auto w-full max-w-6xl flex-1 px-5 pb-24 pt-10 sm:px-8"> ${kicker && renderTemplate`<p class="kicker mb-3 rise"${addAttribute(`color:${accent};opacity:.85`, "style")}> ${kicker} </p>`} ${renderSlot($$result, $$slots["default"])} </main>`} ${renderComponent($$result, "Footer", $$Footer, {})} </div> ${renderComponent($$result, "CrtLayer", $$CrtLayer, {})} ${renderComponent($$result, "FxCursor", $$FxCursor, {})} ${renderComponent($$result, "AmbientAudio", $$AmbientAudio, {})}  ${renderComponent($$result, "SearchDialog", $$SearchDialog, {})}  ${renderSlot($$result, $$slots["overlay"])} ${renderSlot($$result, $$slots["scripts"])} ${renderScript($$result, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
