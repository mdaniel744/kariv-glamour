import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function AdminLegal() {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const load = async () => {
    setLoading(true);
    try { setItems(await base44.entities.LegalPages.list('title', 50)); } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm({ title: '', slug: '', content: '', language: 'de', seoTitle: '', seoDescription: '' }); setEditing('new'); };
  const openEdit = (p) => { setForm({ ...p }); setEditing(p.id); };

  const handleSave = async () => {
    try {
      const payload = { ...form, slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') };
      if (editing === 'new') { await base44.entities.LegalPages.create(payload); toast({ title: "Page created" }); }
      else { await base44.entities.LegalPages.update(editing, payload); toast({ title: "Updated" }); }
      setEditing(null); load();
    } catch (e) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { await base44.entities.LegalPages.delete(id); load(); } catch (e) { console.error(e); }
  };

  if (editing !== null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-display text-[#E5E5E5] font-light">{editing === 'new' ? 'Add Legal Page' : 'Edit Page'}</h1>
          <button onClick={() => setEditing(null)} className="text-[#8E8E93]"><X size={18} /></button>
        </div>
        <div className="space-y-4 max-w-2xl">
          {['title', 'slug', 'seoTitle', 'seoDescription'].map(f => (
            <div key={f}>
              <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">{f}</label>
              <input value={form[f] || ''} onChange={e => setForm({...form, [f]: e.target.value})} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367]" />
            </div>
          ))}
          <div>
            <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">Content (Markdown)</label>
            <textarea value={form.content || ''} onChange={e => setForm({...form, content: e.target.value})} rows={15} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367] resize-none font-mono" />
          </div>
          <button onClick={handleSave} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-6 py-3"><Save size={14} /> Save Page</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-display text-[#E5E5E5] font-light">Legal Pages</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-4 py-2.5"><Plus size={14} /> Add Page</button>
      </div>
      {loading ? <div className="h-16 bg-[#111] animate-pulse" /> : items.length === 0 ? (
        <div className="text-center py-16 border border-white/5"><p className="text-[#8E8E93] text-sm">No legal pages.</p></div>
      ) : (
        <div className="space-y-2">
          {items.map(p => (
            <div key={p.id} className="flex items-center justify-between bg-[#111] border border-white/5 p-3">
              <div><p className="text-xs text-[#E5E5E5]">{p.title}</p><p className="text-[10px] text-[#8E8E93]">/{p.slug}</p></div>
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