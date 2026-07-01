import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLocalizedField } from '@/lib/localize';

export default function GirardPerregauxIntro() {
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">
          {localize({ title_en: 'Swiss Haute Horlogerie & Visible Mechanics', title_de: 'Schweizer Haute Horlogerie & Sichtbare Mechanik' }, 'title')}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {localize({ text_en: 'Girard-Perregaux stands for Swiss haute horlogerie, visible mechanics, and integrated-bracelet design. From the sport-chic ', text_de: 'Girard-Perregaux steht für Schweizer Haute Horlogerie, sichtbare Mechanik und integriertes Armband-Design. Von der Sport-chic ' }, 'text')}
          <LocalizedLink to="/girard-perregaux/laureato" className="text-primary underline">{localize({ text_en: 'Laureato', text_de: 'Laureato' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' to the refined ', text_de: ' bis zu den verfeinerten ' }, 'text')}
          <LocalizedLink to="/girard-perregaux/1966" className="text-primary underline">{localize({ text_en: '1966', text_de: '1966' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' dress watches, the Art Deco ', text_de: ' Dress-Watches, der Art-Deco-' }, 'text')}
          <LocalizedLink to="/girard-perregaux/vintage-1945" className="text-primary underline">{localize({ text_en: 'Vintage 1945', text_de: 'Vintage 1945' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', the visible-mechanics ', text_de: ', der sichtbare-Mechanik-' }, 'text')}
          <LocalizedLink to="/girard-perregaux/bridges" className="text-primary underline">{localize({ text_en: 'Bridges', text_de: 'Bridges' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', and the rare ', text_de: ', und der seltene ' }, 'text')}
          <LocalizedLink to="/girard-perregaux-jackpot" className="text-primary underline">{localize({ text_en: 'Jackpot Tourbillon', text_de: 'Jackpot Tourbillon' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' — Girard-Perregaux delivers understated haute horlogerie with strong collector appeal. Explore our full collection or browse ', text_de: ' — Girard-Perregaux liefert zurückhaltende Haute Horlogerie mit starker Sammler-Anziehungskraft. Entdecken Sie unsere gesamte Kollektion oder stöbern Sie durch ' }, 'text')}
          <LocalizedLink to="/girard-perregaux-gebraucht" className="text-primary underline">{localize({ text_en: 'pre-owned Girard-Perregaux', text_de: 'gebrauchte Girard-Perregaux' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
        </p>
      </div>
    </section>
  );
}