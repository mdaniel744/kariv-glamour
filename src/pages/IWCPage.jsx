import React, { useEffect } from 'react';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
import IWCHero from '@/components/iwc/IWCHero';
import IWCIntro from '@/components/iwc/IWCIntro';
import IWCCollectionGrid from '@/components/iwc/IWCCollectionGrid';
import IWCProductGrid from '@/components/iwc/IWCProductGrid';
import IWCSeoCards from '@/components/iwc/IWCSeoCards';
import IWCStoryTeaser from '@/components/iwc/IWCStoryTeaser';
import IWCReadMoreCarousel from '@/components/iwc/IWCReadMoreCarousel';
import IWCInternalLinks from '@/components/iwc/IWCInternalLinks';
import IWCFAQ from '@/components/iwc/IWCFAQ';
import IWCFinalCTA from '@/components/iwc/IWCFinalCTA';

export default function IWCPage() {
  const { localize } = useLocalizedField();
  const BRAND = 'IWC Schaffhausen';
  useSEO({
    title: localize({ title_de: `${BRAND} Uhr | ${BRAND} Uhren & Kollektionen | Kariv Glamour`, title_en: `${BRAND} Watch | ${BRAND} Watches & Collections | Kariv Glamour` }, 'title'),
    description: localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie IWC Modelle aus Pilot\u2019s Watches, Portugieser, Portofino, Ingenieur und Aquatimer mit transparenter Produktinformation.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare IWC models from Pilot\u2019s Watches, Portugieser, Portofino, Ingenieur, and Aquatimer with transparent product information.` }, 'description'),
  });
  useEffect(() => {
    const desc = localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie IWC Modelle aus Pilot\u2019s Watches, Portugieser, Portofino, Ingenieur und Aquatimer mit transparenter Produktinformation.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare IWC models from Pilot\u2019s Watches, Portugieser, Portofino, Ingenieur, and Aquatimer with transparent product information.` }, 'description');
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: `${BRAND} Watches at Kariv Glamour`, description: desc, url: window.location.href },
        { '@type': 'Organization', name: 'Kariv Glamour', url: window.location.origin },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'IWC Schaffhausen', item: window.location.href },
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
      <IWCHero />
      <IWCIntro />
      <IWCCollectionGrid />
      <IWCProductGrid />
      <IWCSeoCards />
      <IWCStoryTeaser />
      <IWCReadMoreCarousel />
      <IWCInternalLinks />
      <IWCFAQ />
      <IWCFinalCTA />
    </div>
  );
}