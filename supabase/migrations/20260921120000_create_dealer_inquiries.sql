-- Kariv-private inquiry data in the shared Supabase project. Stop instead of
-- modifying an unrelated table if another storefront already owns this name.
do $$
begin
  if to_regclass('public.dealer_inquiries') is not null then
    raise exception 'Dealer-inquiries migration stopped because public.dealer_inquiries already exists and requires manual schema review.';
  end if;
end $$;

create table if not exists public.dealer_inquiries (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null,
  product_id uuid not null,
  buyer_user_id text not null check (nullif(trim(buyer_user_id), '') is not null),
  dealer_user_id text not null check (nullif(trim(dealer_user_id), '') is not null),
  buyer_name text not null default 'Buyer' check (char_length(buyer_name) between 1 and 160),
  dealer_name text not null default 'Dealer' check (char_length(dealer_name) between 1 and 200),
  product_name text not null check (char_length(product_name) between 1 and 500),
  product_slug text not null check (char_length(product_slug) between 1 and 500),
  product_image text,
  intent text not null check (intent in ('purchase_request', 'offer')),
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'declined', 'countered', 'quoted', 'withdrawn')),
  listing_price numeric(14, 2) not null check (listing_price > 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  buyer_offer_amount numeric(14, 2) check (buyer_offer_amount > 0),
  buyer_message text check (char_length(buyer_message) <= 2000),
  dealer_response_amount numeric(14, 2) check (dealer_response_amount > 0),
  dealer_message text check (char_length(dealer_message) <= 2000),
  dealer_responded_at timestamptz,
  buyer_withdrawn_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (buyer_user_id <> dealer_user_id),
  check (
    (intent = 'offer' and buyer_offer_amount is not null)
    or (intent = 'purchase_request' and buyer_offer_amount is null)
  ),
  check (
    (status = 'pending'
      and dealer_response_amount is null
      and dealer_responded_at is null
      and buyer_withdrawn_at is null)
    or (status = 'accepted'
      and dealer_response_amount is not null
      and dealer_responded_at is not null
      and buyer_withdrawn_at is null)
    or (status = 'declined'
      and dealer_response_amount is null
      and dealer_responded_at is not null
      and buyer_withdrawn_at is null)
    or (status in ('countered', 'quoted')
      and dealer_response_amount is not null
      and dealer_responded_at is not null
      and buyer_withdrawn_at is null)
    or (status = 'withdrawn' and buyer_withdrawn_at is not null)
  )
);

create index if not exists dealer_inquiries_buyer_feed_idx
  on public.dealer_inquiries (store_id, buyer_user_id, created_at desc);

create index if not exists dealer_inquiries_dealer_feed_idx
  on public.dealer_inquiries (store_id, dealer_user_id, status, created_at desc);

create index if not exists dealer_inquiries_product_history_idx
  on public.dealer_inquiries (store_id, product_id, created_at desc);

-- One live conversation per buyer and listing. Terminal decisions intentionally
-- leave the buyer free to make a later request if the watch is still available.
create unique index if not exists dealer_inquiries_one_open_per_listing_idx
  on public.dealer_inquiries (store_id, product_id, buyer_user_id)
  where status in ('pending', 'countered', 'quoted');

alter table public.dealer_inquiries enable row level security;

revoke all on table public.dealer_inquiries from public, anon, authenticated;
grant all on table public.dealer_inquiries to service_role;

comment on table public.dealer_inquiries is
  'Private, tenant-scoped pre-purchase requests and offers. Clerk-authenticated access is mediated exclusively by Kariv server actions using explicit store and user ownership filters. An accepted response is not an order, inventory reservation, or payment guarantee.';

comment on column public.dealer_inquiries.product_id is
  'Intentionally not a foreign key to the shared products table: the immutable listing snapshot remains available if a listing is later removed.';
