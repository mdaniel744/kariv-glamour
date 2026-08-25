import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import BpSection from './BpSection';

export default function BpConditions({ copy }) {
  return (
    <>
      <BpSection icon={CheckCircle2} title={copy.appliesTitle}>
        <div className="grid sm:grid-cols-2 gap-3 max-w-4xl">
          {copy.applies.map((p, i) => (
            <div key={i} className="flex items-start gap-3 bg-card border border-border rounded p-4">
              <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <span className="text-sm text-foreground leading-relaxed">{p}</span>
            </div>
          ))}
        </div>
      </BpSection>

      <BpSection icon={AlertTriangle} title={copy.notApplyTitle} className="bg-secondary">
        <div className="bg-card border border-destructive/30 rounded p-6 max-w-4xl">
          <div className="flex items-center gap-3 mb-5">
            <AlertTriangle size={22} className="text-destructive" strokeWidth={1.5} />
            <span className="text-[11px] tracking-[0.2em] uppercase text-destructive font-medium">{copy.reviewLabel}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {copy.notApply.map((p, i) => (
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
