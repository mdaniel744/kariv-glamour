import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { PATEK_SEO_CARDS } from '@/lib/patekData';

export default function PatekPhilippeSeoCardGrid() {
  const { t } = useTranslation('brandComponents');
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{t('eyebrow.discover')}</span>
          <h2 className="text-3xl md:text-4xl [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">{t('heading.discoverBrand', { brand: 'Patek Philippe' })}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PATEK_SEO_CARDS.map((card, i) =>
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <LocalizedLink to={card.link} className="group block h-full">
                <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-card">
                  {card.image ?
                <img src={card.image} alt={card.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> :

                <div className="w-full h-full flex items-center justify-center text-primary"><span className="text-xs tracking-[0.2em] uppercase">Patek Philippe</span></div>
                }
                </div>
                <h3 className="font-display text-lg font-light mb-3 text-foreground">{card.title}</h3>
                <p className="text-xs leading-relaxed mb-4 text-muted-foreground">{card.description}</p>
                <span className="text-[10px] tracking-[0.15em] uppercase group-hover:opacity-70 transition-opacity text-primary">{t('cta.exploreCollection')} →</span>
              </LocalizedLink>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}