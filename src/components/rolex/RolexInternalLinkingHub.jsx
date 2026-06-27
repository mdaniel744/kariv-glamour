import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ROLEX_INTERNAL_LINKS } from '@/lib/rolexData';

const GROUPS = [
  { title: 'Popular Rolex Searches', links: ROLEX_INTERNAL_LINKS.popularSearches },
  { title: 'Iconic Rolex Models', links: ROLEX_INTERNAL_LINKS.iconicModels },
  { title: 'Rolex Learning Guides', links: ROLEX_INTERNAL_LINKS.learningGuides },
  { title: 'Related Luxury Watch Brands', links: ROLEX_INTERNAL_LINKS.relatedBrands },
  { title: 'Related Watch Categories', links: ROLEX_INTERNAL_LINKS.relatedCategories },
];

function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4" style={{ color: '#C5A572' }}>{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link, i) => (
          <li key={i}>
            <Link to={link.link} className="text-xs leading-relaxed underline decoration-dotted hover:opacity-70" style={{ color: '#2A2018' }}>
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
    <div className="border-b" style={{ borderColor: 'rgba(11,77,60,0.15)' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4">
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: '#C5A572' }}>{title}</span>
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: '#0B4D3C' }} />
      </button>
      {open && (
        <ul className="pb-4 space-y-2.5">
          {links.map((link, i) => (
            <li key={i}>
              <Link to={link.link} className="text-xs underline decoration-dotted hover:opacity-70" style={{ color: '#2A2018' }}>
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function RolexInternalLinkingHub() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: '#0B4D3C' }}>Explore</span>
          <h2 className="font-display text-3xl md:text-4xl font-light" style={{ color: '#1C1C1C' }}>Explore More from Kariv Glamour</h2>
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