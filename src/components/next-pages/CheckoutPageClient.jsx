'use client';

import React from 'react';
import Checkout from '@/page-content/Checkout';

export default function CheckoutPageClient({ product, buyerRequestsProtection = false }) {
  return <Checkout id={product.id} initialProduct={product} initialBuyerRequestsProtection={buyerRequestsProtection} />;
}
