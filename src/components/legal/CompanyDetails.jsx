import React from 'react';
import { Building2, Mail, MapPin } from 'lucide-react';
import { COMPANY_DETAILS, getCompanyDetailsCopy } from '@/lib/companyDetails';

function Detail({ label, children }) {
  return (
    <div className="min-w-0 border-t border-border/70 pt-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1.5 break-words text-base font-medium leading-relaxed text-foreground">
        {children}
      </dd>
    </div>
  );
}

export default function CompanyDetails({ locale = 'en', compact = false }) {
  const copy = getCompanyDetailsCopy(locale);

  if (compact) {
    return (
      <address className="mb-10 border-l-2 border-primary/45 pl-4 text-sm not-italic leading-relaxed text-muted-foreground md:text-base">
        <p className="font-semibold text-foreground">{COMPANY_DETAILS.legalName}</p>
        <p>{COMPANY_DETAILS.registeredAddress}</p>
        <a
          href={`mailto:${COMPANY_DETAILS.email}`}
          className="inline-flex items-center gap-2 text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary dark:text-[#C5A367]"
        >
          <Mail aria-hidden="true" size={15} className="shrink-0" />
          {COMPANY_DETAILS.email}
        </a>
      </address>
    );
  }

  return (
    <section
      aria-labelledby="company-details-heading"
      className="mb-12 overflow-hidden rounded-[1.75rem] border border-border bg-card/60 shadow-sm"
    >
      <div className="border-b border-border bg-primary/[0.045] px-6 py-6 dark:bg-white/[0.035] md:px-8">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary dark:text-[#C5A367]">
          <Building2 aria-hidden="true" size={16} />
          <span>{copy.eyebrow}</span>
        </div>
        <h2 id="company-details-heading" className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {copy.heading}
        </h2>
        <p className="mt-2 flex items-center gap-2 text-base text-muted-foreground">
          <MapPin aria-hidden="true" size={16} className="shrink-0" />
          <span>{copy.location}</span>
        </p>
      </div>

      <dl className="grid gap-x-8 gap-y-5 px-6 py-6 md:grid-cols-2 md:px-8 md:py-8">
        <Detail label={copy.legalName}>{COMPANY_DETAILS.legalName}</Detail>
        <Detail label={copy.manager}>{COMPANY_DETAILS.manager}</Detail>
        <Detail label={copy.registeredAddress}>
          <address className="not-italic">{COMPANY_DETAILS.registeredAddress}</address>
        </Detail>
        <Detail label={copy.email}>
          <a
            href={`mailto:${COMPANY_DETAILS.email}`}
            className="inline-flex items-center gap-2 text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary dark:text-[#C5A367]"
          >
            <Mail aria-hidden="true" size={16} className="shrink-0" />
            {COMPANY_DETAILS.email}
          </a>
        </Detail>
        <Detail label={copy.companyId}>{COMPANY_DETAILS.companyId}</Detail>
        <Detail label={copy.euid}>{COMPANY_DETAILS.euid}</Detail>
        <Detail label={copy.vatId}>{COMPANY_DETAILS.vatId}</Detail>
      </dl>
    </section>
  );
}
