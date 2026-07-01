import React from 'react';
import { ShieldCheck, Lock, Truck, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TrustBar() {
  const { t } = useTranslation();

  const trustItems = [
    { icon: ShieldCheck, title: t('components.trustBar.authenticated'), desc: t('components.trustBar.authenticatedDesc') },
    { icon: Lock, title: t('components.trustBar.securePayment'), desc: t('components.trustBar.securePaymentDesc') },
    { icon: Truck, title: t('components.trustBar.insuredShipping'), desc: t('components.trustBar.insuredShippingDesc') },
    { icon: Award, title: t('components.trustBar.conditionReport'), desc: t('components.trustBar.conditionReportDesc') }
  ];

  return (
    <div className="text-background py-14 md:py-16 bg-[hsl(var(--foreground))]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {trustItems.map((item, i) =>
          <div key={i} className="text-center">
              <item.icon size={26} className="text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-[10px] tracking-[0.25em] uppercase font-medium text-background mb-1.5">{item.title}</h3>
              <p className="text-[11px] text-background/60 leading-relaxed max-w-[180px] mx-auto">{item.desc}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}