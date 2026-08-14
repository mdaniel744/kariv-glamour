import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildHomeShopHref,
  HOME_CATEGORY_LINKS,
  HOME_MODEL_LINKS,
} from '../src/lib/homeShopLinks.js';
import { productMatchesSearchPayload } from '../src/lib/productFilters.js';

const basePayload = {
  search: '',
  brands: [],
  models: [],
  collections: [],
  conditions: [],
  availability: [],
  genders: [],
  materials: [],
  dialColors: [],
  movementTypes: [],
  minPrice: null,
  maxPrice: null,
  yearFrom: null,
  yearTo: null,
  isNewArrival: null,
  isCertifiedPreOwned: null,
  isVintage: null,
};

function payloadFromHref(href) {
  const params = new URL(href, 'https://kariv-glamour.test').searchParams;
  return {
    ...basePayload,
    brands: params.getAll('brand'),
    models: params.getAll('model'),
    collections: params.getAll('collection'),
    genders: params.getAll('gender'),
    materials: params.getAll('caseMaterial'),
    movementTypes: params.getAll('movementType'),
    maxPrice: params.get('priceMax') ? Number(params.get('priceMax')) : null,
    isNewArrival: params.get('isNewArrival') === 'true' ? true : null,
    isCertifiedPreOwned: params.get('isCertifiedPreOwned') === 'true' ? true : null,
    isVintage: params.get('isVintage') === 'true' ? true : null,
  };
}

const categoryExamples = {
  mens: {
    matches: { gender: 'Men' },
    rejects: { gender: 'Women' },
  },
  womens: {
    matches: { gender: "Women's" },
    rejects: { gender: 'Men' },
  },
  certified: {
    matches: { isCertifiedPreOwned: true },
    rejects: { isCertifiedPreOwned: false },
  },
  vintage: {
    matches: { condition: 'Vintage' },
    rejects: { condition: 'Excellent', isVintage: false },
  },
  automatic: {
    matches: { movementType: 'Automatic Chronograph' },
    rejects: { movementType: 'Quartz' },
  },
  gold: {
    matches: { caseMaterial: '18k Rose Gold' },
    rejects: { caseMaterial: 'Stainless Steel' },
  },
  newArrivals: {
    matches: { isNewArrival: 'true' },
    rejects: { isNewArrival: false },
  },
  underTen: {
    matches: { price: 12000, salePrice: 9999 },
    rejects: { price: 10001 },
  },
};

test('every Shop by Category card uses a supported filter and rejects a non-match', () => {
  assert.equal(HOME_CATEGORY_LINKS.length, 8);

  HOME_CATEGORY_LINKS.forEach((category) => {
    const payload = payloadFromHref(buildHomeShopHref(category.query));
    const example = categoryExamples[category.key];
    assert.ok(example, `Missing category fixture for ${category.key}`);
    assert.equal(productMatchesSearchPayload(example.matches, payload), true, `${category.key} should match`);
    assert.equal(productMatchesSearchPayload(example.rejects, payload), false, `${category.key} should reject`);
  });

  const goldCategory = HOME_CATEGORY_LINKS.find(({ key }) => key === 'gold');
  assert.deepEqual(goldCategory.query.caseMaterial, [
    'Yellow Gold',
    'Rose Gold',
    'White Gold',
    'Steel and Gold',
    'Steel and Rose Gold',
  ]);
});

const modelExamples = {
  'Rolex Datejust': { collection: 'Datejust 41', productTitle: 'Rolex Datejust 41' },
  'Rolex Submariner': { collection: 'Submariner', model: 'Submariner Date' },
  'Rolex Cosmograph Daytona': { collection: 'Daytona', productTitle: 'Rolex Cosmograph Daytona' },
  'Omega Speedmaster': { collection: 'Speedmaster Moonwatch', model: 'Moonwatch Professional' },
  'Audemars Piguet Royal Oak': { collection: 'Royal Oak', model: 'Royal Oak Selfwinding' },
  'Patek Philippe Nautilus': { collection: 'Nautilus', model: 'Nautilus 5711' },
  'Cartier Santos de Cartier': { collection: 'Santos de Cartier', model: 'Santos Large' },
  'Tudor Black Bay': { collection: 'Black Bay 58', model: 'Black Bay Fifty-Eight' },
};

test('every displayed model sends brand and model attributes and excludes other brands', () => {
  assert.equal(HOME_MODEL_LINKS.length, 8);

  HOME_MODEL_LINKS.forEach((item) => {
    const href = buildHomeShopHref({ brand: item.brand, model: item.model });
    const params = new URL(href, 'https://kariv-glamour.test').searchParams;
    const payload = payloadFromHref(href);
    const key = `${item.brand} ${item.model}`;
    const matchingProduct = { brand: item.brand, ...modelExamples[key] };

    assert.equal(params.get('brand'), item.brand);
    assert.equal(params.get('model'), item.model);
    assert.equal(params.has('collection'), false);
    assert.equal(productMatchesSearchPayload(matchingProduct, payload), true, `${key} should match`);
    assert.equal(productMatchesSearchPayload({ ...matchingProduct, brand: 'Unrelated Brand' }, payload), false, `${key} should reject another brand`);
  });
});

test('model-family filters exclude similarly named sibling collections', () => {
  const datejustPayload = { ...basePayload, brands: ['Rolex'], models: ['Datejust'] };
  assert.equal(productMatchesSearchPayload({ brand: 'Rolex', collection: 'Lady-Datejust' }, datejustPayload), false);

  const royalOakPayload = { ...basePayload, brands: ['Audemars Piguet'], models: ['Royal Oak'] };
  assert.equal(productMatchesSearchPayload({ brand: 'Audemars Piguet', collection: 'Royal Oak Offshore' }, royalOakPayload), false);
  assert.equal(productMatchesSearchPayload({ brand: 'Audemars Piguet', collection: 'Royal Oak Concept' }, royalOakPayload), false);

  const santosPayload = { ...basePayload, brands: ['Cartier'], models: ['Santos de Cartier'] };
  assert.equal(productMatchesSearchPayload({ brand: 'Cartier', collection: 'Santos-Dumont' }, santosPayload), false);
});
