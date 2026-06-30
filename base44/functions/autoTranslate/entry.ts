import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Map of entity name → translatable string field names (base names, without _en/_de suffix)
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
      // No user context — fail closed
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // User must exist and be admin
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Parse body
    const body = await req.json();
    const entity_name = body.entity_name;
    const entity_id = body.entity_id;

    if (typeof entity_name !== 'string' || !entity_name.match(/^[A-Za-z]+$/)) {
      return Response.json({ error: 'Invalid entity_name' }, { status: 400 });
    }

    if (typeof entity_id !== 'string' || !entity_id.trim()) {
      return Response.json({ error: 'Invalid entity_id' }, { status: 400 });
    }

    const fieldsToTranslate = TRANSLATABLE_FIELDS[entity_name];
    if (!fieldsToTranslate) {
      return Response.json({ error: `Entity '${entity_name}' not supported for translation` }, { status: 400 });
    }

    // Fetch the entity record
    const record = await base44.asServiceRole.entities[entity_name].get(entity_id);
    if (!record) {
      return Response.json({ error: 'Entity not found' }, { status: 404 });
    }

    // Collect source values and determine source language
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
      return Response.json({ message: 'No translatable content found' });
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
      return Response.json({ message: `All ${targetLang} fields already populated` });
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
      return Response.json({ message: 'LLM returned no usable translations' });
    }

    await base44.asServiceRole.entities[entity_name].update(entity_id, updateData);

    return Response.json({
      success: true,
      entity_name,
      entity_id,
      source_language: sourceLang,
      target_language: targetLang,
      fields_translated: Object.keys(updateData)
    });
  } catch (error) {
    console.error('autoTranslate error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});