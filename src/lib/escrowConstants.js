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
  funds_secured: 'Funds Secured in Escrow',
  shipped: 'Watch Shipped',
  verified: 'Delivery Confirmed',
  funds_released: 'Funds Released to Dealer',
  cancelled: 'Order Cancelled'
};

export const ESCROW_STATUS_DESCRIPTIONS = {
  pending_review: 'Our Kariv team is verifying availability with the dealer.',
  dealer_accepted: 'The dealer confirmed availability. Please proceed with payment.',
  funds_secured: 'Your payment is safely held in escrow. The dealer has been instructed to ship.',
  shipped: 'Your watch is on the way. Tracking information will appear here.',
  verified: 'You have confirmed receipt. Funds will be released to the dealer shortly.',
  funds_released: 'Transaction complete. Funds have been released to the dealer.',
  cancelled: 'This order has been cancelled.'
};

export const ESCROW_STEPS = [
  { key: 'pending_review', label: 'Order Placed', description: 'Verifying with dealer' },
  { key: 'dealer_accepted', label: 'Dealer Confirmed', description: 'Awaiting your payment' },
  { key: 'funds_secured', label: 'Escrow Funded', description: 'Payment secured' },
  { key: 'shipped', label: 'Shipped', description: 'Watch in transit' },
  { key: 'verified', label: 'Delivered', description: 'You confirmed receipt' },
  { key: 'funds_released', label: 'Complete', description: 'Funds released' }
];

export const PAYMENT_METHODS = [
  {
    key: 'bank_transfer',
    label: 'Bank Transfer',
    description: 'Transfer to our escrow bank account with your order reference.',
    icon: 'Building2',
    details: {
      bankName: 'Kariv Glamour Escrow Account',
      iban: 'DE89 3704 0044 0532 0130 00',
      bic: 'COBADEFFXXX',
      reference: 'Use your Escrow Reference number'
    }
  },
  {
    key: 'credit_card',
    label: 'Credit Card',
    description: 'Pay securely with Visa, Mastercard, or American Express.',
    icon: 'CreditCard'
  },
  {
    key: 'crypto',
    label: 'Cryptocurrency',
    description: 'Pay with BTC, ETH, or USDT. Funds held in escrow until delivery.',
    icon: 'Bitcoin',
    details: {
      btcAddress: 'bc1qkarivglam0urescrowservice001',
      ethAddress: '0xKarivEscrowServiceAddress',
      usdtAddress: '0xKarivEscrowServiceAddress',
      note: 'Send the exact amount and include your Escrow Reference in the memo.'
    }
  }
];

export const USER_ROLES = {
  BUYER: 'buyer',
  DEALER: 'dealer',
  ADMIN: 'admin',
  LEGACY_USER: 'user'
};

export function isDealer(user) {
  return user?.role === 'dealer' || user?.role === 'admin';
}

export function isAdmin(user) {
  return user?.role === 'admin';
}