import { SUPPORTED_LOCALES } from './locales.js';

const SIGNED_IN_SECTIONS = new Set(['portal', 'cart', 'wishlist', 'checkout']);

// Match whole path segments. A prefix match for "cart" also catches public
// Cartier pages and redirects search crawlers to the noindexed login page.
export function isSignedInPath(pathname) {
  const [locale, section] = String(pathname || '').split('/').filter(Boolean);
  return SUPPORTED_LOCALES.includes(locale) && SIGNED_IN_SECTIONS.has(section);
}

export function preferredHostUrl(requestUrl, hostHeader) {
  const requestHost = new URL(requestUrl).hostname.toLowerCase();
  const headerHost = String(hostHeader || '').split(':')[0].toLowerCase();
  if (requestHost !== 'www.24kariv.com' && headerHost !== 'www.24kariv.com') return null;

  const target = new URL(requestUrl);
  target.protocol = 'https:';
  target.hostname = '24kariv.com';
  target.port = '';
  return target;
}
