import React, { useEffect } from 'react';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
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
  const { localize } = useLocalizedField();
  const BRAND = 'Breitling';
  useSEO({
    title: localize({ title_de: `${BRAND} Uhr | ${BRAND} Uhren & Kollektionen | Kariv Glamour`, title_en: `${BRAND} Watch | ${BRAND} Watches & Collections | Kariv Glamour` }, 'title'),
    description: localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie ${BRAND} Modelle wie Navitimer, Chronomat, Superocean, Avenger, Premier und Professional mit transparenter Produktinformation.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare ${BRAND} models like Navitimer, Chronomat, Superocean, Avenger, Premier, and Professional with transparent product information.` }, 'description'),
  });
  useEffect(() => {
    const desc = localize({ description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Vergleichen Sie ${BRAND} Modelle wie Navitimer, Chronomat, Superocean, Avenger, Premier und Professional mit transparenter Produktinformation.`, description_en: `Discover ${BRAND} watches at Kariv Glamour. Compare ${BRAND} models like Navitimer, Chronomat, Superocean, Avenger, Premier, and Professional with transparent product information.` }, 'description');
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: `${BRAND} Watches at Kariv Glamour`, description: desc, url: window.location.href },
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