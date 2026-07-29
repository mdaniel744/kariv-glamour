import { notFound } from 'next/navigation';
import ProductDetailPageClient from '@/components/next-pages/ProductDetailPageClient';
import { getProductBySlug, getRelatedProducts } from '@/lib/base44Server';
import { productSlug } from '@/lib/slug';
import {
  getSiteUrl,
  localizedField,
  localizedMetadata,
  safeJsonLd,
  SUPPORTED_LOCALES,
} from '@/lib/seo';

export const revalidate = 300;

function productDescription(product, locale) {
  const description =
    localizedField(product, 'metaDescription', locale) ||
    localizedField(product, 'shortDescription', locale) ||
    localizedField(product, 'productDescription', locale);
  return description ? description.slice(0, 320) : '';
}

function productAvailability(value) {
  if (value === 'In Stock') return 'https://schema.org/InStock';
  if (value === 'Reserved') return 'https://schema.org/PreOrder';
  if (value === 'Coming Soon') return 'https://schema.org/PreOrder';
  return 'https://schema.org/OutOfStock';
}

function productCondition(value) {
  return value === 'New' || value === 'Unworn'
    ? 'https://schema.org/NewCondition'
    : 'https://schema.org/UsedCondition';
}

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
    description: productDescription(product, locale),
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

  const relatedProducts = await getRelatedProducts(product);
  const name = localizedField(product, 'productTitle', locale);
  const description = productDescription(product, locale);
  const siteUrl = getSiteUrl();
  const productUrl = `${siteUrl}/${locale}/product/${productSlug(product)}`;
  const image = product.featuredImage || product.productImages?.[0];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${productUrl}#product`,
      name,
      description,
      image: product.productImages?.length ? product.productImages : image ? [image] : undefined,
      sku: product.sku || undefined,
      mpn: product.referenceNumber || undefined,
      brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
      category: 'Luxury Watches',
      offers: {
        '@type': 'Offer',
        url: productUrl,
        price: product.salePrice || product.price,
        priceCurrency: product.currency || 'EUR',
        availability: productAvailability(product.availability),
        itemCondition: productCondition(product.condition),
      },
    },
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
      <ProductDetailPageClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
