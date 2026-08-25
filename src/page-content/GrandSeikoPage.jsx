import React, { useEffect } from 'react';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
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
  const { localize } = useLocalizedField();
  const BRAND = 'Grand Seiko';
  useSEO({
    title: localize({ title_de: `${BRAND} Uhr | ${BRAND} Uhren & Kollektionen | Kariv Glamour`, title_en: `${BRAND} Watch | ${BRAND} Watches & Collections | Kariv Glamour` }, 'title'),
    description: localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie GS Modelle aus Heritage, Elegance, Sport, Evolution 9 und Masterpiece mit Spring Drive, Hi-Beat und naturinspirierten Zifferblättern.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare GS models from Heritage, Elegance, Sport, Evolution 9, and Masterpiece with Spring Drive, Hi-Beat, and nature-inspired dials.` }, 'description'),
  });
  useEffect(() => {
    const desc = localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie GS Modelle aus Heritage, Elegance, Sport, Evolution 9 und Masterpiece mit Spring Drive, Hi-Beat und naturinspirierten Zifferblättern.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare GS models from Heritage, Elegance, Sport, Evolution 9, and Masterpiece with Spring Drive, Hi-Beat, and nature-inspired dials.` }, 'description');
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: `${BRAND} Watches at Kariv Glamour`, description: desc, url: window.location.href },
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
      <GrandSeikoCollectionGrid />
      <GrandSeikoProductGrid />
      <GrandSeikoIntro />
      <GrandSeikoSeoCards />
      <GrandSeikoStoryTeaser />
      <GrandSeikoReadMoreCarousel />
      <GrandSeikoInternalLinks />
      <GrandSeikoFAQ />
      <GrandSeikoFinalCTA />
    </div>
  );
}
