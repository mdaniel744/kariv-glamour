import { notFound } from 'next/navigation';
import BrandRouteClient from '@/components/next-pages/BrandRouteClient';
import { getBrandBySlug, getBrandPageData } from '@/lib/base44Server';
import { BRAND_DATA } from '@/lib/constants';
import { brandCatalogProduct } from '@/lib/brandCatalogProduct';
import {
  getSiteUrl,
  localizedArray,
  localizedField,
  localizedMetadata,
  safeJsonLd,
  SUPPORTED_LOCALES,
} from '@/lib/seo';

export const revalidate = 900;

function staticBrandForSlug(slug) {
  return BRAND_DATA.find((brand) => brand.slug === slug) || null;
}

function fallbackDescription(name, locale) {
  if (locale === 'cs') return `Prohlédněte si luxusní hodinky ${name}. Porovnejte kolekce, reference, stav a podrobnosti jednotlivých nabídek na Kariv Glamour.`;
  return locale === 'de'
    ? `Entdecken Sie authentische ${name} Luxusuhren bei Kariv Glamour – mit transparenten Produktdetails, sicherer Abwicklung und internationaler Lieferung.`
    : `Discover authentic ${name} luxury watches at Kariv Glamour, with transparent product details, secure checkout, and international delivery.`;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) return {};

  const [brand, staticBrand] = await Promise.all([
    getBrandBySlug(slug),
    Promise.resolve(staticBrandForSlug(slug)),
  ]);
  const name = localizedField(brand, 'brandName', locale) || staticBrand?.name || slug;
  const title =
    (locale === 'cs' && (brand?.seoTitle_cs || `Hodinky ${name}`)) ||
    localizedField(brand, 'seoTitle', locale) ||
    (locale === 'de' ? `${name} Uhren kaufen` : `Buy ${name} Watches`);
  const description =
    (locale === 'cs' && (brand?.seoDescription_cs || brand?.shortDescription_cs || fallbackDescription(name, locale))) ||
    localizedField(brand, 'seoDescription', locale) ||
    localizedField(brand, 'shortDescription', locale) ||
    fallbackDescription(name, locale);

  return localizedMetadata({
    locale,
    path: `brands/${slug}`,
    title,
    description,
    image: brand?.heroImage || staticBrand?.heroImage,
  });
}

export default async function BrandPage({ params }) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();

  const staticBrand = staticBrandForSlug(slug);
  const data = await getBrandPageData(slug, staticBrand?.name, locale);
  if (!staticBrand && !data.brand) notFound();

  const name = localizedField(data.brand, 'brandName', locale) || staticBrand?.name || slug;
  const description =
    (locale === 'cs' && (data.brand?.seoDescription_cs || data.brand?.shortDescription_cs || fallbackDescription(name, locale))) ||
    localizedField(data.brand, 'seoDescription', locale) ||
    localizedField(data.brand, 'shortDescription', locale) ||
    fallbackDescription(name, locale);
  const siteUrl = getSiteUrl();
  const brandUrl = `${siteUrl}/${locale}/brands/${slug}`;
  const faqs = locale === 'cs' && !data.brand?.faqs_cs ? [] : localizedArray(data.brand, 'faqs', locale);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Brand',
      '@id': `${brandUrl}#brand`,
      name,
      description,
      logo: data.brand?.brandLogoLight || undefined,
      url: brandUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: locale === 'cs' ? 'Úvod' : locale === 'de' ? 'Startseite' : 'Home', item: `${siteUrl}/${locale}` },
        { '@type': 'ListItem', position: 2, name: locale === 'cs' ? 'Značky' : locale === 'de' ? 'Marken' : 'Brands', item: `${siteUrl}/${locale}/brands` },
        { '@type': 'ListItem', position: 3, name, item: brandUrl },
      ],
    },
    ...(faqs.length > 0
      ? [{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }]
      : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <BrandRouteClient
        slug={slug}
        brand={data.brand}
        products={data.products?.map(brandCatalogProduct) ?? null}
        collections={data.collections}
      />
    </>
  );
}
