import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LocalizedLink from '@/components/LocalizedLink';
import { useLocalizedField } from '@/lib/localize';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import SEO from '@/components/SEO';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { EDITORIAL_GUIDES } from '@/lib/editorialGuides';

const BUILT_IN_GUIDES = EDITORIAL_GUIDES.map((guide) => ({
  id: `editorial-${guide.slug}`,
  slug: guide.slug,
  featuredImage: guide.image,
  published: true,
  created_date: guide.datePublished,
  title_en: guide.translations.en.title,
  title_de: guide.translations.de.title,
  excerpt_en: guide.translations.en.excerpt,
  excerpt_de: guide.translations.de.excerpt,
  category_en: guide.translations.en.category,
  category_de: guide.translations.de.category,
}));

export default function Guides() {
  const { t } = useTranslation();
  const { localize } = useLocalizedField();
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    dataClient.entities.WatchGuides.filter({ published: true }, '-created_date', 50)
      .then(data => setGuides(asArray(data)))
      .catch(console.error);
  }, []);

  const builtInSlugs = new Set(BUILT_IN_GUIDES.map((guide) => guide.slug));
  const visibleGuides = [
    ...BUILT_IN_GUIDES,
    ...guides.filter((guide) => !builtInSlugs.has(guide.slug)),
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <SEO title={t('common:seo.guides.title')} description={t('common:seo.guides.description')} />
      <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-6">
        <LocalizedLink to="/" className="hover:text-foreground">{t('common:home')}</LocalizedLink>
        <ChevronRight size={10} />
        <span className="text-foreground">{t('pages.guides.breadcrumb')}</span>
      </div>

      <div className="mb-14 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 block">{t('pages.guides.eyebrow')}</span>
        <h1 className="font-display text-4xl md:text-5xl font-light text-foreground tracking-tight mb-4">{t('pages.guides.title')}</h1>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          {t('pages.guides.subtitle')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
          {visibleGuides.map((guide, i) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <LocalizedLink to={`/guides/${guide.slug || guide.id}`} className="group block">
                <div className="mb-4 aspect-[16/10] overflow-hidden rounded-xl bg-card">
                  {guide.featuredImage && (
                    <img src={guide.featuredImage} alt={localize(guide, 'title')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-primary">{localize(guide, 'category')}</span>
                <h2 className="mb-2 text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">{localize(guide, 'title')}</h2>
                {localize(guide, 'excerpt') && <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{localize(guide, 'excerpt')}</p>}
              </LocalizedLink>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
