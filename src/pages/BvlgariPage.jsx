import React, { useEffect } from 'react';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
import BvlgariHero from '@/components/bvlgari/BvlgariHero';
import BvlgariIntro from '@/components/bvlgari/BvlgariIntro';
import BvlgariCollectionGrid from '@/components/bvlgari/BvlgariCollectionGrid';
import BvlgariProductGrid from '@/components/bvlgari/BvlgariProductGrid';
import BvlgariSeoCards from '@/components/bvlgari/BvlgariSeoCards';
import BvlgariStoryTeaser from '@/components/bvlgari/BvlgariStoryTeaser';
import BvlgariReadMoreCarousel from '@/components/bvlgari/BvlgariReadMoreCarousel';
import BvlgariInternalLinks from '@/components/bvlgari/BvlgariInternalLinks';
import BvlgariFAQ from '@/components/bvlgari/BvlgariFAQ';
import BvlgariFinalCTA from '@/components/bvlgari/BvlgariFinalCTA';

export default function BvlgariPage() {
  const { localize } = useLocalizedField();
  const BRAND = 'Bvlgari';
  useSEO({
    title: localize({ title_de: `${BRAND} Uhr | ${BRAND} Uhren & Kollektionen | Kariv Glamour`, title_en: `${BRAND} Watch | ${BRAND} Watches & Collections | Kariv Glamour` }, 'title'),
    description: localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie Modelle aus Serpenti, Octo Finissimo, Octo Roma, Lvcea, Bulgari Bulgari und Aluminium mit italienischem Luxusdesign und römischem Schmuck-Erbe.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare models from Serpenti, Octo Finissimo, Octo Roma, Lvcea, Bulgari Bulgari, and Aluminium with Italian luxury design and Roman jewellery heritage.` }, 'description'),
  });
  useEffect(() => {
    const desc = localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie Modelle aus Serpenti, Octo Finissimo, Octo Roma, Lvcea, Bulgari Bulgari und Aluminium mit italienischem Luxusdesign und römischem Schmuck-Erbe.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare models from Serpenti, Octo Finissimo, Octo Roma, Lvcea, Bulgari Bulgari, and Aluminium with Italian luxury design and Roman jewellery heritage.` }, 'description');
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: `${BRAND} Watches at Kariv Glamour`, description: desc, url: window.location.href },
        { '@type': 'Organization', name: 'Kariv Glamour', url: window.location.origin },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Bvlgari', item: window.location.href },
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
      <BvlgariHero />
      <BvlgariIntro />
      <BvlgariCollectionGrid />
      <BvlgariProductGrid />
      <BvlgariSeoCards />
      <BvlgariStoryTeaser />
      <BvlgariReadMoreCarousel />
      <BvlgariInternalLinks />
      <BvlgariFAQ />
      <BvlgariFinalCTA />
    </div>
  );
}