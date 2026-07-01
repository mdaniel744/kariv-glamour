import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Eye, Award, Users, Globe, Heart, ChevronRight } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import SEO from '@/components/SEO';
import TrustBar from '@/components/shared/TrustBar';
import { BRAND_DISCLAIMER } from '@/lib/constants';
import { motion } from 'framer-motion';

const TEXTURE_BG = "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/4957f596d_generated_310565b9.png";

export default function About() {
  const { t } = useTranslation();

  const values = [
    { icon: ShieldCheck, title: t('pages.about.v1Title'), desc: t('pages.about.v1Desc') },
    { icon: Eye, title: t('pages.about.v2Title'), desc: t('pages.about.v2Desc') },
    { icon: Award, title: t('pages.about.v3Title'), desc: t('pages.about.v3Desc') },
    { icon: Users, title: t('pages.about.v4Title'), desc: t('pages.about.v4Desc') },
    { icon: Globe, title: t('pages.about.v5Title'), desc: t('pages.about.v5Desc') },
    { icon: Heart, title: t('pages.about.v6Title'), desc: t('pages.about.v6Desc') }
  ];

  return (
    <div>
      <SEO title={t('common:seo.about.title')} description={t('common:seo.about.description')} />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <LocalizedLink to="/" className="hover:text-foreground">{t('common:home')}</LocalizedLink>
          <ChevronRight size={10} />
          <span className="text-foreground">{t('pages.about.breadcrumb')}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={TEXTURE_BG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] tracking-[0.3em] uppercase text-primary mb-6 block"
          >
            {t('pages.about.eyebrow')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-light text-foreground tracking-tight mb-8"
          >
            {t('pages.about.heroTitle1')}<br />
            <span className="text-primary italic">{t('pages.about.heroTitle2')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            {t('pages.about.heroDesc')}
          </motion.p>
        </div>
      </section>

      {/* Our story */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 block">{t('pages.about.storyEyebrow')}</span>
            <h2 className="font-display text-3xl text-foreground font-light mb-6">{t('pages.about.storyTitle1')}<br />{t('pages.about.storyTitle2')}</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>{t('pages.about.storyP1')}</p>
              <p>{t('pages.about.storyP2')}</p>
              <p>{t('pages.about.storyP3')}</p>
            </div>
          </div>
          <div className="aspect-square bg-card">
            <img
              src="https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/01b715f36_generated_902f4c1f.png"
              alt={t('pages.about.storyAlt')}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-20 border-t border-border bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 block">{t('pages.about.valuesEyebrow')}</span>
            <h2 className="font-display text-3xl text-foreground font-light">{t('pages.about.valuesTitle')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border p-8"
              >
                <val.icon size={24} className="text-primary mb-5" strokeWidth={1.5} />
                <h3 className="text-sm text-foreground font-medium mb-3">{val.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ShieldCheck size={24} className="text-primary mx-auto mb-4" />
          <h3 className="text-[11px] tracking-[0.15em] uppercase text-foreground font-medium mb-4">{t('pages.about.disclaimerTitle')}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{BRAND_DISCLAIMER}</p>
        </div>
      </section>

      <TrustBar />
    </div>
  );
}