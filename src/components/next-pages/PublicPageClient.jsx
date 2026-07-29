'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const PUBLIC_PAGES = {
  about: dynamic(() => import('@/pages/About')),
  authentication: dynamic(() => import('@/pages/Authentication')),
  buyerProtection: dynamic(() => import('@/pages/BuyerProtection')),
  customerService: dynamic(() => import('@/pages/CustomerService')),
  sellTrade: dynamic(() => import('@/pages/SellTrade')),
  guides: dynamic(() => import('@/pages/Guides')),
  cart: dynamic(() => import('@/pages/Cart')),
  wishlist: dynamic(() => import('@/pages/Wishlist')),
};

export default function PublicPageClient({ pageKey }) {
  const Page = PUBLIC_PAGES[pageKey];
  return Page ? <Page /> : null;
}
