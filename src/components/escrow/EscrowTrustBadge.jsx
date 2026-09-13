import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { getEscrowCopy } from '@/lib/escrowCopy';
import { useLanguage } from '@/lib/languageContext';

export default function EscrowTrustBadge({ variant = 'full' }) {
  const { locale } = useLanguage();
  const copy = getEscrowCopy(locale);
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2">
        <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
        <span className="text-[10px] tracking-[0.1em] uppercase text-emerald-600 dark:text-emerald-400 font-medium">
          {copy.active}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 flex items-start gap-3">
      <ShieldCheck size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1">
          {copy.protection}
        </p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {copy.protectionDescription}
        </p>
      </div>
    </div>
  );
}
