import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ReactMarkdown from 'react-markdown';
import { ChevronRight } from 'lucide-react';

export default function LegalPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <div className="h-6 bg-[#151515] w-48 mb-6 animate-pulse" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-3 bg-[#151515] w-full animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-2xl text-[#E5E5E5]">Page Not Found</h1>
        <p className="text-sm text-[#8E8E93] mt-2">This legal page hasn't been created yet.</p>
        <Link to="/" className="text-[#C5A367] text-sm mt-4 inline-block">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] mb-8">
        <Link to="/" className="hover:text-[#E5E5E5]">Home</Link>
        <ChevronRight size={10} />
        <span className="text-[#E5E5E5]">{page.title}</span>
      </div>

      <h1 className="font-display text-3xl md:text-4xl font-light text-[#E5E5E5] mb-8">{page.title}</h1>
      <div className="prose prose-sm prose-invert prose-p:text-[#8E8E93] prose-headings:font-display prose-headings:font-light prose-headings:text-[#E5E5E5] prose-a:text-[#C5A367] max-w-none">
        <ReactMarkdown>{page.content}</ReactMarkdown>
      </div>
    </div>
  );
}