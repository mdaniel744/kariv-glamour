import test from 'node:test';
import assert from 'node:assert/strict';
import { COMPANY_DETAILS, getCompanyDetailsCopy } from '../src/lib/companyDetails.js';
import {
  getAllLegalPageFallbacks,
  getLegalPageFallback,
  mergeLegalPageFallbacks,
} from '../src/lib/legalPageFallbacks.js';

test('official company details remain complete and consistent', () => {
  assert.deepEqual(COMPANY_DETAILS, {
    legalName: 'Kariv Glamour s.r.o.',
    registeredAddress: 'Sokolovská 428/130, Karlín, CZ-18600 Praha',
    companyId: '03964761',
    euid: 'CZVROR.03964761',
    vatId: 'CZ03964761',
    email: 'info@karivglamour.com',
    manager: 'Peter Vasko',
  });
});

test('company-detail labels are localized for English and German legal pages', () => {
  assert.equal(getCompanyDetailsCopy('en').heading, 'Company details');
  assert.equal(getCompanyDetailsCopy('de').heading, 'Unternehmensangaben');
  assert.equal(getCompanyDetailsCopy('de').manager, 'Geschäftsführer');
  assert.equal(getCompanyDetailsCopy('cs').heading, 'Údaje o společnosti');
  assert.equal(getCompanyDetailsCopy('cs').manager, 'Jednatel');
  assert.equal(getCompanyDetailsCopy('fr'), getCompanyDetailsCopy('en'));
});

test('the Impressum remains available when remote legal content is unavailable', () => {
  const impressum = getLegalPageFallback('impressum');

  assert.equal(impressum.slug, 'impressum');
  assert.equal(impressum.title_de, 'Impressum');
  assert.match(impressum.content_de, /Verbraucherstreitbeilegung/);
});

test('every footer policy has complete English and German fallback content', () => {
  const expectedSlugs = [
    'shipping-policy',
    'returns-refund-policy',
    'warranty-policy',
    'terms-and-conditions',
    'privacy-policy',
    'cookie-policy',
    'authenticity-disclaimer',
    'brand-disclaimer',
    'impressum',
  ];

  assert.deepEqual(getAllLegalPageFallbacks().map((page) => page.slug), expectedSlugs);

  expectedSlugs.forEach((slug) => {
    const page = getLegalPageFallback(slug);
    assert.ok(page.title_en.length > 0, `${slug} needs an English title`);
    assert.ok(page.title_de.length > 0, `${slug} needs a German title`);
    assert.ok(page.content_en.length > 150, `${slug} needs English policy content`);
    assert.ok(page.content_de.length > 150, `${slug} needs German policy content`);
    assert.ok(page.title_cs.length > 0, `${slug} needs a Czech title`);
    assert.ok(page.content_cs.length > 150, `${slug} needs Czech policy content`);
  });
});

test('remote legal records override a matching fallback without hiding other policies', () => {
  const remotePrivacy = { slug: 'privacy-policy', title: 'Remote privacy text' };
  const merged = mergeLegalPageFallbacks([remotePrivacy]);

  const privacy = merged.find((page) => page.slug === 'privacy-policy');
  assert.equal(privacy.title, remotePrivacy.title);
  assert.equal(privacy.content_cs, getLegalPageFallback('privacy-policy').content_cs);
  assert.deepEqual(remotePrivacy, { slug: 'privacy-policy', title: 'Remote privacy text' }, 'input record is not mutated');
  assert.ok(merged.some((page) => page.slug === 'shipping-policy'));
  assert.equal(merged.length, getAllLegalPageFallbacks().length);
});

test('published human-authored Czech legal corrections take precedence', () => {
  const authored = { slug: 'privacy-policy', title_cs: 'Vlastní nadpis', content_cs: 'Právně schválený český text', seoTitle_cs: 'Vlastní SEO', seoDescription_cs: 'Vlastní popis' };
  const result = mergeLegalPageFallbacks([authored])[0];
  for (const [key, value] of Object.entries(authored)) assert.equal(result[key], value);
});

test('shipping policy states Czech and EU charges and delivery estimates in both languages', () => {
  const shipping = getLegalPageFallback('shipping-policy');

  assert.match(shipping.content_en, /Czech Republic:\*\* Shipping is free on every order/);
  assert.match(shipping.content_en, /1–3 business days/);
  assert.match(shipping.content_en, /other EU countries:\*\* A shipping charge applies/);
  assert.match(shipping.content_en, /3–7 business days/);
  assert.match(shipping.content_de, /Tschechischen Republik:\*\* Der Versand ist bei jeder Bestellung kostenlos/);
  assert.match(shipping.content_de, /1–3 Werktage/);
  assert.match(shipping.content_de, /andere EU-Länder:\*\* Für den Versand fallen Kosten an/);
  assert.match(shipping.content_de, /3–7 Werktage/);
});
