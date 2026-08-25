import React, { useRef } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OMEGA_COLLECTIONS } from '@/lib/omegaData';
import { useBrandCollections } from '@/hooks/useBrandCollections';

const BRAND = 'Omega';

export default function OmegaCollectionCarousel() {
  const { t } = useTranslation('brandComponents');
  const scrollRef = useRef(null);
  const scroll = (dir) => { if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' }); };
  const { collections } = useBrandCollections(BRAND, OMEGA_COLLECTIONS);
  const MAIN_COLLECTIONS = collections.filter((c) => c.parentCollection === null);

  return (
    <section id="omega-collections" data-brand-collections className="bg-background py-3 sm:py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div data-brand-collections-header className="hidden">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{t('collectionCarousel.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl mb-4 text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">{t('collectionCarousel.heading', { brand: BRAND })}</h2>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto text-muted-foreground">{t('collectionCarousel.description', { brand: BRAND })}</p>
        </div>

        <div className="hidden md:flex items-center justify-end gap-2 mb-6">
          <button onClick={() => scroll(-1)} className="w-10 h-10 border border-border flex items-center justify-center transition-colors hover:border-primary hover:text-primary text-foreground"><ChevronLeft size={18} /></button>
          <button onClick={() => scroll(1)} className="w-10 h-10 border border-border flex items-center justify-center transition-colors hover:border-primary hover:text-primary text-foreground"><ChevronRight size={18} /></button>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 md:pb-2 scroll-smooth snap-x no-scrollbar">
          {MAIN_COLLECTIONS.map((col, i) =>
            <motion.div key={col.id} data-collection-card initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex-shrink-0 w-[220px] snap-start group sm:w-[280px]">
              <LocalizedLink to={`/omega/${col.slug}`} className="group block overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50">
                <div className="relative aspect-[4/5] overflow-hidden bg-card">
                  <img src={col.image} alt={`${BRAND} ${col.name}`} loading="lazy" className="w-full h-full object-contain p-5 md:p-6 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="px-4 py-3 font-body text-base font-semibold leading-snug text-foreground">{col.name}</h3>
              </LocalizedLink>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
