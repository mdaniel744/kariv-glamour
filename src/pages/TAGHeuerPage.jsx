import React, { useEffect } from 'react';
import TAGHeuerHero from '@/components/tagheuer/TAGHeuerHero';
import TAGHeuerIntro from '@/components/tagheuer/TAGHeuerIntro';
import TAGHeuerCollectionGrid from '@/components/tagheuer/TAGHeuerCollectionGrid';
import TAGHeuerProductGrid from '@/components/tagheuer/TAGHeuerProductGrid';
import TAGHeuerSeoCards from '@/components/tagheuer/TAGHeuerSeoCards';
import TAGHeuerStoryTeaser from '@/components/tagheuer/TAGHeuerStoryTeaser';
import TAGHeuerReadMoreCarousel from '@/components/tagheuer/TAGHeuerReadMoreCarousel';
import TAGHeuerInternalLinks from '@/components/tagheuer/TAGHeuerInternalLinks';
import TAGHeuerFAQ from '@/components/tagheuer/TAGHeuerFAQ';
import TAGHeuerFinalCTA from '@/components/tagheuer/TAGHeuerFinalCTA';

export default function TAGHeuerPage() {
  useEffect(() => {
    document.title = 'TAG Heuer Uhr | TAG Heuer Uhren & Kollektionen | Kariv Glamour';
    const desc = 'Entdecken Sie TAG Heuer Uhren bei Kariv Glamour. Vergleichen Sie Modelle aus Carrera, Aquaracer, Formula 1, Monaco, Connected und Link mit Chronographen, Motorsport-Heritage und Smartwatch-Features.';
    let m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', desc);
    else { m = document.createElement('meta'); m.name = 'description'; m.content = desc; document.head.appendChild(m); }
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: 'TAG Heuer Uhren at Kariv Glamour', description: desc, url: window.location.href },
        { '@type': 'Organization', name: 'Kariv Glamour', url: window.location.origin },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'TAG Heuer', item: window.location.href },
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
      <TAGHeuerHero />
      <TAGHeuerIntro />
      <TAGHeuerCollectionGrid />
      <TAGHeuerProductGrid />
      <TAGHeuerSeoCards />
      <TAGHeuerStoryTeaser />
      <TAGHeuerReadMoreCarousel />
      <TAGHeuerInternalLinks />
      <TAGHeuerFAQ />
      <TAGHeuerFinalCTA />
    </div>
  );
}