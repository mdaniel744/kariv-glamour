import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Search, Microscope, FileCheck, Award, BadgeCheck, ChevronRight } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import TrustBar from '@/components/shared/TrustBar';

export default function Authentication() {
  const { t } = useTranslation();

  const steps = [
    { icon: Search, title: t('pages.authentication.s1Title'), desc: t('pages.authentication.s1Desc') },
    { icon: Microscope, title: t('pages.authentication.s2Title'), desc: t('pages.authentication.s2Desc') },
    { icon: FileCheck, title: t('pages.authentication.s3Title'), desc: t('pages.authentication.s3Desc') },
    { icon: Award, title: t('pages.authentication.s4Title'), desc: t('pages.authentication.s4Desc') },
    { icon: BadgeCheck, title: t('pages.authentication.s5Title'), desc: t('pages.authentication.s5Desc') }
  ];

  return (
    <div>
      <SEO title={t('common:seo.authentication.title')} description={t('common:seo.authentication.description')} />
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <LocalizedLink to="/" className="hover:text-foreground">{t('common:home')}</LocalizedLink>
          <ChevronRight size={10} />
          <span className="text-foreground">{t('pages.authentication.breadcrumb')}</span>
        </div>
      </div>

      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <ShieldCheck size={40} className="text-primary mx-auto mb-6" strokeWidth={1.5} />
            <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 block">{t('pages.authentication.eyebrow')}</span>
            <h1 className="font-display text-4xl md:text-6xl font-light text-foreground tracking-tight mb-6">
              {t('pages.authentication.heroTitle1')}<br />{t('pages.authentication.heroTitle2')}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
              {t('pages.authentication.heroDesc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-8 items-start"
            >
              <div className="flex-shrink-0 w-16 text-right">
                <span className="font-display text-4xl text-primary/30">0{i + 1}</span>
              </div>
              <div className="flex-1 border-l border-border pl-8">
                <step.icon size={24} className="text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-display text-foreground font-light mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* No counterfeits */}
      <section className="py-16 bg-secondary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl text-foreground font-light mb-4">{t('pages.authentication.noFakesTitle')}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t('pages.authentication.noFakesDesc')}
          </p>
        </div>
      </section>

      <TrustBar />
    </div>
  );
}