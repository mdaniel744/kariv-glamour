export const MAX_IMAGE_BYTES = 20 * 1024 * 1024;
export const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024;
export const MAX_IMAGE_PIXELS = 60_000_000;

export const IMAGE_PURPOSES = new Set([
  'product',
  'brand-logo',
  'brand-hero',
  'collection',
  'profile-logo',
  'profile-banner',
  'payment-proof',
  'catalog',
]);

export const IMAGE_VARIANT_SPECS = Object.freeze([
  { name: 'thumb', width: 320, height: 320, quality: 76 },
  { name: 'card', width: 700, height: 900, quality: 82 },
  { name: 'display', width: 1400, height: 1800, quality: 88 },
  { name: 'zoom', width: 2400, height: 3000, quality: 92 },
  { name: 'master', width: 4096, height: 4096, quality: 96 },
]);

const FORMAT_MIMES = Object.freeze({
  jpeg: new Set(['image/jpeg', 'image/jpg']),
  png: new Set(['image/png']),
  webp: new Set(['image/webp']),
  gif: new Set(['image/gif']),
  avif: new Set(['image/avif', 'image/heif', 'image/heic']),
  heif: new Set(['image/avif', 'image/heif', 'image/heic']),
});

export function normalizeMediaPurpose(value) {
  return IMAGE_PURPOSES.has(value) ? value : 'catalog';
}

export function isDeclaredMimeCompatible(format, mime) {
  return Boolean(FORMAT_MIMES[format]?.has(mime));
}

export function validateImageMetadata(metadata, purpose = 'catalog') {
  if (!metadata?.format || !FORMAT_MIMES[metadata.format]) {
    return 'The file is not a supported JPG, PNG, WebP, GIF, or AVIF image.';
  }
  if (!metadata.width || !metadata.height) return 'The image dimensions could not be read.';
  if (metadata.width * metadata.height > MAX_IMAGE_PIXELS) {
    return 'The image is too large to process safely. Please use an image under 60 megapixels.';
  }
  if (metadata.pages > 1) return 'Animated images are not supported for catalogue media.';
  if (purpose === 'product' && (metadata.width < 400 || metadata.height < 400)) {
    return 'Product photos must be at least 400 × 400 pixels.';
  }
  return null;
}
