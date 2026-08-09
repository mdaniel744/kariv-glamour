import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { PANERAI_STORY_IMAGE } from '@/lib/paneraiData';

const BRAND = 'Panerai';

export default function PaneraiStoryTeaser() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('story.title', { brand: BRAND })}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">{t('story.title', { brand: BRAND })}</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            {localize({ text_en: 'Founded in 1860 in Florence, Italy, Panerai stands for bold Italian design, Swiss watchmaking, and military diving heritage. The ', text_de: '1860 in Florenz, Italien, gegründet, steht Panerai für markantes italienisches Design, Schweizer Uhrmacherei und militärische Taucher-Heritage. Die ' }, 'text')}
            <LocalizedLink to="/panerai/luminor" className="text-primary underline">{localize({ text_en: 'Luminor', text_de: 'Luminor' }, 'text')}</LocalizedLink>
            {localize({ text_en: " with its iconic crown-protecting bridge is Panerai's most recognizable collection. The ", text_de: " mit ihrer ikonischen kronenschützenden Brücke ist Panerais bekannteste Kollektion. Die " }, 'text')}
            <LocalizedLink to="/panerai/radiomir" className="text-primary underline">{localize({ text_en: 'Radiomir', text_de: 'Radiomir' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' carries historic vintage character, the ', text_de: ' trägt historischen Vintage-Charakter, die ' }, 'text')}
            <LocalizedLink to="/panerai/submersible" className="text-primary underline">{localize({ text_en: 'Submersible', text_de: 'Submersible' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' brings professional dive performance, and the ', text_de: ' bringt professionelle Tauch-Performance, und die ' }, 'text')}
            <LocalizedLink to="/panerai/luminor-due" className="text-primary underline">{localize({ text_en: 'Luminor Due', text_de: 'Luminor Due' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' offers slimmer, more elegant proportions. Explore our selection or browse ', text_de: ' bietet schlankere, elegantere Proportionen. Entdecken Sie unsere Auswahl oder stöbern Sie durch ' }, 'text')}
            <LocalizedLink to="/panerai-gebraucht" className="text-primary underline">{localize({ text_en: 'pre-owned Panerai', text_de: 'gebrauchte Panerai' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
          </p>
          <LocalizedLink to="/panerai/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{t('cta.readStory', { brand: BRAND })}</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-background">
          <img src={PANERAI_STORY_IMAGE} alt={`${BRAND} Luminor Marina watch detail`} className="w-full h-full object-contain p-5 md:p-7" />
        </motion.div>
      </div>
    </section>
  );
}
