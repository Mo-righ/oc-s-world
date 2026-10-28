---
name: 科恩·爱德华(Koan Edward)
enName: SAMPLE-01
alias: 模板
title: 「UOSC 第一任会长」
faction: uosc
factionLabel: UOSC
age: 72
gender: 男
status: STATUS · ACTIVE
avatar: ✦
accent: '#4d9dff'
tags:
  - 示例
  - 请替换
quote: 感谢您的服务与牺牲
summary: 这是一条示例数据，用来说明人物卡片长什么样。复制这个文件、改掉 frontmatter 和正文，就是一个真实角色；不需要示例时，直接删掉 sample-*.md 即可。
allies:
  - 示例角色 贰
rivals:
  - 示例角色 叁
relations: |
  graph LR
    A["示例角色 壹"]
    B["示例角色 贰"]
    C["示例角色 叁"]
    U["UOSC"]
    G["微光"]

    U ==>|在编| A
    A -->|监视| C
    A <-.->|旧识| B
    B -->|成员| G

    classDef main fill:#04101c,stroke:#4d9dff,stroke-width:2px,color:#bddeff
    classDef sub fill:#12121d,stroke:#33334f,color:#c9cfe4
    class A main
    class B,C,U,G sub
events:
  - time: 请填时间
    title: 请填这个角色的关键经历
    desc: 一句话说明这件事对他造成了什么影响。
  - time: 请填时间
    title: 第二条经历
    desc: 想加多少条都可以，删掉这个 events 字段也不会报错。
locations:
  - blagoveshchensk
sample: true
order: 1
featured: true
radar:
  智慧: 72
  能力: 88
  身体素质: 55
  污染抗性: 40
  机动: 61
  幸运: 35
---

## 这个文件是干什么的

你现在看到的整页内容，都是从**上面那段 frontmatter** + **下面这段正文**渲染出来的。

- 上面 `---` 之间的部分叫 **frontmatter**，用 YAML 写，决定卡片上的名字、颜色、标签、所属势力。
- `---` 下面的部分是**正文**，用普通 Markdown 写，随便写多长。

## 怎么用它

1. 把这个文件复制一份，重命名成角色的英文名或拼音，比如 `lin-xia.md`。
2. 改 frontmatter 里的 `name`、`title`、`summary` 等字段。
3. 把正文换成你自己的设定。
4. 删掉 `sample: true` 这一行。

> 文件名就是网址。`lin-xia.md` 会变成 `/characters/lin-xia` 这一页。

## 正文里能用的排版

### 三级标题

普通段落。**加粗**、*斜体*、`行内代码` 都可以用。

- 无序列表第一项
- 无序列表第二项

1. 有序列表第一项
2. 有序列表第二项

| 表头 | 说明 |
| --- | --- |
| 单元格 | 表格会自动套用深色样式 |

> 引用块用来写角色的台词或者档案摘录。

```text
代码块也可以，会按语法高亮。
```

## 关系图

页面下方那张关系图，来自 frontmatter 里的 `relations` 字段。它的写法和首页那张总图完全一样：

```text
A["显示的名字"] -->|关系| B["另一个名字"]
```

只画跟这个角色直接相关的人就够了，不用把全世界都画进去。

## 删掉它的方法

不需要示例了？直接删除 `src/content/characters/sample-01.md`、`sample-02.md`、`sample-03.md` 三个文件，然后回到 `src/content/pages/character-graph.md`，把里面三个示例节点和连线一起删掉。推送后站点会自动重建。
