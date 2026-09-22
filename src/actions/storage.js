'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireUser } from '@/lib/serverAuth';
import { STORE_ID } from '@/lib/supabaseData';
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

// Public-read catalogue media only. Payment evidence must use the dedicated
// private action/bucket below and is never accepted by this generic uploader.
const BUCKET = 'store-images';
const PAYMENT_PROOF_BUCKET = 'kariv-payment-proofs';
const DOCUMENT_TYPE = 'application/pdf';
const PAYMENT_PROOF_TTL_SECONDS = 5 * 60;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SAFE_BUYER_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;

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

function paymentProofPrefix(orderId, buyerId) {
  return `${STORE_ID}/${orderId}/${buyerId}/`;
}

function isAwaitingBankProof(order) {
  const awaitingPayment = order.purchase_status === 'awaiting_payment' ||
    (!order.purchase_status && order.escrow_status === 'dealer_accepted');
  return awaitingPayment && order.escrow_status === 'dealer_accepted' && order.payment_method === 'bank_transfer';
}

async function loadOwnedOrderForProof(orderId, buyerId) {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('id, buyer_user_id, escrow_status, purchase_status, payment_method, payment_reference')
    .eq('id', orderId)
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', buyerId)
    .maybeSingle();
  if (error) return { error: error.message };
  if (!data) return { error: 'Order not found.' };
  if (!isAwaitingBankProof(data)) {
    return { error: 'Payment proof can only be uploaded for an order awaiting a bank transfer.' };
  }
  return { order: data };
}

async function uploadPrivatePaymentProof(path, buffer, contentType) {
  const { error } = await supabaseAdmin.storage.from(PAYMENT_PROOF_BUCKET).upload(path, buffer, {
    contentType,
    cacheControl: 'no-store',
    upsert: true,
  });
  if (error) throw new Error(error.message);

  const { data, error: signedUrlError } = await supabaseAdmin.storage
    .from(PAYMENT_PROOF_BUCKET)
    .createSignedUrl(path, PAYMENT_PROOF_TTL_SECONDS);
  if (signedUrlError || !data?.signedUrl) {
    await supabaseAdmin.storage.from(PAYMENT_PROOF_BUCKET).remove([path]).catch(() => {});
    throw new Error(signedUrlError?.message || 'A private preview could not be created.');
  }
  return data.signedUrl;
}

// Payment evidence is deliberately separate from uploadImage(). It is stored
// in a private bucket and the returned key is bound to the current tenant,
// order and authenticated buyer. The short-lived URL is preview-only; callers
// must persist the opaque key, never the URL.
export async function uploadPaymentProof(orderId, formData) {
  const user = await requireUser();
  if (!supabaseAdmin) return { ok: false, error: 'Payment proof uploads are not configured.' };
  if (!UUID_PATTERN.test(orderId || '') || !SAFE_BUYER_ID_PATTERN.test(user.id || '')) {
    return { ok: false, error: 'Invalid order reference.' };
  }

  const ownedOrder = await loadOwnedOrderForProof(orderId, user.id);
  if (!ownedOrder.order) return { ok: false, error: ownedOrder.error };
  if (ownedOrder.order.payment_reference) {
    return { ok: false, error: 'Payment proof was already submitted. Ask Kariv support to reopen proof upload if a replacement is required.' };
  }

  const { data: paymentInstructions, error: instructionsError } = await supabaseAdmin
    .from('order_payment_instructions')
    .select('order_id')
    .eq('order_id', orderId)
    .eq('store_id', STORE_ID)
    .maybeSingle();
  if (instructionsError || !paymentInstructions) {
    return { ok: false, error: 'Verified payment details are unavailable. Do not send payment; contact Kariv support.' };
  }

  const file = formData.get('file');
  if (!file || typeof file === 'string') return { ok: false, error: 'No file provided.' };
  if (file.size > MAX_DOCUMENT_BYTES) return { ok: false, error: 'Payment proof files must be under 10MB.' };

  const input = Buffer.from(await file.arrayBuffer());
  const prefix = paymentProofPrefix(orderId, user.id);
  let path;
  let output;
  let contentType;
  let kind;

  if (file.type === DOCUMENT_TYPE) {
    if (!hasPdfSignature(input)) return { ok: false, error: 'The uploaded file is not a valid PDF.' };
    path = `${prefix}pending.pdf`;
    output = input;
    contentType = DOCUMENT_TYPE;
    kind = 'document';
  } else {
    if (!file.type.startsWith('image/')) {
      return { ok: false, error: 'Please upload a JPG, PNG, WebP, GIF, or AVIF image, or a PDF.' };
    }
    let metadata;
    try {
      metadata = await sharp(input, { failOn: 'error', limitInputPixels: MAX_IMAGE_PIXELS }).metadata();
    } catch {
      return { ok: false, error: 'The file is not a valid image or is too large to process safely.' };
    }
    const metadataError = validateImageMetadata(metadata, 'payment-proof');
    if (metadataError) return { ok: false, error: metadataError };
    if (!isDeclaredMimeCompatible(metadata.format, file.type)) {
      return { ok: false, error: 'The file contents do not match its declared image type.' };
    }
    try {
      output = await sharp(input, { failOn: 'error', limitInputPixels: MAX_IMAGE_PIXELS })
        .rotate()
        .toColourspace('srgb')
        .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 90, alphaQuality: 92, effort: 4 })
        .toBuffer();
    } catch {
      return { ok: false, error: 'The payment proof image could not be processed safely.' };
    }
    path = `${prefix}pending.webp`;
    contentType = 'image/webp';
    kind = 'image';
  }

  try {
    // Exactly one unsubmitted staging object is allowed per order. Repeated
    // upload attempts replace this bounded slot instead of filling Storage.
    await supabaseAdmin.storage.from(PAYMENT_PROOF_BUCKET).remove([
      `${prefix}pending.pdf`,
      `${prefix}pending.webp`,
    ]).catch(() => {});
    const previewUrl = await uploadPrivatePaymentProof(path, output, contentType);
    return { ok: true, key: path, previewUrl, media: { kind } };
  } catch (error) {
    return { ok: false, error: error.message || 'The payment proof could not be uploaded.' };
  }
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
  if (purpose === 'payment-proof') {
    return { ok: false, error: 'Payment proof must be uploaded from its order page.' };
  }
  const buffer = Buffer.from(await file.arrayBuffer());

  if (file.type === DOCUMENT_TYPE) {
    return { ok: false, error: 'PDF files are only accepted from an order payment-proof form.' };
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
