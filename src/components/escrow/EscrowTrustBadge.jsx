import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export default function EscrowTrustBadge({ variant = 'full' }) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2">
        <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
        <span className="text-[10px] tracking-[0.1em] uppercase text-emerald-600 dark:text-emerald-400 font-medium">
          Buyer Protection Active
        </span>
      </div>
    );
  }

  return (
    <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 flex items-start gap-3">
      <ShieldCheck size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1">
          Kariv Glamour Buyer Protection
        </p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Your payment is held safely in escrow and only released to the dealer after you confirm receipt and authenticity of your watch.
        </p>
      </div>
    </div>
  );
}