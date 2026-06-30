import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Store, Check, Clock, X } from 'lucide-react';
import { isDealer } from '@/lib/escrowConstants';

export default function PortalBecomeDealer() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    companyName: '', phone: '', taxId: '', website: '',
    address: '', city: '', postalCode: '', country: '', message: ''
  });

  useEffect(() => {
    base44.entities.DealerApplications.filter({ userId: user.id }, '-created_date', 1)
      .then(apps => setApplication(apps[0] || null))
      .catch(console.error).finally(() => setLoading(false));
  }, [user]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await base44.entities.DealerApplications.create({
        userId: user.id,
        userEmail: user.email,
        userFullName: user.full_name,
        ...form
      });
      toast({ title: 'Application submitted! We will review it shortly.' });
      const apps = await base44.entities.DealerApplications.filter({ userId: user.id }, '-created_date', 1);
      setApplication(apps[0]);
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  if (isDealer(user)) {
    return (
      <div className="max-w-lg text-center py-12">
        <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={28} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="font-display text-xl text-foreground mb-2">You are an approved dealer!</h1>
        <p className="text-sm text-muted-foreground mb-6">You can list and manage your watches from the Dealer Portal.</p>
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
        <h1 className="font-display text-xl text-foreground mb-2">Application Under Review</h1>
        <p className="text-sm text-muted-foreground">Your dealer application for <strong>{application.companyName}</strong> is being reviewed by our team. We'll notify you at {user.email} once a decision is made.</p>
      </div>
    );
  }

  if (application && application.status === 'rejected') {
    return (
      <div className="max-w-lg text-center py-12">
        <div className="w-16 h-16 bg-red-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
          <X size={28} className="text-red-600 dark:text-red-400" />
        </div>
        <h1 className="font-display text-xl text-foreground mb-2">Application Not Approved</h1>
        <p className="text-sm text-muted-foreground mb-6">Unfortunately, your previous application was not approved. {application.adminNotes || 'You may submit a new application below.'}</p>
        <button onClick={() => setApplication(null)} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:underline">Submit New Application</button>
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Store size={24} className="text-primary" />
        <div>
          <h1 className="text-xl font-display text-foreground font-light">Become a Dealer</h1>
          <p className="text-xs text-muted-foreground">List and sell your watches on Kariv Glamour.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">Company Name *</label>
          <input value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">Phone *</label>
            <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">Tax ID / VAT</label>
            <input value={form.taxId} onChange={e => setForm({...form, taxId: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
          </div>
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">Website</label>
          <input value={form.website} onChange={e => setForm({...form, website: e.target.value})} placeholder="https://" className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">Business Address</label>
          <input value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">Postal Code</label>
            <input value={form.postalCode} onChange={e => setForm({...form, postalCode: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">City</label>
            <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
          </div>
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">Country</label>
          <input value={form.country} onChange={e => setForm({...form, country: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">Tell us about your business</label>
          <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={3} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!form.companyName || !form.phone || submitting}
          className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-3 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </div>
  );
}