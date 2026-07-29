'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const DEALER_PAGES = {
  dashboard: dynamic(() => import('@/page-content/dealer/DealerDashboard')),
  listings: dynamic(() => import('@/page-content/dealer/DealerListings')),
  listingForm: dynamic(() => import('@/page-content/dealer/DealerListingForm')),
  sales: dynamic(() => import('@/page-content/dealer/DealerSales')),
  profile: dynamic(() => import('@/page-content/dealer/DealerProfileSettings')),
};

export default function DealerPageClient({ pageKey, id }) {
  const Page = DEALER_PAGES[pageKey];
  return Page ? <Page id={id} /> : null;
}
