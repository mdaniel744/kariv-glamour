import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { PATEK_FAQS, PATEK_THEME } from '@/lib/patekData';

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border-b" style={{ borderColor: 'rgba(26,43,74,0.15)' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-sm font-medium pr-4" style={{ color: PATEK_THEME.graphite }}>{faq.question}</span>
        <ChevronDown size={16} className={`flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: PATEK_THEME.navy }} />
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-xs leading-relaxed" style={{ color: PATEK_THEME.graphite }}>{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function PatekPhilippeFAQ() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: PATEK_FAQS.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: PATEK_THEME.cream }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: PATEK_THEME.navy }}>FAQ</span>
          <h2 className="font-display text-3xl md:text-4xl font-light" style={{ color: PATEK_THEME.graphite }}>Patek Philippe FAQ</h2>
        </div>

        <div>
          {PATEK_FAQS.map((faq, i) => <FaqItem key={i} faq={faq} index={i} />)}
        </div>

        <div className="mt-10 text-center">
          <Link to="/customer-service" className="text-[11px] tracking-[0.12em] uppercase underline" style={{ color: PATEK_THEME.navy }}>
            Contact Customer Service
          </Link>
        </div>
      </div>
    </section>
  );
}