import React, { useEffect } from 'react';
import RolexHero from '@/components/rolex/RolexHero';
import RolexIntro from '@/components/rolex/RolexIntro';
import RolexCollectionCarousel from '@/components/rolex/RolexCollectionCarousel';
import RolexProductGrid from '@/components/rolex/RolexProductGrid';
import RolexSeoCardGrid from '@/components/rolex/RolexSeoCardGrid';
import RolexEditorialSection from '@/components/rolex/RolexEditorialSection';
import RolexReadMoreCarousel from '@/components/rolex/RolexReadMoreCarousel';
import RolexInternalLinkingHub from '@/components/rolex/RolexInternalLinkingHub';
import RolexFAQ from '@/components/rolex/RolexFAQ';
import RolexTrustSection from '@/components/rolex/RolexTrustSection';
import RolexFinalCTA from '@/components/rolex/RolexFinalCTA';
import TrustBar from '@/components/shared/TrustBar';
import { ROLEX_EDITORIAL_SECTIONS } from '@/lib/rolexData';

export default function RolexPage() {
  useEffect(() => {
    document.title = 'Rolex kaufen | Neue & gebrauchte Rolex Uhren | Kariv Glamour';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Entdecken Sie Rolex Uhren bei Kariv Glamour. Kaufen Sie neue, gebrauchte und vintage Rolex Modelle wie Submariner, Daytona, Datejust, GMT-Master II, Day-Date und Oyster Perpetual mit transparenter Produktinformation.');
    }

    // Breadcrumb structured data
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Brands', item: window.location.origin + '/brands' },
        { '@type': 'ListItem', position: 3, name: 'Rolex', item: window.location.origin + '/brands/rolex' },
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
      <RolexHero />
      <RolexIntro />
      <RolexCollectionCarousel />
      <RolexProductGrid />
      <RolexSeoCardGrid />
      <RolexEditorialSection section={ROLEX_EDITORIAL_SECTIONS[0]} />
      <RolexEditorialSection section={ROLEX_EDITORIAL_SECTIONS[1]} reverse />
      <RolexEditorialSection section={ROLEX_EDITORIAL_SECTIONS[2]} />
      <RolexReadMoreCarousel />
      <RolexInternalLinkingHub />
      <RolexFAQ />
      <RolexTrustSection />
      <RolexFinalCTA />
      <TrustBar />
    </div>
  );
}