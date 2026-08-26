import { notFound } from 'next/navigation';
import GuideArticle from '@/components/guides/GuideArticle';
import { EDITORIAL_GUIDES, getEditorialGuide, localizeEditorialGuide } from '@/lib/editorialGuides';
import {
  getSiteUrl,
  localizedMetadata,
  safeJsonLd,
  SUPPORTED_LOCALES,
} from '@/lib/seo';

export function generateStaticParams() {
  return EDITORIAL_GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const guide = getEditorialGuide(slug);

  if (!SUPPORTED_LOCALES.includes(locale) || !guide) {
    return localizedMetadata({
      locale: SUPPORTED_LOCALES.includes(locale) ? locale : 'en',
      path: `guides/${slug}`,
      title: locale === 'de' ? 'Guide nicht gefunden' : 'Guide not found',
      description: '',
      index: false,
    });
  }

  const article = localizeEditorialGuide(guide, locale);
  return localizedMetadata({
    locale,
    path: `guides/${slug}`,
    title: article.title,
    description: article.excerpt,
    image: guide.image,
    type: 'article',
  });
}

export default async function EditorialGuidePage({ params }) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();

  const guide = getEditorialGuide(slug);
  if (!guide) notFound();

  const article = localizeEditorialGuide(guide, locale);
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${locale}/guides/${guide.slug}`;
  const image = guide.image.startsWith('http') ? guide.image : `${siteUrl}${guide.image}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      image,
      datePublished: guide.datePublished,
      dateModified: guide.dateModified,
      inLanguage: locale,
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: 'Kariv Glamour' },
      publisher: { '@type': 'Organization', name: 'Kariv Glamour', url: siteUrl },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: locale === 'de' ? 'Startseite' : 'Home', item: `${siteUrl}/${locale}` },
        { '@type': 'ListItem', position: 2, name: locale === 'de' ? 'Uhren-Guides' : 'Watch Guides', item: `${siteUrl}/${locale}/guides` },
        { '@type': 'ListItem', position: 3, name: article.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <GuideArticle guide={guide} locale={locale} />
    </>
  );
}
