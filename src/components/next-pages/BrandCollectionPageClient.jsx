'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const COLLECTION_PAGES = {
  rolex: dynamic(() => import('@/page-content/RolexCollectionPage')),
  patekPhilippe: dynamic(() => import('@/page-content/PatekPhilippeCollectionPage')),
  omega: dynamic(() => import('@/page-content/OmegaCollectionPage')),
  cartier: dynamic(() => import('@/page-content/CartierCollectionPage')),
  hublot: dynamic(() => import('@/page-content/HublotCollectionPage')),
  breitling: dynamic(() => import('@/page-content/BreitlingCollectionPage')),
  audemarsPiguet: dynamic(() => import('@/page-content/AudemarsPiguetCollectionPage')),
  grandSeiko: dynamic(() => import('@/page-content/GrandSeikoCollectionPage')),
  iwc: dynamic(() => import('@/page-content/IWCCollectionPage')),
  jaegerLeCoultre: dynamic(() => import('@/page-content/JaegerLeCoultreCollectionPage')),
  tagHeuer: dynamic(() => import('@/page-content/TAGHeuerCollectionPage')),
  tudor: dynamic(() => import('@/page-content/TudorCollectionPage')),
  panerai: dynamic(() => import('@/page-content/PaneraiCollectionPage')),
  bvlgari: dynamic(() => import('@/page-content/BvlgariCollectionPage')),
  girardPerregaux: dynamic(() => import('@/page-content/GirardPerregauxCollectionPage')),
};

export default function BrandCollectionPageClient({ pageKey, slug }) {
  const Page = COLLECTION_PAGES[pageKey];
  return Page ? <Page slug={slug} /> : null;
}
