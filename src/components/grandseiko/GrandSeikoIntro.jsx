import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLocalizedField } from '@/lib/localize';

export default function GrandSeikoIntro() {
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">
          {localize({ title_en: 'The Pure Essentials of Watchmaking', title_de: 'Die reinen Essentials der Uhrmacherei' }, 'title')}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {localize({ text_en: 'Grand Seiko raises the pure essentials of watchmaking to the level of art. Each timepiece embodies Japanese craftsmanship, precision, and a deep connection to nature. From the ', text_de: 'Grand Seiko erhebt die reinen Essentials der Uhrmacherei auf die Ebene der Kunst. Jeder Zeitmesser verkörpert japanische Handwerkskunst, Präzision und eine tiefe Verbindung zur Natur. Vom ' }, 'text')}
          <LocalizedLink to="/grand-seiko-snowflake" className="text-primary underline">{localize({ text_en: 'Snowflake', text_de: 'Snowflake' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' with its snowfield-inspired dial, to the ', text_de: ' mit seinem schneefeld-inspirierten Zifferblatt, bis zum ' }, 'text')}
          <LocalizedLink to="/grand-seiko-shunbun" className="text-primary underline">{localize({ text_en: 'Shunbun', text_de: 'Shunbun' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' capturing a fleeting spring moment, Grand Seiko dials reflect the beauty of Japan\'s four seasons. The brand\'s ', text_de: ', der einen flüchtigen Frühlingsmoment einfängt, spiegeln Grand Seiko Zifferblätter die Schönheit der vier Jahreszeiten Japans wider. Das ' }, 'text')}
          <LocalizedLink to="/grand-seiko-spring-drive" className="text-primary underline">{localize({ text_en: 'Spring Drive', text_de: 'Spring Drive' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' movement combines mechanical precision with quartz accuracy, while Zaratsu polishing creates distortion-free mirror finishes. Explore the ', text_de: ' Uhrwerk des Hauses verbindet mechanische Präzision mit Quarzgenauigkeit, während die Zaratsu-Politur verzerrungsfreie Spiegeloberflächen schafft. Entdecken Sie die ' }, 'text')}
          <LocalizedLink to="/grand-seiko/heritage" className="text-primary underline">{localize({ text_en: 'Heritage', text_de: 'Heritage' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', ', text_de: ', ' }, 'text')}
          <LocalizedLink to="/grand-seiko/elegance" className="text-primary underline">{localize({ text_en: 'Elegance', text_de: 'Elegance' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', ', text_de: ', ' }, 'text')}
          <LocalizedLink to="/grand-seiko/sport" className="text-primary underline">{localize({ text_en: 'Sport', text_de: 'Sport' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', ', text_de: ', ' }, 'text')}
          <LocalizedLink to="/grand-seiko/evolution-9" className="text-primary underline">{localize({ text_en: 'Evolution 9', text_de: 'Evolution 9' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', and ', text_de: ' und ' }, 'text')}
          <LocalizedLink to="/grand-seiko/masterpiece" className="text-primary underline">{localize({ text_en: 'Masterpiece', text_de: 'Masterpiece' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' collections, or browse our selection of ', text_de: ' Kollektionen, oder stöbern Sie durch unsere Auswahl an ' }, 'text')}
          <LocalizedLink to="/grand-seiko-gebraucht" className="text-primary underline">{localize({ text_en: 'pre-owned Grand Seiko', text_de: 'gebrauchten Grand Seiko' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
        </p>
      </div>
    </section>
  );
}