import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { OMEGA_INTERNAL_LINKS, OMEGA_THEME } from '@/lib/omegaData';

const GROUPS = [
  { title: 'Popular Omega Searches', links: OMEGA_INTERNAL_LINKS.popularSearches },
  { title: 'Iconic Omega Collections', links: OMEGA_INTERNAL_LINKS.iconicModels },
  { title: 'Omega Learning Guides', links: OMEGA_INTERNAL_LINKS.learningGuides },
  { title: 'Related Luxury Watch Brands', links: OMEGA_INTERNAL_LINKS.relatedBrands },
  { title: 'Related Watch Categories', links: OMEGA_INTERNAL_LINKS.relatedCategories },
];

function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4" style={{ color: OMEGA_THEME.red }}>{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link, i) => (
          <li key={i}>
            <Link to={link.link} className="text-xs leading-relaxed underline decoration-dotted hover:opacity-70" style={{ color: OMEGA_THEME.greyText }}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileAccordion({ title, links }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: 'rgba(10,10,10,0.1)' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4">
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: OMEGA_THEME.red }}>{title}</span>
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: OMEGA_THEME.red }} />
      </button>
      {open && (
        <ul className="pb-4 space-y-2.5">
          {links.map((link, i) => (
            <li key={i}>
              <Link to={link.link} className="text-xs underline decoration-dotted hover:opacity-70" style={{ color: OMEGA_THEME.greyText }}>
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function OmegaInternalLinkingHub() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: OMEGA_THEME.white }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: OMEGA_THEME.red }}>Explore</span>
          <h2 className="font-display text-3xl md:text-4xl font-light" style={{ color: OMEGA_THEME.charcoal }}>Explore More from Kariv Glamour</h2>
        </div>

        <div className="hidden md:grid grid-cols-5 gap-8">
          {GROUPS.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} />)}
        </div>

        <div className="md:hidden">
          {GROUPS.map((g, i) => <MobileAccordion key={i} title={g.title} links={g.links} />)}
        </div>
      </div>
    </section>
  );
}