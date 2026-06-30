import React from 'react';
import { ESCROW_STATUS_LABELS } from '@/lib/escrowConstants';

const STATUS_STYLES = {
  pending_review: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  dealer_accepted: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  funds_secured: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  shipped: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
  verified: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400',
  funds_released: 'bg-green-600/15 text-green-600 dark:text-green-400',
  cancelled: 'bg-red-500/15 text-red-600 dark:text-red-400'
};

export default function EscrowStatusBadge({ status, size = 'sm' }) {
  const label = ESCROW_STATUS_LABELS[status] || status;
  const style = STATUS_STYLES[status] || 'bg-muted text-muted-foreground';
  const sizeClass = size === 'sm' ? 'text-[9px] px-2 py-0.5' : 'text-[10px] px-3 py-1';

  return (
    <span className={`inline-block tracking-[0.1em] uppercase font-medium ${style} ${sizeClass}`}>
      {label}
    </span>
  );
}