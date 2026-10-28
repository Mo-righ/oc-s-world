import { d as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate } from './astro/server_B2vzoAaT.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro("https://mo-righ.github.io");
const $$Timeline = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Timeline;
  const { items, accent = "#00e5ff" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<ol class="relative m-0 list-none p-0"> ${items.map((it, i) => {
    const c = it.accent ?? accent;
    return renderTemplate`<li class="tl-item relative pl-11 pb-8 last:pb-0 sm:pl-16"${addAttribute(`--tl:${c}`, "style")}>  <span class="tl-line absolute left-[9px] top-4 bottom-0 w-px sm:left-[15px]" style="background:linear-gradient(180deg, color-mix(in srgb, var(--tl) 70%, transparent) 0%, color-mix(in srgb, var(--tl) 32%, #24243a) 100%)" aria-hidden="true"></span>  <span class="absolute left-0 top-1.5 grid h-[19px] w-[19px] place-items-center rounded-full border bg-void sm:left-[6px]"${addAttribute(`border-color:${c};box-shadow:0 0 0 3px rgba(10,10,15,1), 0 0 16px -2px ${c}`, "style")} aria-hidden="true"> <i class="h-[5px] w-[5px] rounded-full"${addAttribute(`background:${c}`, "style")}></i> </span> <div class="panel corners px-4 py-3.5 sm:px-5 sm:py-4"${addAttribute(`--accent:${c}`, "style")}> <div class="flex flex-wrap items-center gap-2.5"> <time class="font-mono text-[11px] tracking-[0.12em]"${addAttribute(`color:${c}`, "style")}> ${it.time} </time> ${it.tag && renderTemplate`<span class="chip">${it.tag}</span>`} </div> <h3 class="mt-1.5 text-[15px] font-semibold text-ink">${it.title}</h3> ${it.desc && renderTemplate`<p class="mt-1 text-[13.5px] leading-relaxed text-dust">${it.desc}</p>`} </div> </li>`;
  })} </ol>`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/Timeline.astro", void 0);

export { $$Timeline as $ };
