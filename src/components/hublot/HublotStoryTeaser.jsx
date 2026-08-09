import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { HUBLOT_STORY_IMAGE } from '@/lib/hublotData';

const BRAND = 'Hublot';

export default function HublotStoryTeaser() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('story.title', { brand: BRAND })}</span>
          <h2 className="text-3xl md:text-4xl mb-6 [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">{t('story.title', { brand: BRAND })}</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            {localize({ text_en: 'Hublot is recognized for its modern approach to luxury watchmaking, combining unexpected materials, bold architecture and contemporary design. Its collections are known for strong visual identity, technical presence and a distinctive fusion of materials. Explore the ', text_de: 'Hublot wird anerkannt für seinen modernen Ansatz in der Luxusuhrenherstellung, der unerwartete Materialien, markante Architektur und zeitgenössisches Design verbindet. Seine Kollektionen sind bekannt für starke visuelle Identität, technische Präsenz und eine unverkennbare Fusion von Materialien. Entdecken Sie die ' }, 'text')}
            <LocalizedLink to="/hublot/big-bang" className="text-primary underline">{localize({ text_en: 'Big Bang', text_de: 'Big Bang' }, 'text')}</LocalizedLink>
            {localize({ text_en: ', ', text_de: ', ' }, 'text')}
            <LocalizedLink to="/hublot/classic-fusion" className="text-primary underline">{localize({ text_en: 'Classic Fusion', text_de: 'Classic Fusion' }, 'text')}</LocalizedLink>
            {localize({ text_en: ', ', text_de: ', ' }, 'text')}
            <LocalizedLink to="/guides" className="text-primary underline">{localize({ text_en: 'modern materials', text_de: 'modernen Materialien' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' and our selection of ', text_de: ' und unsere Auswahl an ' }, 'text')}
            <LocalizedLink to="/hublot-gebraucht" className="text-primary underline">{localize({ text_en: 'pre-owned Hublot', text_de: 'gebrauchten Hublot' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
          </p>
          <LocalizedLink to="/hublot/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{t('cta.readStory', { brand: BRAND })}</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] border border-border bg-card overflow-hidden">
          <img src={HUBLOT_STORY_IMAGE} alt={`${BRAND} watchmaking story`} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>);

}
