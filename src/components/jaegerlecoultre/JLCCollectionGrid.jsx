import React, { useRef, useState, useCallback, useEffect } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { JLC_COLLECTIONS } from '@/lib/jaegerLeCoultreData';
import { useBrandCollections } from '@/hooks/useBrandCollections';
import { handleBrandCollectionFilterClick } from '@/lib/brandCollectionFilters';

const BRAND = 'Jaeger-LeCoultre';

export default function JLCCollectionGrid() {
  const { t } = useTranslation('brandComponents');
  const scrollRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 10);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const { collections } = useBrandCollections(BRAND, JLC_COLLECTIONS);

  useEffect(() => { updateArrows(); }, [updateArrows]);
  useEffect(() => { updateArrows(); }, [collections.length, updateArrows]);

  const scrollByDir = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-collection-card]')?.offsetWidth || 320;
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: 'smooth' });
  };

  return (
    <section id="collections" data-brand-collections className="bg-background py-3 sm:py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div data-brand-collections-header className="hidden">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('collectionCarousel.eyebrow')}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 text-foreground">{t('collectionCarousel.heading', { brand: 'JLC' })}</h2>
          <p className="text-sm max-w-2xl mx-auto text-muted-foreground">{t('collectionCarousel.description', { brand: BRAND })}</p>
        </div>

        <div className="relative">
          <button onClick={() => scrollByDir(-1)} disabled={!canPrev} aria-label="Previous collections" className="absolute left-0 top-1/2 -translate-y-1/2 z-20 -ml-3 md:-ml-4 w-11 h-11 flex items-center justify-center border border-border bg-background/90 backdrop-blur-sm text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-0 disabled:pointer-events-none">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scrollByDir(1)} disabled={!canNext} aria-label="Next collections" className="absolute right-0 top-1/2 -translate-y-1/2 z-20 -mr-3 md:-mr-4 w-11 h-11 flex items-center justify-center border border-border bg-background/90 backdrop-blur-sm text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-0 disabled:pointer-events-none">
            <ChevronRight size={18} />
          </button>

          <div ref={scrollRef} onScroll={updateArrows} className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-px-6 pb-2 sm:gap-6">
            {collections.map((c, i) => (
              <motion.div key={c.slug} data-collection-card initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 3) * 0.05 }} className="flex-shrink-0 snap-start w-[164px] sm:w-[60%] lg:w-[31%]">
                <LocalizedLink to={`/shop?brand=${encodeURIComponent(BRAND)}&collection=${encodeURIComponent(c.name)}`} onClick={(event) => handleBrandCollectionFilterClick(event, c.name)} className="group block overflow-hidden rounded-xl border border-border bg-card hover:border-primary/40 transition-colors h-full">
                  <div className="relative h-[164px] overflow-hidden bg-secondary sm:h-[230px]">
                    {c.image ? (
                      <img src={c.image} alt={`${BRAND} ${c.name}`} loading="lazy" className="absolute inset-x-0 top-0 h-[calc(100%-48px)] w-full object-contain p-1.5 sm:p-5 md:p-6 group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <span className="font-display text-xl tracking-wide text-foreground/70 group-hover:text-foreground transition-colors">{c.name}</span>
                    )}
                    {c.isHorological && <span className="absolute top-3 left-3 text-[9px] tracking-[0.15em] uppercase bg-foreground/80 text-background px-2 py-1">{t('collectionCarousel.eyebrow')}</span>}
                    {c.isDiscontinued && <span className="absolute top-3 left-3 text-[9px] tracking-[0.15em] uppercase bg-foreground/80 text-background px-2 py-1">{t('product.vintage')}</span>}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-12 items-center px-3 sm:px-4">
                      <h3 className="line-clamp-2 font-body text-xs font-semibold leading-tight text-primary sm:text-sm">{c.name}</h3>
                    </div>
                  </div>
                </LocalizedLink>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
