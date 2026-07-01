import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { ROLEX_TRUST_POINTS, ROLEX_TRUST_LINKS } from '@/lib/rolexData';

const BRAND = 'Rolex';

export default function RolexTrustSection() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <ShieldCheck size={32} className="mx-auto mb-6 text-primary" strokeWidth={1.5} />
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{t('trustSection.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl mb-10 text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">{t('trustSection.heading', { brand: BRAND })}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {ROLEX_TRUST_POINTS.map((point, i) =>
              <div key={i} className="border border-border bg-card p-4 text-left">
                <p className="text-xs leading-relaxed text-muted-foreground">{localize(point, 'text')}</p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {ROLEX_TRUST_LINKS.map((link, i) =>
              <LocalizedLink key={i} to={link.link} className="text-[10px] tracking-[0.12em] uppercase underline decoration-dotted hover:opacity-70 text-primary">{localize(link, 'text')}</LocalizedLink>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}