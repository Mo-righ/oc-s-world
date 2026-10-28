import { d as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate, e as renderScript } from './astro/server_B2vzoAaT.mjs';
import 'piccolore';
import 'clsx';

const $$Astro$1 = createAstro("https://mo-righ.github.io");
const $$Mermaid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Mermaid;
  const { chart, title, caption, accent = "#00e5ff" } = Astro2.props;
  const hasChart = Boolean(chart && chart.trim());
  return renderTemplate`${hasChart && renderTemplate`${maybeRenderHead()}<figure class="not-prose">${title && renderTemplate`<figcaption class="mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-dust-2"><span${addAttribute(`color:${accent}`, "style")}>◈</span>${title}</figcaption>`}<div class="mermaid-wrap corners"><pre class="mermaid">${chart.trim()}</pre></div>${caption && renderTemplate`<p class="mt-2.5 font-mono text-[11px] text-dust-2">${caption}</p>`}<noscript><p class="mt-2 font-mono text-[11px] text-amber">
[ 未启用 JavaScript ] 关系图无法渲染，请在下方文字关系列表中查看角色连接。
</p></noscript></figure>`}${renderScript($$result, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/Mermaid.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/Mermaid.astro", void 0);

const RADAR_AXES = [
  { key: "技巧", en: "SKILL" },
  { key: "能力", en: "POWER" },
  { key: "身体素质", en: "PHYSIQUE" },
  { key: "污染抗性", en: "RESISTANCE" },
  { key: "机动", en: "MOBILITY" },
  { key: "幸运", en: "LUCK" }
];
const RADAR_FULL_MAX = 100;
const RADAR_DRAW_MAX = 122;
const RADAR_RING_RATIOS = [0.2, 0.4, 0.6, 0.8, 1];
function toSafeNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}
function radarGrade(value) {
  const v = toSafeNumber(value);
  if (v < 20) return "D";
  if (v < 40) return "C";
  if (v < 60) return "B";
  if (v < 80) return "A";
  if (v <= RADAR_FULL_MAX) return "S";
  return "S+";
}
function radarRows(stats) {
  return RADAR_AXES.map((axis) => {
    const value = toSafeNumber(stats?.[axis.key]);
    return { key: axis.key, en: axis.en, value, grade: radarGrade(value) };
  });
}
function radarRadius(value, outerRadius) {
  const v = Math.min(toSafeNumber(value), RADAR_DRAW_MAX);
  return v / RADAR_FULL_MAX * outerRadius;
}
function radarPoint(index, total, radius, opts) {
  const angle = -Math.PI / 2 + index * 2 * Math.PI / total;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    angle,
    cos,
    sin,
    x: opts.cx + radius * cos,
    y: opts.cy + radius * sin,
    outerX: opts.cx + opts.outerRadius * cos,
    outerY: opts.cy + opts.outerRadius * sin
  };
}
function radarGeometry(values, opts) {
  return values.map((value, index) => radarPoint(index, values.length, radarRadius(value, opts.outerRadius), opts));
}
function radarRingPoints(ratio, total, opts) {
  const radius = opts.outerRadius * ratio;
  return Array.from({ length: total }, (_, index) => {
    const p = radarPoint(index, total, radius, opts);
    return { x: p.x, y: p.y };
  });
}
function toPolygon(points) {
  return points.map(({ x, y }) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
}
function radarLabelPosition(index, total, radius, opts) {
  const p = radarPoint(index, total, radius, opts);
  const anchor = Math.abs(p.cos) < 0.25 ? "middle" : p.cos > 0 ? "start" : "end";
  const dy = p.sin > 0.5 ? 11 : p.sin < -0.5 ? -5 : 4;
  return { x: p.x, y: p.y + dy, anchor };
}
function radarSummary(rows) {
  return rows.map((r) => `${r.key} ${r.grade}`).join("，");
}

const $$Astro = createAstro("https://mo-righ.github.io");
const $$StatRadar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$StatRadar;
  const { stats = null, accent = "#00e5ff", compact = false } = Astro2.props;
  const rows = radarRows(stats);
  const total = RADAR_AXES.length;
  const cx = compact ? 80 : 200;
  const cy = compact ? 76 : 175;
  const outerRadius = compact ? 46 : 95;
  const labelRadius = outerRadius + (compact ? 18 : 34);
  const geometryOptions = { cx, cy, outerRadius };
  const geometry = radarGeometry(
    rows.map((r) => r.value),
    geometryOptions
  );
  const areaPoints = toPolygon(geometry);
  const rings = RADAR_RING_RATIOS.map((ratio) => toPolygon(radarRingPoints(ratio, total, geometryOptions)));
  const dots = geometry.map((p, index) => ({
    x: p.x,
    y: p.y,
    grade: rows[index].grade,
    over: rows[index].value > RADAR_FULL_MAX
  }));
  const labels = rows.map((row, index) => ({
    ...row,
    ...radarLabelPosition(index, total, labelRadius, geometryOptions)
  }));
  const ariaLabel = `\u516D\u7EF4\u8BC4\u7EA7\uFF1A${radarSummary(rows)}`;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["radar", compact && "radar--mini"], "class:list")}${addAttribute(`--radar-accent:${accent}`, "style")}> <svg${addAttribute(["radar__svg", compact && "radar__svg--mini"], "class:list")}${addAttribute(compact ? "0 0 160 160" : "0 0 400 350", "viewBox")} role="img"${addAttribute(ariaLabel, "aria-label")}> <g class="radar__grid"> ${rings.map((points, index) => renderTemplate`<polygon${addAttribute(["radar__ring", index === rings.length - 1 && "radar__ring--outer"], "class:list")}${addAttribute(points, "points")}></polygon>`)} ${geometry.map((p) => renderTemplate`<line class="radar__spoke"${addAttribute(cx, "x1")}${addAttribute(cy, "y1")}${addAttribute(p.outerX, "x2")}${addAttribute(p.outerY, "y2")}></line>`)} </g> <polygon class="radar__area"${addAttribute(areaPoints, "points")}></polygon> ${dots.map((d) => renderTemplate`<circle${addAttribute(["radar__dot", d.over && "radar__dot--over"], "class:list")}${addAttribute(d.x, "cx")}${addAttribute(d.y, "cy")}${addAttribute(compact ? 2 : 3.4, "r")}></circle>`)} ${labels.map((l) => renderTemplate`<text class="radar__label"${addAttribute(l.x, "x")}${addAttribute(l.y, "y")}${addAttribute(l.anchor, "text-anchor")}> ${!compact && renderTemplate`<tspan>${l.key}</tspan>`} <tspan class="radar__grade"${addAttribute(l.grade, "data-g")}${addAttribute(compact ? 0 : 6, "dx")}>${l.grade}</tspan> </text>`)} </svg> </div>`;
}, "D:/\u5DE5\u4F5C\u5730\u70B9/the world/oc-s-world/src/components/StatRadar.astro", void 0);

export { $$StatRadar as $, $$Mermaid as a };
