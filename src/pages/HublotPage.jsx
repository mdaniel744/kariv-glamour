import React, { useEffect } from 'react';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
import HublotHero from '@/components/hublot/HublotHero';
import HublotIntro from '@/components/hublot/HublotIntro';
import HublotCollectionGrid from '@/components/hublot/HublotCollectionGrid';
import HublotProductGrid from '@/components/hublot/HublotProductGrid';
import HublotSeoCards from '@/components/hublot/HublotSeoCards';
import HublotStoryTeaser from '@/components/hublot/HublotStoryTeaser';
import HublotReadMoreCarousel from '@/components/hublot/HublotReadMoreCarousel';
import HublotInternalLinks from '@/components/hublot/HublotInternalLinks';
import HublotFAQ from '@/components/hublot/HublotFAQ';
import HublotFinalCTA from '@/components/hublot/HublotFinalCTA';

export default function HublotPage() {
  const { localize } = useLocalizedField();
  const BRAND = 'Hublot';
  useSEO({
    title: localize({ title_de: `${BRAND} Uhr | ${BRAND} Uhren & Kollektionen | Kariv Glamour`, title_en: `${BRAND} Watch | ${BRAND} Watches & Collections | Kariv Glamour` }, 'title'),
    description: localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie ${BRAND} Modelle wie Big Bang, Big Bang Unico, Classic Fusion, Spirit of Big Bang und Square Bang mit transparenter Produktinformation.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare ${BRAND} models like Big Bang, Big Bang Unico, Classic Fusion, Spirit of Big Bang, and Square Bang with transparent product information.` }, 'description'),
  });
  useEffect(() => {
    const desc = localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie ${BRAND} Modelle wie Big Bang, Big Bang Unico, Classic Fusion, Spirit of Big Bang und Square Bang mit transparenter Produktinformation.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare ${BRAND} models like Big Bang, Big Bang Unico, Classic Fusion, Spirit of Big Bang, and Square Bang with transparent product information.` }, 'description');
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: `${BRAND} Watches at Kariv Glamour`, description: desc, url: window.location.href },
        { '@type': 'Organization', name: 'Kariv Glamour', url: window.location.origin },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Hublot', item: window.location.href },
        ] },
      ],
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  return (
    <div className="bg-background">
      <HublotHero />
      <HublotIntro />
      <HublotCollectionGrid />
      <HublotProductGrid />
      <HublotSeoCards />
      <HublotStoryTeaser />
      <HublotReadMoreCarousel />
      <HublotInternalLinks />
      <HublotFAQ />
      <HublotFinalCTA />
    </div>
  );
}