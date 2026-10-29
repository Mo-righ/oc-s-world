---
name: 示例角色 贰
enName: SAMPLE-02
alias: 模板
title: 请把这一行改成角色的身份，例如「微光的赏金中介人」
faction: glimmer
factionLabel: 微光
age: 请填年龄
gender: 请填性别
status: STATUS · ACTIVE
avatar: ✧
accent: '#ffb020'
tags:
  - 示例
  - 请替换
quote: 立场是可以谈的，价格不行。
summary: 第二条示例数据。它演示了「角色挂在某个势力下」的效果——势力详情页会自动把这个角色列进成员名册，人物卡片上也会显示势力标签。
allies:
  - 示例角色 壹
rivals:
  - 示例角色 叁
relations: |
  graph LR
    B["示例角色 贰"]
    A["示例角色 壹"]
    C["示例角色 叁"]
    G["微光"]
    U["UOSC"]

    G ==>|成员| B
    B <-.->|互相利用| C
    B -->|旧识| A
    U -.->|名义管辖| G

    classDef main fill:#1a1203,stroke:#ffb020,stroke-width:2px,color:#ffdca0
    classDef sub fill:#12121d,stroke:#33334f,color:#c9cfe4
    class B main
    class A,C,G,U sub
radar:
  智慧: 45
  异能: 30
  身体素质: 78
  污染抗性: 105
  机动: 52
  幸运: 18
events:
  - time: 请填时间
    title: 加入微光
    desc: 说明他为什么加入，以及加入时带去了什么。
locations: []
sample: true
order: 2
featured: true
---

## 说明

这是第二条示例，重点演示**势力归属**：

- frontmatter 里的 `faction: glimmer` 会让这个角色自动出现在「微光」的详情页名册里；
- `factionLabel: 微光` 是卡片上显示的势力标签文字，可以跟 `faction` 不一样（比如写更短的简称）。

## 写你自己的角色

把上面这个文件复制成 `你的角色id.md`，然后：

1. 改 `name` / `title` / `summary`；
2. `faction` 填目标势力**文件名**（不带 `.md`），比如 `uosc`、`glimmer`、`zodiac-mercs`；
3. 删掉 `sample: true`。

留空 `faction` 也不会报错，只是卡片上不显示势力标签。
