'use client';

import React from 'react';
import Checkout from '@/page-content/Checkout';

export default function CheckoutPageClient({ product }) {
  return <Checkout id={product.id} initialProduct={product} />;
}
