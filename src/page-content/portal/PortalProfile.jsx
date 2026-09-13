import React, { useState, useEffect, useRef } from 'react';
import { getMyProfile, saveMyProfile } from '@/actions/customers';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Save, Upload, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PortalProfile() {
  const { t } = useTranslation();
  const { user, updateProfileImage } = useAuth();
  const { toast } = useToast();
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarInputRef = useRef(null);
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
      if (res.ok) toast({ title: t('pages.portal.profileUpdated') });
      else toast({ title: t('error'), description: res.error, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (file) => {
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const res = await updateProfileImage(file);
      if (!res.ok) toast({ title: t('error'), description: res.error, variant: 'destructive' });
    } finally {
      setUploadingAvatar(false);
      if (avatarInputRef.current) avatarInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-display text-foreground font-light mb-6">{t('pages.portal.myProfile')}</h1>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border border-border overflow-hidden bg-card flex-shrink-0 flex items-center justify-center">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-display text-primary">{(user?.full_name || user?.email || '?').charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <label className="cursor-pointer inline-flex items-center gap-1.5 border border-border px-3 py-2 text-xs text-foreground hover:border-primary transition-colors">
              {uploadingAvatar ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
              {uploadingAvatar ? t('pages.portal.uploading') : t('pages.portal.changePhoto')}
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" disabled={uploadingAvatar} onChange={e => handleAvatarChange(e.target.files?.[0])} />
            </label>
          </div>
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{t('pages.customerService.emailTitle')}</label>
          <input value={user?.email || ''} disabled className="w-full bg-muted border border-border px-4 py-3 text-sm text-muted-foreground" />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{t('pages.checkout.fullName')}</label>
          <input value={profile.full_name} disabled className="w-full bg-muted border border-border px-4 py-3 text-sm text-muted-foreground" />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{t('pages.checkout.phone')}</label>
          <input value={profile.phoneNumber} onChange={e => setProfile({...profile, phoneNumber: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{t('pages.checkout.street')}</label>
          <input value={profile.streetAddress} onChange={e => setProfile({...profile, streetAddress: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{t('pages.checkout.postalCode')}</label>
            <input value={profile.postalCode} onChange={e => setProfile({...profile, postalCode: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{t('pages.checkout.city')}</label>
            <input value={profile.city} onChange={e => setProfile({...profile, city: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
          </div>
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{t('pages.checkout.country')}</label>
          <input value={profile.country} onChange={e => setProfile({...profile, country: e.target.value})} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-3 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save size={14} /> {saving ? t('pages.portal.saving') : t('save')}
        </button>
      </div>
    </div>
  );
}
