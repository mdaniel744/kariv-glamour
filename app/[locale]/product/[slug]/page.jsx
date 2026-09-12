import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ProductDetailPageClient from '@/components/next-pages/ProductDetailPageClient';
import { getProductBySlug } from '@/lib/base44Server';
import { ProductDealerSection, RelatedProductsSection } from '@/components/product/ProductPageSections';
import { productSlug } from '@/lib/slug';
import { buildProductMerchantSchema, productMetaDescription } from '@/lib/productMerchant';
import {
  getSiteUrl,
  localizedField,
  localizedMetadata,
  safeJsonLd,
  SUPPORTED_LOCALES,
} from '@/lib/seo';

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) return {};

  const product = await getProductBySlug(slug);
  if (!product) {
    return localizedMetadata({
      locale,
      path: `product/${slug}`,
      title: locale === 'de' ? 'Uhr nicht gefunden' : 'Watch not found',
      description: '',
      index: false,
    });
  }

  const title =
    localizedField(product, 'metaTitle', locale) ||
    localizedField(product, 'productTitle', locale);

  return localizedMetadata({
    locale,
    path: `product/${productSlug(product)}`,
    title,
    description: productMetaDescription(product, locale),
    image: product.featuredImage || product.productImages?.[0],
    type: 'website',
    index: product.isPublished === true,
  });
}

export default async function ProductPage({ params }) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const name = localizedField(product, 'productTitle', locale);
  const siteUrl = getSiteUrl();
  const productUrl = `${siteUrl}/${locale}/product/${productSlug(product)}`;

  const jsonLd = [
    buildProductMerchantSchema(product, { locale, url: productUrl }),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: locale === 'de' ? 'Startseite' : 'Home', item: `${siteUrl}/${locale}` },
        { '@type': 'ListItem', position: 2, name: locale === 'de' ? 'Shop' : 'Shop', item: `${siteUrl}/${locale}/shop` },
        { '@type': 'ListItem', position: 3, name, item: productUrl },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <ProductDetailPageClient
        key={product.id}
        product={product}
        dealerSlot={(product.dealerId || product.created_by_id) ? (
          <Suspense fallback={<div aria-busy="true" className="h-20 rounded-xl border border-border bg-card motion-safe:animate-pulse" />}>
            <ProductDealerSection product={product} />
          </Suspense>
        ) : null}
        relatedSlot={(
          <Suspense fallback={null}>
            <RelatedProductsSection product={product} />
          </Suspense>
        )}
      />
    </>
  );
}
