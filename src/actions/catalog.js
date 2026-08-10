'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/serverAuth';
import { STORE_ID } from '@/lib/supabaseData';

async function upsertTranslations(entityType, entityId, fieldValues) {
  const rows = [];
  for (const [fieldName, locales] of Object.entries(fieldValues)) {
    for (const [locale, value] of Object.entries(locales)) {
      if (value) {
        rows.push({
          store_id: STORE_ID,
          entity_type: entityType,
          entity_id: entityId,
          field_name: fieldName,
          locale,
          value,
          translator: 'human',
        });
      }
    }
  }
  if (!rows.length) return;
  const { error } = await supabaseAdmin
    .from('translations')
    .upsert(rows, { onConflict: 'store_id,entity_type,entity_id,field_name,locale' });
  if (error) throw error;
}

async function resolveBrandId(brandName) {
  if (!brandName) return null;
  const { data } = await supabaseAdmin.from('brands').select('id').eq('store_id', STORE_ID).eq('name', brandName).limit(1);
  return data?.[0]?.id || null;
}

// ---- Brands ----

export async function createBrand(payload) {
  await requireAdmin();
  const row = {
    store_id: STORE_ID,
    name: payload.brandName,
    slug: payload.slug,
    short_description: payload.shortDescription,
    long_description: payload.longDescription,
    disclaimer: payload.brandDisclaimer,
    meta_title: payload.seoTitle,
    meta_description: payload.seoDescription,
    logo_light_url: payload.brandLogoLight,
    logo_dark_url: payload.brandLogoDark,
    hero_image_url: payload.heroImage,
  };
  const { data, error } = await supabaseAdmin.from('brands').insert(row).select().single();
  if (error) throw new Error(error.message);
  await upsertTranslations('brand', data.id, {
    brandName: { de: payload.brandName_de, en: payload.brandName_en },
    shortDescription: { de: payload.shortDescription_de, en: payload.shortDescription_en },
    longDescription: { de: payload.longDescription_de, en: payload.longDescription_en },
    brandDisclaimer: { de: payload.brandDisclaimer_de, en: payload.brandDisclaimer_en },
    seoTitle: { de: payload.seoTitle_de, en: payload.seoTitle_en },
    seoDescription: { de: payload.seoDescription_de, en: payload.seoDescription_en },
  });
  return { id: data.id };
}

export async function updateBrand(id, payload) {
  await requireAdmin();
  const row = {
    name: payload.brandName,
    slug: payload.slug,
    short_description: payload.shortDescription,
    long_description: payload.longDescription,
    disclaimer: payload.brandDisclaimer,
    meta_title: payload.seoTitle,
    meta_description: payload.seoDescription,
    logo_light_url: payload.brandLogoLight,
    logo_dark_url: payload.brandLogoDark,
    hero_image_url: payload.heroImage,
  };
  const { error } = await supabaseAdmin.from('brands').update(row).eq('id', id);
  if (error) throw new Error(error.message);
  await upsertTranslations('brand', id, {
    brandName: { de: payload.brandName_de, en: payload.brandName_en },
    shortDescription: { de: payload.shortDescription_de, en: payload.shortDescription_en },
    longDescription: { de: payload.longDescription_de, en: payload.longDescription_en },
    brandDisclaimer: { de: payload.brandDisclaimer_de, en: payload.brandDisclaimer_en },
    seoTitle: { de: payload.seoTitle_de, en: payload.seoTitle_en },
    seoDescription: { de: payload.seoDescription_de, en: payload.seoDescription_en },
  });
  return { id };
}

export async function deleteBrand(id) {
  await requireAdmin();
  const { error } = await supabaseAdmin.from('brands').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ---- Collections ----

export async function createCollection(payload) {
  await requireAdmin();
  const brandId = await resolveBrandId(payload.brand);
  const row = {
    store_id: STORE_ID,
    brand_id: brandId,
    name: payload.collectionName,
    slug: payload.slug,
    description: payload.description,
    image_url: payload.heroImage,
  };
  const { data, error } = await supabaseAdmin.from('collections').insert(row).select().single();
  if (error) throw new Error(error.message);
  await upsertTranslations('collection', data.id, {
    collectionName: { de: payload.collectionName_de, en: payload.collectionName_en },
    description: { de: payload.description_de, en: payload.description_en },
  });
  return { id: data.id };
}

export async function updateCollection(id, payload) {
  await requireAdmin();
  const brandId = await resolveBrandId(payload.brand);
  const row = {
    brand_id: brandId,
    name: payload.collectionName,
    slug: payload.slug,
    description: payload.description,
    image_url: payload.heroImage,
  };
  const { error } = await supabaseAdmin.from('collections').update(row).eq('id', id);
  if (error) throw new Error(error.message);
  await upsertTranslations('collection', id, {
    collectionName: { de: payload.collectionName_de, en: payload.collectionName_en },
    description: { de: payload.description_de, en: payload.description_en },
  });
  return { id };
}

export async function deleteCollection(id) {
  await requireAdmin();
  const { error } = await supabaseAdmin.from('collections').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ---- FAQ ----

export async function createFaq(payload) {
  await requireAdmin();
  const row = { store_id: STORE_ID, question: payload.question, answer: payload.answer, category: payload.category };
  const { data, error } = await supabaseAdmin.from('faqs').insert(row).select().single();
  if (error) throw new Error(error.message);
  await upsertTranslations('faq', data.id, {
    question: { de: payload.question_de, en: payload.question_en },
    answer: { de: payload.answer_de, en: payload.answer_en },
  });
  return { id: data.id };
}

export async function updateFaq(id, payload) {
  await requireAdmin();
  const row = { question: payload.question, answer: payload.answer, category: payload.category };
  const { error } = await supabaseAdmin.from('faqs').update(row).eq('id', id);
  if (error) throw new Error(error.message);
  await upsertTranslations('faq', id, {
    question: { de: payload.question_de, en: payload.question_en },
    answer: { de: payload.answer_de, en: payload.answer_en },
  });
  return { id };
}

export async function deleteFaq(id) {
  await requireAdmin();
  const { error } = await supabaseAdmin.from('faqs').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ---- Guides ----

export async function createGuide(payload) {
  await requireAdmin();
  const row = {
    store_id: STORE_ID,
    title: payload.title,
    slug: payload.slug,
    category: payload.category,
    excerpt: payload.excerpt,
    content: payload.content,
    published: !!payload.published,
  };
  const { data, error } = await supabaseAdmin.from('guides').insert(row).select().single();
  if (error) throw new Error(error.message);
  await upsertTranslations('guide', data.id, {
    title: { de: payload.title_de, en: payload.title_en },
    excerpt: { de: payload.excerpt_de, en: payload.excerpt_en },
    content: { de: payload.content_de, en: payload.content_en },
  });
  return { id: data.id };
}

export async function updateGuide(id, payload) {
  await requireAdmin();
  const row = {
    title: payload.title,
    slug: payload.slug,
    category: payload.category,
    excerpt: payload.excerpt,
    content: payload.content,
    published: !!payload.published,
  };
  const { error } = await supabaseAdmin.from('guides').update(row).eq('id', id);
  if (error) throw new Error(error.message);
  await upsertTranslations('guide', id, {
    title: { de: payload.title_de, en: payload.title_en },
    excerpt: { de: payload.excerpt_de, en: payload.excerpt_en },
    content: { de: payload.content_de, en: payload.content_en },
  });
  return { id };
}

export async function deleteGuide(id) {
  await requireAdmin();
  const { error } = await supabaseAdmin.from('guides').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ---- Legal Pages ----

export async function createLegalPage(payload) {
  await requireAdmin();
  const row = {
    store_id: STORE_ID,
    title: payload.title,
    slug: payload.slug,
    content: payload.content,
    meta_title: payload.seoTitle,
    meta_description: payload.seoDescription,
  };
  const { data, error } = await supabaseAdmin.from('legal_pages').insert(row).select().single();
  if (error) throw new Error(error.message);
  await upsertTranslations('legal_page', data.id, {
    title: { de: payload.title_de, en: payload.title_en },
    content: { de: payload.content_de, en: payload.content_en },
  });
  return { id: data.id };
}

export async function updateLegalPage(id, payload) {
  await requireAdmin();
  const row = {
    title: payload.title,
    slug: payload.slug,
    content: payload.content,
    meta_title: payload.seoTitle,
    meta_description: payload.seoDescription,
  };
  const { error } = await supabaseAdmin.from('legal_pages').update(row).eq('id', id);
  if (error) throw new Error(error.message);
  await upsertTranslations('legal_page', id, {
    title: { de: payload.title_de, en: payload.title_en },
    content: { de: payload.content_de, en: payload.content_en },
  });
  return { id };
}

export async function deleteLegalPage(id) {
  await requireAdmin();
  const { error } = await supabaseAdmin.from('legal_pages').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
