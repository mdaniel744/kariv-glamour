'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const PORTAL_PAGES = {
  dashboard: dynamic(() => import('@/pages/portal/PortalDashboard')),
  orders: dynamic(() => import('@/pages/portal/PortalOrders')),
  orderDetail: dynamic(() => import('@/pages/portal/PortalOrderDetail')),
  mails: dynamic(() => import('@/pages/portal/PortalMails')),
  wishlist: dynamic(() => import('@/pages/Wishlist')),
  profile: dynamic(() => import('@/pages/portal/PortalProfile')),
  becomeDealer: dynamic(() => import('@/pages/portal/PortalBecomeDealer')),
};

export default function PortalPageClient({ pageKey, id }) {
  const Page = PORTAL_PAGES[pageKey];
  return Page ? <Page id={id} /> : null;
}
