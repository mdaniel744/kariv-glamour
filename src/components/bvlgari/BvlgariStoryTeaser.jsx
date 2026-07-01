import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { BVLGARI_STORY_IMAGE } from '@/lib/bvlgariData';

const BRAND = 'Bvlgari';

export default function BvlgariStoryTeaser() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('story.title', { brand: BRAND })}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">{t('story.title', { brand: BRAND })}</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            {localize({ text_en: 'Founded in 1884 in Rome, Bvlgari stands for Italian luxury design, Roman jewellery heritage, and Swiss watchmaking. The ', text_de: '1884 in Rom gegründet, steht Bvlgari für italienisches Luxusdesign, römisches Schmuck-Erbe und Schweizer Uhrmacherkunst. Die ' }, 'text')}
            <LocalizedLink to="/bvlgari/serpenti" className="text-primary underline">{localize({ text_en: 'Serpenti', text_de: 'Serpenti' }, 'text')}</LocalizedLink>
            {localize({ text_en: " is Bvlgari's most iconic jewellery watch with serpent-inspired design. The ", text_de: " ist Bvlgaris ikonischste Schmuckuhr mit schlangeninspiriertem Design. Die " }, 'text')}
            <LocalizedLink to="/bvlgari/octo-finissimo" className="text-primary underline">{localize({ text_en: 'Octo Finissimo', text_de: 'Octo Finissimo' }, 'text')}</LocalizedLink>
            {localize({ text_en: " leads men's haute horlogerie with ultra-thin architecture. The ", text_de: " führt die männliche Haute Horlogerie mit ultradünner Architektur. Die " }, 'text')}
            <LocalizedLink to="/bvlgari/octo-roma" className="text-primary underline">{localize({ text_en: 'Octo Roma', text_de: 'Octo Roma' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' offers classic Roman design, the ', text_de: ' bietet klassisches römisches Design, die ' }, 'text')}
            <LocalizedLink to="/bvlgari/lvcea" className="text-primary underline">{localize({ text_en: 'Lvcea', text_de: 'Lvcea' }, 'text')}</LocalizedLink>
            {localize({ text_en: " brings elegant women's watches, and the ", text_de: " bringt elegante Damenuhren, und die " }, 'text')}
            <LocalizedLink to="/bvlgari/bulgari-bulgari" className="text-primary underline">{localize({ text_en: 'Bulgari Bulgari', text_de: 'Bulgari Bulgari' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' is the signature logo-bezel line. Explore our selection or browse ', text_de: ' ist die signature Logo-Lünette Linie. Entdecken Sie unsere Auswahl oder stöbern Sie durch ' }, 'text')}
            <LocalizedLink to="/bvlgari-gebraucht" className="text-primary underline">{localize({ text_en: 'pre-owned Bvlgari', text_de: 'gebrauchte Bvlgari' }, 'text')}</LocalizedLink>
            {localize({ text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
          </p>
          <LocalizedLink to="/bvlgari/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{t('cta.readStory', { brand: BRAND })}</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-secondary">
          <img src={BVLGARI_STORY_IMAGE} alt={`${BRAND} Aluminium watch detail`} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}