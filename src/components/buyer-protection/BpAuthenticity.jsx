import React from 'react';
import { BadgeCheck, SearchCheck, ShieldCheck, FileCheck, UsersRound, AlertTriangle } from 'lucide-react';
import BpSection from './BpSection';

const AUTH_POINTS = [
  'Authentic watches only',
  'No counterfeit or replica watches',
  'Clear reference numbers',
  'Transparent product condition',
  'Box and papers visibility',
  'Service history where available',
  'Original and replacement parts should be disclosed',
  'Suspicious listings may be reviewed, hidden, or removed',
];

const COUNTERFEIT_CARDS = [
  { icon: FileCheck, title: 'Seller verification' },
  { icon: SearchCheck, title: 'Product information review' },
  { icon: BadgeCheck, title: 'Reference number visibility' },
  { icon: AlertTriangle, title: 'Buyer reporting tools' },
  { icon: ShieldCheck, title: 'Suspicious listing monitoring' },
  { icon: UsersRound, title: 'Support team review' },
];

export default function BpAuthenticity() {
  return (
    <>
      <BpSection icon={BadgeCheck} title="Commitment to Authenticity">
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-8">
          Kariv Glamour is committed to offering authentic luxury watches only. Every dealer and seller must list original timepieces and provide accurate product information. Product listings should clearly state the brand, model, reference number, condition, year, box and papers status, service history, and any known replacement or non-original parts.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mb-8">
          {AUTH_POINTS.map((p, i) => (
            <div key={i} className="flex items-start gap-3">
              <BadgeCheck size={18} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <span className="text-sm text-foreground leading-relaxed">{p}</span>
            </div>
          ))}
        </div>
        <div className="bg-card border-l-2 border-primary rounded p-5 max-w-3xl">
          <p className="text-sm text-foreground leading-relaxed">
            Kariv Glamour does not allow counterfeit, replica, or intentionally misleading watch listings.
          </p>
        </div>
      </BpSection>

      <BpSection title="How We Help Protect Against Counterfeits" className="bg-secondary">
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-8">
          Luxury watches require trust. Kariv Glamour uses seller standards, product information checks, customer reporting, and support review to reduce the risk of counterfeit or misleading listings.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COUNTERFEIT_CARDS.map((c, i) => (
            <div key={i} className="flex items-center gap-4 bg-card border border-border rounded p-5">
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-secondary border border-border flex-shrink-0">
                <c.icon size={20} className="text-primary" strokeWidth={1.5} />
              </span>
              <span className="text-sm text-foreground font-medium">{c.title}</span>
            </div>
          ))}
        </div>
      </BpSection>
    </>
  );
}