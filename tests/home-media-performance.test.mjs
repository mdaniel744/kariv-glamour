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
