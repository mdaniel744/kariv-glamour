import 'server-only';
import { productSlug } from '@/lib/slug';
import { Products, Brands, Collections, LegalPages } from '@/lib/supabaseData';

export async function getProductById(id) {
  if (!id) return null;
  try {
    return await Products.get(id);
  } catch (error) {
    console.error('Unable to load product from Supabase:', error?.message || error);
    return null;
  }
}

export async function getProductBySlug(slug) {
  if (!slug) return null;
  try {
    const exactMatches = await Products.filter({ slug }, '-created_date', 1, 0);
    if (exactMatches[0]) return exactMatches[0];

    // Fallback to a title-derived slug match for any product still missing
    // a real `slug` value (should be rare now that Supabase is the source).
    const products = await getPublishedProducts();
    return products.find((p) => productSlug(p) === slug) || null;
  } catch (error) {
    console.error('Unable to load product by slug from Supabase:', error?.message || error);
    return null;
  }
}

export async function getRelatedProducts(product, limit = 4) {
  if (!product?.brand) return [];
  try {
    const records = await Products.filter({ brand: product.brand }, '-created_date', limit + 1, 0);
    return records.filter((record) => record.id !== product.id).slice(0, limit);
  } catch (error) {
    console.error('Unable to load related products from Supabase:', error?.message || error);
    return [];
  }
}

export async function getBrands(limit = 100) {
  try {
    return await Brands.list('brandName', limit, 0);
  } catch (error) {
    console.error('Unable to load brands from Supabase:', error?.message || error);
    return [];
  }
}

export async function getBrandBySlug(slug) {
  if (!slug) return null;
  try {
    const records = await Brands.filter({ slug }, '-created_date', 1, 0);
    return records[0] || null;
  } catch (error) {
    console.error('Unable to load brand from Supabase:', error?.message || error);
    return null;
  }
}

export async function getBrandPageData(slug, brandName) {
  const brand = await getBrandBySlug(slug);
  const resolvedName = brand?.brandName || brandName;

  if (!resolvedName) {
    return { brand, products: [], collections: [] };
  }

  const [productsResult, collectionsResult] = await Promise.allSettled([
    Products.filter({ brand: resolvedName }, '-created_date', 100, 0),
    Collections.filter({ brand: resolvedName }, 'collectionName', 100, 0),
  ]);

  return {
    brand,
    products: productsResult.status === 'fulfilled' ? productsResult.value : [],
    collections: collectionsResult.status === 'fulfilled' ? collectionsResult.value : [],
  };
}

export async function getPublishedProducts(limit = 500) {
  try {
    return await Products.filter({ isPublished: true }, '-updated_date', limit, 0);
  } catch (error) {
    console.error('Unable to load products for sitemap:', error?.message || error);
    return [];
  }
}

export async function getLegalPages(limit = 100) {
  try {
    return await LegalPages.list('title', limit, 0);
  } catch (error) {
    console.error('Unable to load legal pages from Supabase:', error?.message || error);
    return [];
  }
}

export async function getLegalPageBySlug(slug) {
  if (!slug) return null;
  try {
    const records = await LegalPages.filter({ slug }, '-created_date', 1, 0);
    return records[0] || null;
  } catch (error) {
    console.error('Unable to load legal page from Supabase:', error?.message || error);
    return null;
  }
}

// Dealer profiles/reviews are deferred (no Supabase tables yet) — only the
// product-listings part is real today, via products.dealer_id.
export async function getDealerPageData(userId) {
  if (!userId) {
    return { profile: null, listings: [], reviews: [] };
  }

  let listings = [];
  try {
    listings = await Products.filter({ dealerId: userId }, '-created_date', 100, 0);
  } catch (error) {
    console.error('Unable to load dealer listings from Supabase:', error?.message || error);
  }

  return { profile: null, listings, reviews: [] };
}
