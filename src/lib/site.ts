/**
 * 站点级常量与链接工具
 * —— 换域名 / 换仓库名时，只需要改 astro.config.mjs 里的 SITE 与 BASE。
 */

export const SITE_TITLE = '星陨纪界';
export const SITE_TITLE_EN = 'WORLD ARCHIVE';
export const SITE_DESCRIPTION =
  '原创世界观设定档案：2026 年，一颗被异维度污染的陨星坠入地球，「陨星之灾」之后，科学≈神秘学的时代开始了。';
export const SITE_AUTHOR = 'Mo-righ';

/** Astro 注入的 base（形如 `/oc-s-world/`），统一去掉结尾斜杠 */
const BASE = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');

/** 把站内路径拼上 base，得到可直接用于 href/src 的地址 */
export function url(path = '/'): string {
  if (!path || path === '/') return `${BASE}/`;
  return `${BASE}/${String(path).replace(/^\/+/, '')}`;
}

/** 导航项高亮判断：当前路径是否落在某个栏目内 */
export function isActive(currentPath: string, sectionPath: string): boolean {
  const cur = currentPath.replace(BASE, '') || '/';
  if (sectionPath === '/') return cur === '/' || cur === '';
  return cur === sectionPath || cur.startsWith(`${sectionPath}/`);
}

/** 统一的排序工具：order 小的在前，同 order 按名称 */
export function byOrder<T extends { data: { order?: number; name?: string } }>(a: T, b: T): number {
  const ao = a.data.order ?? 999;
  const bo = b.data.order ?? 999;
  if (ao !== bo) return ao - bo;
  return (a.data.name ?? '').localeCompare(b.data.name ?? '', 'zh-Hans-CN');
}

/** 时间轴排序：按 year 升序 */
export function byYear<T extends { data: { year?: number; order?: number } }>(a: T, b: T): number {
  const ay = a.data.year ?? 0;
  const by = b.data.year ?? 0;
  if (ay !== by) return ay - by;
  return (a.data.order ?? 999) - (b.data.order ?? 999);
}
