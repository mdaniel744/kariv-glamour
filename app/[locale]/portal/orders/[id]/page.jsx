import PortalPageClient from '@/components/next-pages/PortalPageClient';

export default async function PortalOrderPage({ params }) {
  const { id } = await params;
  return <PortalPageClient pageKey="orderDetail" id={id} />;
}
