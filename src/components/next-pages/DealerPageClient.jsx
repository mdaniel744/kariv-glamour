'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const DEALER_PAGES = {
  dashboard: dynamic(() => import('@/pages/dealer/DealerDashboard')),
  listings: dynamic(() => import('@/pages/dealer/DealerListings')),
  listingForm: dynamic(() => import('@/pages/dealer/DealerListingForm')),
  sales: dynamic(() => import('@/pages/dealer/DealerSales')),
  profile: dynamic(() => import('@/pages/dealer/DealerProfileSettings')),
};

export default function DealerPageClient({ pageKey, id }) {
  const Page = DEALER_PAGES[pageKey];
  return Page ? <Page id={id} /> : null;
}
