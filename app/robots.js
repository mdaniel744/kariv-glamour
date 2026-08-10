import { getSiteUrl } from '@/lib/seo';

export default function robots() {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/de/admin',
          '/en/admin',
          '/de/portal',
          '/en/portal',
          '/de/checkout',
          '/en/checkout',
          '/login',
          '/register',
          '/forgot-password',
          '/reset-password',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
