import React, { useEffect } from 'react';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
import CartierHero from '@/components/cartier/CartierHero';
import CartierIntro from '@/components/cartier/CartierIntro';
import CartierCollectionGrid from '@/components/cartier/CartierCollectionGrid';
import CartierProductGrid from '@/components/cartier/CartierProductGrid';
import CartierSeoCardGrid from '@/components/cartier/CartierSeoCardGrid';
import CartierStorySection from '@/components/cartier/CartierStorySection';
import CartierReadMoreCarousel from '@/components/cartier/CartierReadMoreCarousel';
import CartierInternalLinks from '@/components/cartier/CartierInternalLinks';
import CartierFAQ from '@/components/cartier/CartierFAQ';
import CartierFinalCTA from '@/components/cartier/CartierFinalCTA';

const BRAND = 'Cartier';

export default function CartierPage() {
  const { localize } = useLocalizedField();
  const seo = {
    title_de: `${BRAND} Uhr kaufen | Neue & gebrauchte ${BRAND} Uhren | Kariv Glamour`,
    title_en: `Buy ${BRAND} Watch | New & Pre-Owned ${BRAND} Watches | Kariv Glamour`,
    description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Kaufen Sie neue, gebrauchte und vintage ${BRAND} Modelle wie Tank, Santos de Cartier, Panthère, Ballon Bleu, Baignoire und Pasha mit transparenter Produktinformation.`,
    description_en: `Discover ${BRAND} watches at Kariv Glamour. Buy new, pre-owned, and vintage ${BRAND} models like Tank, Santos de Cartier, Panthère, Ballon Bleu, Baignoire, and Pasha with transparent product information.`,
  };
  useSEO({ title: localize(seo, 'title'), description: localize(seo, 'description') });

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: `${BRAND} Watches at Kariv Glamour`, description: localize(seo, 'description'), url: window.location.href },
        { '@type': 'Organization', name: 'Kariv Glamour', url: window.location.origin },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
          { '@type': 'ListItem', position: 2, name: BRAND, item: window.location.href },
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
      <CartierHero />
      <CartierCollectionGrid />
      <CartierProductGrid />
      <CartierIntro />
      <CartierSeoCardGrid />
      <CartierStorySection />
      <CartierReadMoreCarousel />
      <CartierInternalLinks />
      <CartierFAQ />
      <CartierFinalCTA />
    </div>
  );
}
