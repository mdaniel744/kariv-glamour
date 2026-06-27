import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ROLEX_FAQS } from '@/lib/rolexData';

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border-b" style={{ borderColor: 'rgba(11,77,60,0.15)' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-sm font-medium pr-4" style={{ color: '#1C1C1C' }}>{faq.question}</span>
        <ChevronDown size={16} className={`flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: '#0B4D3C' }} />
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-xs leading-relaxed" style={{ color: '#2A2018' }}>{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function RolexFAQ() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ROLEX_FAQS.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer.replace(/<[^>]*>/g, '') },
    })),
  };

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#FDFBF7' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: '#0B4D3C' }}>FAQ</span>
          <h2 className="font-display text-3xl md:text-4xl font-light" style={{ color: '#1C1C1C' }}>Rolex FAQ</h2>
        </div>
        <div>
          {ROLEX_FAQS.map((faq, i) => <FaqItem key={i} faq={faq} index={i} />)}
        </div>
      </div>
    </section>
  );
}