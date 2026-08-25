import React from 'react';
import { FileCheck, Star } from 'lucide-react';
import BpSection from './BpSection';

export default function BpDealers({ copy }) {
  return (
    <>
      <BpSection icon={FileCheck} title={copy.title}>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-8">
          {copy.intro}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl">
          {copy.requirements.map((r, i) => (
            <div key={i} className="flex items-start gap-3 bg-card border border-border rounded p-4">
              <FileCheck size={16} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <span className="text-sm text-foreground leading-relaxed">{r}</span>
            </div>
          ))}
        </div>
      </BpSection>

      <BpSection icon={Star} title={copy.reviewsTitle} className="bg-secondary">
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          {copy.reviewsText}
        </p>
      </BpSection>
    </>
  );
}
