'use client';

import React from 'react';
import Checkout from '@/pages/Checkout';

export default function CheckoutPageClient({ product }) {
  return <Checkout id={product.id} initialProduct={product} />;
}
