import React, { useEffect } from 'react';
import PatekPhilippeHero from '@/components/patek/PatekPhilippeHero';
import PatekPhilippeIntro from '@/components/patek/PatekPhilippeIntro';
import PatekPhilippeCollectionCarousel from '@/components/patek/PatekPhilippeCollectionCarousel';
import PatekPhilippeProductGrid from '@/components/patek/PatekPhilippeProductGrid';
import PatekPhilippeSeoCardGrid from '@/components/patek/PatekPhilippeSeoCardGrid';
import PatekPhilippeEditorialSection from '@/components/patek/PatekPhilippeEditorialSection';
import PatekPhilippeReadMoreCarousel from '@/components/patek/PatekPhilippeReadMoreCarousel';
import PatekPhilippeInternalLinkingHub from '@/components/patek/PatekPhilippeInternalLinkingHub';
import PatekPhilippeFAQ from '@/components/patek/PatekPhilippeFAQ';
import PatekPhilippeTrustSection from '@/components/patek/PatekPhilippeTrustSection';
import PatekPhilippeFinalCTA from '@/components/patek/PatekPhilippeFinalCTA';
import TrustBar from '@/components/shared/TrustBar';
import { PATEK_EDITORIAL_SECTIONS } from '@/lib/patekData';

export default function PatekPhilippePage() {
  useEffect(() => {
    document.title = 'Patek Philippe kaufen | Neue & gebrauchte Patek Philippe Uhren | Kariv Glamour';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Entdecken Sie Patek Philippe Uhren bei Kariv Glamour. Kaufen Sie neue, gebrauchte und vintage Patek Philippe Modelle wie Nautilus, Aquanaut, Calatrava, Cubitus, Twenty~4 und Grand Complications mit transparenter Produktinformation.');
    }

    // Breadcrumb structured data
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Brands', item: window.location.origin + '/brands' },
        { '@type': 'ListItem', position: 3, name: 'Patek Philippe', item: window.location.origin + '/brands/patek-philippe' },
      ],
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    window.scrollTo(0, 0);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div>
      <PatekPhilippeHero />
      <PatekPhilippeIntro />
      <PatekPhilippeCollectionCarousel />
      <PatekPhilippeProductGrid />
      <PatekPhilippeSeoCardGrid />
      <PatekPhilippeEditorialSection section={PATEK_EDITORIAL_SECTIONS[0]} />
      <PatekPhilippeEditorialSection section={PATEK_EDITORIAL_SECTIONS[1]} reverse />
      <PatekPhilippeEditorialSection section={PATEK_EDITORIAL_SECTIONS[2]} />
      <PatekPhilippeReadMoreCarousel />
      <PatekPhilippeInternalLinkingHub />
      <PatekPhilippeFAQ />
      <PatekPhilippeTrustSection />
      <PatekPhilippeFinalCTA />
      <TrustBar />
    </div>
  );
}