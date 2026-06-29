import React from 'react';
import { RotateCcw, ClipboardCheck, MessageCircle, PackageCheck, CreditCard } from 'lucide-react';
import BpSection from './BpSection';

const COVERED = [
  'Watch is not as described',
  'Wrong model or reference',
  'Undisclosed damage',
  'Missing box or papers when included in the listing',
  'Defective or malfunctioning watch',
  'Suspected authenticity issue',
  'Incorrect shipment',
];

const NOT_COVERED = [
  'Buyer changed their mind after the return window',
  'Watch was worn, damaged, altered, resized, or modified after delivery',
  'Missing packaging caused by buyer mishandling',
  'Direct payments made outside Kariv Glamour',
  'Custom agreements not recorded on the platform',
  'Normal signs of wear clearly disclosed in the listing',
  'Vintage characteristics already stated in the product description',
];

const RETURN_STEPS = [
  { icon: MessageCircle, title: 'Contact Kariv Support', text: 'Email or message our support team within 14 days after receiving your watch. Include your order number, photos, and a clear explanation of the issue.' },
  { icon: PackageCheck, title: 'Return the Watch Safely', text: 'Once the return is approved, ship the watch back fully insured, with tracking, and in its original packaging, including all accessories, documents, tags, links, box, papers, and certificates received.' },
  { icon: CreditCard, title: 'Receive Your Refund', text: 'After the return is received and checked, Kariv Glamour processes the refund according to the buyer protection and return policy terms.' },
];

export default function BpMoneyBack() {
  return (
    <>
      <BpSection icon={RotateCcw} title="14-Day Global Money-Back Guarantee">
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-10">
          If your watch is defective, malfunctioning, not as described, missing agreed accessories, or materially different from the product listing, you can contact Kariv Glamour support within 14 days after delivery to start a return request.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-primary font-medium mb-5">What may be covered</h3>
            <ul className="space-y-3">
              {COVERED.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <RotateCcw size={16} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-sm text-muted-foreground leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-5">What may not be covered</h3>
            <ul className="space-y-3">
              {NOT_COVERED.map((p, i) => (
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
            Return eligibility depends on the condition of the watch, the listing details, and whether the return request is made within the required time frame.
          </p>
        </div>
      </BpSection>

      <BpSection icon={ClipboardCheck} title="Returns Made Easy" className="bg-secondary">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {RETURN_STEPS.map((s, i) => (
            <div key={i} className="bg-[#0A1F17] border border-[#C5A367]/30 rounded p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#C5A367]/15 border border-[#C5A367]/40">
                  <s.icon size={20} className="text-[#C5A367]" strokeWidth={1.5} />
                </span>
                <span className="font-display text-2xl text-[#C5A367]/40">{i + 1}</span>
              </div>
              <h3 className="font-display text-lg text-white mb-3">{s.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-3 bg-card border border-border rounded p-5 max-w-3xl">
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium flex-shrink-0 mt-0.5">Note</span>
          <p className="text-sm text-muted-foreground leading-relaxed">
            In most cases, the buyer may be responsible for return shipping costs unless the return is caused by seller error, misdescription, or another covered issue.
          </p>
        </div>
      </BpSection>
    </>
  );
}