import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';

export default function IWCIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">Engineering Precision and Aviation Heritage</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          IWC Schaffhausen is celebrated for engineering precision, aviation heritage, refined dress-watch design, and classic Swiss watchmaking since 1868. From the iconic <LocalizedLink to="/iwc-schaffhausen/pilots-watches" className="text-primary underline">Pilot&rsquo;s Watches</LocalizedLink> and the elegant <LocalizedLink to="/iwc-schaffhausen/portugieser" className="text-primary underline">Portugieser</LocalizedLink>, to the dress-focused <LocalizedLink to="/iwc-schaffhausen/portofino" className="text-primary underline">Portofino</LocalizedLink>, the engineering-driven <LocalizedLink to="/iwc-schaffhausen/ingenieur" className="text-primary underline">Ingenieur</LocalizedLink>, and the dive-focused <LocalizedLink to="/iwc-schaffhausen/aquatimer" className="text-primary underline">Aquatimer</LocalizedLink>, IWC watches combine technical design with timeless style. Explore our selection of <LocalizedLink to="/iwc-schaffhausen-gebraucht" className="text-primary underline">pre-owned IWC Schaffhausen</LocalizedLink> watches alongside new models.
        </p>
      </div>
    </section>);

}