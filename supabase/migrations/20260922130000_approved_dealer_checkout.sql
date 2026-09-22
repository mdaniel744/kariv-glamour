-- Kariv-only temporary dealer routing policy.
--
-- An administrator-approved dealer application is now the sole dealer-level
-- eligibility requirement for marketplace checkout. The earlier tier,
-- account-age, sales-history, dispute-count, commerce-profile and per-dealer
-- payment settings no longer gate an approved dealer's listings.
--
-- Orders continue to use Kariv's protected marketplace destination, preserve
-- the verified seller of record and retain the atomic stock reservation and
-- authenticated-buyer controls introduced by the original routing migration.

create or replace function public.kariv_dealer_protected_eligible(
  p_store_id uuid,
  p_dealer_user_id text,
  p_expected_policy_revision bigint
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_application_status text;
begin
  if p_store_id <> '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
    or nullif(trim(p_dealer_user_id), '') is null
  then
    return false;
  end if;

  perform pg_advisory_xact_lock(hashtextextended(
    p_store_id::text || ':dealer-approval:' || p_dealer_user_id,
    0
  ));

  select status into v_application_status
  from public.dealer_applications
  where store_id = p_store_id
    and dealer_user_id = p_dealer_user_id
  order by created_at desc
  limit 1;

  -- p_expected_policy_revision remains in the signature for compatibility
  -- with existing checkout and order rows, but no secondary dealer policy is
  -- required while approval-only routing is active.
  return coalesce(v_application_status = 'approved', false);
end;
$$;

revoke all on function public.kariv_dealer_protected_eligible(uuid, text, bigint)
  from public, anon, authenticated;
grant execute on function public.kariv_dealer_protected_eligible(uuid, text, bigint)
  to service_role;
