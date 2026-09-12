import Link from 'next/link';
import { ArrowRight, CalendarDays, Check, ChevronRight, Clock3 } from 'lucide-react';
import MediaImage from '@/components/shared/MediaImage';
import { EDITORIAL_GUIDES, localizeEditorialGuide } from '@/lib/editorialGuides';
import ResearchSources, { SourceLinks } from './ResearchSources';

const UI = {
  en: {
    home: 'Home',
    guides: 'Watch Guides',
    published: 'Published',
    contents: 'In this guide',
    keyPoints: 'Key points',
    faq: 'Frequently asked questions',
    related: 'Continue reading',
    shopTitle: 'Ready to explore the collection?',
    shopText: 'Browse available watches with clear product details, condition information and secure purchasing options.',
    shopCta: 'Shop watches',
    readArticle: 'Read article',
  },
  de: {
    home: 'Startseite',
    guides: 'Uhren-Guides',
    published: 'Veröffentlicht',
    contents: 'In diesem Guide',
    keyPoints: 'Das Wichtigste',
    faq: 'Häufig gestellte Fragen',
    related: 'Weiterlesen',
    shopTitle: 'Möchten Sie die Kollektion entdecken?',
    shopText: 'Entdecken Sie verfügbare Uhren mit klaren Produktdetails, Zustandsangaben und sicheren Kaufoptionen.',
    shopCta: 'Uhren entdecken',
    readArticle: 'Artikel lesen',
  },
};

function formatDate(value, locale) {
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}

export default function GuideArticle({ guide, locale }) {
  const article = localizeEditorialGuide(guide, locale);
  const copy = UI[locale] || UI.en;
  const related = EDITORIAL_GUIDES.filter((item) => item.slug !== guide.slug);

  return (
    <article className="bg-background font-body text-foreground">
      <header className="border-b border-border bg-secondary/55">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-7 md:py-16 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
            <Link href={`/${locale}`} className="transition-colors hover:text-primary">{copy.home}</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href={`/${locale}/guides`} className="transition-colors hover:text-primary">{copy.guides}</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span className="max-w-[20rem] truncate text-foreground">{article.title}</span>
          </nav>

          <div className="max-w-4xl">
            <span className="mb-5 inline-flex rounded-full border border-primary/25 bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              {article.category}
            </span>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.045em] text-foreground sm:text-5xl md:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
              {article.excerpt}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span>Kariv Glamour</span>
              <span className="inline-flex items-center gap-2"><CalendarDays size={16} aria-hidden="true" />{copy.published} {formatDate(guide.datePublished, locale)}</span>
              <span>{locale === 'de' ? 'Aktualisiert' : 'Updated'} <time dateTime={guide.dateModified}>{formatDate(guide.dateModified, locale)}</time></span>
              <span className="inline-flex items-center gap-2"><Clock3 size={16} aria-hidden="true" />{article.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-7 md:py-12 lg:px-10">
        <div className="relative aspect-[16/8] overflow-hidden rounded-2xl bg-card sm:aspect-[16/7]">
          <MediaImage
            src={guide.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1151px) 100vw, 1152px"
            quality={84}
            className="object-cover"
          />
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <aside className="rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-36">
            <p className="mb-4 text-sm font-bold text-foreground">{copy.contents}</p>
            <ol className="space-y-3">
              {article.sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="group flex gap-3 text-sm leading-5 text-muted-foreground transition-colors hover:text-primary">
                    <span className="text-xs font-semibold text-primary/70">{String(index + 1).padStart(2, '0')}</span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="min-w-0 max-w-3xl">
            <div className="space-y-5 text-lg leading-8 text-muted-foreground">
              {article.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <section aria-labelledby="guide-key-points" className="my-10 rounded-2xl border border-primary/20 bg-secondary/65 p-6 md:p-8">
              <h2 id="guide-key-points" className="text-xl font-bold text-foreground">{copy.keyPoints}</h2>
              <ul className="mt-5 space-y-3">
                {article.keyPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-base leading-7 text-muted-foreground">
                    <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground"><Check size={12} strokeWidth={2.5} aria-hidden="true" /></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="space-y-12">
              {article.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-36">
                  <h2 className="text-2xl font-bold leading-tight tracking-[-0.025em] text-foreground md:text-3xl">{section.title}</h2>
                  <div className="mt-5 space-y-5 text-lg leading-8 text-muted-foreground">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  <SourceLinks ids={section.sources} locale={locale} />
                </section>
              ))}
            </div>

            {article.note && (
              <p className="mt-10 rounded-xl border border-border bg-card px-5 py-4 text-sm leading-6 text-muted-foreground">
                {article.note}
              </p>
            )}

            {guide.sources && <ResearchSources ids={guide.sources} locale={locale} />}
            <p className="mt-6 text-base leading-7"><Link className="text-primary underline underline-offset-4" href={`/${locale}/guides#brand-guides`}>{locale === 'de' ? 'Referenzen, Technik und Geschichte nach Uhrenmarke vertiefen' : 'Explore reference, technology and history guides by watch brand'}</Link></p>
            <section aria-labelledby="guide-faq" className="mt-14 border-t border-border pt-10">
              <h2 id="guide-faq" className="text-2xl font-bold tracking-[-0.025em] text-foreground md:text-3xl">{copy.faq}</h2>
              <div className="mt-6 divide-y divide-border border-y border-border">
                {article.faq.map((item) => (
                  <div key={item.question} className="py-6">
                    <h3 className="text-lg font-bold leading-7 text-foreground">{item.question}</h3>
                    <p className="mt-3 text-base leading-7 text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <section className="border-y border-border bg-secondary/45">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-7 md:py-16 lg:px-10">
          <h2 className="text-2xl font-bold tracking-[-0.025em] text-foreground md:text-3xl">{copy.related}</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {related.map((item) => {
              const relatedArticle = localizeEditorialGuide(item, locale);
              return (
                <Link key={item.slug} href={`/${locale}/guides/${item.slug}`} className="group rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/45">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{relatedArticle.category}</span>
                  <h3 className="mt-3 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">{relatedArticle.title}</h3>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">{copy.readArticle}<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-7 md:py-16 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-primary p-7 text-primary-foreground md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">{copy.shopTitle}</h2>
            <p className="mt-2 max-w-2xl text-base leading-7 opacity-80">{copy.shopText}</p>
          </div>
          <Link href={`/${locale}/shop`} className="inline-flex flex-none items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-bold text-foreground transition-transform hover:scale-[1.02]">
            {copy.shopCta}<ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </article>
  );
}
