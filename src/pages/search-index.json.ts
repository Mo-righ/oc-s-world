/**
 * 静态搜索索引接口
 * 构建产物为 /search-index.json，供全局搜索浮层按需拉取。
 */

import type { APIRoute } from 'astro';
import { buildSearchIndex } from '../lib/search-index';

export const GET: APIRoute = async () => {
  const items = await buildSearchIndex();
  return new Response(JSON.stringify(items), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=300',
    },
  });
};
