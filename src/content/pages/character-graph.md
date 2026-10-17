---
title: 人物关系总图
subtitle: RELATION MAP
kicker: DRAMATIS PERSONAE · 连线即立场
description: 星陨纪界中已登记人物的立场、羁绊与敌对关系。新增角色后，在这里补一行连线即可更新全图。
accent: '#00e5ff'
graph: |
  graph LR
    A["示例角色 壹<br/>SAMPLE-01"]
    B["示例角色 贰<br/>SAMPLE-02"]
    C["示例角色 叁<br/>SAMPLE-03"]
    U["UOSC<br/>联合神秘学事务理事会"]
    G["微光"]

    U ==>|在编| A
    G ==>|合作 / 悬赏| B
    B <-.->|互相利用| C
    A -->|监视| C
    U -.->|名义管辖| G

    classDef order fill:#04101c,stroke:#4d9dff,stroke-width:1.5px,color:#bddeff
    classDef shim fill:#1a1203,stroke:#ffb020,stroke-width:1.5px,color:#ffdca0
    classDef loose fill:#1a0407,stroke:#ff4d5e,stroke-width:1.5px,color:#ffb3ba

    class U order
    class G shim
    class A order
    class B shim
    class C loose
---

## 这是一张示例图

你现在看到的三个角色都是**示例数据**，用来演示人物卡片、详情页与关系图长什么样。真正的角色由你自己写进 `src/content/characters/`。

用完之后，把 `src/content/characters/` 下的 `sample-01.md`、`sample-02.md`、`sample-03.md` 删掉，再回来把这张图里的节点和连线一起删掉即可。

## 怎么读这张图

- **实线箭头** —— 正在生效的关系（在编、庇护、合作）
- **虚线箭头** —— 非正式或已变质的关系
- **粗箭头** —— 推动当前剧情的主线

## 怎么改这张图

整张图就是一段 Mermaid 源码，写在本文 frontmatter 的 `graph` 字段里。语法只有两种：

```text
A["显示的名字<br/>副标题"]      ← 声明一个节点，<br/> 用来换行
A ==>|关系说明| B                ← 画一条 A 指向 B 的连线，并写上关系
```

想加人，就在 `graph LR` 下面加一行节点、一行连线。想改配色，改 `classDef` 那几行里的色值。

> 每个角色详情页里还有一张**属于他自己**的关系图，写在该角色 `.md` 的 `relations` 字段里——那张图只画跟他有关的人。
