'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadImage } from '@/actions/storage';
import MediaImage from '@/components/shared/MediaImage';
import { getMediaVariant } from '@/lib/media';

// Drop-in replacement for the old `<input type="url">` + "paste a link"
// pattern — uploads straight to the platform's store-images bucket instead.
// Same `value`/`onChange(url)` contract every consumer already used, so
// swapping this in doesn't require touching any surrounding form state.
export default function ImageUploader({
  value,
  onChange,
  accept = 'image/*',
  label = 'Click or drag an image here',
  previewClassName = 'w-20 h-20 object-cover border border-border',
  dropzoneClassName = '',
  purpose = 'catalog',
  helpText = null,
  multiple = false,
  maxFiles = null,
  onUploadingChange,
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = async (files) => {
    const selected = Array.from(files || []);
    if (!selected.length) return;
    if (maxFiles != null && selected.length > maxFiles) {
      setError(`You can add at most ${maxFiles} more images.`);
      return;
    }
    if (selected.some((file) => !file.type.startsWith('image/'))) {
      setError('Please select only JPG, PNG, WebP, GIF, or AVIF images.');
      return;
    }
    if (selected.some((file) => file.size > 20 * 1024 * 1024)) {
      setError('Each image must be under 20MB. Large phone photos are resized automatically.');
      return;
    }
    setError(null);
    setUploading(true);
    onUploadingChange?.(true);
    try {
      for (const file of multiple ? selected : selected.slice(0, 1)) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('purpose', purpose);
        const res = await uploadImage(formData);
        if (res.ok) onChange(res.url);
        else { setError(res.error); break; }
      }
    } catch {
      setError('Upload failed.');
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  if (value) {
    return (
      <div className="relative inline-block">
        <MediaImage src={getMediaVariant(value, 'thumb')} alt="Uploaded preview" width={320} height={320} sizes="160px" quality={76} className={previewClassName} />
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute -top-2 -right-2 w-5 h-5 bg-background border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
        >
          <X size={12} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        disabled={uploading}
        className={`flex flex-col items-center justify-center gap-1.5 border-2 border-dashed px-4 py-6 text-center transition-colors disabled:opacity-50 ${dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'} ${dropzoneClassName}`}
      >
        {uploading ? <Loader2 size={18} className="animate-spin text-primary" /> : <Upload size={18} className="text-muted-foreground" />}
        <span className="text-[11px] text-muted-foreground">{uploading ? 'Uploading...' : label}</span>
      </button>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      <p className="mt-1.5 max-w-sm text-[10px] leading-relaxed text-muted-foreground/75">
        {helpText || (purpose === 'product'
          ? 'Use a sharp, well-lit photo at least 1200px wide. JPG, PNG, WebP or AVIF; up to 20MB. Large phone photos are optimized automatically.'
          : 'JPG, PNG, WebP or AVIF; up to 20MB. Images are resized and optimized automatically.')}
      </p>
      {error && <p className="text-[10px] text-destructive mt-1">{error}</p>}
    </div>
  );
}
