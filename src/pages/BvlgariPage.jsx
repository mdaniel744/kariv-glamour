import React, { useEffect } from 'react';
import BvlgariHero from '@/components/bvlgari/BvlgariHero';
import BvlgariIntro from '@/components/bvlgari/BvlgariIntro';
import BvlgariCollectionGrid from '@/components/bvlgari/BvlgariCollectionGrid';
import BvlgariProductGrid from '@/components/bvlgari/BvlgariProductGrid';
import BvlgariSeoCards from '@/components/bvlgari/BvlgariSeoCards';
import BvlgariStoryTeaser from '@/components/bvlgari/BvlgariStoryTeaser';
import BvlgariReadMoreCarousel from '@/components/bvlgari/BvlgariReadMoreCarousel';
import BvlgariInternalLinks from '@/components/bvlgari/BvlgariInternalLinks';
import BvlgariFAQ from '@/components/bvlgari/BvlgariFAQ';
import BvlgariFinalCTA from '@/components/bvlgari/BvlgariFinalCTA';

export default function BvlgariPage() {
  useEffect(() => {
    document.title = 'Bvlgari Uhr | Bvlgari Uhren & Kollektionen | Kariv Glamour';
    const desc = 'Entdecken Sie Bvlgari Uhren bei Kariv Glamour. Vergleichen Sie Modelle aus Serpenti, Octo Finissimo, Octo Roma, Lvcea, Bulgari Bulgari und Aluminium mit italienischem Luxusdesign und römischem Schmuck-Erbe.';
    let m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', desc);
    else { m = document.createElement('meta'); m.name = 'description'; m.content = desc; document.head.appendChild(m); }
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: 'Bvlgari Uhren at Kariv Glamour', description: desc, url: window.location.href },
        { '@type': 'Organization', name: 'Kariv Glamour', url: window.location.origin },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Bvlgari', item: window.location.href },
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
      <BvlgariHero />
      <BvlgariIntro />
      <BvlgariCollectionGrid />
      <BvlgariProductGrid />
      <BvlgariSeoCards />
      <BvlgariStoryTeaser />
      <BvlgariReadMoreCarousel />
      <BvlgariInternalLinks />
      <BvlgariFAQ />
      <BvlgariFinalCTA />
    </div>
  );
}