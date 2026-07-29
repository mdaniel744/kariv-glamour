'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const LANDING_PAGES = {
  rolex: dynamic(() => import('@/pages/RolexSeoLanding')),
  patekPhilippe: dynamic(() => import('@/pages/PatekPhilippeSeoLanding')),
  omega: dynamic(() => import('@/pages/OmegaSeoLanding')),
  cartier: dynamic(() => import('@/pages/CartierSeoLanding')),
  hublot: dynamic(() => import('@/pages/HublotSeoLanding')),
  breitling: dynamic(() => import('@/pages/BreitlingSeoLanding')),
  audemarsPiguet: dynamic(() => import('@/pages/AudemarsPiguetSeoLanding')),
  grandSeiko: dynamic(() => import('@/pages/GrandSeikoSeoLanding')),
  iwc: dynamic(() => import('@/pages/IWCSeoLanding')),
  jaegerLeCoultre: dynamic(() => import('@/pages/JaegerLeCoultreSeoLanding')),
  tagHeuer: dynamic(() => import('@/pages/TAGHeuerSeoLanding')),
  tudor: dynamic(() => import('@/pages/TudorSeoLanding')),
  panerai: dynamic(() => import('@/pages/PaneraiSeoLanding')),
  bvlgari: dynamic(() => import('@/pages/BvlgariSeoLanding')),
  girardPerregaux: dynamic(() => import('@/pages/GirardPerregauxSeoLanding')),
};

export default function SeoLandingRouteClient({ pageKey, slug }) {
  const Page = LANDING_PAGES[pageKey];
  return Page ? <Page slug={slug} /> : null;
}
