-- Kariv reviews no longer wait for administrator pre-approval. Publish only
-- older pending reviews whose original buyer, dealer, tenant and order still
-- match a fully completed purchase. Other tenants and rejected reviews remain
-- untouched; the shared table's pending default is intentionally unchanged.
update public.dealer_reviews as review
set status = 'approved',
    reviewed_by = null,
    reviewed_at = null,
    updated_at = now()
from public.orders as purchase
where review.store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
  and review.status = 'pending'
  and purchase.id = review.order_id
  and purchase.store_id = review.store_id
  and purchase.buyer_user_id = review.buyer_user_id
  and purchase.dealer_user_id = review.dealer_user_id
  and (
    purchase.purchase_status = 'completed'
    or purchase.escrow_status = 'funds_released'
  );
