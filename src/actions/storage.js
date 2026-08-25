'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireUser } from '@/lib/serverAuth';
import sharp from 'sharp';
import {
  IMAGE_VARIANT_SPECS,
  MAX_DOCUMENT_BYTES,
  MAX_IMAGE_BYTES,
  MAX_IMAGE_PIXELS,
  isDeclaredMimeCompatible,
  normalizeMediaPurpose,
  validateImageMetadata,
} from '@/lib/mediaPolicy';

// Public-read bucket the Dashboard Agent's platform added — product gallery,
// brand logos, collection images, dealer listing photos, and payment proof
// all land here now instead of requiring a pasted external URL.
const BUCKET = 'store-images';
const DOCUMENT_TYPE = 'application/pdf';

function hasPdfSignature(buffer) {
  return buffer.length >= 5 && buffer.subarray(0, 5).toString('ascii') === '%PDF-';
}

async function uploadBuffer(path, buffer, contentType, cacheControl) {
  const { error } = await supabaseAdmin.storage.from(BUCKET).upload(path, buffer, {
    contentType,
    cacheControl,
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return supabaseAdmin.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

async function buildImageVariants(buffer) {
  const outputs = [];
  for (const spec of IMAGE_VARIANT_SPECS) {
    const output = await sharp(buffer, { failOn: 'error', limitInputPixels: MAX_IMAGE_PIXELS })
      .rotate()
      .toColourspace('srgb')
      .resize({
        width: spec.width,
        height: spec.height,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({
        quality: spec.quality,
        alphaQuality: 92,
        smartSubsample: true,
        effort: 4,
      })
      .toBuffer();
    outputs.push({ ...spec, buffer: output });
  }
  return outputs;
}

// Any authenticated user can upload (dealers listing watches, buyers
// uploading payment proof, not just admins) — this only gates "is this a
// real logged-in account", not "is this person allowed to edit this
// product/order". That check happens in whichever action actually attaches
// the resulting URL to a row (createProduct, confirmPaymentSent, etc.).
export async function uploadImage(formData) {
  const user = await requireUser();

  const file = formData.get('file');
  if (!file || typeof file === 'string') return { ok: false, error: 'No file provided.' };
  const purpose = normalizeMediaPurpose(formData.get('purpose'));
  const buffer = Buffer.from(await file.arrayBuffer());

  if (file.type === DOCUMENT_TYPE) {
    if (purpose !== 'payment-proof') return { ok: false, error: 'PDF files are only accepted for payment proof.' };
    if (file.size > MAX_DOCUMENT_BYTES) return { ok: false, error: 'PDF files must be under 10MB.' };
    if (!hasPdfSignature(buffer)) return { ok: false, error: 'The uploaded file is not a valid PDF.' };
    try {
      const path = `${user.id}/documents/${crypto.randomUUID()}.pdf`;
      const url = await uploadBuffer(path, buffer, DOCUMENT_TYPE, '3600');
      return { ok: true, url, media: { kind: 'document' } };
    } catch (error) {
      return { ok: false, error: error.message || 'The PDF could not be uploaded.' };
    }
  }

  if (file.size > MAX_IMAGE_BYTES) return { ok: false, error: 'Images must be under 20MB.' };
  if (!file.type.startsWith('image/')) return { ok: false, error: 'Please upload a JPG, PNG, WebP, GIF, or AVIF image.' };

  let metadata;
  try {
    metadata = await sharp(buffer, { failOn: 'error', limitInputPixels: MAX_IMAGE_PIXELS }).metadata();
  } catch {
    return { ok: false, error: 'The file is not a valid image or is too large to process safely.' };
  }

  const metadataError = validateImageMetadata(metadata, purpose);
  if (metadataError) return { ok: false, error: metadataError };
  if (!isDeclaredMimeCompatible(metadata.format, file.type)) {
    return { ok: false, error: 'The file contents do not match its declared image type.' };
  }

  const mediaId = crypto.randomUUID();
  const basePath = `${user.id}/media/${mediaId}`;
  const uploadedPaths = [];
  try {
    const variants = await buildImageVariants(buffer);
    const urls = {};
    for (const variant of variants) {
      const path = `${basePath}/${variant.name}.webp`;
      urls[variant.name] = await uploadBuffer(path, variant.buffer, 'image/webp', '31536000');
      uploadedPaths.push(path);
    }

    const normalizedMetadata = await sharp(variants.find((variant) => variant.name === 'master').buffer).metadata();
    return {
      ok: true,
      url: urls.display,
      media: {
        kind: 'image',
        id: mediaId,
        purpose,
        width: normalizedMetadata.width,
        height: normalizedMetadata.height,
        format: 'webp',
        variants: urls,
      },
    };
  } catch (error) {
    if (uploadedPaths.length > 0) {
      await supabaseAdmin.storage.from(BUCKET).remove(uploadedPaths).catch(() => {});
    }
    return { ok: false, error: error.message || 'The image could not be processed and uploaded.' };
  }
}
