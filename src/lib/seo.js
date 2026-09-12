export const SITE_NAME = 'Kariv Glamour';
export const SUPPORTED_LOCALES = ['de', 'en'];
export const DEFAULT_LOCALE = 'de';
// Public identity is deliberately independent of preview hosts and obsolete
// deployment environment values. The owner selected 24kariv.com.
export const CANONICAL_SITE_URL = 'https://24kariv.com';

export function getSiteUrl() {
  return CANONICAL_SITE_URL;
}

export function localizedField(record, fieldName, locale = DEFAULT_LOCALE) {
  if (!record) return '';
  const otherLocale = locale === 'de' ? 'en' : 'de';
  return record[`${fieldName}_${locale}`] || record[fieldName] || record[`${fieldName}_${otherLocale}`] || '';
}

export function localizedArray(record, fieldName, locale = DEFAULT_LOCALE) {
  const value = localizedField(record, fieldName, locale);
  return Array.isArray(value) ? value : [];
}

export function localeAlternates(pathWithoutLocale = '') {
  const cleanPath = pathWithoutLocale ? `/${String(pathWithoutLocale).replace(/^\/+/, '')}` : '';
  return {
    de: `/de${cleanPath}`,
    en: `/en${cleanPath}`,
    'x-default': `/de${cleanPath}`,
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
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: locale === 'de' ? ['en_US'] : ['de_DE'],
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
