'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, RefreshCw, Save, Search, ShieldCheck, Store } from 'lucide-react';
import {
  listDealerPurchasePolicies,
  listPlatformPaymentDestinations,
  updateDealerPurchasePolicy,
  updatePlatformPaymentDestination,
} from '@/actions/dealerPurchasePolicies';
import { deriveEffectiveDealerTier } from '@/lib/purchasePolicy';
import { useToast } from '@/components/ui/use-toast';

const TIERS = [
  { value: 'probationary', label: 'Probationary', help: 'New, reactivated, or insufficient history. Escrow only.' },
  { value: 'standard', label: 'Standard', help: '90+ days and 10+ completed sales. Direct limit up to €10,000.' },
  { value: 'trusted', label: 'Trusted', help: '180+ days and 25+ completed sales with excellent performance. Direct limit up to €50,000.' },
  { value: 'enterprise', label: 'Enterprise', help: 'Independently underwritten. Individually approved limit.' },
];

const INPUT_CLASS = 'w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-xs text-[#E5E5E5] outline-none focus:border-[#C5A367] disabled:cursor-not-allowed disabled:opacity-40';

function dateInput(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

function normalizePolicy(policy) {
  return {
    ...policy,
    activatedAt: dateInput(policy.activatedAt || policy.applicationApprovedAt),
    reactivatedAt: dateInput(policy.reactivatedAt),
    directLimitEur: policy.directLimitEur ?? '',
  };
}

function StatusPill({ children, tone = 'neutral' }) {
  const colors = {
    safe: 'bg-emerald-500/10 text-emerald-400',
    warning: 'bg-amber-500/10 text-amber-300',
    danger: 'bg-red-500/10 text-red-400',
    neutral: 'bg-white/5 text-[#A9A9AE]',
  };
  return <span className={`rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] ${colors[tone]}`}>{children}</span>;
}

export default function AdminDealerPurchaseRules() {
  const { toast } = useToast();
  const [dealers, setDealers] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [draft, setDraft] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [savingRoute, setSavingRoute] = useState('');

  const load = async (preferredId = selectedId) => {
    setLoading(true);
    try {
      const [rows, paymentDestinations] = await Promise.all([
        listDealerPurchasePolicies(),
        listPlatformPaymentDestinations(),
      ]);
      setDealers(rows);
      setDestinations(paymentDestinations);
      const nextId = rows.some((row) => row.dealerUserId === preferredId)
        ? preferredId
        : rows[0]?.dealerUserId || '';
      setSelectedId(nextId);
      setDraft(nextId ? normalizePolicy(rows.find((row) => row.dealerUserId === nextId)) : null);
    } catch (error) {
      toast({ title: 'Unable to load dealer purchase rules', description: error.message, variant: 'destructive' });
      setDealers([]);
      setDraft(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load('');
  }, []);

  const filteredDealers = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return dealers;
    return dealers.filter((dealer) => `${dealer.companyName} ${dealer.contactEmail}`.toLowerCase().includes(needle));
  }, [dealers, search]);

  const selectDealer = (dealer) => {
    setSelectedId(dealer.dealerUserId);
    setDraft(normalizePolicy(dealer));
  };

  const update = (field, value) => setDraft((current) => ({ ...current, [field]: value }));

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const result = await updateDealerPurchasePolicy(draft);
      if (!result.ok) {
        toast({ title: 'Purchase rules were not saved', description: result.error, variant: 'destructive' });
        return;
      }
      toast({ title: 'Dealer purchase rules saved' });
      await load(draft.dealerUserId);
    } catch (error) {
      toast({ title: 'Purchase rules were not saved', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const updateDestination = (route, field, value) => {
    setDestinations((current) => current.map((destination) => destination.purchaseRoute === route
      ? { ...destination, [field]: value }
      : destination));
  };

  const saveDestination = async (destination) => {
    setSavingRoute(destination.purchaseRoute);
    try {
      const result = await updatePlatformPaymentDestination(destination);
      if (!result.ok) {
        toast({ title: 'Payment destination was not saved', description: result.error, variant: 'destructive' });
        return;
      }
      setDestinations((current) => current.map((item) => item.purchaseRoute === destination.purchaseRoute ? result.destination : item));
      toast({ title: `${destination.purchaseRoute === 'escrow' ? 'Protected-payment' : 'Kariv direct'} destination saved` });
    } catch (error) {
      toast({ title: 'Payment destination was not saved', description: error.message, variant: 'destructive' });
    } finally {
      setSavingRoute('');
    }
  };

  const previewEffectiveTier = draft ? deriveEffectiveDealerTier({
    configuredTier: draft.tier,
    activeDays: draft.activeDays,
    completedSales: draft.completedSales,
    stablePerformance: draft.complianceStatus === 'clear' && draft.refundStatus === 'clear' && draft.unresolvedDisputes === 0,
    excellentPerformance: draft.complianceStatus === 'clear' && draft.refundStatus === 'clear' && draft.unresolvedDisputes === 0,
    underwritten: draft.underwritten,
  }) : 'probationary';

  const guardedDirectPayment = draft && previewEffectiveTier !== 'probationary'
    && draft.hasApprovedApplication
    && draft.sellerVerified
    && draft.paymentDetailsVerified
    && draft.complianceStatus === 'clear'
    && draft.refundStatus === 'clear'
    && (draft.tier !== 'enterprise' || draft.underwritten);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-xl font-light text-[#E5E5E5]">Dealer Purchase Rules</h1>
          <p className="mt-1 max-w-3xl text-[11px] leading-relaxed text-[#8E8E93]">
            Configure which verified dealers may receive direct payments. Missing profiles and probationary dealers always use protected payment.
          </p>
          <p className="mt-2 max-w-3xl text-[10px] leading-relaxed text-amber-300/80">
            These are purchase-routing controls only. Dealer approval and account roles remain exclusively managed in the Ecom King dashboard.
          </p>
        </div>
        <button
          type="button"
          onClick={() => load()}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.1em] text-[#8E8E93] hover:border-[#C5A367] hover:text-[#C5A367] disabled:opacity-50"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-4">
        {TIERS.map((tier) => (
          <div key={tier.value} className="rounded-xl border border-white/5 bg-[#111] p-4">
            <p className="text-xs font-medium text-[#E5E5E5]">{tier.label}</p>
            <p className="mt-2 text-[10px] leading-relaxed text-[#8E8E93]">{tier.help}</p>
          </div>
        ))}
      </div>

      <section className="mb-6 rounded-xl border border-white/5 bg-[#111] p-5 md:p-6">
        <div className="mb-5">
          <h2 className="text-sm font-medium text-[#E5E5E5]">Kariv payment destinations</h2>
          <p className="mt-1 max-w-3xl text-[10px] leading-relaxed text-[#777]">
            Buyers only receive bank details copied from a verified destination. Keep Kariv-direct receipts separate from the protected-payment account when required by your operations.
          </p>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {destinations.map((destination) => (
            <div key={destination.purchaseRoute} className="rounded-xl border border-white/5 bg-black/20 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-[#E5E5E5]">{destination.purchaseRoute === 'escrow' ? 'Protected-payment account' : 'Kariv direct-sales account'}</p>
                  <p className="mt-1 text-[10px] text-[#777]">{destination.verified ? 'Verified and available at checkout' : 'Checkout route remains unavailable until verified'}</p>
                </div>
                <StatusPill tone={destination.verified ? 'safe' : 'warning'}>{destination.verified ? 'Verified' : 'Not ready'}</StatusPill>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Beneficiary">
                  <input value={destination.beneficiaryName} onChange={(event) => updateDestination(destination.purchaseRoute, 'beneficiaryName', event.target.value)} className={INPUT_CLASS} />
                </Field>
                <Field label="Bank name">
                  <input value={destination.bankName} onChange={(event) => updateDestination(destination.purchaseRoute, 'bankName', event.target.value)} className={INPUT_CLASS} />
                </Field>
                <Field label="IBAN">
                  <input value={destination.iban} onChange={(event) => updateDestination(destination.purchaseRoute, 'iban', event.target.value)} className={INPUT_CLASS} autoCapitalize="characters" />
                </Field>
                <Field label="BIC / SWIFT (optional)">
                  <input value={destination.bic} onChange={(event) => updateDestination(destination.purchaseRoute, 'bic', event.target.value)} className={INPUT_CLASS} autoCapitalize="characters" />
                </Field>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-[10px] text-[#A9A9AE]">
                  <input type="checkbox" checked={destination.verified} onChange={(event) => updateDestination(destination.purchaseRoute, 'verified', event.target.checked)} className="h-4 w-4 accent-[#C5A367]" />
                  I verified this destination
                </label>
                <button type="button" onClick={() => saveDestination(destination)} disabled={savingRoute === destination.purchaseRoute} className="flex items-center gap-2 rounded-lg bg-[#C5A367] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-black disabled:opacity-50">
                  <Save size={12} /> {savingRoute === destination.purchaseRoute ? 'Saving…' : 'Save account'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="overflow-hidden rounded-xl border border-white/5 bg-[#111]">
          <div className="border-b border-white/5 p-3">
            <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <Search size={13} className="text-[#666]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search dealers"
                className="w-full bg-transparent text-xs text-[#E5E5E5] outline-none placeholder:text-[#666]"
              />
            </label>
          </div>
          <div className="max-h-[680px] overflow-y-auto p-2">
            {loading ? (
              <div className="space-y-2">{[...Array(4)].map((_, index) => <div key={index} className="h-20 animate-pulse rounded-lg bg-white/[0.03]" />)}</div>
            ) : filteredDealers.length === 0 ? (
              <div className="px-4 py-12 text-center text-xs text-[#777]">No dealers found.</div>
            ) : filteredDealers.map((dealer) => (
              <button
                type="button"
                key={dealer.dealerUserId}
                onClick={() => selectDealer(dealer)}
                className={`mb-1 w-full rounded-lg p-3 text-left transition-colors ${selectedId === dealer.dealerUserId ? 'bg-[#C5A367]/10 ring-1 ring-[#C5A367]/40' : 'hover:bg-white/[0.04]'}`}
              >
                <div className="flex items-start gap-3">
                  <Store size={15} className="mt-0.5 shrink-0 text-[#C5A367]" />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-[#E5E5E5]">{dealer.companyName}</p>
                    <p className="mt-1 truncate text-[10px] text-[#777]">{dealer.contactEmail || dealer.dealerUserId}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <StatusPill tone={dealer.effectiveTier === 'probationary' ? 'warning' : 'safe'}>{dealer.effectiveTier}</StatusPill>
                      <StatusPill>{dealer.listingCount} listings</StatusPill>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {!draft ? (
          <div className="flex min-h-80 items-center justify-center rounded-xl border border-white/5 bg-[#111] text-sm text-[#777]">
            Select a dealer to configure purchase rules.
          </div>
        ) : (
          <section className="rounded-xl border border-white/5 bg-[#111] p-5 md:p-6">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-white/5 pb-5">
              <div>
                <h2 className="text-base font-medium text-[#E5E5E5]">{draft.companyName}</h2>
                <p className="mt-1 text-[10px] text-[#777]">{draft.contactEmail || draft.dealerUserId}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusPill tone={draft.hasApprovedApplication ? 'safe' : 'warning'}>
                  {draft.hasApprovedApplication ? 'Approved application' : 'No approved application'}
                </StatusPill>
                <StatusPill tone={draft.hasSavedPolicy ? 'safe' : 'warning'}>
                  {draft.hasSavedPolicy ? 'Rules saved' : 'Safe default'}
                </StatusPill>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Dealer tier">
                <select value={draft.tier} onChange={(event) => update('tier', event.target.value)} className={INPUT_CLASS}>
                  {TIERS.map((tier) => <option key={tier.value} value={tier.value}>{tier.label}</option>)}
                </select>
              </Field>
              <Field label="Direct-payment limit (EUR)">
                <input
                  type="number"
                  min="1"
                  step="100"
                  value={draft.directLimitEur}
                  onChange={(event) => update('directLimitEur', event.target.value)}
                  disabled={draft.tier === 'probationary'}
                  placeholder={draft.tier === 'standard' ? '10000' : draft.tier === 'trusted' ? '25000' : 'Individually approved'}
                  className={INPUT_CLASS}
                />
              </Field>
              <Field label="Activated on">
                <input type="date" value={draft.activatedAt} onChange={(event) => update('activatedAt', event.target.value)} className={INPUT_CLASS} />
              </Field>
              <Field label="Reactivated on (optional)">
                <input type="date" value={draft.reactivatedAt} onChange={(event) => update('reactivatedAt', event.target.value)} className={INPUT_CLASS} />
              </Field>
              <Field label="Compliance status">
                <select value={draft.complianceStatus} onChange={(event) => update('complianceStatus', event.target.value)} className={INPUT_CLASS}>
                  <option value="clear">Clear</option>
                  <option value="review">Under review</option>
                  <option value="suspended">Suspended</option>
                </select>
              </Field>
              <Field label="Refund status">
                <select value={draft.refundStatus} onChange={(event) => update('refundStatus', event.target.value)} className={INPUT_CLASS}>
                  <option value="clear">Clear</option>
                  <option value="overdue">Overdue refund</option>
                </select>
              </Field>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Metric label="Effective tier" value={previewEffectiveTier} tone={previewEffectiveTier === 'probationary' ? 'warning' : 'safe'} />
              <Metric label="Active history" value={`${draft.activeDays} days`} />
              <Metric label="Completed sales" value={draft.completedSales} />
              <Metric label="Open disputes" value={draft.unresolvedDisputes} tone={draft.unresolvedDisputes > 0 ? 'danger' : 'safe'} />
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <ToggleRow label="Seller identity verified" help="The dealer is clearly established as the seller of record. An approved Ecom King application is required." checked={draft.sellerVerified} onCheckedChange={(checked) => update('sellerVerified', checked)} disabled={!draft.hasApprovedApplication} />
              <ToggleRow label="Independently underwritten" help="Required before an Enterprise dealer can receive direct payments." checked={draft.underwritten} onCheckedChange={(checked) => update('underwritten', checked)} />
              <ToggleRow label="Protected payment available" help="Allows eligible orders and buyer-requested protection to use Kariv's protected route." checked={draft.escrowEnabled} onCheckedChange={(checked) => update('escrowEnabled', checked)} disabled={draft.tier === 'probationary'} />
              <ToggleRow label="Direct dealer payment" help="Still subject to the tier limit and live dispute/performance checks at checkout." checked={draft.directSalesEnabled} onCheckedChange={(checked) => update('directSalesEnabled', checked)} disabled={!guardedDirectPayment} />
            </div>

            <div className="mt-6 rounded-xl border border-white/5 bg-black/20 p-4">
              <div className="mb-4">
                <p className="text-xs font-medium text-[#E5E5E5]">Verified direct-payment destination</p>
                <p className="mt-1 text-[10px] leading-relaxed text-[#777]">These structured details are copied into an accepted direct order. Dealers cannot replace them with arbitrary per-order bank details.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Beneficiary business name">
                  <input value={draft.paymentBeneficiaryName || ''} onChange={(event) => update('paymentBeneficiaryName', event.target.value)} className={INPUT_CLASS} />
                </Field>
                <Field label="Bank name">
                  <input value={draft.paymentBankName || ''} onChange={(event) => update('paymentBankName', event.target.value)} className={INPUT_CLASS} />
                </Field>
                <Field label="IBAN">
                  <input value={draft.paymentIban || ''} onChange={(event) => update('paymentIban', event.target.value)} className={INPUT_CLASS} autoCapitalize="characters" />
                </Field>
                <Field label="BIC / SWIFT (optional)">
                  <input value={draft.paymentBic || ''} onChange={(event) => update('paymentBic', event.target.value)} className={INPUT_CLASS} autoCapitalize="characters" />
                </Field>
              </div>
              <div className="mt-4">
                <ToggleRow label="Payout destination verified" help="Confirm only after Kariv has checked that the beneficiary and bank destination belong to the approved dealer." checked={draft.paymentDetailsVerified} onCheckedChange={(checked) => update('paymentDetailsVerified', checked)} />
              </div>
            </div>

            {!guardedDirectPayment && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4 text-[11px] leading-relaxed text-amber-200">
                <AlertTriangle size={15} className="mt-0.5 shrink-0" />
                Direct payment remains unavailable until the dealer is outside probation, identity and payout destination are verified, compliance and refund status are clear, and—if Enterprise—underwritten.
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-5">
              <p className="flex items-center gap-2 text-[10px] text-[#777]">
                <ShieldCheck size={13} className="text-[#C5A367]" />
                Checkout re-evaluates live sales history and unresolved disputes before every purchase.
              </p>
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-[#C5A367] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-black disabled:opacity-50"
              >
                <Save size={13} /> {saving ? 'Saving…' : 'Save rules'}
              </button>
            </div>
          </section>
        )}
      </div>

    </div>
  );
}

function Field({ label, children }) {
  return (
    <label>
      <span className="mb-1.5 block text-[9px] uppercase tracking-[0.14em] text-[#8E8E93]">{label}</span>
      {children}
    </label>
  );
}

function ToggleRow({ label, help, checked, onCheckedChange, disabled = false }) {
  return (
    <div className={`flex items-start justify-between gap-4 rounded-xl border border-white/5 bg-black/20 p-4 ${disabled ? 'opacity-50' : ''}`}>
      <div>
        <p className="text-xs font-medium text-[#E5E5E5]">{label}</p>
        <p className="mt-1 text-[10px] leading-relaxed text-[#777]">{help}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onCheckedChange(event.target.checked)}
        disabled={disabled}
        aria-label={label}
        className="mt-0.5 h-5 w-5 shrink-0 accent-[#C5A367]"
      />
    </div>
  );
}

function Metric({ label, value, tone = 'neutral' }) {
  const valueColor = tone === 'danger' ? 'text-red-400' : tone === 'warning' ? 'text-amber-300' : tone === 'safe' ? 'text-emerald-400' : 'text-[#E5E5E5]';
  return (
    <div className="rounded-xl border border-white/5 bg-black/20 p-4">
      <p className="text-[9px] uppercase tracking-[0.14em] text-[#777]">{label}</p>
      <p className={`mt-2 text-sm font-medium capitalize ${valueColor}`}>{value}</p>
    </div>
  );
}
