import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LocalizedLink from '@/components/LocalizedLink';
import { base44 } from '@/api/base44Client';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
import ReactMarkdown from 'react-markdown';
import { ChevronRight } from 'lucide-react';

export default function LegalPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { localize } = useLocalizedField();

  const seoTitle = page ? localize(page, 'seoTitle') || localize(page, 'title') : undefined;
  const seoDescription = page ? localize(page, 'seoDescription') : undefined;
  useSEO({ title: seoTitle, description: seoDescription, type: 'article' });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const pages = await base44.entities.LegalPages.filter({ slug });
        if (pages.length > 0) setPage(pages[0]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [slug]);

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
        <h1 className="font-display text-2xl text-foreground">Seite nicht gefunden</h1>
        <p className="text-sm text-muted-foreground mt-2">Diese Seite wurde noch nicht erstellt.</p>
        <LocalizedLink to="/" className="text-primary text-sm mt-4 inline-block">Zurück zur Startseite</LocalizedLink>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-8">
        <LocalizedLink to="/" className="hover:text-foreground">Start</LocalizedLink>
        <ChevronRight size={10} />
        <span className="text-foreground">{page.title}</span>
      </div>

      <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-8">{localize(page, 'title')}</h1>
      <div className="prose prose-sm prose-headings:font-display prose-headings:font-light prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary max-w-none">
        <ReactMarkdown>{localize(page, 'content')}</ReactMarkdown>
      </div>
    </div>
  );
}