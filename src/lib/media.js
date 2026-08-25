const SUPABASE_HOST_SUFFIX = '.supabase.co';
const OPTIMIZABLE_HOSTS = new Set([
  'media.base44.com',
  'images.unsplash.com',
]);

export const MEDIA_VARIANTS = Object.freeze({
  thumb: 'thumb.webp',
  card: 'card.webp',
  display: 'display.webp',
  zoom: 'zoom.webp',
  master: 'master.webp',
});

export function canOptimizeMedia(src) {
  if (!src || typeof src !== 'string') return false;
  if (src.startsWith('/')) return true;

  try {
    const { protocol, hostname } = new URL(src);
    return (
      (protocol === 'https:' || protocol === 'http:') &&
      (OPTIMIZABLE_HOSTS.has(hostname) || hostname.endsWith(SUPABASE_HOST_SUFFIX))
    );
  } catch {
    return false;
  }
}

export function getMediaVariant(src, variant = 'display') {
  const filename = MEDIA_VARIANTS[variant];
  if (!src || !filename || typeof src !== 'string') return src;

  const replacePath = (pathname) => {
    if (!/\/(thumb|card|display|zoom|master)\.webp$/i.test(pathname)) return pathname;
    return pathname.replace(/\/(thumb|card|display|zoom|master)\.webp$/i, `/${filename}`);
  };

  if (src.startsWith('/')) return replacePath(src);

  try {
    const url = new URL(src);
    url.pathname = replacePath(url.pathname);
    return url.toString();
  } catch {
    return src;
  }
}

export function mediaFileName(src) {
  if (!src || typeof src !== 'string') return '';
  try {
    const url = src.startsWith('/') ? new URL(src, 'https://kariv.local') : new URL(src);
    return decodeURIComponent(url.pathname.split('/').filter(Boolean).at(-1) || '');
  } catch {
    return '';
  }
}
