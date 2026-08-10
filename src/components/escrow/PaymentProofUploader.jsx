import React, { useState } from 'react';
import { X, FileCheck2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// No Supabase Storage on this platform — matches the paste-an-external-URL
// convention used everywhere else (see PortalListingForm.jsx's image field).
export default function PaymentProofUploader({ paymentMethod, onUploaded, proofUrl }) {
  const { t } = useTranslation();
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(proofUrl || null);

  const handleAdd = () => {
    const url = urlInput.trim();
    if (!/^https?:\/\//.test(url)) {
      setError(t('pages.portal.invalidProofUrl', { defaultValue: 'Please paste a valid link (starting with https://).' }));
      return;
    }
    setError(null);
    setPreviewUrl(url);
    onUploaded(url);
    setUrlInput('');
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onUploaded(null);
  };

  const labelText = paymentMethod === 'crypto'
    ? t('pages.portal.uploadCryptoProof', { defaultValue: 'Paste your transaction link (block explorer URL)' })
    : t('pages.portal.uploadBankProof', { defaultValue: 'Paste a link to your bank transfer receipt' });

  return (
    <div className="mb-4">
      <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
        {labelText} <span className="text-destructive">*</span>
      </label>

      {!previewUrl ? (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            placeholder="https://..."
            className="flex-1 bg-card border border-border px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="flex-shrink-0 border border-border px-4 py-2.5 text-xs uppercase tracking-[0.1em] text-foreground hover:border-primary"
          >
            {t('pages.portal.add', { defaultValue: 'Add' })}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 border border-border p-3 bg-card">
          {previewUrl.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
            <img src={previewUrl} alt="Payment proof" className="w-12 h-12 object-cover rounded" />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded">
              <FileCheck2 size={20} className="text-primary" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-foreground truncate">
              {t('pages.portal.proofUploaded', { defaultValue: 'Proof of payment added' })}
            </p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
              <FileCheck2 size={10} /> {t('pages.portal.readyToConfirm', { defaultValue: 'Ready to confirm' })}
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="text-muted-foreground hover:text-destructive transition-colors p-1"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {error && <p className="text-[11px] text-destructive mt-2">{error}</p>}
    </div>
  );
}
