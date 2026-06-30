import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LocalizedLink from '@/components/LocalizedLink';
import { base44 } from '@/api/base44Client';
import SEO from '@/components/SEO';
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Guides() {
  const { t } = useTranslation();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.WatchGuides.filter({ published: true }, '-created_date', 50)
      .then(setGuides)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <SEO title={t('common:seo.guides.title')} description={t('common:seo.guides.description')} />
      <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-6">
        <LocalizedLink to="/" className="hover:text-foreground">Start</LocalizedLink>
        <ChevronRight size={10} />
        <span className="text-foreground">Guides</span>
      </div>

      <div className="mb-14 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 block">Wissen</span>
        <h1 className="font-display text-4xl md:text-5xl font-light text-foreground tracking-tight mb-4">Uhren-Guides & Editorial</h1>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Experteneinblicke, Kaufleitfäden und horologisches Wissen von unserem Team von Uhrenspezialisten.
        </p>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[16/10] bg-card mb-4" />
              <div className="h-3 bg-card w-20 mb-2" />
              <div className="h-4 bg-card w-full" />
            </div>
          ))}
        </div>
      ) : guides.length === 0 ? (
        <div className="text-center py-20 border border-border">
          <BookOpen size={40} className="text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground text-sm mb-2">Unser Redaktionsteam bereitet neue Inhalte vor.</p>
          <p className="text-xs text-muted-foreground/50">Bald verfügbar: Kaufleitfäden, Marken-Insights und Investitionstipps.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {guides.map((guide, i) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <LocalizedLink to={`/guides/${guide.id}`} className="group block">
                <div className="aspect-[16/10] bg-card overflow-hidden mb-4">
                  {guide.featuredImage && (
                    <img src={guide.featuredImage} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
                <span className="text-[9px] tracking-[0.2em] uppercase text-primary mb-2 block">{guide.category}</span>
                <h2 className="text-sm text-foreground group-hover:text-primary transition-colors leading-tight mb-2">{guide.title}</h2>
                {guide.excerpt && <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{guide.excerpt}</p>}
              </LocalizedLink>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}