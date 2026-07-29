'use client';

import React from 'react';
import ProductDetail from '@/page-content/ProductDetail';

export default function ProductDetailPageClient({ product, relatedProducts }) {
  return (
    <ProductDetail
      id={product.id}
      initialProduct={product}
      initialRelated={relatedProducts}
    />
  );
}
