import { d as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate, r as renderComponent } from './astro/server_B2vzoAaT.mjs';
import 'piccolore';
import { u as url } from './site_DwFBVW5O.mjs';
import { $ as $$StatRadar } from './StatRadar_CeQsGn_3.mjs';

const $$Astro = createAstro("https://mo-righ.github.io");
const $$CharacterCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CharacterCard;
  const {
    id,
    name,
    enName,
    alias,
    title,
    factionLabel,
    status,
    avatar = "\u{1F732}",
    accent = "#00e5ff",
    tags = [],
    summary,
    radar
  } = Astro2.props;
  const avatarIsImg = /\.(png|jpe?g|webp|svg|gif|avif)$/i.test(avatar ?? "");
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url(`/characters/${id}`), "href")} class="panel corners hoverable group flex flex-col overflow-hidden p-5"${addAttribute(`--accent:${accent}`, "style")}> <div class="flex items-start gap-4"> <div class="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg border text-3xl"${addAttribute(`border-color:${accent}40;background:radial-gradient(circle at 30% 20%, ${accent}22, transparent 70%), #0e0e18`, "style")}> ${avatarIsImg ? renderTemplate`<img${addAttribute(url(avatar), "src")}${addAttribute(name, "alt")} class="h-full w-full object-cover">` : avatar} </div> <div class="min-w-0 flex-1"> <div class="flex flex-wrap items-center gap-x-2 gap-y-1"> <h3 class="text-lg font-bold leading-tight text-ink transition-colors group-hover:text-[var(--accent)]"> ${name} </h3> ${alias && renderTemplate`<span class="chip"${addAttribute(`color:${accent};border-color:${accent}44`, "style")}>${alias}</span>`} </div> ${enName && renderTemplate`<p class="mt-0.5 font-mono text-[10px] tracking-[0.2em] text-dust-2">${enName}</p>`} <p class="mt-1.5 text-[13px] leading-snug text-dust">${title}</p> </div> </div> <p class="mt-4 line-clamp-3 text-[13.5px] leading-relaxed text-dust">${summary}</p> <div class="mt-4 flex flex-wrap items-center gap-1.5"> ${factionLabel && renderTemplate`<span class="chip"${addAttribute(`color:${accent};border-color:${accent}44`, "style")}>${factionLabel}</span>`} ${tags.slice(0, 3).map((t) => renderTemplate`<span class="chip">${t}</span>`)} </div> ${radar && renderTemplate`<div class="mt-4 flex items-center gap-3 border-t border-edge/70 pt-3"> ${renderComponent($$result, "StatRadar", $$StatRadar, { "stats": radar, "accent": accent, "compact": true })} <p class="font-mono text-[10px] leading-relaxed tracking-[0.18em] text-dust-2">
CAPACITY RADAR
<br>
六维评级：技巧 / 能力 / 身体素质 / 污染抗性 / 机动 / 幸运
</p> </div>`} <div class="mt-5 flex items-center justify-between border-t border-edge/70 pt-3"> <span class="font-mono text-[10px] tracking-[0.18em] text-dust-2"> ${status ?? "STATUS \xB7 UNKNOWN"} </span> <span class="font-mono text-[11px] text-dust-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)]">
READ →
</span> </div> </a>`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/CharacterCard.astro", void 0);

export { $$CharacterCard as $ };
