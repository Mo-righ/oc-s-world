---
title: 人物关系总图
subtitle: RELATION MAP
kicker: DRAMATIS PERSONAE · 连线即立场
description: 回响之环中已登记人物的立场、羁绊与敌对关系。
accent: '#00e5ff'
graph: |
  graph LR
    QZ["祁昭<br/>灰雀"]
    RV["雷恩·瓦尔<br/>铁律"]
    NZ["南栀<br/>噪声"]
    CA["枢机议会"]
    ND["零号骰子"]
    RM["锈月下城"]

    CA ==>|通缉| QZ
    CA ==>|监察| RM
    CA <-.->|冷战中| ND
    ND ==>|庇护| NZ
    NZ -->|情报交易| QZ
    RV -.->|私下会面| NZ
    RV -->|追查| QZ
    QZ ==>|秘密救治| RM

    classDef order fill:#1a1503,stroke:#ffb020,stroke-width:1.5px,color:#ffd88a
    classDef under fill:#1a0310,stroke:#ff2e97,stroke-width:1.5px,color:#ffb0d8
    classDef lone fill:#03161a,stroke:#00e5ff,stroke-width:1.5px,color:#a8f4ff

    class CA order
    class ND,NZ under
    class QZ,RV,RM lone
---

## 如何读这张图

- **实线箭头**代表已知的、正在生效的关系（追捕、庇护、交易）。
- **虚线箭头**代表非正式或已经变质的关系——通常比实线更危险。
- **粗箭头**是推动当前剧情的那几条线。

## 三组张力

### 一、通缉与庇护

枢机议会签发过一份针对**祁昭**的通缉令，罪名是「未经许可的义体改造」。而**南栀**把这份通缉令的原始文件倒卖给了祁昭本人——价格是一次问诊。

### 二、职责与私交

**雷恩·瓦尔**是签发那份通缉令的人。他同时也在秘密联系南栀，购买一份不该存在的名单。他自己尚未决定，名单到手之后要交给议会，还是烧掉。

### 三、地点的重量

**锈月下城**不属于任何一方。枢机议会想清理它，零号骰子靠它藏身，祁昭在它里面看病。谁先动手，另外两方就会立刻知道。

> 这张关系图同样来自 Markdown frontmatter 里的 `graph` 字段。新增人物之后，只要在这里补一行 `NZ -->|关系| XXX`，图谱就会自动更新。
