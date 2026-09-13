import { useLanguage } from '@/lib/languageContext';
import { localizedValue } from '@/lib/locales';

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
    return localizedValue(record, fieldName, locale);
  };

  const localizeArray = (record, fieldName) => {
    if (!record) return [];
    return localizedValue(record, fieldName, locale, []);
  };

  return { locale, localize, localizeArray };
}
