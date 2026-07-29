import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { asArray } from '@/lib/base44Data';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/lib/languageContext';
import LocalizedLink from '@/components/LocalizedLink';
import { ArrowLeft, Save, Upload, X, ExternalLink } from 'lucide-react';

export default function DealerProfileSettings() {
  const { user } = useAuth();
  const { localePath } = useLanguage();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [form, setForm] = useState({
    displayName: '',
    bio: '',
    logoImage: '',
    bannerImage: '',
    location: '',
    specialties: [],
    establishedYear: '',
    responseTime: '',
    contactPhone: '',
    websiteUrl: ''
  });
  const [specialtyInput, setSpecialtyInput] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const profiles = asArray(await base44.entities.DealerProfile.filter({ userId: user.id }, '-created_date', 1));
        if (profiles.length > 0) {
          const p = profiles[0];
          setProfileId(p.id);
          setForm({
            displayName: p.displayName || user.full_name || '',
            bio: p.bio || '',
            logoImage: p.logoImage || '',
            bannerImage: p.bannerImage || '',
            location: p.location || '',
            specialties: p.specialties || [],
            establishedYear: p.establishedYear || '',
            responseTime: p.responseTime || '',
            contactPhone: p.contactPhone || '',
            websiteUrl: p.websiteUrl || ''
          });
        } else {
          setForm(prev => ({ ...prev, displayName: user.full_name || '' }));
        }
      } catch (e) { console.error(e); }
    };
    if (user) load();
  }, [user]);

  const handleUpload = async (file, field) => {
    if (!file) return;
    const setUploading = field === 'logoImage' ? setUploadingLogo : setUploadingBanner;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setForm(prev => ({ ...prev, [field]: file_url }));
    } catch (e) {
      toast({ title: 'Upload failed', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const addSpecialty = () => {
    const val = specialtyInput.trim();
    if (val && !form.specialties.includes(val)) {
      setForm(prev => ({ ...prev, specialties: [...prev.specialties, val] }));
      setSpecialtyInput('');
    }
  };

  const removeSpecialty = (idx) => {
    setForm(prev => ({ ...prev, specialties: prev.specialties.filter((_, i) => i !== idx) }));
  };

  const handleSave = async () => {
    if (!form.displayName.trim()) {
      toast({ title: 'Display name is required', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        userId: user.id,
        displayName: form.displayName.trim(),
        bio: form.bio.trim(),
        logoImage: form.logoImage,
        bannerImage: form.bannerImage,
        location: form.location.trim(),
        specialties: form.specialties,
        establishedYear: form.establishedYear ? Number(form.establishedYear) : undefined,
        responseTime: form.responseTime.trim(),
        contactPhone: form.contactPhone.trim(),
        websiteUrl: form.websiteUrl.trim()
      };

      if (profileId) {
        await base44.entities.DealerProfile.update(profileId, payload);
      } else {
        const created = await base44.entities.DealerProfile.create(payload);
        setProfileId(created.id);
      }
      toast({ title: 'Profile saved!' });
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full bg-card border border-border px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary";
  const labelClass = "text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1 block";

  return (
    <div className="max-w-2xl">
      <LocalizedLink to="/dealer" className="inline-flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft size={10} /> Back to Dashboard
      </LocalizedLink>
      <h1 className="text-xl font-display text-foreground font-light mb-2">Public Dealer Profile</h1>
      <p className="text-xs text-muted-foreground mb-6">This is what buyers see when they view your dealer profile. A complete profile builds trust and increases sales.</p>

      {profileId && (
        <a
          href={localePath(`/dealer-profile/${user.id}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.12em] uppercase text-primary hover:underline mb-6"
        >
          <ExternalLink size={12} /> View Public Profile
        </a>
      )}

      <div className="space-y-5">
        {/* Banner */}
        <div>
          <label className={labelClass}>Banner Image</label>
          <div className="relative h-32 border border-border overflow-hidden bg-card">
            {form.bannerImage ? (
              <>
                <img src={form.bannerImage} alt="" className="w-full h-full object-cover" />
                <button onClick={() => setForm(prev => ({ ...prev, bannerImage: '' }))} className="absolute top-2 right-2 w-6 h-6 bg-background/80 rounded-full flex items-center justify-center">
                  <X size={12} />
                </button>
              </>
            ) : (
              <label className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-muted transition-colors">
                {uploadingBanner ? (
                  <div className="w-5 h-5 border-2 border-border border-t-primary rounded-full animate-spin" />
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Upload size={14} /> Upload Banner</span>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={e => handleUpload(e.target.files[0], 'bannerImage')} />
              </label>
            )}
          </div>
        </div>

        {/* Logo */}
        <div>
          <label className={labelClass}>Logo / Avatar</label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full border border-border overflow-hidden bg-card flex-shrink-0">
              {form.logoImage ? (
                <img src={form.logoImage} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-display text-primary">
                  {(form.displayName || user?.email || 'D').charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <label className="cursor-pointer">
              <span className="inline-flex items-center gap-1.5 border border-border px-3 py-2 text-xs text-foreground hover:border-primary transition-colors">
                {uploadingLogo ? (
                  <div className="w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" />
                ) : (
                  <><Upload size={12} /> Upload</>
                )}
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={e => handleUpload(e.target.files[0], 'logoImage')} />
            </label>
            {form.logoImage && (
              <button onClick={() => setForm(prev => ({ ...prev, logoImage: '' }))} className="text-xs text-destructive hover:underline">Remove</button>
            )}
          </div>
        </div>

        <div><label className={labelClass}>Display Name *</label><input value={form.displayName} onChange={e => setForm({...form, displayName: e.target.value})} className={inputClass} /></div>
        <div><label className={labelClass}>Bio</label><textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={4} placeholder="Tell buyers about your dealership, your expertise, and what makes you trustworthy..." className={inputClass + " resize-none"} /></div>

        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelClass}>Location</label><input value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="City, Country" className={inputClass} /></div>
          <div><label className={labelClass}>Established Year</label><input type="number" value={form.establishedYear} onChange={e => setForm({...form, establishedYear: e.target.value})} placeholder="e.g. 2015" className={inputClass} /></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelClass}>Response Time</label><input value={form.responseTime} onChange={e => setForm({...form, responseTime: e.target.value})} placeholder="e.g. Usually within 24 hours" className={inputClass} /></div>
          <div><label className={labelClass}>Website (optional)</label><input value={form.websiteUrl} onChange={e => setForm({...form, websiteUrl: e.target.value})} placeholder="https://" className={inputClass} /></div>
        </div>

        {/* Specialties */}
        <div>
          <label className={labelClass}>Specialties</label>
          <div className="flex gap-2 mb-2">
            <input
              value={specialtyInput}
              onChange={e => setSpecialtyInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSpecialty(); } }}
              placeholder="e.g. Rolex, Patek Philippe"
              className={inputClass}
            />
            <button onClick={addSpecialty} className="bg-muted text-foreground px-4 text-xs">Add</button>
          </div>
          {form.specialties.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.specialties.map((s, i) => (
                <span key={i} className="flex items-center gap-1 bg-muted px-2 py-1 text-xs text-foreground">
                  {s}
                  <button onClick={() => removeSpecialty(i)} className="text-muted-foreground hover:text-destructive"><X size={10} /></button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button onClick={handleSave} disabled={saving} className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-3 flex items-center justify-center gap-2 disabled:opacity-50">
          <Save size={14} /> {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
}
