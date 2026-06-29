import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
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
  const { t } = useTranslation();
  return (
    <div className="bg-background">
      <SEO title={t('common:seo.buyerProtection.title')} description={t('common:seo.buyerProtection.description')} />
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