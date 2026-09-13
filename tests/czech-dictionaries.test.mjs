import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import i18next from 'i18next';
import { getEscrowCopy } from '../src/lib/escrowCopy.js';
import { ESCROW_STATUSES, ESCROW_STEPS } from '../src/lib/escrowConstants.js';

const namespaces = ['common', 'navigation', 'products', 'filters', 'admin', 'brandComponents'];
const load = (locale, namespace) => JSON.parse(readFileSync(new URL(`../src/locales/${locale}/${namespace}.json`, import.meta.url), 'utf8'));
function leaves(value, prefix = '') {
  return Object.entries(value).flatMap(([key, child]) => child && typeof child === 'object'
    ? leaves(child, `${prefix}${key}.`)
    : [[`${prefix}${key}`, child]]);
}
const tokens = (text) => (text.match(/\{\{[^}]+\}\}|<[^>]+>|https?:\/\/\S+/g) || []).sort();

for (const namespace of namespaces) {
  test(`Czech ${namespace} translates every key and preserves interpolation`, () => {
    const en = Object.fromEntries(leaves(load('en', namespace)));
    const cs = Object.fromEntries(leaves(load('cs', namespace)));
    assert.deepEqual(Object.keys(cs).sort(), Object.keys(en).sort());
    for (const [key, value] of Object.entries(en)) {
      assert.equal(typeof cs[key], 'string', key);
      assert.ok(cs[key].trim().length, `${namespace}.${key} must not be blank`);
      assert.deepEqual(tokens(cs[key]), tokens(value), `${namespace}.${key} must preserve tokens`);
    }
    // Brand names, technical labels (SKU) and loanwords (Vintage) legitimately match.
    const translated = Object.keys(en).filter((key) => cs[key] !== en[key]).length;
    assert.ok(translated / Object.keys(en).length > 0.9, `${namespace} must contain actual Czech, not an English copy`);
  });
}

test('Czech UI interpolation produces readable search, count and review labels', async () => {
  const instance = i18next.createInstance();
  await instance.init({ lng: 'cs', fallbackLng: false, resources: { cs: { common: load('cs', 'common') } }, defaultNS: 'common', interpolation: { escapeValue: false } });
  assert.equal(instance.t('shop.searchResults', { query: 'Rolex' }), 'Výsledky hledání pro „Rolex“');
  assert.equal(instance.t('shop.showResults', { count: 2 }), 'Zobrazit výsledky: 2');
  assert.equal(instance.t('components.dealerReviews.rateDealer', { dealer: 'Novák' }), 'Ohodnoťte svou zkušenost s prodejcem Novák');
  assert.equal(instance.t('pages.checkout.total'), 'Celkem');
});

test('all persisted order status values have Czech and German display copy without changing keys', () => {
  for (const locale of ['cs', 'de']) {
    const copy = getEscrowCopy(locale);
    assert.deepEqual(Object.keys(copy.labels).sort(), [...ESCROW_STATUSES].sort());
    assert.deepEqual(Object.keys(copy.descriptions).sort(), [...ESCROW_STATUSES].sort());
    for (const status of ESCROW_STATUSES) {
      assert.ok(copy.labels[status]);
      assert.ok(copy.descriptions[status]);
      assert.notEqual(copy.labels[status], getEscrowCopy('en').labels[status]);
    }
    for (const step of ESCROW_STEPS) assert.ok(copy.steps[step.key]);
  }
  assert.equal(getEscrowCopy('cs').bank, 'Bankovní převod');
});
