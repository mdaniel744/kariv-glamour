import { applyCzechSeoPages, applyCzechBrandContent } from './czechBrandData.js';
import { applyCzechBrandFaqs } from './czechBrandFaqs.js';

// TAG Heuer collections, filters, and SEO data
// TAG Heuer is positioned around motorsport heritage, racing chronographs,
// dive watches (Aquaracer), sport watches (Formula 1), the square Monaco icon,
// and the Connected Calibre E5 luxury smartwatch collection.

const TAG_HEUER_COLLECTION_ASSET_BASE = '/brand-assets/tag-heuer/collections';
const TAG_HEUER_PAGE_ASSET_BASE = '/brand-assets/tag-heuer/page';

const COLLECTION_IMAGES = {
  carrera: `${TAG_HEUER_COLLECTION_ASSET_BASE}/tag-heuer-carrera-collection.png`,
  formula1: `${TAG_HEUER_COLLECTION_ASSET_BASE}/tag-heuer-formula-1-collection.png`,
  aquaracer: `${TAG_HEUER_COLLECTION_ASSET_BASE}/tag-heuer-aquaracer-collection.png`,
  monaco: `${TAG_HEUER_COLLECTION_ASSET_BASE}/tag-heuer-monaco-collection.png`,
  connected: `${TAG_HEUER_COLLECTION_ASSET_BASE}/tag-heuer-connected-collection.png`,
  connectedCalibreE5: `${TAG_HEUER_COLLECTION_ASSET_BASE}/tag-heuer-connected-calibre-e5-collection.png`,
  link: `${TAG_HEUER_COLLECTION_ASSET_BASE}/tag-heuer-link-collection.png`,
  monza: `${TAG_HEUER_COLLECTION_ASSET_BASE}/tag-heuer-monza-collection.png`,
};

export const TH_PAGE_IMAGES = {
  hero: `${TAG_HEUER_PAGE_ASSET_BASE}/tag-heuer-hero.png`,
  story: `${TAG_HEUER_PAGE_ASSET_BASE}/tag-heuer-hero.avif`,
  carreraChronograph: `${TAG_HEUER_PAGE_ASSET_BASE}/tag-heuer-carrera-chronograph.avif`,
  connectedCalibreE5: `${TAG_HEUER_PAGE_ASSET_BASE}/tag-heuer-connected-calibre-e5.avif`,
  preOwned: `${TAG_HEUER_PAGE_ASSET_BASE}/tag-heuer-pre-owned.jpg`,
  aquaracer300m: `${TAG_HEUER_PAGE_ASSET_BASE}/tag-heuer-aquaracer-300m.png`,
  carreraVsFormula1: `${TAG_HEUER_PAGE_ASSET_BASE}/tag-heuer-carrera-vs-formula-1.webp`,
};

export const TH_HERO_IMAGE = TH_PAGE_IMAGES.hero;
export const TH_STORY_IMAGE = TH_PAGE_IMAGES.story;

export const TH_COLLECTIONS = [
  { id: 1, name: 'Carrera', slug: 'carrera', image: COLLECTION_IMAGES.carrera,
    shortDescription_en: "TAG Heuer's racing-inspired collection, known for chronographs, clean sport-dress design, and strong motorsport heritage.",
    shortDescription_de: 'TAG Heuers Rennbahn-inspirierte Kollektion, bekannt für Chronographen, klares Sport-Dress-Design und starke Motorsport-Heritage.' },
  { id: 2, name: 'Formula 1', slug: 'formula-1', image: COLLECTION_IMAGES.formula1,
    shortDescription_en: 'A sporty TAG Heuer collection with bold racing character, everyday durability, quartz and automatic options, and chronograph models.',
    shortDescription_de: 'Eine sportliche TAG Heuer Kollektion mit mutigem Renncharakter, alltäglicher Haltbarkeit, Quarz- und Automatik-Optionen und Chronograph-Modellen.' },
  { id: 3, name: 'Aquaracer', slug: 'aquaracer', image: COLLECTION_IMAGES.aquaracer,
    shortDescription_en: 'A robust TAG Heuer dive and adventure collection, including 300M models built for water resistance, outdoor performance, and sport style.',
    shortDescription_de: 'Eine robuste TAG Heuer Tauch- und Abenteuer-Kollektion, einschließlich 300M Modelle für Wasserfestigkeit, Outdoor-Performance und Sport-Stil.' },
  { id: 4, name: 'Monaco', slug: 'monaco', image: COLLECTION_IMAGES.monaco,
    shortDescription_en: 'A square-case TAG Heuer icon associated with racing heritage, bold design, and chronograph character.',
    shortDescription_de: 'Ein TAG Heuer Quadratgehäuse-Ikonen, der mit Rennsport-Heritage, mutigem Design und Chronograph-Charakter verbunden ist.' },
  { id: 5, name: 'Connected', slug: 'connected', image: COLLECTION_IMAGES.connected,
    shortDescription_en: "TAG Heuer's luxury smartwatch collection, including Connected Calibre E5 models for sport, wellness, golf, running, and digital performance.",
    shortDescription_de: 'TAG Heuers Luxus-Smartwatch-Kollektion, einschließlich Connected Calibre E5 Modelle für Sport, Wellness, Golf, Laufen und digitale Performance.' },
  { id: 6, name: 'Connected Calibre E5', slug: 'connected-calibre-e5', image: COLLECTION_IMAGES.connectedCalibreE5,
    shortDescription_en: "TAG Heuer's latest generation luxury smartwatch with Calibre E5, offering sport, golf, running, and wellness features in 40 mm and 45 mm cases.",
    shortDescription_de: 'TAG Heuers neueste Generation Luxus-Smartwatch mit Calibre E5 — bietet Sport-, Golf-, Lauf- und Wellness-Funktionen in 40 mm und 45 mm Gehäusen.' },
  { id: 7, name: 'Link', slug: 'link', image: COLLECTION_IMAGES.link,
    shortDescription_en: 'A refined TAG Heuer collection known for its integrated bracelet style and smooth everyday luxury character.',
    shortDescription_de: 'Eine verfeinerte TAG Heuer Kollektion, bekannt für ihren integrierten Armband-Stil und den sanften, alltäglichen Luxus-Charakter.' },
  { id: 8, name: 'Monza', slug: 'monza', image: COLLECTION_IMAGES.monza,
    shortDescription_en: 'A heritage-inspired TAG Heuer line with strong motorsport identity, best handled as a vintage, special edition, or collector-focused page.',
    shortDescription_de: 'Eine heritage-inspirierte TAG Heuer Linie mit starker Motorsport-Identität — am besten als Vintage-, Sonderedition- oder sammlerfokussierte Seite behandelt.' },
];

export const TH_CASE_MATERIALS = ['Stainless Steel', 'Titanium', 'Black DLC Titanium', 'Ceramic', 'Gold', 'Rose Gold', 'Carbon', 'Diamond-set', 'Two-tone'];
export const TH_MOVEMENTS = ['Automatic', 'Quartz', 'Calibre Heuer 02', 'Solargraph', 'Tourbillon', 'Connected Calibre E5', 'GMT'];
export const TH_DIAL_COLORS = ['Black', 'Blue', 'Green', 'White', 'Silver', 'Grey', 'Skeleton', 'Red'];
export const TH_FEATURES = ['Chronograph', 'GMT', 'Tourbillon', 'Solargraph', 'Date', '300M water resistance', 'Tachymeter', 'Ceramic bezel', 'Limited edition', 'Connected Calibre E5', 'Full set', 'Calibre Heuer 02'];
export const TH_WATCH_TYPES = ['Mechanical', 'Quartz', 'Smartwatch'];
export const TH_BRACELETS = ['Steel', 'Rubber', 'Leather', 'Textile', 'Titanium', 'Interchangeable'];
export const TH_CASE_SIZES = ['29 mm', '32 mm', '36 mm', '39 mm', '40 mm', '41 mm', '42 mm', '43 mm', '44 mm', '45 mm'];
export const TH_TYPES = ['New', 'Pre-Owned', 'Vintage'];
export const TH_BOX_PAPERS = ['Box included', 'Papers included', 'Full set'];
export const TH_AVAILABILITY = ['In Stock', 'Reserved', 'Coming Soon', 'Sold'];

export const TH_QUICK_FILTERS = [
  { label_en: 'Carrera', label_de: 'Carrera', link: '/tag-heuer/carrera', filter: { collection: 'Carrera' } },
  { label_en: 'Aquaracer', label_de: 'Aquaracer', link: '/tag-heuer/aquaracer', filter: { collection: 'Aquaracer' } },
  { label_en: 'Formula 1', label_de: 'Formula 1', link: '/tag-heuer/formula-1', filter: { collection: 'Formula 1' } },
  { label_en: 'Monaco', label_de: 'Monaco', link: '/tag-heuer/monaco', filter: { collection: 'Monaco' } },
  { label_en: 'Connected', label_de: 'Connected', link: '/tag-heuer/connected', filter: { collection: 'Connected' } },
  { label_en: 'Chronograph', label_de: 'Chronograph', link: '/tag-heuer-chronograph', filter: { search: 'Chronograph' } },
  { label_en: "Men's", label_de: 'Herren', link: '/tag-heuer-uhr-herren', filter: { gender: 'Men' } },
  { label_en: 'Pre-Owned', label_de: 'Gebraucht', link: '/tag-heuer-gebraucht', filter: { preOwned: true } },
];

export const TH_SEO_CARDS = [
  { title_en: 'TAG Heuer Watch', title_de: 'TAG Heuer Uhr', link: '/tag-heuer-uhr',
    image: TH_PAGE_IMAGES.hero,
    description_en: 'Explore TAG Heuer watches at Kariv Glamour — motorsport heritage, racing chronographs, Aquaracer dive watches, Formula 1 sport models, Monaco, and Connected smartwatches.',
    description_de: 'Entdecken Sie TAG Heuer Uhren bei Kariv Glamour — Motorsport-Heritage, Renn-Chronographen, Aquaracer Tauchuhren, Formula 1 Sportmodelle, Monaco und Connected Smartwatches.' },
  { title_en: 'TAG Heuer Carrera', title_de: 'TAG Heuer Carrera', link: '/tag-heuer/carrera',
    image: TH_PAGE_IMAGES.carreraChronograph,
    description_en: 'Discover the TAG Heuer Carrera collection — racing-inspired chronographs with Heuer 02 caliber, clean design, and motorsport heritage.',
    description_de: 'Entdecken Sie die TAG Heuer Carrera Kollektion — Rennsport-inspirierte Chronographen mit Heuer 02 Kaliber, klarem Design und Motorsport-Heritage.' },
  { title_en: 'TAG Heuer Aquaracer', title_de: 'TAG Heuer Aquaracer', link: '/tag-heuer/aquaracer',
    image: TH_PAGE_IMAGES.aquaracer300m,
    description_en: 'Discover TAG Heuer Aquaracer dive watches — 300M water resistance, ceramic bezels, and robust construction for adventure and sport.',
    description_de: 'Entdecken Sie TAG Heuer Aquaracer Tauchuhren — 300M Wasserfestigkeit, keramische Lünetten und robuste Konstruktion für Abenteuer und Sport.' },
  { title_en: 'TAG Heuer Formula 1', title_de: 'TAG Heuer Formula 1', link: '/tag-heuer/formula-1',
    image: TH_PAGE_IMAGES.carreraVsFormula1,
    description_en: 'Discover TAG Heuer Formula 1 — sporty watches with racing character, quartz and automatic options, and chronograph models.',
    description_de: 'Entdecken Sie TAG Heuer Formula 1 — sportliche Uhren mit Renncharakter, Quarz- und Automatik-Optionen und Chronograph-Modellen.' },
  { title_en: 'TAG Heuer Monaco', title_de: 'TAG Heuer Monaco', link: '/tag-heuer/monaco',
    image: TH_PAGE_IMAGES.story,
    description_en: 'Discover the TAG Heuer Monaco — a square-case chronograph with racing heritage and bold, iconic design.',
    description_de: 'Entdecken Sie die TAG Heuer Monaco — ein Quadratgehäuse-Chronograph mit Rennsport-Heritage und mutigem, ikonischen Design.' },
  { title_en: 'TAG Heuer Connected Calibre E5', title_de: 'TAG Heuer Connected Calibre E5', link: '/tag-heuer/connected-calibre-e5',
    image: TH_PAGE_IMAGES.connectedCalibreE5,
    description_en: 'Discover TAG Heuer Connected Calibre E5 — luxury smartwatches with sport, golf, running, and wellness features in 40 mm and 45 mm.',
    description_de: 'Entdecken Sie TAG Heuer Connected Calibre E5 — Luxus-Smartwatches mit Sport-, Golf-, Lauf- und Wellness-Funktionen in 40 mm und 45 mm.' },
];

export const TH_READ_MORE = [
  { title_en: 'TAG Heuer Story', title_de: 'TAG Heuer Story', link: '/tag-heuer/story',
    image: TH_PAGE_IMAGES.story,
    description_en: "Explore TAG Heuer's heritage of motorsport, timing, and chronograph excellence — from Carrera to Monaco.",
    description_de: 'Entdecken Sie TAG Heuers Heritage von Motorsport, Zeitmessung und Chronographen-Exzellenz — von Carrera bis Monaco.' },
  { title_en: 'Carrera vs Formula 1', title_de: 'Carrera vs Formula 1', link: '/tag-heuer-carrera-vs-formula-1',
    image: TH_PAGE_IMAGES.carreraVsFormula1,
    description_en: 'Compare TAG Heuer Carrera and Formula 1 — two iconic collections with different character and price points.',
    description_de: 'Vergleichen Sie TAG Heuer Carrera und Formula 1 — zwei ikonische Kollektionen mit unterschiedlichem Charakter und Preis.' },
  { title_en: 'Connected Calibre E5 Guide', title_de: 'Connected Calibre E5 Guide', link: '/tag-heuer-connected-calibre-e5-guide',
    image: TH_PAGE_IMAGES.connectedCalibreE5,
    description_en: 'Understand TAG Heuer Connected Calibre E5 — the luxury smartwatch with sport, golf, and wellness features.',
    description_de: 'Verstehen Sie TAG Heuer Connected Calibre E5 — die Luxus-Smartwatch mit Sport-, Golf- und Wellness-Funktionen.' },
  { title_en: 'Aquaracer 300M', title_de: 'Aquaracer 300M', link: '/tag-heuer-aquaracer-300m',
    image: TH_PAGE_IMAGES.aquaracer300m,
    description_en: 'Discover the TAG Heuer Aquaracer 300M — a professional dive watch with 300M water resistance and ceramic bezel.',
    description_de: 'Entdecken Sie die TAG Heuer Aquaracer 300M — eine professionelle Tauchuhr mit 300M Wasserfestigkeit und keramischer Lünette.' },
  { title_en: 'Carrera Chronograph', title_de: 'Carrera Chronograph', link: '/tag-heuer-carrera-chronograph',
    image: TH_PAGE_IMAGES.carreraChronograph,
    description_en: 'Discover TAG Heuer Carrera chronographs — racing chronographs with Heuer 02 caliber and precise timing.',
    description_de: 'Entdecken Sie TAG Heuer Carrera Chronographen — Rennsport-Chronographen mit Heuer 02 Kaliber und präziser Zeitmessung.' },
  { title_en: 'Buying Pre-Owned TAG Heuer', title_de: 'Gebrauchte TAG Heuer kaufen', link: '/tag-heuer-gebraucht',
    image: TH_PAGE_IMAGES.preOwned,
    description_en: 'What to check before buying a used TAG Heuer — condition, box and papers, reference number, and authentication.',
    description_de: 'Was Sie vor dem Kauf einer gebrauchten TAG Heuer prüfen sollten — Zustand, Box und Papiere, Referenznummer und Authentifizierung.' },
];

export const TH_INTERNAL_LINKS = [
  {
    title_en: 'Popular TAG Heuer Searches', title_de: 'Beliebte TAG Heuer Suchen',
    links: [
      { label_en: 'TAG Heuer Watch', label_de: 'TAG Heuer Uhr', to: '/tag-heuer-uhr' },
      { label_en: 'TAG Heuer Watches', label_de: 'TAG Heuer Uhren', to: '/tag-heuer-uhren' },
      { label_en: 'TAG Heuer Watches', label_de: 'TAG Heuer watches', to: '/tag-heuer-watches' },
      { label_en: 'TAG Heuer Carrera Chronograph', label_de: 'TAG Heuer Carrera Chronograph', to: '/tag-heuer-carrera-chronograph' },
      { label_en: 'TAG Heuer Aquaracer 300M', label_de: 'TAG Heuer Aquaracer 300M', to: '/tag-heuer-aquaracer-300m' },
      { label_en: 'TAG Heuer Connected Calibre E5', label_de: 'TAG Heuer Connected Calibre E5', to: '/tag-heuer/connected-calibre-e5' },
    ],
  },
  {
    title_en: 'TAG Heuer Collections', title_de: 'TAG Heuer Kollektionen',
    links: [
      { label_en: 'Carrera', label_de: 'Carrera', to: '/tag-heuer/carrera' },
      { label_en: 'Formula 1', label_de: 'Formula 1', to: '/tag-heuer/formula-1' },
      { label_en: 'Aquaracer', label_de: 'Aquaracer', to: '/tag-heuer/aquaracer' },
      { label_en: 'Monaco', label_de: 'Monaco', to: '/tag-heuer/monaco' },
      { label_en: 'Connected', label_de: 'Connected', to: '/tag-heuer/connected' },
      { label_en: 'Link', label_de: 'Link', to: '/tag-heuer/link' },
      { label_en: 'Monza', label_de: 'Monza', to: '/tag-heuer/monza' },
    ],
  },
  {
    title_en: 'Buy & Pre-Owned', title_de: 'Kaufen & Gebraucht',
    links: [
      { label_en: 'Buy TAG Heuer', label_de: 'TAG Heuer kaufen', to: '/tag-heuer-kaufen' },
      { label_en: 'Buy TAG Heuer Watch', label_de: 'TAG Heuer Uhr kaufen', to: '/tag-heuer-uhr-kaufen' },
      { label_en: 'Pre-Owned TAG Heuer', label_de: 'TAG Heuer gebraucht', to: '/tag-heuer-gebraucht' },
      { label_en: 'Buy TAG Heuer Carrera', label_de: 'TAG Heuer Carrera kaufen', to: '/tag-heuer-carrera-kaufen' },
      { label_en: 'Buy TAG Heuer Aquaracer', label_de: 'TAG Heuer Aquaracer kaufen', to: '/tag-heuer-aquaracer-kaufen' },
      { label_en: 'Buy TAG Heuer Formula 1', label_de: 'TAG Heuer Formula 1 kaufen', to: '/tag-heuer-formula-1-kaufen' },
    ],
  },
  {
    title_en: 'Guides & Resources', title_de: 'Ratgeber & Guides',
    links: [
      { label_en: 'Which TAG Heuer to Buy?', label_de: 'Welche TAG Heuer kaufen?', to: '/welche-tag-heuer-kaufen' },
      { label_en: 'Carrera vs Formula 1', label_de: 'Carrera vs Formula 1', to: '/tag-heuer-carrera-vs-formula-1' },
      { label_en: 'Connected Calibre E5 Guide', label_de: 'Connected Calibre E5 Guide', to: '/tag-heuer-connected-calibre-e5-guide' },
      { label_en: 'TAG Heuer Story', label_de: 'TAG Heuer Story', to: '/tag-heuer/story' },
    ],
  },
  {
    title_en: 'Related Luxury Watch Brands', title_de: 'Verwandte Luxusuhren-Marken',
    links: [
      { label_en: 'Rolex watches', label_de: 'Rolex Uhren', to: '/brands/rolex' },
      { label_en: 'Omega watches', label_de: 'Omega Uhren', to: '/brands/omega' },
      { label_en: 'Breitling watches', label_de: 'Breitling Uhren', to: '/brands/breitling' },
      { label_en: 'Hublot watches', label_de: 'Hublot Uhren', to: '/brands/hublot' },
      { label_en: 'IWC watches', label_de: 'IWC Uhren', to: '/brands/iwc-schaffhausen' },
      { label_en: 'Grand Seiko watches', label_de: 'Grand Seiko Uhren', to: '/brands/grand-seiko' },
    ],
  },
];

export const TH_FAQS = [
  {
    q_en: 'Where can I buy a TAG Heuer watch online?', q_de: 'Wo kann ich eine TAG Heuer Uhr online kaufen?',
    a_en: "You can buy TAG Heuer watches online at Kariv Glamour. Browse new and <a href='/tag-heuer-gebraucht'>pre-owned TAG Heuer</a> watches with transparent product details, reference numbers, and condition grading.",
    a_de: "Sie können TAG Heuer Uhren online bei Kariv Glamour kaufen. Stöbern Sie durch neue und <a href='/tag-heuer-gebraucht'>gebrauchte TAG Heuer</a> Uhren mit transparenten Produktdetails, Referenznummern und Zustandsbewertung." },
  {
    q_en: 'What are the most popular TAG Heuer collections?', q_de: 'Was sind die beliebtesten TAG Heuer Kollektionen?',
    a_en: "The most popular TAG Heuer collections are <a href='/tag-heuer/carrera'>Carrera</a> (racing chronographs), <a href='/tag-heuer/aquaracer'>Aquaracer</a> (dive watches), <a href='/tag-heuer/formula-1'>Formula 1</a> (sport watches), <a href='/tag-heuer/monaco'>Monaco</a> (square-case icon), <a href='/tag-heuer/connected'>Connected</a> (smartwatches), and <a href='/tag-heuer/link'>Link</a> (integrated bracelet).",
    a_de: "Die beliebtesten TAG Heuer Kollektionen sind <a href='/tag-heuer/carrera'>Carrera</a> (Renn-Chronographen), <a href='/tag-heuer/aquaracer'>Aquaracer</a> (Tauchuhren), <a href='/tag-heuer/formula-1'>Formula 1</a> (Sportuhren), <a href='/tag-heuer/monaco'>Monaco</a> (Quadratgehäuse-Ikone), <a href='/tag-heuer/connected'>Connected</a> (Smartwatches) und <a href='/tag-heuer/link'>Link</a> (integriertes Armband)." },
  {
    q_en: 'What is the difference between TAG Heuer Carrera and Formula 1?', q_de: 'Was ist der Unterschied zwischen TAG Heuer Carrera und Formula 1?',
    a_en: "The <a href='/tag-heuer/carrera'>Carrera</a> is TAG Heuer's premium racing chronograph with Heuer 02 automatic caliber, while the <a href='/tag-heuer/formula-1'>Formula 1</a> is a more accessible sport watch with quartz and automatic options. Read our comparison: <a href='/tag-heuer-carrera-vs-formula-1'>Carrera vs Formula 1</a>.",
    a_de: "Die <a href='/tag-heuer/carrera'>Carrera</a> ist TAG Heuers Premium-Renn-Chronograph mit Heuer 02 Automatik-Kaliber, während die <a href='/tag-heuer/formula-1'>Formula 1</a> eine zugänglichere Sportuhr mit Quarz- und Automatik-Optionen ist. Lesen Sie unseren Vergleich: <a href='/tag-heuer-carrera-vs-formula-1'>Carrera vs Formula 1</a>." },
  {
    q_en: 'Is TAG Heuer Aquaracer good for diving?', q_de: 'Ist die TAG Heuer Aquaracer gut zum Tauchen?',
    a_en: "Yes. The <a href='/tag-heuer/aquaracer'>TAG Heuer Aquaracer</a> is a professional dive watch with 300M water resistance, ceramic bezel, and screw-down crown. The <a href='/tag-heuer-aquaracer-300m'>Aquaracer 300M</a> is specifically designed for diving and adventure sports.",
    a_de: "Ja. Die <a href='/tag-heuer/aquaracer'>TAG Heuer Aquaracer</a> ist eine professionelle Tauchuhr mit 300M Wasserfestigkeit, keramischer Lünette und verschraubter Krone. Die <a href='/tag-heuer-aquaracer-300m'>Aquaracer 300M</a> ist speziell für Tauch- und Abenteuersport konzipiert." },
  {
    q_en: 'What is the TAG Heuer Monaco?', q_de: 'Was ist die TAG Heuer Monaco?',
    a_en: "The <a href='/tag-heuer/monaco'>TAG Heuer Monaco</a> is an iconic chronograph with a square case, known for its racing connection and bold design. It was one of the world's first automatic chronographs.",
    a_de: "Die <a href='/tag-heuer/monaco'>TAG Heuer Monaco</a> ist ein ikonischer Chronograph mit quadratischem Gehäuse, der für seine Rennsport-Verbindung und sein mutiges Design bekannt ist. Sie war eine der ersten Automatik-Chronographen der Welt." },
  {
    q_en: 'What is TAG Heuer Connected Calibre E5?', q_de: 'Was ist TAG Heuer Connected Calibre E5?',
    a_en: "The <a href='/tag-heuer/connected-calibre-e5'>TAG Heuer Connected Calibre E5</a> is the latest generation of TAG Heuer's luxury smartwatch with sport, golf, running, and wellness features, available in 40 mm and 45 mm titanium or Black DLC cases. Read our <a href='/tag-heuer-connected-calibre-e5-guide'>Connected Calibre E5 Guide</a>.",
    a_de: "Das <a href='/tag-heuer/connected-calibre-e5'>TAG Heuer Connected Calibre E5</a> ist die neueste Generation der TAG Heuer Luxus-Smartwatch mit Sport-, Golf-, Lauf- und Wellness-Funktionen, erhältlich in 40 mm und 45 mm Gehäusen aus Titan oder Black DLC. Lesen Sie unseren <a href='/tag-heuer-connected-calibre-e5-guide'>Connected Calibre E5 Guide</a>." },
  {
    q_en: "Is TAG Heuer good for men's watches?", q_de: 'Ist TAG Heuer gut für Herrenuhren?',
    a_en: "Yes. TAG Heuer offers a wide range of <a href='/tag-heuer-uhr-herren'>men's watches</a>, from racing chronographs like the Carrera to dive watches like the Aquaracer and sport watches like the Formula 1.",
    a_de: "Ja. TAG Heuer bietet eine breite Palette an <a href='/tag-heuer-uhr-herren'>Herrenuhren</a>, von Renn-Chronographen wie der Carrera bis zu Tauchuhren wie der Aquaracer und Sportuhren wie der Formula 1." },
  {
    q_en: 'What should I check before buying a used TAG Heuer?', q_de: 'Was sollte ich vor dem Kauf einer gebrauchten TAG Heuer prüfen?',
    a_en: "Check the condition of the case and bracelet, verify the movement (automatic, quartz, or Connected), confirm box and papers, and review the reference number. Visit our <a href='/tag-heuer-gebraucht'>pre-owned TAG Heuer</a> page for transparent listings.",
    a_de: "Prüfen Sie den Zustand des Gehäuses und Armbands, verifizieren Sie das Uhrwerk (Automatik, Quarz oder Connected), bestätigen Sie Box und Papiere, und überprüfen Sie die Referenznummer. Besuchen Sie unsere Seite für <a href='/tag-heuer-gebraucht'>gebrauchte TAG Heuer</a> mit transparenten Einträgen." },
];

export const TH_SEO_PAGES = {
  'tag-heuer-uhr': {
    h1_en: 'TAG Heuer Watch', h1_de: 'TAG Heuer Uhr',
    title_en: 'TAG Heuer Watch | Kariv Glamour', title_de: 'TAG Heuer Uhr | Kariv Glamour',
    image: TH_PAGE_IMAGES.hero,
    description_en: 'Discover TAG Heuer watches at Kariv Glamour — motorsport heritage, chronographs, Aquaracer, Formula 1, Monaco, and Connected.',
    description_de: 'Entdecken Sie TAG Heuer Uhren bei Kariv Glamour — Motorsport-Heritage, Chronographen, Aquaracer, Formula 1, Monaco und Connected.',
    intro_en: "Explore TAG Heuer watches at Kariv Glamour — with motorsport heritage, racing chronographs, robust Aquaracer dive watches, Formula 1 sport models, the square Monaco icon, and the Connected Calibre E5 smartwatch collection.",
    intro_de: 'Erkunden Sie TAG Heuer Uhren bei Kariv Glamour — mit Motorsport-Heritage, Renn-Chronographen, robusten Aquaracer Tauchuhren, Formula 1 Sportmodellen, der quadratischen Monaco Ikone und der Connected Calibre E5 Smartwatch-Kollektion.',
    filter: {},
  },
  'tag-heuer-uhren': {
    h1_en: 'TAG Heuer Watches', h1_de: 'TAG Heuer Uhren',
    title_en: 'TAG Heuer Watches | Kariv Glamour', title_de: 'TAG Heuer Uhren | Kariv Glamour',
    image: TH_PAGE_IMAGES.hero,
    description_en: 'TAG Heuer watches at Kariv Glamour — Carrera, Aquaracer, Formula 1, Monaco, Connected, and Link collections.',
    description_de: 'TAG Heuer Uhren bei Kariv Glamour — Carrera, Aquaracer, Formula 1, Monaco, Connected und Link Kollektionen.',
    intro_en: 'Browse TAG Heuer watches by collection, model, movement, case size, condition, and price.',
    intro_de: 'Stöbern Sie durch TAG Heuer Uhren nach Kollektion, Modell, Uhrwerk, Gehäusegröße, Zustand und Preis.',
    filter: {},
  },
  'tag-heuer-watches': {
    h1_en: 'TAG Heuer Watches', h1_de: 'TAG Heuer Watches',
    title_en: 'TAG Heuer Watches | Kariv Glamour', title_de: 'TAG Heuer Watches | Kariv Glamour',
    image: TH_PAGE_IMAGES.hero,
    description_en: 'TAG Heuer watches at Kariv Glamour — Carrera, Aquaracer, Formula 1, Monaco, and Connected.',
    description_de: 'TAG Heuer Watches bei Kariv Glamour — Carrera, Aquaracer, Formula 1, Monaco und Connected.',
    intro_en: 'Discover TAG Heuer watches at Kariv Glamour — motorsport heritage, chronographs, and smartwatches.',
    intro_de: 'Entdecken Sie TAG Heuer Watches bei Kariv Glamour — Motorsport-Heritage, Chronographen und Smartwatches.',
    filter: {},
  },
  'tag-heuer-uhr-herren': {
    h1_en: "TAG Heuer Men's Watches", h1_de: 'TAG Heuer Uhr Herren',
    title_en: "TAG Heuer Men's Watches | Kariv Glamour", title_de: 'TAG Heuer Uhr Herren | Kariv Glamour',
    image: TH_PAGE_IMAGES.carreraChronograph,
    description_en: "TAG Heuer men's watches at Kariv Glamour — Carrera, Aquaracer, Formula 1, and Monaco models for men.",
    description_de: 'TAG Heuer Uhr Herren bei Kariv Glamour — Carrera, Aquaracer, Formula 1 und Monaco Modelle für Männer.',
    intro_en: "Discover TAG Heuer watches for men — from Carrera to Aquaracer, Formula 1, and Monaco.",
    intro_de: 'Entdecken Sie TAG Heuer Uhren für Herren — von der Carrera über die Aquaracer bis zur Formula 1 und Monaco.',
    filter: { gender: 'Men' },
  },
  'tag-heuer-uhren-herren': {
    h1_en: "TAG Heuer Men's Watches", h1_de: 'TAG Heuer Uhren Herren',
    title_en: "TAG Heuer Men's Watches | Kariv Glamour", title_de: 'TAG Heuer Uhren Herren | Kariv Glamour',
    image: TH_PAGE_IMAGES.carreraChronograph,
    description_en: "TAG Heuer men's watches at Kariv Glamour — racing chronographs, dive watches, and sport watches for men.",
    description_de: 'TAG Heuer Uhren Herren bei Kariv Glamour — Renn-Chronographen, Tauchuhren und Sportuhren für Männer.',
    intro_en: "Browse TAG Heuer watches for men — chronographs, dive watches, and sport models.",
    intro_de: 'Stöbern Sie durch TAG Heuer Uhren für Herren — Chronographen, Tauchuhren und Sportmodelle.',
    filter: { gender: 'Men' },
  },
  'tag-heuer-damenuhr': {
    h1_en: "TAG Heuer Women's Watch", h1_de: 'TAG Heuer Damenuhr',
    title_en: "TAG Heuer Women's Watch | Kariv Glamour", title_de: 'TAG Heuer Damenuhr | Kariv Glamour',
    image: TH_PAGE_IMAGES.preOwned,
    description_en: "TAG Heuer women's watches at Kariv Glamour — elegant sport watches in smaller case sizes.",
    description_de: 'TAG Heuer Damenuhren bei Kariv Glamour — elegante Sportuhren in kleineren Gehäusegrößen.',
    intro_en: "Discover TAG Heuer women's watches — elegant sport watches in smaller case sizes with quartz and automatic options.",
    intro_de: 'Entdecken Sie TAG Heuer Damenuhren — elegante Sportuhren in kleineren Gehäusegrößen mit Quarz- und Automatik-Optionen.',
    filter: { gender: 'Women' },
  },
  'tag-heuer-kaufen': {
    h1_en: 'Buy TAG Heuer', h1_de: 'TAG Heuer kaufen',
    title_en: 'Buy TAG Heuer | Kariv Glamour', title_de: 'TAG Heuer kaufen | Kariv Glamour',
    image: TH_PAGE_IMAGES.hero,
    description_en: 'Buy TAG Heuer at Kariv Glamour — new and pre-owned models with transparent product information.',
    description_de: 'TAG Heuer kaufen bei Kariv Glamour — neue und gebrauchte Modelle mit transparenter Produktinformation.',
    intro_en: 'Buy TAG Heuer at Kariv Glamour: new and pre-owned models with transparent product information.',
    intro_de: 'TAG Heuer kaufen bei Kariv Glamour: neue und gebrauchte Modelle mit transparenter Produktinformation.',
    filter: {},
  },
  'tag-heuer-uhr-kaufen': {
    h1_en: 'Buy TAG Heuer Watch', h1_de: 'TAG Heuer Uhr kaufen',
    title_en: 'Buy TAG Heuer Watch | Kariv Glamour', title_de: 'TAG Heuer Uhr kaufen | Kariv Glamour',
    image: TH_PAGE_IMAGES.hero,
    description_en: 'Buy TAG Heuer watch at Kariv Glamour — Carrera, Aquaracer, Formula 1, Monaco, and Connected.',
    description_de: 'TAG Heuer Uhr kaufen bei Kariv Glamour — Carrera, Aquaracer, Formula 1, Monaco und Connected.',
    intro_en: 'Buy TAG Heuer watch at Kariv Glamour — discover models from the Carrera, Aquaracer, Formula 1, Monaco, Connected, and Link collections.',
    intro_de: 'TAG Heuer Uhr kaufen bei Kariv Glamour — entdecken Sie Modelle aus den Kollektionen Carrera, Aquaracer, Formula 1, Monaco, Connected und Link.',
    filter: {},
  },
  'tag-heuer-carrera-kaufen': {
    h1_en: 'Buy TAG Heuer Carrera', h1_de: 'TAG Heuer Carrera kaufen',
    title_en: 'Buy TAG Heuer Carrera | Kariv Glamour', title_de: 'TAG Heuer Carrera kaufen | Kariv Glamour',
    image: TH_PAGE_IMAGES.carreraChronograph,
    description_en: 'Buy TAG Heuer Carrera at Kariv Glamour — racing chronographs with Heuer 02 caliber.',
    description_de: 'TAG Heuer Carrera kaufen bei Kariv Glamour — Renn-Chronographen mit Heuer 02 Kaliber.',
    intro_en: 'Buy TAG Heuer Carrera at Kariv Glamour — racing-inspired chronographs with automatic caliber and clean design.',
    intro_de: 'TAG Heuer Carrera kaufen bei Kariv Glamour — Rennsport-inspirierte Chronographen mit Automatik-Kaliber und klarem Design.',
    filter: { collection: 'Carrera' },
  },
  'tag-heuer-aquaracer-kaufen': {
    h1_en: 'Buy TAG Heuer Aquaracer', h1_de: 'TAG Heuer Aquaracer kaufen',
    title_en: 'Buy TAG Heuer Aquaracer | Kariv Glamour', title_de: 'TAG Heuer Aquaracer kaufen | Kariv Glamour',
    image: TH_PAGE_IMAGES.aquaracer300m,
    description_en: 'Buy TAG Heuer Aquaracer at Kariv Glamour — dive watches with 300M water resistance.',
    description_de: 'TAG Heuer Aquaracer kaufen bei Kariv Glamour — Tauchuhren mit 300M Wasserfestigkeit.',
    intro_en: 'Buy TAG Heuer Aquaracer at Kariv Glamour — robust dive watches with 300M water resistance and ceramic bezel.',
    intro_de: 'TAG Heuer Aquaracer kaufen bei Kariv Glamour — robuste Tauchuhren mit 300M Wasserfestigkeit und keramischer Lünette.',
    filter: { collection: 'Aquaracer' },
  },
  'tag-heuer-formula-1-kaufen': {
    h1_en: 'Buy TAG Heuer Formula 1', h1_de: 'TAG Heuer Formula 1 kaufen',
    title_en: 'Buy TAG Heuer Formula 1 | Kariv Glamour', title_de: 'TAG Heuer Formula 1 kaufen | Kariv Glamour',
    image: TH_PAGE_IMAGES.carreraVsFormula1,
    description_en: 'Buy TAG Heuer Formula 1 at Kariv Glamour — sport watches with racing character.',
    description_de: 'TAG Heuer Formula 1 kaufen bei Kariv Glamour — Sportuhren mit Renncharakter.',
    intro_en: 'Buy TAG Heuer Formula 1 at Kariv Glamour — sporty watches with racing character, quartz and automatic options.',
    intro_de: 'TAG Heuer Formula 1 kaufen bei Kariv Glamour — sportliche Uhren mit Renncharakter, Quarz- und Automatik-Optionen.',
    filter: { collection: 'Formula 1' },
  },
  'tag-heuer-monaco-kaufen': {
    h1_en: 'Buy TAG Heuer Monaco', h1_de: 'TAG Heuer Monaco kaufen',
    title_en: 'Buy TAG Heuer Monaco | Kariv Glamour', title_de: 'TAG Heuer Monaco kaufen | Kariv Glamour',
    image: TH_PAGE_IMAGES.story,
    description_en: 'Buy TAG Heuer Monaco at Kariv Glamour — square-case chronograph with racing heritage.',
    description_de: 'TAG Heuer Monaco kaufen bei Kariv Glamour — Quadratgehäuse-Chronograph mit Rennsport-Heritage.',
    intro_en: 'Buy TAG Heuer Monaco at Kariv Glamour — the iconic square chronograph with racing connection.',
    intro_de: 'TAG Heuer Monaco kaufen bei Kariv Glamour — der ikonische Quadrat-Chronograph mit Rennsport-Verbindung.',
    filter: { collection: 'Monaco' },
  },
  'tag-heuer-gebraucht': {
    h1_en: 'Pre-Owned TAG Heuer', h1_de: 'TAG Heuer gebraucht',
    title_en: 'Pre-Owned TAG Heuer | Kariv Glamour', title_de: 'TAG Heuer gebraucht | Kariv Glamour',
    image: TH_PAGE_IMAGES.preOwned,
    description_en: 'Pre-owned TAG Heuer watches at Kariv Glamour with transparent condition grading.',
    description_de: 'Gebrauchte TAG Heuer Uhren bei Kariv Glamour mit transparenter Zustandsbewertung.',
    intro_en: 'Discover pre-owned TAG Heuer watches with clear condition grading, box and papers, and detailed product data.',
    intro_de: 'Entdecken Sie gebrauchte TAG Heuer Uhren mit klarer Zustandsbewertung, Box und Papers und detaillierten Produktdaten.',
    filter: {},
  },
  'tag-heuer-carrera-chronograph': {
    h1_en: 'TAG Heuer Carrera Chronograph', h1_de: 'TAG Heuer Carrera Chronograph',
    title_en: 'TAG Heuer Carrera Chronograph | Kariv Glamour', title_de: 'TAG Heuer Carrera Chronograph | Kariv Glamour',
    image: TH_PAGE_IMAGES.carreraChronograph,
    description_en: 'TAG Heuer Carrera Chronograph — racing chronographs with Heuer 02 caliber and precise timing.',
    description_de: 'TAG Heuer Carrera Chronograph — Rennsport-Chronographen mit Heuer 02 Kaliber und präziser Zeitmessung.',
    intro_en: 'Discover TAG Heuer Carrera chronographs — racing-inspired chronographs with Heuer 02 automatic caliber and tachymeter bezel.',
    intro_de: 'Entdecken Sie TAG Heuer Carrera Chronographen — Rennsport-inspirierte Chronographen mit Heuer 02 Automatik-Kaliber und Tachymeter-Lünette.',
    filter: { collection: 'Carrera' },
    clientFilter: (p) => {
      const f = [p.functions, p.model, p.productTitle, p.movementType].filter(Boolean).join(' ').toLowerCase();
      return f.includes('chronograph') || f.includes('chrono');
    },
  },
  'tag-heuer-formula-1-chronograph': {
    h1_en: 'TAG Heuer Formula 1 Chronograph', h1_de: 'TAG Heuer Formula 1 Chronograph',
    title_en: 'TAG Heuer Formula 1 Chronograph | Kariv Glamour', title_de: 'TAG Heuer Formula 1 Chronograph | Kariv Glamour',
    image: TH_PAGE_IMAGES.carreraVsFormula1,
    description_en: 'TAG Heuer Formula 1 Chronograph — sporty chronographs with racing character.',
    description_de: 'TAG Heuer Formula 1 Chronograph — sportliche Chronographen mit Renncharakter.',
    intro_en: 'Discover TAG Heuer Formula 1 chronographs — sporty chronographs with bold racing character and quartz or automatic movement.',
    intro_de: 'Entdecken Sie TAG Heuer Formula 1 Chronographen — sportliche Chronographen mit mutigem Renncharakter und Quarz- oder Automatik-Werk.',
    filter: { collection: 'Formula 1' },
    clientFilter: (p) => {
      const f = [p.functions, p.model, p.productTitle, p.movementType].filter(Boolean).join(' ').toLowerCase();
      return f.includes('chronograph') || f.includes('chrono');
    },
  },
  'tag-heuer-aquaracer-300m': {
    h1_en: 'TAG Heuer Aquaracer 300M', h1_de: 'TAG Heuer Aquaracer 300M',
    title_en: 'TAG Heuer Aquaracer 300M | Kariv Glamour', title_de: 'TAG Heuer Aquaracer 300M | Kariv Glamour',
    image: TH_PAGE_IMAGES.aquaracer300m,
    description_en: 'TAG Heuer Aquaracer 300M — professional dive watch with 300M water resistance.',
    description_de: 'TAG Heuer Aquaracer 300M — professionelle Tauchuhr mit 300M Wasserfestigkeit.',
    intro_en: 'Discover the TAG Heuer Aquaracer 300M — a professional dive watch with 300M water resistance, ceramic bezel, and screw-down crown.',
    intro_de: 'Entdecken Sie die TAG Heuer Aquaracer 300M — eine professionelle Tauchuhr mit 300M Wasserfestigkeit, keramischer Lünette und verschraubter Krone.',
    filter: { collection: 'Aquaracer' },
    clientFilter: (p) => {
      const f = [p.functions, p.model, p.productTitle, p.waterResistance].filter(Boolean).join(' ').toLowerCase();
      return f.includes('300') || f.includes('300m') || f.includes('aquaracer');
    },
  },
  'tag-heuer-chronograph': {
    h1_en: 'TAG Heuer Chronograph', h1_de: 'TAG Heuer Chronograph',
    title_en: 'TAG Heuer Chronograph | Kariv Glamour', title_de: 'TAG Heuer Chronograph | Kariv Glamour',
    image: TH_PAGE_IMAGES.carreraChronograph,
    description_en: 'TAG Heuer chronographs — racing chronographs from Carrera to Monaco.',
    description_de: 'TAG Heuer Chronograph — Rennsport-Chronographen von Carrera bis Monaco.',
    intro_en: 'Discover TAG Heuer chronographs — from Carrera to Monaco to Formula 1, with Heuer 02 caliber and precise timing.',
    intro_de: 'Entdecken Sie TAG Heuer Chronographen — von der Carrera über die Monaco bis zur Formula 1, mit Heuer 02 Kaliber und präziser Zeitmessung.',
    filter: {},
    clientFilter: (p) => {
      const f = [p.functions, p.model, p.productTitle, p.movementType].filter(Boolean).join(' ').toLowerCase();
      return f.includes('chronograph') || f.includes('chrono');
    },
  },
  'welche-tag-heuer-kaufen': {
    h1_en: 'Which TAG Heuer to Buy?', h1_de: 'Welche TAG Heuer kaufen?',
    title_en: 'Which TAG Heuer to Buy | Kariv Glamour', title_de: 'Welche TAG Heuer kaufen | Kariv Glamour',
    image: TH_PAGE_IMAGES.hero,
    description_en: 'TAG Heuer buying guide — compare Carrera, Aquaracer, Formula 1, Monaco, and Connected.',
    description_de: 'TAG Heuer Kaufberatung — vergleichen Sie Carrera, Aquaracer, Formula 1, Monaco und Connected.',
    intro_en: 'Which TAG Heuer watch is right for you? Compare collections, movements, case sizes, and features to make the right decision.',
    intro_de: 'Welche TAG Heuer Uhr passt zu Ihnen? Vergleichen Sie Kollektionen, Uhrwerke, Gehäusegrößen und Funktionen, um die richtige Entscheidung zu treffen.',
    isGuide: true,
    guideContent_en: [
      "TAG Heuer is known for motorsport heritage, racing chronographs, and sport watches. The main collections are <a href='/tag-heuer/carrera'>Carrera</a> (racing chronographs), <a href='/tag-heuer/aquaracer'>Aquaracer</a> (dive watches with 300M water resistance), <a href='/tag-heuer/formula-1'>Formula 1</a> (accessible sport watches), <a href='/tag-heuer/monaco'>Monaco</a> (square chronograph), <a href='/tag-heuer/connected'>Connected</a> (luxury smartwatches), and <a href='/tag-heuer/link'>Link</a> (integrated bracelet).",
      "For motorsport fans, the <a href='/tag-heuer/carrera'>Carrera</a> with Heuer 02 automatic caliber is the best choice. For diving and adventure sports, the <a href='/tag-heuer/aquaracer'>Aquaracer</a> with 300M water resistance is recommended. For accessible sport luxury, the <a href='/tag-heuer/formula-1'>Formula 1</a> is ideal. For smartwatch fans, the <a href='/tag-heuer/connected-calibre-e5'>Connected Calibre E5</a> is the right choice.",
      "At Kariv Glamour, each TAG Heuer timepiece is presented with transparent product details, clear condition grading, and reference number visibility. We do not sell replica or counterfeit watches.",
    ],
    guideContent_de: [
      "TAG Heuer ist bekannt für Motorsport-Heritage, Renn-Chronographen und Sportuhren. Die wichtigsten Kollektionen sind <a href='/tag-heuer/carrera'>Carrera</a> (Renn-Chronographen), <a href='/tag-heuer/aquaracer'>Aquaracer</a> (Tauchuhren mit 300M Wasserfestigkeit), <a href='/tag-heuer/formula-1'>Formula 1</a> (zugängliche Sportuhren), <a href='/tag-heuer/monaco'>Monaco</a> (Quadrat-Chronograph), <a href='/tag-heuer/connected'>Connected</a> (Luxus-Smartwatches) und <a href='/tag-heuer/link'>Link</a> (integriertes Armband).",
      "Für Rennsport-Fans ist die <a href='/tag-heuer/carrera'>Carrera</a> mit Heuer 02 Automatik-Kaliber die beste Wahl. Für Tauch- und Abenteuersport empfiehlt sich die <a href='/tag-heuer/aquaracer'>Aquaracer</a> mit 300M Wasserfestigkeit. Für zugänglichen Sport-Luxus ist die <a href='/tag-heuer/formula-1'>Formula 1</a> ideal. Für Smartwatch-Fans ist das <a href='/tag-heuer/connected-calibre-e5'>Connected Calibre E5</a> die richtige Wahl.",
      "Bei Kariv Glamour wird jede TAG Heuer Uhr mit transparenten Produktdetails, klarer Zustandsbewertung und Referenznummer-Sichtbarkeit präsentiert. Wir verkaufen keine Replikate oder gefälschte Uhren.",
    ],
  },
  'tag-heuer-carrera-vs-formula-1': {
    h1_en: 'TAG Heuer Carrera vs Formula 1', h1_de: 'TAG Heuer Carrera vs Formula 1',
    title_en: 'TAG Heuer Carrera vs Formula 1 | Kariv Glamour', title_de: 'TAG Heuer Carrera vs Formula 1 | Kariv Glamour',
    image: TH_PAGE_IMAGES.carreraVsFormula1,
    description_en: 'Comparison of TAG Heuer Carrera and Formula 1 — two iconic collections with different character.',
    description_de: 'Vergleich der TAG Heuer Carrera und Formula 1 — zwei ikonische Kollektionen mit unterschiedlichem Charakter.',
    intro_en: 'The comparison between TAG Heuer Carrera and Formula 1: Both are sporty watches, but the Carrera is a premium racing chronograph with Heuer 02 automatic caliber, while the Formula 1 is a more accessible sport watch with quartz and automatic options.',
    intro_de: 'Der Vergleich zwischen TAG Heuer Carrera und Formula 1: Beide sind sportliche Uhren, aber die Carrera ist ein Premium-Renn-Chronograph mit Heuer 02 Automatik-Kaliber, während die Formula 1 eine zugänglichere Sportuhr mit Quarz- und Automatik-Optionen ist.',
    isGuide: true,
    guideContent_en: [
      "The <a href='/tag-heuer/carrera'>TAG Heuer Carrera</a> is the premium racing collection with Heuer 02 automatic chronograph caliber, while the <a href='/tag-heuer/formula-1'>Formula 1</a> is a more accessible sport collection with quartz and automatic options.",
      "The Carrera is aimed at motorsport enthusiasts seeking a premium automatic chronograph, while the Formula 1 is ideal for everyday sport and accessible luxury. Both offer <a href='/tag-heuer-chronograph'>chronograph</a> variants.",
      "At Kariv Glamour, you can compare both collections and find the TAG Heuer that best fits your style and budget.",
    ],
    guideContent_de: [
      "Die <a href='/tag-heuer/carrera'>TAG Heuer Carrera</a> ist die Premium-Renn-Kollektion mit Heuer 02 Automatik-Chronographen-Kaliber, während die <a href='/tag-heuer/formula-1'>Formula 1</a> eine zugänglichere Sport-Kollektion mit Quarz- und Automatik-Optionen ist.",
      "Die Carrera richtet sich an Rennsport-Enthusiasten, die ein Premium-Automatik-Chronograph suchen, während die Formula 1 ideal für Alltagssport und zugänglichen Luxus ist. Beide bieten <a href='/tag-heuer-chronograph'>Chronograph</a> Varianten.",
      "Bei Kariv Glamour können Sie beide Kollektionen vergleichen und die TAG Heuer finden, die am besten zu Ihrem Stil und Budget passt.",
    ],
  },
  'tag-heuer-connected-calibre-e5-guide': {
    h1_en: 'TAG Heuer Connected Calibre E5 Guide', h1_de: 'TAG Heuer Connected Calibre E5 Guide',
    title_en: 'TAG Heuer Connected Calibre E5 Guide | Kariv Glamour', title_de: 'TAG Heuer Connected Calibre E5 Guide | Kariv Glamour',
    image: TH_PAGE_IMAGES.connectedCalibreE5,
    description_en: 'Understand TAG Heuer Connected Calibre E5 — the luxury smartwatch with sport, golf, and wellness features.',
    description_de: 'Verstehen Sie TAG Heuer Connected Calibre E5 — die Luxus-Smartwatch mit Sport-, Golf- und Wellness-Funktionen.',
    intro_en: 'The TAG Heuer Connected Calibre E5 is the latest generation of TAG Heuer\'s luxury smartwatch with sport, golf, running, and wellness features in 40 mm and 45 mm cases.',
    intro_de: 'Das TAG Heuer Connected Calibre E5 ist die neueste Generation der TAG Heuer Luxus-Smartwatch mit Sport-, Golf-, Lauf- und Wellness-Funktionen in 40 mm und 45 mm Gehäusen.',
    isGuide: true,
    guideContent_en: [
      "The <a href='/tag-heuer/connected-calibre-e5'>TAG Heuer Connected Calibre E5</a> is TAG Heuer's latest luxury smartwatch generation, available in 40 mm and 45 mm titanium or Black DLC cases. It offers sport, golf, running, and wellness features.",
      "Unlike mechanical TAG Heuer watches like the <a href='/tag-heuer/carrera'>Carrera</a> or <a href='/tag-heuer/monaco'>Monaco</a>, the Connected is a digital smartwatch with interchangeable straps, fitness tracking, and digital complications. It should be considered separately from mechanical and quartz models.",
      "At Kariv Glamour, we present the <a href='/tag-heuer/connected'>Connected</a> as a distinct smartwatch collection, separate from mechanical TAG Heuer watches.",
    ],
    guideContent_de: [
      "Das <a href='/tag-heuer/connected-calibre-e5'>TAG Heuer Connected Calibre E5</a> ist TAG Heuers neueste Luxus-Smartwatch-Generation, erhältlich in 40 mm und 45 mm Gehäusen aus Titan oder Black DLC. Es bietet Sport-, Golf-, Lauf- und Wellness-Funktionen.",
      "Im Gegensatz zu mechanischen TAG Heuer Uhren wie der <a href='/tag-heuer/carrera'>Carrera</a> oder der <a href='/tag-heuer/monaco'>Monaco</a> ist das Connected eine digitale Smartwatch mit Wechselarmband, Fitness-Tracking und digitalen Komplikationen. Es sollte klar von mechanischen und Quarz-Modellen getrennt betrachtet werden.",
      "Bei Kariv Glamour präsentieren wir das <a href='/tag-heuer/connected'>Connected</a> als eigenständige Smartwatch-Kollektion, separat von mechanischen TAG Heuer Uhren.",
    ],
  },
  'tag-heuer-story': {
    h1_en: 'TAG Heuer Story', h1_de: 'TAG Heuer Story',
    title_en: 'TAG Heuer Story | Kariv Glamour', title_de: 'TAG Heuer Story | Kariv Glamour',
    image: TH_PAGE_IMAGES.story,
    description_en: 'The TAG Heuer story — motorsport heritage, racing chronographs, and sport watches from Carrera to Monaco.',
    description_de: 'Die TAG Heuer Story — Motorsport-Heritage, Renn-Chronographen und Sportuhren von Carrera bis Monaco.',
    intro_en: "TAG Heuer stands for motorsport heritage, racing chronographs, and sport watches — from Carrera to Monaco to Aquaracer, Formula 1, and Connected smartwatch.",
    intro_de: 'TAG Heuer steht für Motorsport-Heritage, Renn-Chronographen und Sportuhren — von der Carrera über die Monaco bis zur Aquaracer, Formula 1 und Connected Smartwatch.',
    isGuide: true,
    guideContent_en: [
      "TAG Heuer was founded in 1860 by Edouard Heuer in Switzerland and is known for its connection to motorsport, racing chronographs, and sport watches. The main collections are <a href='/tag-heuer/carrera'>Carrera</a> (racing chronographs), <a href='/tag-heuer/aquaracer'>Aquaracer</a> (dive watches), <a href='/tag-heuer/formula-1'>Formula 1</a> (sport watches), <a href='/tag-heuer/monaco'>Monaco</a> (square chronograph), <a href='/tag-heuer/connected'>Connected</a> (smartwatches), and <a href='/tag-heuer/link'>Link</a> (integrated bracelet).",
      "The <a href='/tag-heuer/carrera'>Carrera</a> was introduced in 1963 as a racing chronograph and is now TAG Heuer's flagship collection with the Heuer 02 automatic caliber. The <a href='/tag-heuer/monaco'>Monaco</a> with its iconic square case was made famous by Steve McQueen. The <a href='/tag-heuer/aquaracer'>Aquaracer</a> is TAG Heuer's dive watch collection with 300M water resistance.",
      "At Kariv Glamour, you'll find a curated selection of TAG Heuer watches — from new models to <a href='/tag-heuer-gebraucht'>pre-owned TAG Heuer</a> with transparent condition grading.",
    ],
    guideContent_de: [
      "TAG Heuer wurde 1860 von Edouard Heuer in der Schweiz gegründet und ist bekannt für seine Verbindung zum Motorsport, Renn-Chronographen und Sportuhren. Die wichtigsten Kollektionen sind <a href='/tag-heuer/carrera'>Carrera</a> (Renn-Chronographen), <a href='/tag-heuer/aquaracer'>Aquaracer</a> (Tauchuhren), <a href='/tag-heuer/formula-1'>Formula 1</a> (Sportuhren), <a href='/tag-heuer/monaco'>Monaco</a> (Quadrat-Chronograph), <a href='/tag-heuer/connected'>Connected</a> (Smartwatches) und <a href='/tag-heuer/link'>Link</a> (integriertes Armband).",
      "Die <a href='/tag-heuer/carrera'>Carrera</a> wurde 1963 als Renn-Chronograph eingeführt und ist heute TAG Heuers wichtigste Kollektion mit dem Heuer 02 Automatik-Kaliber. Die <a href='/tag-heuer/monaco'>Monaco</a> mit ihrem ikonischen Quadratgehäuse wurde durch Steve McQueen berühmt. Die <a href='/tag-heuer/aquaracer'>Aquaracer</a> ist TAG Heuers Tauchuhr-Kollektion mit 300M Wasserfestigkeit.",
      "Bei Kariv Glamour finden Sie eine kuratierte Auswahl an TAG Heuer Uhren — von neuen Modellen bis zu <a href='/tag-heuer-gebraucht'>gebrauchten TAG Heuer</a> mit transparenter Zustandsbewertung.",
    ],
  },
};

applyCzechSeoPages(TH_SEO_PAGES, 'TAG Heuer', 'tagHeuer');
applyCzechBrandFaqs(TH_FAQS, 'tagHeuer');
applyCzechBrandContent('tagHeuer', TH_COLLECTIONS, TH_QUICK_FILTERS, TH_SEO_CARDS, TH_READ_MORE, TH_INTERNAL_LINKS);
