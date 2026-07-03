import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const TRANSLATABLE_ENTITIES = ['Products', 'Brands', 'Collections', 'FAQ', 'LegalPages', 'WatchGuides'];
const TRANSLATABLE_FIELDS = {
  Products: ['productTitle', 'productDescription', 'shortDescription', 'functions', 'serviceHistory', 'polishedStatus', 'originalPartsStatus', 'warrantyType', 'shippingInfo', 'scopeOfDelivery', 'metaTitle', 'metaDescription', 'seoKeywords', 'googleMerchantTitle', 'googleMerchantDescription'],
  Brands: ['brandName', 'shortDescription', 'longDescription', 'brandDisclaimer', 'seoTitle', 'seoDescription', 'seoKeywords', 'buyingGuideContent'],
  Collections: ['collectionName', 'description', 'seoTitle', 'seoDescription', 'seoKeywords'],
  FAQ: ['question', 'answer'],
  LegalPages: ['title', 'content', 'seoTitle', 'seoDescription'],
  WatchGuides: ['title', 'content', 'excerpt', 'seoTitle', 'seoDescription', 'seoKeywords']
};
const BATCH_SIZE = 50;
const MAX_BATCHES = 20;        // hard cap: 20 batches × 50 = max 1000 records
const MAX_RECORDS = 500;       // absolute record limit per invocation
const MAX_TEXT_LENGTH = 10000;

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

async function translateRecord(base44, entityName, record, force) {
  const fieldsToTranslate = TRANSLATABLE_FIELDS[entityName];
  if (!fieldsToTranslate) return { skipped: true, reason: 'Entity not supported' };

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

  if (Object.keys(sourceData).length === 0) return { skipped: true, reason: 'No translatable content' };

  const targetLang = sourceLang === 'en' ? 'de' : 'en';
  const targetSuffix = `_${targetLang}`;

  // Skip already-translated records unless force=true
  const toTranslate = {};
  for (const [field, value] of Object.entries(sourceData)) {
    if (!record[`${field}${targetSuffix}`] || force) {
      toTranslate[field] = String(value).substring(0, MAX_TEXT_LENGTH);
    }
  }

  if (Object.keys(toTranslate).length === 0) return { skipped: true, reason: `All ${targetLang} fields populated` };

  const sourceLanguageName = sourceLang === 'de' ? 'German' : 'English';
  const targetLanguageName = targetLang === 'de' ? 'German' : 'English';

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

  const llmResponse = await base44.asServiceRole.integrations.Core.InvokeLLM({
    prompt, response_json_schema: { type: 'object', properties: schemaProperties }
  });

  const updateData = {};
  for (const [field, translatedValue] of Object.entries(llmResponse)) {
    if (translatedValue && typeof translatedValue === 'string') {
      const sanitized = sanitizeHtml(translatedValue).substring(0, MAX_TEXT_LENGTH);
      updateData[`${field}${targetSuffix}`] = sanitized;
    }
  }

  if (Object.keys(updateData).length === 0) return { skipped: true, reason: 'LLM returned no translations' };

  await base44.asServiceRole.entities[entityName].update(record.id, updateData);

  return { translated: true, source: sourceLang, target: targetLang, fields: Object.keys(updateData) };
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // FAIL CLOSED: require authenticated admin
    const user = await requireAdmin(base44);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const force = body.force === true;
    const requestedEntity = body.entity_name;

    // Validate entity_name if provided
    if (requestedEntity && !TRANSLATABLE_FIELDS[requestedEntity]) {
      return Response.json({ error: 'Invalid or unsupported entity_name' }, { status: 400 });
    }

    // Reject unexpected properties
    const allowedKeys = ['entity_name', 'force'];
    const unexpectedKeys = Object.keys(body).filter(k => !allowedKeys.includes(k));
    if (unexpectedKeys.length > 0) {
      return Response.json({ error: 'Unexpected properties in request' }, { status: 400 });
    }

    // Fetch settings for quota
    let settings = null;
    try {
      const list = await base44.asServiceRole.entities.TranslationSettings.list('-created_date', 1);
      settings = list && list.length > 0 ? list[0] : null;
    } catch { /* optional */ }

    const entitiesToProcess = requestedEntity ? [requestedEntity] : TRANSLATABLE_ENTITIES;
    const results = {};
    let totalProcessed = 0;
    let quotaExceeded = false;

    for (const entityName of entitiesToProcess) {
      if (quotaExceeded) break;
      if (!TRANSLATABLE_FIELDS[entityName]) {
        results[entityName] = { error: 'Entity not supported', total: 0, translated: 0, skipped: 0, failed: 0, remaining: 0 };
        continue;
      }

      try {
        const entityResult = { total: 0, translated: 0, skipped: 0, failed: 0, remaining: 0, batchCount: 0, errors: [] };
        let batchIndex = 0;
        let skip = 0;
        let hasMore = true;

        while (hasMore && batchIndex < MAX_BATCHES && totalProcessed < MAX_RECORDS && !quotaExceeded) {
          const batch = await base44.asServiceRole.entities[entityName].list('-created_date', BATCH_SIZE, skip);
          if (!batch || batch.length === 0) { hasMore = false; break; }

          batchIndex++;              // FIX: increment on every batch
          entityResult.batchCount = batchIndex;

          for (const record of batch) {
            entityResult.total++;
            totalProcessed++;

            if (totalProcessed > MAX_RECORDS) {
              entityResult.remaining++;
              hasMore = false;
              break;
            }

            try {
              const result = await translateRecord(base44, entityName, record, force);
              if (result.translated) {
                entityResult.translated++;
                // Check quota after each translation
                if (settings) {
                  const used = settings.charactersUsedThisMonth || 0;
                  const quota = settings.monthlyCharacterQuota || 500000;
                  if (used > quota * 0.95) {
                    quotaExceeded = true;
                    entityResult.remaining++;
                    hasMore = false;
                    break;
                  }
                }
              } else {
                entityResult.skipped++;
              }
            } catch (recordError) {
              entityResult.failed++;
              entityResult.errors.push({ id: record.id, error: 'Translation failed for this record' });
              // Continue to next record — one failure does not restart the batch
            }
          }

          // Advance pagination offset
          if (batch.length === BATCH_SIZE && hasMore) {
            skip += BATCH_SIZE;
          } else {
            hasMore = false;
          }
        }

        if (batchIndex >= MAX_BATCHES) {
          entityResult.warning = `Stopped after ${MAX_BATCHES} batches. More records may exist.`;
        }
        if (quotaExceeded) {
          entityResult.warning = 'Translation stopped: quota threshold reached.';
        }

        results[entityName] = entityResult;
      } catch (entityError) {
        results[entityName] = { error: 'Processing failed', total: 0, translated: 0, skipped: 0, failed: 0, remaining: 0 };
      }
    }

    const summary = {
      entities_processed: Object.keys(results).length,
      total_records: Object.values(results).reduce((s, r) => s + (r.total || 0), 0),
      total_translated: Object.values(results).reduce((s, r) => s + (r.translated || 0), 0),
      total_skipped: Object.values(results).reduce((s, r) => s + (r.skipped || 0), 0),
      total_failed: Object.values(results).reduce((s, r) => s + (r.failed || 0), 0),
      total_remaining: Object.values(results).reduce((s, r) => s + (r.remaining || 0), 0),
      quota_exceeded: quotaExceeded,
      max_records_limit: MAX_RECORDS
    };

    return Response.json({ success: true, summary, details: results });
  } catch (error) {
    console.error('bulkTranslate error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});