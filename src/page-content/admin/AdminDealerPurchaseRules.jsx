'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';

export default function AdminDealerPurchaseRules() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-white/5 bg-[#111] p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#C5A367]">Approval-only dealer access</p>
            <h1 className="mt-2 font-display text-2xl font-light text-[#E5E5E5]">Dealer purchase restrictions are paused</h1>
            <p className="mt-3 text-sm leading-relaxed text-[#9A9A9F]">
              A dealer becomes active as soon as the latest application is approved by an administrator. Account age,
              completed sales, dealer tiers, transaction limits and separate commerce-profile settings do not restrict
              the dealer&apos;s approved listings.
            </p>
          </div>
        </div>

        <div className="mt-7 rounded-xl border border-white/5 bg-black/20 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck size={17} className="mt-0.5 shrink-0 text-[#C5A367]" />
            <div>
              <h2 className="text-sm font-medium text-[#E5E5E5]">Current storefront behavior</h2>
              <p className="mt-2 text-xs leading-relaxed text-[#8E8E93]">
                Products belonging to an approved dealer use the normal cart and sign-in flow, with payment routed
                through Kariv&apos;s protected marketplace checkout. Pending, rejected, revoked or unknown applications
                remain inactive.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-7">
          <LocalizedLink
            to="/admin/dealer-applications"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#C5A367] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-black transition-opacity hover:opacity-90"
          >
            Manage dealer applications
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
}
