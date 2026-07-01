import React, { useEffect } from 'react';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
import JLCHero from '@/components/jaegerlecoultre/JLCHero';
import JLCIntro from '@/components/jaegerlecoultre/JLCIntro';
import JLCCollectionGrid from '@/components/jaegerlecoultre/JLCCollectionGrid';
import JLCProductGrid from '@/components/jaegerlecoultre/JLCProductGrid';
import JLCSeoCards from '@/components/jaegerlecoultre/JLCSeoCards';
import JLCStoryTeaser from '@/components/jaegerlecoultre/JLCStoryTeaser';
import JLCReadMoreCarousel from '@/components/jaegerlecoultre/JLCReadMoreCarousel';
import JLCInternalLinks from '@/components/jaegerlecoultre/JLCInternalLinks';
import JLCFAQ from '@/components/jaegerlecoultre/JLCFAQ';
import JLCFinalCTA from '@/components/jaegerlecoultre/JLCFinalCTA';

export default function JaegerLeCoultrePage() {
  const { localize } = useLocalizedField();
  const BRAND = 'Jaeger-LeCoultre';
  useSEO({
    title: localize({ title_de: `${BRAND} Uhr | ${BRAND} Uhren & Kollektionen | Kariv Glamour`, title_en: `${BRAND} Watch | ${BRAND} Watches & Collections | Kariv Glamour` }, 'title'),
    description: localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie JLC Modelle wie Reverso, Master Ultra Thin, Master Control, Polaris, Rendez-Vous und Duometre mit transparenter Produktinformation.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare JLC models like Reverso, Master Ultra Thin, Master Control, Polaris, Rendez-Vous, and Duometre with transparent product information.` }, 'description'),
  });
  useEffect(() => {
    const desc = localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie JLC Modelle wie Reverso, Master Ultra Thin, Master Control, Polaris, Rendez-Vous und Duometre mit transparenter Produktinformation.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare JLC models like Reverso, Master Ultra Thin, Master Control, Polaris, Rendez-Vous, and Duometre with transparent product information.` }, 'description');
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: `${BRAND} Watches at Kariv Glamour`, description: desc, url: window.location.href },
        { '@type': 'Organization', name: 'Kariv Glamour', url: window.location.origin },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Jaeger-LeCoultre', item: window.location.href },
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
      <JLCHero />
      <JLCIntro />
      <JLCCollectionGrid />
      <JLCProductGrid />
      <JLCSeoCards />
      <JLCStoryTeaser />
      <JLCReadMoreCarousel />
      <JLCInternalLinks />
      <JLCFAQ />
      <JLCFinalCTA />
    </div>
  );
}