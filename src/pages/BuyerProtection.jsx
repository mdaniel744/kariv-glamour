import React, { useEffect } from 'react';
import BpHero from '@/components/buyer-protection/BpHero';
import BpIncluded from '@/components/buyer-protection/BpIncluded';
import BpHowItWorks from '@/components/buyer-protection/BpHowItWorks';
import BpEscrow from '@/components/buyer-protection/BpEscrow';
import BpAuthenticity from '@/components/buyer-protection/BpAuthenticity';
import BpMoneyBack from '@/components/buyer-protection/BpMoneyBack';
import BpDealers from '@/components/buyer-protection/BpDealers';
import BpShipping from '@/components/buyer-protection/BpShipping';
import BpSecurityTeam from '@/components/buyer-protection/BpSecurityTeam';
import BpConditions from '@/components/buyer-protection/BpConditions';
import BpChecklists from '@/components/buyer-protection/BpChecklists';
import BpFAQ from '@/components/buyer-protection/BpFAQ';
import BpSupport from '@/components/buyer-protection/BpSupport';

export default function BuyerProtection() {
  useEffect(() => {
    document.title = 'Kariv Buyer Protection | Secure Luxury Watch Purchases | Kariv Glamour';
    const desc = 'Buy luxury watches with confidence through Kariv Buyer Protection. Learn about escrow payment, authenticity standards, 14-day money-back guarantee, verified dealers, insured shipping, and buyer support.';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = desc;
      document.head.appendChild(metaDesc);
    }

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', name: 'Kariv Buyer Protection', description: desc, url: window.location.href },
        { '@type': 'Organization', name: 'Kariv Glamour', url: window.location.origin },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
            { '@type': 'ListItem', position: 2, name: 'Buyer Protection', item: window.location.href },
          ],
        },
      ],
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="bg-background">
      <BpHero />
      <BpIncluded />
      <BpHowItWorks />
      <BpEscrow />
      <BpAuthenticity />
      <BpMoneyBack />
      <BpDealers />
      <BpShipping />
      <BpSecurityTeam />
      <BpConditions />
      <BpChecklists />
      <BpFAQ />
      <BpSupport />
    </div>
  );
}