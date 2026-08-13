'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ADMIN_PAGES = {
  dashboard: dynamic(() => import('@/page-content/admin/AdminDashboard')),
  products: dynamic(() => import('@/page-content/admin/AdminProducts')),
  brands: dynamic(() => import('@/page-content/admin/AdminBrands')),
  collections: dynamic(() => import('@/page-content/admin/AdminCollections')),
  orders: dynamic(() => import('@/page-content/admin/AdminOrders')),
  orderDetail: dynamic(() => import('@/page-content/admin/AdminOrderDetail')),
  customers: dynamic(() => import('@/page-content/admin/AdminCustomers')),
  guides: dynamic(() => import('@/page-content/admin/AdminGuides')),
  legal: dynamic(() => import('@/page-content/admin/AdminLegal')),
  faq: dynamic(() => import('@/page-content/admin/AdminFAQ')),
  dealerApplications: dynamic(() => import('@/page-content/admin/AdminDealerApplications')),
  dealerReviews: dynamic(() => import('@/page-content/admin/AdminDealerReviews')),
  translations: dynamic(() => import('@/page-content/admin/AdminTranslationDashboard')),
  glossary: dynamic(() => import('@/page-content/admin/AdminGlossary')),
  strings: dynamic(() => import('@/page-content/admin/AdminStrings')),
  translationSettings: dynamic(() => import('@/page-content/admin/AdminTranslationSettings')),
  translationLogs: dynamic(() => import('@/page-content/admin/AdminTranslationLogs')),
};

export default function AdminPageClient({ pageKey, id }) {
  const Page = ADMIN_PAGES[pageKey];
  return Page ? <Page id={id} /> : null;
}
