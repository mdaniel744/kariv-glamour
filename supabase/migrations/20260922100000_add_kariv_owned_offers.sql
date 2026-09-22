-- Extend Kariv's private inquiry workflow to first-party inventory. This table
-- is private to the Kariv store and remains accessible only through service-
-- role server actions with explicit store and user/admin ownership checks.
do $$
begin
  if to_regclass('public.dealer_inquiries') is null then
    raise exception 'Kariv-offers migration requires public.dealer_inquiries. Apply 20260921120000_create_dealer_inquiries.sql first.';
  end if;
end $$;

alter table public.dealer_inquiries
  add column if not exists seller_kind text;

update public.dealer_inquiries
set seller_kind = 'dealer'
where seller_kind is null;

alter table public.dealer_inquiries
  alter column seller_kind set default 'dealer',
  alter column seller_kind set not null,
  alter column dealer_user_id drop not null,
  add column if not exists responded_by_user_id text;

alter table public.dealer_inquiries
  drop constraint if exists dealer_inquiries_seller_kind_check;

alter table public.dealer_inquiries
  add constraint dealer_inquiries_seller_kind_check
    check (seller_kind in ('dealer', 'kariv'));

alter table public.dealer_inquiries
  drop constraint if exists dealer_inquiries_seller_identity_check;

alter table public.dealer_inquiries
  add constraint dealer_inquiries_seller_identity_check
    check (
      (seller_kind = 'dealer' and dealer_user_id is not null)
      or (seller_kind = 'kariv' and dealer_user_id is null and dealer_name = 'Kariv Glamour')
    );

create index if not exists dealer_inquiries_kariv_offer_queue_idx
  on public.dealer_inquiries (store_id, status, created_at desc)
  where seller_kind = 'kariv';

comment on column public.dealer_inquiries.seller_kind is
  'Routes a private pre-purchase inquiry to either an identified dealer or Kariv staff. Kariv rows require a null dealer_user_id.';

comment on column public.dealer_inquiries.responded_by_user_id is
  'Clerk user id of the Kariv admin who accepted or declined a first-party offer; null for dealer responses and unanswered offers.';
