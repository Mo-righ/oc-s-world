import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ------------------------------------------------------------------
 * 所有内容都来自本地 Markdown + YAML frontmatter，零数据库、零外部 API。
 * 新增内容 = 在对应目录里新建一个 .md 文件。文件名即 URL 里的 id。
 * ------------------------------------------------------------------ */

/* ------------------------------------------------------------------
 * 容错小工具
 * YAML 里 `enName:` 后面什么都不写会被解析成 null；列表里写一个空的
 * `- ` 同样变成 null。下面几个 helper 统一把「null / 空字符串」当成
 * 「这一项没填」，这样手写 frontmatter 时留空也不会让整站构建失败。
 * ------------------------------------------------------------------ */

/** 可留空的字符串：留空 -> undefined */
const optStr = z
  .string()
  .nullable()
  .optional()
  .transform((v) => (v == null || v.trim() === '' ? undefined : v));

/** 可留空的字符串，留空时回落到默认值 */
const strDef = (fallback: string) =>
  z
    .string()
    .nullable()
    .optional()
    .transform((v) => (v == null || v.trim() === '' ? fallback : v));

/** 可留空的字符串数组：自动丢掉空白条目 */
const strList = z
  .array(z.string().nullable().optional())
  .nullable()
  .optional()
  .transform((list) => (list ?? []).map((v) => (v ?? '').trim()).filter(Boolean));

/** 可留空的数字，留空时回落到默认值 */
const numDef = (fallback: number) =>
  z
    .number()
    .nullable()
    .optional()
    .transform((v) => (v == null || Number.isNaN(v) ? fallback : v));

/** 可留空的布尔，留空时回落到默认值 */
const boolDef = (fallback: boolean) =>
  z
    .boolean()
    .nullable()
    .optional()
    .transform((v) => (typeof v === 'boolean' ? v : fallback));

/** 时间轴事件（可用于人物 / 组织 / 世界的履历） */
const eventSchema = z.object({
  time: strDef(''),
  title: strDef(''),
  desc: optStr,
});

/** 事件列表：丢掉只写了 `- ` 的空条目 */
const eventList = z
  .array(eventSchema.nullable().optional())
  .default([])
  .transform((list) =>
    (list ?? []).filter((e): e is { time: string; title: string; desc?: string } => Boolean(e && (e.time || e.title)))
  );

/** 键值对表（物品规格参数 / 体系词条表）：留空的条目会被丢掉 */
const keyValList = z
  .array(z.object({ key: strDef(''), value: strDef('') }).nullable().optional())
  .default([])
  .transform((list) =>
    (list ?? []).filter((kv): kv is { key: string; value: string } => Boolean(kv && (kv.key || kv.value)))
  );

/** 人物六维雷达图：0-100；大于 100 显示 S+，顶点会画到外六边形之外 */
const radarNum = z
  .number()
  .nullable()
  .optional()
  .transform((v) => (v == null || Number.isNaN(v) ? 0 : Math.max(0, v)));

const radarSchema = z.object({
  智慧: radarNum,
  异能: radarNum,
  身体素质: radarNum,
  污染抗性: radarNum,
  机动: radarNum,
  幸运: radarNum,
});

/** 人物 */
const characters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/characters' }),
  schema: z.object({
    name: z.string(),
    enName: optStr,
    /** 代号 / 称谓 */
    alias: optStr,
    /** 更多可被检索与自动内链匹配的别名 */
    aliases: strList,
    /** 是否允许自动内链；false 时仍可用 [[词条]] 手动链接 */
    autoLink: boolDef(true),
    /** 一句话身份，例如「锈月下城的义体医师」 */
    title: strDef(''),
    /** 所属组织 id（对应 src/content/factions 下的文件名） */
    faction: optStr,
    factionLabel: optStr,
    /** 年龄：写数字（72）或文字（「不明」）都可以 */
    age: z
      .union([z.string(), z.number()])
      .nullable()
      .optional()
      .transform((v) => (v == null || String(v).trim() === '' ? undefined : String(v))),
    gender: optStr,
    status: optStr,
    /** emoji 头像或 public/ 下的图片路径 */
    avatar: strDef('🜲'),
    /** 主题色，用于卡片描边与光晕 */
    accent: strDef('#00e5ff'),
    tags: strList,
    quote: optStr,
    /** 卡片上的短介绍 */
    summary: strDef(''),
    /** 同阵营 / 盟友（自由文本，用于关系图与脚注） */
    allies: strList,
    rivals: strList,
    /** Mermaid 关系图源码（graph / flowchart 均可） */
    relations: optStr,
    /** 六维雷达图数据；不写时详情页显示未登记占位 */
    radar: radarSchema.nullable().optional(),
    events: eventList,
    /** 关联地点 id */
    locations: strList,
    /** 标记为示例条目：详情页会显示「这是模板」的提示条 */
    sample: boolDef(false),
    order: numDef(999),
    featured: boolDef(false),
  }),
});

/** 势力 / 组织 */
const factions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/factions' }),
  schema: z.object({
    name: z.string(),
    enName: optStr,
    /** 更多可被检索与自动内链匹配的别名 */
    aliases: strList,
    /** 是否允许自动内链；false 时仍可用 [[词条]] 手动链接 */
    autoLink: boolDef(true),
    /** 官方 / 地下 / 中立 … */
    type: strDef('组织'),
    motto: optStr,
    emblem: strDef('◆'),
    accent: strDef('#ff2e97'),
    founded: optStr,
    leader: optStr,
    headquarters: optStr,
    /** 影响力 / 规模 */
    influence: optStr,
    status: optStr,
    tags: strList,
    summary: strDef(''),
    relations: optStr,
    events: eventList,
    order: numDef(999),
  }),
});

/** 地点 */
const locations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
  schema: z.object({
    name: z.string(),
    enName: optStr,
    /** 更多可被检索与自动内链匹配的别名 */
    aliases: strList,
    /** 是否允许自动内链；false 时仍可用 [[词条]] 手动链接 */
    autoLink: boolDef(true),
    /** 所属区划 / 层级 */
    region: optStr,
    type: strDef('城市'),
    climate: optStr,
    population: optStr,
    /** 危险度，例如「Ⅳ 级」 */
    danger: optStr,
    accent: strDef('#8b5cf6'),
    icon: strDef('◈'),
    tags: strList,
    summary: strDef(''),
    /** 居住/盘踞于此的人物 id */
    characters: strList,
    factions: strList,
    events: eventList,
    order: numDef(999),
  }),
});

/** 体系设定（科技 / 规则 / 力量体系） */
const lore = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lore' }),
  schema: z.object({
    name: z.string(),
    enName: optStr,
    /** 更多可被检索与自动内链匹配的别名 */
    aliases: strList,
    /** 是否允许自动内链；false 时仍可用 [[词条]] 手动链接 */
    autoLink: boolDef(true),
    /** 体系分类，例如「科技体系」「社会规则」「超常现象」 */
    category: strDef('体系'),
    accent: strDef('#b6ff3c'),
    icon: strDef('⚙'),
    tags: strList,
    summary: strDef(''),
    /** 关键条目表：名称 -> 说明 */
    terms: keyValList,
    order: numDef(999),
  }),
});

/** 世界历史事件（设定页的垂直时间轴） */
const timeline = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/timeline' }),
  schema: z.object({
    /** 页面上显示的纪年文本，随便写，例如「2026.05.26」「灾后第 3 年」 */
    date: strDef(''),
    era: strDef('陨星纪'),
    title: strDef(''),
    /** 更多可被检索与自动内链匹配的别名 */
    aliases: strList,
    /** 是否允许自动内链；false 时仍可用 [[词条]] 手动链接 */
    autoLink: boolDef(true),
    /** 事件分类标签，例如「天灾」「政治」「科技」 */
    tag: strDef('事件'),
    accent: strDef('#00e5ff'),
    summary: strDef(''),
    /** 排序用：数字越小越靠前。留 10 的倍数，方便以后插事件 */
    order: numDef(999),
  }),
});

/** 物品 / 装备 / 资料 */
const items = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/items' }),
  schema: z.object({
    name: z.string(),
    enName: optStr,
    /** 更多可被检索与自动内链匹配的别名 */
    aliases: strList,
    /** 是否允许自动内链；false 时仍可用 [[词条]] 手动链接 */
    autoLink: boolDef(true),
    /** 物品类别，例如「装备」「资料」「消耗品」 */
    type: strDef('物品'),
    icon: strDef('⌬'),
    accent: strDef('#ffb020'),
    /** 持有者 / 制造者，自由文本即可 */
    owner: optStr,
    /** 所在地 / 来源地，自由文本即可 */
    location: optStr,
    status: optStr,
    tags: strList,
    summary: strDef(''),
    /** 关键参数表：名称 -> 说明 */
    specs: keyValList,
    /** 相关人物（写名字即可） */
    relatedCharacters: strList,
    /** 相关势力 / 组织（写名字即可） */
    relatedFactions: strList,
    events: eventList,
    sample: boolDef(false),
    order: numDef(999),
    featured: boolDef(false),
  }),
});

/** 单页文案（首页、人物关系总图等），同样走 Markdown */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: strDef(''),
    subtitle: optStr,
    kicker: optStr,
    description: optStr,
    accent: strDef('#00e5ff'),
    /** 首页数据条 */
    stats: z
      .array(z.object({ label: strDef(''), value: strDef(''), note: optStr }).nullable().optional())
      .default([])
      .transform((list) =>
        (list ?? []).filter((s): s is { label: string; value: string; note?: string } => Boolean(s && (s.label || s.value)))
      ),
    /** 首页章节导览 */
    sections: z
      .array(z.object({ title: strDef(''), desc: strDef(''), href: strDef(''), icon: strDef('▸') }).nullable().optional())
      .default([])
      .transform((list) =>
        (list ?? []).filter(
          (s): s is { title: string; desc: string; href: string; icon: string } => Boolean(s && s.title)
        )
      ),
    /** 人物关系总图（Mermaid 源码） */
    graph: optStr,
    /** 组织口号，首页终端会大字展示 */
    motto: optStr,
    /** 首页「开机认证」界面与终端状态栏的文案 */
    terminal: z
      .object({
        mark: strDef('GLIMMER // INTERNAL DATABASE'),
        node: strDef('NODE-07'),
        accessCode: strDef('GL-0000'),
        statusLine: strDef('LINK STABLE'),
        prompt: strDef('按任意键进行身份认证'),
        /** 触屏设备上显示的提示语（没有键盘，不能写「按任意键」） */
        touchPrompt: strDef('轻触屏幕任意位置以继续'),
        /** 访问者身份：名字 / 职位 / 权限，会出现在认证页与终端状态栏 */
        operator: strDef('STARRY'),
        role: strDef('创始人 · 创始序列 01'),
        clearance: strDef('全库读写'),
        bootLines: strList,
        footnotes: strList,
      })
      .optional(),
  }),
});

export const collections = {
  characters,
  factions,
  locations,
  lore,
  timeline,
  items,
  pages,
};
