import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function BrandFilterDrawer({
  open,
  onClose,
  brand,
  title,
  resultsLabel,
  children,
}) {
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mr-auto flex h-full w-full max-w-md flex-col border-r border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-7">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{brand}</span>
            <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Close ${title}`}
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-7">
          {children}
        </div>

        <div className="border-t border-border bg-background px-5 py-4 sm:px-7">
          <button
            type="button"
            onClick={onClose}
            className="min-h-12 w-full rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground"
          >
            {resultsLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
