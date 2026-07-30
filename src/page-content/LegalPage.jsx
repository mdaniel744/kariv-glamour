import React, { useState, useEffect } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { useLocalizedField } from '@/lib/localize';
import ReactMarkdown from 'react-markdown';
import { ChevronRight } from 'lucide-react';

export default function LegalPage({ slug: slugProp, initialPage = null }) {
  const slug = slugProp || (typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean).pop() : '');
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(!initialPage);
  const { localize, locale } = useLocalizedField();
  const copy = locale === 'de'
    ? { home: 'Start', notFound: 'Seite nicht gefunden', missing: 'Diese Seite wurde noch nicht erstellt.', back: 'Zurück zur Startseite' }
    : { home: 'Home', notFound: 'Page not found', missing: 'This page has not been created yet.', back: 'Back to the homepage' };

  useEffect(() => {
    if (initialPage?.slug === slug) {
      setPage(initialPage);
      setLoading(false);
      window.scrollTo(0, 0);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const pages = asArray(await dataClient.entities.LegalPages.filter({ slug }));
        if (pages.length > 0) setPage(pages[0]);
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
        <h1 className="font-display text-2xl text-foreground">{copy.notFound}</h1>
        <p className="text-sm text-muted-foreground mt-2">{copy.missing}</p>
        <LocalizedLink to="/" className="text-primary text-sm mt-4 inline-block">{copy.back}</LocalizedLink>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-8">
        <LocalizedLink to="/" className="hover:text-foreground">{copy.home}</LocalizedLink>
        <ChevronRight size={10} />
        <span className="text-foreground">{localize(page, 'title')}</span>
      </div>

      <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-8">{localize(page, 'title')}</h1>
      <div className="prose prose-sm prose-headings:font-display prose-headings:font-light prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary max-w-none">
        <ReactMarkdown>{localize(page, 'content')}</ReactMarkdown>
      </div>
    </div>
  );
}
