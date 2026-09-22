import 'server-only';

import { cache } from 'react';
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabaseAdmin';
import { STORE_ID } from '@/lib/supabaseData';
import { loadIdentities } from '@/lib/orderIdentities';
import { DEALER_REVIEW_DISPLAY_SELECT, loadPublicDealerReviewsWithPurchases } from '@/lib/dealerReviewsData';

const RATING_VALUES = [1, 2, 3, 4, 5];

export function isMissingDealerReviewsTable(error) {
  return error?.code === '42P01' || error?.code === 'PGRST205';
}

export function summarizeDealerRatingCounts(counts = []) {
  const distribution = RATING_VALUES.map((star) => ({
    star,
    count: Number(counts[star - 1] || 0),
  }));
  const normalizedTotal = distribution.reduce((total, item) => total + item.count, 0);
  const weightedTotal = distribution.reduce((total, item) => total + (item.star * item.count), 0);
  const averageRating = normalizedTotal
    ? Math.round((weightedTotal / normalizedTotal) * 10) / 10
    : 0;

  return { averageRating, totalReviews: normalizedTotal, distribution };
}

function approvedDealerReviewCount(dealerId, rating) {
  let query = supabaseAdmin
    .from('dealer_reviews')
    .select('id', { count: 'exact', head: true })
    .eq('store_id', STORE_ID)
    .eq('dealer_user_id', dealerId)
    .eq('status', 'approved');
  if (rating != null) query = query.eq('rating', rating);
  return query;
}

async function loadDealerReviewCounts(dealerId) {
  const ratingResults = await Promise.all(
    RATING_VALUES.map((rating) => approvedDealerReviewCount(dealerId, rating)),
  );
  const error = ratingResults.find((result) => result.error)?.error;
  // Some PostgREST/proxy responses return 204 with no error and no count,
  // including when the relation is unavailable. Only an explicit exact count
  // establishes a real zero; absent or malformed totals mean unavailable.
  const hasExactCounts = ratingResults.every((result) => (
    Number.isSafeInteger(result.count) && result.count >= 0
  ));

  if (error || !hasExactCounts) {
    return {
      ratingsAvailable: false,
      reviewsConfigured: !isMissingDealerReviewsTable(error),
      averageRating: 0,
      totalReviews: null,
      distribution: [],
    };
  }

  return {
    ratingsAvailable: true,
    reviewsConfigured: true,
    ...summarizeDealerRatingCounts(ratingResults.map((result) => result.count)),
  };
}

async function loadDealerReviewPreview(dealerId) {
  const [counts, recentResult] = await Promise.all([
    loadDealerReviewCounts(dealerId),
    supabaseAdmin
      .from('dealer_reviews')
      .select(DEALER_REVIEW_DISPLAY_SELECT)
      .eq('store_id', STORE_ID)
      .eq('dealer_user_id', dealerId)
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(3),
  ]);
  const recentError = recentResult.error;
  const reviewsConfigured = counts.reviewsConfigured && !isMissingDealerReviewsTable(recentError);

  return {
    ...counts,
    // The row query is also a schema check. Do not retain a zero-star summary
    // if a missing-table response contradicts an apparently successful HEAD.
    ...(!reviewsConfigured ? { ratingsAvailable: false, averageRating: 0, totalReviews: null, distribution: [] } : {}),
    reviewsConfigured,
    recentReviewsAvailable: !recentError,
    recentReviews: recentError ? [] : await loadPublicDealerReviewsWithPurchases(recentResult.data, dealerId),
  };
}

async function countActiveListings(dealerId) {
  const { count, error } = await supabaseAdmin
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('store_id', STORE_ID)
    .eq('dealer_id', dealerId)
    .eq('status', 'active')
    .gt('stock_quantity', 0);
  return { available: !error, value: error ? null : Number(count || 0) };
}

async function countCompletedSales(dealerId) {
  const current = await supabaseAdmin
    .from('orders')
    .select('id', { count: 'exact', head: true })
    .eq('store_id', STORE_ID)
    .eq('dealer_user_id', dealerId)
    .or('purchase_status.in.(delivered,completed),escrow_status.eq.funds_released');
  if (!current.error) return { available: true, value: Number(current.count || 0) };

  // Older installations did not yet have purchase_status. Escrow releases
  // remain an authoritative completed-sale signal during that rollout.
  const historical = await supabaseAdmin
    .from('orders')
    .select('id', { count: 'exact', head: true })
    .eq('store_id', STORE_ID)
    .eq('dealer_user_id', dealerId)
    .eq('escrow_status', 'funds_released');
  return {
    available: !historical.error,
    value: historical.error ? null : Number(historical.count || 0),
  };
}

async function loadProductDealerPreviewData(dealerId) {
  if (!dealerId || !isSupabaseAdminConfigured || !supabaseAdmin) return null;

  const [applicationResult, identitiesResult, listingsResult, salesResult, reviewsResult] = await Promise.allSettled([
    supabaseAdmin
      .from('dealer_applications')
      .select('company_name, country, status')
      .eq('store_id', STORE_ID)
      .eq('dealer_user_id', dealerId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    loadIdentities([dealerId]),
    countActiveListings(dealerId),
    countCompletedSales(dealerId),
    loadDealerReviewPreview(dealerId),
  ]);

  const applicationResponse = applicationResult.status === 'fulfilled' ? applicationResult.value : null;
  const application = !applicationResponse?.error && applicationResponse?.data?.status === 'approved'
    ? applicationResponse.data
    : null;

  // A public seller preview is an approval signal. If approval cannot be
  // established from the latest tenant-scoped application, render nothing.
  if (!application) return null;

  const identities = identitiesResult.status === 'fulfilled' ? identitiesResult.value : new Map();
  const identity = identities.get(dealerId);
  const activeListings = listingsResult.status === 'fulfilled'
    ? listingsResult.value
    : { available: false, value: null };
  const completedSales = salesResult.status === 'fulfilled'
    ? salesResult.value
    : { available: false, value: null };
  const reviews = reviewsResult.status === 'fulfilled'
    ? reviewsResult.value
    : {
        ratingsAvailable: false,
        reviewsConfigured: true,
        recentReviewsAvailable: false,
        recentReviews: [],
        averageRating: 0,
        totalReviews: null,
        distribution: [],
      };

  return {
    approved: true,
    dealerId,
    displayName: application.company_name || identity?.fullName || 'Dealer',
    country: application.country || '',
    logoImage: identity?.imageUrl || '',
    verifiedStatus: 'verified',
    activeListingsAvailable: activeListings.available,
    activeListings: activeListings.value,
    completedSalesAvailable: completedSales.available,
    completedSales: completedSales.value,
    ...reviews,
  };
}

// Product sidebar and the lower-page review preview ask for the same data in
// separate Suspense boundaries. Request-local memoization prevents duplicate
// service-role and Clerk reads without making seller metrics persistently stale.
export const getProductDealerPreviewData = cache(loadProductDealerPreviewData);
