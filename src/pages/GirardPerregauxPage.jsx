import React, { useEffect } from 'react';
import GirardPerregauxHero from '@/components/girardperregaux/GirardPerregauxHero';
import GirardPerregauxIntro from '@/components/girardperregaux/GirardPerregauxIntro';
import GirardPerregauxCollectionGrid from '@/components/girardperregaux/GirardPerregauxCollectionGrid';
import GirardPerregauxProductGrid from '@/components/girardperregaux/GirardPerregauxProductGrid';
import GirardPerregauxSeoCards from '@/components/girardperregaux/GirardPerregauxSeoCards';
import GirardPerregauxStoryTeaser from '@/components/girardperregaux/GirardPerregauxStoryTeaser';
import GirardPerregauxReadMoreCarousel from '@/components/girardperregaux/GirardPerregauxReadMoreCarousel';
import GirardPerregauxInternalLinks from '@/components/girardperregaux/GirardPerregauxInternalLinks';
import GirardPerregauxFAQ from '@/components/girardperregaux/GirardPerregauxFAQ';
import GirardPerregauxFinalCTA from '@/components/girardperregaux/GirardPerregauxFinalCTA';

export default function GirardPerregauxPage() {
  useEffect(() => {
    document.title = 'Girard-Perregaux Uhr | Girard-Perregaux Uhren & Kollektionen | Kariv Glamour';
    const desc = 'Entdecken Sie Girard-Perregaux Uhren bei Kariv Glamour. Vergleichen Sie Modelle aus Laureato, 1966, Vintage 1945, Bridges und Cat\'s Eye mit Schweizer Haute Horlogerie und sichtbarer Mechanik.';
    let m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', desc);
    else { m = document.createElement('meta'); m.name = 'description'; m.content = desc; document.head.appendChild(m); }
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: 'Girard-Perregaux Uhren at Kariv Glamour', description: desc, url: window.location.href },
        { '@type': 'Organization', name: 'Kariv Glamour', url: window.location.origin },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Girard-Perregaux', item: window.location.href },
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
      <GirardPerregauxHero />
      <GirardPerregauxIntro />
      <GirardPerregauxCollectionGrid />
      <GirardPerregauxProductGrid />
      <GirardPerregauxSeoCards />
      <GirardPerregauxStoryTeaser />
      <GirardPerregauxReadMoreCarousel />
      <GirardPerregauxInternalLinks />
      <GirardPerregauxFAQ />
      <GirardPerregauxFinalCTA />
    </div>
  );
}