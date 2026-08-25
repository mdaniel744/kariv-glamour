import React from 'react';
import { Headset } from 'lucide-react';
import BpSection from './BpSection';

export default function BpSecurityTeam({ copy }) {
  return (
    <BpSection icon={Headset} title={copy.title} className="bg-secondary">
      <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-8">
        {copy.intro}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl">
        {copy.responsibilities.map((r, i) => (
          <div key={i} className="flex items-start gap-3 bg-card border border-border rounded p-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
            <span className="text-sm text-foreground leading-relaxed">{r}</span>
          </div>
        ))}
      </div>
    </BpSection>
  );
}
