import React from 'react';
import { FileCheck, Star } from 'lucide-react';
import BpSection from './BpSection';

const DEALER_REQS = [
  'Valid identity verification',
  'Business registration where applicable',
  'Business address',
  'Tax information where applicable',
  'Verified contact details',
  'Transparent product listings',
  'Accurate condition grading',
  'Disclosure of replacement parts',
  'No counterfeit or replica watches',
  'Timely communication',
  'Insured shipping',
  'Respect for Kariv Glamour return and buyer protection rules',
];

export default function BpDealers() {
  return (
    <>
      <BpSection icon={FileCheck} title="Strict Dealer Guidelines">
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-8">
          To maintain trust across the Kariv Glamour marketplace, professional dealers must follow strict platform rules. Before selling, dealers may be required to provide identity information, commercial registration details, business address, tax information, and other verification documents.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl">
          {DEALER_REQS.map((r, i) => (
            <div key={i} className="flex items-start gap-3 bg-card border border-border rounded p-4">
              <FileCheck size={16} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <span className="text-sm text-foreground leading-relaxed">{r}</span>
            </div>
          ))}
        </div>
      </BpSection>

      <BpSection icon={Star} title="Dealer Reviews and Marketplace Transparency" className="bg-secondary">
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          Customer reviews, order history, response behaviour, and seller performance help buyers better understand who they are buying from. Kariv Glamour should display seller ratings, verified reviews, seller location, years active, response time, and completed transactions where available.
        </p>
      </BpSection>
    </>
  );
}