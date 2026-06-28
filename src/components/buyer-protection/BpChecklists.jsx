import React from 'react';
import { ClipboardCheck, PackageCheck } from 'lucide-react';
import BpSection from './BpSection';

const BEFORE = [
  'Check the brand, model, and reference number',
  'Read the condition description carefully',
  'Review all photos',
  'Confirm box and papers status',
  'Check service history if available',
  'Review warranty details',
  'Check seller rating and dealer profile',
  'Confirm shipping cost and delivery country',
  'Read return conditions',
  'Pay only through Kariv Glamour\u2019s approved checkout',
];

const AFTER = [
  'Inspect the package before opening',
  'Take photos or video while unboxing expensive watches',
  'Compare the watch with the listing',
  'Check the reference number and documents',
  'Confirm box, papers, links, tags, and accessories',
  'Test basic functionality carefully',
  'Do not wear, resize, alter, repair, or polish the watch before deciding to keep it',
  'Contact Kariv support immediately if something is wrong',
];

export default function BpChecklists() {
  return (
    <>
      <BpSection icon={ClipboardCheck} title="Buyer Checklist Before Purchase">
        <div className="grid sm:grid-cols-2 gap-3 max-w-4xl">
          {BEFORE.map((p, i) => (
            <div key={i} className="flex items-start gap-3 bg-card border border-border rounded p-4">
              <ClipboardCheck size={18} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <span className="text-sm text-foreground leading-relaxed">{p}</span>
            </div>
          ))}
        </div>
      </BpSection>

      <BpSection icon={PackageCheck} title="What to Do After Delivery" className="bg-secondary">
        <div className="grid sm:grid-cols-2 gap-3 max-w-4xl">
          {AFTER.map((p, i) => (
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