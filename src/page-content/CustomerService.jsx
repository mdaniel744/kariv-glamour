import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { useLocalizedField } from '@/lib/localize';
import { useLanguage } from '@/lib/languageContext';
import { COMPANY_DETAILS, getCompanyDetailsCopy } from '@/lib/companyDetails';
import { Mail, MapPin, ChevronDown, ChevronRight } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import TrustBar from '@/components/shared/TrustBar';

export default function CustomerService() {
  const { t } = useTranslation();
  const { localize } = useLocalizedField();
  const { locale } = useLanguage();
  const companyCopy = getCompanyDetailsCopy(locale);
  const contactCopy = locale === 'de' ? {
    introduction: 'Fragen zu einer Uhr, einer Bestellung oder zum Einkauf? Kontaktieren Sie Kariv Glamour über die unten angegebenen Kontaktdaten.',
    emailHint: 'Für Produktfragen und Kundenservice',
    officeHint: 'Eingetragener Firmensitz — Rücksendungen bitte vorab abstimmen.',
    draftExplanation: 'Dieses Formular bereitet eine E-Mail in Ihrem E-Mail-Programm vor. Es sendet keine Nachricht über diese Website.',
    openDraft: 'E-Mail-Entwurf öffnen',
    draftStatus: 'Ihre Nachricht wurde noch nicht gesendet. Senden Sie den Entwurf in Ihrem E-Mail-Programm. Falls sich kein Programm öffnet, nutzen Sie die E-Mail-Adresse unten.',
    emailFallback: 'Sie können uns auch direkt schreiben:',
  } : {
    introduction: 'Questions about a watch, an order or shopping with us? Contact Kariv Glamour using the details below.',
    emailHint: 'For product questions and customer support',
    officeHint: 'Registered office — please arrange any return with us first.',
    draftExplanation: 'This form prepares a draft in your email app. It does not send a message through this website.',
    openDraft: 'Open email draft',
    draftStatus: 'Your message has not been sent yet. Send the draft in your email app. If no app opens, use the email address below.',
    emailFallback: 'You can also email us directly:',
  };
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [emailDraftRequested, setEmailDraftRequested] = useState(false);

  useEffect(() => {
    dataClient.entities.FAQ.filter({}, 'sortOrder', 20).then(data => setFaqs(asArray(data))).catch(console.error);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `${formData.message}\n\n${t('pages.customerService.placeholderName')}: ${formData.name}\n${t('pages.customerService.placeholderEmail')}: ${formData.email}`;
    const draftUrl = `mailto:${COMPANY_DETAILS.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    setEmailDraftRequested(true);
    window.location.assign(draftUrl);
  };

  const contactMethods = [
    { icon: Mail, title: t('pages.customerService.emailTitle'), detail: COMPANY_DETAILS.email, href: `mailto:${COMPANY_DETAILS.email}`, sub: contactCopy.emailHint },
    { icon: MapPin, title: companyCopy.registeredAddress, detail: COMPANY_DETAILS.registeredAddress, sub: contactCopy.officeHint }
  ];

  return (
    <div className="font-body">
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
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">{t('pages.customerService.title')}</h1>
          <p className="text-base md:text-lg text-muted-foreground">{contactCopy.introduction}</p>
        </div>
      </section>

      {/* Contact methods */}
      <section className="border-t border-border py-16">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {contactMethods.map((item, i) => (
            <div key={i} className="border border-border p-6 text-center">
              <item.icon size={24} className="text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-sm tracking-[0.12em] uppercase text-foreground font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-foreground mb-1">{COMPANY_DETAILS.legalName}</p>
              {item.href ? (
                <a href={item.href} className="text-base text-primary underline underline-offset-4 break-words">{item.detail}</a>
              ) : (
                <p className="text-base text-foreground">{item.detail}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section className="border-t border-border py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl text-foreground font-semibold mb-8 text-center">{t('pages.customerService.formTitle')}</h2>
          <p id="contact-draft-explanation" className="mb-6 text-base text-muted-foreground leading-relaxed">{contactCopy.draftExplanation}</p>
            <form onSubmit={handleSubmit} aria-describedby="contact-draft-explanation" className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <label className="block text-sm font-medium text-foreground">
                  <span className="mb-2 block">{t('pages.customerService.placeholderName')}</span>
                  <input required name="name" autoComplete="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-card border border-border text-base text-foreground px-4 py-3 outline-none focus:border-primary w-full" />
                </label>
                <label className="block text-sm font-medium text-foreground">
                  <span className="mb-2 block">{t('pages.customerService.placeholderEmail')}</span>
                  <input required name="email" autoComplete="email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-card border border-border text-base text-foreground px-4 py-3 outline-none focus:border-primary w-full" />
                </label>
              </div>
              <label className="block text-sm font-medium text-foreground">
                <span className="mb-2 block">{t('pages.customerService.placeholderSubject')}</span>
                <input required name="subject" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="bg-card border border-border text-base text-foreground px-4 py-3 outline-none focus:border-primary w-full" />
              </label>
              <label className="block text-sm font-medium text-foreground">
                <span className="mb-2 block">{t('pages.customerService.placeholderMessage')}</span>
                <textarea required name="message" rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="bg-card border border-border text-base text-foreground px-4 py-3 outline-none focus:border-primary w-full resize-none" />
              </label>
              <button type="submit" className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 hover:bg-primary/90 transition-colors">
                {contactCopy.openDraft}
              </button>
            </form>
          {emailDraftRequested && (
            <p role="status" className="mt-5 rounded-xl border border-border bg-card p-4 text-base leading-relaxed text-foreground">{contactCopy.draftStatus}</p>
          )}
          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            {contactCopy.emailFallback}{' '}
            <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-primary underline underline-offset-4 break-words">{COMPANY_DETAILS.email}</a>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border py-16 bg-secondary">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl text-foreground font-semibold mb-10 text-center">{t('pages.customerService.faqTitle')}</h2>
          {faqs.length > 0 ? (
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={faq.id} className="border border-border bg-background">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                    <span className="text-base font-medium text-foreground pr-4">{localize(faq, 'question')}</span>
                    <ChevronDown size={16} className={`text-primary flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">{localize(faq, 'answer')}</p>
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
