import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import LocalizedLink from '@/components/LocalizedLink';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { PANERAI_FAQS } from '@/lib/paneraiData';

const BRAND = 'Panerai';

export default function PaneraiFAQ() {
  const { t } = useTranslation('brandComponents');
  const { localize, locale } = useLocalizedField();

  useEffect(() => {
    const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: PANERAI_FAQS.map((f) => ({ '@type': 'Question', name: localize(f, 'q'), acceptedAnswer: { '@type': 'Answer', text: localize(f, 'a').replace(/<[^>]*>/g, '') } })) };
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
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('faq.eyebrow')}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[hsl(var(--primary))]">{t('faq.heading', { brand: BRAND })}</h2>
        </div>
        <Accordion type="single" collapsible>
          {PANERAI_FAQS.map((f, i) =>
            <AccordionItem key={i} value={`q-${i}`}>
              <AccordionTrigger className="text-base font-display text-foreground hover:no-underline">{localize(f, 'q')}</AccordionTrigger>
              <AccordionContent>
                <div className="text-sm leading-relaxed text-muted-foreground [&_a]:underline [&_a]:text-primary" dangerouslySetInnerHTML={{ __html: localize(f, 'a') }} />
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
        <div className="mt-10 text-center">
          <LocalizedLink to="/customer-service" className="text-[11px] tracking-[0.12em] uppercase underline text-primary">{t('faq.contactCS')}</LocalizedLink>
        </div>
      </div>
    </section>
  );
}