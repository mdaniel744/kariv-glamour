import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { OMEGA_FAQS, OMEGA_THEME } from '@/lib/omegaData';

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border-b" style={{ borderColor: 'rgba(10,10,10,0.1)' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-sm font-medium pr-4" style={{ color: OMEGA_THEME.charcoal }}>{faq.question}</span>
        <ChevronDown size={16} className={`flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: OMEGA_THEME.red }} />
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-xs leading-relaxed" style={{ color: OMEGA_THEME.greyText }}>
            {faq.answer.map((seg, i) => seg.link
              ? <Link key={i} to={seg.link} className="underline decoration-dotted hover:opacity-70" style={{ color: OMEGA_THEME.red }}>{seg.text}</Link>
              : <span key={i}>{seg.text}</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default function OmegaFAQ() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: OMEGA_FAQS.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer.map(seg => seg.text).join('') },
    })),
  };

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: OMEGA_THEME.lightBg }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: OMEGA_THEME.red }}>FAQ</span>
          <h2 className="font-display text-3xl md:text-4xl font-light" style={{ color: OMEGA_THEME.charcoal }}>Omega FAQ</h2>
        </div>
        <div>
          {OMEGA_FAQS.map((faq, i) => <FaqItem key={i} faq={faq} index={i} />)}
        </div>
      </div>
    </section>
  );
}