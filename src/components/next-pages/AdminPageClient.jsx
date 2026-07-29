'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ADMIN_PAGES = {
  dashboard: dynamic(() => import('@/pages/admin/AdminDashboard')),
  products: dynamic(() => import('@/pages/admin/AdminProducts')),
  brands: dynamic(() => import('@/pages/admin/AdminBrands')),
  collections: dynamic(() => import('@/pages/admin/AdminCollections')),
  orders: dynamic(() => import('@/pages/admin/AdminOrders')),
  orderDetail: dynamic(() => import('@/pages/admin/AdminOrderDetail')),
  customers: dynamic(() => import('@/pages/admin/AdminCustomers')),
  guides: dynamic(() => import('@/pages/admin/AdminGuides')),
  legal: dynamic(() => import('@/pages/admin/AdminLegal')),
  faq: dynamic(() => import('@/pages/admin/AdminFAQ')),
  dealerApplications: dynamic(() => import('@/pages/admin/AdminDealerApplications')),
  translations: dynamic(() => import('@/pages/admin/AdminTranslationDashboard')),
  glossary: dynamic(() => import('@/pages/admin/AdminGlossary')),
  strings: dynamic(() => import('@/pages/admin/AdminStrings')),
  translationSettings: dynamic(() => import('@/pages/admin/AdminTranslationSettings')),
  translationLogs: dynamic(() => import('@/pages/admin/AdminTranslationLogs')),
};

export default function AdminPageClient({ pageKey, id }) {
  const Page = ADMIN_PAGES[pageKey];
  return Page ? <Page id={id} /> : null;
}
