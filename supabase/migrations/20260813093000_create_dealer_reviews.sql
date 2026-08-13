create table if not exists public.dealer_reviews (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null,
  dealer_user_id text not null,
  buyer_user_id text not null,
  buyer_name text not null,
  order_id uuid not null references public.orders(id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  title text not null default '' check (char_length(title) <= 120),
  review_text text not null check (char_length(review_text) between 10 and 2000),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_by text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (store_id, order_id)
);

create index if not exists dealer_reviews_public_lookup_idx
  on public.dealer_reviews (store_id, dealer_user_id, status, created_at desc);

create index if not exists dealer_reviews_moderation_queue_idx
  on public.dealer_reviews (store_id, status, created_at desc);

alter table public.dealer_reviews enable row level security;

comment on table public.dealer_reviews is
  'Verified-purchase dealer reviews. All access is mediated by Kariv server actions using the service role; approved rows alone are public.';
