import 'server-only';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { STORE_ID } from '@/lib/supabaseData';
import { formatEscrowReference } from '@/lib/orderShaping';

// The order/buyer columns are used only on the server to validate the purchase
// snapshot. mapPublicDealerReviewRow removes them before anything is rendered.
export const DEALER_REVIEW_DISPLAY_SELECT = 'id,buyer_name,rating,title,review_text,created_at,order_id,buyer_user_id,dealer_user_id';

export function mapDealerReviewRow(row) {
  return {
    id: row.id,
    dealerId: row.dealer_user_id,
    buyerId: row.buyer_user_id,
    buyerName: row.buyer_name || 'Verified Buyer',
    orderId: row.order_id,
    orderReference: formatEscrowReference(row.order_id),
    rating: Number(row.rating),
    title: row.title || '',
    reviewText: row.review_text,
    status: row.status,
    isVerifiedPurchase: true,
    reviewedBy: row.reviewed_by || null,
    reviewedAt: row.reviewed_at || null,
    created_date: row.created_at,
    updated_date: row.updated_at,
  };
}

// Public storefront review data must never carry buyer/account, order, or
// moderation identifiers across the server-component boundary. Keep this
// projection deliberately small instead of deriving it from the private
// action/admin shape above.
export function mapPublicDealerReviewRow(row, purchasedWatches = []) {
  return {
    id: row.id,
    buyerName: row.buyer_name || 'Verified Buyer',
    rating: Number(row.rating),
    title: row.title || '',
    reviewText: row.review_text,
    isVerifiedPurchase: true,
    created_date: row.created_at,
    purchasedWatches,
  };
}

function publicWatchImage(value) {
  if (typeof value !== 'string') return '';
  const image = value.trim();
  if (image.startsWith('/') && !image.startsWith('//')) return image;
  try {
    const url = new URL(image);
    return ['https:', 'http:'].includes(url.protocol) ? image : '';
  } catch {
    return '';
  }
}

export function mapPurchasedWatchSnapshots(products) {
  if (!Array.isArray(products)) return [];
  return products.flatMap((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return [];
    const titles = Object.fromEntries(['title', 'title_en', 'title_de', 'title_cs']
      .flatMap((key) => typeof item[key] === 'string' && item[key].trim()
        ? [[key, item[key].trim()]] : []));
    if (!Object.keys(titles).length) return [];
    const quantity = Number(item.quantity);
    return [{
      ...titles,
      title: titles.title || titles.title_en || titles.title_de || titles.title_cs,
      image: publicWatchImage(item.image),
      ...(Number.isSafeInteger(quantity) && quantity > 0 ? { quantity } : {}),
    }];
  });
}

// Never enrich reviews by the buyer alone: one buyer may own watches from
// several dealers. Match the exact reviewed order, tenant, seller, and buyer,
// then expose only its display-safe watch snapshots (not the order object).
export async function loadPublicDealerReviewsWithPurchases(rows, dealerId) {
  const reviews = Array.isArray(rows) ? rows : [];
  const linkedReviews = reviews.filter((review) => review.order_id && review.buyer_user_id
    && review.dealer_user_id === dealerId);
  const publicReviews = () => reviews.map((review) => mapPublicDealerReviewRow(review));
  if (!dealerId || !linkedReviews.length || !supabaseAdmin) return publicReviews();

  try {
    const orderIds = [...new Set(linkedReviews.map((review) => review.order_id))];
    const buyerIds = [...new Set(linkedReviews.map((review) => review.buyer_user_id))];
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('id,store_id,dealer_user_id,buyer_user_id,products')
      .eq('store_id', STORE_ID)
      .eq('dealer_user_id', dealerId)
      .in('buyer_user_id', buyerIds)
      .in('id', orderIds);

    // A transient order lookup failure must not hide otherwise approved reviews.
    if (error) return publicReviews();
    const ordersById = new Map((data || []).map((order) => [order.id, order]));
    return reviews.map((review) => {
      const order = ordersById.get(review.order_id);
      const matchesPurchase = review.buyer_user_id && review.dealer_user_id === dealerId
        && order?.store_id === STORE_ID && order?.dealer_user_id === dealerId
        && order?.buyer_user_id === review.buyer_user_id;
      return mapPublicDealerReviewRow(review,
        matchesPurchase ? mapPurchasedWatchSnapshots(order.products) : []);
    });
  } catch {
    return publicReviews();
  }
}

export function summarizeDealerReviews(reviews) {
  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? reviews.reduce((total, review) => total + Number(review.rating || 0), 0) / totalReviews
    : 0;

  return {
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews,
  };
}

export async function loadApprovedDealerReviews(dealerId, limit = 50) {
  if (!dealerId) return [];
  const { data, error } = await supabaseAdmin
    .from('dealer_reviews')
    .select(DEALER_REVIEW_DISPLAY_SELECT)
    .eq('store_id', STORE_ID)
    .eq('dealer_user_id', dealerId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    if (error.code === '42P01') return [];
    throw new Error(error.message);
  }
  return loadPublicDealerReviewsWithPurchases(data, dealerId);
}
