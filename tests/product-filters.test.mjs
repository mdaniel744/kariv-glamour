import test from 'node:test';
import assert from 'node:assert/strict';
import { productMatchesSearchPayload } from '../src/lib/productFilters.js';

const basePayload = {
  search: '',
  brands: [],
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

test('Rolex Submariner landing filter matches the family in a localized title', () => {
  const product = {
    brand: 'ROLEX',
    collection: '',
    model: '',
    productTitle_en: 'Rolex Submariner Date 126610LN',
    gender: 'Men',
    price: 14500,
  };

  assert.equal(productMatchesSearchPayload(product, {
    ...basePayload,
    brands: ['Rolex'],
    collections: ['Submariner'],
  }), true);

  assert.equal(productMatchesSearchPayload(product, {
    ...basePayload,
    brands: ['Omega'],
    collections: ['Submariner'],
  }), false);
});

test('Omega Speedmaster landing filter matches a more specific saved collection', () => {
  const product = {
    brand: 'Omega',
    collection: 'Speedmaster Moonwatch Professional',
    productTitle: 'Moonwatch Professional',
    gender: 'Men',
    price: 8200,
  };

  assert.equal(productMatchesSearchPayload(product, {
    ...basePayload,
    brands: ['omega'],
    collections: ['Speedmaster'],
  }), true);
});

test('women filter accepts feminine aliases but excludes men and unisex', () => {
  const payload = { ...basePayload, genders: ['Women'] };
  assert.equal(productMatchesSearchPayload({ gender: 'Women', price: 1000 }, payload), true);
  assert.equal(productMatchesSearchPayload({ gender: "Women's", price: 1000 }, payload), true);
  assert.equal(productMatchesSearchPayload({ gender: 'Damen', price: 1000 }, payload), true);
  assert.equal(productMatchesSearchPayload({ gender: 'Men', price: 1000 }, payload), false);
  assert.equal(productMatchesSearchPayload({ gender: 'Unisex', price: 1000 }, payload), false);
});

test('landing attribute and price filters tolerate stored variants', () => {
  const product = {
    caseMaterial: '18k Yellow Gold',
    movementType: 'Automatic Chronograph',
    isCertifiedPreOwned: 'true',
    price: 12000,
    salePrice: 9800,
  };

  assert.equal(productMatchesSearchPayload(product, {
    ...basePayload,
    materials: ['Yellow Gold'],
    movementTypes: ['Automatic'],
    isCertifiedPreOwned: true,
    maxPrice: 10000,
  }), true);
});
