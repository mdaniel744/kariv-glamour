import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const TRANSLATABLE_ENTITIES = [
  'Products',
  'Brands',
  'Collections',
  'FAQ',
  'LegalPages',
  'WatchGuides'
];

const TRANSLATABLE_FIELDS = {
  Products: [
    'productTitle', 'productDescription', 'shortDescription', 'functions',
    'serviceHistory', 'polishedStatus', 'originalPartsStatus', 'warrantyType',
    'shippingInfo', 'scopeOfDelivery', 'metaTitle', 'metaDescription',
    'seoKeywords', 'googleMerchantTitle', 'googleMerchantDescription'
  ],
  Brands: [
    'brandName', 'shortDescription', 'longDescription', 'brandDisclaimer',
    'seoTitle', 'seoDescription', 'seoKeywords', 'buyingGuideContent'
  ],
  Collections: [
    'collectionName', 'description', 'seoTitle', 'seoDescription', 'seoKeywords'
  ],
  FAQ: ['question', 'answer'],
  LegalPages: ['title', 'content', 'seoTitle', 'seoDescription'],
  WatchGuides: [
    'title', 'content', 'excerpt', 'seoTitle', 'seoDescription', 'seoKeywords'
  ]
};

const MAX_REQUEST_SIZE = 10 * 1024; // 10 KB
const BATCH_SIZE = 50;
const MAX_BATCHES = 100; // Limit total batches to prevent runaway costs

function detectLanguage(text) {
  const sample = text.toLowerCase();
  const germanIndicators = [' der ', ' die ', ' das ', ' und ', ' mit ', ' für ', ' von ', ' zu ', ' den ', ' eine ', ' ist ', ' auf ', ' auch ', ' sich ', ' bei ', ' dem ', ' nicht ', ' wie ', ' wir ', ' ihnen ', ' ihre ', ' über '];
  const englishIndicators = [' the ', ' and ', ' with ', ' for ', ' from ', ' to ', ' is ', ' on ', ' also ', ' are ', ' was ', ' this ', ' that ', ' have ', ' has ', ' your ', ' you ', ' our ', ' we ', ' a ', ' an '];

  let deCount = 0;
  let enCount = 0;
  for (const w of germanIndicators) {
    if (sample.includes(w)) deCount++;
  }
  for (const w of englishIndicators) {
    if (sample.includes(w)) enCount++;
  }
  return deCount > enCount ? 'de' : 'en';
}

async function translateRecord(base44, entityName, record) {
  const fieldsToTranslate = TRANSLATABLE_FIELDS[entityName];
  if (!fieldsToTranslate) return { skipped: true };

  let sourceLang = null;
  const sourceData = {};

  for (const field of fieldsToTranslate) {
    const enValue = record[`${field}_en`];
    const deValue = record[`${field}_de`];
    const baseValue = record[field];

    if (enValue && !deValue) {
      sourceData[field] = enValue;
      if (!sourceLang) sourceLang = 'en';
    } else if (deValue && !enValue) {
      sourceData[field] = deValue;
      if (!sourceLang) sourceLang = 'de';
    } else if (!enValue && !deValue && baseValue) {
      sourceData[field] = baseValue;
      if (!sourceLang) {
        sourceLang = detectLanguage(String(baseValue));
      }
    }
  }

  if (Object.keys(sourceData).length === 0) {
    return { skipped: true, reason: 'No translatable content' };
  }

  const targetLang = sourceLang === 'en' ? 'de' : 'en';
  const targetSuffix = `_${targetLang}`;

  const toTranslate = {};
  for (const [field, value] of Object.entries(sourceData)) {
    if (!record[`${field}${targetSuffix}`]) {
      toTranslate[field] = value;
    }
  }

  if (Object.keys(toTranslate).length === 0) {
    return { skipped: true, reason: `All ${targetLang} fields populated` };
  }

  const sourceLanguageName = sourceLang === 'de' ? 'German' : 'English';
  const targetLanguageName = targetLang === 'de' ? 'German' : 'English';

  const prompt = `You are a professional translator for luxury watch industry content. Translate the following JSON fields from ${sourceLanguageName} to ${targetLanguageName}.

CRITICAL RULES:
- Preserve technical watch terms exactly as-is: Tourbillon, Reverso, Submariner, GMT-Master, Royal Oak, Nautilus, Aquanaut, Calatrava, Speedmaster, Seamaster, Planet Ocean, Constellation, Portugieser, Ingenieur, Big Bang, Classic Fusion, Spirit of Big Bang, Navitimer, Chronomat, Superocean, Atmos, Master Compressor, Polaris, Duometre, Hybris Mechanica, etc.
- Preserve brand names exactly: Rolex, Patek Philippe, Omega, Cartier, Hublot, Breitling, Audemars Piguet, Grand Seiko, IWC, Jaeger-LeCoultre, Tudor, Panerai, Bvlgari, TAG Heuer, Girard-Perregaux, etc.
- Preserve reference numbers, model numbers, and measurements exactly (e.g., "ref. 126610LN", "40mm", "300m").
- Preserve any HTML or markdown formatting.
- Translate naturally and professionally for a luxury e-commerce context.
- For SEO fields (seoKeywords), translate each keyword/phrase, keeping them comma-separated.

Source data (JSON):
${JSON.stringify(toTranslate, null, 2)}

Return ONLY a JSON object with the exact same keys, translated to ${targetLanguageName}.`;

  const schemaProperties = {};
  for (const field of Object.keys(toTranslate)) {
    schemaProperties[field] = { type: 'string' };
  }

  const llmResponse = await base44.asServiceRole.integrations.Core.InvokeLLM({
    prompt,
    response_json_schema: {
      type: 'object',
      properties: schemaProperties
    }
  });

  const updateData = {};
  for (const [field, translatedValue] of Object.entries(llmResponse)) {
    if (translatedValue && typeof translatedValue === 'string') {
      updateData[`${field}${targetSuffix}`] = translatedValue;
    }
  }

  if (Object.keys(updateData).length === 0) {
    return { skipped: true, reason: 'LLM returned no translations' };
  }

  await base44.asServiceRole.entities[entityName].update(record.id, updateData);

  return {
    translated: true,
    source: sourceLang,
    target: targetLang,
    fields: Object.keys(updateData)
  };
}

Deno.serve(async (req) => {
  try {
    // Check request size
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_REQUEST_SIZE) {
      return Response.json({ error: 'Request payload too large' }, { status: 413 });
    }

    const base44 = createClientFromRequest(req);

    // Auth: FAIL CLOSED. Manual admin invocation only.
    let user = null;
    try {
      user = await base44.auth.me();
    } catch {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const entitiesToProcess = body.entity_name
      ? [body.entity_name]
      : TRANSLATABLE_ENTITIES;

    const results = {};

    for (const entityName of entitiesToProcess) {
      if (!TRANSLATABLE_FIELDS[entityName]) {
        results[entityName] = { error: 'Entity not supported', total: 0, translated: 0, skipped: 0, errors: [] };
        continue;
      }

      try {
        const entityResult = {
          total: 0,
          translated: 0,
          skipped: 0,
          errors: [],
          details: [],
          batch_count: 0
        };

        let batchIndex = 0;
        let skip = 0;
        let hasMore = true;

        while (hasMore && batchIndex < MAX_BATCHES) {
          const batch = await base44.asServiceRole.entities[entityName].list('-created_date', BATCH_SIZE, skip);

          if (!batch || batch.length === 0) {
            hasMore = false;
            break;
          }

          entityResult.batch_count++;

          for (const record of batch) {
            entityResult.total++;
            try {
              const result = await translateRecord(base44, entityName, record);
              if (result.translated) {
                entityResult.translated++;
                entityResult.details.push({
                  id: record.id,
                  fields: result.fields,
                  source: result.source,
                  target: result.target
                });
              } else {
                entityResult.skipped++;
              }
            } catch (recordError) {
              entityResult.errors.push({
                id: record.id,
                error: recordError instanceof Error ? recordError.message : String(recordError)
              });
            }
          }

          // Pagination: advance offset if we got a full batch
          if (batch.length === BATCH_SIZE) {
            skip += BATCH_SIZE;
          } else {
            hasMore = false;
          }
        }

        // Check if we hit the batch limit
        if (batchIndex >= MAX_BATCHES && hasMore) {
          entityResult.warning = `Stopped after ${MAX_BATCHES} batches to prevent runaway costs. More records may exist.`;
        }

        results[entityName] = entityResult;
      } catch (entityError) {
        results[entityName] = {
          error: entityError instanceof Error ? entityError.message : String(entityError),
          total: 0,
          translated: 0,
          skipped: 0,
          errors: []
        };
      }
    }

    const summary = {
      entities_processed: Object.keys(results).length,
      total_records: Object.values(results).reduce((sum, r) => sum + (r.total || 0), 0),
      total_translated: Object.values(results).reduce((sum, r) => sum + (r.translated || 0), 0),
      total_skipped: Object.values(results).reduce((sum, r) => sum + (r.skipped || 0), 0),
      total_errors: Object.values(results).reduce((sum, r) => sum + (r.errors?.length || 0), 0)
    };

    return Response.json({ success: true, summary, details: results });
  } catch (error) {
    console.error('bulkTranslate error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});