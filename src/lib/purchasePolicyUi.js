const PURCHASE_ROUTES = new Set(['kariv_direct', 'dealer_direct', 'escrow', 'manual_review']);
const PUBLIC_POLICY_FIELDS = [
  'sellerType',
  'dealerId',
  'sellerName',
  'purchaseRoute',
  'buyerMayChooseProtection',
];

export function publicPurchasePolicy(policy) {
  if (!policy) return null;
  return Object.fromEntries(PUBLIC_POLICY_FIELDS.map((field) => [field, policy[field]]));
}

/**
 * Normalise the server-computed purchase policy for presentation only.
 *
 * The server remains authoritative when an order is created. The conservative
 * fallback keeps legacy dealer listings on protected checkout until the
 * server has evaluated their dealer tier and direct-sale limit.
 */
export function readPurchasePolicy(product) {
  const source = product?.purchasePolicy || {};
  // Ownership is determined only by the explicit dealer assignment. The
  // record creator may be a Kariv admin and must never be treated as seller.
  const dealerId = source.dealerId || product?.dealerId || null;
  const sellerType = source.sellerType === 'dealer' || dealerId ? 'dealer' : 'kariv';
  const fallbackRoute = sellerType === 'dealer' ? 'escrow' : 'kariv_direct';
  const purchaseRoute = PURCHASE_ROUTES.has(source.purchaseRoute) ? source.purchaseRoute : fallbackRoute;

  return {
    sellerType,
    dealerId,
    sellerName: source.sellerName || product?.dealerName || (sellerType === 'kariv' ? 'Kariv Glamour' : ''),
    dealerTier: source.dealerTier || null,
    purchaseRoute,
    directEligible: source.directEligible === true,
    escrowRequired: purchaseRoute === 'escrow' || source.escrowRequired === true,
    buyerMayChooseProtection:
      sellerType === 'dealer' &&
      purchaseRoute === 'dealer_direct' &&
      source.buyerMayChooseProtection === true,
    directLimitEur: source.directLimitEur == null ? null : Number(source.directLimitEur),
    reasonCodes: Array.isArray(source.reasonCodes) ? source.reasonCodes : [],
  };
}

export function isProtectedPurchase(policy, buyerRequestsProtection = false) {
  return policy.purchaseRoute === 'escrow' ||
    (policy.buyerMayChooseProtection && buyerRequestsProtection === true);
}

export function checkoutPath(productId, buyerRequestsProtection = false) {
  const base = `/checkout/${productId}`;
  return buyerRequestsProtection ? `${base}?protection=kariv` : base;
}
