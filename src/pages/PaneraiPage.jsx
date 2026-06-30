import React, { useEffect } from 'react';
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
  useEffect(() => {
    document.title = 'Panerai Uhr | Panerai Uhren & Kollektionen | Kariv Glamour';
    const desc = 'Entdecken Sie Panerai Uhren bei Kariv Glamour. Vergleichen Sie Modelle aus Luminor, Luminor Marina, Radiomir, Submersible und Luminor Due mit markantem Design, Cushion-Gehäusen und Taucher-Heritage.';
    let m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', desc);
    else { m = document.createElement('meta'); m.name = 'description'; m.content = desc; document.head.appendChild(m); }
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: 'Panerai Uhren at Kariv Glamour', description: desc, url: window.location.href },
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
      <PaneraiIntro />
      <PaneraiCollectionGrid />
      <PaneraiProductGrid />
      <PaneraiSeoCards />
      <PaneraiStoryTeaser />
      <PaneraiReadMoreCarousel />
      <PaneraiInternalLinks />
      <PaneraiFAQ />
      <PaneraiFinalCTA />
    </div>
  );
}