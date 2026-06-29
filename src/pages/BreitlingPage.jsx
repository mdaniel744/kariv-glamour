import React, { useEffect } from 'react';
import BreitlingHero from '@/components/breitling/BreitlingHero';
import BreitlingIntro from '@/components/breitling/BreitlingIntro';
import BreitlingCollectionGrid from '@/components/breitling/BreitlingCollectionGrid';
import BreitlingProductGrid from '@/components/breitling/BreitlingProductGrid';
import BreitlingSeoCards from '@/components/breitling/BreitlingSeoCards';
import BreitlingStoryTeaser from '@/components/breitling/BreitlingStoryTeaser';
import BreitlingReadMoreCarousel from '@/components/breitling/BreitlingReadMoreCarousel';
import BreitlingInternalLinks from '@/components/breitling/BreitlingInternalLinks';
import BreitlingFAQ from '@/components/breitling/BreitlingFAQ';
import BreitlingFinalCTA from '@/components/breitling/BreitlingFinalCTA';

export default function BreitlingPage() {
  useEffect(() => {
    document.title = 'Breitling Uhr | Breitling Uhren & Kollektionen | Kariv Glamour';
    const desc = 'Entdecken Sie Breitling Uhren bei Kariv Glamour. Vergleichen Sie Breitling Modelle wie Navitimer, Chronomat, Superocean, Avenger, Premier und Professional mit transparenter Produktinformation.';
    let m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', desc);
    else { m = document.createElement('meta'); m.name = 'description'; m.content = desc; document.head.appendChild(m); }
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: 'Breitling Uhren at Kariv Glamour', description: desc, url: window.location.href },
        { '@type': 'Organization', name: 'Kariv Glamour', url: window.location.origin },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Breitling', item: window.location.href },
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
      <BreitlingHero />
      <BreitlingIntro />
      <BreitlingCollectionGrid />
      <BreitlingProductGrid />
      <BreitlingSeoCards />
      <BreitlingStoryTeaser />
      <BreitlingReadMoreCarousel />
      <BreitlingInternalLinks />
      <BreitlingFAQ />
      <BreitlingFinalCTA />
    </div>
  );
}