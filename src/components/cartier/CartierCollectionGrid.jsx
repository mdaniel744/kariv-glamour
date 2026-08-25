import React, { useRef } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CARTIER_COLLECTIONS } from '@/lib/cartierData';
import { useBrandCollections } from '@/hooks/useBrandCollections';

const BRAND = 'Cartier';

export default function CartierCollectionGrid() {
  const { t } = useTranslation('brandComponents');
  const { collections } = useBrandCollections(BRAND, CARTIER_COLLECTIONS);
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    scrollRef.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });
  };

  return (
    <section id="collections" data-brand-collections className="bg-background py-3 sm:py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div data-brand-collections-header className="hidden">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('collectionCarousel.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl mb-4 text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">{t('collectionCarousel.heading', { brand: BRAND })}</h2>
          <p className="text-sm max-w-2xl mx-auto text-muted-foreground">{t('collectionCarousel.description', { brand: BRAND })}</p>
        </div>
        <div className="mb-6 hidden items-center justify-end gap-2 md:flex">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous Cartier collections" className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary">
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next Cartier collections" className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary">
            <ChevronRight size={18} />
          </button>
        </div>

        <div ref={scrollRef} className="no-scrollbar flex snap-x gap-5 overflow-x-auto scroll-smooth pb-4 md:pb-2">
          {collections.map((c, i) =>
            <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i % 4 * 0.05 }} className="group w-[220px] flex-shrink-0 snap-start sm:w-[280px]">
              <LocalizedLink to={`/cartier/${c.slug}`} className="group block overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50">
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-secondary">
                  {c.image ?
                    <img src={c.image} alt={`${BRAND} ${c.name}`} loading="lazy" className="w-full h-full object-contain p-5 md:p-6 group-hover:scale-105 transition-transform duration-700" /> :
                    <span className="font-display text-2xl text-primary">{c.name}</span>
                  }
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="px-4 py-3 font-body text-base font-semibold leading-snug text-foreground">{c.name}</h3>
              </LocalizedLink>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
