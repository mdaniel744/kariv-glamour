'use client';

import React from 'react';
import Brands from '@/pages/Brands';

export default function BrandsPageClient({ brands }) {
  return <Brands initialBrands={brands} />;
}
