import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { AP_STORY_IMAGE } from '@/lib/audemarsPiguetData';

const BRAND = 'Audemars Piguet';

export default function APStoryTeaser() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('story.title', { brand: BRAND })}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">{t('story.title', { brand: BRAND })}</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            {localize({ text_cs: "Audemars Piguet je ceněn pro výraznou architekturu pouzder, integrované náramky, špičkové zpracování a komplikace. Od ikonického modelu ", text_en: 'Audemars Piguet is celebrated for bold case architecture, integrated bracelet design, high-end finishing and complications. From the iconic ', text_de: 'Audemars Piguet wird gefeiert für kühne Gehäusearchitektur, integriertes Armbanddesign, hochwertige Oberflächenbearbeitung und Komplikationen. Von der ikonischen ' }, 'text')}
            <LocalizedLink to="/audemars-piguet/royal-oak" className="text-primary underline">{localize({ text_cs: "Royal Oak", text_en: 'Royal Oak', text_de: 'Royal Oak' }, 'text')}</LocalizedLink>
            {localize({ text_cs: ", který v roce 1972 navrhl Gérald Genta, přes sportovnější ", text_en: ' designed by Gerald Genta in 1972, to the sportier ', text_de: ', entworfen von Gerald Genta 1972, über die sportlichere ' }, 'text')}
            <LocalizedLink to="/audemars-piguet/royal-oak-offshore" className="text-primary underline">{localize({ text_cs: "Royal Oak Offshore", text_en: 'Royal Oak Offshore', text_de: 'Royal Oak Offshore' }, 'text')}</LocalizedLink>
            {localize({ text_cs: ", technický ", text_en: ', the technical ', text_de: ', die technische ' }, 'text')}
            <LocalizedLink to="/audemars-piguet/royal-oak-concept" className="text-primary underline">{localize({ text_cs: "Royal Oak Concept", text_en: 'Royal Oak Concept', text_de: 'Royal Oak Concept' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " a moderní ", text_en: ', and the modern ', text_de: ', und die moderne ' }, 'text')}
            <LocalizedLink to="/audemars-piguet/code-1159" className="text-primary underline">{localize({ text_cs: "Code 11.59", text_en: 'Code 11.59', text_de: 'Code 11.59' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " spojují hodinky AP architektonický design s přesností a komplikacemi. Prohlédněte si náš výběr ", text_en: ', AP watches combine architectural design with precision and complications. Explore our selection of ', text_de: ', verbinden AP-Uhren architektonisches Design mit Präzision und Komplikationen. Entdecken Sie unsere Auswahl an ' }, 'text')}
            <LocalizedLink to="/audemars-piguet-gebraucht" className="text-primary underline">{localize({ text_cs: "již nošených hodinek AP", text_en: 'pre-owned AP', text_de: 'gebrauchten AP' }, 'text')}</LocalizedLink>
            {localize({ text_cs: ".", text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
          </p>
          <LocalizedLink to="/audemars-piguet/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{t('cta.readStory', { brand: BRAND })}</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-black">
          <img src={AP_STORY_IMAGE} alt={`${BRAND} Royal Oak`} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
