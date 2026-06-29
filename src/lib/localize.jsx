import { useLanguage } from '@/lib/languageContext';

/**
 * Hook that provides a helper function to get the localized value
 * of a field from an entity record.
 *
 * Usage:
 *   const { localize } = useLocalizedField();
 *   localize(product, 'productTitle')       // → product.productTitle_de (or _en)
 *   localize(product, 'productDescription') // → product.productDescription_de
 *
 * Falls back to the base field (without suffix) if the localized
 * version is empty/null, then to the other language, then to ''.
 */
export function useLocalizedField() {
  const { locale } = useLanguage();

  const localize = (record, fieldName) => {
    if (!record) return '';
    const localizedKey = `${fieldName}_${locale}`;
    const otherKey = `${fieldName}_${locale === 'de' ? 'en' : 'de'}`;
    return record[localizedKey] || record[fieldName] || record[otherKey] || '';
  };

  const localizeArray = (record, fieldName) => {
    if (!record) return [];
    const localizedKey = `${fieldName}_${locale}`;
    const otherKey = `${fieldName}_${locale === 'de' ? 'en' : 'de'}`;
    return record[localizedKey] || record[fieldName] || record[otherKey] || [];
  };

  return { locale, localize, localizeArray };
}