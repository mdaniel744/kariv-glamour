import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function BrandHero({ brand }) {
  const { t } = useTranslation('brandComponents');

  return (
    <section data-site-hero="brand" className="relative overflow-hidden border-b border-[#d9e2dc] bg-[#fbfcfa] text-[#10231d] dark:border-[#263747] dark:bg-[#0d1824] dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_83%_40%,rgba(203,221,212,0.52),transparent_31%),linear-gradient(135deg,#ffffff_0%,#f7faf7_55%,#eef4f0_100%)] dark:bg-[radial-gradient(circle_at_83%_40%,rgba(98,114,128,0.22),transparent_32%),linear-gradient(135deg,#121e2b_0%,#0d1824_56%,#09121c_100%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-6 sm:px-7 sm:py-7 md:px-10 md:py-8 lg:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="font-display text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.045em] text-primary dark:text-white sm:text-[2.65rem] md:text-5xl md:leading-[1.06]"
        >
          {t('hero.title', { brand })}
        </motion.h1>
      </div>
    </section>
  );
}
