import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';

const BRAND = 'Patek Philippe';

export default function PatekPhilippeEditorialSection({ section, reverse }) {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();

  return (
    <section id={section.id} className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${reverse ? 'md:[direction:rtl]' : ''}`}>
          <motion.div initial={{ opacity: 0, x: reverse ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="[direction:ltr]">
            <div className="aspect-[4/3] overflow-hidden bg-card">
              <img src={section.image} alt={localize(section, 'title')} loading="lazy" className="w-full h-full object-cover" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="[direction:ltr]">
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{localize(section, 'eyebrow')}</span>
            <h2 className="text-3xl md:text-4xl mb-6 [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">{localize(section, 'title')}</h2>
            <p className="text-sm leading-relaxed mb-6 text-muted-foreground">{localize(section, 'description')}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
              {section.internalLinks?.map((link, i) =>
                <LocalizedLink key={i} to={link.link} className="text-[11px] underline decoration-dotted hover:opacity-70 text-primary">{localize(link, 'text')}</LocalizedLink>
              )}
            </div>
            <LocalizedLink to={section.link} className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-colors hover:bg-background border-primary text-primary">{localize(section, 'cta')}</LocalizedLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}