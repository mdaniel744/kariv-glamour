import React from 'react';
import { Headset } from 'lucide-react';
import BpSection from './BpSection';

const RESPONSIBILITIES = [
  'Review suspicious listings',
  'Support buyers before purchase',
  'Assist with order issues',
  'Help manage return requests',
  'Review authenticity concerns',
  'Communicate with sellers',
  'Monitor dealer behaviour',
  'Protect marketplace trust',
];

export default function BpSecurityTeam() {
  return (
    <BpSection icon={Headset} title="Kariv Quality & Security Team" className="bg-secondary">
      <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-8">
        Kariv Glamour\u2019s dedicated quality and security team supports buyers throughout the purchase process. The team monitors suspicious activity, reviews reported listings, assists with payment and delivery concerns, and helps resolve issues when a watch is not as described.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl">
        {RESPONSIBILITIES.map((r, i) => (
          <div key={i} className="flex items-start gap-3 bg-card border border-border rounded p-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
            <span className="text-sm text-foreground leading-relaxed">{r}</span>
          </div>
        ))}
      </div>
    </BpSection>
  );
}