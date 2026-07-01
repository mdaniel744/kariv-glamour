import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';

const BRAND = 'Breitling';

export default function BreitlingStoryTeaser() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('story.title', { brand: BRAND })}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">{t('story.title', { brand: BRAND })}</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            {localize({ text_en: 'Breitling is recognized for its aviation heritage, chronograph expertise and identity as instruments for professionals. From the iconic ', text_de: 'Breitling wird anerkannt für sein Aviation-Erbe, seine Chronographen-Expertise und seine Identität als Instrumente für Profis. Vom ikonischen ' }, 'text')}
            <LocalizedLink to="/breitling/navitimer" className="text-primary underline">{localize({ text_en: 'Navitimer', text_de: 'Navitimer' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' to the versatile ', text_de: ' zum vielseitigen ' }, 'text')}
            <LocalizedLink to="/breitling/chronomat" className="text-primary underline">{localize({ text_en: 'Chronomat', text_de: 'Chronomat' }, 'text')}</LocalizedLink>
            {localize({ text_en: ', the dive-ready ', text_de: ', die tauchtüchtige ' }, 'text')}
            <LocalizedLink to="/breitling/superocean" className="text-primary underline">{localize({ text_en: 'Superocean', text_de: 'Superocean' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' and the ', text_de: ' und die ' }, 'text')}
            <LocalizedLink to="/breitling/professional" className="text-primary underline">{localize({ text_en: 'Professional', text_de: 'Professional' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' line, Breitling watches combine technical character with purpose-built design. Explore our selection of ', text_de: ' Linie verbinden Breitling Uhren technischen Charakter mit zweckmäßigem Design. Entdecken Sie unsere Auswahl an ' }, 'text')}
            <LocalizedLink to="/breitling-uhr-gebraucht" className="text-primary underline">{localize({ text_en: 'pre-owned Breitling', text_de: 'gebrauchten Breitling' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
          </p>
          <LocalizedLink to="/breitling/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{t('cta.readStory', { brand: BRAND })}</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] border border-border bg-card flex flex-col items-center justify-center">
          <span className="font-display text-3xl tracking-[0.2em] text-foreground/70">BREITLING</span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-3">Since 1884</span>
        </motion.div>
      </div>
    </section>
  );
}