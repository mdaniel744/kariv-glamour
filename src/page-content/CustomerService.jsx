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
  const contactCopy = locale === 'cs' ? {
    introduction: 'Máte dotaz k hodinkám, objednávce nebo nákupu? Kontaktujte Kariv Glamour pomocí údajů níže.',
    emailHint: 'Dotazy k produktům a zákaznická podpora',
    officeHint: 'Sídlo společnosti není adresou pro vrácení zboží. Pokyny pro vaši objednávku najdete v zásadách vrácení.',
    formExplanation: 'Zprávu odešlete přímo našemu týmu podpory pomocí tohoto formuláře.',
    sendMessage: 'Odeslat zprávu',
    sendingMessage: 'Odesílání…',
    sentStatus: 'Vaše zpráva byla odeslána zákaznické podpoře Kariv.',
    errorStatus: 'Zprávu se nepodařilo odeslat. Zkuste to znovu nebo nám napište přímo na e-mail níže.',
    returnsPolicy: 'Pokyny k vrácení zboží',
    emailFallback: 'Můžete nám také napsat přímo:',
  } : locale === 'de' ? {
    introduction: 'Fragen zu einer Uhr, einer Bestellung oder zum Einkauf? Kontaktieren Sie Kariv Glamour über die unten angegebenen Kontaktdaten.',
    emailHint: 'Für Produktfragen und Kundenservice',
    officeHint: 'Der Firmensitz ist keine Rücksendeadresse. Hinweise zu Ihrer Bestellung finden Sie in den Rückgabebedingungen.',
    formExplanation: 'Senden Sie Ihre Nachricht mit diesem Formular direkt an unser Support-Team.',
    sendMessage: 'Nachricht senden',
    sendingMessage: 'Wird gesendet…',
    sentStatus: 'Ihre Nachricht wurde an den Kariv-Kundendienst gesendet.',
    errorStatus: 'Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns an die unten angegebene E-Mail-Adresse.',
    returnsPolicy: 'Rückgabebedingungen',
    emailFallback: 'Sie können uns auch direkt schreiben:',
  } : {
    introduction: 'Questions about a watch, an order or shopping with us? Contact Kariv Glamour using the details below.',
    emailHint: 'For product questions and customer support',
    officeHint: 'Registered office, not a returns address. See the returns policy for order-specific instructions.',
    formExplanation: 'Send your message directly to our support team using this form.',
    sendMessage: 'Send message',
    sendingMessage: 'Sending…',
    sentStatus: 'Your message has been sent to Kariv support.',
    errorStatus: 'Your message could not be sent. Please try again or email us directly using the address below.',
    returnsPolicy: 'Returns & Refund policy',
    emailFallback: 'You can also email us directly:',
  };
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', companyWebsite: '' });
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    dataClient.entities.FAQ.filter({}, 'sortOrder', 20).then(data => setFaqs(asArray(data))).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formStatus === 'sending') return;
    setFormStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
      });
      if (!response.ok) throw new Error('Contact message not accepted');
      setFormData({ name: '', email: '', subject: '', message: '', companyWebsite: '' });
      setFormStatus('sent');
    } catch {
      setFormStatus('error');
    }
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
              {!item.href && (
                <LocalizedLink to="/legal/returns-refund-policy" className="mt-3 inline-block text-sm text-primary underline underline-offset-4">
                  {contactCopy.returnsPolicy}
                </LocalizedLink>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section className="border-t border-border py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl text-foreground font-semibold mb-8 text-center">{t('pages.customerService.formTitle')}</h2>
          <p id="contact-form-explanation" className="mb-6 text-base text-muted-foreground leading-relaxed">{contactCopy.formExplanation}</p>
            <form onSubmit={handleSubmit} aria-describedby="contact-form-explanation" className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <label className="block text-sm font-medium text-foreground">
                  <span className="mb-2 block">{t('pages.customerService.placeholderName')}</span>
                  <input required name="name" maxLength={100} autoComplete="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-card border border-border text-base text-foreground px-4 py-3 outline-none focus:border-primary w-full" />
                </label>
                <label className="block text-sm font-medium text-foreground">
                  <span className="mb-2 block">{t('pages.customerService.placeholderEmail')}</span>
                  <input required name="email" maxLength={254} autoComplete="email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-card border border-border text-base text-foreground px-4 py-3 outline-none focus:border-primary w-full" />
                </label>
              </div>
              <label className="block text-sm font-medium text-foreground">
                <span className="mb-2 block">{t('pages.customerService.placeholderSubject')}</span>
                <input required name="subject" maxLength={160} value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="bg-card border border-border text-base text-foreground px-4 py-3 outline-none focus:border-primary w-full" />
              </label>
              <label className="block text-sm font-medium text-foreground">
                <span className="mb-2 block">{t('pages.customerService.placeholderMessage')}</span>
                <textarea required name="message" maxLength={5000} rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="bg-card border border-border text-base text-foreground px-4 py-3 outline-none focus:border-primary w-full resize-none" />
              </label>
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="contact-company-website">Website</label>
                <input id="contact-company-website" name="companyWebsite" tabIndex={-1} autoComplete="off" value={formData.companyWebsite || ''} onChange={e => setFormData({...formData, companyWebsite: e.target.value})} />
              </div>
              <button type="submit" disabled={formStatus === 'sending'} className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 hover:bg-primary/90 transition-colors disabled:opacity-60">
                {formStatus === 'sending' ? contactCopy.sendingMessage : contactCopy.sendMessage}
              </button>
            </form>
          {(formStatus === 'sent' || formStatus === 'error') && (
            <p role="status" className="mt-5 rounded-xl border border-border bg-card p-4 text-base leading-relaxed text-foreground">
              {formStatus === 'sent' ? contactCopy.sentStatus : contactCopy.errorStatus}
            </p>
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
