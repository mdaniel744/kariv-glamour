import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLocalizedField } from '@/lib/localize';

export default function JLCIntro() {
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">
          {localize({ title_cs: "Vytříbené švýcarské hodinářství a vysoké komplikace", title_en: 'Refined Swiss Watchmaking and High Horology', title_de: 'Raffinierte Schweizer Uhrmacherei und High Horology' }, 'title')}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {localize({ text_cs: "Jaeger-LeCoultre je ceněn pro vytříbené švýcarské hodinářství, ikonické pouzdro ", text_en: 'Jaeger-LeCoultre is celebrated for refined Swiss watchmaking, the iconic ', text_de: 'Jaeger-LeCoultre wird gefeiert für raffinierte Schweizer Uhrmacherei, das ikonische ' }, 'text')}
          <LocalizedLink to="/jaeger-lecoultre/reverso" className="text-primary underline">{localize({ text_cs: "Reverso", text_en: 'Reverso', text_de: 'Reverso' }, 'text')}</LocalizedLink>
          {localize({ text_cs: ", ultratenké společenské hodinky a vysoké hodinářské komplikace již od roku 1833. Od otočného modelu ", text_en: ' case, ultra-thin dress watches, and high horology complications since 1833. From the reversible ', text_de: '-Gehäuse, ultra-thin Kleideruhren und hoch-horologische Komplikationen seit 1833. Von der reversiblen ' }, 'text')}
          <LocalizedLink to="/jaeger-lecoultre/reverso" className="text-primary underline">{localize({ text_cs: "Reverso", text_en: 'Reverso', text_de: 'Reverso' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " a štíhlého ", text_en: ' and the slim ', text_de: ' und der schlanken ' }, 'text')}
          <LocalizedLink to="/jaeger-lecoultre/master-ultra-thin" className="text-primary underline">{localize({ text_cs: "Master Ultra Thin", text_en: 'Master Ultra Thin', text_de: 'Master Ultra Thin' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " přes klasický ", text_en: ', to the classic ', text_de: ', über die klassische ' }, 'text')}
          <LocalizedLink to="/jaeger-lecoultre/master-control" className="text-primary underline">{localize({ text_cs: "Master Control", text_en: 'Master Control', text_de: 'Master Control' }, 'text')}</LocalizedLink>
          {localize({ text_cs: ", sportovně zaměřený ", text_en: ', the sport-focused ', text_de: ', die sport-fokussierte ' }, 'text')}
          <LocalizedLink to="/jaeger-lecoultre/polaris" className="text-primary underline">{localize({ text_cs: "Polaris", text_en: 'Polaris', text_de: 'Polaris' }, 'text')}</LocalizedLink>
          {localize({ text_cs: ", dámský ", text_en: ', the feminine ', text_de: ', die feminine ' }, 'text')}
          <LocalizedLink to="/jaeger-lecoultre/rendez-vous" className="text-primary underline">{localize({ text_cs: "Rendez-Vous", text_en: 'Rendez-Vous', text_de: 'Rendez-Vous' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " a hodinářsky náročný ", text_en: ', and the high-watchmaking ', text_de: ', und die High-Watchmaking-Kollektion ' }, 'text')}
          <LocalizedLink to="/jaeger-lecoultre/duometre" className="text-primary underline">{localize({ text_cs: "Duometre", text_en: 'Duometre', text_de: 'Duometre' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " spojuje JLC technické mistrovství s nadčasovou elegancí. Prohlédněte si náš výběr ", text_en: ', JLC combines technical mastery with timeless elegance. Explore our selection of ', text_de: ' verbindet JLC technische Meisterschaft mit zeitloser Eleganz. Entdecken Sie unsere Auswahl an ' }, 'text')}
          <LocalizedLink to="/gebrauchte-jaeger-lecoultre" className="text-primary underline">{localize({ text_cs: "již nošených hodinek Jaeger-LeCoultre", text_en: 'pre-owned Jaeger-LeCoultre', text_de: 'gebrauchten Jaeger-LeCoultre' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " vedle nových modelů.", text_en: ' watches alongside new models.', text_de: ' Uhren neben neuen Modellen.' }, 'text')}
        </p>
      </div>
    </section>
  );
}
