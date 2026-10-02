import { CZECH_BRAND_PROFILES, CZECH_TOPICS, getCzechResearchArticle } from './watchResearch/czech.js';
import { CZECH_COLLECTION_DESCRIPTIONS } from './czechCollections.js';
import { guideTopic } from './watchResearch/topics.js';

// Model and collection names are identifiers and remain unchanged. Only the
// surrounding editorial language is localized; filters and URL slugs are not.
export function czechShoppingHeading(value) {
  const original = String(value || '').replace(/\s+(?:at|bei) Kariv Glamour.*$/i, '').split('|')[0].trim();
  const used = /Pre-Owned|Used/i.test(original);
  const women = /Women|Ladies/i.test(original);
  const men = !women && /\bMen/i.test(original);
  const automatic = /\bAutomatic\b/.test(original);
  const chronograph = /\bChronograph\b/.test(original);
  const name = original
    .replace(/Pilot['’]s Watch(?:es)?/g, '__PILOT_COLLECTION__')
    .replace(/^Buy\s+(?:(?:an?|the)\s+)?/i, '')
    .replace(/Pre-Owned|Used|Women['’]s|Men['’]s|Ladies['’]?|for Women|for Men|\bWatch(?:es)?\b|\bAutomatic\b|\bChronograph\b/gi, '')
    .replace(/__PILOT_COLLECTION__/g, 'Pilot’s Watches')
    .replace(/\s+/g, ' ').trim();
  return `${used ? 'Použité ' : automatic ? 'Automatické ' : ''}${chronograph ? 'chronografy' : 'hodinky'} ${name}${women ? ' pro ženy' : men ? ' pro muže' : ''}`.replace(/^./, (letter) => letter.toLocaleUpperCase('cs-CZ'));
}

export function applyCzechSeoPages(pages, brandName, pageKey) {
  for (const [slug, data] of Object.entries(pages)) {
    const article = data.isGuide ? getCzechResearchArticle({ slug, pageKey, brandName, pageData: data }) : null;
    const baseTitle = article?.title || czechShoppingHeading(data.h1_en || data.title_en);
    const subject = baseTitle.replace(/^./, (letter) => letter.toLocaleLowerCase('cs-CZ'));
    const title = !article && /^Buy\b/.test(data.h1_en || '') ? `Koupit ${subject}` : baseTitle;
    const descriptor = article?.sections[0].paragraphs[0] || `Prohlédněte si ${subject}. U každé nabídky porovnejte přesnou referenci, rozměry, stav, příslušenství a servisní historii.`;
    data.title_cs = `${title} | Kariv Glamour`;
    data.h1_cs = title;
    data.description_cs = descriptor;
    data.intro_cs = article?.sections[0].paragraphs[0] || `${descriptor} ${CZECH_BRAND_PROFILES[pageKey].inspect}`;
  }
}

const BRAND_NAMES = /Patek Philippe|Audemars Piguet|Girard-Perregaux|Jaeger-LeCoultre|IWC Schaffhausen|Grand Seiko|TAG Heuer|Rolex|Omega|Cartier|Breitling|Hublot|IWC|Tudor|Panerai|Bvlgari|Bulgari/g;
const LABELS = {
  'Heritage': 'Tradice', 'Craftsmanship': 'Řemeslo', 'Care': 'Péče',
  'The {brand} Story': 'Historie značky {brand}', '{brand} Story': 'Historie značky {brand}',
  'Read the {brand} Story': 'Přečíst historii značky {brand}', '{brand} heritage': 'Tradice značky {brand}',
  'professional watches': 'Profesionální hodinky', 'classic {brand} design': 'Klasický design {brand}',
  '{brand} Watchmaking': 'Hodinářství {brand}', 'Explore {brand} Watchmaking': 'Objevte hodinářství {brand}',
  'Oyster case': 'Pouzdro Oyster', 'automatic movements': 'Automatické strojky', 'materials': 'Materiály', 'bracelets': 'Náramky',
  '{brand} Maintenance': 'Servis a péče o {brand}', 'Learn About {brand} Maintenance': 'Více o péči o {brand}',
  'service history': 'Servisní historie', 'box and papers': 'Krabička a doklady', 'condition grading': 'Hodnocení stavu',
  'Which {brand} to Buy?': 'Jak vybrat hodinky {brand}?', '{brand} New or Pre-Owned?': '{brand}: nové, nebo použité?',
  '{brand} Box and Papers Guide': '{brand}: krabička a doklady', '{brand} with Box and Papers': '{brand} s krabičkou a doklady',
  '{brand} Box and Papers': '{brand}: krabička a doklady',
  '{brand} Maintenance and Care': 'Servis a péče o {brand}', 'Selected Pre-Owned Watches': 'Vybrané použité hodinky',
  'Vintage Watches': 'Historické hodinky', 'Men’s Luxury Watches': 'Pánské luxusní hodinky', 'Women’s Luxury Watches': 'Dámské luxusní hodinky',
  'Dive Watches': 'Potápěčské hodinky', 'Chronograph Watches': 'Chronografy', 'Travel / GMT Watches': 'Cestovní hodinky / GMT',
  'Dress Watches': 'Společenské hodinky', '{brand} Buying Guide': 'Průvodce výběrem {brand}',
  'Authentication Process': 'Ověřování pravosti', 'Returns and Refunds': 'Vrácení zboží a peněz', 'Shipping Policy': 'Informace o dopravě',
  'Contact Customer Service': 'Kontaktovat zákaznickou podporu', 'Transparent product descriptions': 'Podrobné popisy produktů',
  'Clear condition grading': 'Přehledné hodnocení stavu', 'Box and papers information': 'Údaje o krabičce a dokladech',
  'Reference number visibility': 'Uvedené referenční číslo', 'Secure checkout': 'Bezpečné objednání', 'Insured shipping': 'Pojištěná přeprava',
  'Customer support before purchase': 'Podpora před nákupem', 'No replica or counterfeit watches': 'Žádné repliky ani padělky',
  'Geneva watchmaking': 'Ženevské hodinářství', 'collector prestige': 'Sběratelská prestiž', 'rare craftsmanship': 'Vzácné řemeslo',
  'complications': 'Komplikace', 'manual-winding and self-winding movements': 'Strojky s ručním a automatickým nátahem',
  'case materials': 'Materiály pouzder', 'reference numbers': 'Referenční čísla', 'archives extract': 'Výpis z archivu',
  '{brand} Archives Extract Guide': '{brand}: výpis z archivu', 'Perpetual Calendar Watches': 'Hodinky s věčným kalendářem',
  'Annual Calendar Watches': 'Hodinky s ročním kalendářem', 'Moon Phase Watches': 'Hodinky s měsíční fází',
  'World Time Watches': 'Hodinky se světovým časem', 'Minute Repeater Watches': 'Hodinky s minutovou repeticí',
  'Luxury Sports Watches': 'Luxusní sportovní hodinky', 'Complication Watches': 'Hodinky s komplikacemi',
  'Investment-Conscious Watches': 'Hodinky a jejich hodnota', 'Box, Papers and Archives Extract': 'Krabička, doklady a archivní výpis',
  'Box and Papers Guide': 'Průvodce krabičkou a doklady', 'Archives Extract Guide': 'Průvodce archivním výpisem',
  'Archives extract information where available': 'Údaje o archivním výpisu, jsou-li dostupné',
  'Service history visibility where available': 'Dostupná servisní historie', 'space exploration': 'Kosmický výzkum',
  'ocean performance': 'Podvodní využití', 'precision timing': 'Přesné měření času', 'Co-Axial movements': 'Strojky Co-Axial',
  'calibre numbers': 'Čísla kalibrů', 'watch case materials': 'Materiály pouzder hodinek', 'water resistance': 'Vodotěsnost',
  'dive watch care': 'Péče o potápěčské hodinky', '{brand} collection': 'Kolekce {brand}',
  'Which {brand} should I buy first?': 'Které {brand} si vybrat jako první?', 'Speedmaster or Seamaster': 'Speedmaster, nebo Seamaster',
  '{brand} Speedmaster or Seamaster?': '{brand} Speedmaster, nebo Seamaster?', 'Co-Axial movement': 'Strojek Co-Axial',
  'returns': 'Vrácení zboží', 'GMT Watches': 'Hodinky GMT', 'Sports Watches': 'Sportovní hodinky',
  'Service History Guide': 'Průvodce servisní historií', 'Calibre information where available': 'Dostupné informace o kalibru',
  'Popular {brand} Searches': 'Oblíbené hledání: {brand}', '{brand} Collections': 'Kolekce {brand}',
  'Related Watch Categories': 'Další kategorie hodinek', 'Women’s watches': 'Dámské hodinky', 'Men’s watches': 'Pánské hodinky',
  'Square & rectangular watches': 'Čtvercové a obdélníkové hodinky', 'Gold watches': 'Zlaté hodinky',
  'Related Luxury Watch Brands': 'Další značky luxusních hodinek', 'Product-Specific Pages': 'Konkrétní modely',
  'Skeleton Watches': 'Skeletované hodinky', 'Ceramic Watches': 'Keramické hodinky', 'Limited Edition Watches': 'Limitované edice hodinek',
  '{brand} Ceramic Watches': 'Keramické hodinky {brand}', '{brand} Skeleton Watches': 'Skeletované hodinky {brand}',
  '{brand} Materials Guide': 'Průvodce materiály {brand}', 'Pilot Watches': 'Pilotní hodinky', 'Aviation Watches': 'Letecké hodinky',
  'Popular AP Searches': 'Oblíbené hledání: AP', 'AP Collections': 'Kolekce AP', 'Pre-Owned AP': 'Použité AP',
  'Tourbillon Watches': 'Hodinky s tourbillonem', 'Pre-Owned AP Guide': 'Průvodce použitými AP', 'AP Price Guide': 'Průvodce cenami AP',
  'Buy & Pre-Owned': 'Nákup a použité hodinky', 'Guides & Resources': 'Průvodce a informace',
  'Snowflake vs Shunbun': 'Snowflake a Shunbun: porovnání', 'Pre-Owned': 'Použité', 'Automatic': 'Automatické',
  'Popular JLC Searches': 'Oblíbené hledání: JLC', 'JLC Collections': 'Kolekce JLC', '{brand} Watch Prices': 'Ceny hodinek {brand}',
  '{brand} Old Models': 'Starší modely {brand}', 'Buying Pre-Owned JLC': 'Nákup použitých JLC',
  'Carrera vs Formula 1': 'Carrera a Formula 1: porovnání', 'Chronograph': 'Chronograf', "Men's": 'Pánské', "Women's": 'Dámské',
  'Black Bay Families': 'Rodiny Black Bay', 'Black Bay vs Pelagos': 'Black Bay a Pelagos: porovnání', '{brand} Watch Price': 'Cena hodinek {brand}',
  'Models & Features': 'Modely a vlastnosti', 'Luminor vs Radiomir': 'Luminor a Radiomir: porovnání',
  'Luminor vs Submersible': 'Luminor a Submersible: porovnání', 'High Jewellery Watches': 'Hodinky vysokého šperkařství',
  '{brand} Spelling Variants': 'Varianty názvu {brand}', 'Collector & Vintage': 'Sběratelské a historické modely',
  'Older {brand} Models': 'Starší modely {brand}', 'Vintage {brand} Watches': 'Historické hodinky {brand}',
  'Vintage Models': 'Historické modely', 'Rare GP Watches Guide': 'Průvodce vzácnými hodinkami GP',
};
const NORMALIZED_LABELS = new Map(Object.entries(LABELS).map(([key, value]) => [key.toLowerCase(), value]));

export function czechBrandLabel(value) {
  const text = String(value || '');
  const brand = text.match(BRAND_NAMES)?.[0] || '';
  const normalized = text.replace(BRAND_NAMES, '{brand}');
  const direct = NORMALIZED_LABELS.get(normalized.toLowerCase());
  if (direct) return direct.replaceAll('{brand}', brand);
  if (/ Guide$/i.test(text)) return `${czechBrandLabel(text.replace(/^The /, '').replace(/ Guide$/i, ''))} – průvodce`;
  if (/^Buying Pre-Owned /i.test(text)) return czechShoppingHeading(text.replace(/^Buying /i, ''));
  if (/\bBuy\b|\bPre-Owned\b|\bUsed\b|\bWatch(?:es)?\b|\bAutomatic\b|\bChronograph\b|\bfor (?:Men|Women)\b|\b(?:Men|Women)['’]s\b/i.test(text)) return czechShoppingHeading(text);
  // Untranslated collection and model identifiers (Nautilus, Moonwatch, etc.)
  // are proper names, not a fallback to English prose.
  return text;
}

const firstSentence = (text) => text.match(/^.*?[.!?](?:\s|$)/)?.[0].trim() || text;
function cardDescription(record, brandKey) {
  const title = record.title_en || record.label_en || '';
  const link = record.link || record.to || '';
  const path = link.replace(/^\//, '').replace(/\//g, '-');
  const topic = guideTopic(path);
  const brand = CZECH_BRAND_PROFILES[brandKey];
  if (/story|heritage/i.test(link + ' ' + title)) return brand.history;
  if (topic && CZECH_TOPICS[topic]) return firstSentence(CZECH_TOPICS[topic].paragraphs[0]);
  if (/box|papers|archives/i.test(title)) return firstSentence(CZECH_TOPICS[/archives/i.test(title) ? 'archives' : 'papers'].paragraphs[0]);
  if (/price/i.test(title)) return firstSentence(CZECH_TOPICS.price.paragraphs[0]);
  if (/materials/i.test(title)) return 'Porovnejte materiály pouzdra, jejich povrch, hmotnost a možnosti servisu. U použitého kusu rozlišujte škrábance, odštípnutí a pozdější opravy.';
  const models = Object.entries(CZECH_COLLECTION_DESCRIPTIONS[brandKey]).sort(([left], [right]) => right.length - left.length);
  const exact = models.find(([name]) => title.toLowerCase().includes(name.toLowerCase()));
  if (exact) return exact[1];
  if (/pre-owned|used/i.test(title)) return brand.inspect;
  return brand.choose;
}

export function applyCzechBrandContent(brandKey, ...groups) {
  function visit(value) {
    if (Array.isArray(value)) return value.forEach(visit);
    if (!value || typeof value !== 'object') return;
    for (const field of ['title', 'label', 'text', 'cta', 'eyebrow']) {
      if (typeof value[`${field}_en`] === 'string' && !value[`${field}_cs`]) value[`${field}_cs`] = czechBrandLabel(value[`${field}_en`]);
    }
    if (value.shortDescription_en) value.shortDescription_cs = CZECH_COLLECTION_DESCRIPTIONS[brandKey][value.name];
    if (value.description_en && !value.description_cs) value.description_cs = CZECH_COLLECTION_DESCRIPTIONS[brandKey][value.name] || cardDescription(value, brandKey);
    for (const entry of Object.values(value)) if (entry && typeof entry === 'object') visit(entry);
  }
  groups.forEach(visit);
}
