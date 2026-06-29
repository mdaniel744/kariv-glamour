import React, { useEffect } from 'react';
import GrandSeikoHero from '@/components/grandseiko/GrandSeikoHero';
import GrandSeikoIntro from '@/components/grandseiko/GrandSeikoIntro';
import GrandSeikoCollectionGrid from '@/components/grandseiko/GrandSeikoCollectionGrid';
import GrandSeikoProductGrid from '@/components/grandseiko/GrandSeikoProductGrid';
import GrandSeikoSeoCards from '@/components/grandseiko/GrandSeikoSeoCards';
import GrandSeikoStoryTeaser from '@/components/grandseiko/GrandSeikoStoryTeaser';
import GrandSeikoReadMoreCarousel from '@/components/grandseiko/GrandSeikoReadMoreCarousel';
import GrandSeikoInternalLinks from '@/components/grandseiko/GrandSeikoInternalLinks';
import GrandSeikoFAQ from '@/components/grandseiko/GrandSeikoFAQ';
import GrandSeikoFinalCTA from '@/components/grandseiko/GrandSeikoFinalCTA';

export default function GrandSeikoPage() {
  useEffect(() => {
    document.title = 'Grand Seiko Uhr | Grand Seiko Uhren & Kollektionen | Kariv Glamour';
    const desc = 'Entdecken Sie Grand Seiko Uhren bei Kariv Glamour. Vergleichen Sie GS Modelle aus Heritage, Elegance, Sport, Evolution 9 und Masterpiece mit Spring Drive, Hi-Beat und naturinspirierten Zifferblättern.';
    let m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', desc);
    else { m = document.createElement('meta'); m.name = 'description'; m.content = desc; document.head.appendChild(m); }
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: 'Grand Seiko Uhren at Kariv Glamour', description: desc, url: window.location.href },
        { '@type': 'Organization', name: 'Kariv Glamour', url: window.location.origin },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Grand Seiko', item: window.location.href },
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
      <GrandSeikoHero />
      <GrandSeikoIntro />
      <GrandSeikoCollectionGrid />
      <GrandSeikoProductGrid />
      <GrandSeikoSeoCards />
      <GrandSeikoStoryTeaser />
      <GrandSeikoReadMoreCarousel />
      <GrandSeikoInternalLinks />
      <GrandSeikoFAQ />
      <GrandSeikoFinalCTA />
    </div>
  );
}