import test from 'node:test';
import assert from 'node:assert/strict';
import {
  countProductsForCollection,
  normalizeCollectionKey,
  sortCollectionsByProductCount,
} from '../src/lib/collectionOrdering.js';

test('collection names use a stable punctuation-insensitive key', () => {
  assert.equal(normalizeCollectionKey("Pilot's Watches"), 'pilots-watches');
  assert.equal(normalizeCollectionKey('Pilot’s Watches'), 'pilots-watches');
  assert.equal(normalizeCollectionKey('Clifton & Classima'), 'clifton-and-classima');
});

test('products match collections by database id or normalized collection name', () => {
  const collection = { id: 'collection-1', name: "Pilot's Watches", slug: 'pilots-watches' };
  const products = [
    { collectionId: 'collection-1', collection: 'Unrelated' },
    { collection: 'Pilots Watches' },
    { collection: 'Royal Oak' },
  ];

  assert.equal(countProductsForCollection(collection, products), 2);
});

test('collection tiles are ordered from the highest product count to the lowest', () => {
  const collections = [
    { name: 'Submariner', slug: 'submariner', displayOrder: 1 },
    { name: 'Datejust', slug: 'datejust', displayOrder: 2 },
    { name: 'Day-Date', slug: 'day-date', displayOrder: 3 },
    { name: 'Explorer', slug: 'explorer', displayOrder: 4 },
  ];
  const products = [
    { collection: 'Datejust' },
    { collection: 'Datejust' },
    { collection: 'Datejust' },
    { collection: 'Submariner' },
    { collection: 'Submariner' },
    { collection: 'Day Date' },
  ];

  const sorted = sortCollectionsByProductCount(collections, products);

  assert.deepEqual(sorted.map(collection => collection.slug), [
    'datejust',
    'submariner',
    'day-date',
    'explorer',
  ]);
  assert.deepEqual(sorted.map(collection => collection.productCount), [3, 2, 1, 0]);
});

test('equal product counts retain curated display order', () => {
  const collections = [
    { name: 'Later', displayOrder: 20 },
    { name: 'Earlier', displayOrder: 10 },
  ];

  assert.deepEqual(
    sortCollectionsByProductCount(collections).map(collection => collection.name),
    ['Earlier', 'Later'],
  );
});
