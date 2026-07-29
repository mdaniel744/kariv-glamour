'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const PUBLIC_PAGES = {
  about: dynamic(() => import('@/page-content/About')),
  authentication: dynamic(() => import('@/page-content/Authentication')),
  buyerProtection: dynamic(() => import('@/page-content/BuyerProtection')),
  customerService: dynamic(() => import('@/page-content/CustomerService')),
  sellTrade: dynamic(() => import('@/page-content/SellTrade')),
  guides: dynamic(() => import('@/page-content/Guides')),
  cart: dynamic(() => import('@/page-content/Cart')),
  wishlist: dynamic(() => import('@/page-content/Wishlist')),
};

export default function PublicPageClient({ pageKey }) {
  const Page = PUBLIC_PAGES[pageKey];
  return Page ? <Page /> : null;
}
