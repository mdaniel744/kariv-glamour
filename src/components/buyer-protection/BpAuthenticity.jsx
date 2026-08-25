import React from 'react';
import { BadgeCheck, SearchCheck, ShieldCheck, FileCheck, UsersRound, AlertTriangle } from 'lucide-react';
import BpSection from './BpSection';

const COUNTERFEIT_ICONS = [FileCheck, SearchCheck, BadgeCheck, AlertTriangle, ShieldCheck, UsersRound];

export default function BpAuthenticity({ copy }) {
  return (
    <>
      <BpSection icon={BadgeCheck} title={copy.title}>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-8">
          {copy.intro}
        </p>
        <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mb-8">
          {copy.points.map((p, i) => (
            <div key={i} className="flex items-start gap-3">
              <BadgeCheck size={18} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <span className="text-sm text-foreground leading-relaxed">{p}</span>
            </div>
          ))}
        </div>
        <div className="bg-card border-l-2 border-primary rounded p-5 max-w-3xl">
          <p className="text-sm text-foreground leading-relaxed">
            {copy.notice}
          </p>
        </div>
      </BpSection>

      <BpSection title={copy.counterfeitTitle} className="bg-secondary">
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-8">
          {copy.counterfeitIntro}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {copy.counterfeitCards.map((title, i) => {
            const Icon = COUNTERFEIT_ICONS[i];
            return (
            <div key={i} className="flex items-center gap-4 bg-card border border-border rounded p-5">
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-secondary border border-border flex-shrink-0">
                <Icon size={20} className="text-primary" strokeWidth={1.5} />
              </span>
              <span className="text-sm text-foreground font-medium">{title}</span>
            </div>
            );
          })}
        </div>
      </BpSection>
    </>
  );
}
