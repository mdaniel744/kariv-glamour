import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';

export default function BvlgariIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">Italian Luxury Design & Roman Heritage</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Bvlgari stands for Italian luxury design, Roman jewellery heritage, and Swiss watchmaking. From the iconic <LocalizedLink to="/bvlgari/serpenti" className="text-primary underline">Serpenti</LocalizedLink> jewellery watch for women to the ultra-thin <LocalizedLink to="/bvlgari/octo-finissimo" className="text-primary underline">Octo Finissimo</LocalizedLink> for men, the classic <LocalizedLink to="/bvlgari/octo-roma" className="text-primary underline">Octo Roma</LocalizedLink>, the elegant <LocalizedLink to="/bvlgari/lvcea" className="text-primary underline">Lvcea</LocalizedLink>, and the signature <LocalizedLink to="/bvlgari/bulgari-bulgari" className="text-primary underline">Bulgari Bulgari</LocalizedLink> — Bvlgari delivers bold Italian timepieces with strong personality. Explore our full collection or browse <LocalizedLink to="/bvlgari-gebraucht" className="text-primary underline">pre-owned Bvlgari</LocalizedLink> watches.
        </p>
      </div>
    </section>
  );
}