import React, { useState, useEffect } from 'react';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { createGuide, updateGuide, deleteGuide } from '@/actions/catalog';
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import BilingualField from '@/components/admin/BilingualField';

const CATEGORIES = ['Buying Guide', 'Brand Guide', 'Investment Guide', 'Authentication Guide', 'Care Guide', 'Comparison'];

export default function AdminGuides() {
  const { t } = useTranslation('admin');
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const load = async () => {
    setLoading(true);
    try { setItems(asArray(await dataClient.entities.WatchGuides.list('-created_date', 50))); } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm({ slug: '', category: 'Buying Guide', language: 'de', published: false, title_de: '', title_en: '', excerpt_de: '', excerpt_en: '', content_de: '', content_en: '' }); setEditing('new'); };
  const openEdit = (g) => { setForm({ ...g }); setEditing(g.id); };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        title: form.title_de || form.title_en || form.title || '',
        excerpt: form.excerpt_de || form.excerpt_en || form.excerpt || '',
        content: form.content_de || form.content_en || form.content || '',
        slug: form.slug || (form.title_de || form.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
      };
      if (editing === 'new') { await createGuide(payload); toast({ title: t('guideCreated') }); }
      else { await updateGuide(editing, payload); toast({ title: t('updated') }); }
      setEditing(null); load();
    } catch (e) { toast({ title: t('error'), description: e.message, variant: "destructive" }); }
  };

  const handleDelete = async (id) => {
    if (!confirm(t('deleteConfirm'))) return;
    try { await deleteGuide(id); load(); } catch (e) { console.error(e); }
  };

  if (editing !== null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-display text-[#E5E5E5] font-light">{editing === 'new' ? t('addGuide') : t('editGuide')}</h1>
          <button onClick={() => setEditing(null)} className="text-[#8E8E93]"><X size={18} /></button>
        </div>
        <div className="space-y-4 max-w-2xl">
          <BilingualField label={t('fields.title')} name="title" form={form} setForm={setForm} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">{t('fields.category')}</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367]">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">{t('fields.slug')}</label>
              <input value={form.slug || ''} onChange={e => setForm({...form, slug: e.target.value})} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367]" />
            </div>
          </div>
          <BilingualField label={t('fields.excerpt')} name="excerpt" form={form} setForm={setForm} type="textarea" />
          <BilingualField label={t('fields.content')} name="content" form={form} setForm={setForm} type="textarea" />
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={!!form.published} onChange={e => setForm({...form, published: e.target.checked})} className="accent-[#C5A367]" />
            <span className="text-xs text-[#E5E5E5]">{t('published')}</span>
          </label>
          <button onClick={handleSave} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-6 py-3"><Save size={14} /> {t('saveGuide')}</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-display text-[#E5E5E5] font-light">{t('guides')}</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-4 py-2.5"><Plus size={14} /> {t('addGuide')}</button>
      </div>
      {loading ? <div className="h-16 bg-[#111] animate-pulse" /> : items.length === 0 ? (
        <div className="text-center py-16 border border-white/5"><p className="text-[#8E8E93] text-sm">{t('noGuides')}</p></div>
      ) : (
        <div className="space-y-2">
          {items.map(g => (
            <div key={g.id} className="flex items-center justify-between bg-[#111] border border-white/5 p-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#E5E5E5] truncate">{g.title_de || g.title}</p>
                <p className="text-[10px] text-[#8E8E93]">{g.category} · {g.published ? t('published') : t('draft')}</p>
              </div>
              <div className="flex gap-2 ml-3">
                <button onClick={() => openEdit(g)} className="text-[#8E8E93] hover:text-[#C5A367]"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(g.id)} className="text-[#8E8E93] hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}