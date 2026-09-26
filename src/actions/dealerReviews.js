'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin, requireUser } from '@/lib/serverAuth';
import { STORE_ID } from '@/lib/supabaseData';
import { formatEscrowReference } from '@/lib/orderShaping';
import { loadIdentities } from '@/lib/orderIdentities';
import { mapDealerReviewRow, mapPurchasedWatchSnapshots } from '@/lib/dealerReviewsData';
import {
  approvedPublicDealerIds,
  buildDealerRatingSummaries,
  emptyDealerRatingSummary,
  normalizePublicDealerIds,
} from '@/lib/dealerRatingSummaries';

// Delivery alone is not the end of the purchase: escrow orders remain in the
// inspection period until funds are released. Only completed purchases can
// publish a verified-buyer review.
const COMPLETED_PURCHASE_FILTER = 'purchase_status.eq.completed,escrow_status.eq.funds_released';
const DEALER_RATING_PAGE_SIZE = 1000;
const REVIEW_STATUSES = ['pending', 'approved', 'rejected'];

function reviewServiceError(error) {
  if (isMissingReviewTable(error)) {
    return 'Dealer reviews are not configured in the database yet.';
  }
  return error?.message || 'Unable to complete the review request.';
}

function revalidateDealerProfile(dealerId) {
  revalidatePath(`/de/dealer-profile/${dealerId}`);
  revalidatePath(`/en/dealer-profile/${dealerId}`);
  revalidatePath(`/cs/dealer-profile/${dealerId}`);
  revalidatePath('/[locale]/product/[slug]', 'page');
}

function isMissingReviewTable(error) {
  return ['42P01', 'PGRST205'].includes(error?.code);
}

function isMissingPurchaseStatus(error) {
  return ['42703', 'PGRST204'].includes(error?.code)
    && String(error?.message || '').includes('purchase_status');
}

async function loadApprovedRatingRows(dealerIds) {
  const rows = [];
  let expectedCount = null;
  let offset = 0;

  while (expectedCount == null || rows.length < expectedCount) {
    const { data, count, error } = await supabaseAdmin
      .from('dealer_reviews')
      .select('id, dealer_user_id, rating, status', { count: offset === 0 ? 'exact' : undefined })
      .eq('store_id', STORE_ID)
      .in('dealer_user_id', dealerIds)
      .eq('status', 'approved')
      .order('id', { ascending: true })
      .range(offset, offset + DEALER_RATING_PAGE_SIZE - 1);

    if (error) {
      if (!isMissingReviewTable(error)) {
        console.error('Unable to load dealer rating rows:', error?.message || error);
      }
      return { rows: [], ratingsAvailable: false };
    }

    if (expectedCount == null && count != null) expectedCount = Number(count);
    const page = data || [];
    rows.push(...page);
    // Supabase/PostgREST may enforce a response cap below the requested range.
    // Keep paging until the exact count is reached (or an empty page proves the
    // end when a count is unavailable) instead of silently treating a short
    // server-capped page as the final page.
    if (page.length === 0 || (expectedCount != null && rows.length >= expectedCount)) break;
    offset += page.length;
  }

  return { rows, ratingsAvailable: true };
}

export async function getDealerRatingSummaries(dealerIds) {
  const ids = normalizePublicDealerIds(dealerIds);
  if (ids.length === 0) return {};

  let approvedIds = [];
  try {
    const applicationResult = await supabaseAdmin
      .from('dealer_applications')
      .select('dealer_user_id, company_name, status, created_at')
      .eq('store_id', STORE_ID)
      .in('dealer_user_id', ids)
      .order('created_at', { ascending: false });
    if (applicationResult.error) throw applicationResult.error;

    const applicationRows = applicationResult.data || [];
    approvedIds = approvedPublicDealerIds(ids, applicationRows);
    if (approvedIds.length === 0) return {};

    const [reviewResult, identities] = await Promise.all([
      loadApprovedRatingRows(approvedIds),
      loadIdentities(approvedIds).catch(() => new Map()),
    ]);

    return buildDealerRatingSummaries({
      dealerIds: approvedIds,
      reviewRows: reviewResult.rows,
      applicationRows,
      identitiesById: identities,
      ratingsAvailable: reviewResult.ratingsAvailable,
    });
  } catch (error) {
    console.error('Unable to load dealer rating summaries:', error?.message || error);
    return Object.fromEntries(approvedIds.map((dealerId) => [dealerId, emptyDealerRatingSummary()]));
  }
}

export async function getDealerRatingSummary(dealerId) {
  const normalizedId = normalizePublicDealerIds([dealerId])[0];
  if (!normalizedId) return emptyDealerRatingSummary();
  const summaries = await getDealerRatingSummaries([normalizedId]);
  return summaries[normalizedId] || emptyDealerRatingSummary();
}

export async function getDealerReviewEligibility(dealerId) {
  const user = await requireUser();
  if (!dealerId) return { ok: false, error: 'Dealer not found.' };

  let orderResult = await supabaseAdmin
    .from('orders')
    .select('id, products, escrow_status, created_at')
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', user.id)
    .eq('dealer_user_id', dealerId)
    .or(COMPLETED_PURCHASE_FILTER)
    .order('created_at', { ascending: false });

  if (isMissingPurchaseStatus(orderResult.error)) {
    orderResult = await supabaseAdmin
      .from('orders')
      .select('id, products, escrow_status, created_at')
      .eq('store_id', STORE_ID)
      .eq('buyer_user_id', user.id)
      .eq('dealer_user_id', dealerId)
      .eq('escrow_status', 'funds_released')
      .order('created_at', { ascending: false });
  }
  const { data: orders, error: orderError } = orderResult;

  if (orderError) return { ok: false, error: orderError.message };
  if (!orders?.length) return { ok: true, eligibleOrder: null, submittedReview: null, reviewableOrders: [] };

  const { data: existing, error: reviewError } = await supabaseAdmin
    .from('dealer_reviews')
    .select('*')
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', user.id)
    .eq('dealer_user_id', dealerId)
    .in('order_id', orders.map((order) => order.id));

  if (reviewError) return { ok: false, error: reviewServiceError(reviewError) };

  const existingByOrder = new Map((existing || []).map((review) => [review.order_id, review]));
  const eligible = orders.find((order) => {
    const review = existingByOrder.get(order.id);
    return !review || review.status === 'rejected';
  });
  const submitted = orders
    .map((order) => existingByOrder.get(order.id))
    .find((review) => review && review.status !== 'rejected');

  return {
    ok: true,
    eligibleOrder: eligible
      ? { id: eligible.id, escrowReference: formatEscrowReference(eligible.id) }
      : null,
    submittedReview: submitted ? mapDealerReviewRow(submitted) : null,
    // This private response goes only to the authenticated buyer. Public
    // review loaders use a separate projection without order identifiers.
    reviewableOrders: orders.map((order) => ({
      id: order.id,
      orderReference: formatEscrowReference(order.id),
      purchasedWatches: mapPurchasedWatchSnapshots(order.products),
      review: existingByOrder.has(order.id) ? mapDealerReviewRow(existingByOrder.get(order.id)) : null,
    })),
  };
}

async function loadCompletedReviewOrder(userId, dealerId, orderId) {
  const query = () => supabaseAdmin
    .from('orders')
    .select('id, dealer_user_id, escrow_status')
    .eq('id', orderId)
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', userId)
    .eq('dealer_user_id', dealerId);
  let result = await query().or(COMPLETED_PURCHASE_FILTER).maybeSingle();
  if (isMissingPurchaseStatus(result.error)) {
    result = await query().eq('escrow_status', 'funds_released').maybeSingle();
  }
  return result;
}

export async function submitDealerReview({ dealerId, orderId, rating, title = '', reviewText = '' }) {
  const user = await requireUser();
  const numericRating = Number(rating);
  const cleanTitle = String(title).trim();
  const cleanReview = String(reviewText).trim();

  if (!dealerId || !orderId) return { ok: false, error: 'Dealer and order are required.' };
  if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    return { ok: false, error: 'Choose a rating from one to five stars.' };
  }
  if (cleanTitle.length > 120) return { ok: false, error: 'The review title is too long.' };
  if (cleanReview.length < 10 || cleanReview.length > 2000) {
    return { ok: false, error: 'The review must be between 10 and 2,000 characters.' };
  }

  const orderResult = await loadCompletedReviewOrder(user.id, dealerId, orderId);
  const { data: order, error: orderError } = orderResult;

  if (orderError || !order) {
    return { ok: false, error: 'Only verified buyers with a completed order can review this dealer.' };
  }

  const { data: existing, error: existingError } = await supabaseAdmin
    .from('dealer_reviews')
    .select('*')
    .eq('store_id', STORE_ID)
    .eq('order_id', orderId)
    .maybeSingle();

  if (existingError) return { ok: false, error: reviewServiceError(existingError) };
  if (existing && existing.buyer_user_id !== user.id) {
    return { ok: false, error: 'This order already has a review.' };
  }
  if (existing && existing.status !== 'rejected') {
    return { ok: false, error: 'A review for this order has already been submitted.' };
  }

  const values = {
    store_id: STORE_ID,
    dealer_user_id: dealerId,
    buyer_user_id: user.id,
    buyer_name: user.fullName || 'Verified Buyer',
    order_id: orderId,
    rating: numericRating,
    title: cleanTitle,
    review_text: cleanReview,
    status: 'approved',
    reviewed_by: null,
    reviewed_at: null,
    updated_at: new Date().toISOString(),
  };

  const mutation = existing
    ? supabaseAdmin.from('dealer_reviews').update(values)
      .eq('id', existing.id).eq('store_id', STORE_ID).eq('buyer_user_id', user.id)
      .eq('dealer_user_id', dealerId).eq('order_id', orderId).eq('status', 'rejected')
      .eq('updated_at', existing.updated_at).select().maybeSingle()
    : supabaseAdmin.from('dealer_reviews').insert(values).select().single();
  const { data, error } = await mutation;

  if (error) {
    if (error.code === '23505') return { ok: false, error: 'A review for this order has already been submitted.' };
    return { ok: false, error: reviewServiceError(error) };
  }
  if (!data) return { ok: false, error: 'The review changed. Please refresh and try again.' };

  revalidateDealerProfile(dealerId);
  return { ok: true, review: mapDealerReviewRow(data) };
}

// A buyer can revise their written feedback after rating a dealer. The order
// is rechecked before publishing the edit; one purchase still yields only one
// rating, and the original star rating is preserved.
export async function updateDealerReviewComment({ reviewId, reviewText = '', expectedUpdatedAt }) {
  const user = await requireUser();
  const cleanReview = String(reviewText).trim();
  if (!reviewId || !expectedUpdatedAt) return { ok: false, error: 'Review and version are required.' };
  if (cleanReview.length < 10 || cleanReview.length > 2000) {
    return { ok: false, error: 'The comment must be between 10 and 2,000 characters.' };
  }

  const { data: existing, error: readError } = await supabaseAdmin.from('dealer_reviews')
    .select('*').eq('id', reviewId).eq('store_id', STORE_ID).eq('buyer_user_id', user.id).maybeSingle();
  if (readError) return { ok: false, error: reviewServiceError(readError) };
  if (!existing) return { ok: false, error: 'Review not found.' };
  if (existing.updated_at !== expectedUpdatedAt) {
    return { ok: false, error: 'The review changed. Please refresh and try again.' };
  }
  const { data: order, error: orderError } = await loadCompletedReviewOrder(user.id, existing.dealer_user_id, existing.order_id);
  if (orderError || !order) {
    return { ok: false, error: 'Only verified buyers with a completed order can comment on this dealer.' };
  }
  if (cleanReview === existing.review_text) return { ok: true, review: mapDealerReviewRow(existing) };

  const { data, error } = await supabaseAdmin.from('dealer_reviews').update({
    review_text: cleanReview,
    status: 'approved',
    reviewed_by: null,
    reviewed_at: null,
    updated_at: new Date().toISOString(),
  }).eq('id', reviewId).eq('store_id', STORE_ID).eq('buyer_user_id', user.id)
    .eq('dealer_user_id', existing.dealer_user_id).eq('order_id', existing.order_id)
    .eq('updated_at', expectedUpdatedAt).select().maybeSingle();
  if (error) return { ok: false, error: reviewServiceError(error) };
  if (!data) return { ok: false, error: 'The review changed. Please refresh and try again.' };
  revalidateDealerProfile(existing.dealer_user_id);
  return { ok: true, review: mapDealerReviewRow(data) };
}

export async function listAdminDealerReviews({ status = 'pending', limit = 200 } = {}) {
  await requireAdmin();
  let query = supabaseAdmin
    .from('dealer_reviews')
    .select('*')
    .eq('store_id', STORE_ID)
    .order('updated_at', { ascending: false })
    .limit(limit);
  if (REVIEW_STATUSES.includes(status)) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) throw new Error(reviewServiceError(error));
  const rows = data || [];
  const identities = await loadIdentities(rows.map((row) => row.dealer_user_id));

  return rows.map((row) => ({
    ...mapDealerReviewRow(row),
    dealerName: identities.get(row.dealer_user_id)?.fullName || 'Dealer',
  }));
}

export async function moderateDealerReview(reviewId, status, expectedUpdatedAt) {
  const admin = await requireAdmin();
  if (!['approved', 'rejected'].includes(status)) {
    return { ok: false, error: 'Choose approve or reject.' };
  }
  if (!expectedUpdatedAt) return { ok: false, error: 'Refresh the review before moderating it.' };

  if (status === 'approved') {
    const { data: review, error: readError } = await supabaseAdmin.from('dealer_reviews')
      .select('buyer_user_id, dealer_user_id, order_id, updated_at')
      .eq('id', reviewId).eq('store_id', STORE_ID).maybeSingle();
    if (readError) return { ok: false, error: reviewServiceError(readError) };
    if (!review || review.updated_at !== expectedUpdatedAt) {
      return { ok: false, error: 'The review changed. Refresh to read the latest comment before publishing it.' };
    }
    const { data: order, error: orderError } = await loadCompletedReviewOrder(
      review.buyer_user_id, review.dealer_user_id, review.order_id,
    );
    if (orderError || !order) {
      return { ok: false, error: 'Only reviews tied to a completed purchase can be published.' };
    }
  }

  const { data, error } = await supabaseAdmin
    .from('dealer_reviews')
    .update({
      status,
      reviewed_by: admin.id,
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', reviewId)
    .eq('store_id', STORE_ID)
    .eq('updated_at', expectedUpdatedAt)
    .select()
    .maybeSingle();

  if (error) return { ok: false, error: reviewServiceError(error) };
  if (!data) return { ok: false, error: 'The review changed. Refresh to read the latest comment before publishing it.' };
  revalidateDealerProfile(data.dealer_user_id);
  return { ok: true, review: mapDealerReviewRow(data) };
}
