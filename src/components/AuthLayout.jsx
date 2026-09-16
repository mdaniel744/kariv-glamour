import React from "react";
import LocalizedLink from '@/components/LocalizedLink';
import KarivLogo from '@/components/shared/KarivLogo';

export default function AuthLayout({ title, subtitle, footer, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <LocalizedLink to="/" className="mb-4 inline-flex">
            <KarivLogo className="h-24 w-24 md:h-28 md:w-28" sizes="(min-width: 768px) 112px, 96px" loading="eager" />
          </LocalizedLink>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
        </div>
        <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
          {children}
        </div>
        {footer && (
          <p className="text-center text-sm text-muted-foreground mt-6">{footer}</p>
        )}
      </div>
    </div>
  );
}
