import React from 'react';
import { RotateCcw, ClipboardCheck, MessageCircle, PackageCheck, CreditCard } from 'lucide-react';
import BpSection from './BpSection';

const RETURN_ICONS = [MessageCircle, PackageCheck, CreditCard];

export default function BpMoneyBack({ copy }) {
  return (
    <>
      <BpSection icon={RotateCcw} title={copy.title}>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-10">
          {copy.intro}
        </p>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-primary font-medium mb-5">{copy.coveredTitle}</h3>
            <ul className="space-y-3">
              {copy.covered.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <RotateCcw size={16} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-sm text-muted-foreground leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-5">{copy.notCoveredTitle}</h3>
            <ul className="space-y-3">
              {copy.notCovered.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-4 h-4 rounded-full border border-border flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-card border-l-2 border-primary rounded p-5 max-w-3xl">
          <p className="text-sm text-foreground leading-relaxed">
            {copy.eligibilityNote}
          </p>
        </div>
      </BpSection>

      <BpSection icon={ClipboardCheck} title={copy.returnsTitle} className="bg-secondary">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {copy.returnSteps.map((s, i) => {
            const Icon = RETURN_ICONS[i];
            return (
            <div key={i} className="bg-[#0A1F17] border border-[#C5A367]/30 rounded p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#C5A367]/15 border border-[#C5A367]/40">
                  <Icon size={20} className="text-[#C5A367]" strokeWidth={1.5} />
                </span>
                <span className="font-display text-2xl text-[#C5A367]/40">{i + 1}</span>
              </div>
              <h3 className="font-display text-lg text-white mb-3">{s.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{s.text}</p>
            </div>
            );
          })}
        </div>
        <div className="flex items-start gap-3 bg-card border border-border rounded p-5 max-w-3xl">
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium flex-shrink-0 mt-0.5">{copy.noteLabel}</span>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {copy.note}
          </p>
        </div>
      </BpSection>
    </>
  );
}
