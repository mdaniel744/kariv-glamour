'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import BrandDetail from '@/page-content/BrandDetail';
import BrandCatalogProvider from '@/components/shared/BrandCatalogProvider';

const BRAND_PAGES = {
  rolex: dynamic(() => import('@/page-content/RolexPage')),
  'patek-philippe': dynamic(() => import('@/page-content/PatekPhilippePage')),
  omega: dynamic(() => import('@/page-content/OmegaPage')),
  cartier: dynamic(() => import('@/page-content/CartierPage')),
  hublot: dynamic(() => import('@/page-content/HublotPage')),
  breitling: dynamic(() => import('@/page-content/BreitlingPage')),
  'audemars-piguet': dynamic(() => import('@/page-content/AudemarsPiguetPage')),
  'grand-seiko': dynamic(() => import('@/page-content/GrandSeikoPage')),
  'iwc-schaffhausen': dynamic(() => import('@/page-content/IWCPage')),
  'jaeger-lecoultre': dynamic(() => import('@/page-content/JaegerLeCoultrePage')),
  'tag-heuer': dynamic(() => import('@/page-content/TAGHeuerPage')),
  tudor: dynamic(() => import('@/page-content/TudorPage')),
  panerai: dynamic(() => import('@/page-content/PaneraiPage')),
  bvlgari: dynamic(() => import('@/page-content/BvlgariPage')),
  'girard-perregaux': dynamic(() => import('@/page-content/GirardPerregauxPage')),
};

export default function BrandRouteClient({ slug, brand, products, collections }) {
  const BrandPage = BRAND_PAGES[slug];
  if (BrandPage) return (
    <BrandCatalogProvider key={slug} slug={slug} brand={brand} products={products} collections={collections}>
      <BrandPage />
    </BrandCatalogProvider>
  );

  return (
    <BrandDetail
      key={slug}
      slug={slug}
      initialBrand={brand}
      initialProducts={products ?? []}
      initialCollections={collections ?? []}
    />
  );
}
