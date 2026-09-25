import React, { useState, useEffect } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { useLocalizedField } from '@/lib/localize';
import ReactMarkdown from 'react-markdown';
import { ChevronRight } from 'lucide-react';
import CompanyDetails from '@/components/legal/CompanyDetails';
import { withCzechLegalFallback } from '@/lib/legalPageFallbacks';

function MarkdownLink({ node: _node, href = '', children, ...props }) {
  return (
    <LocalizedLink to={href} {...props}>
      {children}
    </LocalizedLink>
  );
}

function MarkdownTable({ node: _node, children, ...props }) {
  return (
    <div className="max-w-full overflow-x-auto rounded-xl border border-border">
      <table {...props}>{children}</table>
    </div>
  );
}

const markdownComponents = {
  a: MarkdownLink,
  table: MarkdownTable,
};

const META_PIXEL_DISCLOSURE = {
  en: 'If you allow marketing cookies, the Meta Pixel (provided by Meta Platforms) loads and sends page-view information to Meta to measure our advertising. Pixel ID: 1084417767682071. It stays off if you decline or have not chosen. You can change your choice through Cookie settings in the footer.',
  de: 'Wenn Sie Marketing-Cookies erlauben, wird das Meta-Pixel (von Meta Platforms) geladen und übermittelt Informationen zu Seitenaufrufen an Meta, um unsere Werbung zu messen. Pixel-ID: 1084417767682071. Ohne Einwilligung oder bei Ablehnung bleibt es deaktiviert. Ihre Auswahl können Sie über die Cookie-Einstellungen in der Fußzeile ändern.',
  cs: 'Pokud povolíte marketingové cookies, načte se Meta Pixel (poskytovaný společností Meta Platforms) a odešle společnosti Meta údaje o zobrazení stránek pro měření naší reklamy. ID pixelu: 1084417767682071. Bez souhlasu nebo při odmítnutí zůstane vypnutý. Svou volbu můžete změnit v nastavení cookies v zápatí.',
};

export default function LegalPage({ slug: slugProp, initialPage = null }) {
  const slug = slugProp || (typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean).pop() : '');
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(!initialPage);
  const { localize, locale } = useLocalizedField();
  const copy = locale === 'cs'
    ? { home: 'Úvod', notFound: 'Stránka nenalezena', missing: 'Tato stránka zatím nebyla vytvořena.', back: 'Zpět na úvodní stránku' }
    : locale === 'de'
    ? { home: 'Start', notFound: 'Seite nicht gefunden', missing: 'Diese Seite wurde noch nicht erstellt.', back: 'Zurück zur Startseite' }
    : { home: 'Home', notFound: 'Page not found', missing: 'This page has not been created yet.', back: 'Back to the homepage' };

  useEffect(() => {
    if (initialPage?.slug === slug) {
      setPage(withCzechLegalFallback(initialPage));
      setLoading(false);
      window.scrollTo(0, 0);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const pages = asArray(await dataClient.entities.LegalPages.filter({ slug }));
        if (pages.length > 0) setPage(withCzechLegalFallback(pages[0]));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [slug, initialPage]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="h-6 bg-card w-48 mb-6 animate-pulse" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-3 bg-card w-full animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-foreground">{copy.notFound}</h1>
        <p className="text-base text-muted-foreground mt-2">{copy.missing}</p>
        <LocalizedLink to="/" className="text-primary text-base mt-4 inline-block">{copy.back}</LocalizedLink>
      </div>
    );
  }

  const content = localize(page, 'content') || '';

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 font-body">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-8">
        <LocalizedLink to="/" className="hover:text-foreground">{copy.home}</LocalizedLink>
        <ChevronRight size={10} />
        <span className="text-foreground">{localize(page, 'title')}</span>
      </div>

      <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-10">{localize(page, 'title')}</h1>
      <CompanyDetails locale={locale} compact={slug !== 'impressum'} />
      <div className="legal-content">
        <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
        {slug === 'cookie-policy' && !content.includes('1084417767682071') && (
          <p>{META_PIXEL_DISCLOSURE[locale] || META_PIXEL_DISCLOSURE.en}</p>
        )}
      </div>
    </div>
  );
}
