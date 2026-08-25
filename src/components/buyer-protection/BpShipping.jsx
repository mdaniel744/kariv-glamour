import React from 'react';
import { Truck } from 'lucide-react';
import BpSection from './BpSection';

export default function BpShipping({ copy }) {
  return (
    <BpSection icon={Truck} title={copy.title}>
      <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-8">
        {copy.intro}
      </p>
      <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mb-8">
        {copy.points.map((p, i) => (
          <div key={i} className="flex items-start gap-3">
            <Truck size={18} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <span className="text-sm text-foreground leading-relaxed">{p}</span>
          </div>
        ))}
      </div>
      <div className="flex items-start gap-3 bg-card border-l-2 border-primary rounded p-5 max-w-3xl">
        <Truck size={18} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground leading-relaxed">
          {copy.notice}
        </p>
      </div>
    </BpSection>
  );
}
