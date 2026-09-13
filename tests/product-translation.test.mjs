import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import ts from 'typescript';

function translator(requests, fail = false) {
  const source = readFileSync(new URL('../src/lib/productTranslation.js', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  const fetch = async (_url, options) => {
    const request = JSON.parse(options.body);
    const system = request.input[0].content;
    const fields = JSON.parse(request.input[1].content);
    requests.push({ system, fields });
    if (fail) return { ok: false, status: 503 };
    return { ok: true, json: async () => ({ output_text: JSON.stringify(Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, `Translated: ${value}`]))) }) };
  };
  compileFunction(compiled, ['require', 'module', 'exports', 'process', 'fetch', 'AbortSignal'])(
    (name) => { assert.equal(name, 'server-only'); return {}; }, module, module.exports,
    { env: { OPENAI_API_KEY: 'test-only-not-a-real-key' } }, fetch, AbortSignal,
  );
  return module.exports.translateMissingProductContent;
}

test('new English originals generate German and Czech independent of UI language', async () => {
  const requests = [];
  const result = await translator(requests)({ sourceLocale: 'de', productTitle: 'Blue dial watch', productDescription: '<p>Steel case</p>' });
  assert.equal(result.payload.productTitle_en, 'Blue dial watch');
  assert.equal(result.payload.productTitle_de, 'Translated: Blue dial watch');
  assert.equal(result.payload.productTitle_cs, 'Translated: Blue dial watch');
  assert.ok(requests.some(({ system }) => system.includes('from English to Czech')));
  assert.ok(requests.some(({ system }) => system.includes('from English to German')));
  assert.equal(result.warning, '');
});

test('legacy German primary content uses saved English and preserves human corrections', async () => {
  const requests = [];
  const result = await translator(requests)({ productTitle: 'Blaue Uhr', productTitle_en: 'Blue watch', productTitle_de: 'Menschlich korrigierter Titel', productDescription_cs: 'Ručně upravený popis' });
  assert.equal(result.payload.productTitle_en, 'Blue watch');
  assert.equal(result.payload.productTitle_de, 'Menschlich korrigierter Titel');
  assert.equal(result.payload.productTitle_cs, 'Translated: Blue watch');
  assert.equal(result.payload.productDescription_cs, 'Ručně upravený popis');
  assert.ok(!requests.some(({ fields }) => fields.productTitle === 'Blaue Uhr'));
});

test('known German-only legacy copy is recovered before translating Czech', async () => {
  const requests = [];
  const result = await translator(requests)({ productTitle: 'Alte Uhr', productTitle_de: 'Alte Uhr' });
  assert.match(requests[0].system, /from German to English/);
  assert.match(requests[1].system, /from English to Czech/);
  assert.equal(result.payload.productTitle_de, 'Alte Uhr');
  assert.equal(result.payload.productTitle_cs, 'Translated: Translated: Alte Uhr');
});

test('provider failures keep originals and human translations without pretending completion', async () => {
  const result = await translator([], true)({ productTitle: 'Blue watch', productTitle_en: 'Blue watch', productTitle_de: 'Blaue Uhr' });
  assert.equal(result.payload.productTitle_en, 'Blue watch');
  assert.equal(result.payload.productTitle_de, 'Blaue Uhr');
  assert.equal(result.payload.productTitle_cs, undefined);
  assert.match(result.warning, /HTTP 503/);
  assert.equal(result.automaticKeys.size, 0);
});

test('all localized fields already present require no provider call', async () => {
  const requests = [];
  const result = await translator(requests)({ productTitle_en: 'Watch', productTitle_de: 'Uhr', productTitle_cs: 'Hodinky' });
  assert.equal(requests.length, 0);
  assert.equal(result.warning, '');
});
