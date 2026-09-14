import 'server-only';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { STORE_ID, Products } from '@/lib/supabaseData';
import { canPurchaseFromSeller, publicSeller } from '@/lib/marketplace';
import { loadApprovedDealerReviews } from '@/lib/dealerReviewsData';

export async function loadSeller(key) {
  if (!supabaseAdmin || !key) return null;
  const { data, error } = await supabaseAdmin.from('dealer_profiles').select('*').eq('store_id', STORE_ID).eq('user_id', key).maybeSingle();
  if (error) throw new Error('Seller configuration is unavailable. Apply the marketplace migration first.');
  return data;
}
export async function requirePurchasableSeller(product) {
  const seller = await loadSeller(product.dealer_id);
  if (!canPurchaseFromSeller({ seller, ownershipVerificationStatus: product.ownership_verification_status })) {
    throw new Error('Seller information or product ownership is not verified. This watch cannot currently be ordered.');
  }
  return seller;
}
export async function requireActiveDealer(userId) {
  const seller = await loadSeller(userId);
  if (!publicSeller(seller) || seller.seller_type !== 'third_party') throw new Error('An approved dealer profile is required.');
  return seller;
}
export async function loadDealerPage(key, { sort = 'newest', offset = 0 } = {}) {
  const seller = await loadSeller(key);
  const profile = publicSeller(seller);
  if (!profile) return { profile: null, listings: [], reviews: [], totalReviews: 0 };
  const [listings, reviews, aggregate] = await Promise.all([
    Products.filter({ dealerId: key, isPublished: true }, '-created_date'),
    loadApprovedDealerReviews(key, 20, { sort, offset }),
    supabaseAdmin.from('marketplace_public_ratings').select('*').eq('store_id', STORE_ID).eq('dealer_user_id', key).maybeSingle(),
  ]);
  if (aggregate.error) throw new Error(aggregate.error.message);
  return {
    profile: { ...profile, average_rating: Number(aggregate.data?.average_rating || 0), review_count: Number(aggregate.data?.review_count || 0),
      displayName: profile.public_name, averageRating: Number(aggregate.data?.average_rating || 0),
      totalReviews: aggregate.data?.review_count || 0, distribution: aggregate.data?.rating_distribution || {},
      logoImage: profile.logo_url },
    listings, reviews, totalReviews: aggregate.data?.review_count || 0,
  };
}
