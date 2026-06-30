import React from 'react';
import { Check } from 'lucide-react';
import { ESCROW_STEPS } from '@/lib/escrowConstants';

export default function EscrowTimeline({ currentStatus }) {
  if (currentStatus === 'cancelled') {
    return (
      <div className="border border-red-500/20 bg-red-500/5 p-4 text-center">
        <p className="text-xs text-red-600 dark:text-red-400 tracking-wide">This order has been cancelled.</p>
      </div>
    );
  }

  const currentIndex = ESCROW_STEPS.findIndex(s => s.key === currentStatus);

  return (
    <div className="flex items-center">
      {ESCROW_STEPS.map((step, i) => {
        const isComplete = i < currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center flex-shrink-0" style={{ width: '80px' }}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                isComplete ? 'bg-primary border-primary text-primary-foreground' :
                isCurrent ? 'bg-primary/10 border-primary text-primary' :
                'bg-muted border-border text-muted-foreground'
              }`}>
                {isComplete ? <Check size={14} /> : <span className="text-[10px] font-bold">{i + 1}</span>}
              </div>
              <p className={`text-[9px] tracking-[0.05em] text-center mt-2 leading-tight ${isCurrent ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {step.label}
              </p>
            </div>
            {i < ESCROW_STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-4 ${i < currentIndex ? 'bg-primary' : 'bg-border'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}