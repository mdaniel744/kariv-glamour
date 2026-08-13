import 'server-only';
import { productSlug } from '@/lib/slug';
import { Products, Brands, Collections, LegalPages, STORE_ID } from '@/lib/supabaseData';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { loadIdentities } from '@/lib/orderIdentities';
import { loadApprovedDealerReviews, summarizeDealerReviews } from '@/lib/dealerReviewsData';

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
