import React, { useEffect } from 'react';
import HublotHero from '@/components/hublot/HublotHero';
import HublotIntro from '@/components/hublot/HublotIntro';
import HublotCollectionGrid from '@/components/hublot/HublotCollectionGrid';
import HublotProductGrid from '@/components/hublot/HublotProductGrid';
import HublotSeoCards from '@/components/hublot/HublotSeoCards';
import HublotStoryTeaser from '@/components/hublot/HublotStoryTeaser';
import HublotReadMoreCarousel from '@/components/hublot/HublotReadMoreCarousel';
import HublotInternalLinks from '@/components/hublot/HublotInternalLinks';
import HublotFAQ from '@/components/hublot/HublotFAQ';
import HublotFinalCTA from '@/components/hublot/HublotFinalCTA';

export default function HublotPage() {
  useEffect(() => {
    document.title = 'Hublot Uhr | Hublot Uhren & Kollektionen | Kariv Glamour';
    const desc = 'Entdecken Sie Hublot Uhren bei Kariv Glamour. Vergleichen Sie Hublot Modelle wie Big Bang, Big Bang Unico, Classic Fusion, Spirit of Big Bang und Square Bang mit transparenter Produktinformation.';
    let m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', desc);
    else { m = document.createElement('meta'); m.name = 'description'; m.content = desc; document.head.appendChild(m); }
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: 'Hublot Uhren at Kariv Glamour', description: desc, url: window.location.href },
        { '@type': 'Organization', name: 'Kariv Glamour', url: window.location.origin },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Hublot', item: window.location.href },
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
      <HublotHero />
      <HublotIntro />
      <HublotCollectionGrid />
      <HublotProductGrid />
      <HublotSeoCards />
      <HublotStoryTeaser />
      <HublotReadMoreCarousel />
      <HublotInternalLinks />
      <HublotFAQ />
      <HublotFinalCTA />
    </div>
  );
}