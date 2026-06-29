import React from 'react';

/**
 * Renders a translatable field with DE and EN inputs side-by-side.
 *
 * @param {string} label - Display label for the field
 * @param {string} name - Base field name (e.g. "productTitle")
 * @param {object} form - Form state object
 * @param {function} setForm - Form setter function
 * @param {string} type - 'text' (default) or 'textarea'
 */
export default function BilingualField({ label, name, form, setForm, type = 'text' }) {
  const deName = `${name}_de`;
  const enName = `${name}_en`;

  const inputClass = "w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367]";
  const textareaClass = inputClass + " resize-none";

  return (
    <div>
      <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1.5">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <span className="text-[9px] tracking-[0.15em] uppercase text-[#C5A367] block mb-1">DE</span>
          {type === 'textarea' ? (
            <textarea
              value={form[deName] || ''}
              onChange={e => setForm({ ...form, [deName]: e.target.value })}
              rows={3}
              className={textareaClass}
            />
          ) : (
            <input
              type="text"
              value={form[deName] || ''}
              onChange={e => setForm({ ...form, [deName]: e.target.value })}
              className={inputClass}
            />
          )}
        </div>
        <div>
          <span className="text-[9px] tracking-[0.15em] uppercase text-[#8E8E93] block mb-1">EN</span>
          {type === 'textarea' ? (
            <textarea
              value={form[enName] || ''}
              onChange={e => setForm({ ...form, [enName]: e.target.value })}
              rows={3}
              className={textareaClass}
            />
          ) : (
            <input
              type="text"
              value={form[enName] || ''}
              onChange={e => setForm({ ...form, [enName]: e.target.value })}
              className={inputClass}
            />
          )}
        </div>
      </div>
    </div>
  );
}