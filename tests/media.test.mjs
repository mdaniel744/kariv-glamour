import test from 'node:test';
import assert from 'node:assert/strict';
import { canOptimizeMedia, getMediaVariant, mediaFileName } from '../src/lib/media.js';
import {
  isDeclaredMimeCompatible,
  normalizeMediaPurpose,
  validateImageMetadata,
} from '../src/lib/mediaPolicy.js';

test('only configured image origins use the Next.js optimizer', () => {
  assert.equal(canOptimizeMedia('/media/watch.webp'), true);
  assert.equal(canOptimizeMedia('https://media.base44.com/images/watch.jpg'), true);
  assert.equal(canOptimizeMedia('https://example.supabase.co/storage/v1/object/public/store-images/watch.webp'), true);
  assert.equal(canOptimizeMedia('https://untrusted.example/watch.jpg'), false);
  assert.equal(canOptimizeMedia('data:image/png;base64,abc'), false);
});

test('seller derivative URLs switch variants without dropping query parameters', () => {
  const display = 'https://example.supabase.co/storage/v1/object/public/store-images/user/media/id/display.webp?token=abc';
  assert.equal(
    getMediaVariant(display, 'card'),
    'https://example.supabase.co/storage/v1/object/public/store-images/user/media/id/card.webp?token=abc',
  );
  assert.equal(getMediaVariant('/uploads/legacy-watch.jpg', 'thumb'), '/uploads/legacy-watch.jpg');
  assert.equal(mediaFileName(display), 'display.webp');
});

test('upload policy validates signatures, dimensions, animation, and purpose', () => {
  assert.equal(isDeclaredMimeCompatible('jpeg', 'image/jpeg'), true);
  assert.equal(isDeclaredMimeCompatible('png', 'image/jpeg'), false);
  assert.equal(normalizeMediaPurpose('product'), 'product');
  assert.equal(normalizeMediaPurpose('unexpected'), 'catalog');
  assert.match(
    validateImageMetadata({ format: 'jpeg', width: 300, height: 900 }, 'product'),
    /400 × 400/,
  );
  assert.match(
    validateImageMetadata({ format: 'gif', width: 900, height: 900, pages: 2 }, 'catalog'),
    /Animated/,
  );
  assert.equal(validateImageMetadata({ format: 'webp', width: 2400, height: 2400 }, 'product'), null);
});
