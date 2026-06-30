import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';

export default function CartierIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl mb-6 [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">Elegance, Shape and Timeless Design</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Cartier watches are known for their distinctive shapes, Roman numerals, refined proportions, and elegant design language. From the rectangular <LocalizedLink to="/cartier-tank-kaufen" className="underline text-primary">Tank</LocalizedLink> to the pioneering <LocalizedLink to="/cartier-santos-kaufen" className="underline text-primary">Santos de Cartier</LocalizedLink> and the graceful <LocalizedLink to="/cartier-panthere-kaufen" className="underline text-primary">Panthère de Cartier</LocalizedLink>, the Maison has created some of the most recognizable watches in luxury watchmaking. Discover our selection of <LocalizedLink to="/cartier-gebraucht-kaufen" className="underline text-primary">pre-owned Cartier watches</LocalizedLink> alongside new models.
        </p>
      </div>
    </section>);

}