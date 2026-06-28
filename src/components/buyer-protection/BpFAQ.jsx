import React, { useEffect } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { MessageCircle } from 'lucide-react';
import BpSection from './BpSection';

const FAQS = [
  { q: 'What is Kariv Buyer Protection?', a: 'Kariv Buyer Protection is designed to help customers buy luxury watches safely through Kariv Glamour. It includes secure payment handling, authenticity standards, dealer rules, insured shipping, support assistance, and a 14-day return request window for eligible orders.' },
  { q: 'How does the Kariv Escrow Service work?', a: 'For eligible orders, the buyer\u2019s payment is held securely while the watch is shipped and inspected. The seller is paid only after the buyer protection conditions are satisfied.' },
  { q: 'How long do I have to inspect my watch?', a: 'You have 14 days after delivery to inspect the watch and contact Kariv Glamour support if the order is defective, not as described, or has another covered issue.' },
  { q: 'Are all watches on Kariv Glamour authentic?', a: 'Kariv Glamour requires sellers to list only authentic watches. Counterfeit and replica watches are not allowed. If an authenticity concern arises, buyers should contact support within the protection period.' },
  { q: 'What happens if the watch is not as described?', a: 'Contact Kariv Glamour support within 14 days after delivery. Provide your order number, photos, and a clear explanation of the issue. Our team will review the case and guide the return or resolution process.' },
  { q: 'Are shipments insured?', a: 'Eligible sellers are required to ship watches with tracking and insurance. This helps protect buyers in rare cases of loss, theft, or unsuccessful delivery.' },
  { q: 'Who pays for return shipping?', a: 'In most cases, the buyer may be responsible for return shipping unless the return is due to seller error, misdescription, or another covered issue. Return instructions will be provided by support.' },
  { q: 'What should I keep after receiving the watch?', a: 'Keep the original packaging, shipping materials, box, papers, warranty card, certificate, links, tags, service documents, and all accessories until you are certain you are keeping the watch.' },
  { q: 'Does Buyer Protection apply if I pay the seller directly?', a: 'No. Buyer Protection applies only to eligible transactions completed through Kariv Glamour\u2019s approved checkout and payment process. Direct payments outside the platform may not be covered.' },
  { q: 'Can I return a watch because I changed my mind?', a: 'Return eligibility depends on the product, seller terms, jurisdiction, and Kariv Glamour policy. The 14-day money-back guarantee is designed mainly to protect buyers when an item is defective, not as described, or affected by a covered issue.' },
  { q: 'What happens if the package arrives damaged?', a: 'Document the damage immediately with photos and contact Kariv Glamour support. Keep all packaging and do not discard any shipping materials until the case is reviewed.' },
  { q: 'What if I suspect the watch is counterfeit?', a: 'Contact Kariv Glamour support immediately within the protection period. Provide photos, documents, and details about your concern. Kariv Glamour does not allow counterfeit or replica listings.' },
];

export default function BpFAQ() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <BpSection icon={MessageCircle} title="Frequently Asked Questions">
      <div className="max-w-3xl">
        <Accordion type="single" collapsible>
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-base font-display text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </BpSection>
  );
}