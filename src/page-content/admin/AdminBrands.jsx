import React, { useState, useEffect } from 'react';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { createBrand, updateBrand, deleteBrand } from '@/actions/catalog';
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import BilingualField from '@/components/admin/BilingualField';
import ImageUploader from '@/components/shared/ImageUploader';

export default function AdminBrands() {
  const { t } = useTranslation('admin');
  const { toast } = useToast();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const load = async () => {
    setLoading(true);
    try { setBrands(asArray(await dataClient.entities.Brands.list('-created_date', 50))); } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setForm({ slug: '', brandName_de: '', brandName_en: '', shortDescription_de: '', shortDescription_en: '', longDescription_de: '', longDescription_en: '', brandDisclaimer_de: '', brandDisclaimer_en: '', seoTitle_de: '', seoTitle_en: '', seoDescription_de: '', seoDescription_en: '', brandLogoLight: '', brandLogoDark: '', heroImage: '' });
    setEditing('new');
  };
  const openEdit = (b) => { setForm({ ...b }); setEditing(b.id); };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        brandName: form.brandName_de || form.brandName_en || form.brandName || '',
        shortDescription: form.shortDescription_de || form.shortDescription_en || form.shortDescription || '',
        longDescription: form.longDescription_de || form.longDescription_en || form.longDescription || '',
        brandDisclaimer: form.brandDisclaimer_de || form.brandDisclaimer_en || form.brandDisclaimer || '',
        seoTitle: form.seoTitle_de || form.seoTitle_en || form.seoTitle || '',
        seoDescription: form.seoDescription_de || form.seoDescription_en || form.seoDescription || '',
        slug: form.slug || (form.brandName_de || form.brandName || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
      };
      if (editing === 'new') { await createBrand(payload); toast({ title: t('brandCreated') }); }
      else { await updateBrand(editing, payload); toast({ title: t('brandUpdated') }); }
      setEditing(null); load();
    } catch (e) { toast({ title: t('error'), description: e.message, variant: "destructive" }); }
  };

  const handleDelete = async (id) => {
    if (!confirm(t('deleteConfirmBrand'))) return;
    try { await deleteBrand(id); toast({ title: t('brandDeleted') }); load(); }
    catch (e) { toast({ title: t('error'), description: e.message, variant: "destructive" }); }
  };

  if (editing !== null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-display text-[#E5E5E5] font-light">{editing === 'new' ? t('addBrand') : t('editBrand')}</h1>
          <button onClick={() => setEditing(null)} className="text-[#8E8E93]"><X size={18} /></button>
        </div>
        <div className="space-y-4 max-w-2xl">
          <BilingualField label={t('fields.brandName')} name="brandName" form={form} setForm={setForm} />
          <div>
            <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">{t('fields.slug')}</label>
            <input value={form.slug || ''} onChange={e => setForm({...form, slug: e.target.value})} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367]" />
          </div>
          <BilingualField label={t('fields.shortDescription')} name="shortDescription" form={form} setForm={setForm} type="textarea" />
          <BilingualField label={t('fields.longDescription')} name="longDescription" form={form} setForm={setForm} type="textarea" />
          <BilingualField label={t('fields.brandDisclaimer')} name="brandDisclaimer" form={form} setForm={setForm} type="textarea" />
          <BilingualField label={t('fields.seoTitle')} name="seoTitle" form={form} setForm={setForm} />
          <BilingualField label={t('fields.seoDescription')} name="seoDescription" form={form} setForm={setForm} type="textarea" />
          <div className="flex gap-4">
            {['brandLogoLight', 'brandLogoDark', 'heroImage'].map(field => (
              <div key={field}>
                <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">{field === 'brandLogoLight' ? t('fields.logo') + ' (Light)' : field === 'brandLogoDark' ? t('fields.logo') + ' (Dark)' : t('fields.heroImage')}</label>
                <ImageUploader
                  value={form[field]}
                  onChange={(url) => setForm(prev => ({ ...prev, [field]: url }))}
                  previewClassName="w-16 h-16 object-cover border border-white/10"
                  dropzoneClassName="bg-[#0A0A0B] border-white/10 hover:border-[#C5A367]/50"
                />
              </div>
            ))}
          </div>
          <button onClick={handleSave} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-6 py-3"><Save size={14} /> {t('saveBrand')}</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-display text-[#E5E5E5] font-light">{t('brands')}</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-4 py-2.5"><Plus size={14} /> {t('addBrand')}</button>
      </div>
      {loading ? (
        <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-[#111] animate-pulse" />)}</div>
      ) : brands.length === 0 ? (
        <div className="text-center py-16 border border-white/5"><p className="text-[#8E8E93] text-sm">{t('noBrands')}</p></div>
      ) : (
        <div className="space-y-2">
          {brands.map(b => (
            <div key={b.id} className="flex items-center justify-between bg-[#111] border border-white/5 p-3">
              <div className="flex items-center gap-3">
                {b.brandLogoLight && <img src={b.brandLogoLight} alt="" className="w-8 h-8 object-contain" />}
                <div>
                  <p className="text-xs text-[#E5E5E5]">{b.brandName_de || b.brandName}</p>
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