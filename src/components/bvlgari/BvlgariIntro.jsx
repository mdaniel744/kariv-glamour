import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLocalizedField } from '@/lib/localize';

export default function BvlgariIntro() {
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">
          {localize({ title_en: 'Italian Luxury Design & Roman Heritage', title_de: 'Italienisches Luxusdesign & Römisches Erbe' }, 'title')}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {localize({ text_en: 'Bvlgari stands for Italian luxury design, Roman jewellery heritage, and Swiss watchmaking. From the iconic ', text_de: 'Bvlgari steht für italienisches Luxusdesign, römisches Schmuck-Erbe und Schweizer Uhrmacherkunst. Von der ikonischen ' }, 'text')}
          <LocalizedLink to="/bvlgari/serpenti" className="text-primary underline">{localize({ text_en: 'Serpenti', text_de: 'Serpenti' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' jewellery watch for women to the ultra-thin ', text_de: ' Schmuckuhr für Damen bis zur ultradünnen ' }, 'text')}
          <LocalizedLink to="/bvlgari/octo-finissimo" className="text-primary underline">{localize({ text_en: 'Octo Finissimo', text_de: 'Octo Finissimo' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' for men, the classic ', text_de: ' für Herren, der klassischen ' }, 'text')}
          <LocalizedLink to="/bvlgari/octo-roma" className="text-primary underline">{localize({ text_en: 'Octo Roma', text_de: 'Octo Roma' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', the elegant ', text_de: ', der eleganten ' }, 'text')}
          <LocalizedLink to="/bvlgari/lvcea" className="text-primary underline">{localize({ text_en: 'Lvcea', text_de: 'Lvcea' }, 'text')}</LocalizedLink>
          {localize({ text_en: ', and the signature ', text_de: ', und der signature ' }, 'text')}
          <LocalizedLink to="/bvlgari/bulgari-bulgari" className="text-primary underline">{localize({ text_en: 'Bulgari Bulgari', text_de: 'Bulgari Bulgari' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' — Bvlgari delivers bold Italian timepieces with strong personality. Explore our full collection or browse ', text_de: ' — Bvlgari liefert markante italienische Zeitmesser mit starker Persönlichkeit. Entdecken Sie unsere gesamte Kollektion oder stöbern Sie durch ' }, 'text')}
          <LocalizedLink to="/bvlgari-gebraucht" className="text-primary underline">{localize({ text_en: 'pre-owned Bvlgari', text_de: 'gebrauchte Bvlgari' }, 'text')}</LocalizedLink>
          {localize({ text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
        </p>
      </div>
    </section>
  );
}