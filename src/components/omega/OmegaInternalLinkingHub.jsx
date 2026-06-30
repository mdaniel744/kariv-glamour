import React, { useState } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { OMEGA_INTERNAL_LINKS } from '@/lib/omegaData';

const GROUPS = [
{ title: 'Popular Omega Searches', links: OMEGA_INTERNAL_LINKS.popularSearches },
{ title: 'Iconic Omega Collections', links: OMEGA_INTERNAL_LINKS.iconicModels },
{ title: 'Omega Learning Guides', links: OMEGA_INTERNAL_LINKS.learningGuides },
{ title: 'Related Luxury Watch Brands', links: OMEGA_INTERNAL_LINKS.relatedBrands },
{ title: 'Related Watch Categories', links: OMEGA_INTERNAL_LINKS.relatedCategories }];


function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4 text-primary">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link, i) =>
        <li key={i}><LocalizedLink to={link.link} className="text-xs leading-relaxed underline decoration-dotted hover:opacity-70 text-muted-foreground hover:text-foreground transition-colors">{link.text}</LocalizedLink></li>
        )}
      </ul>
    </div>);

}

function MobileAccordion({ title, links }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4">
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-primary">{title}</span>
        <ChevronDown size={16} className={`text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open &&
      <ul className="pb-4 space-y-2.5">
          {links.map((link, i) =>
        <li key={i}><LocalizedLink to={link.link} className="text-xs underline decoration-dotted hover:opacity-70 text-muted-foreground hover:text-foreground transition-colors">{link.text}</LocalizedLink></li>
        )}
        </ul>
      }
    </div>);

}

export default function OmegaInternalLinkingHub() {
  const { t } = useTranslation('brandComponents');
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{t('eyebrow.explore')}</span>
          <h2 className="text-3xl md:text-4xl [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">{t('heading.exploreMore')}</h2>
        </div>
        <div className="hidden md:grid grid-cols-5 gap-8">{GROUPS.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} />)}</div>
        <div className="md:hidden">{GROUPS.map((g, i) => <MobileAccordion key={i} title={g.title} links={g.links} />)}</div>
      </div>
    </section>);

}