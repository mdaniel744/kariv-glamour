import React, { useRef } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PATEK_READ_MORE } from '@/lib/patekData';

const BRAND = 'Patek Philippe';

export default function PatekPhilippeReadMoreCarousel() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  const scrollRef = useRef(null);
  const scroll = (dir) => { if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' }); };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{t('eyebrow.editorial')}</span>
          <h2 className="text-3xl md:text-4xl [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">{t('heading.readMoreAbout', { brand: BRAND })}</h2>
        </div>

        <div className="relative">
          <button onClick={() => scroll(-1)} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full shadow-md transition-all hover:opacity-90 bg-primary text-primary-foreground"><ChevronLeft size={18} /></button>
          <button onClick={() => scroll(1)} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full shadow-md transition-all hover:opacity-90 bg-primary text-primary-foreground"><ChevronRight size={18} /></button>

          <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x no-scrollbar">
            {PATEK_READ_MORE.map((card, i) =>
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex-shrink-0 w-[260px] md:w-[280px] snap-start group">
                <LocalizedLink to={card.link} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-card">
                    {card.image ?
                      <img src={card.image} alt={localize(card, 'title')} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> :
                      <div className="w-full h-full flex items-center justify-center text-primary"><span className="text-xs tracking-[0.2em] uppercase">{BRAND}</span></div>
                    }
                  </div>
                  <h3 className="font-display text-lg font-light mb-2 text-foreground">{localize(card, 'title')}</h3>
                  <p className="text-xs leading-relaxed mb-4 line-clamp-3 text-muted-foreground">{localize(card, 'description')}</p>
                  <span className="text-[10px] tracking-[0.15em] uppercase group-hover:opacity-70 transition-opacity text-primary">{t('cta.readMore')} →</span>
                </LocalizedLink>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}