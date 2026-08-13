'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const PORTAL_PAGES = {
  dashboard: dynamic(() => import('@/page-content/portal/PortalDashboard')),
  orders: dynamic(() => import('@/page-content/portal/PortalOrders')),
  orderDetail: dynamic(() => import('@/page-content/portal/PortalOrderDetail')),
  mails: dynamic(() => import('@/page-content/portal/PortalMails')),
  wishlist: dynamic(() => import('@/page-content/Wishlist')),
  profile: dynamic(() => import('@/page-content/portal/PortalProfile')),
  becomeDealer: dynamic(() => import('@/page-content/portal/PortalBecomeDealer')),
  listings: dynamic(() => import('@/page-content/portal/PortalListings')),
  listingForm: dynamic(() => import('@/page-content/portal/PortalListingForm')),
  sales: dynamic(() => import('@/page-content/portal/PortalSales')),
  salesMessages: dynamic(() => import('@/page-content/portal/PortalSalesMessages')),
};

export default function PortalPageClient({ pageKey, id }) {
  const Page = PORTAL_PAGES[pageKey];
  return Page ? <Page id={id} /> : null;
}
