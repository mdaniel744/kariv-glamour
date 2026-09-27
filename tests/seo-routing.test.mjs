import test from 'node:test';
import assert from 'node:assert/strict';
import { isSignedInPath, preferredHostUrl } from '../src/lib/publicRoutes.js';
import { shopCardProduct } from '../src/lib/shopCardProduct.js';
import { matchesBrandIdentity } from '../src/lib/seoProductIdentity.js';
import { brandCatalogProduct } from '../src/lib/brandCatalogProduct.js';
import { readFileSync } from 'node:fs';

test('only whole private route segments require sign-in', () => {
  for (const locale of ['en', 'de', 'cs']) {
    for (const section of ['portal', 'cart', 'wishlist', 'checkout']) {
      assert.equal(isSignedInPath(`/${locale}/${section}`), true);
      assert.equal(isSignedInPath(`/${locale}/${section}/example`), true);
    }
    assert.equal(isSignedInPath(`/${locale}/cartier-panthere-kaufen`), false);
    assert.equal(isSignedInPath(`/${locale}/cartier/tank-francaise`), false);
    assert.equal(isSignedInPath(`/${locale}/brands/cartier`), false);
    assert.equal(isSignedInPath(`/${locale}/cartography`), false);
  }
  assert.equal(isSignedInPath('/cart'), false);
});

test('www host redirects to the preferred HTTPS host without losing path or query', () => {
  assert.equal(
    preferredHostUrl('https://www.24kariv.com/cs/brands/rolex?sort=price').href,
    'https://24kariv.com/cs/brands/rolex?sort=price',
  );
  assert.equal(
    preferredHostUrl('http://localhost:5511/en/shop?page=2', 'www.24kariv.com').href,
    'https://24kariv.com/en/shop?page=2',
  );
  assert.equal(preferredHostUrl('https://24kariv.com/en/shop'), null);
  assert.equal(preferredHostUrl('http://localhost:5511/en/shop', 'localhost:5511'), null);
  assert.equal(
    preferredHostUrl('http://localhost:5511/sitemap.xml', 'www.24kariv.com').href,
    'https://24kariv.com/sitemap.xml',
  );
  const middleware = readFileSync(new URL('../middleware.js', import.meta.url), 'utf8');
  assert.match(middleware, /'\/robots\.txt', '\/sitemap\.xml'/);
});

test('server-rendered shop cards retain visible details without serializing descriptions', () => {
  const card = shopCardProduct({
    id: 'watch-1',
    slug: 'rolex-submariner',
    productTitle: 'Rolex Submariner',
    productTitle_de: 'Rolex Submariner Uhr',
    featuredImage: '/watch.jpg',
    productImages: ['/watch.jpg', '/watch-side.jpg'],
    price: 9500,
    currency: 'EUR',
    productDescription: 'A long English description',
    productDescription_de: 'Eine lange deutsche Beschreibung',
  });
  assert.equal(card.slug, 'rolex-submariner');
  assert.equal(card.productTitle_de, 'Rolex Submariner Uhr');
  assert.deepEqual(card.productImages, ['/watch.jpg', '/watch-side.jpg']);
  assert.equal(card.price, 9500);
  assert.equal(card.productDescription, undefined);
  assert.equal(card.productDescription_de, undefined);
});

test('related product links reject legacy watches assigned to the wrong brand', () => {
  assert.equal(matchesBrandIdentity({ productTitle: 'Breitling Top Time', slug: 'breitling-top-time' }, 'Audemars Piguet'), false);
  assert.equal(matchesBrandIdentity({ productTitle: 'Audemars Piguet Royal Oak', slug: 'audemars-piguet-royal-oak' }, 'Audemars Piguet'), true);
  assert.equal(matchesBrandIdentity({ productTitle: 'IWC Portugieser' }, 'IWC Schaffhausen'), true);
  assert.equal(matchesBrandIdentity({ productTitle: 'Bulgari Serpenti' }, 'Bvlgari'), true);
});

test('brand catalog keeps filters and galleries while omitting unused long copy', () => {
  const original = {
    id: 'watch-2', brand: 'Rolex', collection: 'Submariner',
    caseMaterial: 'Steel', productImages: ['/front.jpg', '/back.jpg'],
    productDescription: 'Long product-page copy', imageDescriptions: ['Front', 'Back'],
  };
  const summary = brandCatalogProduct(original);
  assert.equal(summary.caseMaterial, 'Steel');
  assert.deepEqual(summary.productImages, ['/front.jpg', '/back.jpg']);
  assert.equal(summary.productDescription, undefined);
  assert.equal(summary.imageDescriptions, undefined);
  assert.equal(original.productDescription, 'Long product-page copy');
});
