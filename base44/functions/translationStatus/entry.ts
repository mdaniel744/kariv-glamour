import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const TRANSLATABLE_FIELDS = {
  Products: ['productTitle', 'productDescription', 'shortDescription', 'metaTitle', 'metaDescription', 'seoKeywords'],
  Brands: ['brandName', 'shortDescription', 'longDescription', 'seoTitle', 'seoDescription', 'seoKeywords'],
  Collections: ['collectionName', 'description', 'seoTitle', 'seoDescription', 'seoKeywords'],
  FAQ: ['question', 'answer'],
  LegalPages: ['title', 'content', 'seoTitle', 'seoDescription'],
  WatchGuides: ['title', 'content', 'excerpt', 'seoTitle', 'seoDescription', 'seoKeywords']
};
const BATCH_SIZE = 100;
const MAX_RECORDS = 5000;

function detectLanguage(text) {
  const sample = ' ' + text.toLowerCase() + ' ';
  const de = [' der ', ' die ', ' das ', ' und ', ' mit ', ' für ', ' von ', ' zu ', ' den ', ' eine ', ' ist ', ' auf ', ' auch ', ' sich ', ' bei ', ' dem ', ' nicht ', ' wie ', ' wir ', ' ihnen ', ' ihre ', ' über '];
  const en = [' the ', ' and ', ' with ', ' for ', ' from ', ' to ', ' is ', ' on ', ' also ', ' are ', ' was ', ' this ', ' that ', ' have ', ' has ', ' your ', ' you ', ' our ', ' we ', ' a ', ' an '];
  let deC = 0, enC = 0;
  for (const w of de) { if (sample.includes(w)) deC++; }
  for (const w of en) { if (sample.includes(w)) enC++; }
  return deC > enC ? 'de' : 'en';
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

    // FAIL CLOSED: require authenticated admin
    const user = await requireAdmin(base44);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const results = [];
    let totalProcessed = 0;

    for (const [entityName, fields] of Object.entries(TRANSLATABLE_FIELDS)) {
      if (totalProcessed >= MAX_RECORDS) break;

      try {
        let skip = 0;
        let hasMore = true;
        let entityTotal = 0;
        let entityEnComplete = 0;
        let entityDeComplete = 0;
        let entityEnMissing = 0;
        let entityDeMissing = 0;
        const items = [];

        while (hasMore && totalProcessed < MAX_RECORDS) {
          const batch = await base44.asServiceRole.entities[entityName].list('-created_date', BATCH_SIZE, skip);
          if (!batch || batch.length === 0) { hasMore = false; break; }

          for (const record of batch) {
            entityTotal++;
            totalProcessed++;
            if (totalProcessed > MAX_RECORDS) { hasMore = false; break; }

            let enFieldsFilled = 0;
            let deFieldsFilled = 0;

            for (const field of fields) {
              const enValue = record[`${field}_en`];
              const deValue = record[`${field}_de`];
              const baseValue = record[field];
              if (enValue || (baseValue && detectLanguage(String(baseValue)) === 'en')) enFieldsFilled++;
              if (deValue || (baseValue && detectLanguage(String(baseValue)) === 'de')) deFieldsFilled++;
            }

            const enComplete = enFieldsFilled === fields.length;
            const deComplete = deFieldsFilled === fields.length;

            if (enComplete) entityEnComplete++; else entityEnMissing++;
            if (deComplete) entityDeComplete++; else entityDeMissing++;

            const title = record.productTitle || record.brandName || record.collectionName || record.title || record.question || record.id;
            items.push({
              id: record.id, title, entityName,
              enStatus: enComplete ? 'translated' : (enFieldsFilled > 0 ? 'partial' : 'not_translated'),
              deStatus: deComplete ? 'translated' : (deFieldsFilled > 0 ? 'partial' : 'not_translated'),
              enFieldsFilled, deFieldsFilled, totalFields: fields.length,
              updatedDate: record.updated_date || record.created_date
            });
          }

          if (batch.length === BATCH_SIZE && hasMore) { skip += BATCH_SIZE; } else { hasMore = false; }
        }

        results.push({ entityName, total: entityTotal, enComplete: entityEnComplete, deComplete: entityDeComplete, enMissing: entityEnMissing, deMissing: entityDeMissing, items });
      } catch (e) {
        results.push({ entityName, error: 'Failed to fetch status', total: 0, items: [] });
      }
    }

    const summary = {
      totalContent: results.reduce((s, r) => s + (r.total || 0), 0),
      totalEnComplete: results.reduce((s, r) => s + (r.enComplete || 0), 0),
      totalDeComplete: results.reduce((s, r) => s + (r.deComplete || 0), 0),
      totalEnMissing: results.reduce((s, r) => s + (r.enMissing || 0), 0),
      totalDeMissing: results.reduce((s, r) => s + (r.deMissing || 0), 0),
      truncated: totalProcessed >= MAX_RECORDS
    };

    return Response.json({ success: true, summary, entities: results });
  } catch (error) {
    console.error('translationStatus error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});