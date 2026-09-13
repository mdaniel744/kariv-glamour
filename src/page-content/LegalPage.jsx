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
        <ReactMarkdown components={markdownComponents}>{localize(page, 'content')}</ReactMarkdown>
      </div>
    </div>
  );
}
