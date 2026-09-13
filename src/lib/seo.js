import { DEFAULT_LOCALE, SUPPORTED_LOCALES, OPEN_GRAPH_LOCALES, localizedValue } from './locales.js';
export { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './locales.js';
export const SITE_NAME = 'Kariv Glamour';
// Public identity is deliberately independent of preview hosts and obsolete
// deployment environment values. The owner selected 24kariv.com.
export const CANONICAL_SITE_URL = 'https://24kariv.com';

export function getSiteUrl() {
  return CANONICAL_SITE_URL;
}

export function localizedField(record, fieldName, locale = DEFAULT_LOCALE) {
  if (!record) return '';
  return localizedValue(record, fieldName, locale);
}

export function localizedArray(record, fieldName, locale = DEFAULT_LOCALE) {
  const value = localizedField(record, fieldName, locale);
  return Array.isArray(value) ? value : [];
}

export function localeAlternates(pathWithoutLocale = '') {
  const cleanPath = pathWithoutLocale ? `/${String(pathWithoutLocale).replace(/^\/+/, '')}` : '';
  return {
    ...Object.fromEntries(SUPPORTED_LOCALES.map((locale) => [locale, `/${locale}${cleanPath}`])),
    'x-default': `/${DEFAULT_LOCALE}${cleanPath}`,
  };
}

export function localizedMetadata({
  locale,
  path,
  title,
  description,
  image,
  type = 'website',
  index = true,
}) {
  const canonical = `/${locale}${path ? `/${String(path).replace(/^\/+/, '')}` : ''}`;
  const images = image ? [{ url: image }] : undefined;
  const documentTitle = typeof title === 'string' && title.toLowerCase().includes(SITE_NAME.toLowerCase())
    ? { absolute: title }
    : title;

  return {
    title: documentTitle,
    description,
    alternates: {
      canonical,
      languages: localeAlternates(path),
    },
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title,
      description,
      type,
      siteName: SITE_NAME,
      locale: OPEN_GRAPH_LOCALES[locale],
      alternateLocale: SUPPORTED_LOCALES.filter((other) => other !== locale).map((other) => OPEN_GRAPH_LOCALES[other]),
      url: canonical,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function safeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
