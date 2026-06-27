import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Customers.list('-created_date', 50).then(setCustomers).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-display text-[#E5E5E5] font-light mb-6">Customers</h1>
      {loading ? (
        <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-[#111] animate-pulse" />)}</div>
      ) : customers.length === 0 ? (
        <div className="text-center py-16 border border-white/5"><p className="text-[#8E8E93] text-sm">No customers yet.</p></div>
      ) : (
        <div className="space-y-2">
          {customers.map(c => (
            <div key={c.id} className="flex items-center justify-between bg-[#111] border border-white/5 p-3">
              <div>
                <p className="text-xs text-[#E5E5E5]">{c.fullName}</p>
                <p className="text-[10px] text-[#8E8E93]">{c.email}</p>
              </div>
              <p className="text-[10px] text-[#8E8E93]">{c.phone || '—'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}