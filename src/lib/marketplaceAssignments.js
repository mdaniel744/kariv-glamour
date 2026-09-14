// Pure planning shared by the admin import, CLI and tests. Never changes data.
import { sellerValidation } from './marketplace.js';
export const OWNERSHIP_FIELDS = ['id', 'dealer_id', 'ownership_verification_status', 'ownership_verified_at',
  'ownership_verified_by', 'merchant_feed_eligible', 'stable_feed_id', 'ownership_changed_at', 'ownership_change_reason', 'ownership_changed_by'];
export function ownershipBackup(products) {
  return products.map(p => Object.fromEntries(OWNERSHIP_FIELDS.map(k => [k, p[k] ?? null])));
}
export function ownershipCounts(products, sellers = []) {
  const bySeller = {}, byStatus = {}, byStock = {}, byOwnership = {};
  for (const p of products) {
    const seller = p.dealer_id || '(unassigned)';
    bySeller[seller] = (bySeller[seller] || 0) + 1;
    byStatus[p.status || '(unknown)'] = (byStatus[p.status || '(unknown)'] || 0) + 1;
    const stock = Number(p.stock_quantity) > 0 ? 'in_stock' : 'no_stock';
    byStock[stock] = (byStock[stock] || 0) + 1;
    const state = p.ownership_verification_status || 'ambiguous';
    byOwnership[state] = (byOwnership[state] || 0) + 1;
  }
  return { totalProducts: products.length, totalSellers: sellers.length, bySeller, byStatus, byStock, byOwnership,
    unassigned: products.filter(p => !p.dealer_id).length, feedEnabled: products.filter(p => p.merchant_feed_eligible).length };
}
export function demoDealers() {
  // Fictional display names only. Keep internal keys stable so existing mappings
  // and permanent seller IDs survive a change in presentation.
  const names = [
    'Vltava Time Atelier', 'Crown & Calibre', 'Meridian Watch House',
    'Aurelian Timepieces', 'Bohemian Watch Gallery', 'Pendulum & Co.',
    'Silver Bridge Watches', 'Northlight Horology', 'The Calibre Room',
    'Cedar & Steel Watches', 'Arc & Anchor Timepieces', 'Astral Watch Gallery',
    'Heritage Hour Atelier', 'Velvet Crown Watches', 'Stonebridge Timepieces',
    'Orion Watch Cabinet', 'Copper Dial Collective', 'Evergreen Watch House',
  ];
  return names.map((name, i) => {
    const n = String(i + 1).padStart(2, '0');
    return { user_id: 'demo-dealer-' + n, seller_type: 'third_party', public_name: name + ' (Demo)',
      legal_name: 'DEMONSTRATION ONLY — ' + name, slug: 'demo-dealer-' + n, is_demo: true,
      approval_status: 'approved', merchant_feed_eligible: false };
  });
}
export function demoPlan(products, { environment = '', sellers = [] } = {}) {
  if (!['development', 'staging'].includes(environment)) throw new Error('Demo assignment is forbidden in production');
  const dealers = demoDealers();
  const candidates = products.filter(p => !p.dealer_id || p.dealer_id.startsWith('demo-dealer-'))
    .filter(p => p.ownership_verification_status !== 'verified')
    .filter(p => p.status === 'active' && Number(p.stock_quantity) > 0)
    .sort((a, b) => String(a.id).localeCompare(String(b.id), 'en'));
  if (candidates.length < 540) throw new Error('540 unassigned, active, in-stock, unverified products are required; existing dealer relationships are preserved');
  for (const d of dealers) {
    const existing = sellers.find(s => s.user_id === d.user_id);
    if (existing && (!existing.is_demo || existing.seller_type !== 'third_party')) throw new Error('Demo ID conflicts with a real seller');
  }
  const plan = candidates.slice(0, 540).map((p, i) => ({
    product_id: p.id, previous_seller: p.dealer_id || null, previous_status: p.ownership_verification_status || null,
    seller_id: dealers[Math.floor(i / 30)].user_id, verification_status: 'demo', reason: 'Deterministic development simulation; not real ownership',
  }));
  // Existing simulated assignments must not drift when new catalogue rows arrive.
  for (const p of products.filter(p => p.dealer_id?.startsWith('demo-dealer-'))) {
    const expected = plan.find(row => row.product_id === p.id);
    if (!expected || expected.seller_id !== p.dealer_id) throw new Error('Dataset changed since demo assignment; use the original snapshot or reviewed rollback');
  }
  return { dealers, plan: plan.filter(p => p.previous_seller !== p.seller_id || p.previous_status !== p.verification_status), mapping: plan };
}
export function validateAssignments(rows, products, sellers, { allowVerifiedOverride = false } = {}) {
  if (!Array.isArray(rows) || rows.length > 5000) throw new Error('Expected at most 5,000 assignments');
  const seen = new Set(), productMap = new Map(products.map(p => [p.id, p])), sellerMap = new Map(sellers.map(s => [s.user_id, s]));
  return rows.map(row => {
    if (seen.has(row.product_id)) throw new Error('Duplicate product: ' + row.product_id);
    seen.add(row.product_id);
    const p = productMap.get(row.product_id), seller = sellerMap.get(row.seller_id);
    if (!p || !seller) throw new Error('Unknown product or seller in this store: ' + row.product_id);
    if (!['verified', 'pending', 'ambiguous', 'rejected'].includes(row.verification_status)) throw new Error('Invalid ownership state');
    if (!String(row.reason || '').trim()) throw new Error('A verified source / change reason is required');
    if (row.verification_status === 'verified' && (seller.approval_status !== 'approved' || seller.deleted_at || sellerValidation(seller).length)) throw new Error('Seller is not eligible for verified production ownership');
    if (p.ownership_verification_status === 'verified' && p.dealer_id !== row.seller_id && !allowVerifiedOverride) throw new Error('Refusing to overwrite verified ownership without explicit override');
    return { product_id: p.id, previous_seller: p.dealer_id || null, previous_status: p.ownership_verification_status || null,
      seller_id: row.seller_id, verification_status: row.verification_status, reason: row.reason.trim() };
  }).filter(p => p.previous_seller !== p.seller_id || p.previous_status !== p.verification_status);
}
const CSV_COLUMNS = ['product_id', 'seller_id', 'verification_status', 'reason'];
export function assignmentCsv(rows) {
  const escape = v => '"' + String(v ?? '').replaceAll('"', '""') + '"';
  return [CSV_COLUMNS.join(','), ...rows.map(row => CSV_COLUMNS.map(k => escape(row[k])).join(','))].join('\r\n');
}
export function parseAssignmentCsv(text) {
  if (typeof text !== 'string' || text.length > 2_000_000) throw new Error('CSV is too large');
  const rows = []; let row = [], cell = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') { if (quoted && text[i + 1] === '"') { cell += '"'; i++; } else quoted = !quoted; }
    else if (!quoted && (c === ',' || c === '\n')) {
      row.push(cell.replace(/\r$/, '')); cell = '';
      if (c === '\n') { rows.push(row); row = []; }
    } else cell += c;
  }
  if (quoted) throw new Error('Unclosed CSV quote');
  if (cell || row.length) { row.push(cell.replace(/\r$/, '')); rows.push(row); }
  const header = rows.shift()?.map(s => s.replace(/^\uFEFF/, '').trim());
  if (!header || header.join(',') !== CSV_COLUMNS.join(',')) throw new Error('CSV headers must be: ' + CSV_COLUMNS.join(','));
  return rows.filter(r => r.some(Boolean)).map(r => {
    if (r.length !== header.length) throw new Error('Invalid CSV row');
    return Object.fromEntries(header.map((h, i) => [h, r[i]]));
  });
}
