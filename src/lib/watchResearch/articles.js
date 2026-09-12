import { BRAND_RESEARCH } from './brands.js';
import { TOPICS, guideTopic } from './topics.js';
import { REVIEW_DATE, bilingual as b } from './sources.js';
import { TOPIC_DEPTH } from './guideDepth.js';
import { BRAND_ESSAYS } from './brandEssays.js';
import { GUIDE_SUMMARIES, BRAND_GUIDE_SUMMARIES } from './summaries.js';

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
  const essay = BRAND_ESSAYS[route.pageKey];
  const text = (value) => value[locale] || value.en;
  let title = cleanHeading(field(route.pageData, 'h1', locale) || field(route.pageData, 'title', locale));
  if (key === 'exceptional') title = text(b('Exceptional Audemars Piguet watches: what drives high prices?', 'Außergewöhnliche Audemars-Piguet-Uhren: Was treibt hohe Preise?'));
  const sections = [];
  const add = (id, heading, paragraphs, sources = []) => sections.push({ id, title: text(heading), paragraphs: paragraphs.map(text), sources });
  if (key === 'story') {
    add('origins', b('Milestones that explain the collection', 'Meilensteine, die die Kollektion erklären'), [brand.history], brand.sources);
    add('history-in-context', essay.heading, essay.story, essay.sources);
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
  if (route.pageData.isGuide && key === 'choice') {
    add('your-shortlist', b(`Build your ${route.brandName} shortlist`, `Ihre ${route.brandName}-Auswahl zusammenstellen`), [essay.choice]);
    add('compare-in-practice', b('Compare the watches as you would wear them', 'Die Uhren in Ihrer Tragesituation vergleichen'), [
      b('Try to compare shortlisted watches under the same conditions: similar lighting, the same camera distance and a properly adjusted strap or bracelet. A tightly cropped dial photograph and a wrist photograph are not equivalent evidence of size. If an in-person comparison is not possible, request measurements and a side view. Write down one advantage and one compromise for each finalist. This prevents a striking colour or a persuasive listing from obscuring the fit or function that motivated your search.', 'Vergleichen Sie die Auswahl möglichst unter gleichen Bedingungen: ähnliches Licht, gleicher Kameraabstand und passend eingestelltes Band. Ein enger Zifferblattausschnitt und ein Handgelenkfoto belegen Größe nicht gleichwertig. Ist persönliches Probieren unmöglich, bitten Sie um Maße und Seitenansicht. Notieren Sie für jeden Favoriten einen Vorteil und einen Kompromiss. So verdecken auffällige Farbe oder überzeugende Beschreibung nicht die ursprünglich gesuchte Passform oder Funktion.'),
      b('Once the reference is settled, compare the actual examples available rather than restarting the search by brand reputation. Confirm the condition, accessories and work that is documented, and ask what remains unknown. You should be able to explain why this particular watch suits your wrist and routine without relying on resale predictions. A clear choice is usually one whose important trade-offs you understand, not one with no trade-offs at all.', 'Vergleichen Sie nach der Referenzwahl konkrete Exemplare, statt wieder beim Markenruf anzufangen. Bestätigen Sie Zustand, Zubehör und belegte Arbeiten und fragen Sie nach offenen Punkten. Sie sollten begründen können, warum diese Uhr zu Handgelenk und Alltag passt, ohne Wiederverkaufsprognosen zu benötigen. Eine klare Wahl ist meist eine mit verstandenen Kompromissen, nicht eine ganz ohne Kompromisse.'),
    ]);
  }
  if (route.pageData.isGuide) {
    for (const extra of TOPIC_DEPTH[key] || []) add(extra.id, extra.title, extra.paragraphs, extra.sources);
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
    ? key === 'story' || key === 'choice' ? text(BRAND_GUIDE_SUMMARIES[route.pageKey][key])
        : text(GUIDE_SUMMARIES[key])
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
