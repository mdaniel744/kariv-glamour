import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { CARTIER_INTERNAL_LINKS, CARTIER_COLORS } from '@/lib/cartierData';

export default function CartierInternalLinks() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: CARTIER_COLORS.ivory }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3" style={{ color: CARTIER_COLORS.gold }}>Cartier erkunden</span>
          <h2 className="font-display text-3xl md:text-4xl font-light" style={{ color: CARTIER_COLORS.ink }}>Explore More Cartier Watches</h2>
        </div>
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-10">
          {CARTIER_INTERNAL_LINKS.map((group, i) => (
            <div key={i}>
              <h3 className="text-[11px] tracking-[0.15em] uppercase font-medium mb-4" style={{ color: CARTIER_COLORS.red }}>{group.title}</h3>
              <ul className="space-y-2.5">
                {group.links.map((l, j) => (
                  <li key={j}>
                    <Link to={l.to} className="text-xs hover:opacity-70 transition-opacity" style={{ color: CARTIER_COLORS.graphite }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="md:hidden">
          <Accordion type="single" collapsible>
            {CARTIER_INTERNAL_LINKS.map((group, i) => (
              <AccordionItem key={i} value={`group-${i}`} style={{ borderColor: 'rgba(28,28,28,0.12)' }}>
                <AccordionTrigger className="text-[11px] tracking-[0.15em] uppercase font-medium hover:no-underline" style={{ color: CARTIER_COLORS.red }}>{group.title}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2.5">
                    {group.links.map((l, j) => (
                      <li key={j}><Link to={l.to} className="text-xs hover:opacity-70" style={{ color: CARTIER_COLORS.graphite }}>{l.label}</Link></li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}