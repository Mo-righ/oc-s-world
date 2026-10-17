import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ------------------------------------------------------------------
 * 所有内容都来自本地 Markdown + YAML frontmatter，零数据库、零外部 API。
 * 新增内容 = 在对应目录里新建一个 .md 文件。文件名即 URL 里的 id。
 * ------------------------------------------------------------------ */

/** 时间轴事件（可用于人物 / 组织 / 世界的履历） */
const eventSchema = z.object({
  time: z.string(),
  title: z.string(),
  desc: z.string().optional(),
});

/** 人物 */
const characters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/characters' }),
  schema: z.object({
    name: z.string(),
    enName: z.string().optional(),
    /** 代号 / 称谓 */
    alias: z.string().optional(),
    /** 一句话身份，例如「锈月下城的义体医师」 */
    title: z.string(),
    /** 所属组织 id（对应 src/content/factions 下的文件名） */
    faction: z.string().optional(),
    factionLabel: z.string().optional(),
    age: z.string().optional(),
    gender: z.string().optional(),
    status: z.string().optional(),
    /** emoji 头像或 public/ 下的图片路径 */
    avatar: z.string().default('🜲'),
    /** 主题色，用于卡片描边与光晕 */
    accent: z.string().default('#00e5ff'),
    tags: z.array(z.string()).default([]),
    quote: z.string().optional(),
    /** 卡片上的短介绍 */
    summary: z.string(),
    /** 同阵营 / 盟友（自由文本，用于关系图与脚注） */
    allies: z.array(z.string()).default([]),
    rivals: z.array(z.string()).default([]),
    /** Mermaid 关系图源码（graph / flowchart 均可） */
    relations: z.string().optional(),
    events: z.array(eventSchema).default([]),
    /** 关联地点 id */
    locations: z.array(z.string()).default([]),
    /** 标记为示例条目：详情页会显示「这是模板」的提示条 */
    sample: z.boolean().default(false),
    order: z.number().default(999),
    featured: z.boolean().default(false),
  }),
});

/** 势力 / 组织 */
const factions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/factions' }),
  schema: z.object({
    name: z.string(),
    enName: z.string().optional(),
    /** 官方 / 地下 / 中立 … */
    type: z.string().default('组织'),
    motto: z.string().optional(),
    emblem: z.string().default('◆'),
    accent: z.string().default('#ff2e97'),
    founded: z.string().optional(),
    leader: z.string().optional(),
    headquarters: z.string().optional(),
    /** 影响力 / 规模 */
    influence: z.string().optional(),
    status: z.string().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    relations: z.string().optional(),
    events: z.array(eventSchema).default([]),
    order: z.number().default(999),
  }),
});

/** 地点 */
const locations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
  schema: z.object({
    name: z.string(),
    enName: z.string().optional(),
    /** 所属区划 / 层级 */
    region: z.string().optional(),
    type: z.string().default('城市'),
    climate: z.string().optional(),
    population: z.string().optional(),
    /** 危险度，例如「Ⅳ 级」 */
    danger: z.string().optional(),
    accent: z.string().default('#8b5cf6'),
    icon: z.string().default('◈'),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    /** 居住/盘踞于此的人物 id */
    characters: z.array(z.string()).default([]),
    factions: z.array(z.string()).default([]),
    events: z.array(eventSchema).default([]),
    order: z.number().default(999),
  }),
});

/** 体系设定（科技 / 规则 / 力量体系） */
const lore = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lore' }),
  schema: z.object({
    name: z.string(),
    enName: z.string().optional(),
    /** 体系分类，例如「科技体系」「社会规则」「超常现象」 */
    category: z.string().default('体系'),
    accent: z.string().default('#b6ff3c'),
    icon: z.string().default('⚙'),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    /** 关键条目表：名称 -> 说明 */
    terms: z
      .array(
        z.object({
          key: z.string(),
          value: z.string(),
        })
      )
      .default([]),
    order: z.number().default(999),
  }),
});

/** 世界历史事件（设定页的垂直时间轴） */
const timeline = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/timeline' }),
  schema: z.object({
    /** 页面上显示的纪年文本，随便写，例如「2026.05.26」「灾后第 3 年」 */
    date: z.string(),
    era: z.string().default('陨星纪'),
    title: z.string(),
    /** 事件分类标签，例如「天灾」「政治」「科技」 */
    tag: z.string().default('事件'),
    accent: z.string().default('#00e5ff'),
    summary: z.string(),
    /** 排序用：数字越小越靠前。留 10 的倍数，方便以后插事件 */
    order: z.number().default(999),
  }),
});

/** 单页文案（首页、人物关系总图等），同样走 Markdown */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    kicker: z.string().optional(),
    description: z.string().optional(),
    accent: z.string().default('#00e5ff'),
    /** 首页数据条 */
    stats: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          note: z.string().optional(),
        })
      )
      .default([]),
    /** 首页章节导览 */
    sections: z
      .array(
        z.object({
          title: z.string(),
          desc: z.string(),
          href: z.string(),
          icon: z.string().default('▸'),
        })
      )
      .default([]),
    /** 人物关系总图（Mermaid 源码） */
    graph: z.string().optional(),
    /** 组织口号，首页终端会大字展示 */
    motto: z.string().optional(),
    /** 首页「开机认证」界面与终端状态栏的文案 */
    terminal: z
      .object({
        mark: z.string().default('GLIMMER // INTERNAL DATABASE'),
        node: z.string().default('NODE-07'),
        accessCode: z.string().default('GL-0000'),
        statusLine: z.string().default('LINK STABLE'),
        prompt: z.string().default('按任意键进行身份认证'),
        bootLines: z.array(z.string()).default([]),
        footnotes: z.array(z.string()).default([]),
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
  pages,
};
