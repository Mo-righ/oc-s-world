/**
 * 人物六维雷达图 · 纯计算逻辑
 * ------------------------------------------------------------------
 * 组件只负责画 SVG，等级判定和坐标计算都放在这里，方便单独测试。
 * 六维固定顺序：智慧 / 异能 / 身体素质 / 污染抗性 / 机动 / 幸运。
 */

export const RADAR_AXES = [
  { key: '智慧', en: 'WISDOM' },
  { key: '异能', en: 'ESPER' },
  { key: '身体素质', en: 'PHYSIQUE' },
  { key: '污染抗性', en: 'RESISTANCE' },
  { key: '机动', en: 'MOBILITY' },
  { key: '幸运', en: 'LUCK' },
] as const;

export type RadarAxisKey = (typeof RADAR_AXES)[number]['key'];
export type RadarStats = Partial<Record<RadarAxisKey, number>>;
export type RadarGrade = 'D' | 'C' | 'B' | 'A' | 'S' | 'S+';

/** 图的外六边形代表 100 分 */
export const RADAR_FULL_MAX = 100;
/** 画图时的视觉上限：S+ 再多也只画到这里，避免撑破画布 */
export const RADAR_DRAW_MAX = 122;
/** 环线：D/C/B/A/S 的分界 */
export const RADAR_RING_RATIOS = [0.2, 0.4, 0.6, 0.8, 1];

export interface RadarRow {
  key: RadarAxisKey;
  en: string;
  value: number;
  grade: RadarGrade;
}

function toSafeNumber(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

/** 0-20 D，20-40 C，40-60 B，60-80 A，80-100 S，100 以上 S+ */
export function radarGrade(value: unknown): RadarGrade {
  const v = toSafeNumber(value);
  if (v < 20) return 'D';
  if (v < 40) return 'C';
  if (v < 60) return 'B';
  if (v < 80) return 'A';
  if (v <= RADAR_FULL_MAX) return 'S';
  return 'S+';
}

/** 把 frontmatter 里的 radar 字段整理成固定顺序的六行 */
export function radarRows(stats?: RadarStats | null): RadarRow[] {
  return RADAR_AXES.map((axis) => {
    const value = toSafeNumber(stats?.[axis.key]);
    return { key: axis.key, en: axis.en, value, grade: radarGrade(value) };
  });
}

/** 数值 -> 半径；超过 100 会画到外六边形之外，但有视觉上限 */
export function radarRadius(value: number, outerRadius: number): number {
  const v = Math.min(toSafeNumber(value), RADAR_DRAW_MAX);
  return (v / RADAR_FULL_MAX) * outerRadius;
}

interface GeometryOptions {
  cx: number;
  cy: number;
  outerRadius: number;
}

interface RadarPoint {
  angle: number;
  cos: number;
  sin: number;
  x: number;
  y: number;
  outerX: number;
  outerY: number;
}

/** 第一个顶点在正上方，之后顺时针排列 */
export function radarPoint(index: number, total: number, radius: number, opts: GeometryOptions): RadarPoint {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    angle,
    cos,
    sin,
    x: opts.cx + radius * cos,
    y: opts.cy + radius * sin,
    outerX: opts.cx + opts.outerRadius * cos,
    outerY: opts.cy + opts.outerRadius * sin,
  };
}

/** 六条数据线的顶点坐标 */
export function radarGeometry(values: number[], opts: GeometryOptions): RadarPoint[] {
  return values.map((value, index) => radarPoint(index, values.length, radarRadius(value, opts.outerRadius), opts));
}

/** 某一圈环线的六边形顶点（ratio=1 就是外六边形） */
export function radarRingPoints(ratio: number, total: number, opts: GeometryOptions): { x: number; y: number }[] {
  const radius = opts.outerRadius * ratio;
  return Array.from({ length: total }, (_, index) => {
    const p = radarPoint(index, total, radius, opts);
    return { x: p.x, y: p.y };
  });
}

export function toPolygon(points: { x: number; y: number }[]): string {
  return points.map(({ x, y }) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
}

interface LabelPosition {
  x: number;
  y: number;
  anchor: 'start' | 'middle' | 'end';
}

/** 轴标签位置：靠边的自动左/右对齐，正上正的居中 */
export function radarLabelPosition(
  index: number,
  total: number,
  radius: number,
  opts: GeometryOptions
): LabelPosition {
  const p = radarPoint(index, total, radius, opts);
  const anchor = Math.abs(p.cos) < 0.25 ? 'middle' : p.cos > 0 ? 'start' : 'end';
  const dy = p.sin > 0.5 ? 11 : p.sin < -0.5 ? -5 : 4;
  return { x: p.x, y: p.y + dy, anchor };
}

/** 无障碍描述：只念等级，不念数值 */
export function radarSummary(rows: RadarRow[]): string {
  return rows.map((r) => `${r.key} ${r.grade}`).join('，');
}
