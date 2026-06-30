import React, { useEffect } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { PANERAI_FAQS } from '@/lib/paneraiData';

export default function PaneraiFAQ() {
  const { locale } = useLanguage();
  const faqs = PANERAI_FAQS.map((f) => ({ q: locale === 'de' ? f.q_de : f.q_en, a: locale === 'de' ? f.a_de : f.a_en }));

  useEffect(() => {
    const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, [locale]);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{locale === 'de' ? 'Häufige Fragen' : 'Frequently Asked Questions'}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[hsl(var(--primary))]">Panerai FAQ</h2>
        </div>
        <Accordion type="single" collapsible>
          {faqs.map((f, i) =>
            <AccordionItem key={i} value={`q-${i}`}>
              <AccordionTrigger className="text-base font-display text-foreground hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent>
                <div className="text-sm leading-relaxed text-muted-foreground [&_a]:underline [&_a]:text-primary" dangerouslySetInnerHTML={{ __html: f.a }} />
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </section>
  );
}