import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLocalizedField } from '@/lib/localize';

export default function IWCIntro() {
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">
          {localize({ title_en: 'Engineering Precision and Aviation Heritage', title_de: 'Engineering-Präzision und Aviation-Erbe' }, 'title')}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {localize({ text_en: 'IWC Schaffhausen is celebrated for engineering precision, aviation heritage, refined dress-watch design, and classic Swiss watchmaking since 1868. From the iconic ', text_de: 'IWC Schaffhausen wird gefeiert für Engineering-Präzision, Aviation-Erbe, verfeinertes Dress-Uhren-Design und klassische Schweizer Uhrmacherei seit 1868. Von den ikonischen ' }, 'text')}
          <LocalizedLink to="/iwc-schaffhausen/pilots-watches" className="text-primary underline">{localize({ text_en: "Pilot's Watches", text_de: 'Fliegeruhren' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' and the elegant ', text_de: ' und dem eleganten ' }, 'text')}
          <LocalizedLink to="/iwc-schaffhausen/portugieser" className="text-primary underline">{localize({ text_en: 'Portugieser', text_de: 'Portugieser' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', to the dress-focused ', text_de: ', über das dress-fokussierte ' }, 'text')}
          <LocalizedLink to="/iwc-schaffhausen/portofino" className="text-primary underline">{localize({ text_en: 'Portofino', text_de: 'Portofino' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', the engineering-driven ', text_de: ', das engineering-getriebene ' }, 'text')}
          <LocalizedLink to="/iwc-schaffhausen/ingenieur" className="text-primary underline">{localize({ text_en: 'Ingenieur', text_de: 'Ingenieur' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', and the dive-focused ', text_de: ', und die tauch-fokussierte ' }, 'text')}
          <LocalizedLink to="/iwc-schaffhausen/aquatimer" className="text-primary underline">{localize({ text_en: 'Aquatimer', text_de: 'Aquatimer' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', IWC watches combine technical design with timeless style. Explore our selection of ', text_de: ', verbinden IWC-Uhren technisches Design mit zeitlosem Stil. Entdecken Sie unsere Auswahl an ' }, 'text')}
          <LocalizedLink to="/iwc-schaffhausen-gebraucht" className="text-primary underline">{localize({ text_en: 'pre-owned IWC Schaffhausen', text_de: 'gebrauchten IWC Schaffhausen' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' watches alongside new models.', text_de: ' Uhren neben neuen Modellen.' }, 'text')}
        </p>
      </div>
    </section>);
}