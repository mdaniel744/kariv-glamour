import React, { useEffect } from 'react';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
import APHero from '@/components/audemarspiguet/APHero';
import APIntro from '@/components/audemarspiguet/APIntro';
import APCollectionGrid from '@/components/audemarspiguet/APCollectionGrid';
import APProductGrid from '@/components/audemarspiguet/APProductGrid';
import APSeoCards from '@/components/audemarspiguet/APSeoCards';
import APStoryTeaser from '@/components/audemarspiguet/APStoryTeaser';
import APReadMoreCarousel from '@/components/audemarspiguet/APReadMoreCarousel';
import APInternalLinks from '@/components/audemarspiguet/APInternalLinks';
import APFAQ from '@/components/audemarspiguet/APFAQ';
import APFinalCTA from '@/components/audemarspiguet/APFinalCTA';

export default function AudemarsPiguetPage() {
  const { localize } = useLocalizedField();
  const BRAND = 'Audemars Piguet';
  useSEO({
    title: localize({ title_de: `${BRAND} Uhr | ${BRAND} Uhren & Kollektionen | Kariv Glamour`, title_en: `${BRAND} Watch | ${BRAND} Watches & Collections | Kariv Glamour` }, 'title'),
    description: localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie AP Modelle wie Royal Oak, Royal Oak Offshore, Royal Oak Concept und Code 11.59 mit transparenter Produktinformation.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare AP models like Royal Oak, Royal Oak Offshore, Royal Oak Concept, and Code 11.59 with transparent product information.` }, 'description'),
  });
  useEffect(() => {
    const desc = localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie AP Modelle wie Royal Oak, Royal Oak Offshore, Royal Oak Concept und Code 11.59 mit transparenter Produktinformation.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare AP models like Royal Oak, Royal Oak Offshore, Royal Oak Concept, and Code 11.59 with transparent product information.` }, 'description');
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: `${BRAND} Watches at Kariv Glamour`, description: desc, url: window.location.href },
        { '@type': 'Organization', name: 'Kariv Glamour', url: window.location.origin },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Audemars Piguet', item: window.location.href },
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
      <APHero />
      <APIntro />
      <APCollectionGrid />
      <APProductGrid />
      <APSeoCards />
      <APStoryTeaser />
      <APReadMoreCarousel />
      <APInternalLinks />
      <APFAQ />
      <APFinalCTA />
    </div>
  );
}