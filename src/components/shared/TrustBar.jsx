import React from 'react';
import { ShieldCheck, Lock, Truck, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LocalizedLink from '@/components/LocalizedLink';

export default function TrustBar() {
  const { t } = useTranslation();

  const trustItems = [
    { icon: ShieldCheck, to: '/authentication', title: t('components.trustBar.authenticated'), desc: t('components.trustBar.authenticatedDesc') },
    { icon: Lock, to: '/buyer-protection', title: t('components.trustBar.securePayment'), desc: t('components.trustBar.securePaymentDesc') },
    { icon: Truck, to: '/legal/shipping-policy', title: t('components.trustBar.insuredShipping'), desc: t('components.trustBar.insuredShippingDesc') },
    { icon: Award, to: '/buyer-protection', title: t('components.trustBar.conditionReport'), desc: t('components.trustBar.conditionReportDesc') }
  ];

  return (
    <div className="text-background py-14 md:py-16 bg-[hsl(var(--foreground))]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {trustItems.map((item, i) =>
          <LocalizedLink key={i} to={item.to} className="rounded-xl text-center hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
              <item.icon size={26} className="text-background mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-background">{item.title}</h3>
              <p className="mx-auto max-w-[210px] text-sm leading-relaxed text-background/75">{item.desc}</p>
            </LocalizedLink>
          )}
        </div>
      </div>
    </div>
  );
}
