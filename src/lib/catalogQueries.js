// Narrow catalog reads before loading images, descriptions and translations.
// Shaped-record matching still runs afterwards, so fallback/default fields and
// unsupported filters keep the existing exact-match behavior.
const COLUMNS = {
  products: {
    id: 'id', slug: 'slug', productTitle: 'name', brandId: 'brand_id',
    collectionId: 'collection_id', dealerId: 'dealer_id', sku: 'sku',
    referenceNumber: 'reference_number',
  },
  brands: { id: 'id', slug: 'slug', brandName: 'name' },
  collections: { id: 'id', slug: 'slug', collectionName: 'name', brandId: 'brand_id' },
};

function nonEmptyStrings(value) {
  const values = Array.isArray(value) ? value : [value];
  return values.every((item) => typeof item === 'string' && item.length > 0) ? values : null;
}

function quotedList(values) {
  // PostgREST's OR grammar needs quoted/escaped values, even if a collection
  // contains a comma, parenthesis or quote.
  return values.map((value) => `"${value.replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`).join(',');
}

export async function loadFilteredCatalogRows(client, storeId, table, filters = {}, references = {}) {
  if (!client) return [];
  filters ||= {};
  if (Object.values(filters).some((value) => Array.isArray(value) && !value.length)) return [];

  let query = client.from(table).select('*', { count: 'exact' }).eq('store_id', storeId);
  for (const [field, column] of Object.entries(COLUMNS[table] || {})) {
    if (!(field in filters)) continue;
    const values = nonEmptyStrings(filters[field]);
    if (values) query = values.length === 1 ? query.eq(column, values[0]) : query.in(column, values);
  }

  if ((table === 'products' || table === 'collections') && 'brand' in filters) {
    const names = nonEmptyStrings(filters.brand);
    if (names) {
      const brands = Object.values(await references.brands());
      const ids = brands.filter((brand) => names.includes(brand.name)).map((brand) => brand.id);
      if (!ids.length) return [];
      query = query.in('brand_id', ids);
    }
  }

  if (table === 'products') {
    if (filters.isPublished === true) query = query.eq('status', 'active');
    if (filters.isPublished === false) query = query.or('status.neq.active,status.is.null');
    if (filters.isFeatured === true) query = query.eq('is_featured', true);
    if (filters.isFeatured === false) query = query.or('is_featured.eq.false,is_featured.is.null');

    if ('collection' in filters) {
      const names = nonEmptyStrings(filters.collection);
      if (names) {
        const collections = Object.values(await references.collections());
        const ids = collections.filter((collection) => names.includes(collection.name)).map((collection) => collection.id);
        // Some older products carry Collection only in attributes. Include
        // both sources, then let shaped matching remove any conflicting name.
        const attributeFilter = `attributes->>Collection.in.(${quotedList(names)})`;
        query = ids.length
          ? query.or(`collection_id.in.(${quotedList(ids)}),${attributeFilter}`)
          : query.in('attributes->>Collection', names);
      }
    }
  }

  // Supabase limits each response even when no explicit UI limit is supplied.
  // Read all matching rows in stable ID order; use the actual number returned
  // because a deployment may enforce a smaller cap than our requested page.
  query = query.order('id');
  const rows = [];
  const pageSize = 500;
  let offset = 0;
  while (true) {
    const { data, error, count } = await query.range(offset, offset + pageSize - 1);
    if (error) throw error;
    const page = data || [];
    if (!page.length) {
      if (count != null && offset < count) throw new Error('The catalogue response was incomplete. Please retry.');
      break;
    }
    rows.push(...page);
    offset += page.length;
    if (count != null && offset >= count) break;
    // With no count, continue until an empty page, not a short page: a short
    // response can be the server's row cap rather than the end of the catalogue.
  }
  return rows;
}

// Public catalog data only. Failed requests are never retained; simultaneous
// consumers share the same in-flight request until it expires or is invalidated.
export function createPublicReferenceLoader(load, ttlMs = 60_000) {
  let value;
  let expiresAt = 0;
  let pending;
  let generation = 0;
  const get = async () => {
    if (value !== undefined && Date.now() < expiresAt) return value;
    if (pending) return pending;
    const startedGeneration = generation;
    const request = Promise.resolve().then(load).then((result) => {
      if (startedGeneration === generation) {
        value = result;
        expiresAt = Date.now() + ttlMs;
      }
      return result;
    }).finally(() => {
      if (pending === request) pending = undefined;
    });
    pending = request;
    return request;
  };
  get.invalidate = () => {
    generation++;
    value = undefined;
    expiresAt = 0;
    pending = undefined;
  };
  return get;
}
