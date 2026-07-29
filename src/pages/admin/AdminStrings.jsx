import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { asArray } from '@/lib/base44Data';
import { Type, Plus, Trash2, Edit2, X, Check, Search, Languages } from 'lucide-react';

const STATUS_LABELS = {
  not_translated: 'Not Translated',
  pending: 'Pending',
  translated: 'Translated',
  needs_review: 'Needs Review',
  approved: 'Approved'
};

export default function AdminStrings() {
  const [strings, setStrings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = asArray(await base44.entities.WebsiteString.list('-created_date', 200));
      setStrings(data);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this string?')) return;
    try {
      await base44.entities.WebsiteString.delete(id);
      setStrings(prev => prev.filter(s => s.id !== id));
    } catch (e) { console.error(e); }
  };

  const filtered = strings.filter(s => {
    if (!search) return true;
    const q = search.toLowerCase();
    return s.key?.toLowerCase().includes(q) || s.sourceText?.toLowerCase().includes(q) || s.englishText?.toLowerCase().includes(q) || s.germanText?.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-semibold text-foreground flex items-center gap-2">
            <Type size={24} /> String Translation
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Manage reusable website text: buttons, labels, form text, messages</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="flex items-center gap-2 text-xs px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90">
          <Plus size={14} /> Add String
        </button>
      </div>

      {showForm && (
        <StringForm string={editing} onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); load(); }} />
      )}

      <div className="relative mb-6">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search strings..." className="w-full bg-background border border-border text-sm text-foreground pl-9 pr-3 py-2 rounded" />
      </div>

      {loading ? (
        <div className="text-center py-20 text-xs text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 border border-border rounded-lg">
          <Type className="mx-auto text-muted-foreground mb-3" size={32} />
          <p className="text-sm text-muted-foreground">{search ? 'No strings match your search' : 'No strings yet'}</p>
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Key</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Source</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">English</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">German</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-4 py-3 text-foreground font-medium">{s.key}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[160px] truncate">{s.sourceText}</td>
                  <td className="px-4 py-3 text-foreground max-w-[160px] truncate">{s.englishText || '-'}</td>
                  <td className="px-4 py-3 text-foreground max-w-[160px] truncate">{s.germanText || '-'}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{STATUS_LABELS[s.status] || s.status}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setEditing(s); setShowForm(true); }} className="text-muted-foreground hover:text-foreground"><Edit2 size={13} /></button>
                      <button onClick={() => handleDelete(s.id)} className="text-muted-foreground hover:text-red-500"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StringForm({ string, onClose, onSaved }) {
  const [form, setForm] = useState({
    key: string?.key || '',
    context: string?.context || '',
    sourceText: string?.sourceText || '',
    sourceLanguage: string?.sourceLanguage || 'en',
    englishText: string?.englishText || '',
    germanText: string?.germanText || '',
    status: string?.status || 'not_translated'
  });
  const [saving, setSaving] = useState(false);
  const [autoTranslating, setAutoTranslating] = useState(false);

  const handleSave = async () => {
    if (!form.key.trim() || !form.sourceText.trim()) return;
    setSaving(true);
    try {
      if (string) {
        await base44.entities.WebsiteString.update(string.id, form);
      } else {
        await base44.entities.WebsiteString.create(form);
      }
      onSaved();
    } catch (e) { console.error(e); alert('Failed to save'); } finally { setSaving(false); }
  };

  const handleAutoTranslate = async () => {
    if (!form.sourceText.trim()) return;
    setAutoTranslating(true);
    try {
      const targetLang = form.sourceLanguage === 'en' ? 'de' : 'en';
      const targetField = targetLang === 'de' ? 'germanText' : 'englishText';
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `Translate the following text to ${targetLang === 'de' ? 'German' : 'English'}. Preserve any HTML tags. Return only the translation.\n\nText: ${form.sourceText}`,
        response_json_schema: { type: 'object', properties: { translation: { type: 'string' } } }
      });
      setForm(p => ({ ...p, [targetField]: res.translation, status: 'translated' }));
    } catch (e) { console.error(e); alert('Translation failed'); } finally { setAutoTranslating(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background border border-border rounded-lg w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-display font-semibold text-foreground">{string ? 'Edit String' : 'Add String'}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">Key *</label>
            <input value={form.key} onChange={e => setForm(p => ({ ...p, key: e.target.value }))} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded" placeholder="e.g. buttons.addToCart" />
          </div>
          <div>
            <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">Context</label>
            <input value={form.context} onChange={e => setForm(p => ({ ...p, context: e.target.value }))} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded" placeholder="e.g. Product detail page" />
          </div>
          <div>
            <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">Source Text *</label>
            <textarea value={form.sourceText} onChange={e => setForm(p => ({ ...p, sourceText: e.target.value }))} rows={2} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded" placeholder="Original text" />
          </div>
          <div>
            <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">Source Language</label>
            <select value={form.sourceLanguage} onChange={e => setForm(p => ({ ...p, sourceLanguage: e.target.value }))} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded">
              <option value="en">English</option>
              <option value="de">German</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">English Text</label>
              <textarea value={form.englishText} onChange={e => setForm(p => ({ ...p, englishText: e.target.value, status: 'translated' }))} rows={2} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded" />
            </div>
            <div>
              <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">German Text</label>
              <textarea value={form.germanText} onChange={e => setForm(p => ({ ...p, germanText: e.target.value, status: 'translated' }))} rows={2} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded" />
            </div>
          </div>
          <div>
            <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">Status</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded">
              {Object.entries(STATUS_LABELS).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
            </select>
          </div>
          <button onClick={handleAutoTranslate} disabled={autoTranslating || !form.sourceText} className="text-xs flex items-center gap-1.5 text-primary hover:opacity-70 disabled:opacity-50">
            <Languages size={13} /> {autoTranslating ? 'Translating...' : 'Auto-translate missing language'}
          </button>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="text-xs px-4 py-2 border border-border rounded text-foreground hover:bg-muted">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="text-xs px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50 flex items-center gap-1">
            <Check size={13} /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}