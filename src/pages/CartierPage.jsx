import React, { useEffect } from 'react';
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

export default function CartierPage() {
  useEffect(() => {
    document.title = 'Cartier Uhr kaufen | Neue & gebrauchte Cartier Uhren | Kariv Glamour';
    const desc = 'Entdecken Sie Cartier Uhren bei Kariv Glamour. Kaufen Sie neue, gebrauchte und vintage Cartier Modelle wie Tank, Santos de Cartier, Panthère, Ballon Bleu, Baignoire und Pasha mit transparenter Produktinformation.';
    let m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', desc);
    else { m = document.createElement('meta'); m.name = 'description'; m.content = desc; document.head.appendChild(m); }
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: 'Cartier Watches at Kariv Glamour', description: desc, url: window.location.href },
        { '@type': 'Organization', name: 'Kariv Glamour', url: window.location.origin },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Cartier', item: window.location.href },
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
    <div>
      <CartierHero />
      <CartierIntro />
      <CartierCollectionGrid />
      <CartierProductGrid />
      <CartierSeoCardGrid />
      <CartierStorySection />
      <CartierReadMoreCarousel />
      <CartierInternalLinks />
      <CartierFAQ />
      <CartierFinalCTA />
    </div>
  );
}