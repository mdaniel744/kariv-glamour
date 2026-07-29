import enCommon from '@/locales/en/common.json';
import deCommon from '@/locales/de/common.json';
import { localizedMetadata } from '@/lib/seo';

const DICTIONARIES = { de: deCommon, en: enCommon };

export function publicPageMetadata(locale, seoKey, path, index = true) {
  const dictionary = DICTIONARIES[locale] || DICTIONARIES.de;
  const seo = dictionary.seo?.[seoKey] || {};

  return localizedMetadata({
    locale,
    path,
    title: seo.title,
    description: seo.description,
    index,
  });
}
