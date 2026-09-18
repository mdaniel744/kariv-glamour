'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin, requireDealer } from '@/lib/serverAuth';
import { STORE_ID, shapeProductRows, Products } from '@/lib/supabaseData';
import { slugify } from '@/lib/slug';
import { translateMissingProductContent } from '@/lib/productTranslation';
import { loadCatalogTranslations } from '@/lib/catalogTranslations';
import { SUPPORTED_LOCALES } from '@/lib/locales';

// Called after every product create/update/delete: clears the in-process
// catalog cache (src/lib/supabaseData.js) and Next's own page cache, so a
// saved change is visible immediately instead of up to 30s (data cache) or
// 5min (page ISR) later. Blunt (whole-site) rather than enumerating every
// page a product could appear on (home, shop, brand pages, SEO landings,
// dealer profile) — this is an infrequent admin/dealer action, not a
// hot path, so the cost of over-invalidating is negligible.
function invalidateCatalog() {
  Products.invalidate();
  revalidatePath('/', 'layout');
}

async function upsertTranslations(entityType, entityId, fieldValues, automaticKeys = new Set(), savedTranslations = {}) {
  const rows = [];
  for (const [fieldName, locales] of Object.entries(fieldValues)) {
    for (const [locale, value] of Object.entries(locales)) {
      // Do not relabel unchanged machine translations as human or touch their
      // timestamps. Saved manual corrections also remain entirely untouched.
      if (value && value !== savedTranslations[`${fieldName}_${locale}`]) {
        rows.push({
          store_id: STORE_ID,
          entity_type: entityType,
          entity_id: entityId,
          field_name: fieldName,
          locale,
          value,
          translator: automaticKeys.has(`${fieldName}_${locale}`) ? 'openai' : 'human',
        });
      }
    }
  }
  if (!rows.length) return;
  const { error } = await supabaseAdmin
    .from('translations')
    .upsert(rows, { onConflict: 'store_id,entity_type,entity_id,field_name,locale' });
  if (error) throw error;
}

async function prepareProductPayload(payload, existingRow = null) {
  const saved = existingRow ? await loadCatalogTranslations(supabaseAdmin, STORE_ID, 'product', [existingRow.id]) : {};
  const savedTranslations = saved[existingRow?.id] || {};
  const combined = { ...savedTranslations, ...payload };
  if (existingRow) {
    const fields = { productTitle: 'name', productDescription: 'description', shortDescription: 'short_description', metaTitle: 'meta_title', metaDescription: 'meta_description' };
    for (const [field, column] of Object.entries(fields)) {
      const savedEnglish = saved[existingRow.id]?.[`${field}_en`];
      // A plain-text dealer edit follows Kariv's English authoring contract.
      if (typeof payload[field] === 'string' && payload[field] !== existingRow[column] && !payload[`${field}_en`]) {
        combined[`${field}_en`] = payload[field];
      } else if (savedEnglish && !payload[`${field}_en`]) {
        combined[`${field}_en`] = savedEnglish;
      }
      if (combined[field] === undefined) combined[field] = existingRow[column];
      for (const language of SUPPORTED_LOCALES) {
        const key = `${field}_${language}`;
        // Empty form fields must not discard translations saved in the dashboard.
        if (!combined[key] && saved[existingRow.id]?.[key]) combined[key] = saved[existingRow.id][key];
      }
    }
  }
  const prepared = await translateMissingProductContent(combined);
  return { ...prepared, savedTranslations };
}

async function saveProductTranslations(entityId, payload, automaticKeys, savedTranslations) {
  await upsertTranslations('product', entityId, {
    productTitle: { de: payload.productTitle_de, en: payload.productTitle_en, cs: payload.productTitle_cs },
    shortDescription: { de: payload.shortDescription_de, en: payload.shortDescription_en, cs: payload.shortDescription_cs },
    productDescription: { de: payload.productDescription_de, en: payload.productDescription_en, cs: payload.productDescription_cs },
    metaTitle: { de: payload.metaTitle_de, en: payload.metaTitle_en, cs: payload.metaTitle_cs },
    metaDescription: { de: payload.metaDescription_de, en: payload.metaDescription_en, cs: payload.metaDescription_cs },
  }, automaticKeys, savedTranslations);
}

async function resolveBrandId(brandName) {
  if (!brandName) return null;
  const { data } = await supabaseAdmin
    .from('brands')
    .select('id')
    .eq('store_id', STORE_ID)
    .eq('name', brandName)
    .limit(1);
  return data?.[0]?.id || null;
}

async function resolveCollectionId(collectionName, brandId) {
  if (!collectionName) return null;
  let query = supabaseAdmin.from('collections').select('id').eq('store_id', STORE_ID).eq('name', collectionName);
  if (brandId) query = query.eq('brand_id', brandId);
  const { data } = await query.limit(1);
  return data?.[0]?.id || null;
}

function buildAttributes(payload, existing = {}) {
  const attrs = { ...existing };
  const set = (key, value) => {
    if (value !== undefined && value !== '') attrs[key] = value;
  };
  set('Condition', payload.condition);
  set('Case Diameter', payload.caseDiameter);
  set('Case Material', payload.caseMaterial);
  set('Bracelet Material', payload.braceletMaterial);
  set('Dial Color', payload.dialColor);
  set('Watch Shape', payload.watchShape);
  set('Movement Type', payload.movementType);
  set('Collection', payload.collection);
  set('Model', payload.model);
  set('Gender', payload.gender);
  set('Year of Production', payload.yearOfProduction);
  set('Authentication', payload.authenticationStatus);
  if (payload.boxIncluded !== undefined) attrs['Box Included'] = !!payload.boxIncluded;
  if (payload.papersIncluded !== undefined) attrs['Papers Included'] = !!payload.papersIncluded;
  if (payload.isNewArrival !== undefined) attrs.isNewArrival = !!payload.isNewArrival;
  if (payload.isCertifiedPreOwned !== undefined) attrs.isCertifiedPreOwned = !!payload.isCertifiedPreOwned;
  if (payload.isVintage !== undefined) attrs.isVintage = !!payload.isVintage;
  return attrs;
}

async function buildProductRow(payload, existingRow = null) {
  const name = payload.productTitle_en || payload.productTitle || payload.productTitle_de || existingRow?.name;
  const brandId = payload.brand ? await resolveBrandId(payload.brand) : existingRow?.brand_id ?? null;
  const collectionId = payload.collection
    ? await resolveCollectionId(payload.collection, brandId)
    : existingRow?.collection_id ?? null;

  const images = payload.productImages || (existingRow?.images ?? []);
  const stockQuantity = payload.availability
    ? (payload.availability === 'In Stock' ? 1 : 0)
    : existingRow?.stock_quantity;

  return {
    store_id: STORE_ID,
    name,
    slug: existingRow?.slug || payload.slug || slugify(name),
    description: payload.productDescription_en || payload.productDescription || payload.productDescription_de || existingRow?.description,
    short_description: payload.shortDescription_en || payload.shortDescription || payload.shortDescription_de || existingRow?.short_description,
    meta_title: payload.metaTitle_en || payload.metaTitle || existingRow?.meta_title,
    meta_description: payload.metaDescription_en || payload.metaDescription || existingRow?.meta_description,
    brand_id: brandId,
    collection_id: collectionId,
    reference_number: payload.referenceNumber ?? existingRow?.reference_number,
    price: payload.price != null ? Number(payload.price) : existingRow?.price,
    sale_price: payload.salePrice != null ? Number(payload.salePrice) : existingRow?.sale_price,
    stock_quantity: stockQuantity,
    images,
    attributes: buildAttributes(payload, existingRow?.attributes || {}),
    is_featured: payload.featured !== undefined ? !!payload.featured : existingRow?.is_featured,
  };
}

export async function createProduct(payload) {
  await requireAdmin();
  const prepared = await prepareProductPayload(payload);
  const row = await buildProductRow(prepared.payload);
  const { data, error } = await supabaseAdmin.from('products').insert(row).select().single();
  if (error) throw new Error(error.message);

  await saveProductTranslations(data.id, prepared.payload, prepared.automaticKeys, prepared.savedTranslations);
  invalidateCatalog();

  return { id: data.id, translationWarning: prepared.warning || undefined };
}

export async function updateProduct(id, payload) {
  await requireAdmin();
  const { data: existingRow, error: fetchError } = await supabaseAdmin.from('products').select('*').eq('store_id', STORE_ID).eq('id', id).single();
  if (fetchError || !existingRow) throw new Error('Product not found in this store');
  const prepared = await prepareProductPayload(payload, existingRow);
  const row = await buildProductRow(prepared.payload, existingRow);
  const { error } = await supabaseAdmin.from('products').update(row).eq('store_id', STORE_ID).eq('id', id);
  if (error) throw new Error(error.message);

  await saveProductTranslations(id, prepared.payload, prepared.automaticKeys, prepared.savedTranslations);
  invalidateCatalog();

  return { id, translationWarning: prepared.warning || undefined };
}

export async function deleteProduct(id) {
  await requireAdmin();
  const { error } = await supabaseAdmin.from('products').delete().eq('store_id', STORE_ID).eq('id', id);
  if (error) throw new Error(error.message);
  invalidateCatalog();
}

// ---- Dealer's own listings (ownership-scoped, not admin) ----

export async function createDealerListing(payload) {
  const dealer = await requireDealer();
  const prepared = await prepareProductPayload(payload);
  const row = await buildProductRow(prepared.payload);
  row.dealer_id = dealer.id;
  row.status = 'draft'; // dealer-created listings start as draft pending review
  const { data, error } = await supabaseAdmin.from('products').insert(row).select().single();
  if (error) throw new Error(error.message);

  await saveProductTranslations(data.id, prepared.payload, prepared.automaticKeys, prepared.savedTranslations);
  invalidateCatalog();

  return { id: data.id, translationWarning: prepared.warning || undefined };
}

export async function updateDealerListing(id, payload) {
  const dealer = await requireDealer();
  const { data: existingRow, error: fetchError } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('store_id', STORE_ID)
    .eq('dealer_id', dealer.id)
    .single();
  if (fetchError || !existingRow) throw new Error('Listing not found or not owned by you');

  const prepared = await prepareProductPayload(payload, existingRow);
  const row = await buildProductRow(prepared.payload, existingRow);
  const { error } = await supabaseAdmin.from('products').update(row).eq('store_id', STORE_ID).eq('id', id).eq('dealer_id', dealer.id);
  if (error) throw new Error(error.message);

  await saveProductTranslations(id, prepared.payload, prepared.automaticKeys, prepared.savedTranslations);
  invalidateCatalog();

  return { id, translationWarning: prepared.warning || undefined };
}

export async function deleteDealerListing(id) {
  const dealer = await requireDealer();
  const { error } = await supabaseAdmin.from('products').delete().eq('store_id', STORE_ID).eq('id', id).eq('dealer_id', dealer.id);
  if (error) throw new Error(error.message);
  invalidateCatalog();
}

export async function getMyDealerListings() {
  const dealer = await requireDealer();
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('store_id', STORE_ID)
    .eq('dealer_id', dealer.id)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return shapeProductRows(data || []);
}

export async function getMyDealerListing(id) {
  const dealer = await requireDealer();
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('store_id', STORE_ID)
    .eq('dealer_id', dealer.id)
    .single();
  if (error || !data) return null;
  const [shaped] = await shapeProductRows([data]);
  return shaped;
}
