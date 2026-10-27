// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { remarkWikilink } from './src/lib/remark-wikilink.mjs';

// 部署地址： https://mo-righ.github.io/oc-s-world/
// 如果你 fork 到自己的账号下，只需改写 SITE / BASE 两个常量即可，其余逻辑会自动跟随。
const SITE = 'https://mo-righ.github.io';
const BASE = '/oc-s-world';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  output: 'static', // 纯静态输出，零后端依赖
  build: {
    assets: 'assets',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: true,
    },
    remarkPlugins: [
      // 维基式内链：正文里出现的已知词条名会自动链接到对应档案页
      [remarkWikilink, { base: BASE, autoLink: true, maxPerPage: 1 }],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // mermaid 体积较大，单独拆包，避免拖慢首屏
      chunkSizeWarningLimit: 4096,
    },
  },
});
