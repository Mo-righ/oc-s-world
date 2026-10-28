import { b as buildSearchIndex } from '../chunks/search-index_CzRz6BB9.mjs';
export { renderers } from '../renderers.mjs';

const GET = async () => {
  const items = await buildSearchIndex();
  return new Response(JSON.stringify(items), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=300"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
