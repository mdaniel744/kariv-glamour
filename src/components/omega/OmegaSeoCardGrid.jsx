import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { OMEGA_SEO_CARDS } from '@/lib/omegaData';

export default function OmegaSeoCardGrid() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{t('eyebrow.discover')}</span>
          <h2 className="text-3xl md:text-4xl text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">{t('heading.discoverBrand', { brand: 'Omega' })}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {OMEGA_SEO_CARDS.map((card, i) =>
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <LocalizedLink to={card.link} className="group block h-full">
                <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-card">
                  <img src={card.image} alt={localize(card, 'title')} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg mb-2 text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">{localize(card, 'title')}</h3>
                <p className="text-xs leading-relaxed mb-3 text-muted-foreground">{localize(card, 'description')}</p>
                <span className="text-[10px] tracking-[0.12em] uppercase group-hover:opacity-70 text-primary">{t('cta.exploreCollection')} →</span>
              </LocalizedLink>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}