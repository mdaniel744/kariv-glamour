import React, { useEffect } from 'react';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
import TudorHero from '@/components/tudor/TudorHero';
import TudorIntro from '@/components/tudor/TudorIntro';
import TudorCollectionGrid from '@/components/tudor/TudorCollectionGrid';
import TudorProductGrid from '@/components/tudor/TudorProductGrid';
import TudorSeoCards from '@/components/tudor/TudorSeoCards';
import TudorStoryTeaser from '@/components/tudor/TudorStoryTeaser';
import TudorReadMoreCarousel from '@/components/tudor/TudorReadMoreCarousel';
import TudorInternalLinks from '@/components/tudor/TudorInternalLinks';
import TudorFAQ from '@/components/tudor/TudorFAQ';
import TudorFinalCTA from '@/components/tudor/TudorFinalCTA';

export default function TudorPage() {
  const { localize } = useLocalizedField();
  const BRAND = 'Tudor';
  useSEO({
    title: localize({ title_de: `${BRAND} Uhr | ${BRAND} Uhren & Kollektionen | Kariv Glamour`, title_en: `${BRAND} Watch | ${BRAND} Watches & Collections | Kariv Glamour` }, 'title'),
    description: localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie Modelle aus Black Bay, Pelagos, Tudor Royal, Ranger, 1926 und Clair de Rose mit Tauchuhr-Heritage, Tool-Watch-Charakter und Schweizer Präzision.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare models from Black Bay, Pelagos, Tudor Royal, Ranger, 1926, and Clair de Rose with dive-watch heritage, tool-watch character, and Swiss precision.` }, 'description'),
  });
  useEffect(() => {
    const desc = localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie Modelle aus Black Bay, Pelagos, Tudor Royal, Ranger, 1926 und Clair de Rose mit Tauchuhr-Heritage, Tool-Watch-Charakter und Schweizer Präzision.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare models from Black Bay, Pelagos, Tudor Royal, Ranger, 1926, and Clair de Rose with dive-watch heritage, tool-watch character, and Swiss precision.` }, 'description');
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: `${BRAND} Watches at Kariv Glamour`, description: desc, url: window.location.href },
        { '@type': 'Organization', name: 'Kariv Glamour', url: window.location.origin },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Tudor', item: window.location.href },
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
      <TudorHero />
      <TudorIntro />
      <TudorCollectionGrid />
      <TudorProductGrid />
      <TudorSeoCards />
      <TudorStoryTeaser />
      <TudorReadMoreCarousel />
      <TudorInternalLinks />
      <TudorFAQ />
      <TudorFinalCTA />
    </div>
  );
}