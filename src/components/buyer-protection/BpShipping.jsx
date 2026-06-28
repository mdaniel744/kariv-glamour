import React from 'react';
import { Truck } from 'lucide-react';
import BpSection from './BpSection';

const POINTS = [
  'Fully insured shipment',
  'Tracking number required',
  'Secure packaging',
  'Signature on delivery where available',
  'Domestic and international shipment support',
  'Buyer support in case of shipment issues',
  'Delivery confirmation required',
];

export default function BpShipping() {
  return (
    <BpSection icon={Truck} title="Insured Shipments">
      <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-8">
        Luxury watches must be shipped securely. Sellers are required to use insured shipping methods with tracking for eligible orders. This helps protect buyers in rare cases of loss, theft, or unsuccessful delivery.
      </p>
      <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mb-8">
        {POINTS.map((p, i) => (
          <div key={i} className="flex items-start gap-3">
            <Truck size={18} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <span className="text-sm text-foreground leading-relaxed">{p}</span>
          </div>
        ))}
      </div>
      <div className="flex items-start gap-3 bg-card border-l-2 border-primary rounded p-5 max-w-3xl">
        <Truck size={18} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground leading-relaxed">
          Buyers should inspect the package upon delivery and report visible damage immediately.
        </p>
      </div>
    </BpSection>
  );
}