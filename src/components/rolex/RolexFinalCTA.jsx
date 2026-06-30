import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function RolexFinalCTA() {
  const { t } = useTranslation('brandComponents');
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">{t('eyebrow.yourNextTimepiece')}</span>
          <h2 className="text-4xl md:text-5xl mb-6 text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">{t('finalCTA.findYourNext', { brand: 'Rolex' })}</h2>
          <p className="text-sm md:text-base leading-relaxed mb-10 max-w-xl mx-auto text-muted-foreground">{t('finalCTA.description', { brand: 'Rolex' })}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#rolex-products" className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90 bg-primary text-primary-foreground">{t('cta.shopBrand', { brand: 'Rolex' })}</a>
            <LocalizedLink to="/welche-rolex-kaufen" className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-colors hover:bg-secondary border-primary text-primary">{t('cta.exploreBuyingGuide', { brand: 'Rolex' })}</LocalizedLink>
          </div>
        </motion.div>
      </div>
    </section>);

}