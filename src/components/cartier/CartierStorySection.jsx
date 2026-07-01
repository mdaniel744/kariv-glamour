import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { CARTIER_STORY_IMAGE } from '@/lib/cartierData';

const BRAND = 'Cartier';

export default function CartierStorySection() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('story.title', { brand: BRAND })}</span>
          <h2 className="text-3xl md:text-4xl mb-6 text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">{t('story.title', { brand: BRAND })}</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            {localize({ text_en: 'Cartier has shaped luxury design through a unique combination of jewellery expertise, watchmaking creativity, and instantly recognizable forms. Its watches are often defined by strong shapes, Roman numerals, elegant proportions, and a refined sense of Parisian style. Explore the ', text_de: 'Cartier hat das Luxusdesign durch eine einzigartige Verbindung aus Schmuckexpertise, uhrmacherischer Kreativität und unverkennbaren Formen geprägt. Seine Uhren sind oft durch starke Formen, römische Ziffern, elegante Proportionen und einen verfeinerten Sinn für Pariser Stil definiert. Entdecken Sie den ' }, 'text')}
            <LocalizedLink to="/cartier-tank-kaufen" className="underline text-primary">{localize({ text_en: 'Cartier Tank', text_de: 'Cartier Tank' }, 'text')}</LocalizedLink>,{' '}
            <LocalizedLink to="/cartier-santos-kaufen" className="underline text-primary">{localize({ text_en: 'Santos de Cartier', text_de: 'Santos de Cartier' }, 'text')}</LocalizedLink>,{' '}
            <LocalizedLink to="/cartier-damen" className="underline text-primary">{localize({ text_en: 'Cartier watches for women', text_de: 'Cartier Uhren für Damen' }, 'text')}</LocalizedLink>{' '}
            {localize({ text_en: 'and ', text_de: 'und ' }, 'text')}
            <LocalizedLink to="/cartier-herren" className="underline text-primary">{localize({ text_en: 'Cartier watches for men', text_de: 'Cartier Uhren für Herren' }, 'text')}</LocalizedLink>.
          </p>
          <LocalizedLink to="/cartier/story" className="inline-flex items-center justify-center px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-90 bg-primary text-primary-foreground">{t('cta.readStory', { brand: BRAND })}</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden border border-border">
          <img src={CARTIER_STORY_IMAGE} alt={`${BRAND} watch story`} loading="lazy" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}