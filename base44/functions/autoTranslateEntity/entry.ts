import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Previously callable by entity automations WITHOUT authentication, using caller-supplied
// event/entity data and service-role privileges. Now requires authenticated admin.
// All auto-translate automations have been archived.

const TRANSLATABLE_FIELDS = {
  Products: ['productTitle', 'productDescription', 'shortDescription', 'functions', 'serviceHistory', 'polishedStatus', 'originalPartsStatus', 'warrantyType', 'shippingInfo', 'scopeOfDelivery', 'metaTitle', 'metaDescription', 'seoKeywords', 'googleMerchantTitle', 'googleMerchantDescription'],
  Brands: ['brandName', 'shortDescription', 'longDescription', 'brandDisclaimer', 'seoTitle', 'seoDescription', 'seoKeywords', 'buyingGuideContent'],
  Collections: ['collectionName', 'description', 'seoTitle', 'seoDescription', 'seoKeywords'],
  FAQ: ['question', 'answer'],
  LegalPages: ['title', 'content', 'seoTitle', 'seoDescription'],
  WatchGuides: ['title', 'content', 'excerpt', 'seoTitle', 'seoDescription', 'seoKeywords']
};

function detectLanguage(text) {
  const sample = ' ' + text.toLowerCase() + ' ';
  const de = [' der ', ' die ', ' das ', ' und ', ' mit ', ' für ', ' von ', ' zu ', ' den ', ' eine ', ' ist ', ' auf ', ' auch ', ' sich ', ' bei ', ' dem ', ' nicht ', ' wie ', ' wir ', ' ihnen ', ' ihre ', ' über '];
  const en = [' the ', ' and ', ' with ', ' for ', ' from ', ' to ', ' is ', ' on ', ' also ', ' are ', ' was ', ' this ', ' that ', ' have ', ' has ', ' your ', ' you ', ' our ', ' we ', ' a ', ' an '];
  let deC = 0, enC = 0;
  for (const w of de) { if (sample.includes(w)) deC++; }
  for (const w of en) { if (sample.includes(w)) enC++; }
  return deC > enC ? 'de' : 'en';
}

function sanitizeHtml(dirty) {
  if (!dirty || typeof dirty !== 'string') return '';
  let s = dirty;
  s = s.replace(/<script[\s\S]*?<\/script>/gi, '');
  s = s.replace(/<iframe[\s\S]*?<\/iframe>/gi, '');
  s = s.replace(/<object[\s\S]*?<\/object>/gi, '');
  s = s.replace(/<embed[\s\S]*?<\/embed>/gi, '');
  s = s.replace(/<style[\s\S]*?<\/style>/gi, '');
  s = s.replace(/<form[\s\S]*?<\/form>/gi, '');
  s = s.replace(/\son\w+\s*=\s*"[^"]*"/gi, '');
  s = s.replace(/\son\w+\s*=\s*'[^']*'/gi, '');
  s = s.replace(/\son\w+\s*=\s*[^\s>]+/gi, '');
  s = s.replace(/javascript:/gi, '');
  s = s.replace(/\sstyle\s*=\s*"[^"]*"/gi, '');
  s = s.replace(/\sstyle\s*=\s*'[^']*'/gi, '');
  return s;
}

async function requireAdmin(base44) {
  let user = null;
  try { user = await base44.auth.me(); } catch { return null; }
  if (!user || user.role !== 'admin') return null;
  return user;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // FAIL CLOSED: require authenticated admin.
    // No more anonymous service-role path for entity automations.
    const user = await requireAdmin(base44);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return Response.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const entityName = body.entity_name;
    const entityId = body.entity_id;

    if (!entityName || !TRANSLATABLE_FIELDS[entityName]) {
      return Response.json({ error: 'Invalid or unsupported entity_name' }, { status: 400 });
    }
    if (typeof entityId !== 'string' || !entityId.trim() || entityId.length > 100) {
      return Response.json({ error: 'Invalid entity_id' }, { status: 400 });
    }

    // Reject unexpected properties
    const allowedKeys = ['entity_name', 'entity_id'];
    const unexpectedKeys = Object.keys(body).filter(k => !allowedKeys.includes(k));
    if (unexpectedKeys.length > 0) {
      return Response.json({ error: 'Unexpected properties in request' }, { status: 400 });
    }

    // Delegate to processTranslation logic (admin-initiated queued workflow)
    const record = await base44.asServiceRole.entities[entityName].get(entityId);
    if (!record) return Response.json({ error: 'Entity not found' }, { status: 404 });

    const fieldsToTranslate = TRANSLATABLE_FIELDS[entityName];
    let sourceLang = null;
    const sourceData = {};
    for (const field of fieldsToTranslate) {
      const enValue = record[`${field}_en`];
      const deValue = record[`${field}_de`];
      const baseValue = record[field];
      if (enValue && !deValue) { sourceData[field] = enValue; if (!sourceLang) sourceLang = 'en'; }
      else if (deValue && !enValue) { sourceData[field] = deValue; if (!sourceLang) sourceLang = 'de'; }
      else if (!enValue && !deValue && baseValue) { sourceData[field] = baseValue; if (!sourceLang) sourceLang = detectLanguage(String(baseValue)); }
    }

    if (Object.keys(sourceData).length === 0) {
      return Response.json({ success: true, message: 'No translatable content found' });
    }

    const targetLang = sourceLang === 'en' ? 'de' : 'en';
    const targetSuffix = `_${targetLang}`;

    const toTranslate = {};
    for (const [field, value] of Object.entries(sourceData)) {
      if (!record[`${field}${targetSuffix}`]) {
        toTranslate[field] = String(value).substring(0, 10000);
      }
    }

    if (Object.keys(toTranslate).length === 0) {
      return Response.json({ success: true, message: 'All target fields already populated' });
    }

    const sourceLanguageName = sourceLang === 'de' ? 'German' : 'English';
    const targetLanguageName = targetLang === 'de' ? 'German' : 'English';

    let job = null;
    try {
      job = await base44.asServiceRole.entities.TranslationJob.create({
        entityName, contentId: entityId,
        contentTitle: record.productTitle || record.brandName || record.collectionName || record.title || record.question || entityId,
        sourceLanguage: sourceLang, targetLanguage: targetLang,
        provider: 'llm_builtin', status: 'in_progress',
        startedAt: new Date().toISOString(), triggerType: 'manual'
      });
    } catch (e) { console.error('Failed to create job:', e); }

    const prompt = `You are a professional translator for luxury watch industry content. Translate the following JSON fields from ${sourceLanguageName} to ${targetLanguageName}.
CRITICAL RULES:
- Preserve technical watch terms exactly as-is.
- Preserve brand names exactly.
- Preserve reference numbers, model numbers, and measurements exactly.
- Preserve any HTML formatting.
- Translate naturally and professionally for a luxury e-commerce context.
- For SEO fields, translate each keyword/phrase, keeping them comma-separated.

Source data (JSON):
${JSON.stringify(toTranslate, null, 2)}
Return ONLY a JSON object with the exact same keys, translated to ${targetLanguageName}.`;

    const schemaProperties = {};
    for (const field of Object.keys(toTranslate)) { schemaProperties[field] = { type: 'string' }; }

    let llmResponse;
    try {
      llmResponse = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt, response_json_schema: { type: 'object', properties: schemaProperties }
      });
    } catch (llmError) {
      if (job) await base44.asServiceRole.entities.TranslationJob.update(job.id, { status: 'failed', errorMessage: 'LLM call failed', completedAt: new Date().toISOString() });
      return Response.json({ error: 'Translation service unavailable' }, { status: 502 });
    }

    const updateData = {};
    let charCount = 0;
    for (const [field, translatedValue] of Object.entries(llmResponse)) {
      if (translatedValue && typeof translatedValue === 'string') {
        const sanitized = sanitizeHtml(translatedValue).substring(0, 10000);
        updateData[`${field}${targetSuffix}`] = sanitized;
        charCount += sanitized.length;
      }
    }

    if (Object.keys(updateData).length === 0) {
      if (job) await base44.asServiceRole.entities.TranslationJob.update(job.id, { status: 'failed', errorMessage: 'No usable translations returned', completedAt: new Date().toISOString() });
      return Response.json({ error: 'Translation returned no usable results' }, { status: 500 });
    }

    await base44.asServiceRole.entities[entityName].update(entityId, updateData);

    if (job) {
      await base44.asServiceRole.entities.TranslationJob.update(job.id, {
        status: 'completed', fieldsTranslated: Object.keys(updateData),
        characterCount: charCount, completedAt: new Date().toISOString()
      });
    }

    return Response.json({
      success: true, entity_name: entityName, entity_id: entityId, job_id: job?.id || null,
      source_language: sourceLang, target_language: targetLang,
      fields_translated: Object.keys(updateData), character_count: charCount
    });
  } catch (error) {
    console.error('autoTranslateEntity error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});