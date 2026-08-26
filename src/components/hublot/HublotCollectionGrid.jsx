import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HUBLOT_COLLECTIONS } from '@/lib/hublotData';
import { useBrandCollections } from '@/hooks/useBrandCollections';
import { handleBrandCollectionFilterClick } from '@/lib/brandCollectionFilters';

const BRAND = 'Hublot';

export default function HublotCollectionGrid() {
  const { t } = useTranslation('brandComponents');
  const { collections } = useBrandCollections(BRAND, HUBLOT_COLLECTIONS);
  return (
    <section id="collections" data-brand-collections className="bg-background py-3 sm:py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div data-brand-collections-header className="hidden">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('collectionCarousel.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl mb-4 [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">{t('collectionCarousel.heading', { brand: BRAND })}</h2>
          <p className="text-sm max-w-2xl mx-auto text-muted-foreground">{t('collectionCarousel.description', { brand: BRAND })}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {collections.map((c, i) =>
          <motion.div key={c.slug} data-collection-card initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i % 3 * 0.05 }}>
              <LocalizedLink to={`/shop?brand=${encodeURIComponent(BRAND)}&collection=${encodeURIComponent(c.name)}`} onClick={(event) => handleBrandCollectionFilterClick(event, c.name)} className="group block overflow-hidden rounded-xl border border-border bg-card hover:border-primary/40 transition-colors">
                <div className="relative h-[164px] overflow-hidden bg-secondary sm:h-[230px]">
                  {c.image ? <div className="absolute inset-x-0 top-0 h-[calc(100%-48px)] overflow-hidden"><img src={c.image} alt={`${BRAND} ${c.name}`} loading="lazy" className="h-full w-full scale-[1.18] object-contain transition-transform duration-700 group-hover:scale-[1.24] sm:scale-100 sm:object-cover sm:group-hover:scale-105" /></div> : <span className="font-display text-xl tracking-wide text-foreground/70 group-hover:text-foreground transition-colors">{c.name}</span>}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-12 items-center px-3 sm:px-4">
                    <h3 className="line-clamp-2 font-body text-xs font-semibold leading-tight text-primary sm:text-sm">{c.name}</h3>
                  </div>
                </div>
              </LocalizedLink>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}
