// Supabase-backed replacement for the catalog entities (Products, Brands,
// Collections) previously served by Base44. Shapes returned objects to match
// the exact field names the existing UI already reads (productTitle, brand,
// caseDiameter, etc.) so consuming components don't need to change.
import { createClient } from '@supabase/supabase-js';
import { createPublicReferenceLoader, loadFilteredCatalogRows } from './catalogQueries.js';
import { loadCatalogTranslations } from './catalogTranslations.js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID || '7efd71bc-0287-4f40-8a2f-1de330c49522';

const hasSupabaseConfig = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
export const isCatalogDatabaseConfigured = hasSupabaseConfig;
let warnedMissingSupabaseConfig = false;

function getSupabase() {
  if (hasSupabaseConfig) return supabase;

  if (!warnedMissingSupabaseConfig) {
    warnedMissingSupabaseConfig = true;
    console.warn(
      'Supabase env vars are missing. Catalog reads will return empty data until NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
    );
  }

  return null;
}

function requireSupabase() {
  const client = getSupabase();
  if (!client) {
    throw new Error('Supabase env vars are required for this operation.');
  }
  return client;
}

export const supabase = hasSupabaseConfig ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// ---- translation merge ----
// Base44 stored per-language fields as `field_de`/`field_en` directly on the
// record. Supabase stores them as rows in `translations`. This merges those
// rows back onto each record as `field_locale` keys so localize()/
// localizedField() keep working unchanged.
//
// The platform's own dashboard also writes into this same shared table
// (its own AI + human translation pipeline), but keys rows by the raw DB
// column name (`name`, `description`, `short_description`, `disclaimer`)
// rather than the UI field name our own actions.js uses (`productTitle`,
// `productDescription`, `brandName`, ...). Confirmed via live data: 1000+
// translation rows exist for admin-created products/brands/collections
// under those raw names, but were never surfacing anywhere on the site
// because nothing read that key shape. This alias table normalizes them
// on read only — write-side conventions are untouched.
async function fetchTranslationsById(entityType, ids) {
  if (!ids.length) return {};
  const client = getSupabase();
  if (!client) return {};

  try {
    return await loadCatalogTranslations(client, STORE_ID, entityType, ids);
  } catch (error) {
    console.error(`Unable to load translations for ${entityType}:`, error.message);
    // Product indexing and Czech merchant eligibility depend on this result.
    // An outage must not become a cached "missing translation" / noindex page.
    if (entityType === 'product') throw error;
    return {};
  }
}

// A list response (brand pages, related products, ...) currently ships every
// localized field in all 3 languages, even though only one is ever displayed
// — tripling the text payload of large catalogues for no benefit. When a
// caller knows the page's locale, resolveLocale() collapses each field to
// the one value that locale would actually show (same fallback localize()
// already applies: requested locale -> source column -> any other locale),
// and drops the other languages' copies entirely. Omitting `locale` keeps
// every language present, unchanged, so any caller that doesn't opt in sees
// no behavior difference at all.
const LOCALE_ORDER = ['de', 'en', 'cs'];

function resolveLocale(record, fields, locale) {
  if (!locale) return record;
  const resolved = { ...record };
  for (const field of fields) {
    let value = record[`${field}_${locale}`] || record[field];
    if (!value) {
      for (const altLocale of LOCALE_ORDER) {
        if (altLocale === locale) continue;
        if (record[`${field}_${altLocale}`]) { value = record[`${field}_${altLocale}`]; break; }
      }
    }
    resolved[field] = value || '';
    for (const altLocale of LOCALE_ORDER) delete resolved[`${field}_${altLocale}`];
  }
  return resolved;
}

const PRODUCT_LOCALE_FIELDS = ['productTitle', 'productDescription', 'shortDescription'];
const BRAND_LOCALE_FIELDS = ['brandName', 'brandDisclaimer', 'shortDescription'];
const COLLECTION_LOCALE_FIELDS = ['collectionName', 'description'];

// ---- shape adapters ----

function mapProduct(row, brandsById, collectionsById, translationsById) {
  const attrs = row.attributes || {};
  const images = Array.isArray(row.images) ? row.images : [];
  return {
    id: row.id,
    slug: row.slug,
    productTitle: row.name,
    ...(translationsById[row.id] || {}),
    brand: brandsById[row.brand_id]?.name || '',
    brandId: row.brand_id,
    collection: collectionsById[row.collection_id]?.name || attrs['Collection'] || '',
    collectionId: row.collection_id,
    model: attrs['Model'] || '',
    referenceNumber: row.reference_number || '',
    condition: attrs['Condition'] || '',
    caseDiameter: attrs['Case Diameter'] || '',
    caseMaterial: attrs['Case Material'] || '',
    braceletMaterial: attrs['Bracelet Material'] || '',
    dialColor: attrs['Dial Color'] || '',
    watchShape: attrs['Watch Shape'] || '',
    movementType: attrs['Movement Type'] || '',
    functions: attrs['Functions'] || '',
    waterResistance: attrs['Water Resistance'] || '',
    crystalType: attrs['Crystal Type'] || '',
    powerReserve: attrs['Power Reserve'] || '',
    yearOfProduction: attrs['Year of Production'] || '',
    gender: attrs['Gender'] || '',
    serviceHistory: attrs['Service History'] || '',
    polishedStatus: attrs['Polished Status'] || '',
    originalPartsStatus: attrs['Original Parts Status'] || '',
    warrantyType: attrs['Warranty Type'] || '',
    warrantyDuration: attrs['Warranty Duration'] || '',
    scopeOfDelivery: attrs['Scope of Delivery'] || '',
    authenticationStatus: attrs['Authentication'] || 'Pending',
    boxIncluded: attrs['Box Included'] === 'Yes' || attrs['Box Included'] === true,
    papersIncluded: attrs['Papers Included'] === 'Yes' || attrs['Papers Included'] === true,
    price: row.price != null ? Number(row.price) : null,
    salePrice: row.sale_price != null ? Number(row.sale_price) : null,
    currency: row.currency || 'EUR',
    sku: row.sku || '',
    stockQuantity: row.stock_quantity ?? 0,
    availability: (row.stock_quantity ?? 0) > 0 ? 'In Stock' : 'Sold',
    productImages: images,
    featuredImage: images[0] || '',
    imageAlts: row.image_alts || [],
    isFeatured: !!row.is_featured,
    isNewArrival: attrs.isNewArrival === true || attrs.isNewArrival === 'true',
    isCertifiedPreOwned: attrs.isCertifiedPreOwned === true || attrs.isCertifiedPreOwned === 'true',
    isVintage: attrs.isVintage === true || attrs.isVintage === 'true',
    badge: row.badge || '',
    shortDescription: row.short_description || '',
    productDescription: row.description || '',
    metaTitle: row.meta_title || '',
    metaDescription: row.meta_description || '',
    mpn: row.mpn || '',
    gtin: row.gtin || '',
    googleMerchantTitle: row.google_title || '',
    googleMerchantDescription: row.google_description || '',
    isPublished: row.status === 'active',
    dealerId: row.dealer_id || null,
    created_date: row.created_at,
    updated_date: row.updated_at,
  };
}

function mapBrand(row, translationsById) {
  return {
    id: row.id,
    slug: row.slug,
    brandName: row.name,
    ...(translationsById[row.id] || {}),
    shortDescription: row.short_description || '',
    longDescription: row.long_description || '',
    brandDisclaimer: row.disclaimer || '',
    seoTitle: row.meta_title || '',
    seoDescription: row.meta_description || '',
    brandLogoLight: row.logo_light_url || '',
    brandLogoDark: row.logo_dark_url || '',
    heroImage: row.hero_image_url || '',
    faqs: [],
    featuredCollections: [],
    created_date: row.created_at,
    updated_date: row.updated_at,
  };
}

function mapCollection(row, brandsById, translationsById) {
  return {
    id: row.id,
    slug: row.slug,
    collectionName: row.name,
    ...(translationsById[row.id] || {}),
    brand: brandsById[row.brand_id]?.name || '',
    brandId: row.brand_id,
    description: row.description || '',
    heroImage: row.image_url || '',
    created_date: row.created_at,
    updated_date: row.updated_at,
  };
}

// ---- shared anonymous catalog reference lookups ----

const loadBrandsById = createPublicReferenceLoader(async () => {
  const client = getSupabase();
  if (!client) return {};

  const { data, error } = await client.from('brands').select('id, name').eq('store_id', STORE_ID);
  if (error) throw error;
  const byId = {};
  for (const row of data || []) byId[row.id] = row;
  return byId;
});

const loadCollectionsById = createPublicReferenceLoader(async () => {
  const client = getSupabase();
  if (!client) return {};

  const { data, error } = await client.from('collections').select('id, name').eq('store_id', STORE_ID);
  if (error) throw error;
  const byId = {};
  for (const row of data || []) byId[row.id] = row;
  return byId;
});

const catalogReferences = { brands: loadBrandsById, collections: loadCollectionsById };
const publicCatalogCaches = new Set([loadBrandsById, loadCollectionsById]);

function invalidatePublicCatalogCaches() {
  // Product/collection shapes embed reference names, so a brand or collection
  // edit must also evict cached lists that contain those names.
  for (const cachedLoad of publicCatalogCaches) cachedLoad.invalidate();
}

// Shapes product rows already fetched by a caller (e.g. a service-role
// query that needs to see draft/dealer rows RLS would otherwise hide).
// Brand/collection/translation lookups are public data either way.
export async function shapeProductRows(rows) {
  if (!rows.length) return [];
  const [brandsById, collectionsById, translationsById] = await Promise.all([
    loadBrandsById(),
    loadCollectionsById(),
    fetchTranslationsById('product', rows.map((r) => r.id)),
  ]);
  return rows.map((row) => mapProduct(row, brandsById, collectionsById, translationsById));
}

export async function loadAllProductsShaped(query = {}, locale) {
  const client = getSupabase();
  if (!client) return [];

  const [products, brandsById, collectionsById] = await Promise.all([
    loadFilteredCatalogRows(client, STORE_ID, 'products', query, catalogReferences),
    loadBrandsById(),
    loadCollectionsById(),
  ]);
  const translationsById = await fetchTranslationsById('product', (products || []).map((p) => p.id));
  return (products || []).map((row) =>
    resolveLocale(mapProduct(row, brandsById, collectionsById, translationsById), PRODUCT_LOCALE_FIELDS, locale));
}

export async function loadAllBrandsShaped(query = {}, locale) {
  const rows = await loadFilteredCatalogRows(getSupabase(), STORE_ID, 'brands', query);
  const translationsById = await fetchTranslationsById('brand', rows.map((r) => r.id));
  return rows.map((row) => resolveLocale(mapBrand(row, translationsById), BRAND_LOCALE_FIELDS, locale));
}

export async function loadAllCollectionsShaped(query = {}, locale) {
  const [rows, brandsById] = await Promise.all([
    loadFilteredCatalogRows(getSupabase(), STORE_ID, 'collections', query, catalogReferences),
    loadBrandsById(),
  ]);
  const translationsById = await fetchTranslationsById('collection', rows.map((r) => r.id));
  return rows.map((row) => resolveLocale(mapCollection(row, brandsById, translationsById), COLLECTION_LOCALE_FIELDS, locale));
}

// ---- Base44-compatible query helpers ----
// Mirrors the exact-match `.filter(query, sort, limit)` / `.list(sort, limit)`
// / `.get(id)` semantics the existing UI already calls against `dataClient.entities.*`.

function applySort(rows, sort) {
  if (!sort) return rows;
  const desc = sort.startsWith('-');
  const field = desc ? sort.slice(1) : sort;
  return [...rows].sort((a, b) => {
    const av = a[field];
    const bv = b[field];
    if (av === bv) return 0;
    if (av === null || av === undefined) return 1;
    if (bv === null || bv === undefined) return -1;
    const cmp = typeof av === 'string' ? av.localeCompare(String(bv)) : Number(av) - Number(bv);
    return desc ? -cmp : cmp;
  });
}

function matchesQuery(row, query) {
  return Object.entries(query || {}).every(([key, value]) => {
    if (Array.isArray(value)) return value.includes(row[key]);
    return row[key] === value;
  });
}

// Admin writes (create/update/delete) need to go through server-side code
// using the Supabase service-role key plus a Clerk-authenticated admin-role
// check — neither exists yet. Rather than let these silently fail against
// the anon key with a confusing raw Postgres error, they throw a clear,
// specific one until that write layer is built.
async function notYetWritable() {
  throw new Error(
    'Admin write not yet available — pending Clerk auth + Supabase service-role write layer.'
  );
}

// Full-list reads retain the brief public cache used by the shop/navigation.
// Scoped catalog reads bypass it, allowing the database to narrow rows before
// shaping and translation loading. Other entities keep their existing cache.
function makeEntity(loadAll, scoped = false) {
  const loadList = createPublicReferenceLoader(loadAll, 30_000);
  publicCatalogCaches.add(loadList);
  // Locale-trimming only applies on the scoped (uncached, per-query) path —
  // the shared 30s list cache has no per-locale keying, so a caller relying
  // on it still gets every language, exactly as before.
  const loadMatching = (query, locale) => scoped ? loadAll(query, locale) : loadList();
  return {
    async filter(query, sort, limit, offset = 0, locale) {
      const rows = applySort((await loadMatching(query, locale)).filter((r) => matchesQuery(r, query)), sort);
      return limit ? rows.slice(offset, offset + limit) : rows.slice(offset);
    },
    async list(sort, limit, offset = 0) {
      const rows = applySort(await loadList(), sort);
      return limit ? rows.slice(offset, offset + limit) : rows.slice(offset);
    },
    async get(id, locale) {
      const rows = await loadMatching({ id }, locale);
      return rows.find((r) => r.id === id) || null;
    },
    invalidate: invalidatePublicCatalogCaches,
    create: notYetWritable,
    update: notYetWritable,
    delete: notYetWritable,
  };
}

const loadPublishedProductList = createPublicReferenceLoader(() => loadAllProductsShaped({ isPublished: true }), 30_000);
publicCatalogCaches.add(loadPublishedProductList);
export const Products = {
  ...makeEntity(loadAllProductsShaped, true),
  // Storefront searches must not load draft/dealer-pending rows. Keep the
  // full list API for existing callers and share a public-only cache for shop.
  listPublished: loadPublishedProductList,
};
export const Brands = makeEntity(loadAllBrandsShaped, true);
export const Collections = makeEntity(loadAllCollectionsShaped, true);

// ---- FAQ / WatchGuides ----

function mapFaq(row, translationsById) {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    ...(translationsById[row.id] || {}),
    category: row.category || 'General',
    sortOrder: 0,
    created_date: row.created_at,
    updated_date: row.updated_at,
  };
}

function mapGuide(row, translationsById) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    content: row.content || '',
    ...(translationsById[row.id] || {}),
    category: row.category || '',
    featuredImage: '',
    published: !!row.published,
    created_date: row.created_at,
    updated_date: row.updated_at,
  };
}

export async function loadAllFaqsShaped() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client.from('faqs').select('*').eq('store_id', STORE_ID);
  if (error) throw error;
  const translationsById = await fetchTranslationsById('faq', (data || []).map((r) => r.id));
  return (data || []).map((row) => mapFaq(row, translationsById));
}

export async function loadAllGuidesShaped() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client.from('guides').select('*').eq('store_id', STORE_ID);
  if (error) throw error;
  const translationsById = await fetchTranslationsById('guide', (data || []).map((r) => r.id));
  return (data || []).map((row) => mapGuide(row, translationsById));
}

export const FAQ = makeEntity(loadAllFaqsShaped);
export const WatchGuides = makeEntity(loadAllGuidesShaped);

// ---- LegalPages ----

function mapLegalPage(row, translationsById) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    content: row.content || '',
    ...(translationsById[row.id] || {}),
    seoTitle: row.meta_title || '',
    seoDescription: row.meta_description || '',
    created_date: row.created_at,
    updated_date: row.updated_at,
  };
}

export async function loadAllLegalPagesShaped() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client.from('legal_pages').select('*').eq('store_id', STORE_ID);
  if (error) throw error;
  const translationsById = await fetchTranslationsById('legal_page', (data || []).map((r) => r.id));
  return (data || []).map((row) => mapLegalPage(row, translationsById));
}

export const LegalPages = makeEntity(loadAllLegalPagesShaped);

// ---- WebsiteString (admin-only UI-copy catalog) ----

function mapWebsiteString(row, translationsById) {
  const t = translationsById[row.id] || {};
  return {
    id: row.id,
    key: row.key,
    sourceText: row.default_value || '',
    englishText: t.value_en || '',
    germanText: t.value_de || '',
    status: t.value_en || t.value_de ? 'translated' : 'not_translated',
    created_date: row.created_at,
    updated_date: row.updated_at,
  };
}

export async function loadAllWebsiteStringsShaped() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client.from('website_strings').select('*').eq('store_id', STORE_ID);
  if (error) throw error;
  const translationsById = await fetchTranslationsById('website_string', (data || []).map((r) => r.id));
  return (data || []).map((row) => mapWebsiteString(row, translationsById));
}

export const WebsiteString = makeEntity(loadAllWebsiteStringsShaped);

// ---- DealerApplications ----
// No anon SELECT policy exists on this table (by design, matching the
// platform's `inquiries` table precedent) — only insert is possible with
// the anon key. Reading back a dealer's own application status requires a
// server-side route with the service-role key, filtered by dealer_user_id
// (same ownership-check pattern as every other Clerk-authenticated write).
// Not built yet — see the admin/dealer write layer task.
export async function submitDealerApplication({ dealerUserId, companyName, contactEmail, phone, taxId, website, address, country, message }) {
  const client = requireSupabase();
  const { error } = await client.from('dealer_applications').insert({
    store_id: STORE_ID,
    dealer_user_id: dealerUserId,
    company_name: companyName,
    contact_email: contactEmail,
    phone,
    tax_id: taxId,
    website,
    address,
    country,
    message,
    status: 'pending',
  });
  if (error) throw error;
}
