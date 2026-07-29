import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { asArray } from '@/lib/base44Data';
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import BilingualField from '@/components/admin/BilingualField';

const CATEGORIES = ['General', 'Shipping', 'Payment', 'Returns', 'Authentication', 'Warranty', 'Brand-Specific'];

export default function AdminFAQ() {
  const { t } = useTranslation('admin');
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const load = async () => {
    setLoading(true);
    try { setItems(asArray(await base44.entities.FAQ.list('sortOrder', 50))); } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm({ category: 'General', language: 'de', sortOrder: 0, question_de: '', question_en: '', answer_de: '', answer_en: '' }); setEditing('new'); };
  const openEdit = (f) => { setForm({ ...f }); setEditing(f.id); };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        question: form.question_de || form.question_en || form.question || '',
        answer: form.answer_de || form.answer_en || form.answer || ''
      };
      if (editing === 'new') { await base44.entities.FAQ.create(payload); toast({ title: t('faqCreated') }); }
      else { await base44.entities.FAQ.update(editing, payload); toast({ title: t('updated') }); }
      setEditing(null); load();
    } catch (e) { toast({ title: t('error'), description: e.message, variant: "destructive" }); }
  };

  const handleDelete = async (id) => {
    if (!confirm(t('deleteConfirm'))) return;
    try { await base44.entities.FAQ.delete(id); load(); } catch (e) { console.error(e); }
  };

  if (editing !== null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-display text-[#E5E5E5] font-light">{editing === 'new' ? t('addFaq') : t('editFaq')}</h1>
          <button onClick={() => setEditing(null)} className="text-[#8E8E93]"><X size={18} /></button>
        </div>
        <div className="space-y-4 max-w-2xl">
          <BilingualField label={t('fields.question')} name="question" form={form} setForm={setForm} />
          <BilingualField label={t('fields.answer')} name="answer" form={form} setForm={setForm} type="textarea" />
          <div>
            <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">{t('fields.category')}</label>
            <select value={form.category || 'General'} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367]">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={handleSave} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-6 py-3"><Save size={14} /> {t('save')}</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-display text-[#E5E5E5] font-light">{t('faq')}</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-4 py-2.5"><Plus size={14} /> {t('addFaq')}</button>
      </div>
      {loading ? <div className="h-16 bg-[#111] animate-pulse" /> : items.length === 0 ? (
        <div className="text-center py-16 border border-white/5"><p className="text-[#8E8E93] text-sm">{t('noFaqs')}</p></div>
      ) : (
        <div className="space-y-2">
          {items.map(f => (
            <div key={f.id} className="flex items-center justify-between bg-[#111] border border-white/5 p-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#E5E5E5] truncate">{f.question_de || f.question}</p>
                <p className="text-[10px] text-[#8E8E93]">{f.category}</p>
              </div>
              <div className="flex gap-2 ml-3">
                <button onClick={() => openEdit(f)} className="text-[#8E8E93] hover:text-[#C5A367]"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(f.id)} className="text-[#8E8E93] hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}