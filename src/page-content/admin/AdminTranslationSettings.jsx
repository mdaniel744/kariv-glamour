import React, { useState, useEffect, useCallback } from 'react';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { Settings, Save, Check, Lock } from 'lucide-react';

export default function AdminTranslationSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = asArray(await dataClient.entities.TranslationSettings.list('-created_date', 1));
      if (data && data.length > 0) {
        setSettings(data[0]);
      } else {
        setSettings({
          defaultProvider: 'llm_builtin',
          autoTranslateNewContent: false,
          publishMode: 'manual_approval',
          browserDetectionMode: 'suggestion_popup',
          protectManualEdits: true,
          defaultTone: 'formal',
          monthlyCharacterQuota: 500000,
          charactersUsedThisMonth: 0
        });
      }
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Strip any API key fields that might exist on old records
      const safeSettings = { ...settings };
      delete safeSettings.deeplApiKey;
      delete safeSettings.openaiApiKey;
      delete safeSettings.googleApiKey;
      delete safeSettings.microsoftApiKey;
      delete safeSettings.customApiUrl;
      delete safeSettings.customApiKey;

      if (settings.id) {
        await dataClient.entities.TranslationSettings.update(settings.id, safeSettings);
      } else {
        const created = await dataClient.entities.TranslationSettings.create(safeSettings);
        setSettings(created);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) { console.error(e); alert('Failed to save settings'); } finally { setSaving(false); }
  };

  const update = (field, value) => setSettings(prev => ({ ...prev, [field]: value }));

  if (loading) return <div className="text-center py-20 text-xs text-muted-foreground">Loading...</div>;

  const quotaUsed = settings.charactersUsedThisMonth || 0;
  const quotaTotal = settings.monthlyCharacterQuota || 500000;
  const quotaPct = Math.min(100, (quotaUsed / quotaTotal) * 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-semibold text-foreground flex items-center gap-2">
            <Settings size={24} /> Translation Settings
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Configure translation provider, publishing behavior, and language detection</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 text-xs px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50">
          {saved ? <Check size={14} /> : <Save size={14} />} {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Provider Settings */}
        <div className="border border-border rounded-lg p-6">
          <h2 className="text-sm font-display font-semibold text-foreground mb-4">Translation Provider</h2>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">Default Provider</label>
              <select value={settings.defaultProvider} onChange={e => update('defaultProvider', e.target.value)} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded">
                <option value="llm_builtin">Built-in LLM (Recommended)</option>
                <option value="deepl">DeepL API</option>
                <option value="openai">OpenAI API</option>
                <option value="google">Google Translate API</option>
                <option value="microsoft">Microsoft Translator API</option>
                <option value="custom">Custom API</option>
              </select>
              <p className="text-[10px] text-muted-foreground mt-1">The built-in LLM provider works out of the box with no API key needed.</p>
            </div>
            <div>
              <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">Default Tone</label>
              <select value={settings.defaultTone} onChange={e => update('defaultTone', e.target.value)} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded">
                <option value="formal">Formal (Sie-form in German)</option>
                <option value="informal">Informal (Du-form in German)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Publishing Settings */}
        <div className="border border-border rounded-lg p-6">
          <h2 className="text-sm font-display font-semibold text-foreground mb-4">Publishing & Automation</h2>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">Auto-translate New Content</label>
              <button onClick={() => update('autoTranslateNewContent', !settings.autoTranslateNewContent)} className={`w-10 h-5 rounded-full transition-colors ${settings.autoTranslateNewContent ? 'bg-primary' : 'bg-muted'}`}>
                <span className={`block w-4 h-4 bg-background rounded-full transition-transform ${settings.autoTranslateNewContent ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
              <p className="text-[10px] text-muted-foreground mt-1">When enabled, admins must manually queue translations for new content via the translation dashboard</p>
            </div>
            <div>
              <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">Publish Mode</label>
              <select value={settings.publishMode} onChange={e => update('publishMode', e.target.value)} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded">
                <option value="publish_immediately">Publish Immediately</option>
                <option value="draft">Keep as Draft</option>
                <option value="needs_review">Mark as Needs Review</option>
                <option value="manual_approval">Require Manual Approval</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">Protect Manual Edits</label>
              <button onClick={() => update('protectManualEdits', !settings.protectManualEdits)} className={`w-10 h-5 rounded-full transition-colors ${settings.protectManualEdits ? 'bg-primary' : 'bg-muted'}`}>
                <span className={`block w-4 h-4 bg-background rounded-full transition-transform ${settings.protectManualEdits ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
              <p className="text-[10px] text-muted-foreground mt-1">Don't overwrite manually edited translations automatically</p>
            </div>
          </div>
        </div>

        {/* Browser Detection */}
        <div className="border border-border rounded-lg p-6">
          <h2 className="text-sm font-display font-semibold text-foreground mb-4">Browser Language Detection</h2>
          <div>
            <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">Detection Mode</label>
            <select value={settings.browserDetectionMode} onChange={e => update('browserDetectionMode', e.target.value)} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded">
              <option value="disabled">Disabled</option>
              <option value="suggestion_popup">Show Suggestion Popup</option>
              <option value="auto_redirect">Auto-redirect First-time Visitors</option>
            </select>
            <p className="text-[10px] text-muted-foreground mt-1">Detect visitor browser language and suggest/redirect to the matching locale</p>
          </div>
        </div>

        {/* Quota Tracking */}
        <div className="border border-border rounded-lg p-6">
          <h2 className="text-sm font-display font-semibold text-foreground mb-4">Usage & Quota</h2>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Characters used this month</span>
                <span className="text-foreground font-medium">{quotaUsed.toLocaleString()} / {quotaTotal.toLocaleString()}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${quotaPct}%` }} />
              </div>
            </div>
            <div>
              <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">Monthly Character Quota</label>
              <input type="number" value={settings.monthlyCharacterQuota} onChange={e => update('monthlyCharacterQuota', Number(e.target.value))} className="w-full bg-background border border-border text-sm text-foreground px-3 py-2 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* API Keys — now managed via environment variables */}
      <div className="border border-border rounded-lg p-6 mt-6">
        <div className="flex items-center gap-2 mb-2">
          <Lock size={16} className="text-primary" />
          <h2 className="text-sm font-display font-semibold text-foreground">External Provider API Keys</h2>
        </div>
        <p className="text-[10px] text-muted-foreground mb-4">
          API keys are no longer stored in the database. They are managed securely as environment variables in the
          Base44 Dashboard under <strong>Settings → Environment Variables</strong>. The built-in LLM provider requires no key.
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-center justify-between px-4 py-3 bg-muted/30 rounded text-xs">
            <span className="text-muted-foreground">DeepL API Key</span>
            <span className="text-foreground font-medium">DEEPL_API_KEY</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-muted/30 rounded text-xs">
            <span className="text-muted-foreground">OpenAI API Key</span>
            <span className="text-foreground font-medium">OPENAI_API_KEY</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-muted/30 rounded text-xs">
            <span className="text-muted-foreground">Google Translate API Key</span>
            <span className="text-foreground font-medium">GOOGLE_TRANSLATE_API_KEY</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-muted/30 rounded text-xs">
            <span className="text-muted-foreground">Microsoft Translator API Key</span>
            <span className="text-foreground font-medium">MICROSOFT_TRANSLATOR_API_KEY</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 text-xs px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50">
          {saved ? <Check size={14} /> : <Save size={14} />} {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}