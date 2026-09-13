import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import SafeHtml from '@/components/shared/SafeHtml';
import { localizedField, getSiteUrl, safeJsonLd } from '@/lib/seo';

// Preserve existing published dashboard articles; these are not rewritten by
// the repository's researched guide catalogue.
export default function PublishedGuideArticle({ guide, locale }) {
  const title = localizedField(guide, 'title', locale);
  const content = localizedField(guide, 'content', locale);
  const url = `${getSiteUrl()}/${locale}/guides/${guide.slug || guide.id}`;
  return <article className="mx-auto max-w-3xl px-5 py-10 font-body text-foreground">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
      '@context': 'https://schema.org', '@type': 'Article', headline: title,
      url, mainEntityOfPage: url, inLanguage: locale,
      ...(guide.created_date ? { datePublished: guide.created_date } : {}),
      ...(guide.updated_date ? { dateModified: guide.updated_date } : {}),
      publisher: { '@type': 'Organization', name: 'Kariv Glamour', url: getSiteUrl() },
    }) }} />
    <Link className="text-primary underline" href={`/${locale}/guides`}>{locale === 'cs' ? 'Všechny průvodce hodinkami' : locale === 'de' ? 'Alle Uhren-Guides' : 'All watch guides'}</Link>
    <h1 className="mt-6 break-words text-3xl font-semibold leading-tight md:text-4xl">{title}</h1>
    <div className="mt-7 break-words text-lg leading-8 [&_p]:mb-5 [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6">
      {/<[a-z][\s\S]*>/i.test(content) ? <SafeHtml html={content} /> : <ReactMarkdown>{content}</ReactMarkdown>}
    </div>
  </article>;
}
