import React, { useState, useEffect } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { ChevronDown } from 'lucide-react';
import { OMEGA_FAQS } from '@/lib/omegaData';

const BRAND = 'Omega';

function FaqItem({ faq, index, localize }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-sm font-medium pr-4 text-foreground">{localize(faq, 'question')}</span>
        <ChevronDown size={16} className={`flex-shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open &&
        <div className="pb-5">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {faq.answer.map((seg, i) => seg.link ?
              <LocalizedLink key={i} to={seg.link} className="underline decoration-dotted hover:opacity-70 text-primary">{localize(seg, 'text')}</LocalizedLink> :
              <span key={i}>{localize(seg, 'text')}</span>
            )}
          </p>
        </div>
      }
    </div>
  );
}

export default function OmegaFAQ() {
  const { t } = useTranslation('brandComponents');
  const { localize, locale } = useLocalizedField();

  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: OMEGA_FAQS.map((faq) => ({
        '@type': 'Question', name: localize(faq, 'question'),
        acceptedAnswer: { '@type': 'Answer', text: faq.answer.map((seg) => localize(seg, 'text')).join('') },
      })),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [locale]);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{t('faq.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">{t('faq.heading', { brand: BRAND })}</h2>
        </div>
        <div>{OMEGA_FAQS.map((faq, i) => <FaqItem key={i} faq={faq} index={i} localize={localize} />)}</div>
        <div className="mt-10 text-center">
          <LocalizedLink to="/customer-service" className="text-[11px] tracking-[0.12em] uppercase underline text-primary">{t('faq.contactCS')}</LocalizedLink>
        </div>
      </div>
    </section>
  );
}