import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';

export default function OmegaIntro() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">{t('eyebrow.maison')}</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl mb-8 text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">
          {localize({ title_cs: "Švýcarská preciznost, vesmírné dědictví a výkon pod hladinou", title_en: 'Swiss Precision, Space Heritage and Ocean Performance', title_de: 'Schweizer Präzision, Weltraum-Erbe und Ozeanleistung' }, 'title')}
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-sm md:text-base leading-relaxed text-muted-foreground">
          {localize({ text_cs: "Omega patří k nejznámějším švýcarským výrobcům hodinek. Proslula přesností, technickými inovacemi, sportovní časomírou, vesmírnou historií i hodinkami pro potápění. Od modelu ", text_en: 'Omega is one of Switzerland\'s most recognized watchmakers, admired for precision, technical innovation, sport timing, space history, and ocean-ready performance. From the ', text_de: 'Omega ist einer der bekanntesten Schweizer Uhrmacher, bewundert für Präzision, technische Innovation, Sportzeitmessung, Weltraumgeschichte und ozean-taugliche Leistung. Von der ' }, 'text')}
          <LocalizedLink to="/omega-moonwatch-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">{localize({ text_cs: "Speedmaster Moonwatch", text_en: 'Speedmaster Moonwatch', text_de: 'Speedmaster Moonwatch' }, 'text')}</LocalizedLink>{' '}
          {localize({ text_cs: "přes ", text_en: 'to the ', text_de: 'zur ' }, 'text')}
          <LocalizedLink to="/omega-seamaster-diver-300m-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">{localize({ text_cs: "Seamaster Diver 300M", text_en: 'Seamaster Diver 300M', text_de: 'Seamaster Diver 300M' }, 'text')}</LocalizedLink>,{' '}
          <LocalizedLink to="/omega-seamaster-planet-ocean-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">{localize({ text_cs: "Planet Ocean", text_en: 'Planet Ocean', text_de: 'Planet Ocean' }, 'text')}</LocalizedLink>,{' '}
          <LocalizedLink to="/omega-constellation-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">{localize({ text_cs: "Constellation", text_en: 'Constellation', text_de: 'Constellation' }, 'text')}</LocalizedLink>{' '}
          {localize({ text_cs: "a ", text_en: 'and ', text_de: 'und ' }, 'text')}
          <LocalizedLink to="/omega-de-ville-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">{localize({ text_cs: "De Ville", text_en: 'De Ville', text_de: 'De Ville' }, 'text')}</LocalizedLink>{' '}
          {localize({ text_cs: "nabízí kolekce Omega široký výběr luxusních hodinek pro sběratele, profesionály i každodenní nošení. Objevte ", text_en: 'collections, Omega offers a wide range of luxury watches for collectors, professionals and everyday wear. Explore ', text_de: 'Kollektionen bietet Omega eine breite Palette von Luxusuhren für Sammler, Profis und den täglichen Gebrauch. Entdecken Sie ' }, 'text')}
          <LocalizedLink to="/omega-gebraucht-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">{localize({ text_cs: "již nošené hodinky Omega", text_en: 'pre-owned Omega watches', text_de: 'gebrauchte Omega Uhren' }, 'text')}</LocalizedLink>{' '}
          {localize({ text_cs: "s přehledným ", text_en: 'with clear ', text_de: 'mit klarer ' }, 'text')}
          <LocalizedLink to="/condition-grading" className="underline decoration-dotted hover:opacity-70 text-primary">{localize({ text_cs: "hodnocením stavu", text_en: 'condition grading', text_de: 'Zustandsbewertung' }, 'text')}</LocalizedLink>{' '}
          {localize({ text_cs: "a kultivovaným zážitkem z nákupu.", text_en: 'and a refined shopping experience.', text_de: 'und einem verfeinerten Einkaufserlebnis.' }, 'text')}
        </motion.p>
      </div>
    </section>
  );
}
