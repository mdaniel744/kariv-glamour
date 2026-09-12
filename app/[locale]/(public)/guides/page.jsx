import Link from 'next/link';
import { notFound } from 'next/navigation';
import MediaImage from '@/components/shared/MediaImage';
import { EDITORIAL_GUIDES, localizeEditorialGuide } from '@/lib/editorialGuides';
import { SEO_LANDING_ROUTES } from '@/lib/brandSeoRegistry';
import { canonicalSeoSlug, getResearchArticle } from '@/lib/watchResearch/articles';
import { getPublishedGuides } from '@/lib/publishedGuides';
import { localizedMetadata, localizedField, SUPPORTED_LOCALES, getSiteUrl, safeJsonLd } from '@/lib/seo';

export const revalidate = 300;
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return localizedMetadata({
    locale, path: 'guides',
    title: locale === 'de' ? 'Uhren-Guides: Kauf, Technik und Markenwissen' : 'Watch guides: buying, movements and brand knowledge',
    description: locale === 'de' ? 'Fundierte Leitfäden zu gebrauchten Luxusuhren, Box und Papieren, Uhrwerken und Modellunterschieden. Mit Herstellerquellen und praktischen Kaufprüfungen.' : 'Research-backed guides to pre-owned luxury watches, box and papers, movements and model differences. Manufacturer sources and practical buying checks.',
  });
}

export default async function GuidesPage({ params }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();
  const de = locale === 'de';
  const records = await getPublishedGuides();
  const builtIn = new Set(EDITORIAL_GUIDES.map((guide) => guide.slug));
  const additional = records.filter((guide) => !builtIn.has(guide.slug) && localizedField(guide, 'content', locale));
  const routes = SEO_LANDING_ROUTES.filter((route) => route.pageData.isGuide && canonicalSeoSlug(route, SEO_LANDING_ROUTES) === route.slug);
  const groups = [...new Set(routes.map((route) => route.brandName))];
  const site = getSiteUrl();
  return <div className="mx-auto max-w-7xl px-5 py-9 font-body text-foreground sm:px-7 md:py-12">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
      '@context': 'https://schema.org', '@type': 'CollectionPage',
      name: de ? 'Uhren-Guides' : 'Watch guides', url: `${site}/${locale}/guides`, inLanguage: locale,
      hasPart: routes.map((route) => ({ '@type': 'Article', name: getResearchArticle(route, locale).title, url: `${site}/${locale}/${route.slug}` })),
    }) }} />
    <header className="mb-8 max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{de ? 'Uhrenwissen für bessere Kaufentscheidungen' : 'Watch knowledge for better buying decisions'}</h1>
      <p className="mt-4 text-lg leading-8">{de ? 'Beginnen Sie mit den Grundlagen oder vertiefen Sie Ihr Wissen zu einer Marke. Unsere Guides erklären Unterschiede zwischen Referenzen, Technik und Zustand – mit nachvollziehbaren Quellen statt pauschalen Versprechen.' : 'Start with the fundamentals or explore a brand in detail. Our guides explain reference differences, technology and condition—with traceable sources rather than blanket promises.'}</p>
      <a className="mt-5 inline-block text-primary underline underline-offset-4" href="#brand-guides">{de ? 'Direkt zu den Marken-Guides' : 'Go straight to brand guides'}</a>
    </header>
    <section aria-label={de ? 'Grundlagen zum Uhrenkauf' : 'Watch-buying fundamentals'} className="grid gap-6 md:grid-cols-3">
      {EDITORIAL_GUIDES.map((guide) => {
        const article = localizeEditorialGuide(guide, locale);
        return <Link key={guide.slug} href={`/${locale}/guides/${guide.slug}`} className="group overflow-hidden rounded-2xl border border-border">
          <div className="relative aspect-[16/9] bg-card"><MediaImage src={guide.image} alt="" fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover" /></div>
          <div className="p-5"><h2 className="text-xl font-semibold leading-snug group-hover:text-primary">{article.title}</h2><p className="mt-3 text-base leading-7 text-muted-foreground">{article.excerpt}</p></div>
        </Link>;
      })}
    </section>
    <section id="brand-guides" className="mt-12 scroll-mt-32">
      <h2 className="text-2xl font-semibold">{de ? 'Guides nach Uhrenmarke' : 'Guides by watch brand'}</h2>
      <nav aria-label={de ? 'Marken im Guide-Verzeichnis' : 'Brands in the guide directory'} className="mt-5 flex gap-3 overflow-x-auto pb-3">{groups.map((name) => {
        const route = routes.find((item) => item.brandName === name);
        return <a key={name} href={`#guides-${route.brandSlug}`} className="flex-none rounded-full border border-border px-4 py-2 text-sm hover:border-primary">{name}</a>;
      })}</nav>
      <div className="mt-5 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">{groups.map((name) => {
        const group = routes.filter((route) => route.brandName === name);
        return <section key={name} id={`guides-${group[0].brandSlug}`} className="scroll-mt-32 rounded-2xl border border-border p-5">
          <h3 className="text-xl font-semibold">{name}</h3>
          <ul className="mt-4 space-y-3">{group.map((route) => <li key={route.slug}><Link href={`/${locale}/${route.slug}`} className="text-base leading-7 text-primary underline-offset-4 hover:underline">{getResearchArticle(route, locale).title}</Link></li>)}</ul>
          <Link href={`/${locale}/brands/${group[0].brandSlug}`} className="mt-5 inline-block text-sm font-medium underline underline-offset-4">{de ? 'Verfügbare Uhren' : 'Available watches'} →</Link>
        </section>;
      })}</div>
    </section>
    {additional.length > 0 && <section className="mt-12"><h2 className="text-2xl font-semibold">{de ? 'Weitere Artikel' : 'More articles'}</h2><ul className="mt-5 space-y-4">{additional.map((guide) => <li key={guide.id}><Link className="text-primary underline underline-offset-4" href={`/${locale}/guides/${guide.slug || guide.id}`}>{localizedField(guide, 'title', locale)}</Link></li>)}</ul></section>}
  </div>;
}
