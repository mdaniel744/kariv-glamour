import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { CARTIER_SEO_CARDS } from '@/lib/cartierData';

export default function CartierSeoCardGrid() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section id="discover" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('eyebrow.discover')}</span>
          <h2 className="text-3xl md:text-4xl text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">{t('heading.discoverBrand', { brand: 'Cartier' })}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARTIER_SEO_CARDS.map((card, i) =>
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i % 3 * 0.05 }}>
              <LocalizedLink to={card.link} className="group block border border-border bg-card p-8 transition-colors hover:border-primary/40">
                <h3 className="text-xl mb-3 text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">{localize(card, 'title')}</h3>
                <p className="text-xs leading-relaxed mb-5 text-muted-foreground">{localize(card, 'description')}</p>
                <span className="text-[10px] tracking-[0.15em] uppercase text-primary">{t('cta.discover')} →</span>
              </LocalizedLink>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}