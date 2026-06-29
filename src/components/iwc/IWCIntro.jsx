import React from 'react';
import { Link } from 'react-router-dom';

export default function IWCIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">Engineering Precision and Aviation Heritage</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          IWC Schaffhausen is celebrated for engineering precision, aviation heritage, refined dress-watch design, and classic Swiss watchmaking since 1868. From the iconic <Link to="/iwc-schaffhausen/pilots-watches" className="text-primary underline">Pilot&rsquo;s Watches</Link> and the elegant <Link to="/iwc-schaffhausen/portugieser" className="text-primary underline">Portugieser</Link>, to the dress-focused <Link to="/iwc-schaffhausen/portofino" className="text-primary underline">Portofino</Link>, the engineering-driven <Link to="/iwc-schaffhausen/ingenieur" className="text-primary underline">Ingenieur</Link>, and the dive-focused <Link to="/iwc-schaffhausen/aquatimer" className="text-primary underline">Aquatimer</Link>, IWC watches combine technical design with timeless style. Explore our selection of <Link to="/iwc-schaffhausen-gebraucht" className="text-primary underline">pre-owned IWC Schaffhausen</Link> watches alongside new models.
        </p>
      </div>
    </section>
  );
}