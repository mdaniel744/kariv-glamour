import PublicPageClient from '@/components/next-pages/PublicPageClient';
import { publicPageMetadata } from '@/lib/publicPageMetadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return publicPageMetadata(locale, 'wishlist', 'wishlist', false);
}

export default function WishlistPage() {
  return <PublicPageClient pageKey="wishlist" />;
}
