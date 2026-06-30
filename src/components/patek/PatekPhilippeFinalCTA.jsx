import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function PatekPhilippeFinalCTA() {
  const { t } = useTranslation('brandComponents');
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">{t('eyebrow.yourNextTimepiece')}</span>
          <h2 className="text-3xl md:text-4xl mb-6 [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">{t('finalCTA.findYourNext', { brand: 'Patek Philippe' })}</h2>
          <p className="text-sm leading-relaxed mb-10 max-w-xl mx-auto text-muted-foreground">{t('finalCTA.description', { brand: 'Patek Philippe' })}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#patek-products" className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90 bg-primary text-primary-foreground">{t('cta.shopBrand', { brand: 'Patek Philippe' })}</a>
            <LocalizedLink to="/welche-patek-philippe-kaufen" className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-colors hover:bg-secondary border-primary text-primary">{t('cta.exploreBuyingGuide', { brand: 'Patek Philippe' })}</LocalizedLink>
          </div>
        </motion.div>
      </div>
    </section>);

}