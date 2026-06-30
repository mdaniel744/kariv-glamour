import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { JLC_INTERNAL_LINKS } from '@/lib/jaegerLeCoultreData';

export default function JLCInternalLinks() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Jaeger-LeCoultre erkunden</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Explore More Jaeger-LeCoultre Watches</h2>
        </div>
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-8">
          {JLC_INTERNAL_LINKS.map((group, i) => (
            <div key={i}>
              <h3 className="text-[11px] tracking-[0.15em] uppercase font-medium mb-4 text-primary">{group.title}</h3>
              <ul className="space-y-2.5">
                {group.links.map((l, j) => (
                  <li key={j}>
                    <LocalizedLink to={l.to} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l.label}</LocalizedLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="md:hidden">
          <Accordion type="single" collapsible>
            {JLC_INTERNAL_LINKS.map((group, i) => (
              <AccordionItem key={i} value={`group-${i}`}>
                <AccordionTrigger className="text-[11px] tracking-[0.15em] uppercase font-medium text-primary hover:no-underline">{group.title}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2.5">
                    {group.links.map((l, j) => (
                      <li key={j}><LocalizedLink to={l.to} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l.label}</LocalizedLink></li>
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