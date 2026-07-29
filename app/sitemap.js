import { BRAND_DATA } from '@/lib/constants';
import { SEO_LANDING_ROUTES } from '@/lib/brandSeoRegistry';
import { BRAND_COLLECTION_ROUTES } from '@/lib/brandCollectionRegistry';
import { getLegalPages, getPublishedProducts } from '@/lib/base44Server';
import { getSiteUrl, SUPPORTED_LOCALES } from '@/lib/seo';
import { productSlug } from '@/lib/slug';

export const revalidate = 3600;

export default async function sitemap() {
  const siteUrl = getSiteUrl();
  const [products, legalPages] = await Promise.all([
    getPublishedProducts(),
    getLegalPages(),
  ]);
  const entries = [];
  const publicPaths = [
    '/about',
    '/authentication',
    '/buyer-protection',
    '/customer-service',
    '/sell-trade',
    '/guides',
  ];

  for (const locale of SUPPORTED_LOCALES) {
    const localized = (path = '') => `${siteUrl}/${locale}${path}`;

    entries.push(
      {
        url: localized(),
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
        alternates: {
          languages: {
            de: `${siteUrl}/de`,
            en: `${siteUrl}/en`,
          },
        },
      },
      {
        url: localized('/shop'),
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
        alternates: {
          languages: {
            de: `${siteUrl}/de/shop`,
            en: `${siteUrl}/en/shop`,
          },
        },
      },
      {
        url: localized('/brands'),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            de: `${siteUrl}/de/brands`,
            en: `${siteUrl}/en/brands`,
          },
        },
      }
    );

    for (const brand of BRAND_DATA) {
      entries.push({
        url: localized(`/brands/${brand.slug}`),
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        alternates: {
          languages: {
            de: `${siteUrl}/de/brands/${brand.slug}`,
            en: `${siteUrl}/en/brands/${brand.slug}`,
          },
        },
      });
    }

    for (const route of SEO_LANDING_ROUTES) {
      entries.push({
        url: localized(`/${route.slug}`),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route.pageData.isGuide ? 0.6 : 0.7,
        alternates: {
          languages: {
            de: `${siteUrl}/de/${route.slug}`,
            en: `${siteUrl}/en/${route.slug}`,
          },
        },
      });
    }

    for (const route of BRAND_COLLECTION_ROUTES) {
      entries.push({
        url: localized(`/${route.pathPrefix}/${route.collection.slug}`),
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.75,
        alternates: {
          languages: {
            de: `${siteUrl}/de/${route.pathPrefix}/${route.collection.slug}`,
            en: `${siteUrl}/en/${route.pathPrefix}/${route.collection.slug}`,
          },
        },
      });
    }

    for (const path of publicPaths) {
      entries.push({
        url: localized(path),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            de: `${siteUrl}/de${path}`,
            en: `${siteUrl}/en${path}`,
          },
        },
      });
    }

    for (const legalPage of legalPages) {
      entries.push({
        url: localized(`/legal/${legalPage.slug}`),
        lastModified: legalPage.updated_date || legalPage.created_date || new Date(),
        changeFrequency: 'monthly',
        priority: 0.4,
        alternates: {
          languages: {
            de: `${siteUrl}/de/legal/${legalPage.slug}`,
            en: `${siteUrl}/en/legal/${legalPage.slug}`,
          },
        },
      });
    }

    for (const product of products) {
      const slug = productSlug(product);
      entries.push({
        url: localized(`/product/${slug}`),
        lastModified: product.updated_date || product.created_date || new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        alternates: {
          languages: {
            de: `${siteUrl}/de/product/${slug}`,
            en: `${siteUrl}/en/product/${slug}`,
          },
        },
      });
    }
  }

  return entries;
}
