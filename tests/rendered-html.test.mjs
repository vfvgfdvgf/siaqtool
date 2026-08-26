import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

<<<<<<< HEAD
test("renders final site metadata without a development preview marker", async () => {
=======
test("renders development preview metadata", async () => {
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
<<<<<<< HEAD
  const html = await response.text();
  assert.doesNotMatch(html, developmentPreviewMeta);
  assert.match(html, /<title>سياق — 100 أداة لتحويل وتعديل الملفات<\/title>/);
  assert.match(html, /<meta name="description" content="منصة عربية تضم أدوات PDF/);
=======
  assert.match(await response.text(), developmentPreviewMeta);
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
});
