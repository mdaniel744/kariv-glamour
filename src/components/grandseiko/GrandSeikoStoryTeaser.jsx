import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { GS_STORY_IMAGE } from '@/lib/grandSeikoData';

const BRAND = 'Grand Seiko';

export default function GrandSeikoStoryTeaser() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('story.title', { brand: BRAND })}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">{t('story.title', { brand: BRAND })}</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            {localize({ text_en: 'Grand Seiko raises the pure essentials of watchmaking to the level of art. Born in Japan in 1960, the brand is guided by the Grammar of Design — a philosophy of precision, balance, and restraint. Zaratsu polishing creates distortion-free mirror surfaces, while ', text_de: 'Grand Seiko erhebt die reinen Essentials der Uhrmacherei auf die Ebene der Kunst. 1960 in Japan geboren, wird die Marke von der Grammar of Design geleitet — einer Philosophie der Präzision, Balance und Zurückhaltung. Die Zaratsu-Politur erzeugt verzerrungsfreie Spiegeloberflächen, während ' }, 'text')}
            <LocalizedLink to="/grand-seiko-spring-drive" className="text-primary underline">{localize({ text_en: 'Spring Drive', text_de: 'Spring Drive' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' movements achieve approximately one second per day accuracy. Nature-inspired dials like the ', text_de: ' Uhrwerke eine Genauigkeit von etwa einer Sekunde pro Tag erreichen. Naturinspirierte Zifferblätter wie der ' }, 'text')}
            <LocalizedLink to="/grand-seiko-snowflake" className="text-primary underline">{localize({ text_en: 'Snowflake', text_de: 'Snowflake' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' and ', text_de: ' und ' }, 'text')}
            <LocalizedLink to="/grand-seiko-shunbun" className="text-primary underline">{localize({ text_en: 'Shunbun', text_de: 'Shunbun' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' reflect the beauty of Japan\'s four seasons. Explore the ', text_de: ' spiegeln die Schönheit der vier Jahreszeiten Japans wider. Entdecken Sie die ' }, 'text')}
            <LocalizedLink to="/grand-seiko/heritage" className="text-primary underline">{localize({ text_en: 'Heritage', text_de: 'Heritage' }, 'text')}</LocalizedLink>
            {localize({ text_en: ', ', text_de: ', ' }, 'text')}
            <LocalizedLink to="/grand-seiko/elegance" className="text-primary underline">{localize({ text_en: 'Elegance', text_de: 'Elegance' }, 'text')}</LocalizedLink>
            {localize({ text_en: ', ', text_de: ', ' }, 'text')}
            <LocalizedLink to="/grand-seiko/sport" className="text-primary underline">{localize({ text_en: 'Sport', text_de: 'Sport' }, 'text')}</LocalizedLink>
            {localize({ text_en: ', ', text_de: ', ' }, 'text')}
            <LocalizedLink to="/grand-seiko/evolution-9" className="text-primary underline">{localize({ text_en: 'Evolution 9', text_de: 'Evolution 9' }, 'text')}</LocalizedLink>
            {localize({ text_en: ', and ', text_de: ' und ' }, 'text')}
            <LocalizedLink to="/grand-seiko/masterpiece" className="text-primary underline">{localize({ text_en: 'Masterpiece', text_de: 'Masterpiece' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' collections, or browse ', text_de: ' Kollektionen, oder stöbern Sie durch ' }, 'text')}
            <LocalizedLink to="/grand-seiko-gebraucht" className="text-primary underline">{localize({ text_en: 'pre-owned Grand Seiko', text_de: 'gebrauchte Grand Seiko' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
          </p>
          <LocalizedLink to="/grand-seiko/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{t('cta.readStory', { brand: BRAND })}</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-secondary">
          <img src={GS_STORY_IMAGE} alt={`${BRAND} watch detail`} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>);
}