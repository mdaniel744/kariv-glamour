import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { getSiteUrl } from '@/lib/seo';

const SITE_NAME = 'Kariv Glamour';
const LOCALE_FULL = { de: 'de_DE', en: 'en_US' };

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href, hreflang) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ''}`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  if (!data) return;
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

/**
 * Centralized SEO hook for locale-aware meta tags, hreflang alternates,
 * canonical URLs, Open Graph, Twitter Cards, and JSON-LD structured data.
 *
 * @param {Object} opts
 * @param {string} opts.title - Page title (already localized)
 * @param {string} opts.description - Meta description (already localized)
 * @param {string} [opts.image] - OG image URL
 * @param {string} [opts.type] - OG type (website, product, article)
 * @param {Object|Array} [opts.jsonLd] - JSON-LD structured data
 * @param {boolean} [opts.noindex] - If true, add noindex robots directive
 */
export function useSEO({ title, description, image, type = 'website', jsonLd, noindex = false }) {
  const { locale } = useLanguage();
  const [pathname, setPathname] = useState(() => (typeof window === 'undefined' ? `/${locale}` : window.location.pathname));

  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', syncPathname);
    window.addEventListener('kariv:urlchange', syncPathname);
    return () => {
      window.removeEventListener('popstate', syncPathname);
      window.removeEventListener('kariv:urlchange', syncPathname);
    };
  }, []);

  useEffect(() => {
    // Native App Router pages provide complete server-rendered metadata.
    // Keep this hook only for routes still served by the legacy SPA fallback.
    if (document.body.dataset.nextNative === 'true') return;

    const origin = getSiteUrl();
    const currentUrl = origin + pathname;

    // Build hreflang alternate URLs by swapping the locale segment
    const otherLocale = locale === 'de' ? 'en' : 'de';
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && (segments[0] === 'de' || segments[0] === 'en')) {
      segments[0] = otherLocale;
    }
    const altPath = '/' + segments.join('/');
    const altUrl = origin + altPath;

    // Title
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — ${locale === 'de' ? 'Authentische Luxusuhren' : 'Authenticated Luxury Watches'}`;
    document.title = fullTitle;

    // Description
    upsertMeta('name', 'description', description);

    // Robots
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Canonical — points to the current locale version
    upsertLink('canonical', currentUrl);

    // hreflang alternates
    upsertLink('alternate', currentUrl, locale);
    upsertLink('alternate', altUrl, otherLocale);
    upsertLink('alternate', origin + altPath.replace(`/${otherLocale}`, ''), 'x-default');

    // Open Graph
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', currentUrl);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', LOCALE_FULL[locale]);
    upsertMeta('property', 'og:locale:alternate', LOCALE_FULL[otherLocale]);
    if (image) upsertMeta('property', 'og:image', image);

    // Twitter Card
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    if (image) upsertMeta('name', 'twitter:image', image);

    // JSON-LD
    if (jsonLd) {
      upsertJsonLd('seo-jsonld', jsonLd);
    } else {
      removeJsonLd('seo-jsonld');
    }

    return () => {
      removeJsonLd('seo-jsonld');
    };
  }, [title, description, image, type, jsonLd, noindex, locale, pathname]);
}
