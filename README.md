# 星陨纪界 · 世界观档案站

一个纯静态的原创世界观站点。所有设定都用 **Markdown + YAML frontmatter** 存放，改文件 = 改网站，不需要数据库、后端或任何外部 API。

- **技术栈**：Astro 5 + Tailwind CSS 4，`output: 'static'`
- **样式**：深色底 `#0a0a0f`，赛博霓虹配色（青蓝 `#00e5ff` / 品红 `#ff2e97` / 紫 `#8b5cf6` / 酸绿 `#b6ff3c`）
- **关系图**：Mermaid，**本地打包**，不依赖 CDN
- **时间轴**：自研垂直时间轴组件
- **部署**：GitHub Actions 构建 → 推送到 `gh-pages` 分支 → GitHub Pages

> **想加角色 / 组织 / 地点？直接看 [《内容填写指南》](./内容填写指南.md)，每个字段都有说明。**

---

## 目录结构

```text
oc-s-world/
├─ .github/
│  └─ workflows/
│     └─ deploy.yml              # 构建 + 发布到 gh-pages 分支
├─ public/
│  ├─ .nojekyll                  # 阻止 GitHub Pages 用 Jekyll 处理资源
│  ├─ favicon.svg
│  └─ robots.txt
├─ src/
│  ├─ content/                   # ★ 你平时只改这里
│  │  ├─ characters/             # 人物（一人一个 .md）
│  │  │  ├─ sample-01.md         # ← 示例，可删
│  │  │  ├─ sample-02.md         # ← 示例，可删
│  │  │  └─ sample-03.md         # ← 示例，可删
│  │  ├─ factions/               # 势力 / 组织
│  │  │  ├─ uosc.md
│  │  │  ├─ human-evolution-alliance.md
│  │  │  ├─ blagoveshchensk-institute.md
│  │  │  ├─ glimmer.md
│  │  │  ├─ solidarity-alliance.md
│  │  │  ├─ zodiac-mercs.md
│  │  │  └─ alchemists-guild.md
│  │  ├─ locations/              # 地理
│  │  │  ├─ blagoveshchensk.md
│  │  │  └─ lake-baikal.md
│  │  ├─ lore/                   # 体系（污染 / 异能 / 科技）
│  │  │  ├─ contamination.md
│  │  │  ├─ esper-powers.md
│  │  │  └─ anomalous-tech.md
│  │  ├─ timeline/               # 世界编年史（一事件一个 .md）
│  │  │  ├─ 010-captured.md
│  │  │  ├─ 020-three-day-gap.md
│  │  │  ├─ 030-operation-messenger.md
│  │  │  ├─ 040-cataclysm.md
│  │  │  ├─ 050-population-collapse.md
│  │  │  ├─ 060-uosc-founded.md
│  │  │  └─ 070-now.md
│  │  └─ pages/                  # 单页文案
│  │     ├─ home.md              # 首页：标题 / 数据条 / 世界观简介
│  │     └─ character-graph.md   # 人物页的关系总图
│  ├─ components/
│  │  ├─ CharacterCard.astro     # 人物卡片
│  │  ├─ FactionCard.astro       # 势力卡片
│  │  ├─ LocationCard.astro      # 地点卡片
│  │  ├─ LoreCard.astro          # 体系卡片
│  │  ├─ Mermaid.astro           # 关系图渲染
│  │  ├─ Timeline.astro          # 垂直时间轴
│  │  ├─ Nav.astro
│  │  ├─ Footer.astro
│  │  └─ SectionHeading.astro
│  ├─ layouts/
│  │  └─ BaseLayout.astro
│  ├─ lib/
│  │  └─ site.ts                 # 站名、描述、url() 拼接工具
│  ├─ pages/
│  │  ├─ index.astro             # 首页
│  │  ├─ 404.astro
│  │  ├─ characters/
│  │  │  ├─ index.astro          # 人物列表
│  │  │  └─ [id].astro           # 人物详情
│  │  ├─ factions/
│  │  │  ├─ index.astro          # 势力列表
│  │  │  └─ [id].astro           # 势力详情
│  │  └─ settings/
│  │     ├─ index.astro          # 设定总览（地理 / 历史 / 体系）
│  │     ├─ locations/[id].astro # 地点详情
│  │     └─ systems/[id].astro   # 体系详情
│  ├─ styles/
│  │  └─ global.css              # 主题变量 + 组件样式
│  └─ content.config.ts          # ★ 所有 frontmatter 字段的 schema
├─ .gitignore
├─ astro.config.mjs
├─ package.json
├─ tsconfig.json
├─ README.md
└─ 内容填写指南.md
```

---

## 本地开发

需要 Node 18+（推荐 20 或 22）。

```bash
npm install
npm run dev      # http://localhost:4321/oc-s-world/
```

生产构建：

```bash
npm run build    # 产物在 dist/
npm run preview  # 本地预览构建结果
```

---

## 新增一个角色（30 秒版）

1. 在 `src/content/characters/` 里新建 `你的角色id.md`（**文件名就是网址**，建议用小写英文或拼音）。
2. 写入下面这段，然后改值：

```markdown
---
name: 林夏
enName: LIN XIA
title: UOSC 第七科外勤异能者
faction: uosc
accent: '#00e5ff'
summary: 出现在卡片上的一句话介绍。
---

## 正文

这里随便写，普通 Markdown。
```

3. 保存 → 本地 `npm run dev` 就能看到。
4. 推送 → GitHub Actions 自动构建并发布。

字段全表、Mermaid 写法、常见坑，都在 [《内容填写指南》](./内容填写指南.md) 里。

---

## 部署

### 自动部署（已配好）

`.github/workflows/deploy.yml` 已经写好，流程是：

```text
push 到 main
   ↓
setup-node → npm ci → npm run build
   ↓
peaceiris/actions-gh-pages 把 dist/ 推到 gh-pages 分支
   ↓
GitHub Pages 从 gh-pages 分支发布
```

**你唯一需要做的一次性设置：**

1. 打开仓库 → **Settings** → **Pages**
2. **Source** 选 **Deploy from a branch**
3. **Branch** 选 **`gh-pages`**，目录选 **`/ (root)`**，Save
4. 回到 **Actions** 标签页，等 `Deploy to GitHub Pages` 跑完

之后每次 `git push` 到 `main`，站点会自动更新（约 1 分钟）。

### 手动重新部署

仓库 → **Actions** → 左侧选 **Deploy to GitHub Pages** → 右上 **Run workflow**。

---

## 换成自己的域名 / 仓库名

改 `astro.config.mjs` 顶部两个常量：

```js
const SITE = 'https://你的用户名.github.io';
const BASE = '/你的仓库名';
```

改完推送即可。站内所有链接都用 `src/lib/site.ts` 的 `url()` 拼 base，所以不会出现 404。

如果要用自定义域名：

1. 在 `public/` 下新建 `CNAME` 文件，内容写你的域名（如 `world.example.com`）；
2. 把 `SITE` 改成 `https://world.example.com`，`BASE` 改成 `''`；
3. 在仓库 Settings → Pages → Custom domain 里填同一个域名。

---

## 授权说明

世界设定内容版权归作者所有；站点代码可自由参考。
