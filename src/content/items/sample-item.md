---
name: 示例物品
enName: SAMPLE-ITEM
type: 装备
icon: ⌬
accent: '#ffb020'
owner: 请把这一行改成持有者
location: 请把这一行改成所在地
status: STATUS · UNKNOWN
tags:
  - 示例
  - 请替换
summary: 这是一条物品示例，用来说明物品卡片和详情页长什么样。复制这个文件、改掉 frontmatter 和正文，就是一个真实物品。
specs:
  - key: 类型
    value: 请把这一行改成具体类型
  - key: 来源
    value: 请把这一行改成来源或产地
  - key: 状态
    value: 完好 / 损毁 / 封存
relatedCharacters:
  - 示例角色 壹
relatedFactions:
  - UOSC
events:
  - time: 请填时间
    title: 这件物品的关键经历
    desc: 一句话说明它为什么重要。
sample: true
order: 10
featured: true
---

## 这个文件是干什么的

它演示**物品条目**的写法：列表页 `/items` 会显示这张卡片，点进来就是它自己的详情页。

## 怎么改成你自己的物品

1. 复制这个文件，改名成物品的英文名或拼音，例如 `plasma-rifle.md`。
2. 改 frontmatter：`name`、`summary`、`type`、`specs`。
3. 把下面正文换成你自己的设定。
4. 删掉 `sample: true` 这一行。

> 文件名就是网址。`plasma-rifle.md` 会变成 `/items/plasma-rifle`。

## frontmatter 里几个常用字段

| 字段 | 作用 |
| --- | --- |
| `type` | 物品类别，会显示在名字旁边，例如「装备 / 资料 / 消耗品」 |
| `specs` | 参数表，详情页会渲染成两列表格 |
| `owner` | 持有者 / 制造者，写名字即可 |
| `location` | 所在地 / 来源地 |
| `relatedCharacters` | 相关人物，会显示在详情页下方 |
| `relatedFactions` | 相关势力，会显示在详情页下方 |

## 正文怎么写

正文就是普通 Markdown。物品条目很适合写这些内容：

- 它为什么会出现在这个世界里；
- 谁在用、怎么用；
- 有什么代价或限制；
- 和其它条目之间的关系。

不需要写满，先登记名字和一句话摘要，之后再慢慢补也可以。
