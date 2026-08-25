import React, { useRef } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CARTIER_COLLECTIONS } from '@/lib/cartierData';
import { useBrandCollections } from '@/hooks/useBrandCollections';

const BRAND = 'Cartier';

export default function CartierCollectionGrid() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  const { collections } = useBrandCollections(BRAND, CARTIER_COLLECTIONS);
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    scrollRef.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });
  };

  return (
    <section id="collections" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
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
            <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i % 4 * 0.05 }} className="group w-[280px] flex-shrink-0 snap-start">
              <LocalizedLink to={`/cartier/${c.slug}`} className="block">
                <div className="relative mb-4 flex aspect-[4/5] items-center justify-center overflow-hidden bg-secondary">
                  {c.image ?
                    <img src={c.image} alt={`${BRAND} ${c.name}`} loading="lazy" className="w-full h-full object-contain p-5 md:p-6 group-hover:scale-105 transition-transform duration-700" /> :
                    <span className="font-display text-2xl text-primary">{c.name}</span>
                  }
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{c.name}</h3>
                <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{localize(c, 'shortDescription')}</p>
                <span className="text-[10px] uppercase tracking-[0.12em] text-primary transition-colors group-hover:opacity-70">{t('collectionCarousel.exploreCollection')} →</span>
              </LocalizedLink>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
