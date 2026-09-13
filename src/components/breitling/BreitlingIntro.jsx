import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLocalizedField } from '@/lib/localize';

export default function BreitlingIntro() {
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">
          {localize({ title_cs: "Letecká tradice a mistrovství chronografů", title_en: 'Aviation Heritage and Chronograph Expertise', title_de: 'Aviation-Erbe und Chronographen-Expertise' }, 'title')}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {localize({ text_cs: "Breitling je známý leteckou tradicí, přesnými chronografy, robustními potápěčskými hodinkami a profesionálními časoměrnými přístroji. Od ikonického modelu ", text_en: 'Breitling is known for aviation heritage, precision chronographs, robust dive watches and professional instrument timepieces. From the iconic ', text_de: 'Breitling ist bekannt für Aviation-Erbe, präzise Chronographen, robuste Tauchuhren und professionelle Instrumentenuhren. Vom ikonischen ' }, 'text')}
          <LocalizedLink to="/breitling/navitimer" className="text-primary underline">{localize({ text_cs: "Navitimer", text_en: 'Navitimer', text_de: 'Navitimer' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " s kruhovým logaritmickým pravítkem na lunetě přes všestranný ", text_en: ' with its circular slide rule bezel, to the versatile ', text_de: ' mit seiner Circular Slide Rule Lünette, über den vielseitigen ' }, 'text')}
          <LocalizedLink to="/breitling/chronomat" className="text-primary underline">{localize({ text_cs: "Chronomat", text_en: 'Chronomat', text_de: 'Chronomat' }, 'text')}</LocalizedLink>
          {localize({ text_cs: ", potápěčský ", text_en: ', the dive-ready ', text_de: ', die tauchtüchtige ' }, 'text')}
          <LocalizedLink to="/breitling/superocean" className="text-primary underline">{localize({ text_cs: "Superocean", text_en: 'Superocean', text_de: 'Superocean' }, 'text')}</LocalizedLink>
          {localize({ text_cs: ", výrazný ", text_en: ', the bold ', text_de: ', die kühne ' }, 'text')}
          <LocalizedLink to="/breitling/avenger" className="text-primary underline">{localize({ text_cs: "Avenger", text_en: 'Avenger', text_de: 'Avenger' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " a elegantních hodinek ", text_en: ' and the elegant ', text_de: ' und die elegante ' }, 'text')}
          <LocalizedLink to="/breitling/premier" className="text-primary underline">{localize({ text_cs: "Premier", text_en: 'Premier', text_de: 'Premier' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " oslovují hodinky Breitling sběratele, kteří oceňují technický charakter, přesnost a účelný design. Prohlédněte si náš výběr ", text_en: ', Breitling watches appeal to collectors who value technical character, precision and purpose-built design. Explore our selection of ', text_de: ', sprechen Breitling Uhren Sammler an, die technischen Charakter, Präzision und zweckmäßiges Design schätzen. Entdecken Sie unsere Auswahl an ' }, 'text')}
          <LocalizedLink to="/breitling-uhr-gebraucht" className="text-primary underline">{localize({ text_cs: "již nošených hodinek Breitling", text_en: 'pre-owned Breitling watches', text_de: 'gebrauchten Breitling Uhren' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " vedle nových modelů.", text_en: ' alongside new models.', text_de: ' neben neuen Modellen.' }, 'text')}
        </p>
      </div>
    </section>
  );
}
