import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { COMPANY_DETAILS } from '../src/lib/companyDetails.js';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('customer service uses the existing company identity without placeholder contact promises', () => {
  const source = read('src/page-content/CustomerService.jsx');
  assert.equal(COMPANY_DETAILS.email, 'info@24kariv.com');
  for (const field of ['email', 'registeredAddress', 'legalName']) {
    assert.ok(source.includes(`COMPANY_DETAILS.${field}`));
  }
  assert.doesNotMatch(source, /123 456 789|service@kariv-glamour\.com|Deutschland|Mo–Fr 9–18|emailSub|phoneSub|hoursSub/);
});

test('contact form sends through the server and only confirms an accepted submission', () => {
  const source = read('src/page-content/CustomerService.jsx');
  const route = read('app/api/contact/route.js');
  assert.match(source, /fetch\('\/api\/contact'/);
  assert.match(source, /if \(!response\.ok\) throw/);
  assert.match(source, /formStatus === 'sent'/);
  assert.match(source, /formStatus === 'error'/);
  assert.match(source, /disabled=\{formStatus === 'sending'\}/);
  assert.match(source, /role="status"/);
  assert.doesNotMatch(source, /window\.location\.assign|draftUrl|Open email draft/);
  assert.match(read('src/lib/contactEmail.js'), /to: COMPANY_DETAILS\.email/);
  assert.match(route, /process\.env\.SMTP_HOST/);
  assert.match(route, /process\.env\.CONTACT_FROM_EMAIL/);
  for (const field of ['name', 'email', 'subject', 'message']) {
    assert.ok(source.includes(`name="${field}"`));
  }
  assert.ok((source.match(/<label\b/g) || []).length >= 4);
  assert.match(source, /contactCopy\.emailFallback/);
  assert.match(source, /\/legal\/returns-refund-policy/);
});

test('footer links to the supplied social profiles without placeholder destinations', () => {
  const source = read('src/components/layout/Footer.jsx');
  assert.doesNotMatch(source, /href="#"|social\.slice/);
  assert.match(source, /https:\/\/www\.instagram\.com\/karivglamour\//);
  assert.match(source, /https:\/\/www\.facebook\.com\/people\/Kariv-Glamour\/100063754812707\//);
  assert.match(source, /target="_blank" rel="noopener noreferrer"/);
  for (const locale of ['en', 'de', 'cs']) {
    const navigation = JSON.parse(read(`src/locales/${locale}/navigation.json`));
    assert.ok(navigation.footer.followUs);
  }
});

test('footer carries the independent-marketplace disclaimer in every language', () => {
  const footer = read('src/components/layout/Footer.jsx');
  assert.match(footer, /footer\.independenceDisclaimer/);
  assert.match(footer, /to="\/legal\/brand-disclaimer"/);
  assert.match(footer, /to="\/authentication"/);
  assert.match(footer, /footer\.authenticityStatement/);
  assert.match(footer, /footer\.authenticityStandards/);
  for (const locale of ['en', 'de', 'cs']) {
    const navigation = JSON.parse(read(`src/locales/${locale}/navigation.json`));
    const disclaimer = navigation.footer.independenceDisclaimer;
    assert.ok(navigation.footer.disclaimerLabel);
    assert.match(disclaimer, /24kariv\.com/);
    assert.match(disclaimer, /Kariv Glamour s\.r\.o\./);
    assert.doesNotMatch(disclaimer, /certified|100% authentic/i);
    assert.ok(navigation.footer.authenticityStatement);
    assert.ok(navigation.footer.authenticityStandards);
    assert.doesNotMatch(navigation.footer.authenticityStatement, /100%/);
  }
  const en = JSON.parse(read('src/locales/en/navigation.json'));
  assert.match(en.footer.authenticityStatement, /Business dealers are verified/);
  assert.match(en.footer.authenticityStatement, /guarantee the authenticity/);
  assert.match(en.footer.authenticityStatement, /private sellers' proof of ownership/);
});

test('global navigation and trust strip direct shoppers to details without guaranteeing every listing', () => {
  for (const locale of ['en', 'de']) {
    const navigation = JSON.parse(read(`src/locales/${locale}/navigation.json`));
    const common = JSON.parse(read(`src/locales/${locale}/common.json`));
    assert.doesNotMatch(navigation.topBar, /Authenticated|Authentifiziert|Worldwide|Weltweit/);
    assert.doesNotMatch(JSON.stringify(common.components.trustBar), /fully insured|vollversichert|Verified by watchmakers|Geprüft von Uhrmachern/);
  }
  const source = read('src/components/shared/TrustBar.jsx');
  assert.match(source, /to: '\/authentication'/);
  assert.match(source, /to: '\/legal\/shipping-policy'/);
  assert.match(source, /<LocalizedLink/);
});
