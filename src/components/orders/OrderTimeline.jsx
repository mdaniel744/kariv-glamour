import React from 'react';
import { Check } from 'lucide-react';
import { getEscrowCopy } from '@/lib/escrowCopy';
import { useLanguage } from '@/lib/languageContext';
import { getDirectOrderCopy, isProtectedOrder, ORDER_WORKFLOW_STEPS } from '@/lib/orderPresentation';

export default function OrderTimeline({ order, locale: localeOverride = null }) {
  const { locale } = useLanguage();
  const effectiveLocale = localeOverride || locale;
  const status = order?.escrowStatus;
  const copy = isProtectedOrder(order) ? getEscrowCopy(effectiveLocale) : getDirectOrderCopy(effectiveLocale);

  if (status === 'cancelled') {
    return (
      <div className="border border-red-500/20 bg-red-500/5 p-4 text-center">
        <p className="text-xs text-red-600 dark:text-red-400 tracking-wide">{copy.descriptions.cancelled}</p>
      </div>
    );
  }

  const currentIndex = ORDER_WORKFLOW_STEPS.indexOf(status);

  return (
    <div className="flex items-center min-w-[520px]">
      {ORDER_WORKFLOW_STEPS.map((step, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <React.Fragment key={step}>
            <div className="flex w-20 flex-shrink-0 flex-col items-center">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${isComplete ? 'border-primary bg-primary text-primary-foreground' : isCurrent ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-muted text-muted-foreground'}`}>
                {isComplete ? <Check size={14} /> : <span className="text-[10px] font-bold">{index + 1}</span>}
              </div>
              <p className={`mt-2 text-center text-[9px] leading-tight tracking-[0.05em] ${isCurrent ? 'font-medium text-primary' : 'text-muted-foreground'}`}>
                {copy.steps[step]}
              </p>
            </div>
            {index < ORDER_WORKFLOW_STEPS.length - 1 && (
              <div className={`mb-4 mx-1 h-0.5 flex-1 ${index < currentIndex ? 'bg-primary' : 'bg-border'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
