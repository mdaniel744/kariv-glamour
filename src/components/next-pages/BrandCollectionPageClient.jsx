'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const COLLECTION_PAGES = {
  rolex: dynamic(() => import('@/pages/RolexCollectionPage')),
  patekPhilippe: dynamic(() => import('@/pages/PatekPhilippeCollectionPage')),
  omega: dynamic(() => import('@/pages/OmegaCollectionPage')),
  cartier: dynamic(() => import('@/pages/CartierCollectionPage')),
  hublot: dynamic(() => import('@/pages/HublotCollectionPage')),
  breitling: dynamic(() => import('@/pages/BreitlingCollectionPage')),
  audemarsPiguet: dynamic(() => import('@/pages/AudemarsPiguetCollectionPage')),
  grandSeiko: dynamic(() => import('@/pages/GrandSeikoCollectionPage')),
  iwc: dynamic(() => import('@/pages/IWCCollectionPage')),
  jaegerLeCoultre: dynamic(() => import('@/pages/JaegerLeCoultreCollectionPage')),
  tagHeuer: dynamic(() => import('@/pages/TAGHeuerCollectionPage')),
  tudor: dynamic(() => import('@/pages/TudorCollectionPage')),
  panerai: dynamic(() => import('@/pages/PaneraiCollectionPage')),
  bvlgari: dynamic(() => import('@/pages/BvlgariCollectionPage')),
  girardPerregaux: dynamic(() => import('@/pages/GirardPerregauxCollectionPage')),
};

export default function BrandCollectionPageClient({ pageKey, slug }) {
  const Page = COLLECTION_PAGES[pageKey];
  return Page ? <Page slug={slug} /> : null;
}
