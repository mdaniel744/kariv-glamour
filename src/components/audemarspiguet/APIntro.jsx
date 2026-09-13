import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLocalizedField } from '@/lib/localize';

export default function APIntro() {
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">
          {localize({ title_cs: "Výrazná architektura pouzder a špičkové zpracování", title_en: 'Bold Case Architecture and High-End Finishing', title_de: 'Kühne Gehäusearchitektur und hochwertige Oberflächenbearbeitung' }, 'title')}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {localize({ text_cs: "Audemars Piguet je ceněn pro výraznou architekturu pouzder, integrované náramky, špičkové zpracování a komplikace. Od ikonického modelu ", text_en: 'Audemars Piguet is celebrated for bold case architecture, integrated bracelet design, high-end finishing, and complications. From the iconic ', text_de: 'Audemars Piguet wird gefeiert für kühne Gehäusearchitektur, integriertes Armbanddesign, hochwertige Oberflächenbearbeitung und Komplikationen. Von der ikonischen ' }, 'text')}
          <LocalizedLink to="/audemars-piguet/royal-oak" className="text-primary underline">{localize({ text_cs: "Royal Oak", text_en: 'Royal Oak', text_de: 'Royal Oak' }, 'text')}</LocalizedLink>
          {localize({ text_cs: ", který v roce 1972 navrhl Gérald Genta, přes sportovnější ", text_en: ' designed by Gerald Genta in 1972, to the sportier ', text_de: ', entworfen von Gerald Genta 1972, über die sportlichere ' }, 'text')}
          <LocalizedLink to="/audemars-piguet/royal-oak-offshore" className="text-primary underline">{localize({ text_cs: "Royal Oak Offshore", text_en: 'Royal Oak Offshore', text_de: 'Royal Oak Offshore' }, 'text')}</LocalizedLink>
          {localize({ text_cs: ", uvedený v roce 1993, přes technický ", text_en: ' launched in 1993, the technical ', text_de: ' von 1993, die technische ' }, 'text')}
          <LocalizedLink to="/audemars-piguet/royal-oak-concept" className="text-primary underline">{localize({ text_cs: "Royal Oak Concept", text_en: 'Royal Oak Concept', text_de: 'Royal Oak Concept' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " a moderní ", text_en: ', and the modern ', text_de: ', und die moderne ' }, 'text')}
          <LocalizedLink to="/audemars-piguet/code-1159" className="text-primary underline">{localize({ text_cs: "Code 11.59", text_en: 'Code 11.59', text_de: 'Code 11.59' }, 'text')}</LocalizedLink>
          {localize({ text_cs: ", představený v roce 2019, oslovují hodinky AP sběratele, kteří oceňují architektonický design, přesnost a komplikace. Prohlédněte si náš výběr ", text_en: ' revealed in 2019, AP watches appeal to collectors who value architectural design, precision, and complications. Explore our selection of ', text_de: ' von 2019 sprechen AP-Uhren Sammler an, die architektonisches Design, Präzision und Komplikationen schätzen. Entdecken Sie unsere Auswahl an ' }, 'text')}
          <LocalizedLink to="/audemars-piguet-gebraucht" className="text-primary underline">{localize({ text_cs: "již nošených hodinek Audemars Piguet", text_en: 'pre-owned Audemars Piguet', text_de: 'gebrauchten Audemars Piguet' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " vedle nových modelů.", text_en: ' watches alongside new models.', text_de: ' Uhren neben neuen Modellen.' }, 'text')}
        </p>
      </div>
    </section>
  );
}
