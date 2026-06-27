import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CATEGORIES = ['Buying Guide', 'Brand Guide', 'Investment Guide', 'Authentication Guide', 'Care Guide', 'Comparison'];

export default function AdminGuides() {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const load = async () => {
    setLoading(true);
    try { setItems(await base44.entities.WatchGuides.list('-created_date', 50)); } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm({ title: '', slug: '', category: 'Buying Guide', excerpt: '', content: '', language: 'de', published: false }); setEditing('new'); };
  const openEdit = (g) => { setForm({ ...g }); setEditing(g.id); };

  const handleSave = async () => {
    try {
      const payload = { ...form, slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') };
      if (editing === 'new') { await base44.entities.WatchGuides.create(payload); toast({ title: "Guide created" }); }
      else { await base44.entities.WatchGuides.update(editing, payload); toast({ title: "Updated" }); }
      setEditing(null); load();
    } catch (e) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { await base44.entities.WatchGuides.delete(id); load(); } catch (e) { console.error(e); }
  };

  if (editing !== null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-display text-[#E5E5E5] font-light">{editing === 'new' ? 'Add Guide' : 'Edit Guide'}</h1>
          <button onClick={() => setEditing(null)} className="text-[#8E8E93]"><X size={18} /></button>
        </div>
        <div className="space-y-4 max-w-2xl">
          <div>
            <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">Title</label>
            <input value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367]">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">Language</label>
              <select value={form.language} onChange={e => setForm({...form, language: e.target.value})} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367]">
                <option value="de">Deutsch</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">Excerpt</label>
            <textarea value={form.excerpt || ''} onChange={e => setForm({...form, excerpt: e.target.value})} rows={2} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367] resize-none" />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">Content (Markdown)</label>
            <textarea value={form.content || ''} onChange={e => setForm({...form, content: e.target.value})} rows={15} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367] resize-none font-mono" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={!!form.published} onChange={e => setForm({...form, published: e.target.checked})} className="accent-[#C5A367]" />
            <span className="text-xs text-[#E5E5E5]">Published</span>
          </label>
          <button onClick={handleSave} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-6 py-3"><Save size={14} /> Save Guide</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-display text-[#E5E5E5] font-light">Watch Guides</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-4 py-2.5"><Plus size={14} /> Add Guide</button>
      </div>
      {loading ? <div className="h-16 bg-[#111] animate-pulse" /> : items.length === 0 ? (
        <div className="text-center py-16 border border-white/5"><p className="text-[#8E8E93] text-sm">No guides yet.</p></div>
      ) : (
        <div className="space-y-2">
          {items.map(g => (
            <div key={g.id} className="flex items-center justify-between bg-[#111] border border-white/5 p-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#E5E5E5] truncate">{g.title}</p>
                <p className="text-[10px] text-[#8E8E93]">{g.category} · {g.published ? 'Published' : 'Draft'}</p>
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