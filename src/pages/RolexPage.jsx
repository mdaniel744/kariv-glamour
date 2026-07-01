import React, { useEffect } from 'react';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
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

const BRAND = 'Rolex';

export default function RolexPage() {
  const { localize } = useLocalizedField();
  const seo = {
    title_de: `${BRAND} kaufen | Neue & gebrauchte ${BRAND} Uhren | Kariv Glamour`,
    title_en: `Buy ${BRAND} | New & Pre-Owned ${BRAND} Watches | Kariv Glamour`,
    description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Kaufen Sie neue, gebrauchte und vintage ${BRAND} Modelle wie Submariner, Daytona, Datejust, GMT-Master II, Day-Date und Oyster Perpetual mit transparenter Produktinformation.`,
    description_en: `Discover ${BRAND} watches at Kariv Glamour. Buy new, pre-owned, and vintage ${BRAND} models like Submariner, Daytona, Datejust, GMT-Master II, Day-Date, and Oyster Perpetual with transparent product information.`,
  };
  useSEO({ title: localize(seo, 'title'), description: localize(seo, 'description') });

  useEffect(() => {
    const breadcrumbSchema = {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Brands', item: window.location.origin + '/brands' },
        { '@type': 'ListItem', position: 3, name: BRAND, item: window.location.origin + '/brands/rolex' },
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
    <div className="bg-background">
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