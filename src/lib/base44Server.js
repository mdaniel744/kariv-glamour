import 'server-only';
import { createClient } from '@base44/sdk';
import { asArray } from '@/lib/base44Data';

const appId = process.env.NEXT_PUBLIC_BASE44_APP_ID || process.env.VITE_BASE44_APP_ID;
const serverUrl = process.env.NEXT_PUBLIC_BASE44_SERVER_URL || process.env.VITE_BASE44_SERVER_URL || 'https://base44.app';
const appBaseUrl = process.env.NEXT_PUBLIC_BASE44_APP_BASE_URL || process.env.VITE_BASE44_APP_BASE_URL || serverUrl;

const base44Server = appId
  ? createClient({
      appId,
      serverUrl,
      appBaseUrl,
      requiresAuth: false,
    })
  : null;

async function withTimeout(promise, timeoutMs = 8000) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('Base44 request timed out')), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timeoutId);
  }
}

function isNotFound(error) {
  const status = error?.response?.status || error?.status;
  return status === 404;
}

export async function getProductById(id) {
  if (!base44Server || !id) return null;
  try {
    return await withTimeout(base44Server.entities.Products.get(id));
  } catch (error) {
    if (isNotFound(error)) return null;
    console.error('Unable to load product from Base44:', error?.message || error);
    return null;
  }
}

export async function getRelatedProducts(product, limit = 4) {
  if (!base44Server || !product?.brand) return [];
  try {
    const records = asArray(
      await withTimeout(base44Server.entities.Products.filter({ brand: product.brand }, '-created_date', limit + 1, 0))
    );
    return records.filter((record) => record.id !== product.id).slice(0, limit);
  } catch (error) {
    console.error('Unable to load related products from Base44:', error?.message || error);
    return [];
  }
}

export async function getBrands(limit = 100) {
  if (!base44Server) return [];
  try {
    return asArray(await withTimeout(base44Server.entities.Brands.list('brandName', limit, 0)));
  } catch (error) {
    console.error('Unable to load brands from Base44:', error?.message || error);
    return [];
  }
}

export async function getBrandBySlug(slug) {
  if (!base44Server || !slug) return null;
  try {
    const records = asArray(await withTimeout(base44Server.entities.Brands.filter({ slug }, '-created_date', 1, 0)));
    return records[0] || null;
  } catch (error) {
    console.error('Unable to load brand from Base44:', error?.message || error);
    return null;
  }
}

export async function getBrandPageData(slug, brandName) {
  const brand = await getBrandBySlug(slug);
  const resolvedName = brand?.brandName || brandName;

  if (!base44Server || !resolvedName) {
    return { brand, products: [], collections: [] };
  }

  const [productsResult, collectionsResult] = await Promise.allSettled([
    withTimeout(base44Server.entities.Products.filter({ brand: resolvedName }, '-created_date', 100, 0)),
    withTimeout(base44Server.entities.Collections.filter({ brand: resolvedName }, 'collectionName', 100, 0)),
  ]);

  return {
    brand,
    products: productsResult.status === 'fulfilled' ? asArray(productsResult.value) : [],
    collections: collectionsResult.status === 'fulfilled' ? asArray(collectionsResult.value) : [],
  };
}

export async function getPublishedProducts(limit = 500) {
  if (!base44Server) return [];
  try {
    return asArray(
      await withTimeout(base44Server.entities.Products.filter({ isPublished: true }, '-updated_date', limit, 0), 12000)
    );
  } catch (error) {
    console.error('Unable to load products for sitemap:', error?.message || error);
    return [];
  }
}

export async function getLegalPages(limit = 100) {
  if (!base44Server) return [];
  try {
    return asArray(await withTimeout(base44Server.entities.LegalPages.list('title', limit, 0)));
  } catch (error) {
    console.error('Unable to load legal pages from Base44:', error?.message || error);
    return [];
  }
}

export async function getLegalPageBySlug(slug) {
  if (!base44Server || !slug) return null;
  try {
    const records = asArray(await withTimeout(base44Server.entities.LegalPages.filter({ slug }, '-created_date', 1, 0)));
    return records[0] || null;
  } catch (error) {
    console.error('Unable to load legal page from Base44:', error?.message || error);
    return null;
  }
}

export async function getDealerPageData(userId) {
  if (!base44Server || !userId) {
    return { profile: null, listings: [], reviews: [] };
  }

  const [profileResult, listingsResult, reviewsResult] = await Promise.allSettled([
    withTimeout(base44Server.entities.DealerProfile.filter({ userId }, '-created_date', 1, 0)),
    withTimeout(base44Server.entities.Products.filter({ dealerId: userId }, '-created_date', 100, 0)),
    withTimeout(base44Server.entities.DealerReview.filter({ dealerId: userId }, '-created_date', 100, 0)),
  ]);

  const profiles = profileResult.status === 'fulfilled' ? asArray(profileResult.value) : [];
  return {
    profile: profiles[0] || null,
    listings: listingsResult.status === 'fulfilled' ? asArray(listingsResult.value) : [],
    reviews: reviewsResult.status === 'fulfilled' ? asArray(reviewsResult.value) : [],
  };
}
