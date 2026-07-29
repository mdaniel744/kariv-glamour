import DealerPageClient from '@/components/next-pages/DealerPageClient';

export default async function DealerListingPage({ params }) {
  const { id } = await params;
  return <DealerPageClient pageKey="listingForm" id={id} />;
}
