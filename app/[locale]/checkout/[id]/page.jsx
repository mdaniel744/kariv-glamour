import { notFound } from 'next/navigation';
import CheckoutPageClient from '@/components/next-pages/CheckoutPageClient';
import ProtectedArea from '@/components/next-pages/ProtectedArea';
import { getProductById } from '@/lib/base44Server';
import { localizedField, localizedMetadata, SUPPORTED_LOCALES } from '@/lib/seo';
import { getCzkExchangeRates } from '@/lib/exchangeRatesServer';
import { CurrencyProvider } from '@/lib/currencyContext';
import { getProductPurchasePolicy } from '@/lib/purchasePolicyServer';
import { publicPurchasePolicy } from '@/lib/purchasePolicyUi';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { locale, id } = await params;
  const product = await getProductById(id);
  const productName = localizedField(product, 'productTitle', locale);
  const title = locale === 'cs' ? `Objednávka — ${productName}` : locale === 'de' ? `Bestellung — ${productName}` : `Checkout — ${productName}`;

  return localizedMetadata({
    locale,
    path: `checkout/${id}`,
    title,
    description: '',
    index: false,
  });
}

export default async function CheckoutRoute({ params, searchParams }) {
  const { locale, id } = await params;
  const query = await searchParams;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();

  const product = await getProductById(id);
  if (!product) notFound();
  const [rawPurchasePolicy, exchangeRates] = await Promise.all([
    getProductPurchasePolicy(product),
    locale === 'cs' ? getCzkExchangeRates() : Promise.resolve(null),
  ]);
  const purchasePolicy = publicPurchasePolicy(rawPurchasePolicy);
  const productWithPolicy = { ...product, purchasePolicy };

  return (
    <ProtectedArea>
      <CurrencyProvider exchangeRates={exchangeRates}>
        <CheckoutPageClient product={productWithPolicy} buyerRequestsProtection={query?.protection === 'kariv'} />
      </CurrencyProvider>
    </ProtectedArea>
  );
}
