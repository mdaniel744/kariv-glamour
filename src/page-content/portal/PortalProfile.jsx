import React, { useState, useEffect } from 'react';
import { getMyProfile, saveMyProfile } from '@/actions/customers';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Save } from 'lucide-react';

export default function PortalProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    full_name: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    getMyProfile().then(p => {
      setProfile({
        full_name: user.full_name || '',
        phoneNumber: p.phoneNumber || '',
        streetAddress: p.streetAddress || '',
        city: p.city || '',
        postalCode: p.postalCode || '',
        country: p.country || ''
      });
    }).catch(console.error);
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await saveMyProfile({
        phoneNumber: profile.phoneNumber,
        streetAddress: profile.streetAddress,
        city: profile.city,
        postalCode: profile.postalCode,
        country: profile.country
      });
      if (res.ok) toast({ title: 'Profile updated successfully' });
      else toast({ title: 'Error', description: res.error, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-display text-foreground font-light mb-6">My Profile</h1>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">Email</label>
          <input value={user?.email || ''} disabled className="w-full bg-muted border border-border px-4 py-3 text-sm text-muted-foreground" />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">Full Name</label>
          <input value={profile.full_name} disabled className="w-full bg-muted border border-border px-4 py-3 text-sm text-muted-foreground" />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">Phone</label>
          <input value={profile.phoneNumber} onChange={e => setProfile({...profile, phoneNumber: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">Street Address</label>
          <input value={profile.streetAddress} onChange={e => setProfile({...profile, streetAddress: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">Postal Code</label>
            <input value={profile.postalCode} onChange={e => setProfile({...profile, postalCode: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">City</label>
            <input value={profile.city} onChange={e => setProfile({...profile, city: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
          </div>
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">Country</label>
          <input value={profile.country} onChange={e => setProfile({...profile, country: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-3 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}