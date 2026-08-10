'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireUser } from '@/lib/serverAuth';

// Public-read bucket the Dashboard Agent's platform added — product gallery,
// brand logos, collection images, dealer listing photos, and payment proof
// all land here now instead of requiring a pasted external URL.
const BUCKET = 'store-images';
const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'application/pdf'];
const EXT_BY_TYPE = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp',
  'image/gif': 'gif', 'image/avif': 'avif', 'application/pdf': 'pdf',
};

// Any authenticated user can upload (dealers listing watches, buyers
// uploading payment proof, not just admins) — this only gates "is this a
// real logged-in account", not "is this person allowed to edit this
// product/order". That check happens in whichever action actually attaches
// the resulting URL to a row (createProduct, confirmPaymentSent, etc.).
export async function uploadImage(formData) {
  const user = await requireUser();

  const file = formData.get('file');
  if (!file || typeof file === 'string') return { ok: false, error: 'No file provided.' };
  if (file.size > MAX_SIZE) return { ok: false, error: 'File must be under 10MB.' };
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { ok: false, error: 'Please upload a JPG, PNG, WEBP, GIF, AVIF, or PDF file.' };
  }

  const ext = EXT_BY_TYPE[file.type] || 'bin';
  const path = `${user.id}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabaseAdmin.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) return { ok: false, error: error.message };

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}
