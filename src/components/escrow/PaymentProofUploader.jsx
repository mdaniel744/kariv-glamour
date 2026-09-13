import React, { useState, useRef } from 'react';
import { Upload, X, FileCheck2, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { uploadImage } from '@/actions/storage';

export default function PaymentProofUploader({ paymentMethod, onUploaded, proofUrl }) {
  const { t } = useTranslation();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(proofUrl || null);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      setError(t('pages.portal.invalidFileType', { defaultValue: 'Please upload an image or PDF file.' }));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError(t('pages.portal.fileTooLarge', { defaultValue: 'File must be under 10MB.' }));
      return;
    }

    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('purpose', 'payment-proof');
      const res = await uploadImage(formData);
      if (res.ok) {
        setPreviewUrl(res.url);
        onUploaded(res.url);
      } else {
        setError(res.error);
      }
    } catch {
      setError(t('admin:uploadFailed'));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onUploaded(null);
  };

  const labelText = paymentMethod === 'crypto'
    ? t('pages.portal.uploadCryptoProof', { defaultValue: 'Upload Crypto Transfer Screenshot' })
    : t('pages.portal.uploadBankProof', { defaultValue: 'Upload Bank Transfer Receipt' });

  return (
    <div className="mb-4">
      <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
        {labelText} <span className="text-destructive">*</span>
      </label>

      {!previewUrl ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files?.[0]); }}
          disabled={uploading}
          className={`w-full border-2 border-dashed transition-colors py-8 flex flex-col items-center gap-2 text-muted-foreground disabled:opacity-50 ${dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
        >
          {uploading ? (
            <Loader2 size={20} className="animate-spin text-primary" />
          ) : (
            <Upload size={20} />
          )}
          <span className="text-xs">
            {uploading
              ? t('pages.portal.uploading', { defaultValue: 'Uploading...' })
              : t('pages.portal.clickToUpload', { defaultValue: 'Click or drag to upload proof of payment' })}
          </span>
          <span className="text-[10px] text-muted-foreground/60">
            {t('pages.portal.acceptedFormats', { defaultValue: 'PNG, JPG, or PDF — max 10MB' })}
          </span>
        </button>
      ) : (
        <div className="flex items-center gap-3 border border-border p-3 bg-card">
          {previewUrl.match(/\.(jpg|jpeg|png|webp|gif|avif)$/i) ? (
            <img src={previewUrl} alt={t('pages.portal.proofAlt')} className="w-12 h-12 object-cover rounded" />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded">
              <FileCheck2 size={20} className="text-primary" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-foreground truncate">
              {t('pages.portal.proofUploaded', { defaultValue: 'Proof of payment uploaded' })}
            </p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
              <FileCheck2 size={10} /> {t('pages.portal.readyToConfirm', { defaultValue: 'Ready to confirm' })}
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            aria-label={t('pages.portal.removeProof')}
            className="text-muted-foreground hover:text-destructive transition-colors p-1"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="hidden"
      />

      {error && <p className="text-[11px] text-destructive mt-2">{error}</p>}
    </div>
  );
}
