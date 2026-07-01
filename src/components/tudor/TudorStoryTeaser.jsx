import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { TUDOR_STORY_IMAGE } from '@/lib/tudorData';

const BRAND = 'Tudor';

export default function TudorStoryTeaser() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('story.title', { brand: BRAND })}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">{t('story.title', { brand: BRAND })}</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            {localize({ text_en: 'Founded in 1926 by Hans Wilsdorf, the creator of Rolex, Tudor stands for robust Swiss watchmaking with tool-watch character. The ', text_de: '1926 von Hans Wilsdorf, dem Schöpfer von Rolex, gegründet, steht Tudor für robuste Schweizer Uhrmacherei mit Tool-Watch-Charakter. Die ' }, 'text')}
            <LocalizedLink to="/tudor/black-bay" className="text-primary underline">{localize({ text_en: 'Black Bay', text_de: 'Black Bay' }, 'text')}</LocalizedLink>
            {localize({ text_en: " is Tudor's most recognizable dive watch family, known for vintage-inspired design and snowflake hands. The ", text_de: " ist Tudors bekannteste Tauchuhr-Familie, bekannt für vintage-inspiriertes Design und Snowflake-Zeiger. Die " }, 'text')}
            <LocalizedLink to="/tudor/pelagos" className="text-primary underline">{localize({ text_en: 'Pelagos', text_de: 'Pelagos' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' brings professional 500M dive performance in titanium, the ', text_de: ' bringt professionelle 500M Tauch-Performance in Titan, der ' }, 'text')}
            <LocalizedLink to="/tudor/tudor-royal" className="text-primary underline">{localize({ text_en: 'Tudor Royal', text_de: 'Tudor Royal' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' delivers versatile everyday luxury, and the ', text_de: ' liefert vielseitigen Alltagsluxus, und der ' }, 'text')}
            <LocalizedLink to="/tudor/ranger" className="text-primary underline">{localize({ text_en: 'Ranger', text_de: 'Ranger' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' embodies field-watch simplicity. Explore our selection or browse ', text_de: ' verkörpert Field-Watch-Einfachheit. Entdecken Sie unsere Auswahl oder stöbern Sie durch ' }, 'text')}
            <LocalizedLink to="/tudor-gebraucht" className="text-primary underline">{localize({ text_en: 'pre-owned Tudor', text_de: 'gebrauchte Tudor' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
          </p>
          <LocalizedLink to="/tudor/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{t('cta.readStory', { brand: BRAND })}</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-secondary">
          <img src={TUDOR_STORY_IMAGE} alt={`${BRAND} Black Bay 58 watch detail`} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}