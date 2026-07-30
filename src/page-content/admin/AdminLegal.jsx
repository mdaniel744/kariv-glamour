import React, { useState, useEffect } from 'react';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import BilingualField from '@/components/admin/BilingualField';

export default function AdminLegal() {
  const { t } = useTranslation('admin');
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const load = async () => {
    setLoading(true);
    try { setItems(asArray(await dataClient.entities.LegalPages.list('title', 50))); } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm({ slug: '', language: 'de', title_de: '', title_en: '', content_de: '', content_en: '', seoTitle_de: '', seoTitle_en: '', seoDescription_de: '', seoDescription_en: '' }); setEditing('new'); };
  const openEdit = (p) => { setForm({ ...p }); setEditing(p.id); };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        title: form.title_de || form.title_en || form.title || '',
        content: form.content_de || form.content_en || form.content || '',
        seoTitle: form.seoTitle_de || form.seoTitle_en || form.seoTitle || '',
        seoDescription: form.seoDescription_de || form.seoDescription_en || form.seoDescription || '',
        slug: form.slug || (form.title_de || form.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
      };
      if (editing === 'new') { await dataClient.entities.LegalPages.create(payload); toast({ title: t('pageCreated') }); }
      else { await dataClient.entities.LegalPages.update(editing, payload); toast({ title: t('updated') }); }
      setEditing(null); load();
    } catch (e) { toast({ title: t('error'), description: e.message, variant: "destructive" }); }
  };

  const handleDelete = async (id) => {
    if (!confirm(t('deleteConfirm'))) return;
    try { await dataClient.entities.LegalPages.delete(id); load(); } catch (e) { console.error(e); }
  };

  if (editing !== null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-display text-[#E5E5E5] font-light">{editing === 'new' ? t('addPage') : t('editPage')}</h1>
          <button onClick={() => setEditing(null)} className="text-[#8E8E93]"><X size={18} /></button>
        </div>
        <div className="space-y-4 max-w-2xl">
          <BilingualField label={t('fields.title')} name="title" form={form} setForm={setForm} />
          <div>
            <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">{t('fields.slug')}</label>
            <input value={form.slug || ''} onChange={e => setForm({...form, slug: e.target.value})} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367]" />
          </div>
          <BilingualField label={t('fields.seoTitle')} name="seoTitle" form={form} setForm={setForm} />
          <BilingualField label={t('fields.seoDescription')} name="seoDescription" form={form} setForm={setForm} type="textarea" />
          <BilingualField label={t('fields.content')} name="content" form={form} setForm={setForm} type="textarea" />
          <button onClick={handleSave} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-6 py-3"><Save size={14} /> {t('savePage')}</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-display text-[#E5E5E5] font-light">{t('legal')}</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-4 py-2.5"><Plus size={14} /> {t('addPage')}</button>
      </div>
      {loading ? <div className="h-16 bg-[#111] animate-pulse" /> : items.length === 0 ? (
        <div className="text-center py-16 border border-white/5"><p className="text-[#8E8E93] text-sm">{t('noLegalPages')}</p></div>
      ) : (
        <div className="space-y-2">
          {items.map(p => (
            <div key={p.id} className="flex items-center justify-between bg-[#111] border border-white/5 p-3">
              <div><p className="text-xs text-[#E5E5E5]">{p.title_de || p.title}</p><p className="text-[10px] text-[#8E8E93]">/{p.slug}</p></div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(p)} className="text-[#8E8E93] hover:text-[#C5A367]"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(p.id)} className="text-[#8E8E93] hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}