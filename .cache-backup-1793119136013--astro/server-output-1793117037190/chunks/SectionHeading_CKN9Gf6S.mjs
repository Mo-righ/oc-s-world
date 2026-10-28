import { d as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate, f as renderSlot } from './astro/server_B2vzoAaT.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro("https://mo-righ.github.io");
const $$SectionHeading = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SectionHeading;
  const { title, en, desc, icon = "\u25B8", accent = "#00e5ff", id } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(id, "id")} class="mt-14 first:mt-0 scroll-mt-24"${addAttribute(`--accent:${accent}`, "style")}> <div class="mb-5 flex items-start justify-between gap-6 border-b border-edge pb-3"> <div class="flex items-baseline gap-3"> <span class="neon-text font-mono text-sm">${icon}</span> <h2 class="text-xl font-bold tracking-tight text-ink">${title}</h2> ${en && renderTemplate`<span class="hidden font-mono text-[11px] tracking-[0.24em] text-dust-2 sm:inline">${en}</span>`} </div> </div> ${desc && renderTemplate`<p class="-mt-2 mb-6 text-sm leading-relaxed text-dust">${desc}</p>`} ${renderSlot($$result, $$slots["default"])} </section>`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/SectionHeading.astro", void 0);

export { $$SectionHeading as $ };
