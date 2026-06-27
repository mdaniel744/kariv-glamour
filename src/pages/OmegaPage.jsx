import React, { useEffect } from 'react';
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

export default function OmegaPage() {
  useEffect(() => {
    document.title = 'Omega kaufen | Neue & gebrauchte Omega Uhren | Kariv Glamour';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Entdecken Sie Omega Uhren bei Kariv Glamour. Kaufen Sie neue, gebrauchte und vintage Omega Modelle wie Speedmaster, Moonwatch, Seamaster, Diver 300M, Planet Ocean, Constellation und De Ville mit transparenter Produktinformation.');
    }

    // Breadcrumb structured data
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Brands', item: window.location.origin + '/brands' },
        { '@type': 'ListItem', position: 3, name: 'Omega', item: window.location.origin + '/brands/omega' },
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
      <OmegaHero />
      <OmegaIntro />
      <OmegaCollectionCarousel />
      <OmegaProductGrid />
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