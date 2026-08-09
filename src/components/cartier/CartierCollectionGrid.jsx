import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { CARTIER_COLLECTIONS } from '@/lib/cartierData';
import { useBrandCollections } from '@/hooks/useBrandCollections';

const BRAND = 'Cartier';

export default function CartierCollectionGrid() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  const { collections } = useBrandCollections(BRAND, CARTIER_COLLECTIONS);
  return (
    <section id="collections" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('collectionCarousel.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl mb-4 text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">{t('collectionCarousel.heading', { brand: BRAND })}</h2>
          <p className="text-sm max-w-2xl mx-auto text-muted-foreground">{t('collectionCarousel.description', { brand: BRAND })}</p>
        </div>
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar">
          {collections.map((c, i) =>
            <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i % 4 * 0.05 }} className="flex-shrink-0 snap-start min-w-[80%] sm:min-w-[45%] lg:min-w-[30%]">
              <LocalizedLink to={`/cartier/${c.slug}`} className="group block border border-border bg-card transition-colors hover:border-primary/40">
                <div className="aspect-[4/5] overflow-hidden flex items-center justify-center bg-secondary">
                  {c.image ?
                    <img src={c.image} alt={`${BRAND} ${c.name}`} loading="lazy" className="w-full h-full object-contain p-5 md:p-6 group-hover:scale-105 transition-transform duration-700" /> :
                    <span className="font-display text-2xl text-primary">{c.name}</span>
                  }
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl mb-2 text-foreground">{c.name}</h3>
                  <p className="text-xs leading-relaxed mb-4 text-muted-foreground">{localize(c, 'shortDescription')}</p>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-primary">{t('collectionCarousel.exploreCollection')} →</span>
                </div>
              </LocalizedLink>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
