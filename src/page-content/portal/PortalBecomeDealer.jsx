import React, { useState, useEffect, useRef } from 'react';
import { submitDealerApplication } from '@/lib/supabaseData';
import { getMyDealerApplication } from '@/actions/dealerApplications';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { Store, Check, Clock, X } from 'lucide-react';
import { isDealer } from '@/lib/escrowConstants';

export default function PortalBecomeDealer() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  // setSubmitting is async, so a literal double-click can fire handleSubmit
  // twice before the button re-renders disabled. This ref blocks synchronously.
  const submittingRef = useRef(false);
  const [form, setForm] = useState({
    companyName: '', phone: '', taxId: '', website: '',
    address: '', city: '', postalCode: '', country: '', message: ''
  });

  useEffect(() => {
    getMyDealerApplication()
      .then(setApplication)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    try {
      const address = [form.address, form.postalCode, form.city].filter(Boolean).join(', ');
      await submitDealerApplication({
        dealerUserId: user.id,
        contactEmail: user.email,
        companyName: form.companyName,
        phone: form.phone,
        taxId: form.taxId,
        website: form.website,
        address,
        country: form.country,
        message: form.message,
      });
      toast({ title: t('pages.portal.applicationSubmitted') });
      const app = await getMyDealerApplication();
      setApplication(app);
    } catch (e) {
      toast({ title: t('common:error'), description: e.message, variant: 'destructive' });
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  if (isDealer(user)) {
    return (
      <div className="max-w-lg text-center py-12">
        <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={28} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="font-display text-xl text-foreground mb-2">{t('pages.portal.becomeDealerApproved')}</h1>
        <p className="text-sm text-muted-foreground mb-6">{t('pages.portal.becomeDealerApprovedDesc')}</p>
      </div>
    );
  }

  if (loading) return <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-card animate-pulse" />)}</div>;

  if (application && application.status === 'pending') {
    return (
      <div className="max-w-lg text-center py-12">
        <div className="w-16 h-16 bg-amber-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock size={28} className="text-amber-600 dark:text-amber-400" />
        </div>
        <h1 className="font-display text-xl text-foreground mb-2">{t('pages.portal.becomeDealerPending')}</h1>
        <p className="text-sm text-muted-foreground">{t('pages.portal.becomeDealerPendingDesc', { company: application.company_name, email: user.email })}</p>
      </div>
    );
  }

  if (application && application.status === 'rejected') {
    return (
      <div className="max-w-lg text-center py-12">
        <div className="w-16 h-16 bg-red-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
          <X size={28} className="text-red-600 dark:text-red-400" />
        </div>
        <h1 className="font-display text-xl text-foreground mb-2">{t('pages.portal.becomeDealerRejected')}</h1>
        <p className="text-sm text-muted-foreground mb-6">{t('pages.portal.becomeDealerRejectedDesc')}</p>
        <button onClick={() => setApplication(null)} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:underline">{t('pages.portal.submitNewApplication')}</button>
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Store size={24} className="text-primary" />
        <div>
          <h1 className="text-xl font-display text-foreground font-light">{t('pages.portal.becomeDealerTitle')}</h1>
          <p className="text-xs text-muted-foreground">{t('pages.portal.becomeDealerDesc')}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{t('pages.portal.labelCompanyName')}</label>
          <input value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{t('pages.portal.labelPhone')}</label>
            <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{t('pages.portal.labelTaxId')}</label>
            <input value={form.taxId} onChange={e => setForm({...form, taxId: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
          </div>
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{t('pages.portal.labelWebsite')}</label>
          <input value={form.website} onChange={e => setForm({...form, website: e.target.value})} placeholder={t('pages.portal.placeholderWebsite')} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{t('pages.portal.labelBusinessAddress')}</label>
          <input value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{t('pages.portal.labelPostalCode')}</label>
            <input value={form.postalCode} onChange={e => setForm({...form, postalCode: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{t('pages.portal.labelCity')}</label>
            <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
          </div>
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{t('pages.portal.labelCountry')}</label>
          <input value={form.country} onChange={e => setForm({...form, country: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{t('pages.portal.labelMessage')}</label>
          <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={3} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!form.companyName || !form.phone || submitting}
          className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-3 disabled:opacity-50"
        >
          {submitting ? t('pages.portal.submitting') : t('pages.portal.submitApplication')}
        </button>
      </div>
    </div>
  );
}
