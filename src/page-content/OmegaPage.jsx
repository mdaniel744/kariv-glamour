import React, { useEffect } from 'react';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
import OmegaHero from '@/components/omega/OmegaHero';
import OmegaIntro from '@/components/omega/OmegaIntro';
import OmegaCollectionCarousel from '@/components/omega/OmegaCollectionCarousel';
import OmegaProductGrid from '@/components/omega/OmegaProductGrid';
import OmegaSeoCardGrid from '@/components/omega/OmegaSeoCardGrid';
import OmegaEditorialSection from '@/components/omega/OmegaEditorialSection';
import OmegaReadMoreCarousel from '@/components/omega/OmegaReadMoreCarousel';
import OmegaInternalLinkingHub from '@/components/omega/OmegaInternalLinkingHub';
import OmegaFAQ from '@/components/omega/OmegaFAQ';
import OmegaTrustSection from '@/components/omega/OmegaTrustSection';
import OmegaFinalCTA from '@/components/omega/OmegaFinalCTA';
import TrustBar from '@/components/shared/TrustBar';
import { OMEGA_EDITORIAL_SECTIONS } from '@/lib/omegaData';

const BRAND = 'Omega';

export default function OmegaPage() {
  const { localize } = useLocalizedField();
  const seo = {
    title_de: `${BRAND} kaufen | Neue & gebrauchte ${BRAND} Uhren | Kariv Glamour`,
    title_en: `Buy ${BRAND} | New & Pre-Owned ${BRAND} Watches | Kariv Glamour`,
    description_de: `Entdecken Sie ${BRAND} Uhren bei Kariv Glamour. Kaufen Sie neue, gebrauchte und vintage ${BRAND} Modelle wie Speedmaster, Moonwatch, Seamaster, Diver 300M, Planet Ocean, Constellation und De Ville mit transparenter Produktinformation.`,
    description_en: `Discover ${BRAND} watches at Kariv Glamour. Buy new, pre-owned, and vintage ${BRAND} models like Speedmaster, Moonwatch, Seamaster, Diver 300M, Planet Ocean, Constellation, and De Ville with transparent product information.`,
  };
  useSEO({ title: localize(seo, 'title'), description: localize(seo, 'description') });

  useEffect(() => {
    const breadcrumbSchema = {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Brands', item: window.location.origin + '/brands' },
        { '@type': 'ListItem', position: 3, name: BRAND, item: window.location.origin + '/brands/omega' },
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
      <OmegaHero />
      <OmegaCollectionCarousel />
      <OmegaProductGrid />
      <OmegaIntro />
      <OmegaSeoCardGrid />
      <OmegaEditorialSection section={OMEGA_EDITORIAL_SECTIONS[0]} />
      <OmegaEditorialSection section={OMEGA_EDITORIAL_SECTIONS[1]} reverse />
      <OmegaEditorialSection section={OMEGA_EDITORIAL_SECTIONS[2]} />
      <OmegaReadMoreCarousel />
      <OmegaInternalLinkingHub />
      <OmegaFAQ />
      <OmegaTrustSection />
      <OmegaFinalCTA />
      <TrustBar />
    </div>
  );
}
