import PortalPageClient from '@/components/next-pages/PortalPageClient';

export default async function PortalListingPage({ params }) {
  const { id } = await params;
  return <PortalPageClient pageKey="listingForm" id={id} />;
}
