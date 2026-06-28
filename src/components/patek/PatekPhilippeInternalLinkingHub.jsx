import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { PATEK_INTERNAL_LINKS } from '@/lib/patekData';

const GROUPS = [
  { title: 'Popular Patek Philippe Searches', links: PATEK_INTERNAL_LINKS.popularSearches },
  { title: 'Iconic Patek Philippe Collections', links: PATEK_INTERNAL_LINKS.iconicCollections },
  { title: 'Complications and Collector Guides', links: PATEK_INTERNAL_LINKS.complicationsGuides },
  { title: 'Patek Philippe Learning Guides', links: PATEK_INTERNAL_LINKS.learningGuides },
  { title: 'Related Luxury Watch Brands', links: PATEK_INTERNAL_LINKS.relatedBrands },
  { title: 'Related Watch Categories', links: PATEK_INTERNAL_LINKS.relatedCategories },
];

function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4 text-primary">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link, i) => (
          <li key={i}><Link to={link.link} className="text-xs leading-relaxed underline decoration-dotted hover:opacity-70 text-muted-foreground hover:text-foreground transition-colors">{link.text}</Link></li>
        ))}
      </ul>
    </div>
  );
}

function MobileAccordion({ title, links }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4">
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-primary">{title}</span>
        <ChevronDown size={16} className={`text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="pb-4 space-y-2.5">
          {links.map((link, i) => (
            <li key={i}><Link to={link.link} className="text-xs underline decoration-dotted hover:opacity-70 text-muted-foreground hover:text-foreground transition-colors">{link.text}</Link></li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function PatekPhilippeInternalLinkingHub() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">Explore</span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-foreground">Explore More from Kariv Glamour</h2>
        </div>
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-8">{GROUPS.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} />)}</div>
        <div className="md:hidden">{GROUPS.map((g, i) => <MobileAccordion key={i} title={g.title} links={g.links} />)}</div>
      </div>
    </section>
  );
}