import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('authenticity guidance is complete and consistent in all three languages', () => {
  const required = [
    'heroDesc', 's1Title', 's1Desc', 'sellerChecksTitle', 's2Title', 's2Desc', 's3Title', 's3Desc',
    's4Title', 's4Desc', 's5Title', 's5Desc', 'noFakesTitle', 'noFakesDesc',
    'independenceTitle', 'independenceDesc', 'purchaseTitle', 'purchaseDesc',
    'operatorTitle', 'operatorIntro', 'companyDetailsLink', 'returnsLink', 'privacyLink',
  ];

  for (const locale of ['en', 'de', 'cs']) {
    const page = JSON.parse(read(`src/locales/${locale}/common.json`)).pages.authentication;
    for (const key of required) assert.ok(page[key]?.trim(), `${locale}: missing ${key}`);
    assert.match(page.heroDesc, /24kariv\.com/);
    assert.doesNotMatch(JSON.stringify(page), /fragrance|beauty industry|100% authenticity|every watch is physically authenticated/i);
  }
});

test('authenticity page points to company, return, privacy and contact information', () => {
  const source = read('src/page-content/Authentication.jsx');
  assert.match(source, /COMPANY_DETAILS\.legalName/);
  assert.match(source, /COMPANY_DETAILS\.registeredAddress/);
  assert.match(source, /COMPANY_DETAILS\.email/);
  for (const path of ['/legal/impressum', '/legal/returns-refund-policy', '/legal/privacy-policy', '/customer-service']) {
    assert.ok(source.includes(`to="${path}"`), `missing ${path}`);
  }
});

test('seller checks are explained without treating ownership as watch authentication', () => {
  const en = JSON.parse(read('src/locales/en/common.json')).pages.authentication;
  assert.match(en.s2Desc, /verify business dealers/i);
  assert.match(en.s2Desc, /guarantee the authenticity/i);
  assert.match(en.s3Desc, /proof of ownership/i);
  assert.match(en.s3Desc, /does not, by itself, prove its authenticity/i);
  const disclaimer = read('src/page-content/LegalPage.jsx');
  assert.match(disclaimer, /slug === 'authenticity-disclaimer'/);
  assert.match(disclaimer, /pages\.authentication\.sellerChecksTitle/);
  assert.match(disclaimer, /pages\.authentication\.s2Desc/);
  assert.match(disclaimer, /pages\.authentication\.s3Desc/);
});

test('footer links to authenticity guidance and the supplied social profiles', () => {
  const footer = read('src/components/layout/Footer.jsx');
  assert.match(footer, /to="\/authentication"/);
  assert.match(footer, /to="\/legal\/brand-disclaimer"/);
  assert.match(footer, /footer\.authenticityStatement/);
  assert.match(footer, /https:\/\/www\.instagram\.com\/karivglamour\//);
  assert.match(footer, /https:\/\/www\.facebook\.com\/people\/Kariv-Glamour\/100063754812707\//);
  for (const locale of ['en', 'de', 'cs']) {
    const navigation = JSON.parse(read(`src/locales/${locale}/navigation.json`));
    assert.ok(navigation.footer.independenceDisclaimer);
    assert.ok(navigation.footer.authenticityStatement);
    assert.ok(navigation.footer.authenticityStandards);
    assert.ok(navigation.footer.followUs);
    assert.doesNotMatch(navigation.footer.authenticityStatement, /100%/);
  }
});
