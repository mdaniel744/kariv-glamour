import React, { useRef } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OMEGA_READ_MORE } from '@/lib/omegaData';

export default function OmegaReadMoreCarousel() {
  const { t } = useTranslation('brandComponents');
  const scrollRef = useRef(null);
  const scroll = (dir) => {if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });};

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{t('eyebrow.editorial')}</span>
            <h2 className="text-3xl md:text-4xl [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">{t('heading.readMoreAbout', { brand: 'Omega' })}</h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={() => scroll(-1)} className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-foreground"><ChevronLeft size={18} /></button>
            <button onClick={() => scroll(1)} className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-foreground"><ChevronRight size={18} /></button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x no-scrollbar">
          {OMEGA_READ_MORE.map((card, i) =>
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex-shrink-0 w-[300px] snap-start group">
              <LocalizedLink to={card.link} className="block">
                <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-card">
                  <img src={card.image} alt={card.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="text-lg mb-2 [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">{card.title}</h3>
                <p className="text-xs leading-relaxed mb-3 line-clamp-2 text-muted-foreground">{card.description}</p>
                <span className="text-[10px] tracking-[0.12em] uppercase group-hover:opacity-70 text-primary">{t('cta.readMore')} →</span>
              </LocalizedLink>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}