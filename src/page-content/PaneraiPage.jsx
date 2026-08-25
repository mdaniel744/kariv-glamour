import React, { useEffect } from 'react';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
import PaneraiHero from '@/components/panerai/PaneraiHero';
import PaneraiIntro from '@/components/panerai/PaneraiIntro';
import PaneraiCollectionGrid from '@/components/panerai/PaneraiCollectionGrid';
import PaneraiProductGrid from '@/components/panerai/PaneraiProductGrid';
import PaneraiSeoCards from '@/components/panerai/PaneraiSeoCards';
import PaneraiStoryTeaser from '@/components/panerai/PaneraiStoryTeaser';
import PaneraiReadMoreCarousel from '@/components/panerai/PaneraiReadMoreCarousel';
import PaneraiInternalLinks from '@/components/panerai/PaneraiInternalLinks';
import PaneraiFAQ from '@/components/panerai/PaneraiFAQ';
import PaneraiFinalCTA from '@/components/panerai/PaneraiFinalCTA';

export default function PaneraiPage() {
  const { localize } = useLocalizedField();
  const BRAND = 'Panerai';
  useSEO({
    title: localize({ title_de: `${BRAND} Uhr | ${BRAND} Uhren & Kollektionen | Kariv Glamour`, title_en: `${BRAND} Watch | ${BRAND} Watches & Collections | Kariv Glamour` }, 'title'),
    description: localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie Modelle aus Luminor, Luminor Marina, Radiomir, Submersible und Luminor Due mit markantem Design, Cushion-Gehäusen und Taucher-Heritage.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare models from Luminor, Luminor Marina, Radiomir, Submersible, and Luminor Due with bold design, cushion cases, and diving heritage.` }, 'description'),
  });
  useEffect(() => {
    const desc = localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie Modelle aus Luminor, Luminor Marina, Radiomir, Submersible und Luminor Due mit markantem Design, Cushion-Gehäusen und Taucher-Heritage.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare models from Luminor, Luminor Marina, Radiomir, Submersible, and Luminor Due with bold design, cushion cases, and diving heritage.` }, 'description');
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: `${BRAND} Watches at Kariv Glamour`, description: desc, url: window.location.href },
        { '@type': 'Organization', name: 'Kariv Glamour', url: window.location.origin },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Panerai', item: window.location.href },
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
      <PaneraiHero />
      <PaneraiCollectionGrid />
      <PaneraiProductGrid />
      <PaneraiIntro />
      <PaneraiSeoCards />
      <PaneraiStoryTeaser />
      <PaneraiReadMoreCarousel />
      <PaneraiInternalLinks />
      <PaneraiFAQ />
      <PaneraiFinalCTA />
    </div>
  );
}
