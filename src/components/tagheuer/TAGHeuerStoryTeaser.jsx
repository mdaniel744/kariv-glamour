import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { TH_STORY_IMAGE } from '@/lib/tagHeuerData';

const BRAND = 'TAG Heuer';

export default function TAGHeuerStoryTeaser() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('story.title', { brand: BRAND })}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">{t('story.title', { brand: BRAND })}</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            {localize({ text_cs: "TAG Heuer založil Edouard Heuer v roce 1860. Značka má kořeny v motorsportu, přesném měření času a inovacích chronografů. Model ", text_en: 'Founded in 1860 by Edouard Heuer, TAG Heuer is rooted in motorsport, precision timing, and chronograph innovation. The ', text_de: '1860 von Edouard Heuer gegründet, ist TAG Heuer verwurzelt in Motorsport, Präzisions-Zeitmessung und Chronographen-Innovation. Die ' }, 'text')}
            <LocalizedLink to="/tag-heuer/carrera" className="text-primary underline">{localize({ text_cs: "Carrera", text_en: 'Carrera', text_de: 'Carrera' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " vznikl v roce 1963 ze světa automobilových závodů, zatímco model ", text_en: ' was born on the racetrack in 1963, while the square-case ', text_de: ' wurde 1963 auf der Rennstrecke geboren, während die Quadratgehäuse-' }, 'text')}
            <LocalizedLink to="/tag-heuer/monaco" className="text-primary underline">{localize({ text_cs: "Monaco", text_en: 'Monaco', text_de: 'Monaco' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " se čtvercovým pouzdrem proslavil Steve McQueen. Řada ", text_en: ' became an icon through Steve McQueen. The ', text_de: ' durch Steve McQueen zur Ikone wurde. Die ' }, 'text')}
            <LocalizedLink to="/tag-heuer/aquaracer" className="text-primary underline">{localize({ text_cs: "Aquaracer", text_en: 'Aquaracer', text_de: 'Aquaracer' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " nabízí u modelů 300M výkon pro potápění, ", text_en: ' brings 300M dive performance, the ', text_de: ' bringt 300M Tauch-Performance, die ' }, 'text')}
            <LocalizedLink to="/tag-heuer/formula-1" className="text-primary underline">{localize({ text_cs: "Formula 1", text_en: 'Formula 1', text_de: 'Formula 1' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " přináší dostupnější sportovní styl a ", text_en: ' delivers accessible sport, and the ', text_de: ' liefert zugänglichen Sport, und die ' }, 'text')}
            <LocalizedLink to="/tag-heuer/connected" className="text-primary underline">{localize({ text_cs: "Connected", text_en: 'Connected', text_de: 'Connected' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " Calibre E5 představuje vizi luxusních chytrých hodinek TAG Heuer. Prohlédněte si naši nabídku nebo ", text_en: ' Calibre E5 represents TAG Heuer\'s luxury smartwatch vision. Explore our selection or browse ', text_de: ' Calibre E5 repräsentiert TAG Heuers Luxus-Smartwatch-Vision. Entdecken Sie unsere Auswahl oder stöbern Sie durch ' }, 'text')}
            <LocalizedLink to="/tag-heuer-gebraucht" className="text-primary underline">{localize({ text_cs: "již nošené hodinky TAG Heuer", text_en: 'pre-owned TAG Heuer', text_de: 'gebrauchte TAG Heuer' }, 'text')}</LocalizedLink>
            {localize({ text_cs: ".", text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
          </p>
          <LocalizedLink to="/tag-heuer/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{t('cta.readStory', { brand: BRAND })}</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-secondary">
          <img src={TH_STORY_IMAGE} alt={`${BRAND} chronograph detail`} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
