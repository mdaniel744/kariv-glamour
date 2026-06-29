import React, { useEffect } from 'react';
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
  useEffect(() => {
    document.title = 'Audemars Piguet Uhr | Audemars Piguet Uhren & Kollektionen | Kariv Glamour';
    const desc = 'Entdecken Sie Audemars Piguet Uhren bei Kariv Glamour. Vergleichen Sie AP Modelle wie Royal Oak, Royal Oak Offshore, Royal Oak Concept und Code 11.59 mit transparenter Produktinformation.';
    let m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', desc);
    else { m = document.createElement('meta'); m.name = 'description'; m.content = desc; document.head.appendChild(m); }
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: 'Audemars Piguet Uhren at Kariv Glamour', description: desc, url: window.location.href },
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