import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { GP_STORY_IMAGE } from '@/lib/girardPerregauxData';

const BRAND = 'Girard-Perregaux';

export default function GirardPerregauxStoryTeaser() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('story.title', { brand: BRAND })}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">{t('story.title', { brand: BRAND })}</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            {localize({ text_cs: "Girard-Perregaux, založený v roce 1791, patří mezi nejstarší švýcarské výrobce hodinek. Reprezentuje vysoké hodinářství, viditelnou mechaniku a design s integrovaným náramkem. Model ", text_en: 'Founded in 1791, Girard-Perregaux is one of the oldest Swiss watch manufacturers, standing for haute horlogerie, visible mechanics, and integrated-bracelet design. The ', text_de: '1791 gegründet, ist Girard-Perregaux einer der ältesten Schweizer Uhrenhersteller und steht für Haute Horlogerie, sichtbare Mechanik und integriertes Armband-Design. Die ' }, 'text')}
            <LocalizedLink to="/girard-perregaux/laureato" className="text-primary underline">{localize({ text_cs: "Laureato", text_en: 'Laureato', text_de: 'Laureato' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " je sportovně elegantní ikonou značky s osmihrannou lunetou. Kolekce ", text_en: " is the brand's sport-chic icon with octagonal bezel. The ", text_de: " ist die Sport-chic-Ikone der Marke mit achteckiger Lünette. Die " }, 'text')}
            <LocalizedLink to="/girard-perregaux/1966" className="text-primary underline">{localize({ text_cs: "1966", text_en: '1966', text_de: '1966' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " nabízí klasické společenské hodinky. Řada ", text_en: ' collection offers classic dress watches. The ', text_de: ' Kollektion bietet klassische Dress-Watches. Die ' }, 'text')}
            <LocalizedLink to="/girard-perregaux/vintage-1945" className="text-primary underline">{localize({ text_cs: "Vintage 1945", text_en: 'Vintage 1945', text_de: 'Vintage 1945' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " přináší půvab stylu art deco. Modely ", text_en: ' brings Art Deco charm. The ', text_de: ' bringt Art-Deco-Charme. Die ' }, 'text')}
            <LocalizedLink to="/girard-perregaux/bridges" className="text-primary underline">{localize({ text_cs: "Bridges", text_en: 'Bridges', text_de: 'Bridges' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " odhalují mechaniku strojku. Vzácný ", text_en: ' make the mechanics visible. And the rare ', text_de: ' machen die Mechanik sichtbar. Und der seltene ' }, 'text')}
            <LocalizedLink to="/girard-perregaux-jackpot" className="text-primary underline">{localize({ text_cs: "Jackpot Tourbillon", text_en: 'Jackpot Tourbillon', text_de: 'Jackpot Tourbillon' }, 'text')}</LocalizedLink>
            {localize({ text_cs: " je sběratelským kouskem s vysokou komplikací. Prohlédněte si naši nabídku nebo ", text_en: ' is a high-complication collector piece. Explore our selection or browse ', text_de: ' ist ein hochkompliziertes Sammlerstück. Entdecken Sie unsere Auswahl oder stöbern Sie durch ' }, 'text')}
            <LocalizedLink to="/girard-perregaux-gebraucht" className="text-primary underline">{localize({ text_cs: "již nošené hodinky Girard-Perregaux", text_en: 'pre-owned Girard-Perregaux', text_de: 'gebrauchte Girard-Perregaux' }, 'text')}</LocalizedLink>
            {localize({ text_cs: ".", text_en: ' watches.', text_de: ' Uhren.' }, 'text')}
          </p>
          <LocalizedLink to="/girard-perregaux/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{t('cta.readStory', { brand: BRAND })}</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-secondary">
          <img src={GP_STORY_IMAGE} alt={`${BRAND} Laureato Fifty watch detail`} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
