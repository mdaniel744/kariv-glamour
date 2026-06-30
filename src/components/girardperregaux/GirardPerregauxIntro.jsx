import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';

export default function GirardPerregauxIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">Swiss Haute Horlogerie & Visible Mechanics</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Girard-Perregaux stands for Swiss haute horlogerie, visible mechanics, and integrated-bracelet design. From the sport-chic <LocalizedLink to="/girard-perregaux/laureato" className="text-primary underline">Laureato</LocalizedLink> to the refined <LocalizedLink to="/girard-perregaux/1966" className="text-primary underline">1966</LocalizedLink> dress watches, the Art Deco <LocalizedLink to="/girard-perregaux/vintage-1945" className="text-primary underline">Vintage 1945</LocalizedLink>, the visible-mechanics <LocalizedLink to="/girard-perregaux/bridges" className="text-primary underline">Bridges</LocalizedLink>, and the rare <LocalizedLink to="/girard-perregaux-jackpot" className="text-primary underline">Jackpot Tourbillon</LocalizedLink> — Girard-Perregaux delivers understated haute horlogerie with strong collector appeal. Explore our full collection or browse <LocalizedLink to="/girard-perregaux-gebraucht" className="text-primary underline">pre-owned Girard-Perregaux</LocalizedLink> watches.
        </p>
      </div>
    </section>
  );
}