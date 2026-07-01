import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLocalizedField } from '@/lib/localize';

export default function PaneraiIntro() {
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">
          {localize({ title_en: 'Bold Italian Design & Diving Heritage', title_de: 'Markantes Italienisches Design & Taucher-Heritage' }, 'title')}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {localize({ text_en: 'Panerai stands for bold Italian design, Swiss watchmaking precision, and military diving heritage. From the iconic ', text_de: 'Panerai steht für markantes italienisches Design, Schweizer Präzisions-Uhrmacherei und militärische Taucher-Heritage. Von der ikonischen ' }, 'text')}
          <LocalizedLink to="/panerai/luminor" className="text-primary underline">{localize({ text_en: 'Luminor', text_de: 'Luminor' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' with its crown-protecting bridge to the historic ', text_de: ' mit ihrer kronenschützenden Brücke bis zur historischen ' }, 'text')}
          <LocalizedLink to="/panerai/radiomir" className="text-primary underline">{localize({ text_en: 'Radiomir', text_de: 'Radiomir' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', the technical ', text_de: ', der technischen ' }, 'text')}
          <LocalizedLink to="/panerai/submersible" className="text-primary underline">{localize({ text_en: 'Submersible', text_de: 'Submersible' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' dive watch, and the slimmer ', text_de: ' Tauchuhr und der schlankeren ' }, 'text')}
          <LocalizedLink to="/panerai/luminor-due" className="text-primary underline">{localize({ text_en: 'Luminor Due', text_de: 'Luminor Due' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' — Panerai delivers bold, masculine timepieces with strong wrist presence. Explore our full collection or browse ', text_de: ' — Panerai liefert markante, maskuline Zeitmesser mit starker Handgelenkspräsenz. Entdecken Sie unsere gesamte Kollektion oder stöbern Sie durch ' }, 'text')}
          <LocalizedLink to="/panerai-gebraucht" className="text-primary underline">{localize({ text_en: 'pre-owned Panerai', text_de: 'gebrauchte Panerai' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
        </p>
      </div>
    </section>
  );
}