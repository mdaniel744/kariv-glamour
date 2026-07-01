import React, { useRef, useState, useCallback, useEffect } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BREITLING_COLLECTIONS } from '@/lib/breitlingData';

const BRAND = 'Breitling';

export default function BreitlingCollectionGrid() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  const scrollRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 10);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => { updateArrows(); }, [updateArrows]);

  const scrollByDir = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-collection-card]')?.offsetWidth || 320;
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: 'smooth' });
  };

  return (
    <section id="collections" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('collectionCarousel.eyebrow')}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 text-foreground">{t('collectionCarousel.heading', { brand: BRAND })}</h2>
          <p className="text-sm max-w-2xl mx-auto text-muted-foreground">{t('collectionCarousel.description', { brand: BRAND })}</p>
        </div>

        <div className="relative">
          <button onClick={() => scrollByDir(-1)} disabled={!canPrev} aria-label="Previous collections" className="absolute left-0 top-1/2 -translate-y-1/2 z-20 -ml-3 md:-ml-4 w-11 h-11 flex items-center justify-center border border-border bg-background/90 backdrop-blur-sm text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-0 disabled:pointer-events-none">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scrollByDir(1)} disabled={!canNext} aria-label="Next collections" className="absolute right-0 top-1/2 -translate-y-1/2 z-20 -mr-3 md:-mr-4 w-11 h-11 flex items-center justify-center border border-border bg-background/90 backdrop-blur-sm text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-0 disabled:pointer-events-none">
            <ChevronRight size={18} />
          </button>

          <div ref={scrollRef} onScroll={updateArrows} className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-px-6 pb-2">
            {BREITLING_COLLECTIONS.map((c, i) =>
              <motion.div key={c.slug} data-collection-card initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i % 3 * 0.05 }} className="flex-shrink-0 snap-start w-[78%] sm:w-[45%] lg:w-[31%]">
                <LocalizedLink to={`/breitling/${c.slug}`} className="group block border border-border bg-card hover:border-primary/40 transition-colors h-full">
                  <div className="aspect-[4/3] flex items-center justify-center bg-secondary">
                    <span className="font-display text-xl tracking-wide text-foreground/70 group-hover:text-foreground transition-colors">{c.name}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-2 font-display font-semibold text-foreground">{c.name}</h3>
                    <p className="text-xs leading-relaxed mb-4 text-muted-foreground">{localize(c, 'shortDescription')}</p>
                    <span className="text-[10px] tracking-[0.15em] uppercase text-primary">{t('collectionCarousel.exploreCollection')} →</span>
                  </div>
                </LocalizedLink>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}