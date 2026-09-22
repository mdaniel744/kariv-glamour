import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { compileFunction } from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const migration = await readFile(new URL('../supabase/migrations/20260921090000_create_purchase_routing.sql', import.meta.url), 'utf8');
const orderActionsSource = await readFile(new URL('../src/actions/orders.js', import.meta.url), 'utf8');

test('financial resolution records are private, tenant-scoped, and immutable through the app', () => {
  assert.match(migration, /create table if not exists public\.order_financial_events/);
  assert.match(migration, /alter table public\.order_financial_events enable row level security/);
  assert.match(migration, /revoke all on table public\.order_financial_events from anon, authenticated/);
  assert.match(migration, /grant select, insert on table public\.order_financial_events to service_role/);
  assert.doesNotMatch(migration, /grant all on table public\.order_financial_events/);
  assert.match(migration, /where d\.id = p_dispute_id\s+and o\.store_id = p_store_id/);
  assert.match(migration, /insert into public\.order_financial_events/);
});

test('a status change cannot masquerade as a completed refund or protected payout', () => {
  assert.match(migration, /p_outcome in \('release_funds', 'refund'\) and v_financial_reference is null/);
  assert.match(migration, /Only protected orders can record a protected payout/);
  assert.match(migration, /Protected orders require a recorded payout before resolving for the seller/);
  assert.match(migration, /when v_order\.purchase_route = 'dealer_direct' then 'external_refund_completed'/);
  assert.match(migration, /when p_outcome = 'release_funds' then 'protected_payout_completed'/);
  assert.match(migration, /p_outcome in \('release_funds', 'close_order'\)/);
});

test('the server action rejects missing evidence and forwards a completed transaction reference', async () => {
  const calls = [];
  const { outputText } = ts.transpileModule(orderActionsSource, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const imports = {
    '@/lib/supabaseAdmin': { supabaseAdmin: { rpc: async (name, args) => { calls.push({ name, args }); return { data: true, error: null }; } } },
    '@/lib/serverAuth': { requireUser: async () => ({}), requireDealer: async () => ({}), requireAdmin: async () => ({ id: 'admin-1' }) },
    '@/lib/supabaseData': { STORE_ID: '7efd71bc-0287-4f40-8a2f-1de330c49522' },
    '@/lib/orderIdentities': { loadIdentities: async () => new Map() },
    '@/lib/orderShaping': {
      mapOrderRow: value => value,
      mapOrderMessageRow: value => value,
      mapDisputeRowForBuyer: value => value,
      mapDisputeRowForAdmin: value => value,
      deriveOrderStatus: () => 'Processing',
    },
    '@/lib/escrowConstants': { isValidEscrowTransition: () => true },
    '@/lib/productMerchant': { getProductPricing: () => ({}) },
    '@/lib/exchangeRatesServer': { getCzkExchangeRates: async () => null },
    '@/lib/currencyConversion': { matchesCheckoutPrice: () => true },
    '@/lib/catalogTranslations': { loadCatalogTranslations: async () => ({}) },
    '@/lib/purchasePolicyServer': { getProductPurchasePolicy: async () => null },
    '@/lib/purchasePolicy': {
      PURCHASE_POLICY_VERSION: 1,
      PURCHASE_ROUTES: { KARIV_DIRECT: 'kariv_direct', DEALER_DIRECT: 'dealer_direct', ESCROW: 'escrow', MANUAL_REVIEW: 'manual_review' },
      purchasePolicySnapshot: value => value,
    },
  };
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((specifier) => imports[specifier], module, module.exports);

  const missing = await module.exports.resolveDispute({
    disputeId: 'dispute-1',
    outcome: 'refund',
    mediatorNotes: 'Refund agreed.',
    financialReference: ' ',
  });
  assert.equal(missing.ok, false);
  assert.match(missing.error, /completed refund or payout transaction reference/);
  assert.equal(calls.length, 0);

  const recorded = await module.exports.resolveDispute({
    disputeId: 'dispute-1',
    outcome: 'refund',
    mediatorNotes: ' Refund completed. ',
    financialReference: ' BANK-REF-123 ',
  });
  assert.deepEqual(recorded, { ok: true });
  assert.deepEqual(calls[0], {
    name: 'resolve_kariv_order_dispute',
    args: {
      p_store_id: '7efd71bc-0287-4f40-8a2f-1de330c49522',
      p_dispute_id: 'dispute-1',
      p_outcome: 'refund',
      p_financial_reference: 'BANK-REF-123',
      p_mediator_notes: 'Refund completed.',
      p_resolved_by: 'admin-1',
    },
  });
});
