import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLocalizedField } from '@/lib/localize';

export default function HublotIntro() {
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl mb-6 [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">
          {localize({ title_cs: "Výrazný design a moderní materiály", title_en: 'Bold Design and Modern Materials', title_de: 'Mutiges Design und moderne Materialien' }, 'title')}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {localize({ text_cs: "Hublot je známý výrazným současným designem hodinek, inovativními kombinacemi materiálů, odhalenou konstrukcí, skeletonizovanými ciferníky a osobitou identitou luxusních sportovních hodinek. Od výrazného modelu ", text_en: 'Hublot is known for bold contemporary watch design, innovative material combinations, visible architecture, skeletonized dials, and a strong luxury sports-watch identity. From the powerful ', text_de: 'Hublot ist bekannt für mutiges zeitgenössisches Uhrendesign, innovative Materialkombinationen, sichtbare Architektur, skeletonisierte Zifferblätter und eine starke Luxus-Sportuhren-Identität. Vom kraftvollen ' }, 'text')}
          <LocalizedLink to="/hublot/big-bang" className="text-primary underline">{localize({ text_cs: "Big Bang", text_en: 'Big Bang', text_de: 'Big Bang' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " přes střídmější ", text_en: ' to the more refined ', text_de: ' zur verfeinerten ' }, 'text')}
          <LocalizedLink to="/hublot/classic-fusion" className="text-primary underline">{localize({ text_cs: "Classic Fusion", text_en: 'Classic Fusion', text_de: 'Classic Fusion' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " až po soudkovitý ", text_en: ' and the tonneau-shaped ', text_de: ' und der tonneauförmigen ' }, 'text')}
          <LocalizedLink to="/hublot/spirit-of-big-bang" className="text-primary underline">{localize({ text_cs: "Spirit of Big Bang", text_en: 'Spirit of Big Bang', text_de: 'Spirit of Big Bang' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " oslovují hodinky Hublot sběratele, kteří hledají moderní design, výrazný dojem na zápěstí a technický charakter. Prohlédněte si náš výběr ", text_en: ', Hublot watches appeal to collectors who want modern design, wrist presence, and technical character. Explore our selection of ', text_de: ', sprechen Hublot Uhren Sammler an, die modernes Design, Handgelenkspräsenz und technischen Charakter suchen. Entdecken Sie unsere Auswahl an ' }, 'text')}
          <LocalizedLink to="/hublot-gebraucht" className="text-primary underline">{localize({ text_cs: "již nošených hodinek Hublot", text_en: 'pre-owned Hublot watches', text_de: 'gebrauchten Hublot Uhren' }, 'text')}</LocalizedLink>
          {localize({ text_cs: " vedle nových modelů.", text_en: ' alongside new models.', text_de: ' neben neuen Modellen.' }, 'text')}
        </p>
      </div>
    </section>);

}
