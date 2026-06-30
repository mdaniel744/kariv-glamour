// TAG Heuer collections, filters, and SEO data
// TAG Heuer is positioned around motorsport heritage, racing chronographs,
// dive watches (Aquaracer), sport watches (Formula 1), the square Monaco icon,
// and the Connected Calibre E5 luxury smartwatch collection.

const CARRERA_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/88ab5b23e_TAGHeuerCarreraChronographTourbillon.jpg';
const CARRERA_BLACK_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/ca316f251_TAGHeuer-TAGHEUERCARRERACHRONOGRAPHEXTREMESPORT.jpg';
const AQUARACER_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/e9071e8e4_TAGHeuer-TAGHEUERAQUARACERPROFESSIONAL300DATE.jpg';
const FORMULA1_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/fc258a510_TAGHeuerFormula1.webp';
const MONACO_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/9400ebe8a_LuxuriseHerrenuhrTAGHeuer.png';
const AQUARACER_GMT_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/04e5c027b_TAGHeuerUhrAquaracer.jpg';

export const TH_HERO_IMAGE = CARRERA_BLACK_IMG;
export const TH_STORY_IMAGE = MONACO_IMG;

export const TH_COLLECTIONS = [
  { id: 1, name: 'Carrera', slug: 'carrera', image: CARRERA_IMG,
    shortDescription_de: 'TAG Heuers-rennbahn-inspirierte Kollektion, bekannt für Chronographen, klares Sport-Dress-Design und starke Motorsport-Heritage.',
    shortDescription_en: "TAG Heuer's racing-inspired collection, known for chronographs, clean sport-dress design, and strong motorsport heritage." },
  { id: 2, name: 'Formula 1', slug: 'formula-1', image: FORMULA1_IMG,
    shortDescription_de: 'Eine sportliche TAG Heuer Kollektion mit mutigem Renncharakter, alltäglicher Haltbarkeit, Quarz- und Automatik-Optionen und Chronograph-Modellen.',
    shortDescription_en: 'A sporty TAG Heuer collection with bold racing character, everyday durability, quartz and automatic options, and chronograph models.' },
  { id: 3, name: 'Aquaracer', slug: 'aquaracer', image: AQUARACER_IMG,
    shortDescription_de: 'Eine robuste TAG Heuer Tauch- und Abenteuer-Kollektion, einschließlich 300M Modelle für Wasserfestigkeit, Outdoor-Performance und Sport-Stil.',
    shortDescription_en: 'A robust TAG Heuer dive and adventure collection, including 300M models built for water resistance, outdoor performance, and sport style.' },
  { id: 4, name: 'Monaco', slug: 'monaco', image: MONACO_IMG,
    shortDescription_de: 'Ein TAG Heuer Quadratgehäuse-Ikonen, der mit Rennsport-Heritage, mutigem Design und Chronograph-Charakter verbunden ist.',
    shortDescription_en: 'A square-case TAG Heuer icon associated with racing heritage, bold design, and chronograph character.' },
  { id: 5, name: 'Connected', slug: 'connected', image: '',
    shortDescription_de: 'TAG Heuers Luxus-Smartwatch-Kollektion, einschließlich Connected Calibre E5 Modelle für Sport, Wellness, Golf, Laufen und digitale Performance.',
    shortDescription_en: "TAG Heuer's luxury smartwatch collection, including Connected Calibre E5 models for sport, wellness, golf, running, and digital performance." },
  { id: 6, name: 'Connected Calibre E5', slug: 'connected-calibre-e5', image: '',
    shortDescription_de: 'TAG Heuers neueste Generation Luxus-Smartwatch mit Calibre E5 — bietet Sport-, Golf-, Lauf- und Wellness-Funktionen in 40 mm und 45 mm Gehäusen.',
    shortDescription_en: "TAG Heuer's latest generation luxury smartwatch with Calibre E5, offering sport, golf, running, and wellness features in 40 mm and 45 mm cases." },
  { id: 7, name: 'Link', slug: 'link', image: '',
    shortDescription_de: 'Eine verfeinerte TAG Heuer Kollektion, bekannt für ihren integrierten Armband-Stil und den sanften, alltäglichen Luxus-Charakter.',
    shortDescription_en: 'A refined TAG Heuer collection known for its integrated bracelet style and smooth everyday luxury character.' },
  { id: 8, name: 'Monza', slug: 'monza', image: '',
    shortDescription_de: 'Eine heritage-inspirierte TAG Heuer Linie mit starker Motorsport-Identität — am besten als Vintage-, Sonderedition- oder sammlerfokussierte Seite behandelt.',
    shortDescription_en: 'A heritage-inspired TAG Heuer line with strong motorsport identity, best handled as a vintage, special edition, or collector-focused page.' },
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
  { label: 'Carrera', link: '/tag-heuer/carrera' },
  { label: 'Aquaracer', link: '/tag-heuer/aquaracer' },
  { label: 'Formula 1', link: '/tag-heuer/formula-1' },
  { label: 'Monaco', link: '/tag-heuer/monaco' },
  { label: 'Connected', link: '/tag-heuer/connected' },
  { label: 'Chronograph', link: '/tag-heuer-chronograph' },
  { label: 'Herren', link: '/tag-heuer-uhr-herren' },
  { label: 'Gebraucht', link: '/tag-heuer-gebraucht' },
];

export const TH_SEO_CARDS = [
  { title: 'TAG Heuer Uhr', link: '/tag-heuer-uhr',
    description_de: 'Entdecken Sie TAG Heuer Uhren bei Kariv Glamour — Motorsport-Heritage, Renn-Chronographen, Aquaracer Tauchuhren, Formula 1 Sportmodelle, Monaco und Connected Smartwatches.',
    description_en: 'Explore TAG Heuer watches at Kariv Glamour — motorsport heritage, racing chronographs, Aquaracer dive watches, Formula 1 sport models, Monaco, and Connected smartwatches.' },
  { title: 'TAG Heuer Carrera', link: '/tag-heuer/carrera',
    description_de: 'Entdecken Sie die TAG Heuer Carrera Kollektion — Rennsport-inspirierte Chronographen mit Heuer 02 Kaliber, klarem Design und Motorsport-Heritage.',
    description_en: 'Discover the TAG Heuer Carrera collection — racing-inspired chronographs with Heuer 02 caliber, clean design, and motorsport heritage.' },
  { title: 'TAG Heuer Aquaracer', link: '/tag-heuer/aquaracer',
    description_de: 'Entdecken Sie TAG Heuer Aquaracer Tauchuhren — 300M Wasserfestigkeit, keramische Lünetten und robuste Konstruktion für Abenteuer und Sport.',
    description_en: 'Discover TAG Heuer Aquaracer dive watches — 300M water resistance, ceramic bezels, and robust construction for adventure and sport.' },
  { title: 'TAG Heuer Formula 1', link: '/tag-heuer/formula-1',
    description_de: 'Entdecken Sie TAG Heuer Formula 1 — sportliche Uhren mit Renncharakter, Quarz- und Automatik-Optionen und Chronograph-Modellen.',
    description_en: 'Discover TAG Heuer Formula 1 — sporty watches with racing character, quartz and automatic options, and chronograph models.' },
  { title: 'TAG Heuer Monaco', link: '/tag-heuer/monaco',
    description_de: 'Entdecken Sie die TAG Heuer Monaco — ein Quadratgehäuse-Chronograph mit Rennsport-Heritage und mutigem, ikonischen Design.',
    description_en: 'Discover the TAG Heuer Monaco — a square-case chronograph with racing heritage and bold, iconic design.' },
  { title: 'TAG Heuer Connected Calibre E5', link: '/tag-heuer/connected-calibre-e5',
    description_de: 'Entdecken Sie TAG Heuer Connected Calibre E5 — Luxus-Smartwatches mit Sport-, Golf-, Lauf- und Wellness-Funktionen in 40 mm und 45 mm.',
    description_en: 'Discover TAG Heuer Connected Calibre E5 — luxury smartwatches with sport, golf, running, and wellness features in 40 mm and 45 mm.' },
];

export const TH_READ_MORE = [
  { title: 'TAG Heuer Story', link: '/tag-heuer/story',
    description_de: 'Entdecken Sie TAG Heuers Heritage von Motorsport, Zeitmessung und Chronographen-Exzellenz — von Carrera bis Monaco.',
    description_en: "Explore TAG Heuer's heritage of motorsport, timing, and chronograph excellence — from Carrera to Monaco." },
  { title: 'Carrera vs Formula 1', link: '/tag-heuer-carrera-vs-formula-1',
    description_de: 'Vergleichen Sie TAG Heuer Carrera und Formula 1 — zwei ikonische Kollektionen mit unterschiedlichem Charakter und Preis.',
    description_en: 'Compare TAG Heuer Carrera and Formula 1 — two iconic collections with different character and price points.' },
  { title: 'Connected Calibre E5 Guide', link: '/tag-heuer-connected-calibre-e5-guide',
    description_de: 'Verstehen Sie TAG Heuer Connected Calibre E5 — die Luxus-Smartwatch mit Sport-, Golf- und Wellness-Funktionen.',
    description_en: 'Understand TAG Heuer Connected Calibre E5 — the luxury smartwatch with sport, golf, and wellness features.' },
  { title: 'Aquaracer 300M', link: '/tag-heuer-aquaracer-300m',
    description_de: 'Entdecken Sie die TAG Heuer Aquaracer 300M — eine professionelle Tauchuhr mit 300M Wasserfestigkeit und keramischer Lünette.',
    description_en: 'Discover the TAG Heuer Aquaracer 300M — a professional dive watch with 300M water resistance and ceramic bezel.' },
  { title: 'Carrera Chronograph', link: '/tag-heuer-carrera-chronograph',
    description_de: 'Entdecken Sie TAG Heuer Carrera Chronographen — Rennsport-Chronographen mit Heuer 02 Kaliber und präziser Zeitmessung.',
    description_en: 'Discover TAG Heuer Carrera chronographs — racing chronographs with Heuer 02 caliber and precise timing.' },
  { title: 'Gebrauchte TAG Heuer kaufen', link: '/tag-heuer-gebraucht',
    description_de: 'Was Sie vor dem Kauf einer gebrauchten TAG Heuer prüfen sollten — Zustand, Box und Papiere, Referenznummer und Authentifizierung.',
    description_en: 'What to check before buying a used TAG Heuer — condition, box and papers, reference number, and authentication.' },
];

export const TH_INTERNAL_LINKS = [
  {
    title_de: 'Beliebte TAG Heuer Suchen', title_en: 'Popular TAG Heuer Searches',
    links: [
      { label: 'TAG Heuer Uhr', to: '/tag-heuer-uhr' },
      { label: 'TAG Heuer Uhren', to: '/tag-heuer-uhren' },
      { label: 'TAG Heuer watches', to: '/tag-heuer-watches' },
      { label: 'TAG Heuer Carrera Chronograph', to: '/tag-heuer-carrera-chronograph' },
      { label: 'TAG Heuer Aquaracer 300M', to: '/tag-heuer-aquaracer-300m' },
      { label: 'TAG Heuer Connected Calibre E5', to: '/tag-heuer/connected-calibre-e5' },
    ],
  },
  {
    title_de: 'TAG Heuer Kollektionen', title_en: 'TAG Heuer Collections',
    links: [
      { label: 'Carrera', to: '/tag-heuer/carrera' },
      { label: 'Formula 1', to: '/tag-heuer/formula-1' },
      { label: 'Aquaracer', to: '/tag-heuer/aquaracer' },
      { label: 'Monaco', to: '/tag-heuer/monaco' },
      { label: 'Connected', to: '/tag-heuer/connected' },
      { label: 'Link', to: '/tag-heuer/link' },
      { label: 'Monza', to: '/tag-heuer/monza' },
    ],
  },
  {
    title_de: 'Kaufen & Gebraucht', title_en: 'Buy & Pre-Owned',
    links: [
      { label: 'TAG Heuer kaufen', to: '/tag-heuer-kaufen' },
      { label: 'TAG Heuer Uhr kaufen', to: '/tag-heuer-uhr-kaufen' },
      { label: 'TAG Heuer gebraucht', to: '/tag-heuer-gebraucht' },
      { label: 'TAG Heuer Carrera kaufen', to: '/tag-heuer-carrera-kaufen' },
      { label: 'TAG Heuer Aquaracer kaufen', to: '/tag-heuer-aquaracer-kaufen' },
      { label: 'TAG Heuer Formula 1 kaufen', to: '/tag-heuer-formula-1-kaufen' },
    ],
  },
  {
    title_de: 'Ratgeber & Guides', title_en: 'Guides & Resources',
    links: [
      { label: 'Welche TAG Heuer kaufen?', to: '/welche-tag-heuer-kaufen' },
      { label: 'Carrera vs Formula 1', to: '/tag-heuer-carrera-vs-formula-1' },
      { label: 'Connected Calibre E5 Guide', to: '/tag-heuer-connected-calibre-e5-guide' },
      { label: 'TAG Heuer Story', to: '/tag-heuer/story' },
    ],
  },
  {
    title_de: 'Verwandte Luxusuhren-Marken', title_en: 'Related Luxury Watch Brands',
    links: [
      { label: 'Rolex watches', to: '/brands/rolex' },
      { label: 'Omega watches', to: '/brands/omega' },
      { label: 'Breitling watches', to: '/brands/breitling' },
      { label: 'Hublot watches', to: '/brands/hublot' },
      { label: 'IWC watches', to: '/brands/iwc-schaffhausen' },
      { label: 'Grand Seiko watches', to: '/brands/grand-seiko' },
    ],
  },
];

export const TH_FAQS = [
  {
    q_de: 'Wo kann ich eine TAG Heuer Uhr online kaufen?', q_en: 'Where can I buy a TAG Heuer watch online?',
    a_de: "Sie können TAG Heuer Uhren online bei Kariv Glamour kaufen. Stöbern Sie durch neue und <a href='/tag-heuer-gebraucht'>gebrauchte TAG Heuer</a> Uhren mit transparenten Produktdetails, Referenznummern und Zustandsbewertung.",
    a_en: "You can buy TAG Heuer watches online at Kariv Glamour. Browse new and <a href='/tag-heuer-gebraucht'>pre-owned TAG Heuer</a> watches with transparent product details, reference numbers, and condition grading." },
  {
    q_de: 'Was sind die beliebtesten TAG Heuer Kollektionen?', q_en: 'What are the most popular TAG Heuer collections?',
    a_de: "Die beliebtesten TAG Heuer Kollektionen sind <a href='/tag-heuer/carrera'>Carrera</a> (Renn-Chronographen), <a href='/tag-heuer/aquaracer'>Aquaracer</a> (Tauchuhren), <a href='/tag-heuer/formula-1'>Formula 1</a> (Sportuhren), <a href='/tag-heuer/monaco'>Monaco</a> (Quadratgehäuse-Ikone), <a href='/tag-heuer/connected'>Connected</a> (Smartwatches) und <a href='/tag-heuer/link'>Link</a> (integriertes Armband).",
    a_en: "The most popular TAG Heuer collections are <a href='/tag-heuer/carrera'>Carrera</a> (racing chronographs), <a href='/tag-heuer/aquaracer'>Aquaracer</a> (dive watches), <a href='/tag-heuer/formula-1'>Formula 1</a> (sport watches), <a href='/tag-heuer/monaco'>Monaco</a> (square-case icon), <a href='/tag-heuer/connected'>Connected</a> (smartwatches), and <a href='/tag-heuer/link'>Link</a> (integrated bracelet)." },
  {
    q_de: 'Was ist der Unterschied zwischen TAG Heuer Carrera und Formula 1?', q_en: 'What is the difference between TAG Heuer Carrera and Formula 1?',
    a_de: "Die <a href='/tag-heuer/carrera'>Carrera</a> ist TAG Heuers Premium-Renn-Chronograph mit Heuer 02 Automatik-Kaliber, während die <a href='/tag-heuer/formula-1'>Formula 1</a> eine zugänglichere Sportuhr mit Quarz- und Automatik-Optionen ist. Lesen Sie unseren Vergleich: <a href='/tag-heuer-carrera-vs-formula-1'>Carrera vs Formula 1</a>.",
    a_en: "The <a href='/tag-heuer/carrera'>Carrera</a> is TAG Heuer's premium racing chronograph with Heuer 02 automatic caliber, while the <a href='/tag-heuer/formula-1'>Formula 1</a> is a more accessible sport watch with quartz and automatic options. Read our comparison: <a href='/tag-heuer-carrera-vs-formula-1'>Carrera vs Formula 1</a>." },
  {
    q_de: 'Ist die TAG Heuer Aquaracer gut zum Tauchen?', q_en: 'Is TAG Heuer Aquaracer good for diving?',
    a_de: "Ja. Die <a href='/tag-heuer/aquaracer'>TAG Heuer Aquaracer</a> ist eine professionelle Tauchuhr mit 300M Wasserfestigkeit, keramischer Lünette und verschraubter Krone. Die <a href='/tag-heuer-aquaracer-300m'>Aquaracer 300M</a> ist speziell für Tauch- und Abenteuersport konzipiert.",
    a_en: "Yes. The <a href='/tag-heuer/aquaracer'>TAG Heuer Aquaracer</a> is a professional dive watch with 300M water resistance, ceramic bezel, and screw-down crown. The <a href='/tag-heuer-aquaracer-300m'>Aquaracer 300M</a> is specifically designed for diving and adventure sports." },
  {
    q_de: 'Was ist die TAG Heuer Monaco?', q_en: 'What is the TAG Heuer Monaco?',
    a_de: "Die <a href='/tag-heuer/monaco'>TAG Heuer Monaco</a> ist ein ikonischer Chronograph mit quadratischem Gehäuse, der für seine Rennsport-Verbindung und sein mutiges Design bekannt ist. Sie war eine der ersten Automatik-Chronographen der Welt.",
    a_en: "The <a href='/tag-heuer/monaco'>TAG Heuer Monaco</a> is an iconic chronograph with a square case, known for its racing connection and bold design. It was one of the world's first automatic chronographs." },
  {
    q_de: 'Was ist TAG Heuer Connected Calibre E5?', q_en: 'What is TAG Heuer Connected Calibre E5?',
    a_de: "Das <a href='/tag-heuer/connected-calibre-e5'>TAG Heuer Connected Calibre E5</a> ist die neueste Generation der TAG Heuer Luxus-Smartwatch mit Sport-, Golf-, Lauf- und Wellness-Funktionen, erhältlich in 40 mm und 45 mm Gehäusen aus Titan oder Black DLC. Lesen Sie unseren <a href='/tag-heuer-connected-calibre-e5-guide'>Connected Calibre E5 Guide</a>.",
    a_en: "The <a href='/tag-heuer/connected-calibre-e5'>TAG Heuer Connected Calibre E5</a> is the latest generation of TAG Heuer's luxury smartwatch with sport, golf, running, and wellness features, available in 40 mm and 45 mm titanium or Black DLC cases. Read our <a href='/tag-heuer-connected-calibre-e5-guide'>Connected Calibre E5 Guide</a>." },
  {
    q_de: 'Ist TAG Heuer gut für Herrenuhren?', q_en: 'Is TAG Heuer good for men\'s watches?',
    a_de: "Ja. TAG Heuer bietet eine breite Palette an <a href='/tag-heuer-uhr-herren'>Herrenuhren</a>, von Renn-Chronographen wie der Carrera bis zu Tauchuhren wie der Aquaracer und Sportuhren wie der Formula 1.",
    a_en: "Yes. TAG Heuer offers a wide range of <a href='/tag-heuer-uhr-herren'>men's watches</a>, from racing chronographs like the Carrera to dive watches like the Aquaracer and sport watches like the Formula 1." },
  {
    q_de: 'Was sollte ich vor dem Kauf einer gebrauchten TAG Heuer prüfen?', q_en: 'What should I check before buying a used TAG Heuer?',
    a_de: "Prüfen Sie den Zustand des Gehäuses und Armbands, verifizieren Sie das Uhrwerk (Automatik, Quarz oder Connected), bestätigen Sie Box und Papiere, und überprüfen Sie die Referenznummer. Besuchen Sie unsere Seite für <a href='/tag-heuer-gebraucht'>gebrauchte TAG Heuer</a> mit transparenten Einträgen.",
    a_en: "Check the condition of the case and bracelet, verify the movement (automatic, quartz, or Connected), confirm box and papers, and review the reference number. Visit our <a href='/tag-heuer-gebraucht'>pre-owned TAG Heuer</a> page for transparent listings." },
];

export const TH_SEO_PAGES = {
  'tag-heuer-uhr': {
    h1_de: 'TAG Heuer Uhr', h1_en: 'TAG Heuer Watch',
    title_de: 'TAG Heuer Uhr | Kariv Glamour', title_en: 'TAG Heuer Watch | Kariv Glamour',
    description_de: 'Entdecken Sie TAG Heuer Uhren bei Kariv Glamour — Motorsport-Heritage, Chronographen, Aquaracer, Formula 1, Monaco und Connected.',
    description_en: 'Discover TAG Heuer watches at Kariv Glamour — motorsport heritage, chronographs, Aquaracer, Formula 1, Monaco, and Connected.',
    intro_de: 'Erkunden Sie TAG Heuer Uhren bei Kariv Glamour — mit Motorsport-Heritage, Renn-Chronographen, robusten Aquaracer Tauchuhren, Formula 1 Sportmodellen, der quadratischen Monaco Ikone und der Connected Calibre E5 Smartwatch-Kollektion.',
    intro_en: "Explore TAG Heuer watches at Kariv Glamour — with motorsport heritage, racing chronographs, robust Aquaracer dive watches, Formula 1 sport models, the square Monaco icon, and the Connected Calibre E5 smartwatch collection.",
    filter: {},
  },
  'tag-heuer-uhren': {
    h1_de: 'TAG Heuer Uhren', h1_en: 'TAG Heuer Watches',
    title_de: 'TAG Heuer Uhren | Kariv Glamour', title_en: 'TAG Heuer Watches | Kariv Glamour',
    description_de: 'TAG Heuer Uhren bei Kariv Glamour — Carrera, Aquaracer, Formula 1, Monaco, Connected und Link Kollektionen.',
    description_en: 'TAG Heuer watches at Kariv Glamour — Carrera, Aquaracer, Formula 1, Monaco, Connected, and Link collections.',
    intro_de: 'Stöbern Sie durch TAG Heuer Uhren nach Kollektion, Modell, Uhrwerk, Gehäusegröße, Zustand und Preis.',
    intro_en: 'Browse TAG Heuer watches by collection, model, movement, case size, condition, and price.',
    filter: {},
  },
  'tag-heuer-watches': {
    h1_de: 'TAG Heuer Watches', h1_en: 'TAG Heuer Watches',
    title_de: 'TAG Heuer Watches | Kariv Glamour', title_en: 'TAG Heuer Watches | Kariv Glamour',
    description_de: 'TAG Heuer Watches bei Kariv Glamour — Carrera, Aquaracer, Formula 1, Monaco und Connected.',
    description_en: 'TAG Heuer watches at Kariv Glamour — Carrera, Aquaracer, Formula 1, Monaco, and Connected.',
    intro_de: 'Entdecken Sie TAG Heuer Watches bei Kariv Glamour — Motorsport-Heritage, Chronographen und Smartwatches.',
    intro_en: 'Discover TAG Heuer watches at Kariv Glamour — motorsport heritage, chronographs, and smartwatches.',
    filter: {},
  },
  'tag-heuer-uhr-herren': {
    h1_de: 'TAG Heuer Uhr Herren', h1_en: "TAG Heuer Men's Watches",
    title_de: 'TAG Heuer Uhr Herren | Kariv Glamour', title_en: "TAG Heuer Men's Watches | Kariv Glamour",
    description_de: 'TAG Heuer Uhr Herren bei Kariv Glamour — Carrera, Aquaracer, Formula 1 und Monaco Modelle für Männer.',
    description_en: "TAG Heuer men's watches at Kariv Glamour — Carrera, Aquaracer, Formula 1, and Monaco models for men.",
    intro_de: 'Entdecken Sie TAG Heuer Uhren für Herren — von der Carrera über die Aquaracer bis zur Formula 1 und Monaco.',
    intro_en: "Discover TAG Heuer watches for men — from Carrera to Aquaracer, Formula 1, and Monaco.",
    filter: { gender: 'Men' },
  },
  'tag-heuer-uhren-herren': {
    h1_de: 'TAG Heuer Uhren Herren', h1_en: "TAG Heuer Men's Watches",
    title_de: 'TAG Heuer Uhren Herren | Kariv Glamour', title_en: "TAG Heuer Men's Watches | Kariv Glamour",
    description_de: 'TAG Heuer Uhren Herren bei Kariv Glamour — Renn-Chronographen, Tauchuhren und Sportuhren für Männer.',
    description_en: "TAG Heuer men's watches at Kariv Glamour — racing chronographs, dive watches, and sport watches for men.",
    intro_de: 'Stöbern Sie durch TAG Heuer Uhren für Herren — Chronographen, Tauchuhren und Sportmodelle.',
    intro_en: "Browse TAG Heuer watches for men — chronographs, dive watches, and sport models.",
    filter: { gender: 'Men' },
  },
  'tag-heuer-damenuhr': {
    h1_de: 'TAG Heuer Damenuhr', h1_en: "TAG Heuer Women's Watch",
    title_de: 'TAG Heuer Damenuhr | Kariv Glamour', title_en: "TAG Heuer Women's Watch | Kariv Glamour",
    description_de: 'TAG Heuer Damenuhren bei Kariv Glamour — elegante Sportuhren in kleineren Gehäusegrößen.',
    description_en: "TAG Heuer women's watches at Kariv Glamour — elegant sport watches in smaller case sizes.",
    intro_de: 'Entdecken Sie TAG Heuer Damenuhren — elegante Sportuhren in kleineren Gehäusegrößen mit Quarz- und Automatik-Optionen.',
    intro_en: "Discover TAG Heuer women's watches — elegant sport watches in smaller case sizes with quartz and automatic options.",
    filter: { gender: 'Women' },
  },
  'tag-heuer-kaufen': {
    h1_de: 'TAG Heuer kaufen', h1_en: 'Buy TAG Heuer',
    title_de: 'TAG Heuer kaufen | Kariv Glamour', title_en: 'Buy TAG Heuer | Kariv Glamour',
    description_de: 'TAG Heuer kaufen bei Kariv Glamour — neue und gebrauchte Modelle mit transparenter Produktinformation.',
    description_en: 'Buy TAG Heuer at Kariv Glamour — new and pre-owned models with transparent product information.',
    intro_de: 'TAG Heuer kaufen bei Kariv Glamour: neue und gebrauchte Modelle mit transparenter Produktinformation.',
    intro_en: 'Buy TAG Heuer at Kariv Glamour: new and pre-owned models with transparent product information.',
    filter: {},
  },
  'tag-heuer-uhr-kaufen': {
    h1_de: 'TAG Heuer Uhr kaufen', h1_en: 'Buy TAG Heuer Watch',
    title_de: 'TAG Heuer Uhr kaufen | Kariv Glamour', title_en: 'Buy TAG Heuer Watch | Kariv Glamour',
    description_de: 'TAG Heuer Uhr kaufen bei Kariv Glamour — Carrera, Aquaracer, Formula 1, Monaco und Connected.',
    description_en: 'Buy TAG Heuer watch at Kariv Glamour — Carrera, Aquaracer, Formula 1, Monaco, and Connected.',
    intro_de: 'TAG Heuer Uhr kaufen bei Kariv Glamour — entdecken Sie Modelle aus den Kollektionen Carrera, Aquaracer, Formula 1, Monaco, Connected und Link.',
    intro_en: 'Buy TAG Heuer watch at Kariv Glamour — discover models from the Carrera, Aquaracer, Formula 1, Monaco, Connected, and Link collections.',
    filter: {},
  },
  'tag-heuer-carrera-kaufen': {
    h1_de: 'TAG Heuer Carrera kaufen', h1_en: 'Buy TAG Heuer Carrera',
    title_de: 'TAG Heuer Carrera kaufen | Kariv Glamour', title_en: 'Buy TAG Heuer Carrera | Kariv Glamour',
    description_de: 'TAG Heuer Carrera kaufen bei Kariv Glamour — Renn-Chronographen mit Heuer 02 Kaliber.',
    description_en: 'Buy TAG Heuer Carrera at Kariv Glamour — racing chronographs with Heuer 02 caliber.',
    intro_de: 'TAG Heuer Carrera kaufen bei Kariv Glamour — Rennsport-inspirierte Chronographen mit Automatik-Kaliber und klarem Design.',
    intro_en: 'Buy TAG Heuer Carrera at Kariv Glamour — racing-inspired chronographs with automatic caliber and clean design.',
    filter: { collection: 'Carrera' },
  },
  'tag-heuer-aquaracer-kaufen': {
    h1_de: 'TAG Heuer Aquaracer kaufen', h1_en: 'Buy TAG Heuer Aquaracer',
    title_de: 'TAG Heuer Aquaracer kaufen | Kariv Glamour', title_en: 'Buy TAG Heuer Aquaracer | Kariv Glamour',
    description_de: 'TAG Heuer Aquaracer kaufen bei Kariv Glamour — Tauchuhren mit 300M Wasserfestigkeit.',
    description_en: 'Buy TAG Heuer Aquaracer at Kariv Glamour — dive watches with 300M water resistance.',
    intro_de: 'TAG Heuer Aquaracer kaufen bei Kariv Glamour — robuste Tauchuhren mit 300M Wasserfestigkeit und keramischer Lünette.',
    intro_en: 'Buy TAG Heuer Aquaracer at Kariv Glamour — robust dive watches with 300M water resistance and ceramic bezel.',
    filter: { collection: 'Aquaracer' },
  },
  'tag-heuer-formula-1-kaufen': {
    h1_de: 'TAG Heuer Formula 1 kaufen', h1_en: 'Buy TAG Heuer Formula 1',
    title_de: 'TAG Heuer Formula 1 kaufen | Kariv Glamour', title_en: 'Buy TAG Heuer Formula 1 | Kariv Glamour',
    description_de: 'TAG Heuer Formula 1 kaufen bei Kariv Glamour — Sportuhren mit Renncharakter.',
    description_en: 'Buy TAG Heuer Formula 1 at Kariv Glamour — sport watches with racing character.',
    intro_de: 'TAG Heuer Formula 1 kaufen bei Kariv Glamour — sportliche Uhren mit Renncharakter, Quarz- und Automatik-Optionen.',
    intro_en: 'Buy TAG Heuer Formula 1 at Kariv Glamour — sporty watches with racing character, quartz and automatic options.',
    filter: { collection: 'Formula 1' },
  },
  'tag-heuer-monaco-kaufen': {
    h1_de: 'TAG Heuer Monaco kaufen', h1_en: 'Buy TAG Heuer Monaco',
    title_de: 'TAG Heuer Monaco kaufen | Kariv Glamour', title_en: 'Buy TAG Heuer Monaco | Kariv Glamour',
    description_de: 'TAG Heuer Monaco kaufen bei Kariv Glamour — Quadratgehäuse-Chronograph mit Rennsport-Heritage.',
    description_en: 'Buy TAG Heuer Monaco at Kariv Glamour — square-case chronograph with racing heritage.',
    intro_de: 'TAG Heuer Monaco kaufen bei Kariv Glamour — der ikonische Quadrat-Chronograph mit Rennsport-Verbindung.',
    intro_en: 'Buy TAG Heuer Monaco at Kariv Glamour — the iconic square chronograph with racing connection.',
    filter: { collection: 'Monaco' },
  },
  'tag-heuer-gebraucht': {
    h1_de: 'TAG Heuer gebraucht', h1_en: 'Pre-Owned TAG Heuer',
    title_de: 'TAG Heuer gebraucht | Kariv Glamour', title_en: 'Pre-Owned TAG Heuer | Kariv Glamour',
    description_de: 'Gebrauchte TAG Heuer Uhren bei Kariv Glamour mit transparenter Zustandsbewertung.',
    description_en: 'Pre-owned TAG Heuer watches at Kariv Glamour with transparent condition grading.',
    intro_de: 'Entdecken Sie gebrauchte TAG Heuer Uhren mit klarer Zustandsbewertung, Box und Papers und detaillierten Produktdaten.',
    intro_en: 'Discover pre-owned TAG Heuer watches with clear condition grading, box and papers, and detailed product data.',
    filter: {},
  },
  'tag-heuer-carrera-chronograph': {
    h1_de: 'TAG Heuer Carrera Chronograph', h1_en: 'TAG Heuer Carrera Chronograph',
    title_de: 'TAG Heuer Carrera Chronograph | Kariv Glamour', title_en: 'TAG Heuer Carrera Chronograph | Kariv Glamour',
    description_de: 'TAG Heuer Carrera Chronograph — Rennsport-Chronographen mit Heuer 02 Kaliber und präziser Zeitmessung.',
    description_en: 'TAG Heuer Carrera Chronograph — racing chronographs with Heuer 02 caliber and precise timing.',
    intro_de: 'Entdecken Sie TAG Heuer Carrera Chronographen — Rennsport-inspirierte Chronographen mit Heuer 02 Automatik-Kaliber und Tachymeter-Lünette.',
    intro_en: 'Discover TAG Heuer Carrera chronographs — racing-inspired chronographs with Heuer 02 automatic caliber and tachymeter bezel.',
    filter: { collection: 'Carrera' },
    clientFilter: (p) => {
      const f = [p.functions, p.model, p.productTitle, p.movementType].filter(Boolean).join(' ').toLowerCase();
      return f.includes('chronograph') || f.includes('chrono');
    },
  },
  'tag-heuer-formula-1-chronograph': {
    h1_de: 'TAG Heuer Formula 1 Chronograph', h1_en: 'TAG Heuer Formula 1 Chronograph',
    title_de: 'TAG Heuer Formula 1 Chronograph | Kariv Glamour', title_en: 'TAG Heuer Formula 1 Chronograph | Kariv Glamour',
    description_de: 'TAG Heuer Formula 1 Chronograph — sportliche Chronographen mit Renncharakter.',
    description_en: 'TAG Heuer Formula 1 Chronograph — sporty chronographs with racing character.',
    intro_de: 'Entdecken Sie TAG Heuer Formula 1 Chronographen — sportliche Chronographen mit mutigem Renncharakter und Quarz- oder Automatik-Werk.',
    intro_en: 'Discover TAG Heuer Formula 1 chronographs — sporty chronographs with bold racing character and quartz or automatic movement.',
    filter: { collection: 'Formula 1' },
    clientFilter: (p) => {
      const f = [p.functions, p.model, p.productTitle, p.movementType].filter(Boolean).join(' ').toLowerCase();
      return f.includes('chronograph') || f.includes('chrono');
    },
  },
  'tag-heuer-aquaracer-300m': {
    h1_de: 'TAG Heuer Aquaracer 300M', h1_en: 'TAG Heuer Aquaracer 300M',
    title_de: 'TAG Heuer Aquaracer 300M | Kariv Glamour', title_en: 'TAG Heuer Aquaracer 300M | Kariv Glamour',
    description_de: 'TAG Heuer Aquaracer 300M — professionelle Tauchuhr mit 300M Wasserfestigkeit.',
    description_en: 'TAG Heuer Aquaracer 300M — professional dive watch with 300M water resistance.',
    intro_de: 'Entdecken Sie die TAG Heuer Aquaracer 300M — eine professionelle Tauchuhr mit 300M Wasserfestigkeit, keramischer Lünette und verschraubter Krone.',
    intro_en: 'Discover the TAG Heuer Aquaracer 300M — a professional dive watch with 300M water resistance, ceramic bezel, and screw-down crown.',
    filter: { collection: 'Aquaracer' },
    clientFilter: (p) => {
      const f = [p.functions, p.model, p.productTitle, p.waterResistance].filter(Boolean).join(' ').toLowerCase();
      return f.includes('300') || f.includes('300m') || f.includes('aquaracer');
    },
  },
  'tag-heuer-chronograph': {
    h1_de: 'TAG Heuer Chronograph', h1_en: 'TAG Heuer Chronograph',
    title_de: 'TAG Heuer Chronograph | Kariv Glamour', title_en: 'TAG Heuer Chronograph | Kariv Glamour',
    description_de: 'TAG Heuer Chronograph — Rennsport-Chronographen von Carrera bis Monaco.',
    description_en: 'TAG Heuer chronographs — racing chronographs from Carrera to Monaco.',
    intro_de: 'Entdecken Sie TAG Heuer Chronographen — von der Carrera über die Monaco bis zur Formula 1, mit Heuer 02 Kaliber und präziser Zeitmessung.',
    intro_en: 'Discover TAG Heuer chronographs — from Carrera to Monaco to Formula 1, with Heuer 02 caliber and precise timing.',
    filter: {},
    clientFilter: (p) => {
      const f = [p.functions, p.model, p.productTitle, p.movementType].filter(Boolean).join(' ').toLowerCase();
      return f.includes('chronograph') || f.includes('chrono');
    },
  },
  'welche-tag-heuer-kaufen': {
    h1_de: 'Welche TAG Heuer kaufen?', h1_en: 'Which TAG Heuer to Buy?',
    title_de: 'Welche TAG Heuer kaufen | Kariv Glamour', title_en: 'Which TAG Heuer to Buy | Kariv Glamour',
    description_de: 'TAG Heuer Kaufberatung — vergleichen Sie Carrera, Aquaracer, Formula 1, Monaco und Connected.',
    description_en: 'TAG Heuer buying guide — compare Carrera, Aquaracer, Formula 1, Monaco, and Connected.',
    intro_de: 'Welche TAG Heuer Uhr passt zu Ihnen? Vergleichen Sie Kollektionen, Uhrwerke, Gehäusegrößen und Funktionen, um die richtige Entscheidung zu treffen.',
    intro_en: 'Which TAG Heuer watch is right for you? Compare collections, movements, case sizes, and features to make the right decision.',
    isGuide: true,
    guideContent_de: [
      "TAG Heuer ist bekannt für Motorsport-Heritage, Renn-Chronographen und Sportuhren. Die wichtigsten Kollektionen sind <a href='/tag-heuer/carrera'>Carrera</a> (Renn-Chronographen), <a href='/tag-heuer/aquaracer'>Aquaracer</a> (Tauchuhren mit 300M Wasserfestigkeit), <a href='/tag-heuer/formula-1'>Formula 1</a> (zugängliche Sportuhren), <a href='/tag-heuer/monaco'>Monaco</a> (Quadrat-Chronograph), <a href='/tag-heuer/connected'>Connected</a> (Luxus-Smartwatches) und <a href='/tag-heuer/link'>Link</a> (integriertes Armband).",
      "Für Rennsport-Fans ist die <a href='/tag-heuer/carrera'>Carrera</a> mit Heuer 02 Automatik-Kaliber die beste Wahl. Für Tauch- und Abenteuersport empfiehlt sich die <a href='/tag-heuer/aquaracer'>Aquaracer</a> mit 300M Wasserfestigkeit. Für zugänglichen Sport-Luxus ist die <a href='/tag-heuer/formula-1'>Formula 1</a> ideal. Für Smartwatch-Fans ist das <a href='/tag-heuer/connected-calibre-e5'>Connected Calibre E5</a> die richtige Wahl.",
      "Bei Kariv Glamour wird jede TAG Heuer Uhr mit transparenten Produktdetails, klarer Zustandsbewertung und Referenznummer-Sichtbarkeit präsentiert. Wir verkaufen keine Replikate oder gefälschte Uhren.",
    ],
    guideContent_en: [
      "TAG Heuer is known for motorsport heritage, racing chronographs, and sport watches. The main collections are <a href='/tag-heuer/carrera'>Carrera</a> (racing chronographs), <a href='/tag-heuer/aquaracer'>Aquaracer</a> (dive watches with 300M water resistance), <a href='/tag-heuer/formula-1'>Formula 1</a> (accessible sport watches), <a href='/tag-heuer/monaco'>Monaco</a> (square chronograph), <a href='/tag-heuer/connected'>Connected</a> (luxury smartwatches), and <a href='/tag-heuer/link'>Link</a> (integrated bracelet).",
      "For motorsport fans, the <a href='/tag-heuer/carrera'>Carrera</a> with Heuer 02 automatic caliber is the best choice. For diving and adventure sports, the <a href='/tag-heuer/aquaracer'>Aquaracer</a> with 300M water resistance is recommended. For accessible sport luxury, the <a href='/tag-heuer/formula-1'>Formula 1</a> is ideal. For smartwatch fans, the <a href='/tag-heuer/connected-calibre-e5'>Connected Calibre E5</a> is the right choice.",
      "At Kariv Glamour, each TAG Heuer timepiece is presented with transparent product details, clear condition grading, and reference number visibility. We do not sell replica or counterfeit watches.",
    ],
  },
  'tag-heuer-carrera-vs-formula-1': {
    h1_de: 'TAG Heuer Carrera vs Formula 1', h1_en: 'TAG Heuer Carrera vs Formula 1',
    title_de: 'TAG Heuer Carrera vs Formula 1 | Kariv Glamour', title_en: 'TAG Heuer Carrera vs Formula 1 | Kariv Glamour',
    description_de: 'Vergleich der TAG Heuer Carrera und Formula 1 — zwei ikonische Kollektionen mit unterschiedlichem Charakter.',
    description_en: 'Comparison of TAG Heuer Carrera and Formula 1 — two iconic collections with different character.',
    intro_de: 'Der Vergleich zwischen TAG Heuer Carrera und Formula 1: Beide sind sportliche Uhren, aber die Carrera ist ein Premium-Renn-Chronograph mit Heuer 02 Automatik-Kaliber, während die Formula 1 eine zugänglichere Sportuhr mit Quarz- und Automatik-Optionen ist.',
    intro_en: 'The comparison between TAG Heuer Carrera and Formula 1: Both are sporty watches, but the Carrera is a premium racing chronograph with Heuer 02 automatic caliber, while the Formula 1 is a more accessible sport watch with quartz and automatic options.',
    isGuide: true,
    guideContent_de: [
      "Die <a href='/tag-heuer/carrera'>TAG Heuer Carrera</a> ist die Premium-Renn-Kollektion mit Heuer 02 Automatik-Chronographen-Kaliber, während die <a href='/tag-heuer/formula-1'>Formula 1</a> eine zugänglichere Sport-Kollektion mit Quarz- und Automatik-Optionen ist.",
      "Die Carrera richtet sich an Rennsport-Enthusiasten, die ein Premium-Automatik-Chronograph suchen, während die Formula 1 ideal für Alltagssport und zugänglichen Luxus ist. Beide bieten <a href='/tag-heuer-chronograph'>Chronograph</a> Varianten.",
      "Bei Kariv Glamour können Sie beide Kollektionen vergleichen und die TAG Heuer finden, die am besten zu Ihrem Stil und Budget passt.",
    ],
    guideContent_en: [
      "The <a href='/tag-heuer/carrera'>TAG Heuer Carrera</a> is the premium racing collection with Heuer 02 automatic chronograph caliber, while the <a href='/tag-heuer/formula-1'>Formula 1</a> is a more accessible sport collection with quartz and automatic options.",
      "The Carrera is aimed at motorsport enthusiasts seeking a premium automatic chronograph, while the Formula 1 is ideal for everyday sport and accessible luxury. Both offer <a href='/tag-heuer-chronograph'>chronograph</a> variants.",
      "At Kariv Glamour, you can compare both collections and find the TAG Heuer that best fits your style and budget.",
    ],
  },
  'tag-heuer-connected-calibre-e5-guide': {
    h1_de: 'TAG Heuer Connected Calibre E5 Guide', h1_en: 'TAG Heuer Connected Calibre E5 Guide',
    title_de: 'TAG Heuer Connected Calibre E5 Guide | Kariv Glamour', title_en: 'TAG Heuer Connected Calibre E5 Guide | Kariv Glamour',
    description_de: 'Verstehen Sie TAG Heuer Connected Calibre E5 — die Luxus-Smartwatch mit Sport-, Golf- und Wellness-Funktionen.',
    description_en: 'Understand TAG Heuer Connected Calibre E5 — the luxury smartwatch with sport, golf, and wellness features.',
    intro_de: 'Das TAG Heuer Connected Calibre E5 ist die neueste Generation der TAG Heuer Luxus-Smartwatch mit Sport-, Golf-, Lauf- und Wellness-Funktionen in 40 mm und 45 mm Gehäusen.',
    intro_en: 'The TAG Heuer Connected Calibre E5 is the latest generation of TAG Heuer\'s luxury smartwatch with sport, golf, running, and wellness features in 40 mm and 45 mm cases.',
    isGuide: true,
    guideContent_de: [
      "Das <a href='/tag-heuer/connected-calibre-e5'>TAG Heuer Connected Calibre E5</a> ist TAG Heuers neueste Luxus-Smartwatch-Generation, erhältlich in 40 mm und 45 mm Gehäusen aus Titan oder Black DLC. Es bietet Sport-, Golf-, Lauf- und Wellness-Funktionen.",
      "Im Gegensatz zu mechanischen TAG Heuer Uhren wie der <a href='/tag-heuer/carrera'>Carrera</a> oder der <a href='/tag-heuer/monaco'>Monaco</a> ist das Connected eine digitale Smartwatch mit Wechselarmband, Fitness-Tracking und digitalen Komplikationen. Es sollte klar von mechanischen und Quarz-Modellen getrennt betrachtet werden.",
      "Bei Kariv Glamour präsentieren wir das <a href='/tag-heuer/connected'>Connected</a> als eigenständige Smartwatch-Kollektion, separat von mechanischen TAG Heuer Uhren.",
    ],
    guideContent_en: [
      "The <a href='/tag-heuer/connected-calibre-e5'>TAG Heuer Connected Calibre E5</a> is TAG Heuer's latest luxury smartwatch generation, available in 40 mm and 45 mm titanium or Black DLC cases. It offers sport, golf, running, and wellness features.",
      "Unlike mechanical TAG Heuer watches like the <a href='/tag-heuer/carrera'>Carrera</a> or <a href='/tag-heuer/monaco'>Monaco</a>, the Connected is a digital smartwatch with interchangeable straps, fitness tracking, and digital complications. It should be considered separately from mechanical and quartz models.",
      "At Kariv Glamour, we present the <a href='/tag-heuer/connected'>Connected</a> as a distinct smartwatch collection, separate from mechanical TAG Heuer watches.",
    ],
  },
  'tag-heuer-story': {
    h1_de: 'TAG Heuer Story', h1_en: 'TAG Heuer Story',
    title_de: 'TAG Heuer Story | Kariv Glamour', title_en: 'TAG Heuer Story | Kariv Glamour',
    description_de: 'Die TAG Heuer Story — Motorsport-Heritage, Renn-Chronographen und Sportuhren von Carrera bis Monaco.',
    description_en: 'The TAG Heuer story — motorsport heritage, racing chronographs, and sport watches from Carrera to Monaco.',
    intro_de: 'TAG Heuer steht für Motorsport-Heritage, Renn-Chronographen und Sportuhren — von der Carrera über die Monaco bis zur Aquaracer, Formula 1 und Connected Smartwatch.',
    intro_en: "TAG Heuer stands for motorsport heritage, racing chronographs, and sport watches — from Carrera to Monaco to Aquaracer, Formula 1, and Connected smartwatch.",
    isGuide: true,
    guideContent_de: [
      "TAG Heuer wurde 1860 von Edouard Heuer in der Schweiz gegründet und ist bekannt für seine Verbindung zum Motorsport, Renn-Chronographen und Sportuhren. Die wichtigsten Kollektionen sind <a href='/tag-heuer/carrera'>Carrera</a> (Renn-Chronographen), <a href='/tag-heuer/aquaracer'>Aquaracer</a> (Tauchuhren), <a href='/tag-heuer/formula-1'>Formula 1</a> (Sportuhren), <a href='/tag-heuer/monaco'>Monaco</a> (Quadrat-Chronograph), <a href='/tag-heuer/connected'>Connected</a> (Smartwatches) und <a href='/tag-heuer/link'>Link</a> (integriertes Armband).",
      "Die <a href='/tag-heuer/carrera'>Carrera</a> wurde 1963 als Renn-Chronograph eingeführt und ist heute TAG Heuers wichtigste Kollektion mit dem Heuer 02 Automatik-Kaliber. Die <a href='/tag-heuer/monaco'>Monaco</a> mit ihrem ikonischen Quadratgehäuse wurde durch Steve McQueen berühmt. Die <a href='/tag-heuer/aquaracer'>Aquaracer</a> ist TAG Heuers Tauchuhr-Kollektion mit 300M Wasserfestigkeit.",
      "Bei Kariv Glamour finden Sie eine kuratierte Auswahl an TAG Heuer Uhren — von neuen Modellen bis zu <a href='/tag-heuer-gebraucht'>gebrauchten TAG Heuer</a> mit transparenter Zustandsbewertung.",
    ],
    guideContent_en: [
      "TAG Heuer was founded in 1860 by Edouard Heuer in Switzerland and is known for its connection to motorsport, racing chronographs, and sport watches. The main collections are <a href='/tag-heuer/carrera'>Carrera</a> (racing chronographs), <a href='/tag-heuer/aquaracer'>Aquaracer</a> (dive watches), <a href='/tag-heuer/formula-1'>Formula 1</a> (sport watches), <a href='/tag-heuer/monaco'>Monaco</a> (square chronograph), <a href='/tag-heuer/connected'>Connected</a> (smartwatches), and <a href='/tag-heuer/link'>Link</a> (integrated bracelet).",
      "The <a href='/tag-heuer/carrera'>Carrera</a> was introduced in 1963 as a racing chronograph and is now TAG Heuer's flagship collection with the Heuer 02 automatic caliber. The <a href='/tag-heuer/monaco'>Monaco</a> with its iconic square case was made famous by Steve McQueen. The <a href='/tag-heuer/aquaracer'>Aquaracer</a> is TAG Heuer's dive watch collection with 300M water resistance.",
      "At Kariv Glamour, you'll find a curated selection of TAG Heuer watches — from new models to <a href='/tag-heuer-gebraucht'>pre-owned TAG Heuer</a> with transparent condition grading.",
    ],
  },
};