const SITE_TITLE = "星陨纪界";
const SITE_TITLE_EN = "WORLD ARCHIVE";
const SITE_DESCRIPTION = "原创世界观设定档案：2026 年，一颗被异维度污染的陨星坠入地球，「陨星之灾」之后，科学≈神秘学的时代开始了。";
const SITE_AUTHOR = "Mo-righ";
const BASE = "/oc-s-world".replace(/\/+$/, "");
function url(path = "/") {
  if (!path || path === "/") return `${BASE}/`;
  return `${BASE}/${String(path).replace(/^\/+/, "")}`;
}
function isActive(currentPath, sectionPath) {
  const cur = currentPath.replace(BASE, "") || "/";
  if (sectionPath === "/") return cur === "/" || cur === "";
  return cur === sectionPath || cur.startsWith(`${sectionPath}/`);
}
function byOrder(a, b) {
  const ao = a.data.order ?? 999;
  const bo = b.data.order ?? 999;
  if (ao !== bo) return ao - bo;
  return (a.data.name ?? "").localeCompare(b.data.name ?? "", "zh-Hans-CN");
}

export { SITE_TITLE as S, SITE_TITLE_EN as a, byOrder as b, SITE_AUTHOR as c, SITE_DESCRIPTION as d, isActive as i, url as u };
