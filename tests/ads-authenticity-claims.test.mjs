import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

for (const locale of ['en', 'de', 'cs']) {
  test(`${locale} storefront distinguishes listing review from physical authentication`, () => {
    const copy = JSON.parse(read(`src/locales/${locale}/common.json`));
    const product = copy.pages.productDetail;

    assert.ok(product.guarantee1Reviewed);
    assert.ok(product.guarantee1Pending);
    assert.notEqual(product.guarantee1Reviewed, product.guarantee1);
    assert.notEqual(product.guarantee1Reviewed, product.guarantee1Pending);
    assert.ok(copy.pages.authentication.heroDesc);
    assert.ok(copy.pages.checkout.bpAuth);
    assert.doesNotMatch(copy.pages.checkout.buyerProtectionDesc, /guarantee of authenticity|Garantie der Authentizität|záruka pravosti/i);
  });
}

test('brand pages identify the independent marketplace without claiming the manufacturer URL', () => {
  const brandRoute = read('app/[locale]/brands/[slug]/page.jsx');
  const hero = read('src/components/shared/BrandHero.jsx');

  assert.doesNotMatch(brandRoute, /'@type': 'Brand'/);
  assert.match(hero, /hero\.independent/);
  for (const locale of ['en', 'de', 'cs']) {
    const copy = JSON.parse(read(`src/locales/${locale}/brandComponents.json`));
    assert.match(copy.hero.independent, /\{\{brand\}\}/);
  }
});

test('product detail displays the reviewed-only wording for Verified listings', () => {
  const detail = read('src/page-content/ProductDetail.jsx');
  assert.match(detail, /authenticationStatus === 'Verified'/);
  assert.match(detail, /guarantee1Reviewed/);
});
