import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { JLC_STORY_IMAGE } from '@/lib/jaegerLeCoultreData';

const BRAND = 'Jaeger-LeCoultre';

export default function JLCStoryTeaser() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('story.title', { brand: BRAND })}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">{t('story.title', { brand: BRAND })}</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            {localize({ text_cs: "Jaeger-LeCoultre byl založen v roce 1833 a je ceněn pro vytříbené švýcarské hodinářství, ikonické pouzdro ", text_en: 'Founded in 1833, Jaeger-LeCoultre is celebrated for refined Swiss watchmaking, the iconic ', text_de: '1833 gegründet, wird Jaeger-LeCoultre gefeiert für raffinierte Schweizer Uhrmacherei, das ikonische ' }, 'text')}
            <LocalizedLink to="/jaeger-lecoultre/reverso" className="text-primary underline">{localize({ text_cs: "Reverso", text_en: 'Reverso', text_de: 'Reverso' }, 'text')}</LocalizedLink>
            {localize({ text_cs: ", ultratenké společenské hodinky a vysoké hodinářské komplikace. Od otočného modelu ", text_en: ' case, ultra-thin dress watches, and high horology complications. From the reversible ', text_de: '-Gehäuse, ultra-thin Kleideruhren und hoch-horologische Komplikationen. Von der reversiblen ' }, 'text')}
            <LocalizedLink to="/jaeger-lecoultre/reverso" className="text-primary underline">{localize({ text_cs: "Reverso", text_en: 'Reverso', text_de: 'Reverso' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " a štíhlého ", text_en: ' and the slim ', text_de: ' und der schlanken ' }, 'text')}
            <LocalizedLink to="/jaeger-lecoultre/master-ultra-thin" className="text-primary underline">{localize({ text_cs: "Master Ultra Thin", text_en: 'Master Ultra Thin', text_de: 'Master Ultra Thin' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " přes klasický ", text_en: ', to the classic ', text_de: ', über die klassische ' }, 'text')}
            <LocalizedLink to="/jaeger-lecoultre/master-control" className="text-primary underline">{localize({ text_cs: "Master Control", text_en: 'Master Control', text_de: 'Master Control' }, 'text')}</LocalizedLink>
            {localize({ text_cs: ", sportovně zaměřený ", text_en: ', the sport-focused ', text_de: ', die sport-fokussierte ' }, 'text')}
            <LocalizedLink to="/jaeger-lecoultre/polaris" className="text-primary underline">{localize({ text_cs: "Polaris", text_en: 'Polaris', text_de: 'Polaris' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " a hodinářsky náročný ", text_en: ', and the high-watchmaking ', text_de: ', und die High-Watchmaking-Kollektion ' }, 'text')}
            <LocalizedLink to="/jaeger-lecoultre/duometre" className="text-primary underline">{localize({ text_cs: "Duometre", text_en: 'Duometre', text_de: 'Duometre' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " spojuje JLC technické mistrovství s nadčasovou elegancí. Prohlédněte si náš výběr ", text_en: ', JLC combines technical mastery with timeless elegance. Explore our selection of ', text_de: ' verbindet JLC technische Meisterschaft mit zeitloser Eleganz. Entdecken Sie unsere Auswahl an ' }, 'text')}
            <LocalizedLink to="/gebrauchte-jaeger-lecoultre" className="text-primary underline">{localize({ text_cs: "již nošených hodinek Jaeger-LeCoultre", text_en: 'pre-owned Jaeger-LeCoultre', text_de: 'gebrauchten Jaeger-LeCoultre' }, 'text')}</LocalizedLink>
            {localize({ text_cs: ".", text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
          </p>
          <LocalizedLink to="/jaeger-lecoultre/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{t('cta.readStory', { brand: 'JLC' })}</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-secondary">
          <img src={JLC_STORY_IMAGE} alt={`${BRAND} watch`} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
