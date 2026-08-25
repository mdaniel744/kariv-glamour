import React, { useRef } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PATEK_COLLECTIONS } from '@/lib/patekData';
import { useBrandCollections } from '@/hooks/useBrandCollections';

const BRAND = 'Patek Philippe';

export default function PatekPhilippeCollectionCarousel() {
  const { t } = useTranslation('brandComponents');
  const scrollRef = useRef(null);
  const scroll = (dir) => { if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' }); };
  const { collections } = useBrandCollections(BRAND, PATEK_COLLECTIONS);

  return (
    <section id="patek-collections" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{t('collectionCarousel.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl mb-5 [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">{t('collectionCarousel.heading', { brand: BRAND })}</h2>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto text-muted-foreground">{t('collectionCarousel.description', { brand: BRAND })}</p>
        </div>

        <div className="relative">
          <button onClick={() => scroll(-1)} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full shadow-md transition-all hover:opacity-90 bg-primary text-primary-foreground"><ChevronLeft size={18} /></button>
          <button onClick={() => scroll(1)} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full shadow-md transition-all hover:opacity-90 bg-primary text-primary-foreground"><ChevronRight size={18} /></button>

          <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 md:pb-2 scroll-smooth snap-x no-scrollbar">
            {collections.map((col, i) =>
              <motion.div key={col.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex-shrink-0 w-[220px] sm:w-[280px] md:w-[300px] snap-start group">
                <LocalizedLink to={`/patek-philippe/${col.slug}`} className="group block overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50">
                  <div className="relative aspect-[3/4] overflow-hidden bg-card">
                    {col.image ?
                      <img src={col.image} alt={`${BRAND} ${col.name}`} loading="lazy" className="w-full h-full object-contain p-6 md:p-8 group-hover:scale-105 transition-transform duration-700" /> :
                      <div className="w-full h-full flex items-center justify-center text-primary"><span className="text-xs tracking-[0.2em] uppercase">{BRAND}</span></div>
                    }
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="px-4 py-3 font-body text-base font-semibold leading-snug text-foreground">{col.name}</h3>
                </LocalizedLink>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
