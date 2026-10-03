import { createHash } from 'node:crypto';

export const KARIV_STORE_ID = '7efd71bc-0287-4f40-8a2f-1de330c49522';
export const PRODUCT_FIELDS = ['description', 'short_description', 'meta_description', 'google_description'];
const ALIASES = { description: 'productDescription', short_description: 'shortDescription', meta_description: 'metaDescription', google_description: 'googleMerchantDescription' };
const TRANSLATION_FIELDS = new Set([...Object.keys(ALIASES), ...Object.values(ALIASES)]);

export function digest(value) {
  return createHash('sha256').update(typeof value === 'string' ? value : JSON.stringify(value)).digest('hex');
}

// Preserve exact descriptions of supplied certificates/passports and named programmes.
// Those need item evidence review, not a blind substitution of the programme name.
export function hasSpecificCertificationContext(value) {
  return /(?:seal|passport|watch passport|certificat(?:e|ion)|report|zertifikat|zertifizierung|siegel|uhrenpass|pr[uü]fbericht|certifik[aá]t|posudek|pas hodinek|pečeť|pečeti|Bezel|Hublotista|NAJA|Rolex Certified Pre[- ]Owned)/iu.test(value);
}

export function replaceClaims(value, rules, { productId } = {}) {
  if (typeof value !== 'string' || !value) return { value, changes: [] };
  const protectedCpo = hasSpecificCertificationContext(value);
  const changes = [];
  // Edit text nodes only: never touch href/src, embedded images, or markup.
  const segments = value.split(/(<[^>]*>)/g);
  const result = segments.map((segment, index) => {
    if (segment.startsWith('<')) return segment;
    let next = segment;
    for (const rule of rules) {
      if (rule.productIds && !rule.productIds.includes(productId)) continue;
      if (!rule.id || !rule.from || typeof rule.to !== 'string' || /[<>]/.test(rule.from + rule.to)) {
        throw new Error(`Invalid text-only rule: ${rule.id}`);
      }
      if (protectedCpo && rule.id.startsWith('generic-cpo')) continue;
      if (rule.wholeNode) {
        const previousText = segments.slice(0, index).filter((part) => !part.startsWith('<') && part.trim()).at(-1)?.trim();
        if (segment.trim() !== rule.from || (rule.precedingText && previousText !== rule.precedingText)) continue;
        next = next.replace(rule.from, rule.to);
        changes.push({ id: rule.id, from: rule.from, to: rule.to, count: 1 });
        continue;
      }
      const count = next.split(rule.from).length - 1;
      if (!count) continue;
      next = next.split(rule.from).join(rule.to);
      changes.push({ id: rule.id, from: rule.from, to: rule.to, count });
    }
    return next;
  }).join('');
  return { value: result, changes };
}

function rank(row) {
  return [Date.parse(row.updated_at) || Date.parse(row.created_at) || 0, ALIASES[row.field_name] ? 1 : 0, row.field_name, row.value];
}
function newer(left, right) {
  const a = rank(left); const b = rank(right);
  for (let index = 0; index < a.length; index++) if (a[index] !== b[index]) return a[index] > b[index];
  return false;
}

export function translationGroup(row) {
  return JSON.stringify([row.entity_id, ALIASES[row.field_name] || row.field_name, String(row.locale || '').trim().toLowerCase().split(/[-_]/)[0]]);
}

export function translationWinner(rows, row) {
  return rows.filter((candidate) => candidate.value?.trim() && translationGroup(candidate) === translationGroup(row))
    .reduce((winner, candidate) => !winner || newer(candidate, winner) ? candidate : winner, null);
}

export function createClaimPlan(snapshot, localeRules) {
  if (snapshot.storeId !== KARIV_STORE_ID) throw new Error('Not a Kariv snapshot');
  const ids = new Set(snapshot.products.map((row) => row.id));
  const operations = [];
  for (const row of snapshot.products) {
    if (row.store_id !== KARIV_STORE_ID || row.status !== 'active') throw new Error('Unexpected product scope');
    const patch = {}; const changes = [];
    for (const field of PRODUCT_FIELDS) {
      // Base content is English, but legacy rows can contain another supported language.
      const replacement = replaceClaims(row[field], Object.values(localeRules).flat(), { productId: row.id });
      if (replacement.value !== row[field]) {
        patch[field] = replacement.value;
        changes.push(...replacement.changes.map((change) => ({ ...change, field })));
      }
    }
    if (Object.keys(patch).length) operations.push({ table: 'products', id: row.id, productId: row.id, locale: 'source', before: row, patch, changes });
  }
  // Only update the row currently selected by the storefront's alias/timestamp rules.
  // Touching stale aliases would make them newer and could overwrite a human correction.
  const selected = new Map();
  for (const row of snapshot.translations) {
    if (row.store_id !== KARIV_STORE_ID || row.entity_type !== 'product' || !ids.has(row.entity_id)) throw new Error('Unexpected translation scope');
    const locale = String(row.locale || '').trim().toLowerCase().split(/[-_]/)[0];
    if (!localeRules[locale] || !TRANSLATION_FIELDS.has(row.field_name) || !row.value?.trim()) continue;
    const key = translationGroup(row);
    if (!selected.has(key) || newer(row, selected.get(key))) selected.set(key, row);
  }
  for (const row of selected.values()) {
    const locale = row.locale.trim().toLowerCase().split(/[-_]/)[0];
    const replacement = replaceClaims(row.value, localeRules[locale], { productId: row.entity_id });
    if (replacement.value !== row.value) operations.push({ table: 'translations', id: row.id, productId: row.entity_id, locale, before: row, patch: { value: replacement.value }, changes: replacement.changes.map((change) => ({ ...change, field: row.field_name })) });
  }
  return { version: 1, storeId: KARIV_STORE_ID, createdAt: new Date().toISOString(),
    snapshotDigest: digest(snapshot), productsScanned: snapshot.products.length,
    affectedProducts: new Set(operations.map((operation) => operation.productId)).size,
    operations };
}

export function validateOperation(operation, storeId) {
  if (storeId !== KARIV_STORE_ID || operation.before.store_id !== storeId || operation.id !== operation.before.id) throw new Error('Operation outside Kariv');
  const fields = Object.keys(operation.patch);
  if (!fields.length || !operation.before.updated_at) throw new Error('Missing changes or concurrency timestamp');
  if (operation.table === 'products') {
    if (operation.productId !== operation.id || operation.before.status !== 'active' || fields.some((field) => !PRODUCT_FIELDS.includes(field))) throw new Error('Unsafe product change');
  } else if (operation.table === 'translations') {
    if (operation.before.entity_type !== 'product' || operation.before.entity_id !== operation.productId || fields.some((field) => field !== 'value')) throw new Error('Unsafe translation change');
    const locale = String(operation.before.locale || '').trim().toLowerCase().split(/[-_]/)[0];
    if (!TRANSLATION_FIELDS.has(operation.before.field_name) || !['en', 'de', 'cs'].includes(locale) || operation.locale !== locale) throw new Error('Unsafe translation field or locale');
  } else throw new Error('Unsupported table');
  for (const field of fields) {
    if (typeof operation.patch[field] !== 'string') throw new Error('Non-text patch');
    const tags = (text) => (String(text || '').match(/<[^>]*>/g) || []).join('');
    if (tags(operation.before[field]) !== tags(operation.patch[field])) throw new Error('Patch changes markup');
  }
}
