begin;
alter table public.dealer_reviews
  add column if not exists locale text not null default 'en',
  add column if not exists is_verified_purchase boolean not null default false,
  add column if not exists internal_moderation_reason text,
  add column if not exists deleted_at timestamptz;
alter table public.dealer_reviews drop constraint if exists dealer_reviews_status_check;
alter table public.dealer_reviews add constraint dealer_reviews_status_check check(status in ('pending','approved','rejected','spam'));
-- Preserve the existing purchase requirement. Old rows already required an order;
-- live backfill must verify the matching order before setting is_verified_purchase.
create index if not exists dealer_reviews_user_seller on public.dealer_reviews(store_id,buyer_user_id,dealer_user_id,status);

create or replace function public.kariv_review_guard() returns trigger
language plpgsql set search_path=public,pg_temp as $$
declare seller dealer_profiles%rowtype; matched_order orders%rowtype;
begin
  if tg_op='UPDATE' and new.store_id is distinct from old.store_id and
    exists(select 1 from marketplace_settings where store_id in (old.store_id,new.store_id)) then raise exception 'Review tenant is immutable'; end if;
  if not exists(select 1 from marketplace_settings where store_id=new.store_id) then return new; end if;
  perform pg_advisory_xact_lock(hashtextextended(new.store_id::text||new.buyer_user_id,0));
  if tg_op='UPDATE' and (new.store_id<>old.store_id or new.buyer_user_id<>old.buyer_user_id or new.dealer_user_id<>old.dealer_user_id or new.order_id<>old.order_id) then
    raise exception 'Review ownership is immutable';
  end if;
  -- Users can remove their review even if the seller has since been suspended.
  if tg_op='UPDATE' and old.deleted_at is null and new.deleted_at is not null then
    if (to_jsonb(new)-'deleted_at'-'updated_at') is distinct from (to_jsonb(old)-'deleted_at'-'updated_at') then raise exception 'Deletion cannot change review content'; end if;
    new.updated_at=now(); return new;
  end if;
  select * into seller from dealer_profiles where store_id=new.store_id and user_id=new.dealer_user_id for share;
  if not found or seller.approval_status<>'approved' or seller.deleted_at is not null then raise exception 'Seller unavailable'; end if;
  if new.dealer_user_id=new.buyer_user_id or exists(select 1 from dealer_staff where store_id=new.store_id and dealer_user_id=new.dealer_user_id and user_id=new.buyer_user_id) then
    raise exception 'Dealer owners and staff cannot review their own dealership';
  end if;
  select * into matched_order from orders where id=new.order_id and store_id=new.store_id
    and buyer_user_id=new.buyer_user_id and dealer_user_id=new.dealer_user_id and escrow_status in ('verified','funds_released');
  if not found then raise exception 'Verified purchase required'; end if;
  new.is_verified_purchase=true;
  if tg_op='UPDATE' and (new.store_id<>old.store_id or new.buyer_user_id<>old.buyer_user_id or new.dealer_user_id<>old.dealer_user_id or new.order_id<>old.order_id) then
    raise exception 'Review ownership is immutable';
  end if;
  if tg_op='INSERT' then
    if (select count(*) from dealer_reviews where store_id=new.store_id and buyer_user_id=new.buyer_user_id and created_at>now()-interval '1 hour')>=5 then raise exception 'Review rate limit reached'; end if;
    new.status='pending'; new.reviewed_by=null; new.reviewed_at=null;
  elsif new.title is distinct from old.title or new.review_text is distinct from old.review_text or new.rating<>old.rating then
    if old.updated_at>now()-interval '30 seconds' then raise exception 'Please wait 30 seconds before editing again'; end if;
    new.status='pending'; new.reviewed_by=null; new.reviewed_at=null; new.internal_moderation_reason=null;
  end if;
  if new.status in ('pending','approved') and new.deleted_at is null and exists(
    select 1 from dealer_reviews where store_id=new.store_id and dealer_user_id=new.dealer_user_id and buyer_user_id=new.buyer_user_id
      and id<>new.id and status in ('pending','approved') and deleted_at is null
  ) then raise exception 'One active review per buyer per dealer'; end if;
  new.updated_at=now();
  return new;
end $$;
drop trigger if exists kariv_review_guard on public.dealer_reviews;
create trigger kariv_review_guard before insert or update on public.dealer_reviews for each row execute function public.kariv_review_guard();

create or replace view public.marketplace_public_ratings as
select r.store_id,r.dealer_user_id,count(*)::int as review_count,round(avg(r.rating),1) as average_rating,
  jsonb_build_object('1',count(*) filter(where r.rating=1),'2',count(*) filter(where r.rating=2),
    '3',count(*) filter(where r.rating=3),'4',count(*) filter(where r.rating=4),'5',count(*) filter(where r.rating=5)) as rating_distribution
from dealer_reviews r join dealer_profiles s on s.store_id=r.store_id and s.user_id=r.dealer_user_id
where r.status='approved' and r.deleted_at is null and s.approval_status='approved' and s.deleted_at is null and not s.is_demo
group by r.store_id,r.dealer_user_id;
grant select on public.marketplace_public_ratings to anon,authenticated,service_role;

-- Called only after Clerk super_admin verification in server actions.
create or replace function public.kariv_moderate_review(p_store uuid,p_id uuid,p_actor text,p_status text,p_reason text) returns void
language plpgsql security definer set search_path=public,pg_temp as $$
declare old_row dealer_reviews%rowtype; new_row dealer_reviews%rowtype;
begin
  if p_status not in ('approved','rejected','spam') or nullif(p_actor,'') is null then raise exception 'Invalid moderation'; end if;
  if p_status in ('rejected','spam') and nullif(btrim(p_reason),'') is null then raise exception 'Reason required'; end if;
  select * into old_row from dealer_reviews where store_id=p_store and id=p_id and deleted_at is null for update;
  if not found or old_row.buyer_user_id=p_actor or old_row.dealer_user_id=p_actor or exists(
    select 1 from dealer_staff where store_id=p_store and dealer_user_id=old_row.dealer_user_id and user_id=p_actor
  ) then raise exception 'Review unavailable or moderation conflict of interest'; end if;
  update dealer_reviews set status=p_status,reviewed_by=p_actor,reviewed_at=now(),internal_moderation_reason=p_reason
    where store_id=p_store and id=p_id returning * into new_row;
  insert into marketplace_audit(store_id,entity_type,entity_id,actor_id,reason,before_data,after_data)
    values(p_store,'review',p_id::text,p_actor,coalesce(nullif(p_reason,''),'Approved'),to_jsonb(old_row),to_jsonb(new_row));
end $$;
revoke all on function public.kariv_moderate_review(uuid,uuid,text,text,text) from public,anon,authenticated;
grant execute on function public.kariv_moderate_review(uuid,uuid,text,text,text) to service_role;

create or replace function public.kariv_save_seller(p_store uuid,p_key text,p_actor text,p_values jsonb,p_reason text) returns jsonb
language plpgsql security definer set search_path=public,pg_temp as $$
declare before_row dealer_profiles%rowtype; after_row dealer_profiles%rowtype; merged jsonb;
begin
  if nullif(p_actor,'') is null or nullif(btrim(p_reason),'') is null then raise exception 'Actor and reason required'; end if;
  select * into before_row from dealer_profiles where store_id=p_store and user_id=p_key for update;
  if not found then raise exception 'Import the dealer profile before editing it'; end if;
  -- Column assignment is explicit; identity and external IDs cannot be supplied here.
  merged=to_jsonb(before_row)||p_values;
  after_row=jsonb_populate_record(null::dealer_profiles,merged);
  update dealer_profiles set public_name=after_row.public_name,legal_name=after_row.legal_name,slug=after_row.slug,
    registered_address_line_1=after_row.registered_address_line_1,registered_address_line_2=after_row.registered_address_line_2,
    registered_city=after_row.registered_city,registered_postal_code=after_row.registered_postal_code,registered_country_code=after_row.registered_country_code,
    company_registration_number=after_row.company_registration_number,vat_id=after_row.vat_id,public_support_email=after_row.public_support_email,
    public_phone=after_row.public_phone,website_url=after_row.website_url,logo_url=after_row.logo_url,
    profile_description_en=after_row.profile_description_en,profile_description_cs=after_row.profile_description_cs,profile_description_de=after_row.profile_description_de,
    approval_status=after_row.approval_status,professional_seller_confirmed_at=after_row.professional_seller_confirmed_at,
    accepted_free_eu_shipping_at=after_row.accepted_free_eu_shipping_at,accepted_returns_policy_at=after_row.accepted_returns_policy_at,
    accepted_warranty_rules_at=after_row.accepted_warranty_rules_at,merchant_feed_eligible=after_row.merchant_feed_eligible,
    approved_at=case when after_row.approval_status='approved' then now() else before_row.approved_at end,
    approved_by=case when after_row.approval_status='approved' then p_actor else before_row.approved_by end,
    deleted_at=after_row.deleted_at
  where store_id=p_store and user_id=p_key returning * into after_row;
  insert into marketplace_audit(store_id,entity_type,entity_id,actor_id,reason,before_data,after_data)
    values(p_store,'seller',p_key,p_actor,p_reason,to_jsonb(before_row),to_jsonb(after_row));
  return to_jsonb(after_row);
end $$;
revoke all on function public.kariv_save_seller(uuid,text,text,jsonb,text) from public,anon,authenticated;
grant execute on function public.kariv_save_seller(uuid,text,text,jsonb,text) to service_role;

create or replace function public.kariv_assign_products(p_store uuid,p_actor text,p_plan jsonb,p_override boolean default false) returns integer
language plpgsql security definer set search_path=public,pg_temp as $$
declare entry jsonb; current_row products%rowtype; n integer=0; demo boolean;
begin
  if jsonb_typeof(p_plan)<>'array' or jsonb_array_length(p_plan)>5000 or nullif(p_actor,'') is null then raise exception 'Invalid assignment plan'; end if;
  if (select count(*) from jsonb_array_elements(p_plan))<>(select count(distinct value->>'product_id') from jsonb_array_elements(p_plan)) then raise exception 'Duplicate product assignment'; end if;
  for entry in select value from jsonb_array_elements(p_plan) loop
    select * into current_row from products where store_id=p_store and id=(entry->>'product_id')::uuid for update;
    if not found then raise exception 'Unknown product in store'; end if;
    if current_row.dealer_id is distinct from (entry->>'previous_seller') or
      current_row.ownership_verification_status is distinct from (entry->>'previous_status') then raise exception 'Ownership changed since preview'; end if;
    if current_row.ownership_verification_status='verified' and current_row.dealer_id is distinct from (entry->>'seller_id') and not p_override then raise exception 'Verified ownership overwrite requires explicit override'; end if;
    demo=(entry->>'verification_status')='demo';
    if demo and not exists(select 1 from marketplace_settings where store_id=p_store and environment in ('development','staging')) then raise exception 'Demo assignment forbidden'; end if;
    if nullif(entry->>'reason','') is null then raise exception 'Verification source/reason required'; end if;
    update products set dealer_id=entry->>'seller_id',ownership_verification_status=entry->>'verification_status',
      ownership_verified_at=case when entry->>'verification_status'='verified' then now() else null end,
      ownership_verified_by=case when entry->>'verification_status'='verified' then p_actor else null end,
      merchant_feed_eligible=false,ownership_change_reason=entry->>'reason',ownership_changed_by=p_actor
    where store_id=p_store and id=current_row.id;
    n=n+1;
  end loop;
  return n;
end $$;
revoke all on function public.kariv_assign_products(uuid,text,jsonb,boolean) from public,anon,authenticated;
grant execute on function public.kariv_assign_products(uuid,text,jsonb,boolean) to service_role;
commit;
