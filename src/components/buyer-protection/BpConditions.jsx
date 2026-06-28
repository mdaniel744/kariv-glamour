import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import BpSection from './BpSection';

const APPLIES = [
  'The purchase is completed through Kariv Glamour checkout',
  'The order is eligible for escrow',
  'The buyer follows Kariv Glamour payment instructions',
  'The return or issue is reported within the required time frame',
  'The watch is returned in the same condition received',
  'The buyer keeps all packaging, accessories, documents, and proof of delivery',
  'The buyer cooperates with support during review',
];

const NOT_APPLY = [
  'Payment is made outside Kariv Glamour',
  'Buyer and seller make a private off-platform agreement',
  'The buyer misses the return deadline',
  'The watch is worn, damaged, altered, repaired, resized, or modified after delivery',
  'The buyer loses box, papers, accessories, links, warranty card, certificate, or packaging',
  'The issue was clearly disclosed in the product listing',
  'The buyer refuses to provide requested evidence',
  'The return is shipped without insurance or tracking',
  'The shipment is sent to the wrong address',
];

export default function BpConditions() {
  return (
    <>
      <BpSection icon={CheckCircle2} title="When Buyer Protection Applies">
        <div className="grid sm:grid-cols-2 gap-3 max-w-4xl">
          {APPLIES.map((p, i) => (
            <div key={i} className="flex items-start gap-3 bg-card border border-border rounded p-4">
              <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <span className="text-sm text-foreground leading-relaxed">{p}</span>
            </div>
          ))}
        </div>
      </BpSection>

      <BpSection icon={AlertTriangle} title="When Buyer Protection May Not Apply" className="bg-secondary">
        <div className="bg-card border border-destructive/30 rounded p-6 max-w-4xl">
          <div className="flex items-center gap-3 mb-5">
            <AlertTriangle size={22} className="text-destructive" strokeWidth={1.5} />
            <span className="text-[11px] tracking-[0.2em] uppercase text-destructive font-medium">Please review carefully</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {NOT_APPLY.map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0 mt-2" />
                <span className="text-sm text-muted-foreground leading-relaxed">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </BpSection>
    </>
  );
}