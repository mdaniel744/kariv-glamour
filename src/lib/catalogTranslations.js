// The shared dashboard writes database column names; the storefront's older
// editor writes UI names. Both describe the same localized fields.
const FIELD_ALIASES = {
  product: { name: 'productTitle', description: 'productDescription', short_description: 'shortDescription',
    meta_title: 'metaTitle', meta_description: 'metaDescription' },
  brand: { name: 'brandName', disclaimer: 'brandDisclaimer', short_description: 'shortDescription' },
  collection: { name: 'collectionName' },
};

function timestamp(row) {
  return Date.parse(row.updated_at) || Date.parse(row.created_at) || 0;
}

function compareRank(left, right) {
  for (let index = 0; index < left.length; index++) {
    if (left[index] !== right[index]) return left[index] > right[index] ? 1 : -1;
  }
  return 0;
}

export function mergeCatalogTranslations(entityType, rows) {
  const aliases = FIELD_ALIASES[entityType] || {};
  const chosen = new Map();
  for (const row of rows) {
    if (!row.entity_id || !row.field_name || typeof row.value !== 'string' || !row.value.trim()) continue;
    const locale = String(row.locale || '').trim().toLowerCase().split(/[-_]/)[0];
    if (!['de', 'en', 'cs'].includes(locale)) continue;
    const field = aliases[row.field_name] || row.field_name;
    const key = JSON.stringify([row.entity_id, field, locale]);
    const previous = chosen.get(key);
    // Prefer the most recently saved non-empty translation. On legacy rows
    // without timestamps, prefer the shared dashboard's database field name.
    const rank = [timestamp(row), aliases[row.field_name] ? 1 : 0, row.field_name, row.value];
    if (!previous || compareRank(rank, previous.rank) > 0) chosen.set(key, { row, field, locale, rank });
  }

  const result = {};
  for (const { row, field, locale } of chosen.values()) {
    result[row.entity_id] ??= {};
    result[row.entity_id][`${field}_${locale}`] = row.value;
  }
  return result;
}

const ID_BATCH_SIZE = 50;
const PAGE_SIZE = 500;

export async function loadCatalogTranslations(client, storeId, entityType, ids) {
  const uniqueIds = [...new Set(ids.filter(Boolean))];
  if (!client || !uniqueIds.length) return {};
  const batches = [];
  for (let start = 0; start < uniqueIds.length; start += ID_BATCH_SIZE) {
    batches.push(uniqueIds.slice(start, start + ID_BATCH_SIZE));
  }

  const loadBatch = async (batch) => {
    const rows = [];
    let offset = 0;
    while (true) {
      const { data, error, count } = await client.from('translations')
        // Read optional timestamps when available without requiring a schema
        // change on shared/legacy databases. Only localized values leave here.
        .select('*', { count: 'exact' })
        .eq('store_id', storeId)
        .eq('entity_type', entityType)
        .in('entity_id', batch)
        .order('entity_id').order('field_name').order('locale')
        .range(offset, offset + PAGE_SIZE - 1);
      if (error) throw error;
      const page = data || [];
      if (!page.length) {
        if (count != null && offset < count) throw new Error('The translation response was incomplete. Please retry.');
        break;
      }
      rows.push(...page);
      offset += page.length;
      if (count != null && offset >= count) break;
      // Without a count, a short response can be the server's row cap, not
      // the end of the translations. Continue until a genuinely empty page.
    }
    return rows;
  };

  const rows = [];
  // Bound parallel work so a full shop load doesn't flood the database.
  for (let start = 0; start < batches.length; start += 4) {
    const groups = await Promise.all(batches.slice(start, start + 4).map(loadBatch));
    rows.push(...groups.flat());
  }
  return mergeCatalogTranslations(entityType, rows);
}
