import { BRAND_RESEARCH } from './brands.js';
import { TOPICS, guideTopic } from './topics.js';
import { REVIEW_DATE, bilingual as b } from './sources.js';

const field = (data, name, locale) => data[`${name}_${locale}`] || data[name] || '';
export function cleanHeading(value) {
  return value.replace(/\s+(?:at|bei) Kariv Glamour/gi, '').replace(/\s*\|.*$/, '').trim();
}

export function getResearchArticle(route, locale = 'en') {
  const brand = BRAND_RESEARCH[route.pageKey];
  if (!brand) return null;
  const key = route.pageData.isGuide ? guideTopic(route.slug) : 'choice';
  const topic = TOPICS[key];
  if (!topic) return null; // A missing topic is a content error, never generic fallback copy.
  const text = (value) => value[locale] || value.en;
  let title = cleanHeading(field(route.pageData, 'h1', locale) || field(route.pageData, 'title', locale));
  if (key === 'exceptional') title = text(b('Exceptional Audemars Piguet watches: what drives high prices?', 'Außergewöhnliche Audemars-Piguet-Uhren: Was treibt hohe Preise?'));
  const sections = [];
  const add = (id, heading, paragraphs, sources = []) => sections.push({ id, title: text(heading), paragraphs: paragraphs.map(text), sources });
  if (key === 'story') {
    add('origins', b('Milestones that explain the collection', 'Meilensteine, die die Kollektion erklären'), [brand.history], brand.sources);
  }
  add('understand', topic.heading, [topic.answer, topic.detail], topic.sources);
  if (key === 'maintenance') {
    const maintenance = {
      rolex: b('Rolex recommends servicing approximately every ten years, depending on model and real-life use. That is a general manufacturer recommendation, not a reason to ignore a fault or to assume an undocumented used watch is not due for work.', 'Rolex empfiehlt ungefähr alle zehn Jahre eine Wartung, abhängig von Modell und tatsächlicher Nutzung. Das ist eine allgemeine Herstellerempfehlung, kein Grund, einen Defekt zu ignorieren oder eine undokumentierte gebrauchte Uhr als wartungsfrei einzustufen.'),
      patekPhilippe: b('Patek Philippe states a commitment to servicing, repairing or restoring its watches regardless of age. This does not mean every repair is immediate or inexpensive: condition, complication and parts work influence the estimate and turnaround. Discuss preservation of original components before authorising restoration.', 'Patek Philippe erklärt, seine Uhren unabhängig vom Alter warten, reparieren oder restaurieren zu können. Das bedeutet keine sofortige oder günstige Reparatur: Zustand, Komplikation und Teilearbeit bestimmen Aufwand und Frist. Klären Sie den Erhalt originaler Komponenten vor einer Restaurierungsfreigabe.'),
      omega: b('For an Omega, identify the calibre as well as the case reference when arranging service. Co-Axial and Master Chronometer are technical descriptions, not promises of permanent lubrication or water resistance. Ask for a movement assessment and a separate sealing test if you intend to use the watch in water.', 'Geben Sie beim Omega-Service neben der Gehäusereferenz auch das Kaliber an. Co-Axial und Master Chronometer sind technische Angaben, keine Zusagen dauerhafter Schmierung oder Dichtheit. Fordern Sie eine Werkprüfung und bei geplanter Wassernutzung eine separate Dichtigkeitsprüfung an.'),
    };
    add('manufacturer-guidance', b('Manufacturer guidance and its limits', 'Herstellerhinweise und ihre Grenzen'), [maintenance[route.pageKey]], route.pageKey === 'rolex' ? ['rolexCare'] : route.pageKey === 'patekPhilippe' ? ['patekService'] : ['metas', 'omegaTechnology']);
  } else {
    add('brand-context', b(`How this applies to ${route.brandName}`, `Was das für ${route.brandName} bedeutet`), [key === 'story' || key === 'choice' || !route.pageData.isGuide ? brand.choose : brand.inspect]);
  }
  add('next-step', b('Put the information to work', 'So nutzen Sie die Informationen'), [topic.action]);
  if (key === 'choice' || key === 'story') {
    add('condition', b('What to check on an individual watch', 'Was Sie an der einzelnen Uhr prüfen sollten'), [brand.inspect], route.pageKey === 'audemarsPiguet' ? ['apNumbers'] : []);
  }
  const sources = [...new Set(sections.flatMap((section) => section.sources))];
  // Choice articles link the manufacturer's collection/history without implying
  // that our original purchasing checklist is a manufacturer guarantee.
  if (!sources.length) sources.push(...brand.sources.slice(0, 1));
  const excerpt = route.pageData.isGuide
    ? text(b(`${title} Practical guidance on reference differences, ownership and the checks to make before buying.`, `${title} Praktische Hinweise zu Referenzunterschieden, Nutzung und wichtigen Prüfungen vor dem Kauf.`))
    : text(b(`Compare ${route.brandName} watches by exact reference, condition and included accessories. Explore available listings and informed buying advice.`, `Vergleichen Sie ${route.brandName}-Uhren nach Referenz, Zustand und Zubehör. Entdecken Sie verfügbare Angebote und praktische Kaufhinweise.`));
  const words = sections.flatMap((s) => s.paragraphs).join(' ').split(/\s+/).length;
  return { title, excerpt, sections, sources, dateModified: REVIEW_DATE, readMinutes: Math.max(2, Math.ceil(words / 200)), topic: key };
}

// Only true search-intent aliases are consolidated. Model, gender and movement
// landing pages retain their own URLs and filters.
export function canonicalSeoSlug(route, routes) {
  const existing = new Set(routes.map((item) => item.slug));
  const explicit = {
    'was-kostet-eine-audemars-piguet-uhr': 'audemars-piguet-uhr-preis',
    'was-kostet-eine-jaeger-lecoultre-uhr': 'jaeger-lecoultre-uhren-preise',
    'vintage-girard-perregaux-uhren': 'girard-perregaux-alte-modelle',
    'bvlgari-serpenti-watch': 'bvlgari-serpenti-guide',
    'omega-watchmaking': 'omega-co-axial-guide',
    'bulgari-uhr': 'bvlgari-kaufen',
    'bulgari-uhren': 'bvlgari-kaufen',
    'tag-heuer-uhren-herren': 'tag-heuer-uhr-herren',
  }[route.slug];
  if (explicit && existing.has(explicit)) return explicit;
  if (route.pageData.isGuide) return route.slug;
  const suffix = route.slug.startsWith(`${route.brandSlug}-`) ? route.slug.slice(route.brandSlug.length + 1) : '';
  if (['uhr', 'uhren', 'watches', 'kaufen', 'uhr-kaufen'].includes(suffix)) {
    return [`${route.brandSlug}-kaufen`, `${route.brandSlug}-uhr-kaufen`].find((slug) => existing.has(slug)) || route.slug;
  }
  if (['gebraucht', 'gebraucht-kaufen', 'uhr-gebraucht'].includes(suffix) || route.slug === `gebrauchte-${route.brandSlug}-uhren` || route.slug === `gebrauchte-${route.brandSlug}`) {
    return [`${route.brandSlug}-gebraucht-kaufen`, `${route.brandSlug}-gebraucht`].find((slug) => existing.has(slug)) || route.slug;
  }
  return route.slug;
}
