// Escrow and payment constants
// NOTE: Hardcoded wallet addresses have been REMOVED.
// Crypto payments are now handled through a provider adapter pattern
// via backend functions (createCryptoCheckout, cryptoPaymentWebhook, etc.)
// Bank transfer details should come from server-side configuration.

export const ESCROW_STATUSES = [
  'pending_review',
  'dealer_accepted',
  'funds_secured',
  'shipped',
  'verified',
  'funds_released',
  'cancelled'
];

export const ESCROW_STATUS_LABELS = {
  pending_review: 'Pending Dealer Review',
  dealer_accepted: 'Dealer Accepted — Awaiting Payment',
  funds_secured: 'Funds Secured',
  shipped: 'Watch Shipped',
  verified: 'Delivery Confirmed',
  funds_released: 'Funds Released to Dealer',
  cancelled: 'Order Cancelled'
};

export const ESCROW_STATUS_DESCRIPTIONS = {
  pending_review: 'Our Kariv team is verifying availability with the dealer.',
  dealer_accepted: 'The dealer confirmed availability. Please proceed with payment.',
  funds_secured: 'Your payment is secured. The dealer has been instructed to ship.',
  shipped: 'Your watch is on the way. Tracking information will appear here.',
  verified: 'You have confirmed receipt. Funds will be released to the dealer shortly.',
  funds_released: 'Transaction complete. Funds have been released to the dealer.',
  cancelled: 'This order has been cancelled.'
};

export const ESCROW_STEPS = [
  { key: 'pending_review', label: 'Order Placed', description: 'Verifying with dealer' },
  { key: 'dealer_accepted', label: 'Dealer Confirmed', description: 'Awaiting your payment' },
  { key: 'funds_secured', label: 'Payment Secured', description: 'Payment confirmed' },
  { key: 'shipped', label: 'Shipped', description: 'Watch in transit' },
  { key: 'verified', label: 'Delivered', description: 'You confirmed receipt' },
  { key: 'funds_released', label: 'Complete', description: 'Funds released' }
];

// Payment methods — crypto details are now fetched dynamically from the
// backend createCryptoCheckout function, not hardcoded here.
export const PAYMENT_METHODS = [
  {
    key: 'bank_transfer',
    label: 'Bank Transfer',
    description: 'Transfer to our escrow bank account with your order reference.',
    icon: 'Building2'
  },
  {
    key: 'crypto',
    label: 'Cryptocurrency',
    description: 'Pay with crypto via our secure payment provider.',
    icon: 'Bitcoin'
  }
];

export const USER_ROLES = {
  BUYER: 'buyer',
  DEALER: 'dealer',
  ADMIN: 'admin',
  LEGACY_USER: 'user'
};

export function isDealer(user) {
  return user?.role === 'dealer';
}

export function isAdmin(user) {
  return user?.role === 'admin';
}

// Valid escrow state transitions — enforced server-side in processOrder
export const ESCROW_TRANSITIONS = {
  pending_review: ['dealer_accepted', 'cancelled'],
  dealer_accepted: ['funds_secured', 'cancelled'],
  funds_secured: ['shipped', 'cancelled'],
  shipped: ['verified'],
  verified: ['funds_released'],
  funds_released: [],
  cancelled: []
};

export function isValidEscrowTransition(from, to) {
  const allowed = ESCROW_TRANSITIONS[from];
  return allowed ? allowed.includes(to) : false;
}