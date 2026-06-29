import React, { useEffect } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { BREITLING_FAQS } from '@/lib/breitlingData';

export default function BreitlingFAQ() {
  useEffect(() => {
    const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: BREITLING_FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Häufige Fragen</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Breitling FAQ</h2>
        </div>
        <Accordion type="single" collapsible>
          {BREITLING_FAQS.map((f, i) => (
            <AccordionItem key={i} value={`q-${i}`}>
              <AccordionTrigger className="text-base font-display text-foreground hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent>
                <div className="text-sm leading-relaxed text-muted-foreground [&_a]:underline [&_a]:text-primary" dangerouslySetInnerHTML={{ __html: f.a }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}