import React from 'react';
import { ClipboardCheck, PackageCheck } from 'lucide-react';
import BpSection from './BpSection';

export default function BpChecklists({ copy }) {
  return (
    <>
      <BpSection icon={ClipboardCheck} title={copy.beforeTitle}>
        <div className="grid sm:grid-cols-2 gap-3 max-w-4xl">
          {copy.before.map((p, i) => (
            <div key={i} className="flex items-start gap-3 bg-card border border-border rounded p-4">
              <ClipboardCheck size={18} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <span className="text-sm text-foreground leading-relaxed">{p}</span>
            </div>
          ))}
        </div>
      </BpSection>

      <BpSection icon={PackageCheck} title={copy.afterTitle} className="bg-secondary">
        <div className="grid sm:grid-cols-2 gap-3 max-w-4xl">
          {copy.after.map((p, i) => (
            <div key={i} className="flex items-start gap-3 bg-card border border-border rounded p-4">
              <PackageCheck size={18} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <span className="text-sm text-foreground leading-relaxed">{p}</span>
            </div>
          ))}
        </div>
      </BpSection>
    </>
  );
}
