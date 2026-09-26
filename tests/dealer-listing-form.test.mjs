import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import {
  dealerListingFromProduct,
  dealerListingPayload,
  emptyDealerListing,
  saveDealerListingBatch,
  validateDealerListing,
} from '../src/lib/dealerListingDraft.js';

function completeDraft() {
  return {
    ...emptyDealerListing(),
    productTitle: 'Rolex Datejust 36', brand: 'Rolex', collection: 'Datejust',
    price: '7500', stockQuantity: '2', referenceNumber: '126234',
  };
}

test('one dealer draft preserves English source, custom attributes, photo metadata and commerce fields', () => {
  const draft = {
    ...completeDraft(),
    salePrice: '7000', categoryId: 'category-1', sku: 'DJ-001',
    productImages: ['front.jpg', 'back.jpg'], imageAlts: ['Front view', 'Caseback'],
    imageTitles: ['Front'], customAttributes: [{ key: 'Dial Finish', value: 'Sunburst' }],
    metaTitle: 'Rolex Datejust watch', boxIncluded: true,
  };
  assert.equal(validateDealerListing(draft), null);
  const payload = dealerListingPayload(draft);
  assert.equal(payload.productTitle_en, 'Rolex Datejust 36');
  assert.equal(payload.sourceLocale, 'en');
  assert.equal(payload.price, 7500);
  assert.equal(payload.salePrice, 7000);
  assert.equal(payload.stockQuantity, 2);
  assert.equal(payload.categoryId, 'category-1');
  assert.equal(payload.sku, 'DJ-001');
  assert.deepEqual(payload.attributes, { 'Dial Finish': 'Sunburst' });
  assert.deepEqual(payload.imageAlts, ['Front view', 'Caseback']);
  assert.deepEqual(payload.imageTitles, ['Front', '']);
  assert.equal(payload.metaTitle_en, 'Rolex Datejust watch');
  assert.equal(payload.authenticationStatus, undefined);
  assert.equal(payload.featured, undefined);
});

test('editing retains configured Ecom attributes without duplicating watch shortcut fields', () => {
  const draft = dealerListingFromProduct({
    productTitle: 'Deutscher Titel', productTitle_en: 'English title',
    price: 4500, salePrice: null,
    attributes: { 'Case Diameter': '36 mm', 'Dial Finish': 'Glossy', 'Warranty Type': 'Dealer' },
    caseDiameter: '36 mm', warrantyType: 'Dealer',
  });
  assert.equal(draft.productTitle, 'English title');
  assert.equal(draft.salePrice, '');
  assert.deepEqual(draft.customAttributes, [{ key: 'Dial Finish', value: 'Glossy' }]);
});

test('invalid price, stock, duplicate or incomplete custom attributes stop the whole batch before writing', () => {
  assert.match(validateDealerListing(emptyDealerListing()), /title/);
  assert.match(validateDealerListing({ ...completeDraft(), salePrice: '8000' }), /Sale price/);
  assert.match(validateDealerListing({ ...completeDraft(), stockQuantity: '-1' }), /Stock/);
  assert.match(validateDealerListing({ ...completeDraft(), customAttributes: [{ key: 'Lug Width', value: '' }] }), /name and value/);
  assert.match(validateDealerListing({ ...completeDraft(), customAttributes: [
    { key: 'Lug Width', value: '20 mm' }, { key: 'lug width', value: '21 mm' },
  ] }), /duplicate/);
  assert.match(validateDealerListing({ ...completeDraft(), productImages: Array(21).fill('photo.jpg') }), /20 photos/);
});

test('one-click batch submission keeps only failed drafts for retry', async () => {
  const first = completeDraft();
  const second = { ...completeDraft(), productTitle: 'Omega Speedmaster', brand: 'Omega', collection: 'Speedmaster' };
  const third = { ...completeDraft(), productTitle: 'Cartier Santos', brand: 'Cartier', collection: 'Santos' };
  const seen = [];
  const progress = [];
  const result = await saveDealerListingBatch([first, second, third], async (payload) => {
    seen.push(payload.productTitle);
    if (payload.brand === 'Omega') throw new Error('Temporary upload failure');
    return { id: payload.productTitle, translationWarning: payload.brand === 'Cartier' ? 'Translation delayed' : undefined };
  }, (index, total) => progress.push([index, total]));
  assert.deepEqual(seen, ['Rolex Datejust 36', 'Omega Speedmaster', 'Cartier Santos']);
  assert.deepEqual(progress, [[1, 3], [2, 3], [3, 3]]);
  assert.equal(result.created, 2);
  assert.deepEqual(result.failures.map((item) => item.draft), [second]);
  assert.deepEqual(result.warnings, ['Translation delayed']);
});

test('dealer editor stages multiple watches and uses the shared batch helper', () => {
  const source = readFileSync(new URL('../src/page-content/portal/PortalListingForm.jsx', import.meta.url), 'utf8');
  assert.match(source, /MAX_BATCH = 12/);
  assert.match(source, /await saveDealerListingBatch\(/);
  assert.match(source, /setDrafts\(failures\.map\(\(item\) => item\.draft\)\)/);
  assert.match(source, /getDealerListingFormOptions/);
  assert.match(source, /attributeDefs/);
});
