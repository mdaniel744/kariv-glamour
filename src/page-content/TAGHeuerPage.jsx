import React, { useEffect } from 'react';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
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
  const { localize } = useLocalizedField();
  const BRAND = 'TAG Heuer';
  useSEO({
    title: localize({ title_de: `${BRAND} Uhr | ${BRAND} Uhren & Kollektionen | Kariv Glamour`, title_en: `${BRAND} Watch | ${BRAND} Watches & Collections | Kariv Glamour` }, 'title'),
    description: localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie Modelle aus Carrera, Aquaracer, Formula 1, Monaco, Connected und Link mit Chronographen, Motorsport-Heritage und Smartwatch-Features.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare models from Carrera, Aquaracer, Formula 1, Monaco, Connected, and Link with chronographs, motorsport heritage, and smartwatch features.` }, 'description'),
  });
  useEffect(() => {
    const desc = localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie Modelle aus Carrera, Aquaracer, Formula 1, Monaco, Connected und Link mit Chronographen, Motorsport-Heritage und Smartwatch-Features.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare models from Carrera, Aquaracer, Formula 1, Monaco, Connected, and Link with chronographs, motorsport heritage, and smartwatch features.` }, 'description');
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: `${BRAND} Watches at Kariv Glamour`, description: desc, url: window.location.href },
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
      <TAGHeuerCollectionGrid />
      <TAGHeuerProductGrid />
      <TAGHeuerIntro />
      <TAGHeuerSeoCards />
      <TAGHeuerStoryTeaser />
      <TAGHeuerReadMoreCarousel />
      <TAGHeuerInternalLinks />
      <TAGHeuerFAQ />
      <TAGHeuerFinalCTA />
    </div>
  );
}
