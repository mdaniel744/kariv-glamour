import React, { useRef, useState, useCallback, useEffect } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/lib/languageContext';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BVLGARI_COLLECTIONS } from '@/lib/bvlgariData';

export default function BvlgariCollectionGrid() {
  const { locale } = useLanguage();
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

  const desc = (c) => locale === 'de' ? c.shortDescription_de : c.shortDescription_en;

  return (
    <section id="collections" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Bvlgari Collections</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 text-[hsl(var(--primary))]">Discover Bvlgari Collections</h2>
          <p className="text-sm max-w-2xl mx-auto text-muted-foreground">Browse Bvlgari's official watch families — from the iconic Serpenti jewellery watch to the ultra-thin Octo Finissimo and elegant Lvcea.</p>
        </div>

        <div className="relative">
          <button onClick={() => scrollByDir(-1)} disabled={!canPrev} aria-label="Previous collections" className="absolute left-0 top-1/2 -translate-y-1/2 z-20 -ml-3 md:-ml-4 w-11 h-11 flex items-center justify-center border border-border bg-background/90 backdrop-blur-sm text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-0 disabled:pointer-events-none">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scrollByDir(1)} disabled={!canNext} aria-label="Next collections" className="absolute right-0 top-1/2 -translate-y-1/2 z-20 -mr-3 md:-mr-4 w-11 h-11 flex items-center justify-center border border-border bg-background/90 backdrop-blur-sm text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-0 disabled:pointer-events-none">
            <ChevronRight size={18} />
          </button>

          <div ref={scrollRef} onScroll={updateArrows} className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-px-6 pb-2">
            {BVLGARI_COLLECTIONS.map((c, i) =>
              <motion.div key={c.slug} data-collection-card initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i % 3 * 0.05 }} className="flex-shrink-0 snap-start w-[78%] sm:w-[60%] lg:w-[31%]">
                <LocalizedLink to={`/bvlgari/${c.slug}`} className="group block border border-border bg-card hover:border-primary/40 transition-colors h-full">
                  <div className="aspect-[4/3] overflow-hidden bg-secondary flex items-center justify-center">
                    {c.image ?
                      <img src={c.image} alt={`Bvlgari ${c.name}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> :
                      <span className="font-display text-xl tracking-wide text-foreground/70 group-hover:text-foreground transition-colors">{c.name}</span>
                    }
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-2 [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">{c.name}</h3>
                    <p className="text-xs leading-relaxed mb-4 text-muted-foreground">{desc(c)}</p>
                    <span className="text-[10px] tracking-[0.!15em] uppercase text-primary">Explore Collection &rarr;</span>
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