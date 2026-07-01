import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLocalizedField } from '@/lib/localize';

export default function TAGHeuerIntro() {
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">
          {localize({ title_en: 'Motorsport Heritage & Chronograph Excellence', title_de: 'Motorsport-Heritage & Chronographen-Exzellenz' }, 'title')}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {localize({ text_en: 'TAG Heuer stands for motorsport, precision timing, and chronograph innovation. From the racing-inspired ', text_de: 'TAG Heuer steht für Motorsport, Präzisions-Zeitmessung und Chronographen-Innovation. Von der Rennsport-inspirierten ' }, 'text')}
          <LocalizedLink to="/tag-heuer/carrera" className="text-primary underline">{localize({ text_en: 'Carrera', text_de: 'Carrera' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' to the square-case ', text_de: ' bis zur Quadratgehäuse-' }, 'text')}
          <LocalizedLink to="/tag-heuer/monaco" className="text-primary underline">{localize({ text_en: 'Monaco', text_de: 'Monaco' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', the dive-ready ', text_de: ', der tauchbereiten ' }, 'text')}
          <LocalizedLink to="/tag-heuer/aquaracer" className="text-primary underline">{localize({ text_en: 'Aquaracer', text_de: 'Aquaracer' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' with 300M water resistance, the sporty ', text_de: ' mit 300M Wasserfestigkeit, der sportlichen ' }, 'text')}
          <LocalizedLink to="/tag-heuer/formula-1" className="text-primary underline">{localize({ text_en: 'Formula 1', text_de: 'Formula 1' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', and the ', text_de: ', und der ' }, 'text')}
          <LocalizedLink to="/tag-heuer/connected" className="text-primary underline">{localize({ text_en: 'Connected', text_de: 'Connected' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' Calibre E5 luxury smartwatch — TAG Heuer delivers performance-driven timepieces. Explore our full collection or browse ', text_de: ' Calibre E5 Luxus-Smartwatch — TAG Heuer liefert Performance-getriebene Zeitmesser. Entdecken Sie unsere gesamte Kollektion oder stöbern Sie durch ' }, 'text')}
          <LocalizedLink to="/tag-heuer-gebraucht" className="text-primary underline">{localize({ text_en: 'pre-owned TAG Heuer', text_de: 'gebrauchte TAG Heuer' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
        </p>
      </div>
    </section>
  );
}