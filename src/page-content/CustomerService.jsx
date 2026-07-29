import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { base44 } from '@/api/base44Client';
import { asArray } from '@/lib/base44Data';
import { useLocalizedField } from '@/lib/localize';
import { Mail, Phone, MapPin, Clock, ChevronDown, ChevronRight } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import TrustBar from '@/components/shared/TrustBar';

export default function CustomerService() {
  const { t } = useTranslation();
  const { localize } = useLocalizedField();
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    base44.entities.FAQ.filter({}, 'sortOrder', 20).then(data => setFaqs(asArray(data))).catch(console.error);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactMethods = [
    { icon: Mail, title: t('pages.customerService.emailTitle'), detail: "service@kariv-glamour.com", sub: t('pages.customerService.emailSub') },
    { icon: Phone, title: t('pages.customerService.phoneTitle'), detail: "+49 (0) 123 456 789", sub: t('pages.customerService.phoneSub') },
    { icon: MapPin, title: t('pages.customerService.locationTitle'), detail: "Deutschland", sub: t('pages.customerService.locationSub') },
    { icon: Clock, title: t('pages.customerService.hoursTitle'), detail: "Mo–Fr 9–18 CET", sub: t('pages.customerService.hoursSub') }
  ];

  return (
    <div>
      <SEO title={t('common:seo.customerService.title')} description={t('common:seo.customerService.description')} />
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <LocalizedLink to="/" className="hover:text-foreground">{t('common:home')}</LocalizedLink>
          <ChevronRight size={10} />
          <span className="text-foreground">{t('pages.customerService.breadcrumb')}</span>
        </div>
      </div>

      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 block">{t('pages.customerService.eyebrow')}</span>
          <h1 className="font-display text-4xl md:text-5xl font-light text-foreground tracking-tight mb-4">{t('pages.customerService.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('pages.customerService.subtitle')}</p>
        </div>
      </section>

      {/* Contact methods */}
      <section className="border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          {contactMethods.map((item, i) => (
            <div key={i} className="border border-border p-6 text-center">
              <item.icon size={24} className="text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-[11px] tracking-[0.12em] uppercase text-foreground font-medium mb-2">{item.title}</h3>
              <p className="text-xs text-foreground">{item.detail}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section className="border-t border-border py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl text-foreground font-light mb-8 text-center">{t('pages.customerService.formTitle')}</h2>
          {submitted ? (
            <div className="text-center py-12 border border-primary/30">
              <p className="text-primary text-sm">{t('pages.customerService.formSuccess')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder={t('pages.customerService.placeholderName')} className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full" />
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder={t('pages.customerService.placeholderEmail')} className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full" />
              </div>
              <input required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} placeholder={t('pages.customerService.placeholderSubject')} className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full" />
              <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder={t('pages.customerService.placeholderMessage')} className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full resize-none" />
              <button type="submit" className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 hover:bg-primary/90 transition-colors">
                {t('pages.customerService.submit')}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border py-16 bg-secondary">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-2xl text-foreground font-light mb-10 text-center">{t('pages.customerService.faqTitle')}</h2>
          {faqs.length > 0 ? (
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={faq.id} className="border border-border bg-background">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                    <span className="text-sm text-foreground pr-4">{localize(faq, 'question')}</span>
                    <ChevronDown size={16} className={`text-primary flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-5">
                      <p className="text-xs text-muted-foreground leading-relaxed">{localize(faq, 'answer')}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground">{t('pages.customerService.faqEmpty')}</p>
          )}
        </div>
      </section>

      <TrustBar />
    </div>
  );
}