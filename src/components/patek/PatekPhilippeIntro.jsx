import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';

export default function PatekPhilippeIntro() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">{t('intro.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl mb-8 [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">{t('intro.title')}</h2>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            {localize({ text_de: 'Patek Philippe ist einer der respektiertesten Namen der Haute Horlogerie, bewundert für verfeinertes Design, komplexe Uhrmacherei, Familienbesitz und außergewöhnliche Sammleranziehungskraft. Von eleganten ', text_en: 'Patek Philippe is one of the most respected names in haute horlogerie, admired for refined design, complex watchmaking, family heritage, and exceptional collector appeal. From elegant ' }, 'text')}
            <LocalizedLink to="/patek-philippe/calatrava" className="underline decoration-dotted hover:opacity-70 text-primary">{localize({ text_de: 'Calatrava-Uhren', text_en: 'Calatrava watches' }, 'text')}</LocalizedLink>{' '}
            {localize({ text_de: 'bis zu hochbegehrten ', text_en: 'to highly coveted ' }, 'text')}
            <LocalizedLink to="/patek-philippe-nautilus-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">Nautilus</LocalizedLink>{' '}
            {localize({ text_de: 'und ', text_en: 'and ' }, 'text')}
            <LocalizedLink to="/patek-philippe-aquanaut-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">Aquanaut</LocalizedLink>{' '}
            {localize({ text_de: 'Modellen repräsentiert Patek Philippe eine Welt, in der Handwerkskunst, Seltenheit und Tradition aufeinandertreffen. Erkunden Sie ', text_en: 'models, Patek Philippe represents a world where craftsmanship, rarity, and tradition meet. Explore ' }, 'text')}
            <LocalizedLink to="/patek-philippe/grand-complications" className="underline decoration-dotted hover:opacity-70 text-primary">{localize({ text_de: 'komplexe Uhrmacherei', text_en: 'complex watchmaking' }, 'text')}</LocalizedLink>{' '}
            {localize({ text_de: 'und entdecken Sie die ', text_en: 'and discover the ' }, 'text')}
            <LocalizedLink to="/welche-patek-philippe-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">{localize({ text_de: 'Sammleranziehungskraft', text_en: 'collector appeal' }, 'text')}</LocalizedLink>{' '}
            {localize({ text_de: ', die diese außergewöhnliche Marke definiert. Das Verständnis der ', text_en: ' that defines this extraordinary brand. Understanding ' }, 'text')}
            <LocalizedLink to="/condition-grading" className="underline decoration-dotted hover:opacity-70 text-primary">{localize({ text_de: 'Zustandsbewertung', text_en: 'condition grading' }, 'text')}</LocalizedLink>{' '}
            {localize({ text_de: 'ist beim Kauf einer Patek Philippe unerlässlich.', text_en: 'is essential when considering a Patek Philippe purchase.' }, 'text')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}