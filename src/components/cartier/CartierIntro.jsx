import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';

export default function CartierIntro() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl mb-6 text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">
          {localize({ title_cs: "Elegance, tvar a nadčasový design", title_en: 'Elegance, Shape and Timeless Design', title_de: 'Eleganz, Form und zeitloses Design' }, 'title')}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {localize({ text_cs: "Hodinky Cartier jsou známé osobitými tvary, římskými číslicemi, vytříbenými proporcemi a elegantním designovým jazykem. Od obdélníkového modelu ", text_en: 'Cartier watches are known for their distinctive shapes, Roman numerals, refined proportions, and elegant design language. From the rectangular ', text_de: 'Cartier Uhren sind bekannt für ihre markanten Formen, römischen Ziffern, verfeinerten Proportionen und elegante Designsprache. Vom rechteckigen ' }, 'text')}
          <LocalizedLink to="/cartier-tank-kaufen" className="underline text-primary">{localize({ text_cs: "Tank", text_en: 'Tank', text_de: 'Tank' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " přes průkopnický ", text_en: ' to the pioneering ', text_de: ' zum bahnbrechenden ' }, 'text')}
          <LocalizedLink to="/cartier-santos-kaufen" className="underline text-primary">{localize({ text_cs: "Santos de Cartier", text_en: 'Santos de Cartier', text_de: 'Santos de Cartier' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " až po půvabný ", text_en: ' and the graceful ', text_de: ' und der anmutigen ' }, 'text')}
          <LocalizedLink to="/cartier-panthere-kaufen" className="underline text-primary">{localize({ text_cs: "Panthère de Cartier", text_en: 'Panthère de Cartier', text_de: 'Panthère de Cartier' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " vytvořil tento dům jedny z nejznámějších luxusních hodinek. Objevte náš výběr ", text_en: ', the Maison has created some of the most recognizable watches in luxury watchmaking. Discover our selection of ', text_de: ' hat die Maison einige der erkennbarsten Uhren der Luxusuhren-Herstellung geschaffen. Entdecken Sie unsere Auswahl an ' }, 'text')}
          <LocalizedLink to="/cartier-gebraucht-kaufen" className="underline text-primary">{localize({ text_cs: "již nošených hodinek Cartier", text_en: 'pre-owned Cartier watches', text_de: 'gebrauchten Cartier Uhren' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " vedle nových modelů.", text_en: ' alongside new models.', text_de: ' neben neuen Modellen.' }, 'text')}
        </p>
      </div>
    </section>
  );
}
