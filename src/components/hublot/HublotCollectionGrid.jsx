import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HUBLOT_COLLECTIONS } from '@/lib/hublotData';
import { useBrandCollections } from '@/hooks/useBrandCollections';

const BRAND = 'Hublot';

export default function HublotCollectionGrid() {
  const { t } = useTranslation('brandComponents');
  const { collections } = useBrandCollections(BRAND, HUBLOT_COLLECTIONS);
  return (
    <section id="collections" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('collectionCarousel.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl mb-4 [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">{t('collectionCarousel.heading', { brand: BRAND })}</h2>
          <p className="text-sm max-w-2xl mx-auto text-muted-foreground">{t('collectionCarousel.description', { brand: BRAND })}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {collections.map((c, i) =>
          <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i % 3 * 0.05 }}>
              <LocalizedLink to={`/hublot/${c.slug}`} className="group block overflow-hidden rounded-xl border border-border bg-card hover:border-primary/40 transition-colors">
                <div className="aspect-[4/3] overflow-hidden flex items-center justify-center bg-secondary">
                  {c.image ? <img src={c.image} alt={`${BRAND} ${c.name}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> : <span className="font-display text-xl tracking-wide text-foreground/70 group-hover:text-foreground transition-colors">{c.name}</span>}
                </div>
                <div className="px-4 py-3">
                    <h3 className="font-body text-base font-semibold leading-snug text-foreground">{c.name}</h3>
                  </div>
              </LocalizedLink>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}
