import test from 'node:test';
import assert from 'node:assert/strict';
import { KARIV_STORE_ID, createClaimPlan, replaceClaims, validateOperation, translationWinner } from '../scripts/lib/product-claim-plan.mjs';
import { rules as enRules } from '../scripts/lib/product-claim-rules-en.mjs';
import { rules as deRules } from '../scripts/lib/product-claim-rules-de.mjs';
import { rules as csRules } from '../scripts/lib/product-claim-rules-cs.mjs';

const rules = [{ id: 'inspection', from: 'Verified by our experts.', to: 'Sellers must substantiate authenticity.' },
  { id: 'generic-cpo-en', from: 'certified pre-owned', to: 'pre-owned' }];
const row = { id: 'watch-1', store_id: KARIV_STORE_ID, status: 'active', updated_at: '2026-10-02T00:00:00Z',
  description: 'Verified by our experts.', name: 'Original dial', slug: 'watch-1', price: 5000,
  attributes: { Authentication: 'Verified' }, images: ['certificate.jpg'] };

test('claim replacement changes only exact text nodes and retains disclosures and HTML', () => {
  const text = '<p>Verified by our experts.</p><p>Aftermarket dial; serviced by Omega in 2025. COSC certified.</p><img src="Verified by our experts.">';
  const changed = replaceClaims(text, rules);
  assert.equal(changed.value, '<p>Sellers must substantiate authenticity.</p><p>Aftermarket dial; serviced by Omega in 2025. COSC certified.</p><img src="Verified by our experts.">');
  assert.equal(replaceClaims(changed.value, rules).value, changed.value);
});

test('a specific certificate or passport is not silently stripped by a generic CPO rule', () => {
  assert.equal(replaceClaims('A certified pre-owned watch, certificate included.', rules).value, 'A certified pre-owned watch, certificate included.');
  assert.equal(replaceClaims('A certified pre-owned watch.', rules).value, 'A pre-owned watch.');
  assert.equal(replaceClaims('Rolex Certified Pre-Owned programme.', rules).value, 'Rolex Certified Pre-Owned programme.');
});

test('the plan preserves human corrections selected by the storefront instead of reviving stale aliases', () => {
  const base = { store_id: KARIV_STORE_ID, entity_type: 'product', entity_id: row.id, locale: 'en' };
  const stale = { ...base, id: 'old', field_name: 'description', value: 'Verified by our experts.', updated_at: '2026-09-01T00:00:00Z' };
  const corrected = { ...base, id: 'new', field_name: 'productDescription', value: 'Seller supplied a dated service invoice.', updated_at: '2026-10-01T00:00:00Z' };
  const plan = createClaimPlan({ storeId: KARIV_STORE_ID, products: [row], translations: [corrected, stale] }, { en: rules });
  assert.equal(plan.operations.length, 1);
  assert.deepEqual(plan.operations[0].patch, { description: 'Sellers must substantiate authenticity.' });
  assert.equal(plan.affectedProducts, 1);
  assert.equal(row.description, 'Verified by our experts.');
});

test('only content fields in the Kariv tenant may be changed', () => {
  const operation = { table: 'products', id: row.id, productId: row.id, before: row, patch: { description: 'Authenticity information.' } };
  assert.doesNotThrow(() => validateOperation(operation, KARIV_STORE_ID));
  for (const field of ['name', 'slug', 'price', 'stock_quantity', 'status', 'dealer_id', 'attributes', 'images']) {
    assert.throws(() => validateOperation({ ...operation, patch: { [field]: 'changed' } }, KARIV_STORE_ID));
  }
  assert.throws(() => validateOperation(operation, 'another-store'));
  assert.throws(() => validateOperation({ ...operation, before: { ...row, updated_at: null } }, KARIV_STORE_ID));
});

test('a plan rejects a translation belonging to another tenant or product', () => {
  const snapshot = { storeId: KARIV_STORE_ID, products: [row], translations: [{ id: 'foreign', store_id: 'another-store', entity_type: 'product', entity_id: row.id }] };
  assert.throws(() => createClaimPlan(snapshot, { en: rules }));
  snapshot.translations[0].store_id = KARIV_STORE_ID;
  snapshot.translations[0].entity_id = 'another-watch';
  assert.throws(() => createClaimPlan(snapshot, { en: rules }));
});

test('an inline verified label is changed only in its exact authentication context', () => {
  const inlineRules = [{ id: 'status', from: 'Verified', to: 'Seller evidence required', wholeNode: true, precedingText: 'Authentication:' }];
  const input = '<li><strong>Authentication:</strong> Verified</li><p>Verified by Rolex service center.</p><p>Contact:</p><p>Verified</p>';
  assert.equal(replaceClaims(input, inlineRules).value, '<li><strong>Authentication:</strong> Seller evidence required</li><p>Verified by Rolex service center.</p><p>Contact:</p><p>Verified</p>');
});

test('apply rejects title translations and checks current alias precedence', () => {
  const base = { id: 't1', store_id: KARIV_STORE_ID, entity_type: 'product', entity_id: row.id, locale: 'en', field_name: 'description', value: 'Before', updated_at: '2026-10-01T00:00:00Z' };
  const operation = { table: 'translations', id: base.id, productId: row.id, locale: 'en', before: base, patch: { value: 'After' } };
  assert.doesNotThrow(() => validateOperation(operation, KARIV_STORE_ID));
  assert.throws(() => validateOperation({ ...operation, before: { ...base, field_name: 'name' } }, KARIV_STORE_ID));
  assert.throws(() => validateOperation({ ...operation, locale: 'cs' }, KARIV_STORE_ID));
  const correction = { ...base, id: 't2', field_name: 'productDescription', value: 'Human correction', updated_at: '2026-10-02T00:00:00Z' };
  assert.equal(translationWinner([base, correction], base).id, correction.id);
});

test('reviewed language rules preserve documented service, modifications and technical certifications', () => {
  const allRules = [...enRules, ...deRules, ...csRules];
  assert.equal(new Set(allRules.map((rule) => rule.id)).size, allRules.length);
  assert.ok(allRules.every((rule) => !/[<>]/.test(rule.from + rule.to)));
  const facts = '<p>Aftermarket diamond dial. Non-Rolex strap. Serviced by Omega in 2025. COSC and METAS certified. Authenticated via Bezel. Includes an authenticity certificate.</p>';
  assert.equal(replaceClaims(facts, allRules).value, facts);
  for (const languageRules of [enRules, deRules, csRules]) {
    const sample = languageRules.find((rule) => !rule.wholeNode && !rule.id.startsWith('generic-cpo') && rule.from.endsWith('.'));
    const changed = replaceClaims(`<p>${sample.from}</p>`, languageRules);
    assert.notEqual(changed.value, `<p>${sample.from}</p>`);
    assert.equal(replaceClaims(changed.value, languageRules).value, changed.value);
  }
});

test('Czech cleanup preserves inflection and avoids repeated seller-policy copy', () => {
  const policy = 'Prodejci musí nabízet pravé hodinky a být schopni doložit jejich pravost.';
  const text = `<p>certifikovaného zánovního kusu</p><p>předem vlastněné, předem vlastněné</p><p>${policy} ${policy}</p>`;
  const result = replaceClaims(text, csRules).value;
  assert.equal(result, `<p>zánovního kusu</p><p>předem vlastněné</p><p>${policy}</p>`);
  assert.equal(replaceClaims(result, csRules).value, result);
});
