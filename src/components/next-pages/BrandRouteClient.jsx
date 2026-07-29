'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import BrandDetail from '@/pages/BrandDetail';

const BRAND_PAGES = {
  rolex: dynamic(() => import('@/pages/RolexPage')),
  'patek-philippe': dynamic(() => import('@/pages/PatekPhilippePage')),
  omega: dynamic(() => import('@/pages/OmegaPage')),
  cartier: dynamic(() => import('@/pages/CartierPage')),
  hublot: dynamic(() => import('@/pages/HublotPage')),
  breitling: dynamic(() => import('@/pages/BreitlingPage')),
  'audemars-piguet': dynamic(() => import('@/pages/AudemarsPiguetPage')),
  'grand-seiko': dynamic(() => import('@/pages/GrandSeikoPage')),
  'iwc-schaffhausen': dynamic(() => import('@/pages/IWCPage')),
  'jaeger-lecoultre': dynamic(() => import('@/pages/JaegerLeCoultrePage')),
  'tag-heuer': dynamic(() => import('@/pages/TAGHeuerPage')),
  tudor: dynamic(() => import('@/pages/TudorPage')),
  panerai: dynamic(() => import('@/pages/PaneraiPage')),
  bvlgari: dynamic(() => import('@/pages/BvlgariPage')),
  'girard-perregaux': dynamic(() => import('@/pages/GirardPerregauxPage')),
};

export default function BrandRouteClient({ slug, brand, products, collections }) {
  const BrandPage = BRAND_PAGES[slug];
  if (BrandPage) return <BrandPage />;

  return (
    <BrandDetail
      slug={slug}
      initialBrand={brand}
      initialProducts={products}
      initialCollections={collections}
    />
  );
}
