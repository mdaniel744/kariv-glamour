import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ─── Allowlists ──────────────────────────────────────────────
const TRANSLATABLE_FIELDS = {
  Products: ['productTitle', 'productDescription', 'shortDescription', 'functions', 'serviceHistory', 'polishedStatus', 'originalPartsStatus', 'warrantyType', 'shippingInfo', 'scopeOfDelivery', 'metaTitle', 'metaDescription', 'seoKeywords', 'googleMerchantTitle', 'googleMerchantDescription'],
  Brands: ['brandName', 'shortDescription', 'longDescription', 'brandDisclaimer', 'seoTitle', 'seoDescription', 'seoKeywords', 'buyingGuideContent'],
  Collections: ['collectionName', 'description', 'seoTitle', 'seoDescription', 'seoKeywords'],
  FAQ: ['question', 'answer'],
  LegalPages: ['title', 'content', 'seoTitle', 'seoDescription'],
  WatchGuides: ['title', 'content', 'excerpt', 'seoTitle', 'seoDescription', 'seoKeywords']
};
const SUPPORTED_LANGS = ['en', 'de'];
const MAX_TEXT_LENGTH = 10000;
const MAX_RECORDS = 500;

// ─── Server-side HTML sanitizer ──────────────────────────────
// Strips scripts, event handlers, iframes, javascript: URLs.
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

function detectLanguage(text) {
  const sample = ' ' + text.toLowerCase() + ' ';
  const de = [' der ', ' die ', ' das ', ' und ', ' mit ', ' für ', ' von ', ' zu ', ' den ', ' eine ', ' ist ', ' auf ', ' auch ', ' sich ', ' bei ', ' dem ', ' nicht ', ' wie ', ' wir ', ' ihnen ', ' ihre ', ' über '];
  const en = [' the ', ' and ', ' with ', ' for ', ' from ', ' to ', ' is ', ' on ', ' also ', ' are ', ' was ', ' this ', ' that ', ' have ', ' has ', ' your ', ' you ', ' our ', ' we ', ' a ', ' an '];
  let deC = 0, enC = 0;
  for (const w of de) { if (sample.includes(w)) deC++; }
  for (const w of en) { if (sample.includes(w)) enC++; }
  return deC > enC ? 'de' : 'en';
}

function buildGlossaryPrompt(glossaryTerms, targetLangName) {
  if (!glossaryTerms || glossaryTerms.length === 0) return '';
  const lines = glossaryTerms.map(t => {
    const translation = targetLangName === 'German' ? t.germanTranslation : t.englishTranslation;
    if (t.ruleType === 'never_translate') return `- "${t.originalTerm}": NEVER translate this term. Keep it exactly as-is.`;
    if (t.ruleType === 'preserve_original') return `- "${t.originalTerm}": Preserve the original term, do not translate.`;
    if (t.ruleType === 'custom_instruction') return `- "${t.originalTerm}": ${t.customInstruction || t.notes || 'Custom rule'}`;
    return `- "${t.originalTerm}": Translate as "${translation || t.originalTerm}"`;
  });
  return `\n\nGLOSSARY (follow these rules strictly):\n${lines.join('\n')}\n`;
}

// ─── Auth helper: fail closed ────────────────────────────────
async function requireAdmin(base44) {
  let user = null;
  try { user = await base44.auth.me(); } catch { return null; }
  if (!user || user.role !== 'admin') return null;
  return user;
}

// ─── Quota helper ────────────────────────────────────────────
async function checkQuota(base44, charsToAdd) {
  let settings = null;
  try {
    const list = await base44.asServiceRole.entities.TranslationSettings.list('-created_date', 1);
    settings = list && list.length > 0 ? list[0] : null;
  } catch { /* settings optional */ }
  if (settings) {
    const used = settings.charactersUsedThisMonth || 0;
    const quota = settings.monthlyCharacterQuota || 500000;
    if (used + charsToAdd > quota) {
      return { settings, exceeded: true };
    }
  }
  return { settings, exceeded: false };
}

async function incrementQuota(base44, settings, charsToAdd) {
  if (!settings) return;
  try {
    await base44.asServiceRole.entities.TranslationSettings.update(settings.id, {
      charactersUsedThisMonth: (settings.charactersUsedThisMonth || 0) + charsToAdd
    });
  } catch (e) { console.error('Failed to update quota:', e); }
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // FAIL CLOSED: require authenticated admin
    const user = await requireAdmin(base44);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    // Parse and validate body
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return Response.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const entityName = body.entity_name;
    const entityId = body.entity_id;
    const targetLanguage = body.target_language;

    // Validate entity name against allowlist
    if (!entityName || !TRANSLATABLE_FIELDS[entityName]) {
      return Response.json({ error: 'Invalid or unsupported entity_name' }, { status: 400 });
    }

    // Validate entity ID format
    if (typeof entityId !== 'string' || !entityId.trim() || entityId.length > 100) {
      return Response.json({ error: 'Invalid entity_id' }, { status: 400 });
    }

    // Validate target language if provided
    if (targetLanguage && !SUPPORTED_LANGS.includes(targetLanguage)) {
      return Response.json({ error: 'Unsupported target_language' }, { status: 400 });
    }

    // Reject unexpected properties (no user-supplied prompts)
    const allowedKeys = ['entity_name', 'entity_id', 'target_language', 'trigger_type', 'force'];
    const unexpectedKeys = Object.keys(body).filter(k => !allowedKeys.includes(k));
    if (unexpectedKeys.length > 0) {
      return Response.json({ error: 'Unexpected properties in request' }, { status: 400 });
    }

    // Fetch settings
    const { settings } = await checkQuota(base44, 0);
    const provider = settings?.defaultProvider || 'llm_builtin';
    const tone = settings?.defaultTone || 'formal';
    const protectManualEdits = settings?.protectManualEdits !== false;
    const force = body.force === true;

    // Fetch glossary
    let glossaryTerms = [];
    try { glossaryTerms = await base44.asServiceRole.entities.GlossaryTerm.filter({ isActive: true }); } catch { /* optional */ }

    // Fetch the entity record
    const record = await base44.asServiceRole.entities[entityName].get(entityId);
    if (!record) return Response.json({ error: 'Entity not found' }, { status: 404 });

    const fieldsToTranslate = TRANSLATABLE_FIELDS[entityName];

    // Collect source values and determine source language
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
      return Response.json({ success: true, message: 'No translatable content found', job_id: null });
    }

    const targetLang = (targetLanguage && SUPPORTED_LANGS.includes(targetLanguage)) ? targetLanguage : (sourceLang === 'en' ? 'de' : 'en');
    const targetSuffix = `_${targetLang}`;

    // Filter fields needing translation
    const toTranslate = {};
    for (const [field, value] of Object.entries(sourceData)) {
      if (record[`${field}${targetSuffix}`]) {
        if (!protectManualEdits || force) toTranslate[field] = value;
      } else {
        toTranslate[field] = value;
      }
      // Enforce max text length per field
      if (toTranslate[field] && String(toTranslate[field]).length > MAX_TEXT_LENGTH) {
        toTranslate[field] = String(toTranslate[field]).substring(0, MAX_TEXT_LENGTH);
      }
    }

    if (Object.keys(toTranslate).length === 0) {
      return Response.json({ success: true, message: 'All target fields already populated', job_id: null });
    }

    // Estimate character count for quota check
    const estimatedChars = Object.values(toTranslate).reduce((s, v) => s + String(v).length, 0);
    const quotaCheck = await checkQuota(base44, estimatedChars);
    if (quotaCheck.exceeded) {
      return Response.json({ error: 'Translation quota exceeded' }, { status: 429 });
    }

    const sourceLanguageName = sourceLang === 'de' ? 'German' : 'English';
    const targetLanguageName = targetLang === 'de' ? 'German' : 'English';

    // Create TranslationJob
    let job = null;
    try {
      job = await base44.asServiceRole.entities.TranslationJob.create({
        entityName, contentId: entityId,
        contentTitle: record.productTitle || record.brandName || record.collectionName || record.title || record.question || entityId,
        sourceLanguage: sourceLang, targetLanguage: targetLang, provider,
        status: 'in_progress', startedAt: new Date().toISOString(),
        triggerType: body.trigger_type === 'bulk' ? 'bulk' : 'manual'
      });
    } catch (e) { console.error('Failed to create job:', e); }

    const glossaryPrompt = buildGlossaryPrompt(glossaryTerms, targetLanguageName);
    const toneInstruction = tone === 'formal' ? 'Use formal register (Sie-form in German).' : 'Use informal register (Du-form in German).';

    const prompt = `You are a professional translator for luxury watch industry content. Translate the following JSON fields from ${sourceLanguageName} to ${targetLanguageName}.
CRITICAL RULES:
- Preserve technical watch terms exactly as-is.
- Preserve brand names exactly.
- Preserve reference numbers, model numbers, and measurements exactly.
- Preserve any HTML formatting.
- Translate naturally and professionally for a luxury e-commerce context.
- ${toneInstruction}
- For SEO fields, translate each keyword/phrase, keeping them comma-separated.
${glossaryPrompt}
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

    // Sanitize and collect results
    const updateData = {};
    let charCount = 0;
    for (const [field, translatedValue] of Object.entries(llmResponse)) {
      if (translatedValue && typeof translatedValue === 'string') {
        const sanitized = sanitizeHtml(translatedValue).substring(0, MAX_TEXT_LENGTH);
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
    await incrementQuota(base44, quotaCheck.settings, charCount);

    return Response.json({
      success: true, entity_name: entityName, entity_id: entityId, job_id: job?.id || null,
      source_language: sourceLang, target_language: targetLang,
      fields_translated: Object.keys(updateData), character_count: charCount, provider
    });
  } catch (error) {
    console.error('processTranslation error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});