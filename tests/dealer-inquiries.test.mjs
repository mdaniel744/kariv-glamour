import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { compileFunction } from 'node:vm';
import ts from 'typescript';

const STORE_ID = '7efd71bc-0287-4f40-8a2f-1de330c49522';
const source = readFileSync(new URL('../src/actions/dealerInquiries.js', import.meta.url), 'utf8');
const migration = readFileSync(new URL('../supabase/migrations/20260921120000_create_dealer_inquiries.sql', import.meta.url), 'utf8');
const karivOfferMigration = readFileSync(new URL('../supabase/migrations/20260922100000_add_kariv_owned_offers.sql', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});

function fixture({
  user = { id: 'buyer-1', fullName: 'Private Buyer', emailVerified: true, role: 'buyer' },
  dealer = { id: 'dealer-1', fullName: 'Dealer User', emailVerified: true, role: 'dealer' },
  admin = { id: 'admin-1', fullName: 'Kariv Admin', emailVerified: true, role: 'admin' },
  products = [{
    id: 'watch-1',
    store_id: STORE_ID,
    dealer_id: 'dealer-1',
    name: 'Test Watch',
    slug: 'test-watch',
    images: ['https://example.com/watch.webp'],
    price: 10_000,
    sale_price: 9_000,
    currency: 'EUR',
    status: 'active',
    stock_quantity: 1,
  }],
  applications = [{
    id: 'application-1',
    store_id: STORE_ID,
    dealer_user_id: 'dealer-1',
    status: 'approved',
    company_name: 'Trusted Dealer',
    created_at: '2026-09-20T00:00:00.000Z',
  }],
  inquiries = [],
} = {}) {
  const tables = {
    products: structuredClone(products),
    dealer_applications: structuredClone(applications),
    dealer_inquiries: structuredClone(inquiries),
    notifications: [],
  };
  const writes = [];
  let nextId = 1;

  function from(table) {
    let operation = 'select';
    let payload = null;
    let countMode = false;
    let head = false;
    let limitValue = null;
    let orderBy = null;
    const filters = [];
    const inFilters = [];
    const gteFilters = [];
    const isFilters = [];

    function rows() {
      let result = tables[table] || [];
      result = result.filter((row) => filters.every(([key, value]) => row[key] === value));
      result = result.filter((row) => inFilters.every(([key, values]) => values.includes(row[key])));
      result = result.filter((row) => gteFilters.every(([key, value]) => String(row[key] || '') >= String(value)));
      result = result.filter((row) => isFilters.every(([key, value]) => row[key] === value || (value === null && row[key] == null)));
      if (orderBy) {
        const direction = orderBy.ascending ? 1 : -1;
        result = [...result].sort((left, right) => String(left[orderBy.key] || '').localeCompare(String(right[orderBy.key] || '')) * direction);
      }
      return limitValue == null ? result : result.slice(0, limitValue);
    }

    async function execute() {
      if (operation === 'insert') {
        const values = (Array.isArray(payload) ? payload : [payload]).map((value) => ({
          id: value.id || `${table}-${nextId++}`,
          created_at: value.created_at || '2026-09-21T12:00:00.000Z',
          ...structuredClone(value),
        }));
        tables[table].push(...values);
        writes.push({ table, operation, rows: structuredClone(values) });
        return { data: head ? null : values, count: countMode ? values.length : null, error: null };
      }

      const matching = rows();
      if (operation === 'update') {
        for (const row of matching) Object.assign(row, structuredClone(payload));
        writes.push({ table, operation, filters: structuredClone(filters), rows: structuredClone(matching) });
      }
      return { data: head ? null : structuredClone(matching), count: countMode ? matching.length : null, error: null };
    }

    const query = {
      select(_columns, options = {}) {
        countMode = options.count === 'exact';
        head = options.head === true;
        return query;
      },
      eq(key, value) { filters.push([key, value]); return query; },
      is(key, value) { isFilters.push([key, value]); return query; },
      in(key, values) { inFilters.push([key, values]); return query; },
      gte(key, value) { gteFilters.push([key, value]); return query; },
      order(key, options = {}) { orderBy = { key, ascending: options.ascending !== false }; return query; },
      limit(value) { limitValue = value; return query; },
      insert(values) { operation = 'insert'; payload = values; return query; },
      update(values) { operation = 'update'; payload = values; return query; },
      async single() {
        const result = await execute();
        return { data: result.data?.[0] || null, error: result.error };
      },
      async maybeSingle() {
        const result = await execute();
        return { data: result.data?.[0] || null, error: result.error };
      },
      then(resolve, reject) { return execute().then(resolve, reject); },
    };
    return query;
  }

  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports', 'console'])((specifier) => {
    if (specifier === '@/lib/supabaseAdmin') return { supabaseAdmin: { from } };
    if (specifier === '@/lib/serverAuth') {
      return {
        requireUser: async () => user,
        requireDealer: async () => dealer,
        requireAdmin: async () => admin,
      };
    }
    if (specifier === '@/lib/exchangeRatesServer') return { getCzkExchangeRates: async () => ({ rates: { EUR: 25, CZK: 1 } }) };
    if (specifier === '@/lib/productMerchant') return {
      getProductPricing: (product, { locale }) => ({
        price: locale === 'cs' ? Number(product.salePrice || product.price) * 25 : Number(product.salePrice || product.price),
        currency: locale === 'cs' ? 'CZK' : product.currency,
      }),
    };
    if (specifier === '@/lib/supabaseData') return { STORE_ID };
    throw new Error(`Unexpected import: ${specifier}`);
  }, module, module.exports, console);

  return { actions: module.exports, tables, writes };
}

test('inquiry storage is private, tenant-scoped, and prevents duplicate open listing conversations', () => {
  assert.match(migration, /to_regclass\('public\.dealer_inquiries'\)[\s\S]*requires manual schema review/);
  assert.match(migration, /create table if not exists public\.dealer_inquiries/);
  assert.match(migration, /alter table public\.dealer_inquiries enable row level security/);
  assert.match(migration, /revoke all on table public\.dealer_inquiries from public, anon, authenticated/);
  assert.match(migration, /grant all on table public\.dealer_inquiries to service_role/);
  assert.match(migration, /unique index[\s\S]*\(store_id, product_id, buyer_user_id\)[\s\S]*where status in \('pending', 'countered', 'quoted'\)/);
  assert.match(migration, /An accepted response is not an order, inventory reservation, or payment guarantee/);
  assert.match(karivOfferMigration, /seller_kind in \('dealer', 'kariv'\)/);
  assert.match(karivOfferMigration, /seller_kind = 'kariv' and dealer_user_id is null/);
  assert.match(karivOfferMigration, /responded_by_user_id/);
});

test('buyer inquiry derives the dealer and immutable listing snapshot on the server', async () => {
  const state = fixture();
  const result = await state.actions.createDealerInquiry({
    productId: 'watch-1',
    requestType: 'quote',
    dealerUserId: 'forged-dealer',
    listingPrice: 1,
    currency: 'EUR',
    message: 'Please send a quote.',
  });

  assert.equal(result.ok, true);
  assert.equal(result.inquiry.dealerUserId, 'dealer-1');
  assert.equal(result.inquiry.listingPrice, 9_000);
  assert.equal(result.inquiry.type, 'quote');
  assert.equal(result.inquiry.createsOrder, false);
  assert.equal(state.tables.dealer_inquiries[0].dealer_user_id, 'dealer-1');
  assert.equal(state.tables.dealer_inquiries[0].listing_price, 9_000);
  assert.equal(state.tables.notifications[0].user_id, 'dealer-1');
  assert.equal(state.tables.orders, undefined);
});

test('unverified buyers and invalid offers fail before an inquiry is written', async () => {
  const unverified = fixture({ user: { id: 'buyer-1', fullName: 'Buyer', emailVerified: false } });
  assert.equal((await unverified.actions.createDealerInquiry({ productId: 'watch-1', requestType: 'quote' })).ok, false);
  assert.equal(unverified.tables.dealer_inquiries.length, 0);

  const invalidOffer = fixture();
  assert.equal((await invalidOffer.actions.createDealerInquiry({ productId: 'watch-1', requestType: 'offer', offerAmount: 0 })).ok, false);
  assert.equal(invalidOffer.tables.dealer_inquiries.length, 0);
});

test('dealer acceptance is ownership-scoped and never creates an order or reserves inventory', async () => {
  const inquiry = {
    id: 'inquiry-1',
    store_id: STORE_ID,
    product_id: 'watch-1',
    buyer_user_id: 'buyer-1',
    dealer_user_id: 'dealer-1',
    seller_kind: 'dealer',
    buyer_name: 'Private Buyer',
    dealer_name: 'Trusted Dealer',
    product_name: 'Test Watch',
    product_slug: 'test-watch',
    product_image: '',
    intent: 'offer',
    status: 'pending',
    listing_price: 10_000,
    currency: 'EUR',
    buyer_offer_amount: 8_500,
    buyer_message: '',
    dealer_response_amount: null,
    dealer_message: null,
    dealer_responded_at: null,
    buyer_withdrawn_at: null,
    created_at: '2026-09-21T10:00:00.000Z',
    updated_at: '2026-09-21T10:00:00.000Z',
  };
  const state = fixture({ inquiries: [inquiry] });
  const beforeStock = state.tables.products[0].stock_quantity;
  const result = await state.actions.respondToDealerInquiry({ inquiryId: inquiry.id, action: 'accept' });

  assert.equal(result.ok, true);
  assert.equal(result.inquiry.status, 'accepted');
  assert.equal(result.inquiry.responseAmount, 8_500);
  assert.equal(result.inquiry.createsOrder, false);
  assert.equal(state.tables.products[0].stock_quantity, beforeStock);
  assert.equal(state.tables.orders, undefined);
  assert.ok(state.writes.some((write) => write.table === 'dealer_inquiries'));
  assert.ok(!state.writes.some((write) => write.table === 'products'));
});

test('buyer withdrawal cannot mutate another buyer’s inquiry', async () => {
  const inquiry = {
    id: 'inquiry-1', store_id: STORE_ID, product_id: 'watch-1', buyer_user_id: 'buyer-2', dealer_user_id: 'dealer-1', seller_kind: 'dealer',
    buyer_name: 'Other Buyer', dealer_name: 'Trusted Dealer', product_name: 'Test Watch', product_slug: 'test-watch',
    intent: 'purchase_request', status: 'pending', listing_price: 10_000, currency: 'EUR', buyer_offer_amount: null,
    created_at: '2026-09-21T10:00:00.000Z', updated_at: '2026-09-21T10:00:00.000Z',
  };
  const state = fixture({ inquiries: [inquiry] });
  const result = await state.actions.withdrawDealerInquiry('inquiry-1');
  assert.equal(result.ok, false);
  assert.equal(state.tables.dealer_inquiries[0].status, 'pending');
});

test('Kariv offer derives ownership and Czech storefront pricing on the server', async () => {
  const state = fixture({
    products: [{
      id: 'kariv-watch', store_id: STORE_ID, dealer_id: null, name: 'Kariv Watch', slug: 'kariv-watch',
      images: ['https://example.com/kariv.webp'], price: 10_000, sale_price: 9_000, currency: 'EUR',
      status: 'active', stock_quantity: 1,
    }],
  });
  const result = await state.actions.createKarivOffer({
    productId: 'kariv-watch', offerAmount: 200_000, currency: 'CZK', locale: 'cs', dealerUserId: 'forged',
  });

  assert.equal(result.ok, true);
  assert.equal(result.inquiry.sellerKind, 'kariv');
  assert.equal(result.inquiry.dealerUserId, null);
  assert.equal(result.inquiry.dealerName, 'Kariv Glamour');
  assert.equal(result.inquiry.listingPrice, 225_000);
  assert.equal(result.inquiry.currency, 'CZK');
  assert.equal(state.tables.dealer_inquiries[0].seller_kind, 'kariv');
  assert.equal(state.tables.dealer_inquiries[0].dealer_user_id, null);
});

test('Kariv admin can accept a pending first-party offer without changing stock or creating an order', async () => {
  const product = {
    id: 'kariv-watch', store_id: STORE_ID, dealer_id: null, name: 'Kariv Watch', slug: 'kariv-watch', images: [],
    price: 10_000, sale_price: null, currency: 'EUR', status: 'active', stock_quantity: 1,
  };
  const inquiry = {
    id: 'kariv-offer-1', store_id: STORE_ID, product_id: product.id, buyer_user_id: 'buyer-1', dealer_user_id: null,
    seller_kind: 'kariv', buyer_name: 'Private Buyer', dealer_name: 'Kariv Glamour', product_name: product.name,
    product_slug: product.slug, intent: 'offer', status: 'pending', listing_price: 10_000, currency: 'EUR',
    buyer_offer_amount: 8_500, buyer_message: '', dealer_response_amount: null, dealer_message: null,
    dealer_responded_at: null, buyer_withdrawn_at: null, created_at: '2026-09-22T10:00:00.000Z', updated_at: '2026-09-22T10:00:00.000Z',
  };
  const state = fixture({ products: [product], inquiries: [inquiry] });
  const result = await state.actions.respondToKarivOffer({ inquiryId: inquiry.id, action: 'accept', message: 'Accepted.' });

  assert.equal(result.ok, true);
  assert.equal(result.inquiry.status, 'accepted');
  assert.equal(result.inquiry.responseAmount, 8_500);
  assert.equal(state.tables.dealer_inquiries[0].responded_by_user_id, 'admin-1');
  assert.equal(state.tables.products[0].stock_quantity, 1);
  assert.equal(state.tables.orders, undefined);
  assert.equal(state.tables.notifications[0].user_id, 'buyer-1');
});
