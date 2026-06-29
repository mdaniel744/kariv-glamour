import React, { useEffect } from 'react';
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
  useEffect(() => {
    document.title = 'IWC Schaffhausen Uhr | IWC Schaffhausen Uhren & Kollektionen | Kariv Glamour';
    const desc = 'Entdecken Sie IWC Schaffhausen Uhren bei Kariv Glamour. Vergleichen Sie IWC Modelle aus Pilot\u2019s Watches, Portugieser, Portofino, Ingenieur und Aquatimer mit transparenter Produktinformation.';
    let m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', desc);
    else { m = document.createElement('meta'); m.name = 'description'; m.content = desc; document.head.appendChild(m); }
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: 'IWC Schaffhausen Uhren at Kariv Glamour', description: desc, url: window.location.href },
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