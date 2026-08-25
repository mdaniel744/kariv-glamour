import React from 'react';
import { LockKeyhole } from 'lucide-react';
import BpSection from './BpSection';

export default function BpEscrow({ copy }) {
  return (
    <BpSection icon={LockKeyhole} title={copy.title} className="bg-secondary">
      <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-8">
        {copy.intro}
      </p>
      <div className="bg-card border border-primary/30 rounded p-6 mb-8 max-w-3xl">
        <p className="text-base text-foreground font-medium">
          {copy.highlight}
        </p>
      </div>
      <ul className="space-y-3 max-w-3xl mb-8">
        {copy.points.map((p, i) => (
          <li key={i} className="flex items-start gap-3">
            <LockKeyhole size={18} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <span className="text-sm text-muted-foreground leading-relaxed">{p}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-start gap-3 bg-card border border-border rounded p-5 max-w-3xl">
        <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium flex-shrink-0 mt-0.5">{copy.importantLabel}</span>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {copy.importantText}
        </p>
      </div>
    </BpSection>
  );
}
