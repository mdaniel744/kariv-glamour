import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { COMPANY_DETAILS } from '../src/lib/companyDetails.js';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('customer service uses the existing company identity without placeholder contact promises', () => {
  const source = read('src/page-content/CustomerService.jsx');
  assert.equal(COMPANY_DETAILS.email, 'info@karivglamour.com');
  for (const field of ['email', 'registeredAddress', 'legalName']) {
    assert.ok(source.includes(`COMPANY_DETAILS.${field}`));
  }
  assert.doesNotMatch(source, /123 456 789|service@kariv-glamour\.com|Deutschland|Mo–Fr 9–18|emailSub|phoneSub|hoursSub/);
});

test('contact form opens an encoded email draft and never claims delivery', () => {
  const source = read('src/page-content/CustomerService.jsx');
  assert.match(source, /mailto:\$\{COMPANY_DETAILS\.email\}\?subject=\$\{encodeURIComponent\(formData\.subject\)\}&body=\$\{encodeURIComponent\(body\)\}/);
  assert.match(source, /window\.location\.assign\(draftUrl\)/);
  assert.match(source, /Your message has not been sent yet/);
  assert.match(source, /Ihre Nachricht wurde noch nicht gesendet/);
  assert.match(source, /role="status"/);
  assert.doesNotMatch(source, /setSubmitted|formSuccess/);
  for (const field of ['name', 'email', 'subject', 'message']) {
    assert.ok(source.includes(`name="${field}"`));
  }
  assert.ok((source.match(/<label\b/g) || []).length >= 4);
  assert.match(source, /contactCopy\.emailFallback/);
});

test('footer does not offer fabricated social destinations', () => {
  assert.doesNotMatch(read('src/components/layout/Footer.jsx'), /href="#"|social\.slice/);
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
