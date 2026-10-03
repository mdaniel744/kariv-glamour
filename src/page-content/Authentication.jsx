import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Info, FileCheck, FileText, ClipboardList, ChevronRight } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import TrustBar from '@/components/shared/TrustBar';

export default function Authentication() {
  const { t } = useTranslation();

  const topics = [
    { icon: Search, title: t('pages.authentication.s1Title'), desc: t('pages.authentication.s1Desc') },
    { icon: Info, title: t('pages.authentication.s2Title'), desc: t('pages.authentication.s2Desc') },
    { icon: FileText, title: t('pages.authentication.s3Title'), desc: t('pages.authentication.s3Desc') },
    { icon: ClipboardList, title: t('pages.authentication.s4Title'), desc: t('pages.authentication.s4Desc') },
    { icon: FileCheck, title: t('pages.authentication.s5Title'), desc: t('pages.authentication.s5Desc') }
  ];

  return (
    <div className="font-body">
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
            <FileCheck size={40} className="text-primary mx-auto mb-6" strokeWidth={1.5} />
            <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 block">{t('pages.authentication.eyebrow')}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6">
              {t('pages.authentication.heroTitle1')}<br />{t('pages.authentication.heroTitle2')}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t('pages.authentication.heroDesc')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {topics.map((topic) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-5 sm:gap-8 items-start"
            >
              <div className="flex-shrink-0 rounded-xl bg-primary/5 p-3">
                <topic.icon size={24} className="text-primary" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-display text-foreground font-semibold mb-3">{topic.title}</h2>
                <p className="text-base text-muted-foreground leading-relaxed">{topic.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* No counterfeits */}
      <section className="py-16 bg-secondary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl text-foreground font-semibold mb-4">{t('pages.authentication.noFakesTitle')}</h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {t('pages.authentication.noFakesDesc')}
          </p>
        </div>
      </section>

      <nav className="max-w-4xl mx-auto px-6 py-12" aria-label={t('pages.authentication.resourcesTitle')}>
        <h2 className="text-xl font-display font-semibold mb-5">{t('pages.authentication.resourcesTitle')}</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-4 text-base">
          <LocalizedLink className="text-primary underline underline-offset-4" to="/legal/authenticity-disclaimer">{t('pages.authentication.authenticityLink')}</LocalizedLink>
          <LocalizedLink className="text-primary underline underline-offset-4" to="/legal/brand-disclaimer">{t('pages.authentication.brandLink')}</LocalizedLink>
          <LocalizedLink className="text-primary underline underline-offset-4" to="/customer-service">{t('pages.authentication.contactLink')}</LocalizedLink>
        </div>
      </nav>

      <TrustBar />
    </div>
  );
}
