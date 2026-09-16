import { localizedField } from './seo.js';
import { merchantPlainText } from './productMerchant.js';

// Search indexing is distinct from Merchant offer eligibility. A published
// watch page can provide useful titles/specifications without a prose
// description. Do not exclude it just because no description was ever saved.
// If a description IS displayed through a language fallback, however, require
// its Czech translation before advertising the Czech URL to search engines.
export function isProductIndexable(product, locale) {
  if (product?.isPublished !== true) return false;
  if (locale !== 'cs') return true;
  if (!merchantPlainText(product.productTitle_cs)) return false;

  const displayedDescription = merchantPlainText(localizedField(product, 'productDescription', locale));
  return !displayedDescription || Boolean(merchantPlainText(product.productDescription_cs));
}
