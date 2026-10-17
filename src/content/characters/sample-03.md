---
name: 示例角色 叁
enName: SAMPLE-03
alias: 模板
title: 请把这一行改成角色的身份，例如「无归属的异能者」
age: 请填年龄
gender: 请填性别
status: STATUS · UNKNOWN
avatar: ◇
accent: '#ff4d5e'
tags:
  - 示例
  - 请替换
  - 无归属
quote: 我不站队，我只是还没决定杀谁。
summary: 第三条示例数据。它演示了「不隶属于任何势力」的角色怎么写——留空 faction 字段即可，卡片上不会出现势力标签。
allies: []
rivals:
  - 示例角色 壹
  - 示例角色 贰
relations: |
  graph LR
    C["示例角色 叁"]
    A["示例角色 壹"]
    B["示例角色 贰"]

    A -->|监视| C
    C <-.->|互相利用| B
    C -.->|不信任| A

    classDef main fill:#1a0407,stroke:#ff4d5e,stroke-width:2px,color:#ffb3ba
    classDef sub fill:#12121d,stroke:#33334f,color:#c9cfe4
    class C main
    class A,B sub
events: []
locations: []
sample: true
order: 3
featured: false
---

## 说明

第三条示例，重点演示：**「什么都可以不填」**

- 没有 `faction` —— 不显示势力标签；
- 没有 `events` —— 详情页不显示「经历」时间轴；
- 没有 `locations` —— 不显示关联地点。

所有可选字段都是「不写就不显示」，不会报错、不会留空框。所以你可以先把角色档案建起来，再慢慢补。

## 最少需要写什么

一个角色文件**最少**只需要这几个字段：

```yaml
---
name: 角色名
title: 角色身份
summary: 卡片上的一句话介绍
---
```

其余全部可选。`accent` 不写就是默认的青色 `#00e5ff`。
