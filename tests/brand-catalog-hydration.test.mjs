import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import * as ordering from '../src/lib/collectionOrdering.js';
import * as base44Data from '../src/lib/base44Data.js';

// Compile JSX with the project's existing compiler. Only page presentation and
// network dependencies are stubbed; the route, provider and data hooks are real.
function loadSource(path, imports) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
    fileName: path,
  });
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((specifier) => {
    assert.ok(specifier in imports, `Unexpected dependency: ${specifier}`);
    return imports[specifier];
  }, module, module.exports);
  return module.exports;
}

function createFixture(brandName = 'Rolex') {
  const effects = [];
  let reads = 0;
  let observed;
  const imports = {
    react: { ...React, useEffect: (effect) => effects.push(effect) },
    '@/lib/collectionOrdering': ordering,
    '@/lib/base44Data': base44Data,
    '@/lib/supabaseData': { isCatalogDatabaseConfigured: true },
    '@/lib/dataClient': {
      dataClient: {
        entities: Object.fromEntries(['Products', 'Collections'].map((name) => [name, {
          filter: async () => { reads += 1; return []; },
        }])),
      },
    },
  };
  const provider = loadSource('src/components/shared/BrandCatalogProvider.jsx', imports);
  imports['@/components/shared/BrandCatalogProvider'] = provider;
  const productHook = loadSource('src/hooks/useBrandProducts.js', imports);
  imports['@/hooks/useBrandProducts'] = productHook;
  const collectionHook = loadSource('src/hooks/useBrandCollections.js', imports);

  function Probe() {
    const products = productHook.useBrandProducts(brandName);
    const collections = collectionHook.useBrandCollections(brandName);
    observed = { products, collections };
    return React.createElement('div', null,
      products.products.map((product) => React.createElement('p', { key: product.id }, product.productTitle)),
      collections.collections.map((collection) => React.createElement('span', { key: collection.slug }, collection.name)),
    );
  }
  imports['next/dynamic'] = () => Probe;
  imports['@/page-content/BrandDetail'] = () => null;
  const Route = loadSource('src/components/next-pages/BrandRouteClient.jsx', imports).default;

  return {
    render: (props) => renderToStaticMarkup(React.createElement(Route, props)),
    // React's server renderer does not run effects. Replaying the captured
    // mount callbacks also checks that hydration does not reload supplied data.
    mount: () => effects.forEach((effect) => effect()),
    get observed() { return observed; },
    get reads() { return reads; },
  };
}

test('brand route renders its full supplied catalog and ordered collections before hydration', () => {
  const fixture = createFixture();
  const products = Array.from({ length: 125 }, (_, index) => ({
    id: `watch-${index}`, productTitle: `Rolex watch ${index}`, collection: 'Datejust',
  }));
  const html = fixture.render({
    slug: 'rolex', brand: { brandName: 'Rolex' }, products,
    collections: [
      { id: 'sub', slug: 'submariner', collectionName: 'Submariner' },
      { id: 'date', slug: 'datejust', collectionName: 'Datejust' },
    ],
  });

  assert.match(html, /Rolex watch 124/);
  assert.strictEqual(fixture.observed.products.products, products);
  assert.equal(fixture.observed.products.loading, false);
  assert.equal(fixture.observed.collections.loading, false);
  assert.deepEqual(fixture.observed.collections.collections.map((collection) => collection.slug), ['datejust', 'submariner']);
  fixture.mount();
  assert.equal(fixture.reads, 0);
});

test('empty server results are complete results and do not trigger a second catalog load', () => {
  const fixture = createFixture('IWC Schaffhausen');
  fixture.render({ slug: 'iwc-schaffhausen', brand: null, products: [], collections: [] });
  assert.equal(fixture.observed.products.loading, false);
  assert.equal(fixture.observed.collections.loading, false);
  assert.deepEqual(fixture.observed.products.products, []);
  assert.deepEqual(fixture.observed.collections.collections, []);
  fixture.mount();
  assert.equal(fixture.reads, 0);
});

test('absent server data stays distinguishable from an empty loaded catalog', () => {
  const fixture = createFixture();
  fixture.render({ slug: 'rolex', brand: { brandName: 'Rolex' } });
  assert.equal(fixture.observed.products.loading, true);
  assert.equal(fixture.observed.collections.loading, true);
  assert.deepEqual(fixture.observed.products.products, []);
});

test('a nested consumer never receives products for another brand', () => {
  const fixture = createFixture('Omega');
  fixture.render({
    slug: 'rolex', brand: { brandName: 'Rolex' },
    products: [{ id: 'rolex-watch', productTitle: 'Rolex watch' }], collections: [],
  });
  assert.deepEqual(fixture.observed.products.products, []);
  assert.equal(fixture.observed.products.loading, true);
});
