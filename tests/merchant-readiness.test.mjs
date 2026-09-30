import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { localizedHref } from '../src/lib/localizedHref.js';
import { getLegalPageFallback } from '../src/lib/legalPageFallbacks.js';
import { LEGACY_COLLECTION_SEARCH, legacyCollectionDestination } from '../src/lib/legacyCollectionSearch.js';
import { ROLEX_TRUST_LINKS } from '../src/lib/rolexData.js';
import { OMEGA_TRUST_LINKS } from '../src/lib/omegaData.js';
import { PATEK_TRUST_LINKS } from '../src/lib/patekData.js';

test('contact links stay actionable in every storefront language', () => {
  for (const locale of ['en', 'de', 'cs']) {
    assert.equal(localizedHref('mailto:info@24kariv.com', locale), 'mailto:info@24kariv.com');
    assert.equal(localizedHref('tel:+420123456789', locale), 'tel:+420123456789');
    assert.equal(localizedHref('https://coi.gov.cz/en/', locale), 'https://coi.gov.cz/en/');
    assert.equal(localizedHref('/legal/returns-refund-policy', locale), `/${locale}/legal/returns-refund-policy`);
  }
});

test('shipping policy states that all offered EU deliveries are free', () => {
  const policy = getLegalPageFallback('shipping-policy');
  assert.match(policy.content_en, /Delivery to other EU countries:\*\* Shipping is free/);
  assert.match(policy.content_de, /Lieferung in andere EU-Länder:\*\* Der Versand ist .* kostenlos/);
  assert.match(policy.content_cs, /Doručení do ostatních zemí EU:\*\* Doprava je .* zdarma/);
  assert.doesNotMatch(policy.content_en, /A shipping charge applies/);
  assert.doesNotMatch(policy.content_de, /Für den Versand fallen Kosten an/);
  assert.doesNotMatch(policy.content_cs, /Doprava je zpoplatněna/);
});

test('brand trust links open the actual policies and contact page', () => {
  for (const links of [ROLEX_TRUST_LINKS, OMEGA_TRUST_LINKS, PATEK_TRUST_LINKS]) {
    const paths = links.map((item) => item.link);
    assert.ok(paths.includes('/legal/returns-refund-policy'));
    assert.ok(paths.includes('/legal/shipping-policy'));
    assert.ok(!paths.includes('/returns-and-refunds'));
    assert.ok(!paths.includes('/shipping-policy'));
    assert.ok(!paths.includes('/contact'));
  }
});

test('old category links retain their intended search topic', () => {
  for (const [slug, term] of Object.entries(LEGACY_COLLECTION_SEARCH)) {
    for (const locale of ['en', 'de', 'cs']) {
      const destination = legacyCollectionDestination(locale, slug);
      assert.equal(new URL(destination, 'https://24kariv.com').searchParams.get('search'), term);
    }
  }
  assert.equal(legacyCollectionDestination('en', 'unknown-category'), null);
});

test('old shipping and returns URLs no longer send shoppers to customer service', () => {
  const route = readFileSync(new URL('../app/[locale]/[slug]/page.jsx', import.meta.url), 'utf8');
  assert.match(route, /'returns-and-refunds': '\/legal\/returns-refund-policy'/);
  assert.match(route, /'shipping-policy': '\/legal\/shipping-policy'/);
});
