import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { HOME_CATEGORY_LINKS, HOME_MODEL_LINKS } from '../src/lib/homeShopLinks.js';
import nextConfig from '../next.config.mjs';

test('homepage watch tiles use compact transparent media without losing their links', async () => {
  const localImages = [
    ...HOME_CATEGORY_LINKS.map((item) => item.image),
    ...HOME_MODEL_LINKS.map((item) => item.image),
    '/media/home/rolex-submariner.webp',
  ].filter((image) => image.startsWith('/media/home/'));

  assert.equal(HOME_CATEGORY_LINKS.length, 8);
  assert.equal(HOME_MODEL_LINKS.length, 8);

  for (const image of new Set(localImages)) {
    const bytes = readFileSync(new URL(`../public${image}`, import.meta.url));
    const metadata = await sharp(bytes).metadata();
    assert.equal(metadata.format, 'webp', image);
    assert.ok(bytes.length < 40_000, `${image} is too large for a home tile`);
  }
});

test('root language redirect is resolved before authentication middleware', async () => {
  assert.deepEqual(await nextConfig.redirects(), [
    { source: '/', destination: '/de', permanent: true },
  ]);
});

test('home artwork uses responsive images and prioritizes the hero watch', () => {
  const hero = readFileSync(new URL('../src/components/home/HeroSection.jsx', import.meta.url), 'utf8');
  const categories = readFileSync(new URL('../src/components/home/CategoryGrid.jsx', import.meta.url), 'utf8');
  const models = readFileSync(new URL('../src/components/home/PopularModels.jsx', import.meta.url), 'utf8');
  const logo = readFileSync(new URL('../src/components/shared/KarivLogo.jsx', import.meta.url), 'utf8');

  assert.match(hero, /rolex-submariner\.webp[^\n]*priority fetchPriority="high"/);
  for (const component of [hero, categories, models, logo]) {
    assert.doesNotMatch(component, /\bunoptimized\b/);
  }
});

test('product cards render only the first gallery image before interaction', () => {
  const card = readFileSync(new URL('../src/components/shared/ProductCard.jsx', import.meta.url), 'utf8');
  assert.match(card, /const \[galleryActivated, setGalleryActivated\] = useState\(false\)/);
  assert.match(card, /index === activeImage \|\| \(galleryActivated && Math\.abs\(index - activeImage\) <= 1\)/);
  assert.match(card, /onPointerDown=\{handlePointerDown\}/);
});
