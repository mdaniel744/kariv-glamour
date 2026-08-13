import { notFound } from 'next/navigation';
import AdminPageClient from '@/components/next-pages/AdminPageClient';

const ADMIN_ROUTES = {
  '': 'dashboard',
  products: 'products',
  brands: 'brands',
  collections: 'collections',
  orders: 'orders',
  customers: 'customers',
  guides: 'guides',
  legal: 'legal',
  faq: 'faq',
  'dealer-applications': 'dealerApplications',
  'dealer-reviews': 'dealerReviews',
  translations: 'translations',
  glossary: 'glossary',
  strings: 'strings',
  'translation-settings': 'translationSettings',
  'translation-logs': 'translationLogs',
};

export default async function AdminPage({ params }) {
  const { path = [] } = await params;

  if (path.length === 2 && path[0] === 'orders' && path[1]) {
    return <AdminPageClient pageKey="orderDetail" id={path[1]} />;
  }

  if (path.length > 1) notFound();
  const pageKey = ADMIN_ROUTES[path[0] || ''];
  if (!pageKey) notFound();

  return <AdminPageClient pageKey={pageKey} />;
}
