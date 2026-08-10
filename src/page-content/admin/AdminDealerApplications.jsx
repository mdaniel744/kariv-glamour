import React, { useState, useEffect } from 'react';
import { listDealerApplications, approveDealerApplication, rejectDealerApplication } from '@/actions/dealerApplications';
import { useToast } from '@/components/ui/use-toast';
import { Check, X, Store } from 'lucide-react';

export default function AdminDealerApplications() {
  const { toast } = useToast();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      setApplications(await listDealerApplications());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleApprove = async (app) => {
    const res = await approveDealerApplication(app.id);
    if (res.ok) {
      toast({ title: `Approved ${app.company_name} — user is now a dealer` });
      load();
    } else {
      toast({ title: 'Error', description: res.error, variant: 'destructive' });
    }
  };

  const handleReject = async (app) => {
    const res = await rejectDealerApplication(app.id);
    if (res.ok) {
      toast({ title: `Rejected ${app.company_name}` });
      load();
    } else {
      toast({ title: 'Error', description: res.error, variant: 'destructive' });
    }
  };

  const filtered = applications.filter(a => filter === 'all' || a.status === filter);

  return (
    <div>
      <h1 className="text-xl font-display text-[#E5E5E5] font-light mb-6">Dealer Applications</h1>

      <div className="flex gap-2 mb-6">
        {['pending', 'approved', 'rejected', 'all'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 ${filter === f ? 'bg-[#C5A367] text-black' : 'bg-[#111] text-[#8E8E93] border border-white/5'}`}>
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-[#111] animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 border border-white/5"><p className="text-[#8E8E93] text-sm">No applications found.</p></div>
      ) : (
        <div className="space-y-3">
          {filtered.map(app => (
            <div key={app.id} className="bg-[#111] border border-white/5 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Store size={18} className="text-[#C5A367]" />
                  <div>
                    <p className="text-xs text-[#E5E5E5] font-medium">{app.company_name}</p>
                    <p className="text-[10px] text-[#8E8E93]">{app.contact_email}</p>
                  </div>
                </div>
                <span className={`text-[9px] tracking-wide uppercase px-2 py-0.5 ${app.status === 'pending' ? 'bg-amber-900/30 text-amber-400' : app.status === 'approved' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>{app.status}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-[10px] text-[#8E8E93] mb-3">
                {app.phone && <div>Phone: <span className="text-[#E5E5E5]">{app.phone}</span></div>}
                {app.tax_id && <div>Tax ID: <span className="text-[#E5E5E5]">{app.tax_id}</span></div>}
                {app.website && <div>Website: <span className="text-[#E5E5E5]">{app.website}</span></div>}
                {app.address && <div>Address: <span className="text-[#E5E5E5]">{app.address}</span></div>}
                {app.country && <div>Country: <span className="text-[#E5E5E5]">{app.country}</span></div>}
              </div>
              {app.message && <p className="text-[10px] text-[#8E8E93] italic mb-3">"{app.message}"</p>}
              {app.status === 'pending' && (
                <div className="flex gap-2">
                  <button onClick={() => handleApprove(app)} className="flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase bg-green-900/30 text-green-400 px-3 py-1.5 hover:bg-green-900/50"><Check size={12} /> Approve</button>
                  <button onClick={() => handleReject(app)} className="flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase bg-red-900/30 text-red-400 px-3 py-1.5 hover:bg-red-900/50"><X size={12} /> Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
