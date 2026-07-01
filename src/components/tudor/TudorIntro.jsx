import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLocalizedField } from '@/lib/localize';

export default function TudorIntro() {
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">
          {localize({ title_en: 'Robust Swiss Luxury & Tool-Watch Character', title_de: 'Robuster Schweizer Luxus & Tool-Watch-Charakter' }, 'title')}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {localize({ text_en: 'Tudor stands for robust Swiss watchmaking, precision, and tool-watch heritage. From the vintage-inspired ', text_de: 'Tudor steht für robuste Schweizer Uhrmacherei, Präzision und Tool-Watch-Heritage. Von der vintage-inspirierten ' }, 'text')}
          <LocalizedLink to="/tudor/black-bay" className="text-primary underline">{localize({ text_en: 'Black Bay', text_de: 'Black Bay' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' dive watch to the professional ', text_de: ' Tauchuhr bis zur professionellen ' }, 'text')}
          <LocalizedLink to="/tudor/pelagos" className="text-primary underline">{localize({ text_en: 'Pelagos', text_de: 'Pelagos' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', the versatile ', text_de: ', der vielseitigen ' }, 'text')}
          <LocalizedLink to="/tudor/tudor-royal" className="text-primary underline">{localize({ text_en: 'Tudor Royal', text_de: 'Tudor Royal' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', the rugged ', text_de: ', der robusten ' }, 'text')}
          <LocalizedLink to="/tudor/ranger" className="text-primary underline">{localize({ text_en: 'Ranger', text_de: 'Ranger' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' field watch, the classic ', text_de: ' Field-Watch, der klassischen ' }, 'text')}
          <LocalizedLink to="/tudor/1926" className="text-primary underline">{localize({ text_en: '1926', text_de: '1926' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', and the elegant ', text_de: ', und der eleganten ' }, 'text')}
          <LocalizedLink to="/tudor/clair-de-rose" className="text-primary underline">{localize({ text_en: 'Clair de Rose', text_de: 'Clair de Rose' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' — Tudor delivers performance-driven timepieces. Explore our full collection or browse ', text_de: ' — Tudor liefert Performance-getriebene Zeitmesser. Entdecken Sie unsere gesamte Kollektion oder stöbern Sie durch ' }, 'text')}
          <LocalizedLink to="/tudor-gebraucht" className="text-primary underline">{localize({ text_en: 'pre-owned Tudor', text_de: 'gebrauchte Tudor' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
        </p>
      </div>
    </section>
  );
}