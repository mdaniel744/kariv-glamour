import 'server-only';
import { Products } from './supabaseData.js';
import { productSlug } from './slug.js';
import { localizedField } from './seo.js';
import { matchesBrandIdentity } from './seoProductIdentity.js';

export async function getSeoProductLinks(brand, filters, locale, limit = 4) {
  if (!brand) return [];
  try {
    const products = await Products.filter(
      { brand, isPublished: true, ...filters },
      '-created_date',
      30,
      0,
      locale,
    );
    return products.filter((product) => matchesBrandIdentity(product, brand)).slice(0, limit).map((product) => ({
      slug: productSlug(product),
      title: localizedField(product, 'productTitle', locale),
    })).filter((product) => product.slug && product.title);
  } catch (error) {
    console.error('Unable to load SEO page product links:', error);
    return [];
  }
}
