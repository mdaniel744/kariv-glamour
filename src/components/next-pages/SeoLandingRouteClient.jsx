'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const LANDING_PAGES = {
  rolex: dynamic(() => import('@/page-content/RolexSeoLanding')),
  patekPhilippe: dynamic(() => import('@/page-content/PatekPhilippeSeoLanding')),
  omega: dynamic(() => import('@/page-content/OmegaSeoLanding')),
  cartier: dynamic(() => import('@/page-content/CartierSeoLanding')),
  hublot: dynamic(() => import('@/page-content/HublotSeoLanding')),
  breitling: dynamic(() => import('@/page-content/BreitlingSeoLanding')),
  audemarsPiguet: dynamic(() => import('@/page-content/AudemarsPiguetSeoLanding')),
  grandSeiko: dynamic(() => import('@/page-content/GrandSeikoSeoLanding')),
  iwc: dynamic(() => import('@/page-content/IWCSeoLanding')),
  jaegerLeCoultre: dynamic(() => import('@/page-content/JaegerLeCoultreSeoLanding')),
  tagHeuer: dynamic(() => import('@/page-content/TAGHeuerSeoLanding')),
  tudor: dynamic(() => import('@/page-content/TudorSeoLanding')),
  panerai: dynamic(() => import('@/page-content/PaneraiSeoLanding')),
  bvlgari: dynamic(() => import('@/page-content/BvlgariSeoLanding')),
  girardPerregaux: dynamic(() => import('@/page-content/GirardPerregauxSeoLanding')),
};

export default function SeoLandingRouteClient({ pageKey, slug }) {
  const Page = LANDING_PAGES[pageKey];
  return Page ? <Page slug={slug} /> : null;
}
