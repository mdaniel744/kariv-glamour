import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { IWC_STORY_IMAGE } from '@/lib/iwcData';

const BRAND = 'IWC Schaffhausen';

export default function IWCStoryTeaser() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('story.title', { brand: BRAND })}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">{t('story.title', { brand: BRAND })}</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            {localize({ text_cs: "IWC byl založen v Schaffhausenu v roce 1868. Proslul technickou přesností, leteckou tradicí a klasickým švýcarským hodinářstvím. Od ikonické řady ", text_en: 'Founded in Schaffhausen in 1868, IWC is celebrated for engineering precision, aviation heritage, and classic Swiss watchmaking. From the iconic ', text_de: '1868 in Schaffhausen gegründet, wird IWC gefeiert für Engineering-Präzision, Aviation-Erbe und klassische Schweizer Uhrmacherei. Von den ikonischen ' }, 'text')}
            <LocalizedLink to="/iwc-schaffhausen/pilots-watches" className="text-primary underline">{localize({ text_cs: "Pilot’s Watches", text_en: "Pilot's Watches", text_de: 'Fliegeruhren' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " a elegantních hodinek ", text_en: ' and the elegant ', text_de: ' und dem eleganten ' }, 'text')}
            <LocalizedLink to="/iwc-schaffhausen/portugieser" className="text-primary underline">{localize({ text_cs: "Portugieser", text_en: 'Portugieser', text_de: 'Portugieser' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " přes společenské ", text_en: ', to the dress-focused ', text_de: ', über das dress-fokussierte ' }, 'text')}
            <LocalizedLink to="/iwc-schaffhausen/portofino" className="text-primary underline">{localize({ text_cs: "Portofino", text_en: 'Portofino', text_de: 'Portofino' }, 'text')}</LocalizedLink>
            {localize({ text_cs: ", technicky zaměřený ", text_en: ', the engineering-driven ', text_de: ', das engineering-getriebene ' }, 'text')}
            <LocalizedLink to="/iwc-schaffhausen/ingenieur" className="text-primary underline">{localize({ text_cs: "Ingenieur", text_en: 'Ingenieur', text_de: 'Ingenieur' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " a potápěčské ", text_en: ', and the dive-focused ', text_de: ', und die tauch-fokussierte ' }, 'text')}
            <LocalizedLink to="/iwc-schaffhausen/aquatimer" className="text-primary underline">{localize({ text_cs: "Aquatimer", text_en: 'Aquatimer', text_de: 'Aquatimer' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " spojuje IWC technický design s nadčasovým stylem. Prohlédněte si náš výběr ", text_en: ', IWC combines technical design with timeless style. Explore our selection of ', text_de: ', verbindet IWC technisches Design mit zeitlosem Stil. Entdecken Sie unsere Auswahl an ' }, 'text')}
            <LocalizedLink to="/iwc-schaffhausen-gebraucht" className="text-primary underline">{localize({ text_cs: "již nošených hodinek IWC", text_en: 'pre-owned IWC', text_de: 'gebrauchten IWC' }, 'text')}</LocalizedLink>
            {localize({ text_cs: ".", text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
          </p>
          <LocalizedLink to="/iwc-schaffhausen/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{t('cta.readStory', { brand: 'IWC' })}</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-secondary">
          <img src={IWC_STORY_IMAGE} alt={`${BRAND} watch`} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>);
}
