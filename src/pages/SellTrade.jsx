import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Upload, Search, Banknote, ShieldCheck, ChevronRight } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

const steps = [
  { icon: Upload, title: "Uhr einreichen", desc: "Teilen Sie Details und Fotos Ihres Zeitmessers über unser Einreichungsformular." },
  { icon: Search, title: "Expertenbewertung", desc: "Unser horologisches Team bewertet Ihre Uhr und macht ein wettbewerbsfähiges Angebot innerhalb von 48 Stunden." },
  { icon: Banknote, title: "Zahlung oder Tausch", desc: "Nehmen Sie unser Angebot an und erhalten Sie sichere Zahlung, oder tauschen Sie gegen einen neuen Zeitmesser aus unserer Kollektion." }
];

export default function SellTrade() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', brand: '', model: '', reference: '', year: '', condition: '', description: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <SEO title={t('common:seo.sellTrade.title')} description={t('common:seo.sellTrade.description')} />
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <LocalizedLink to="/" className="hover:text-foreground">Start</LocalizedLink>
          <ChevronRight size={10} />
          <span className="text-foreground">Verkaufen & Tauschen</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 block">Verkaufen oder Tauschen</span>
          <h1 className="font-display text-4xl md:text-6xl font-light text-foreground tracking-tight mb-6">
            Ihre Uhr verdient<br />ein <span className="text-primary italic">neues Kapitel</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Ob Sie direkt verkaufen oder gegen Ihren nächsten Erwerb tauschen möchten — wir bieten einen nahtlosen, transparenten Prozess mit wettbewerbsfähigen Bewertungen.
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
          <h2 className="font-display text-2xl text-foreground font-light mb-8 text-center">Uhr einreichen</h2>
          {submitted ? (
            <div className="text-center py-12 border border-primary/30">
              <ShieldCheck size={32} className="text-primary mx-auto mb-4" />
              <p className="text-primary text-sm mb-2">Einreichung erhalten</p>
              <p className="text-xs text-muted-foreground">Unser Team wird Ihre Uhr bewerten und innerhalb von 48 Stunden antworten.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Ihr Name" className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full" />
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Ihre E-Mail" className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full" />
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                <input required value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} placeholder="Marke" className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full" />
                <input value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} placeholder="Modell" className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full" />
                <input value={formData.reference} onChange={e => setFormData({...formData, reference: e.target.value})} placeholder="Ref.-Nr." className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full" />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <input value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="Jahr" className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full" />
                <select value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})} className="bg-card border border-border text-sm text-foreground px-4 py-3 outline-none focus:border-primary w-full">
                  <option value="" className="bg-popover">Zustand</option>
                  {["New", "Unworn", "Excellent", "Very Good", "Good", "Vintage"].map(c => (
                    <option key={c} value={c} className="bg-popover">{c}</option>
                  ))}
                </select>
              </div>
              <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Zusätzliche Details (Box, Papiere, Service-Historie...)" className="bg-card border border-border text-sm text-foreground px-4 py-3 placeholder:text-muted-foreground/50 outline-none focus:border-primary w-full resize-none" />
              <button type="submit" className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                Zur Bewertung einreichen <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}