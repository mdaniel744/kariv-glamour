import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';

export default function RolexIntro() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">
          {t('eyebrow.maison')}
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl mb-8 text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">
          {localize({ title_cs: "Ikona švýcarského hodinářství", title_en: 'An Icon of Swiss Watchmaking', title_de: 'Ein Ikon der Schweizer Uhrmacherei' }, 'title')}
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-sm md:text-base leading-relaxed text-muted-foreground">
          {localize({
            text_cs: "Hodinky Rolex jsou ceněny pro svou přesnost, odolnost a nezaměnitelný design. Nabídka sahá od ", text_en: 'Rolex watches are admired for their precision, durability, and unmistakable design language. From ',
            text_de: 'Rolex Uhren werden für ihre Präzision, Haltbarkeit und unverkennbare Designsprache bewundert. Von '
          }, 'text')}
          <LocalizedLink to="/rolex/datejust" className="underline decoration-dotted hover:opacity-70 text-primary">
            {localize({ text_cs: "elegantních klasik", text_en: 'elegant classics', text_de: 'eleganten Klassikern' }, 'text')}
          </LocalizedLink>{' '}
          {localize({ text_cs: " až po ", text_en: ' to ', text_de: ' bis zu ' }, 'text')}
          <LocalizedLink to="/rolex/submariner" className="underline decoration-dotted hover:opacity-70 text-primary">
            {localize({ text_cs: "profesionální nástrojové hodinky", text_en: 'professional tool watches', text_de: 'professionellen Tool-Watches' }, 'text')}
          </LocalizedLink>
          {localize({
            text_cs: ". Rolex tak vytvořil jedny z nejznámějších hodinek moderního hodinářství. Na Kariv Glamour mohou zákazníci objevovat ", text_en: ', Rolex has created some of the most recognizable timepieces in modern watchmaking. At Kariv Glamour, customers can explore ',
            text_de: ' hat Rolex einige der erkennbarsten Zeitmesser der modernen Uhrmacherei geschaffen. Bei Kariv Glamour können Kunden '
          }, 'text')}
          <a href="#rolex-products" className="underline decoration-dotted hover:opacity-70 text-primary">
            {localize({ text_cs: "pečlivě vybrané hodinky Rolex", text_en: 'carefully selected Rolex watches', text_de: 'sorgfältig ausgewählte Rolex Uhren' }, 'text')}
          </a>{' '}
          {localize({
            text_cs: " s přehlednými údaji o produktu, transparentním ", text_en: ' with clear product details, transparent ',
            text_de: ' mit klaren Produktdetails, transparenter '
          }, 'text')}
          <LocalizedLink to="/condition-grading" className="underline decoration-dotted hover:opacity-70 text-primary">
            {localize({ text_cs: "hodnocením stavu", text_en: 'condition grading', text_de: 'Zustandsbewertung' }, 'text')}
          </LocalizedLink>
          {localize({
            text_cs: " a kultivovaným zážitkem z nákupu.", text_en: ', and a refined shopping experience.',
            text_de: ' und einem verfeinerten Einkaufserlebnis entdecken.'
          }, 'text')}
        </motion.p>
      </div>
    </section>
  );
}
