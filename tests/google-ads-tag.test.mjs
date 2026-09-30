import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { GOOGLE_ADS_TAG_ID, googleAdsBootstrap, purchaseEventPayload, trackCheckoutOrderCreated } from '../src/lib/googleAdsTag.js';

function runTag(savedChoice = null) {
  const scripts = [];
  const storage = new Map(savedChoice ? [['kariv-google-ads-consent-v1', savedChoice]] : []);
  const context = {
    window: {},
    document: {
      createElement: () => ({}),
      head: { appendChild: (script) => scripts.push(script) },
    },
    localStorage: {
      getItem: (key) => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value),
    },
    Date,
    encodeURIComponent,
  };
  vm.runInNewContext(googleAdsBootstrap(), context);
  return { ...context, scripts, storage };
}

test('the supplied Google Ads tag is initialized in the shared page head', () => {
  const layout = readFileSync(new URL('../app/[locale]/layout.jsx', import.meta.url), 'utf8');
  assert.match(layout, /<head>[\s\S]*googleAdsBootstrap\(\)[\s\S]*<\/head>/);
  assert.equal(GOOGLE_ADS_TAG_ID, 'AW-17312885621');
});

test('the tag never calls Google before an affirmative choice', () => {
  for (const savedChoice of [null, 'denied']) {
    const { window, scripts } = runTag(savedChoice);
    assert.equal(scripts.length, 0);
    assert.equal(Array.from(window.dataLayer[0])[0], 'consent');
    assert.equal(Array.from(window.dataLayer[0])[1], 'default');
    assert.equal(Array.from(window.dataLayer[0])[2].ad_storage, 'denied');
    assert.ok(!window.dataLayer.some((entry) => Array.from(entry)[0] === 'config'));
  }
});

test('accepting loads the Google tag once and revocation updates consent', () => {
  const { window, scripts, storage } = runTag();
  window.karivGoogleAds.grant();
  window.karivGoogleAds.grant();
  assert.equal(storage.get('kariv-google-ads-consent-v1'), 'granted');
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_TAG_ID}`);
  assert.ok(window.dataLayer.some((entry) => Array.from(entry)[0] === 'config' && Array.from(entry)[1] === GOOGLE_ADS_TAG_ID));
  window.karivGoogleAds.deny();
  assert.equal(storage.get('kariv-google-ads-consent-v1'), 'denied');
  assert.equal(Array.from(window.dataLayer.at(-1))[2].ad_storage, 'denied');
});

test('a prior affirmative choice loads the tag on the next page', () => {
  const { scripts } = runTag('granted');
  assert.equal(scripts.length, 1);
});

test('purchase payload uses the newly created order without personal information', () => {
  assert.deepEqual(purchaseEventPayload({ id: 'order-123', totalAmount: '12500', currency: 'czk', customerEmail: 'private@example.com' }), {
    transaction_id: 'order-123', value: 12500, currency: 'CZK',
  });
  assert.equal(purchaseEventPayload({ id: 'order-123', totalAmount: 0, currency: 'EUR' }), null);
});

test('checkout purchase is only queued after consent and once per order', () => {
  const calls = [];
  const storage = new Map();
  const previousWindow = globalThis.window;
  globalThis.window = {
    karivGoogleAds: { choice: () => 'denied' },
    gtag: (...args) => calls.push(args),
    sessionStorage: { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) },
  };
  try {
    const order = { id: 'order-123', totalAmount: 4000, currency: 'EUR' };
    assert.equal(trackCheckoutOrderCreated(order), false);
    globalThis.window.karivGoogleAds.choice = () => 'granted';
    assert.equal(trackCheckoutOrderCreated(order), true);
    assert.equal(trackCheckoutOrderCreated(order), false);
    assert.deepEqual(calls, [['event', 'purchase', { transaction_id: 'order-123', value: 4000, currency: 'EUR' }]]);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});
