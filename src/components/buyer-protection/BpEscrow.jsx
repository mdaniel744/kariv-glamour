import React from 'react';
import { LockKeyhole } from 'lucide-react';
import BpSection from './BpSection';

const POINTS = [
  'Payment is held securely during the transaction.',
  'Buyer has 14 days after delivery to inspect the watch.',
  'Seller payout is released only after the buyer protection conditions are satisfied.',
  'Escrow applies only to eligible orders processed through Kariv Glamour\u2019s checkout.',
  'Direct payments outside Kariv Glamour are not covered.',
];

export default function BpEscrow() {
  return (
    <BpSection icon={LockKeyhole} title="Payment via the Kariv Escrow Service" className="bg-secondary">
      <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-8">
        Thanks to the Kariv Escrow Service, eligible payments are held securely while your order is being completed. Instead of paying the seller directly, your payment is kept in a protected escrow account during the delivery and inspection period. This gives you time to receive your watch, check its condition, and confirm that the order matches the listing.
      </p>
      <div className="bg-card border border-primary/30 rounded p-6 mb-8 max-w-3xl">
        <p className="text-base text-foreground font-medium">
          Your money is not released to the seller immediately. It remains protected during the buyer inspection period.
        </p>
      </div>
      <ul className="space-y-3 max-w-3xl mb-8">
        {POINTS.map((p, i) => (
          <li key={i} className="flex items-start gap-3">
            <LockKeyhole size={18} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <span className="text-sm text-muted-foreground leading-relaxed">{p}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-start gap-3 bg-card border border-border rounded p-5 max-w-3xl">
        <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium flex-shrink-0 mt-0.5">Important</span>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Kariv Buyer Protection only applies to eligible purchases completed through Kariv Glamour\u2019s approved checkout and payment process. Payments made outside the platform may not be covered.
        </p>
      </div>
    </BpSection>
  );
}