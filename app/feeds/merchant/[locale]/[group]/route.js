import { loadMerchantFeed } from '@/lib/merchantFeedServer';
import { merchantFeedXml } from '@/lib/merchantFeed';
export const dynamic = 'force-dynamic';
export async function GET(_request, { params }) {
  const { locale, group } = await params;
  const types = { 'kariv.xml': 'marketplace_owned', 'dealers.xml': 'third_party' };
  if (!['cs', 'de'].includes(locale) || !types[group]) return new Response('Not found', { status: 404 });
  try {
    const feed = await loadMerchantFeed(locale, types[group]);
    return new Response(merchantFeedXml(feed), { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
  } catch {
    return new Response('Feed temporarily unavailable', { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
