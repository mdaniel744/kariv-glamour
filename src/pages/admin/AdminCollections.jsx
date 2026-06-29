import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useTranslation } from 'react-i18next';
import { BRAND_DATA } from '@/lib/constants';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import BilingualField from '@/components/admin/BilingualField';

export default function AdminCollections() {
  const { t } = useTranslation('admin');
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const load = async () => {
    setLoading(true);
    try { setItems(await base44.entities.Collections.list('brand', 50)); } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm({ brand: '', slug: '', collectionName_de: '', collectionName_en: '', description_de: '', description_en: '' }); setEditing('new'); };
  const openEdit = (c) => { setForm({ ...c }); setEditing(c.id); };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        collectionName: form.collectionName_de || form.collectionName_en || form.collectionName || '',
        description: form.description_de || form.description_en || form.description || '',
        slug: form.slug || (form.collectionName_de || form.collectionName || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
      };
      if (editing === 'new') { await base44.entities.Collections.create(payload); toast({ title: t('collectionCreated') }); }
      else { await base44.entities.Collections.update(editing, payload); toast({ title: t('updated') }); }
      setEditing(null); load();
    } catch (e) { toast({ title: t('error'), description: e.message, variant: "destructive" }); }
  };

  const handleDelete = async (id) => {
    if (!confirm(t('deleteConfirm'))) return;
    try { await base44.entities.Collections.delete(id); load(); } catch (e) { toast({ title: t('error'), variant: "destructive" }); }
  };

  if (editing !== null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-display text-[#E5E5E5] font-light">{editing === 'new' ? t('addCollection') : t('editCollection')}</h1>
          <button onClick={() => setEditing(null)} className="text-[#8E8E93]"><X size={18} /></button>
        </div>
        <div className="space-y-4 max-w-2xl">
          <div>
            <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">{t('fields.brand')}</label>
            <select value={form.brand || ''} onChange={e => setForm({...form, brand: e.target.value})} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367]">
              <option value="">{t('fields.selectBrand')}</option>
              {BRAND_DATA.map(b => <option key={b.slug} value={b.name}>{b.name}</option>)}
            </select>
          </div>
          <BilingualField label={t('fields.collectionName')} name="collectionName" form={form} setForm={setForm} />
          <div>
            <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">{t('fields.slug')}</label>
            <input value={form.slug || ''} onChange={e => setForm({...form, slug: e.target.value})} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367]" />
          </div>
          <BilingualField label={t('fields.description')} name="description" form={form} setForm={setForm} type="textarea" />
          <button onClick={handleSave} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-6 py-3"><Save size={14} /> {t('save')}</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-display text-[#E5E5E5] font-light">{t('collections')}</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-4 py-2.5"><Plus size={14} /> {t('addCollection')}</button>
      </div>
      {loading ? <div className="h-16 bg-[#111] animate-pulse" /> : items.length === 0 ? (
        <div className="text-center py-16 border border-white/5"><p className="text-[#8E8E93] text-sm">{t('noCollections')}</p></div>
      ) : (
        <div className="space-y-2">
          {items.map(c => (
            <div key={c.id} className="flex items-center justify-between bg-[#111] border border-white/5 p-3">
              <div>
                <p className="text-xs text-[#E5E5E5]">{c.collectionName_de || c.collectionName}</p>
                <p className="text-[10px] text-[#8E8E93]">{c.brand}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(c)} className="text-[#8E8E93] hover:text-[#C5A367]"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(c.id)} className="text-[#8E8E93] hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}