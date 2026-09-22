import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import ts from 'typescript';
import * as productMerchant from '../src/lib/productMerchant.js';
import * as orderShaping from '../src/lib/orderShaping.js';
import * as escrowConstants from '../src/lib/escrowConstants.js';
import * as currencyConversion from '../src/lib/currencyConversion.js';
import * as purchasePolicy from '../src/lib/purchasePolicy.js';

const STORE_ID = 'kariv';
const proofKey = (orderId) => `${STORE_ID}/${orderId}/buyer-1/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa.webp`;
const stagedProofKey = (orderId) => `${STORE_ID}/${orderId}/buyer-1/pending.webp`;
const signedProofUrl = (key) => `https://private.example/signed/${encodeURIComponent(key)}?token=short-lived`;
const { outputText } = ts.transpileModule(readFileSync(new URL('../src/actions/orders.js', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});

function orderFixture(overrides = {}) {
  return {
    id: 'order-1',
    store_id: STORE_ID,
    buyer_user_id: 'buyer-1',
    dealer_user_id: 'dealer-1',
    products: [{ product_id: 'watch-1', title: 'Test watch', price: 4_000, currency: 'EUR', quantity: 1 }],
    total_amount: 4_000,
    currency: 'EUR',
    payment_method: 'bank_transfer',
    payment_reference: null,
    escrow_status: 'pending_review',
    purchase_status: 'awaiting_seller_confirmation',
    purchase_route: 'dealer_direct',
    purchase_policy_snapshot: { seller_name: 'Prague Timepieces s.r.o.' },
    buyer_selected_protection: false,
    shipping_status: 'not_shipped',
    shipping_address: { fullName: 'Private Buyer', street: 'Hidden 1', city: 'Prague', postalCode: '11000', country: 'CZ', phone: '+420123456789' },
    tracking_number: null,
    idempotency_key: 'checkout-1',
    created_at: '2026-09-20T10:00:00.000Z',
    updated_at: '2026-09-20T10:00:00.000Z',
    ...overrides,
  };
}

function createFixture({
  orders = [orderFixture()],
  dealerId = 'dealer-1',
  policy = { purchaseRoute: purchasePolicy.PURCHASE_ROUTES.DEALER_DIRECT },
  paymentInstructions = {},
  policyAudits = null,
  directEligibility = true,
  directEligibilityError = null,
  messages = [],
} = {}) {
  const auditRows = policyAudits ?? orders
    .filter((order) => order.purchase_route === purchasePolicy.PURCHASE_ROUTES.DEALER_DIRECT)
    .map((order) => {
      const lineItem = Array.isArray(order.products) ? order.products[0] : null;
      return {
        order_id: order.id,
        store_id: STORE_ID,
        source_value_eur: lineItem?.conversion?.source_price ?? lineItem?.price ?? order.total_amount,
        dealer_policy_revision: 1,
      };
    });
  const tables = {
    orders: structuredClone(orders),
    order_payment_instructions: Object.entries(paymentInstructions).map(([orderId, instructions]) => ({
      order_id: orderId,
      store_id: STORE_ID,
      dealer_user_id: dealerId,
      instructions,
    })),
    order_purchase_policy_audits: structuredClone(auditRows),
    order_messages: structuredClone(messages),
  };
  const reads = [];
  const writes = [];
  const rpcs = [];
  const policyCalls = [];

  function makeQuery(table) {
    const filters = [];
    const inFilters = [];
    let operation = 'select';
    let updatePayload = null;
    let limitValue = null;
    let orderBy = null;

    function matchingRows() {
      let rows = tables[table] || [];
      rows = rows.filter((row) => filters.every(([key, value]) => row[key] === value));
      rows = rows.filter((row) => inFilters.every(([key, values]) => values.includes(row[key])));
      if (orderBy) {
        const direction = orderBy.ascending ? 1 : -1;
        rows = [...rows].sort((left, right) => String(left[orderBy.key] || '').localeCompare(String(right[orderBy.key] || '')) * direction);
      }
      return limitValue == null ? rows : rows.slice(0, limitValue);
    }

    async function execute() {
      reads.push({ table, filters: [...filters], inFilters: [...inFilters], operation });
      const rows = matchingRows();
      if (operation === 'update') {
        for (const row of rows) Object.assign(row, structuredClone(updatePayload));
        writes.push({ table, operation, filters: [...filters], row: structuredClone(updatePayload) });
      }
      return { data: rows, error: null };
    }

    const query = {
      select() { return query; },
      eq(key, value) { filters.push([key, value]); return query; },
      in(key, values) { inFilters.push([key, values]); return query; },
      order(key, options = {}) { orderBy = { key, ascending: options.ascending !== false }; return query; },
      limit(value) { limitValue = value; return query; },
      update(payload) { operation = 'update'; updatePayload = payload; return query; },
      async maybeSingle() {
        const result = await execute();
        return { data: result.data[0] || null, error: result.error };
      },
      async single() {
        const result = await execute();
        return { data: result.data[0] || null, error: result.error };
      },
      then(resolve, reject) { return execute().then(resolve, reject); },
    };
    return query;
  }

  const database = {
    from: makeQuery,
    storage: {
      from(bucket) {
        assert.equal(bucket, 'kariv-payment-proofs');
        return {
          async download() {
            return { data: new Blob(['private proof']), error: null };
          },
          async upload() {
            return { data: {}, error: null };
          },
          async remove() {
            return { data: [], error: null };
          },
          async createSignedUrl(key, ttl) {
            assert.equal(ttl, 300);
            return { data: { signedUrl: signedProofUrl(key) }, error: null };
          },
        };
      },
    },
    async rpc(name, args) {
      rpcs.push({ name, args });
      if (name === 'kariv_dealer_direct_eligible') {
        return { data: directEligibility, error: directEligibilityError };
      }
      if (name === 'submit_kariv_payment_proof') {
        const buyerOrder = tables.orders.find((row) =>
          row.id === args.p_order_id &&
          row.store_id === args.p_store_id &&
          row.buyer_user_id === args.p_buyer_user_id
        );
        if (!buyerOrder) return { data: false, error: null };
        buyerOrder.payment_reference = args.p_proof_key;
        buyerOrder.payment_review_deadline = '2026-09-23T10:00:00.000Z';
        return { data: true, error: null };
      }
      const order = tables.orders.find((row) =>
        row.id === args.p_order_id &&
        row.store_id === args.p_store_id &&
        row.dealer_user_id === args.p_dealer_user_id
      );
      if (!order) return { data: false, error: null };
      if (name === 'accept_kariv_direct_order') {
        order.escrow_status = 'dealer_accepted';
        order.purchase_status = 'awaiting_payment';
        tables.order_payment_instructions.push({
          order_id: order.id,
          store_id: STORE_ID,
          dealer_user_id: dealerId,
          instructions: 'Beneficiary: Prague Timepieces s.r.o.\nIBAN: CZ6508000000192000145399\nBank: Test Bank',
        });
      } else if (name === 'confirm_kariv_direct_payment_received') {
        order.escrow_status = 'funds_secured';
        order.purchase_status = 'paid';
      } else {
        return { data: null, error: { message: `Unexpected RPC ${name}` } };
      }
      return { data: true, error: null };
    },
  };

  const identities = new Map([
    ['buyer-1', { fullName: 'Private Buyer', email: 'buyer@example.com', phone: '+420123456789' }],
    ['dealer-1', { fullName: 'Prague Timepieces s.r.o.', email: 'dealer@example.com' }],
    ['dealer-2', { fullName: 'Other Dealer', email: 'other@example.com' }],
  ]);
  const imports = {
    '@/lib/supabaseAdmin': { supabaseAdmin: database },
    '@/lib/serverAuth': {
      requireUser: async () => ({ id: 'buyer-1' }),
      requireDealer: async () => ({ id: dealerId }),
      requireAdmin: () => { throw new Error('Unexpected admin operation'); },
    },
    '@/lib/supabaseData': { STORE_ID },
    '@/lib/orderIdentities': {
      loadIdentities: async (ids) => new Map(ids.filter(Boolean).flatMap((id) => identities.has(id) ? [[id, identities.get(id)]] : [])),
    },
    '@/lib/orderShaping': orderShaping,
    '@/lib/escrowConstants': escrowConstants,
    '@/lib/productMerchant': productMerchant,
    '@/lib/exchangeRatesServer': { getCzkExchangeRates: async () => null },
    '@/lib/currencyConversion': currencyConversion,
    '@/lib/catalogTranslations': { loadCatalogTranslations: async () => ({}) },
    '@/lib/purchasePolicy': purchasePolicy,
    '@/lib/purchasePolicyServer': {
      getProductPurchasePolicy: async (product, options = {}) => {
        policyCalls.push({ product, options });
        return typeof policy === 'function' ? policy(product, options) : policy;
      },
    },
  };
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((specifier) => {
    assert.ok(specifier in imports, `Unmocked dependency ${specifier}`);
    return imports[specifier];
  }, module, module.exports);

  return { actions: module.exports, tables, reads, writes, rpcs, policyCalls };
}

test('dealer order projection reveals fulfillment data only when operationally required', async () => {
  const pendingProtected = orderFixture({
    id: 'protected-pending',
    purchase_route: 'escrow',
    escrow_status: 'dealer_accepted',
    purchase_status: 'awaiting_payment',
    payment_reference: proofKey('protected-pending'),
  });
  const pendingDirect = orderFixture({
    id: 'direct-pending',
    escrow_status: 'dealer_accepted',
    purchase_status: 'awaiting_payment',
  });
  const paidDirect = orderFixture({
    id: 'direct-paid',
    escrow_status: 'funds_secured',
    purchase_status: 'paid',
    payment_reference: proofKey('direct-paid'),
  });
  const fixture = createFixture({
    orders: [pendingProtected, pendingDirect, paidDirect],
    paymentInstructions: {
      'direct-pending': 'Beneficiary: Prague Timepieces s.r.o.',
      'direct-paid': 'Beneficiary: Prague Timepieces s.r.o.',
    },
  });

  const sales = await fixture.actions.getMySales();
  const protectedSale = sales.find((order) => order.id === 'protected-pending');
  const pendingSale = sales.find((order) => order.id === 'direct-pending');
  const paidSale = sales.find((order) => order.id === 'direct-paid');

  for (const sale of sales) {
    assert.equal(sale.buyerId, undefined);
    assert.equal(sale.customerEmail, '');
  }
  assert.equal(protectedSale.customerName, 'Buyer');
  assert.equal(protectedSale.shippingDetails, null);
  assert.equal(protectedSale.paymentProofUrl, null);
  assert.equal(protectedSale.sellerPaymentInstructions, '');

  assert.equal(pendingSale.customerName, 'Buyer');
  assert.equal(pendingSale.shippingDetails, null);
  assert.equal(pendingSale.paymentProofUrl, null);
  assert.equal(pendingSale.sellerPaymentInstructions, 'Beneficiary: Prague Timepieces s.r.o.');

  assert.equal(paidSale.customerName, 'Private Buyer');
  assert.deepEqual(paidSale.shippingDetails, paidDirect.shipping_address);
  assert.equal(paidSale.paymentProofUrl, signedProofUrl(proofKey('direct-paid')));
  assert.equal(paidSale.sellerPaymentInstructions, '');
});

test('seller payment instructions fail closed when the live policy gate or saved audit is unavailable', async () => {
  const awaitingPayment = orderFixture({
    escrow_status: 'dealer_accepted',
    purchase_status: 'awaiting_payment',
  });
  const ineligibleFixture = createFixture({
    orders: [awaitingPayment],
    paymentInstructions: { 'order-1': 'Beneficiary: Prague Timepieces s.r.o.' },
    directEligibility: false,
  });

  const [ineligibleSale] = await ineligibleFixture.actions.getMySales();
  assert.equal(ineligibleSale.sellerPaymentInstructions, '');
  assert.deepEqual(
    ineligibleFixture.rpcs.find(({ name }) => name === 'kariv_dealer_direct_eligible'),
    {
      name: 'kariv_dealer_direct_eligible',
      args: {
        p_store_id: STORE_ID,
        p_dealer_user_id: 'dealer-1',
        p_source_value_eur: 4_000,
        p_expected_policy_revision: 1,
      },
    },
  );

  const eligibilityErrorFixture = createFixture({
    orders: [awaitingPayment],
    paymentInstructions: { 'order-1': 'Beneficiary: Prague Timepieces s.r.o.' },
    directEligibility: true,
    directEligibilityError: { message: 'Policy service unavailable' },
  });
  const [eligibilityErrorSale] = await eligibilityErrorFixture.actions.getMySales();
  assert.equal(eligibilityErrorSale.sellerPaymentInstructions, '');

  const missingAuditFixture = createFixture({
    orders: [awaitingPayment],
    paymentInstructions: { 'order-1': 'Beneficiary: Prague Timepieces s.r.o.' },
    policyAudits: [],
  });
  const [missingAuditSale] = await missingAuditFixture.actions.getMySales();
  assert.equal(missingAuditSale.sellerPaymentInstructions, '');
  assert.equal(
    missingAuditFixture.rpcs.some(({ name }) => name === 'kariv_dealer_direct_eligible'),
    false,
  );
});

test('every dealer-direct lifecycle action is scoped to the authenticated seller', async () => {
  const foreignOrder = orderFixture({ dealer_user_id: 'dealer-2' });
  const fixture = createFixture({ orders: [foreignOrder], dealerId: 'dealer-1' });

  assert.deepEqual(await fixture.actions.acceptDirectDealerOrder(foreignOrder.id), { ok: false, error: 'Order not found.' });
  assert.deepEqual(await fixture.actions.confirmDirectDealerPaymentReceived(foreignOrder.id), { ok: false, error: 'Order not found.' });
  assert.deepEqual(await fixture.actions.shipDirectDealerOrder(foreignOrder.id, 'TRACK-123'), { ok: false, error: 'Order not found.' });
  assert.equal(fixture.rpcs.length, 0);
  assert.equal(fixture.writes.length, 0);
});

test('dealer-direct lifecycle rejects the wrong route, status, or a downgraded live policy', async () => {
  const protectedFixture = createFixture({ orders: [orderFixture({ purchase_route: 'escrow' })] });
  assert.match((await protectedFixture.actions.acceptDirectDealerOrder('order-1')).error, /Only a direct dealer order/);

  const staleAcceptFixture = createFixture({ orders: [orderFixture({ escrow_status: 'dealer_accepted', purchase_status: 'awaiting_payment' })] });
  assert.match((await staleAcceptFixture.actions.acceptDirectDealerOrder('order-1')).error, /no longer awaiting/);

  const downgradedFixture = createFixture({
    policy: { purchaseRoute: purchasePolicy.PURCHASE_ROUTES.ESCROW },
  });
  assert.match((await downgradedFixture.actions.acceptDirectDealerOrder('order-1')).error, /no longer permits direct payment/);
  assert.equal(downgradedFixture.rpcs.length, 0);

  const unpaidFixture = createFixture();
  assert.match((await unpaidFixture.actions.confirmDirectDealerPaymentReceived('order-1')).error, /not awaiting direct payment/);

  const unconfirmedFixture = createFixture({
    orders: [orderFixture({ escrow_status: 'dealer_accepted', purchase_status: 'awaiting_payment' })],
  });
  assert.match((await unconfirmedFixture.actions.shipDirectDealerOrder('order-1', 'TRACK-123')).error, /Confirm receipt/);
});

test('an eligible dealer can accept, confirm direct payment, and ship without leaking buyer contact data early', async () => {
  const fixture = createFixture({
    orders: [orderFixture({
      products: [{
        product_id: 'watch-1', title: 'Test watch', price: 100_000, currency: 'CZK', quantity: 1,
        conversion: { source_price: 4_000, source_currency: 'EUR' },
      }],
    })],
    messages: [{
      id: 'message-1', order_id: 'order-1', kind: 'justification_request', message: 'Private staff note',
      created_at: '2026-09-20T11:00:00.000Z',
    }],
  });

  const accepted = await fixture.actions.acceptDirectDealerOrder('order-1');
  assert.equal(accepted.ok, true);
  assert.equal(accepted.order.purchaseStatus, 'awaiting_payment');
  assert.equal(accepted.order.customerName, 'Buyer');
  assert.equal(accepted.order.customerEmail, '');
  assert.equal(accepted.order.buyerId, undefined);
  assert.equal(accepted.order.shippingDetails, null);
  assert.equal(accepted.order.justificationMessage, null);
  assert.match(accepted.order.sellerPaymentInstructions, /IBAN:/);
  assert.deepEqual(fixture.rpcs[0], {
    name: 'accept_kariv_direct_order',
    args: { p_store_id: STORE_ID, p_order_id: 'order-1', p_dealer_user_id: 'dealer-1' },
  });
  assert.equal(fixture.policyCalls[0].product.price, 4_000);
  assert.equal(fixture.policyCalls[0].product.currency, 'EUR');

  fixture.tables.orders[0].payment_reference = proofKey('order-1');
  const paid = await fixture.actions.confirmDirectDealerPaymentReceived('order-1');
  assert.equal(paid.ok, true);
  assert.equal(paid.order.escrowStatus, 'funds_secured');
  assert.equal(paid.order.purchaseStatus, 'paid');
  assert.equal(paid.order.customerName, 'Private Buyer');
  assert.equal(paid.order.customerEmail, '');
  assert.equal(paid.order.buyerId, undefined);
  assert.deepEqual(paid.order.shippingDetails, fixture.tables.orders[0].shipping_address);
  assert.equal(paid.order.sellerPaymentInstructions, '');

  const shipped = await fixture.actions.shipDirectDealerOrder('order-1', '  TRACK-123  ');
  assert.equal(shipped.ok, true);
  assert.equal(shipped.order.escrowStatus, 'shipped');
  assert.equal(shipped.order.purchaseStatus, 'shipped');
  assert.equal(shipped.order.trackingNumber, 'TRACK-123');
  assert.equal(fixture.tables.orders[0].tracking_number, 'TRACK-123');
});

test('buyer proof confirmation rejects URLs and atomically stores only the owned private key', async () => {
  const order = orderFixture({
    escrow_status: 'dealer_accepted',
    purchase_status: 'awaiting_payment',
    payment_reference: null,
  });
  const fixture = createFixture({
    orders: [order],
    paymentInstructions: { 'order-1': 'Beneficiary: Prague Timepieces s.r.o.' },
  });

  const rejected = await fixture.actions.confirmPaymentSent(order.id, 'https://public.example/proof.webp');
  assert.equal(rejected.ok, false);
  assert.match(rejected.error, /Upload payment proof/);
  assert.equal(fixture.rpcs.length, 0);

  const key = stagedProofKey(order.id);
  const confirmed = await fixture.actions.confirmPaymentSent(order.id, key);
  assert.equal(confirmed.ok, true);
  const submittedKey = fixture.rpcs[0].args.p_proof_key;
  assert.match(submittedKey, /^kariv\/order-1\/buyer-1\/[0-9a-f-]{36}\.webp$/);
  assert.equal(fixture.tables.orders[0].payment_reference, submittedKey);
  assert.equal(confirmed.order.paymentProofUrl, signedProofUrl(submittedKey));
  assert.equal(fixture.rpcs[0].name, 'submit_kariv_payment_proof');
  assert.deepEqual(
    { ...fixture.rpcs[0].args, p_proof_key: '<immutable>' },
    {
      p_store_id: STORE_ID,
      p_order_id: order.id,
      p_buyer_user_id: 'buyer-1',
      p_proof_key: '<immutable>',
    },
  );
});
