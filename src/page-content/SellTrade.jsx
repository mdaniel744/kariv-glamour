import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Upload, Search, Banknote, ShieldCheck, ChevronRight } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

export default function SellTrade() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', brand: '', model: '', reference: '', year: '', condition: '', description: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const steps = [
    { icon: Upload, title: t('pages.sellTrade.s1Title'), desc: t('pages.sellTrade.s1Desc') },
    { icon: Search, title: t('pages.sellTrade.s2Title'), desc: t('pages.sellTrade.s2Desc') },
    { icon: Banknote, title: t('pages.sellTrade.s3Title'), desc: t('pages.sellTrade.s3Desc') }
  ];

  return (
    <div>
      <SEO title={t('common:seo.sellTrade.title')} description={t('common:seo.sellTrade.description')} />
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <LocalizedLink to="/" className="hover:text-foreground">{t('common:home')}</LocalizedLink>
          <ChevronRight size={10} />
          <span className="text-foreground">{t('pages.sellTrade.breadcrumb')}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 block">{t('pages.sellTrade.eyebrow')}</span>
          <h1 className="font-display text-4xl md:text-6xl font-light text-foreground tracking-tight mb-6">
            {t('pages.sellTrade.heroTitle1')}<br />{t('pages.sellTrade.heroTitle2')} <span className="text-primary italic">{t('pages.sellTrade.heroTitle3')}</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
            {t('pages.sellTrade.heroDesc')}
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center border border-border p-8"
            >
              <span className="font-display text-3xl text-primary/30 block mb-4">0{i + 1}</span>
              <step.icon size={28} className="text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-sm text-foreground font-medium mb-3">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="border-t border-border py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl text-foreground font-light mb-8 text-center">{t('pages.sellTrade.formTitle')}</h2>
          {submitted ? (
            <div className="text-center py-12 border border-primary/30">
              <ShieldCheck size={32} className="text-primary mx-auto mb-4" />
              <p className="text-primary text-sm mb-2">{t('pages.sellTrade.formSuccessTitle')}</p>
              <p className="text-xs text-muted-foreground">{t('pages.sellTrade.formSuccessDesc')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder={t('pages.sellTrade.placeholderName')} className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full" />
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder={t('pages.sellTrade.placeholderEmail')} className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full" />
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                <input required value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} placeholder={t('pages.sellTrade.placeholderBrand')} className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full" />
                <input value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} placeholder={t('pages.sellTrade.placeholderModel')} className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full" />
                <input value={formData.reference} onChange={e => setFormData({...formData, reference: e.target.value})} placeholder={t('pages.sellTrade.placeholderReference')} className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full" />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <input value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder={t('pages.sellTrade.placeholderYear')} className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full" />
                <select value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})} className="bg-card border border-border text-sm text-foreground px-4 py-3 outline-none focus:border-primary w-full">
                  <option value="" className="bg-popover">{t('pages.sellTrade.placeholderCondition')}</option>
                  {["New", "Unworn", "Excellent", "Very Good", "Good", "Vintage"].map(c => (
                    <option key={c} value={c} className="bg-popover">{c}</option>
                  ))}
                </select>
              </div>
              <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder={t('pages.sellTrade.placeholderDetails')} className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full resize-none" />
              <button type="submit" className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                {t('pages.sellTrade.submit')} <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}