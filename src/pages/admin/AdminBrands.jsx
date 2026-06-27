import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Pencil, Trash2, X, Save, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function AdminBrands() {
  const { toast } = useToast();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const load = async () => {
    setLoading(true);
    try { setBrands(await base44.entities.Brands.list('-created_date', 50)); } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm({ brandName: '', slug: '', shortDescription: '', longDescription: '', brandDisclaimer: '', seoTitle: '', seoDescription: '' }); setEditing('new'); };
  const openEdit = (b) => { setForm({ ...b }); setEditing(b.id); };

  const handleSave = async () => {
    try {
      const payload = { ...form, slug: form.slug || form.brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-') };
      if (editing === 'new') { await base44.entities.Brands.create(payload); toast({ title: "Brand created" }); }
      else { await base44.entities.Brands.update(editing, payload); toast({ title: "Brand updated" }); }
      setEditing(null); load();
    } catch (e) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this brand?')) return;
    try { await base44.entities.Brands.delete(id); toast({ title: "Brand deleted" }); load(); }
    catch (e) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setForm(prev => ({ ...prev, [field]: file_url }));
    } catch { toast({ title: "Upload failed", variant: "destructive" }); }
  };

  if (editing !== null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-display text-[#E5E5E5] font-light">{editing === 'new' ? 'Add Brand' : 'Edit Brand'}</h1>
          <button onClick={() => setEditing(null)} className="text-[#8E8E93]"><X size={18} /></button>
        </div>
        <div className="space-y-4 max-w-2xl">
          {[
            { label: 'Brand Name', name: 'brandName' },
            { label: 'Slug', name: 'slug' },
            { label: 'Short Description', name: 'shortDescription', textarea: true },
            { label: 'Long Description', name: 'longDescription', textarea: true },
            { label: 'Brand Disclaimer', name: 'brandDisclaimer', textarea: true },
            { label: 'SEO Title', name: 'seoTitle' },
            { label: 'SEO Description', name: 'seoDescription', textarea: true }
          ].map(f => (
            <div key={f.name}>
              <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">{f.label}</label>
              {f.textarea ? (
                <textarea value={form[f.name] || ''} onChange={e => setForm({...form, [f.name]: e.target.value})} rows={3} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367] resize-none" />
              ) : (
                <input value={form[f.name] || ''} onChange={e => setForm({...form, [f.name]: e.target.value})} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367]" />
              )}
            </div>
          ))}
          <div className="flex gap-4">
            {['brandLogo', 'heroImage'].map(field => (
              <div key={field}>
                <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">{field === 'brandLogo' ? 'Logo' : 'Hero Image'}</label>
                <div className="flex items-center gap-3">
                  {form[field] && <img src={form[field]} alt="" className="w-16 h-16 object-cover border border-white/10" />}
                  <label className="cursor-pointer border border-white/10 px-3 py-2 text-xs text-[#8E8E93] hover:border-[#C5A367]">
                    <Upload size={12} className="inline mr-1" /> Upload
                    <input type="file" accept="image/*" onChange={e => handleImageUpload(e, field)} className="hidden" />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleSave} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-6 py-3"><Save size={14} /> Save Brand</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-display text-[#E5E5E5] font-light">Brands</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-4 py-2.5"><Plus size={14} /> Add Brand</button>
      </div>
      {loading ? (
        <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-[#111] animate-pulse" />)}</div>
      ) : brands.length === 0 ? (
        <div className="text-center py-16 border border-white/5"><p className="text-[#8E8E93] text-sm">No brands yet.</p></div>
      ) : (
        <div className="space-y-2">
          {brands.map(b => (
            <div key={b.id} className="flex items-center justify-between bg-[#111] border border-white/5 p-3">
              <div className="flex items-center gap-3">
                {b.brandLogo && <img src={b.brandLogo} alt="" className="w-8 h-8 object-contain" />}
                <div>
                  <p className="text-xs text-[#E5E5E5]">{b.brandName}</p>
                  <p className="text-[10px] text-[#8E8E93]">/{b.slug}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(b)} className="text-[#8E8E93] hover:text-[#C5A367]"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(b.id)} className="text-[#8E8E93] hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}