import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
import PatekPhilippeHero from '@/components/patek/PatekPhilippeHero';
import PatekPhilippeIntro from '@/components/patek/PatekPhilippeIntro';
import PatekPhilippeCollectionCarousel from '@/components/patek/PatekPhilippeCollectionCarousel';
import PatekPhilippeProductGrid from '@/components/patek/PatekPhilippeProductGrid';
import PatekPhilippeSeoCardGrid from '@/components/patek/PatekPhilippeSeoCardGrid';
import PatekPhilippeEditorialSection from '@/components/patek/PatekPhilippeEditorialSection';
import PatekPhilippeReadMoreCarousel from '@/components/patek/PatekPhilippeReadMoreCarousel';
import PatekPhilippeInternalLinkingHub from '@/components/patek/PatekPhilippeInternalLinkingHub';
import PatekPhilippeFAQ from '@/components/patek/PatekPhilippeFAQ';
import PatekPhilippeTrustSection from '@/components/patek/PatekPhilippeTrustSection';
import PatekPhilippeFinalCTA from '@/components/patek/PatekPhilippeFinalCTA';
import TrustBar from '@/components/shared/TrustBar';
import { PATEK_EDITORIAL_SECTIONS } from '@/lib/patekData';

const BRAND = 'Patek Philippe';

export default function PatekPhilippePage() {
  const { i18n } = useTranslation();
  const { localize } = useLocalizedField();
  const seoPage = {
    title_de: `${BRAND} kaufen | Neue & gebrauchte ${BRAND} Uhren | Kariv Glamour`,
    title_en: `Buy ${BRAND} | New & Pre-Owned ${BRAND} Watches | Kariv Glamour`,
    description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Kaufen Sie neue, gebrauchte und vintage ${BRAND} Modelle wie Nautilus, Aquanaut, Calatrava, Cubitus, Twenty~4 und Grand Complications mit transparenter Produktinformation.`,
    description_en: `Discover ${BRAND} watches at Kariv Glamour. Buy new, pre-owned, and vintage ${BRAND} models like Nautilus, Aquanaut, Calatrava, Cubitus, Twenty~4, and Grand Complications with transparent product information.`,
  };

  useSEO({ title: localize(seoPage, 'title'), description: localize(seoPage, 'description') });

  useEffect(() => {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Brands', item: window.location.origin + '/brands' },
        { '@type': 'ListItem', position: 3, name: BRAND, item: window.location.origin + '/brands/patek-philippe' },
      ],
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);
    window.scrollTo(0, 0);
    return () => { document.head.removeChild(script); };
  }, [i18n.language]);

  return (
    <div className="bg-background">
      <PatekPhilippeHero />
      <PatekPhilippeIntro />
      <PatekPhilippeCollectionCarousel />
      <PatekPhilippeProductGrid />
      <PatekPhilippeSeoCardGrid />
      <PatekPhilippeEditorialSection section={PATEK_EDITORIAL_SECTIONS[0]} />
      <PatekPhilippeEditorialSection section={PATEK_EDITORIAL_SECTIONS[1]} reverse />
      <PatekPhilippeEditorialSection section={PATEK_EDITORIAL_SECTIONS[2]} />
      <PatekPhilippeReadMoreCarousel />
      <PatekPhilippeInternalLinkingHub />
      <PatekPhilippeFAQ />
      <PatekPhilippeTrustSection />
      <PatekPhilippeFinalCTA />
      <TrustBar />
    </div>
  );
}