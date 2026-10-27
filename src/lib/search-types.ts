/**
 * 搜索相关的类型与常量
 * 单独成文件，是为了让浏览器端逻辑不必引入 astro:content。
 */

export type SearchKind = 'character' | 'faction' | 'location' | 'system' | 'event';

export interface SearchItem {
  /** 词条名 */
  t: string;
  /** 类型标识 */
  k: SearchKind;
  /** 类型中文名 */
  kl: string;
  /** 类型图标 */
  ki: string;
  /** 含 base 的完整地址 */
  u: string;
  /** 英文名 / 日期 */
  e: string;
  /** 别名 / 代号 */
  a: string;
  /** 一句话介绍 */
  s: string;
  /** 标签 */
  g: string[];
  /** 正文摘录，用于正文命中 */
  x: string;
  /** 主题色 */
  c: string;
  /** 排序权 */
  o: number;
}

export const KIND_ORDER: SearchKind[] = ['character', 'faction', 'location', 'system', 'event'];

export const KIND_INFO: Record<SearchKind, { label: string; icon: string }> = {
  character: { label: '人物', icon: '◉' },
  faction: { label: '势力', icon: '◆' },
  location: { label: '地点', icon: '◈' },
  system: { label: '体系', icon: '⚙' },
  event: { label: '事件', icon: '⌛' },
};
