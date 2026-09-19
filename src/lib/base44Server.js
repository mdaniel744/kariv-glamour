import 'server-only';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { productSlug } from '@/lib/slug';
import { Products, Brands, Collections, LegalPages, STORE_ID } from '@/lib/supabaseData';
import { getLegalPageFallback, mergeLegalPageFallbacks } from '@/lib/legalPageFallbacks';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { loadIdentities } from '@/lib/orderIdentities';
import { loadApprovedDealerReviews, summarizeDealerReviews } from '@/lib/dealerReviewsData';

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
    const products = await Products.filter({ isPublished: true }, '-updated_date');
    return products.find((p) => productSlug(p) === slug || ['de', 'en', 'cs'].some((locale) => p[`slug_${locale}`] === slug)) || null;
  },
  ['public-product-by-slug-v4-seo', STORE_ID],
  { revalidate: 60 },
);

export const getProductBySlug = cache(async (slug) => {
  if (!slug) return null;
  try {
    return await loadProductBySlug(slug);
  } catch (error) {
    console.error('Unable to load product by slug from Supabase:', error?.message || error);
    // Only a successful lookup may declare a product missing. A failed read
    // must not turn an existing URL into a 404/noindex response or cached page.
    throw error;
  }
});

export async function getRelatedProducts(product, limit = 4, locale) {
  if (!product?.brand) return [];
  try {
    // Reuse the catalog already loaded while browsing this brand.
    const records = await loadBrandProducts(product.brand, locale);
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
const loadBrandProducts = unstable_cache(
  // locale is part of the call signature (not just a closure value) so
  // unstable_cache keys each language's shaped result separately.
  (brandName, locale) => Products.filter({ brand: brandName, isPublished: true }, '-created_date', undefined, 0, locale),
  ['public-brand-products-v3', STORE_ID],
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

export async function getBrandPageData(slug, brandName, locale) {
  const brand = await getBrandBySlug(slug);
  const resolvedName = brand?.brandName || brandName;

  if (!resolvedName) {
    return { brand, products: [], collections: [] };
  }

  const [productsResult, collectionsResult] = await Promise.allSettled([
    loadBrandProducts(resolvedName, locale),
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
    // Let Next retain the previous sitemap on revalidation failures instead
    // of publishing and caching a successful response with every watch gone.
    throw error;
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

// dealer_profiles may not exist yet — this read is wrapped so the page
// degrades gracefully until that table is available.
async function getRealDealerProfile(userId) {
  try {
    const { data, error } = await supabaseAdmin
      .from('dealer_profiles').select('*').eq('store_id', STORE_ID).eq('user_id', userId).maybeSingle();
    if (error || !data) return null;
    return {
      displayName: data.display_name || '',
      bio: data.bio || '',
      logoImage: data.logo_image || '',
      bannerImage: data.banner_image || '',
      location: data.location || '',
      specialties: data.specialties || [],
      establishedYear: data.established_year || null,
      responseTime: data.response_time || '',
      websiteUrl: data.website_url || '',
      averageRating: 0,
      totalReviews: 0,
    };
  } catch {
    return null; // table doesn't exist yet
  }
}

// Until a dealer fills out their real DealerProfileSettings form (or while
// the dealer_profiles table doesn't exist at all yet), fall back to what we
// already have on file — their approved application's company name/website,
// and their Clerk account photo — rather than showing a bare "Dealer"
// placeholder with no image.
async function getFallbackDealerProfile(userId) {
  const [application, identities] = await Promise.all([
    supabaseAdmin
      .from('dealer_applications').select('company_name, website')
      .eq('store_id', STORE_ID).eq('dealer_user_id', userId).eq('status', 'approved')
      .order('created_at', { ascending: false }).limit(1).maybeSingle()
      .then(({ data }) => data).catch(() => null),
    loadIdentities([userId]),
  ]);
  const identity = identities.get(userId);
  const displayName = application?.company_name || identity?.fullName || '';
  const logoImage = identity?.imageUrl || '';
  if (!displayName && !logoImage) return null;

  return {
    displayName,
    bio: '', bannerImage: '', location: '', specialties: [], establishedYear: null, responseTime: '',
    websiteUrl: application?.website || '',
    logoImage,
    averageRating: 0,
    totalReviews: 0,
  };
}

export async function getDealerProfileSummary(userId) {
  if (!userId) return null;
  return (await getRealDealerProfile(userId)) || (await getFallbackDealerProfile(userId));
}

export async function getDealerPageData(userId) {
  if (!userId) {
    return { profile: null, listings: [], reviews: [] };
  }

  const [listingsResult, reviewsResult, identitiesResult, profileResult] = await Promise.allSettled([
    Products.filter({ dealerId: userId }, '-created_date', 100, 0),
    loadApprovedDealerReviews(userId, 100),
    loadIdentities([userId]),
    getDealerProfileSummary(userId),
  ]);
  const listings = listingsResult.status === 'fulfilled' ? listingsResult.value : [];
  const reviews = reviewsResult.status === 'fulfilled' ? reviewsResult.value : [];
  const identities = identitiesResult.status === 'fulfilled' ? identitiesResult.value : new Map();
  const identity = identities.get(userId);
  const summary = summarizeDealerReviews(reviews);
  const savedProfile = profileResult.status === 'fulfilled' ? profileResult.value : null;
  const displayName = savedProfile?.displayName || identity?.fullName || listings[0]?.dealerName || 'Dealer';

  if (listingsResult.status === 'rejected') {
    console.error('Unable to load dealer listings from Supabase:', listingsResult.reason?.message || listingsResult.reason);
  }
  if (reviewsResult.status === 'rejected') {
    console.error('Unable to load dealer reviews from Supabase:', reviewsResult.reason?.message || reviewsResult.reason);
  }

  return {
    profile: {
      userId,
      verifiedStatus: 'verified',
      ...(savedProfile || {}),
      displayName,
      ...summary,
    },
    listings,
    reviews,
  };
}
