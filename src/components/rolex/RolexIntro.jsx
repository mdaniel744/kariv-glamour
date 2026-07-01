import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';

export default function RolexIntro() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">
          {t('eyebrow.maison')}
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl mb-8 text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">
          {localize({ title_en: 'An Icon of Swiss Watchmaking', title_de: 'Ein Ikon der Schweizer Uhrmacherei' }, 'title')}
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-sm md:text-base leading-relaxed text-muted-foreground">
          Rolex watches are admired for their precision, durability, and unmistakable design language. From{' '}
          <LocalizedLink to="/rolex/datejust" className="underline decoration-dotted hover:opacity-70 text-primary">elegant classics</LocalizedLink>{' '}
          to{' '}
          <LocalizedLink to="/rolex/submariner" className="underline decoration-dotted hover:opacity-70 text-primary">professional tool watches</LocalizedLink>, Rolex has created some of the most recognizable timepieces in modern watchmaking. At Kariv Glamour, customers can explore{' '}
          <a href="#rolex-products" className="underline decoration-dotted hover:opacity-70 text-primary">carefully selected Rolex watches</a>{' '}
          with clear product details, transparent{' '}
          <LocalizedLink to="/condition-grading" className="underline decoration-dotted hover:opacity-70 text-primary">condition grading</LocalizedLink>, and a refined shopping experience.
        </motion.p>
      </div>
    </section>);

}