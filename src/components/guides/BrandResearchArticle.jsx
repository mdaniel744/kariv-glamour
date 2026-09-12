import Link from 'next/link';
import { SEO_LANDING_ROUTES } from '@/lib/brandSeoRegistry';
import { canonicalSeoSlug, getResearchArticle } from '@/lib/watchResearch/articles';
import { BRAND_RESEARCH } from '@/lib/watchResearch/brands';
import ResearchSources, { SourceLinks } from './ResearchSources';
import { COMPARISONS } from '@/lib/watchResearch/comparisons';

export default function BrandResearchArticle({ route, locale, compact = false }) {
  const article = getResearchArticle(route, locale);
  if (!article) return null;
  const de = locale === 'de';
  const related = SEO_LANDING_ROUTES.filter((item) => item.pageKey === route.pageKey && item.pageData.isGuide && item.slug !== route.slug && canonicalSeoSlug(item, SEO_LANDING_ROUTES) === item.slug);
  const editorialLinks = [
    ['how-to-safely-buy-a-pre-owned-luxury-watch', de ? 'Gebrauchte Luxusuhren sicher kaufen' : 'How to buy a pre-owned luxury watch safely'],
    ['what-box-and-papers-mean-for-luxury-watches', de ? 'Box und Papiere verstehen' : 'Understanding box and papers'],
    ['are-pre-owned-luxury-watches-a-good-investment', de ? 'Werterhalt und Besitzkosten' : 'Value retention and ownership costs'],
  ];
  const brand = BRAND_RESEARCH[route.pageKey];
  const comparison = !compact && COMPARISONS[article.topic];
  const sections = compact ? [
    { id: 'buying-context', title: de ? 'Die passende Referenz finden' : 'Find the right reference', paragraphs: [brand.choose[locale]], sources: [] },
    { id: 'buying-checks', title: de ? 'Zustand und Lieferumfang vergleichen' : 'Compare condition and what is included', paragraphs: [brand.inspect[locale]], sources: [] },
  ] : article.sections;
  return <article className="bg-background font-body text-foreground">
    <div className="mx-auto max-w-6xl px-5 py-9 sm:px-7 md:py-12">
      {!compact && <header className="max-w-3xl">
        <nav aria-label={de ? 'Brotkrumennavigation' : 'Breadcrumb'} className="mb-5 flex flex-wrap gap-2 text-sm text-muted-foreground">
          <Link href={`/${locale}`}>{de ? 'Startseite' : 'Home'}</Link><span aria-hidden="true">/</span>
          <Link href={`/${locale}/guides`}>{de ? 'Uhren-Guides' : 'Watch guides'}</Link><span aria-hidden="true">/</span>
          <Link href={`/${locale}/brands/${route.brandSlug}`}>{route.brandName}</Link>
        </nav>
        <h1 className="break-words text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">{article.title}</h1>
        <p className="mt-5 text-sm leading-6 text-muted-foreground">Kariv Glamour · {de ? 'Aktualisiert' : 'Updated'} <time dateTime={article.dateModified}>{new Intl.DateTimeFormat(de ? 'de-DE' : 'en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(article.dateModified + 'T12:00:00Z'))}</time> · {article.readMinutes} {de ? 'Min. Lesezeit' : 'min read'}</p>
      </header>}
      {compact && <h2 className="text-2xl font-semibold">{de ? 'Kaufwissen:' : 'Buying notes:'} {article.title}</h2>}
      <div className={compact ? 'mt-6 max-w-3xl' : 'mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-14'}>
        <div className="min-w-0">
          {comparison && <section className="mb-8">
            <h2 className="text-xl font-semibold">{de ? 'Die wichtigsten Unterschiede' : 'Key differences at a glance'}</h2>
            <div className="mt-4 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[32rem] text-left text-sm leading-6">
                <caption className="sr-only">{comparison.left} / {comparison.right}</caption>
                <thead className="bg-secondary"><tr><th scope="col" className="p-3">{de ? 'Merkmal' : 'Consideration'}</th><th scope="col" className="p-3">{comparison.left}</th><th scope="col" className="p-3">{comparison.right}</th></tr></thead>
                <tbody>{comparison.rows.map((row) => <tr key={row.label.en} className="border-t border-border"><th scope="row" className="p-3 font-medium">{row.label[locale]}</th><td className="p-3">{row.left[locale]}</td><td className="p-3">{row.right[locale]}</td></tr>)}</tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{comparison.note[locale]}</p>
            <SourceLinks ids={comparison.sources} locale={locale} />
          </section>}
          <div className="space-y-8">
            {sections.map((section) => <section id={section.id} key={section.id} className="scroll-mt-36">
              <h2 className="text-xl font-semibold leading-snug sm:text-2xl">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 sm:text-lg">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <SourceLinks ids={section.sources} locale={locale} />
            </section>)}
          </div>
          <nav aria-label={de ? 'Weiterführende Kaufleitfäden' : 'Further buying guides'} className="mt-9 border-t border-border pt-6">
            <h2 className="text-xl font-semibold">{de ? 'Für den nächsten Schritt' : 'For your next step'}</h2>
            <ul className="mt-4 space-y-3">{editorialLinks.map(([slug, title]) => <li key={slug}><Link className="text-primary underline underline-offset-4" href={`/${locale}/guides/${slug}`}>{title}</Link></li>)}</ul>
            <Link href={`/${locale}/brands/${route.brandSlug}`} className="mt-6 inline-flex min-h-11 items-center rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground">{de ? `${route.brandName}-Uhren ansehen` : `Browse ${route.brandName} watches`}</Link>
          </nav>
          {!compact && <ResearchSources ids={article.sources} locale={locale} />}
        </div>
        {!compact && <aside className="rounded-2xl border border-border p-5 lg:sticky lg:top-32">
          <h2 className="font-semibold">{de ? 'In diesem Guide' : 'In this guide'}</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6">{sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="hover:text-primary underline-offset-4 hover:underline">{section.title}</a></li>)}</ul>
          <h2 className="mt-6 border-t border-border pt-5 font-semibold">{de ? 'Mehr über' : 'More about'} {route.brandName}</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6">{related.map((item) => <li key={item.slug}><Link href={`/${locale}/${item.slug}`} className="text-primary hover:underline">{getResearchArticle(item, locale).title}</Link></li>)}</ul>
        </aside>}
      </div>
    </div>
  </article>;
}
