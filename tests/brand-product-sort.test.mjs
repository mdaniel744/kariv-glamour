import test from 'node:test';
import assert from 'node:assert/strict';
import { sortBrandProducts } from '../src/lib/brandProductSort.js';

const products = [
  { id: 'older', price: 900, yearOfProduction: '2020', created_date: '2024-01-01', isFeatured: false },
  { id: 'featured', price: 12000, yearOfProduction: '2025', created_date: '2025-01-01', isFeatured: true },
  { id: 'newer', price: 2500, yearOfProduction: '2023', created_date: '2026-01-01', isFeatured: false },
];
const ids = (rows) => rows.map((product) => product.id);

test('brand sorting orders prices numerically in either direction', () => {
  assert.deepEqual(ids(sortBrandProducts(products, 'price')), ['older', 'newer', 'featured']);
  assert.deepEqual(ids(sortBrandProducts(products, '-price')), ['featured', 'newer', 'older']);
});

test('brand sorting supports newest listings, production year and featured watches', () => {
  assert.deepEqual(ids(sortBrandProducts(products)), ['newer', 'featured', 'older']);
  assert.deepEqual(ids(sortBrandProducts(products, '-yearOfProduction')), ['featured', 'newer', 'older']);
  assert.deepEqual(ids(sortBrandProducts(products, 'featured')), ['featured', 'older', 'newer']);
});

test('missing prices stay at the end and sorting never mutates the shared brand catalog', () => {
  const catalog = Object.freeze([...products, { id: 'unknown', price: null }]);
  assert.equal(sortBrandProducts(catalog, 'price').at(-1).id, 'unknown');
  assert.equal(sortBrandProducts(catalog, '-price').at(-1).id, 'unknown');
  assert.deepEqual(ids(catalog), ['older', 'featured', 'newer', 'unknown']);
});
