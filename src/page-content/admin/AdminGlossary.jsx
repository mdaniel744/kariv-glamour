import React, { useState, useEffect, useCallback } from 'react';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { BookMarked, Plus, Trash2, Edit2, X, Check } from 'lucide-react';

const RULE_LABELS = {
  always_translate: 'Always Translate',
  never_translate: 'Never Translate',
  preserve_original: 'Preserve Original',
  custom_instruction: 'Custom Instruction'
};

export default function AdminGlossary() {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = asArray(await dataClient.entities.GlossaryTerm.list('-created_date', 200));
      setTerms(data);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this glossary term?')) return;
    try {
      await dataClient.entities.GlossaryTerm.delete(id);
      setTerms(prev => prev.filter(t => t.id !== id));
    } catch (e) { console.error(e); }
  };

  const handleToggleActive = async (term) => {
    try {
      await dataClient.entities.GlossaryTerm.update(term.id, { isActive: !term.isActive });
      setTerms(prev => prev.map(t => t.id === term.id ? { ...t, isActive: !t.isActive } : t));
    } catch (e) { console.error(e); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-semibold text-foreground flex items-center gap-2">
            <BookMarked size={24} /> Glossary
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Define brand terms that should remain consistent across translations</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="flex items-center gap-2 text-xs px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90">
          <Plus size={14} /> Add Term
        </button>
      </div>

      {showForm && (
        <GlossaryForm
          term={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); load(); }}
        />
      )}

      {loading ? (
        <div className="text-center py-20 text-xs text-muted-foreground">Loading...</div>
      ) : terms.length === 0 ? (
        <div className="text-center py-20 border border-border rounded-lg">
          <BookMarked className="mx-auto text-muted-foreground mb-3" size={32} />
          <p className="text-sm text-muted-foreground">No glossary terms yet</p>
          <p className="text-xs text-muted-foreground mt-1">Add brand names, product names, or technical terms to keep translations consistent</p>
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Original Term</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">English</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">German</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Rule</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Active</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {terms.map(term => (
                <tr key={term.id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-4 py-3 text-foreground font-medium">{term.originalTerm}</td>
                  <td className="px-4 py-3 text-muted-foreground">{term.englishTranslation || '-'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{term.germanTranslation || '-'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{RULE_LABELS[term.ruleType]}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => handleToggleActive(term)} className={`w-8 h-4 rounded-full transition-colors ${term.isActive ? 'bg-primary' : 'bg-muted'}`}>
                      <span className={`block w-3 h-3 bg-background rounded-full transition-transform ${term.isActive ? 'translate-x-4' : 'translate-x-1'}`} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setEditing(term); setShowForm(true); }} className="text-muted-foreground hover:text-foreground"><Edit2 size={13} /></button>
                      <button onClick={() => handleDelete(term.id)} className="text-muted-foreground hover:text-red-500"><Trash2 size={13} /></button>
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

function GlossaryForm({ term, onClose, onSaved }) {
  const [form, setForm] = useState({
    originalTerm: term?.originalTerm || '',
    englishTranslation: term?.englishTranslation || '',
    germanTranslation: term?.germanTranslation || '',
    ruleType: term?.ruleType || 'always_translate',
    customInstruction: term?.customInstruction || '',
    notes: term?.notes || '',
    isActive: term?.isActive !== false
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.originalTerm.trim()) return;
    setSaving(true);
    try {
      if (term) {
        await dataClient.entities.GlossaryTerm.update(term.id, form);
      } else {
        await dataClient.entities.GlossaryTerm.create(form);
      }
      onSaved();
    } catch (e) { console.error(e); alert('Failed to save'); } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background border border-border rounded-lg w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-display font-semibold text-foreground">{term ? 'Edit Term' : 'Add Glossary Term'}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">Original Term *</label>
            <input value={form.originalTerm} onChange={e => setForm(p => ({ ...p, originalTerm: e.target.value }))} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded" placeholder="e.g. Royal Oak" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">English Translation</label>
              <input value={form.englishTranslation} onChange={e => setForm(p => ({ ...p, englishTranslation: e.target.value }))} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded" placeholder="English preferred" />
            </div>
            <div>
              <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">German Translation</label>
              <input value={form.germanTranslation} onChange={e => setForm(p => ({ ...p, germanTranslation: e.target.value }))} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded" placeholder="German preferred" />
            </div>
          </div>
          <div>
            <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">Rule Type</label>
            <select value={form.ruleType} onChange={e => setForm(p => ({ ...p, ruleType: e.target.value }))} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded">
              {Object.entries(RULE_LABELS).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
            </select>
          </div>
          {form.ruleType === 'custom_instruction' && (
            <div>
              <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">Custom Instruction</label>
              <input value={form.customInstruction} onChange={e => setForm(p => ({ ...p, customInstruction: e.target.value }))} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded" placeholder="e.g. Translate to 'Königliche Eiche'" />
            </div>
          )}
          <div>
            <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">Notes / Context</label>
            <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={2} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded" placeholder="Optional context for translators" />
          </div>
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