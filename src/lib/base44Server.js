import 'server-only';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { productSlug } from '@/lib/slug';
import { Products, Brands, Collections, LegalPages, STORE_ID } from '@/lib/supabaseData';
import { getLegalPageFallback, mergeLegalPageFallbacks } from '@/lib/legalPageFallbacks';

export const getProductById = cache(async (id) => {
  if (!id) return null;
  try {
    return await Products.get(id);
  } catch (error) {
    console.error('Unable to load product from Supabase:', error?.message || error);
    return null;
  }
});

// Public product pages can share a short-lived lookup across visits. Checkout
// deliberately keeps the uncached Products.get read in getProductById above.
// Existing catalog writes invalidate this through revalidatePath('/', 'layout').
const loadProductBySlug = unstable_cache(
  async (slug) => {
    const exactMatches = await Products.filter({ slug }, '-created_date', 1, 0);
    if (exactMatches[0]) return exactMatches[0];

    // Fallback to a title-derived slug match for any product still missing
    // a real `slug` value (should be rare now that Supabase is the source).
    // Let failures escape the cache callback so a transient outage cannot
    // turn a valid legacy product URL into a cached "not found" result.
    const products = await Products.filter({ isPublished: true }, '-updated_date', 500, 0);
    return products.find((p) => productSlug(p) === slug) || null;
  },
  ['public-product-by-slug-v2', STORE_ID],
  { revalidate: 60 },
);

export const getProductBySlug = cache(async (slug) => {
  if (!slug) return null;
  try {
    return await loadProductBySlug(slug);
  } catch (error) {
    console.error('Unable to load product by slug from Supabase:', error?.message || error);
    return null;
  }
});

export async function getRelatedProducts(product, limit = 4) {
  if (!product?.brand) return [];
  try {
    // Reuse the catalog already loaded while browsing this brand.
    const records = await loadBrandProducts(product.brand);
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

// Cache anonymous catalogue reads only; inventory is refreshed every minute.
// v2 excludes old cache entries with incomplete/unnormalized translations.
const loadBrandBySlug = unstable_cache(
  async (slug) => (await Brands.filter({ slug }, '-created_date', 1, 0))[0] || null,
  ['public-brand-v2', STORE_ID],
  { revalidate: 300 },
);
const fetchBrandProducts = (brandName) => Products.filter({ brand: brandName, isPublished: true }, '-created_date');
// Full translated catalogues can exceed Next's development data-cache limit.
// Keep request-level deduplication locally without writing oversized entries.
const loadBrandProducts = process.env.NODE_ENV === 'development' ? cache(fetchBrandProducts) : unstable_cache(
  fetchBrandProducts,
  ['public-brand-products-v2', STORE_ID],
  { revalidate: 60 },
);
const loadBrandCollections = unstable_cache(
  (brandName) => Collections.filter({ brand: brandName }, 'collectionName'),
  ['public-brand-collections-v2', STORE_ID],
  { revalidate: 300 },
);

// Metadata and page rendering share the same lookup within a request.
export const getBrandBySlug = cache(async (slug) => {
  if (!slug) return null;
  try {
    return await loadBrandBySlug(slug);
  } catch (error) {
    console.error('Unable to load brand from Supabase:', error?.message || error);
    return null;
  }
});

export async function getBrandPageData(slug, brandName) {
  const brand = await getBrandBySlug(slug);
  const resolvedName = brand?.brandName || brandName;

  if (!resolvedName) {
    return { brand, products: [], collections: [] };
  }

  const [productsResult, collectionsResult] = await Promise.allSettled([
    loadBrandProducts(resolvedName),
    loadBrandCollections(resolvedName),
  ]);

  for (const result of [productsResult, collectionsResult]) {
    if (result.status === 'rejected') {
      console.error('Unable to load brand catalogue:', result.reason?.message || result.reason);
    }
  }

  return {
    brand,
    // A failed read is different from a successfully loaded empty catalogue:
    // the client may retry a transient failure, but must not refetch empty data.
    products: productsResult.status === 'fulfilled' ? productsResult.value : null,
    collections: collectionsResult.status === 'fulfilled' ? collectionsResult.value : null,
  };
}

export async function getPublishedProducts(limit) {
  try {
    return await Products.filter({ isPublished: true }, '-updated_date', limit, 0);
  } catch (error) {
    console.error('Unable to load products for sitemap:', error?.message || error);
    return [];
  }
}

export async function getLegalPages(limit = 100) {
  try {
    const pages = await LegalPages.list('title', limit, 0);
    return mergeLegalPageFallbacks(pages);
  } catch (error) {
    console.error('Unable to load legal pages from Supabase:', error?.message || error);
    return mergeLegalPageFallbacks();
  }
}

export async function getLegalPageBySlug(slug) {
  if (!slug) return null;
  try {
    const records = await LegalPages.filter({ slug }, '-created_date', 1, 0);
    return records[0] || getLegalPageFallback(slug);
  } catch (error) {
    console.error('Unable to load legal page from Supabase:', error?.message || error);
    return getLegalPageFallback(slug);
  }
}

// Compatibility exports resolve only the canonical approved seller model.
export async function getDealerProfileSummary(userId) {
  if (!userId) return null;
  const { loadSeller } = await import('@/lib/marketplaceServer');
  const { publicSeller } = await import('@/lib/marketplace');
  return publicSeller(await loadSeller(userId));
}
export async function getDealerPageData(userId) {
  const { loadDealerPage } = await import('@/lib/marketplaceServer');
  return loadDealerPage(userId);
}
