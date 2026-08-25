import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

test('critical catalogue surfaces do not render original product images directly', async () => {
  const productCard = await fs.readFile(new URL('../src/components/shared/ProductCard.jsx', import.meta.url), 'utf8');
  const productGallery = await fs.readFile(new URL('../src/components/product/ProductGallery.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(productCard, /<img\b/);
  assert.doesNotMatch(productGallery, /<img\b/);
  assert.match(productCard, /getMediaVariant\(product\.featuredImage, 'card'\)/);
  assert.match(productGallery, /getMediaVariant\(image, 'display'\)/);
  assert.match(productGallery, /getMediaVariant\(imageList\[selected\], 'zoom'\)/);
});

test('image configuration keeps remote origins restrictive and modern formats enabled', async () => {
  const config = await fs.readFile(new URL('../next.config.mjs', import.meta.url), 'utf8');
  assert.match(config, /formats: \['image\/avif', 'image\/webp'\]/);
  assert.match(config, /hostname: '\*\*\.supabase\.co'/);
  assert.doesNotMatch(config, /hostname: '\*'/);
});
