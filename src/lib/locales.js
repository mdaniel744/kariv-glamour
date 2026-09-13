// Language tags use ISO 639-1: Czech is `cs`; CZ is the country code.
export const SUPPORTED_LOCALES = ['de', 'en', 'cs'];
export const DEFAULT_LOCALE = 'de';
export const PRODUCT_SOURCE_LOCALE = 'en';
export const LOCALE_TAGS = { de: 'de-DE', en: 'en-GB', cs: 'cs-CZ' };
export const OPEN_GRAPH_LOCALES = { de: 'de_DE', en: 'en_US', cs: 'cs_CZ' };

export function normalizeLocale(value, fallback = DEFAULT_LOCALE) {
  const locale = String(value || '').trim().toLowerCase().split(/[-_]/)[0];
  return SUPPORTED_LOCALES.includes(locale) ? locale : fallback;
}

export function localizedValue(record, fieldName, locale = DEFAULT_LOCALE, fallback = '') {
  if (!record) return fallback;
  const selected = normalizeLocale(locale);
  return record[`${fieldName}_${selected}`] || record[fieldName]
    || record[`${fieldName}_en`] || record[`${fieldName}_de`] || record[`${fieldName}_cs`] || fallback;
}
