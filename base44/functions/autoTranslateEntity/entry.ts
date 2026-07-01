import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

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

function detectLanguage(text) {
  const sample = text.toLowerCase();
  const germanIndicators = [' der ', ' die ', ' das ', ' und ', ' mit ', ' für ', ' von ', ' zu ', ' den ', ' eine ', ' ist ', ' auf ', ' auch ', ' sich ', ' bei ', ' dem ', ' nicht ', ' wie ', ' wir ', ' ihnen ', ' ihre ', ' über '];
  const englishIndicators = [' the ', ' and ', ' with ', ' for ', ' from ', ' to ', ' is ', ' on ', ' also ', ' are ', ' was ', ' this ', ' that ', ' have ', ' has ', ' your ', ' you ', ' our ', ' we ', ' a ', ' an '];
  let deCount = 0;
  let enCount = 0;
  for (const w of germanIndicators) { if (sample.includes(w)) deCount++; }
  for (const w of englishIndicators) { if (sample.includes(w)) enCount++; }
  return deCount > enCount ? 'de' : 'en';
}

function buildGlossaryPrompt(glossaryTerms, targetLangName) {
  if (!glossaryTerms || glossaryTerms.length === 0) return '';
  const lines = glossaryTerms.map(t => {
    const translation = targetLangName === 'German' ? t.germanTranslation : t.englishTranslation;
    if (t.ruleType === 'never_translate') return `- "${t.originalTerm}": NEVER translate. Keep as-is.`;
    if (t.ruleType === 'preserve_original') return `- "${t.originalTerm}": Preserve original, do not translate.`;
    if (t.ruleType === 'custom_instruction') return `- "${t.originalTerm}": ${t.customInstruction || t.notes || 'Custom rule'}`;
    return `- "${t.originalTerm}": Translate as "${translation || t.originalTerm}"`;
  });
  return `\n\nGLOSSARY:\n${lines.join('\n')}\n`;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // This function is called by entity automations — no user auth needed (service role)
    const body = await req.json();
    const { event, data } = body;

    if (!event || !data) {
      return Response.json({ error: 'Missing event data' }, { status: 400 });
    }

    const entityName = event.entity_name;
    const entityId = event.entity_id;
    const eventType = event.type;

    if (!entityName || !TRANSLATABLE_FIELDS[entityName]) {
      return Response.json({ success: true, message: 'Entity not translatable', entityName });
    }

    // Check settings — is auto-translate enabled?
    let settings = null;
    try {
      const settingsList = await base44.asServiceRole.entities.TranslationSettings.list('-created_date', 1);
      settings = settingsList && settingsList.length > 0 ? settingsList[0] : null;
    } catch { /* settings optional */ }

    // If settings exist and auto-translate is explicitly disabled, skip
    if (settings && settings.autoTranslateNewContent === false && eventType === 'create') {
      return Response.json({ success: true, message: 'Auto-translate disabled in settings' });
    }

    const provider = settings?.defaultProvider || 'llm_builtin';
    const tone = settings?.defaultTone || 'formal';
    const protectManualEdits = settings?.protectManualEdits !== false;

    // Fetch glossary
    let glossaryTerms = [];
    try {
      glossaryTerms = await base44.asServiceRole.entities.GlossaryTerm.filter({ isActive: true });
    } catch { /* glossary optional */ }

    // Use data from event payload, or fetch if too large
    let record = data;
    if (!record && entityId) {
      record = await base44.asServiceRole.entities[entityName].get(entityId);
    }
    if (!record) {
      return Response.json({ success: true, message: 'No record data available' });
    }

    const fieldsToTranslate = TRANSLATABLE_FIELDS[entityName];

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
        if (!sourceLang) sourceLang = detectLanguage(String(baseValue));
      }
    }

    if (Object.keys(sourceData).length === 0) {
      return Response.json({ success: true, message: 'No translatable content found' });
    }

    const targetLang = sourceLang === 'en' ? 'de' : 'en';
    const targetSuffix = `_${targetLang}`;

    // Filter fields that need translation
    const toTranslate = {};
    for (const [field, value] of Object.entries(sourceData)) {
      if (record[`${field}${targetSuffix}`] && protectManualEdits) {
        // Skip fields that already have translations (protect manual edits)
      } else {
        toTranslate[field] = value;
      }
    }

    if (Object.keys(toTranslate).length === 0) {
      return Response.json({ success: true, message: 'All target fields already populated' });
    }

    const sourceLanguageName = sourceLang === 'de' ? 'German' : 'English';
    const targetLanguageName = targetLang === 'de' ? 'German' : 'English';

    // Create a TranslationJob record
    let job = null;
    try {
      job = await base44.asServiceRole.entities.TranslationJob.create({
        entityName,
        contentId: entityId,
        contentTitle: record.productTitle || record.brandName || record.collectionName || record.title || record.question || entityId,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        provider,
        status: 'in_progress',
        startedAt: new Date().toISOString(),
        triggerType: 'automatic'
      });
    } catch (e) { console.error('Failed to create job:', e); }

    const glossaryPrompt = buildGlossaryPrompt(glossaryTerms, targetLanguageName);
    const toneInstruction = tone === 'formal' ? 'Use formal register (Sie-form in German).' : 'Use informal register (Du-form in German).';

    const prompt = `You are a professional translator for luxury watch industry content. Translate the following JSON fields from ${sourceLanguageName} to ${targetLanguageName}.

CRITICAL RULES:
- Preserve technical watch terms exactly as-is.
- Preserve brand names exactly: Rolex, Patek Philippe, Omega, Cartier, Hublot, Breitling, etc.
- Preserve reference numbers, model numbers, and measurements exactly.
- Preserve any HTML or markdown formatting.
- Translate naturally and professionally for a luxury e-commerce context.
- ${toneInstruction}
- For SEO fields, translate each keyword/phrase, keeping them comma-separated.
${glossaryPrompt}

Source data (JSON):
${JSON.stringify(toTranslate, null, 2)}

Return ONLY a JSON object with the exact same keys, translated to ${targetLanguageName}.`;

    const schemaProperties = {};
    for (const field of Object.keys(toTranslate)) {
      schemaProperties[field] = { type: 'string' };
    }

    let llmResponse;
    try {
      llmResponse = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: 'object',
          properties: schemaProperties
        }
      });
    } catch (llmError) {
      if (job) {
        await base44.asServiceRole.entities.TranslationJob.update(job.id, {
          status: 'failed',
          errorMessage: llmError instanceof Error ? llmError.message : String(llmError),
          completedAt: new Date().toISOString()
        });
      }
      return Response.json({ error: 'Translation LLM call failed', details: llmError instanceof Error ? llmError.message : String(llmError) }, { status: 500 });
    }

    const updateData = {};
    let charCount = 0;
    for (const [field, translatedValue] of Object.entries(llmResponse)) {
      if (translatedValue && typeof translatedValue === 'string') {
        updateData[`${field}${targetSuffix}`] = translatedValue;
        charCount += translatedValue.length;
      }
    }

    if (Object.keys(updateData).length === 0) {
      if (job) {
        await base44.asServiceRole.entities.TranslationJob.update(job.id, {
          status: 'failed',
          errorMessage: 'LLM returned no usable translations',
          completedAt: new Date().toISOString()
        });
      }
      return Response.json({ error: 'LLM returned no usable translations' }, { status: 500 });
    }

    await base44.asServiceRole.entities[entityName].update(entityId, updateData);

    if (job) {
      await base44.asServiceRole.entities.TranslationJob.update(job.id, {
        status: 'completed',
        fieldsTranslated: Object.keys(updateData),
        characterCount: charCount,
        completedAt: new Date().toISOString()
      });
    }

    // Update quota
    if (settings) {
      try {
        await base44.asServiceRole.entities.TranslationSettings.update(settings.id, {
          charactersUsedThisMonth: (settings.charactersUsedThisMonth || 0) + charCount
        });
      } catch (e) { console.error('Failed to update quota:', e); }
    }

    return Response.json({
      success: true,
      entityName,
      entityId,
      jobId: job?.id || null,
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
      fieldsTranslated: Object.keys(updateData),
      characterCount: charCount
    });
  } catch (error) {
    console.error('autoTranslateEntity error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});