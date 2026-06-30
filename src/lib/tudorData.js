// Tudor collections, filters, and SEO data
// Tudor is positioned as robust Swiss luxury with tool-watch character,
// Black Bay heritage, dive watches, sport models, and versatile everyday luxury.

const IMG_HERO = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/1ce2737fe_tudor-watch-hub-new-watches-cover-bpm.jpg';
const IMG_BB_BLUE = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/d46e230c9_TudorBlackbayblueuhr.png';
const IMG_BB58_LEATHER = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/a678b51ee_TudorBlackBay5839mmSteelCaseBrownLeatherStrapM79030N-0002.webp';
const IMG_BB58_STEEL = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/4f808f5ce_TUDORBlackBay58M7939A1A0NU-0002.jpg';
const IMG_1926_BLUE = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/aabac9495_TUDORBlackBayBlueDial31mmLadiesWatchM79600-0002.jpg';
const IMG_BB_GMT = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/49c1e1d6f_TudorBlackBayGMT.png';
const IMG_BB_GMT_SG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/58a90def6_TudorMensWatchBlackBayGMTSGM79833MN-0001.jpg';

export const TUDOR_HERO_IMAGE = IMG_HERO;
export const TUDOR_STORY_IMAGE = IMG_BB58_LEATHER;

export const TUDOR_COLLECTIONS = [
  { id: 1, name: 'Black Bay', slug: 'black-bay', image: IMG_BB_BLUE,
    shortDescription_de: "Tudors bekannteste Uhrenfamilie, bekannt für vintage-inspiriertes Tauchuhr-Design, starke Alltagstauglichkeit, GMT-Modelle, Chronographen und modernen Tool-Watch-Charakter.",
    shortDescription_en: "Tudor's most recognizable watch family, known for vintage-inspired dive-watch design, strong daily wearability, GMT models, chronographs and modern tool-watch character." },
  { id: 2, name: 'Pelagos', slug: 'pelagos', image: '',
    shortDescription_de: "Eine professionelle Tudor Tauchuhr-Kollektion mit technischen Materialien, hoher Wasserfestigkeit, starker Ablesbarkeit und ernsthaftem Sport-Uhren-Anspruch.",
    shortDescription_en: "A professional Tudor dive-watch collection with technical materials, high water resistance, strong legibility and serious sport-watch appeal." },
  { id: 3, name: 'Tudor Royal', slug: 'tudor-royal', image: '',
    shortDescription_de: "Eine vielseitige Tudor Kollektion mit integriertem Armband-Design, Day-Date-Optionen, verfeinertem Alltags-Stil und Größen für Herren und Damen.",
    shortDescription_en: "A versatile Tudor collection with integrated bracelet design, day-date options, refined everyday styling and sizes for men and women." },
  { id: 4, name: 'Ranger', slug: 'ranger', image: '',
    shortDescription_de: "Eine klare Field-Watch-Kollektion mit robuster Einfachheit, starker Ablesbarkeit und Tool-Watch-Charakter.",
    shortDescription_en: "A clean field-watch collection with rugged simplicity, strong legibility and tool-watch character." },
  { id: 5, name: '1926', slug: '1926', image: IMG_1926_BLUE,
    shortDescription_de: "Eine klassische Tudor Kollektion mit eleganten Proportionen, Alltags-Tragkomfort, Automatik-Uhrwerken und zugänglichem Schweizer Luxus.",
    shortDescription_en: "A classic Tudor collection focused on elegant proportions, everyday wear, automatic movements and accessible Swiss luxury." },
  { id: 6, name: 'Clair de Rose', slug: 'clair-de-rose', image: '',
    shortDescription_de: "Eine Tudor Damenuhren-Kollektion mit verfeinerten Gehäusegrößen, eleganten Zifferblättern und einem dezenteren Luxus-Uhren-Profil.",
    shortDescription_en: "A women's Tudor collection with refined case sizes, elegant dials and a more delicate luxury-watch profile." },
];

export const TUDOR_BLACK_BAY_SUBFAMILIES = [
  { name: 'Black Bay 54', slug: 'black-bay-54', image: '' },
  { name: 'Black Bay 58', slug: 'black-bay-58', image: IMG_BB58_LEATHER },
  { name: 'Black Bay Pro', slug: 'black-bay-pro', image: '' },
  { name: 'Black Bay GMT', slug: 'black-bay-gmt', image: IMG_BB_GMT },
  { name: 'Black Bay Chrono', slug: 'black-bay-chrono', image: '' },
  { name: 'Black Bay Bronze', slug: 'black-bay-bronze', image: '' },
  { name: 'Black Bay Ceramic', slug: 'black-bay-ceramic', image: '' },
];

export const TUDOR_CASE_MATERIALS = ['Stainless Steel', 'Titanium', 'Bronze', 'Ceramic', 'Gold', 'Steel and Gold', 'Two-tone / Bicolor', 'Diamond-set'];
export const TUDOR_MOVEMENTS = ['Automatic', 'Manufacture Calibre', 'COSC Certified', 'Master Chronometer', 'METAS Certified', 'GMT', 'Chronograph'];
export const TUDOR_DIAL_COLORS = ['Black', 'Blue', 'Burgundy', 'Silver', 'Champagne', 'White', 'Green', 'Brown', 'Grey', 'Mother of Pearl'];
export const TUDOR_FEATURES = ['Black Bay', 'Snowflake hands', 'Rotating bezel', 'GMT', 'Chronograph', 'Dive watch', 'Field watch', 'Integrated bracelet', 'Master Chronometer', 'METAS certified', 'COSC certified', 'Manufacture calibre', 'Full set', 'Date', 'Day-Date'];
export const TUDOR_WATCH_TYPES = ['Mechanical', 'Quartz'];
export const TUDOR_BRACELETS = ['Steel bracelet', 'Five-link bracelet', 'Rubber strap', 'Leather strap', 'Fabric strap', 'NATO-style strap', 'Steel and gold bracelet'];
export const TUDOR_CASE_SIZES = ['26 mm', '28 mm', '31 mm', '34 mm', '36 mm', '39 mm', '41 mm', '42 mm', '43 mm'];
export const TUDOR_TYPES = ['New', 'Pre-Owned', 'Vintage'];
export const TUDOR_BOX_PAPERS = ['Box included', 'Papers included', 'Full set'];
export const TUDOR_AVAILABILITY = ['In Stock', 'Reserved', 'Coming Soon', 'Sold'];

export const TUDOR_QUICK_FILTERS = [
  { label: 'Black Bay', link: '/tudor/black-bay' },
  { label: 'Pelagos', link: '/tudor/pelagos' },
  { label: 'Tudor Royal', link: '/tudor/tudor-royal' },
  { label: '1926', link: '/tudor/1926' },
  { label: 'Ranger', link: '/tudor/ranger' },
  { label: 'Herren', link: '/tudor-uhr-herren' },
  { label: 'Damen', link: '/tudor-uhr-damen' },
  { label: 'Gebraucht', link: '/tudor-gebraucht' },
];

export const TUDOR_SEO_CARDS = [
  { title: 'Tudor Uhr', link: '/tudor-uhr',
    description_de: 'Entdecken Sie Tudor Uhren bei Kariv Glamour — Black Bay Heritage, Pelagos Tauchuhren, Tudor Royal, 1926 und Ranger Modelle.',
    description_en: 'Explore Tudor watches at Kariv Glamour — Black Bay heritage, Pelagos dive watches, Tudor Royal, 1926 and Ranger models.' },
  { title: 'Tudor Uhr kaufen', link: '/tudor-uhr-kaufen',
    description_de: 'Tudor Uhren kaufen bei Kariv Glamour — neue und gebrauchte Modelle mit transparenter Produktinformation und Zustandsbewertung.',
    description_en: 'Buy Tudor watches at Kariv Glamour — new and pre-owned models with transparent product information and condition grading.' },
  { title: 'Tudor Black Bay Uhr', link: '/tudor-black-bay-uhr',
    description_de: 'Entdecken Sie die Tudor Black Bay Kollektion — vintage-inspirierte Tauchuhren mit Snowflake-Zeigern, drehbarer Lünette und robustem Charakter.',
    description_en: 'Discover the Tudor Black Bay collection — vintage-inspired dive watches with snowflake hands, rotating bezel and robust character.' },
  { title: 'Tudor Uhr Herren', link: '/tudor-uhr-herren',
    description_de: 'Tudor Herrenuhren bei Kariv Glamour — Black Bay, Pelagos, Ranger und Tudor Royal Modelle für Männer.',
    description_en: "Tudor men's watches at Kariv Glamour — Black Bay, Pelagos, Ranger and Tudor Royal models for men." },
  { title: 'Tudor Royal Uhr', link: '/tudor-royal-uhr',
    description_de: 'Entdecken Sie Tudor Royal — vielseitige Uhren mit integriertem Armband, Day-Date und verfeinertem Alltags-Stil.',
    description_en: 'Discover Tudor Royal — versatile watches with integrated bracelet, day-date and refined everyday styling.' },
  { title: 'Tudor Uhr Damen', link: '/tudor-uhr-damen',
    description_de: 'Tudor Damenuhren bei Kariv Glamour — Clair de Rose, 1926 und Tudor Royal Modelle in eleganten, kleineren Gehäusen.',
    description_en: "Tudor women's watches at Kariv Glamour — Clair de Rose, 1926 and Tudor Royal models in elegant, smaller case sizes." },
];

export const TUDOR_READ_MORE = [
  { title: 'Tudor Story', link: '/tudor/story',
    description_de: 'Entdecken Sie Tudors Heritage von robuster Schweizer Uhrmacherkunst, Tool-Watch-Charakter und Black Bay Tauchuhr-Tradition.',
    description_en: "Explore Tudor's heritage of robust Swiss watchmaking, tool-watch character and Black Bay dive-watch tradition." },
  { title: 'Tudor Black Bay Guide', link: '/tudor-black-bay-guide',
    description_de: 'Verstehen Sie die Tudor Black Bay Familie — von Black Bay 54 über 58 bis GMT, Chrono und Bronze.',
    description_en: 'Understand the Tudor Black Bay family — from Black Bay 54 to 58, GMT, Chrono and Bronze.' },
  { title: 'Tudor Pelagos Guide', link: '/tudor/pelagos',
    description_de: 'Entdecken Sie die Tudor Pelagos — eine professionelle Tauchuhr mit Titan, 500M Wasserfestigkeit und technischem Tool-Watch-Charakter.',
    description_en: 'Discover the Tudor Pelagos — a professional dive watch with titanium, 500M water resistance and technical tool-watch character.' },
  { title: 'Tudor Royal Guide', link: '/tudor/tudor-royal',
    description_de: 'Verstehen Sie Tudor Royal — integriertes Armband, Day-Date und Alltagsluxus für Herren und Damen.',
    description_en: 'Understand Tudor Royal — integrated bracelet, day-date and everyday luxury for men and women.' },
  { title: 'Gebrauchte Tudor kaufen', link: '/tudor-gebraucht',
    description_de: 'Was Sie vor dem Kauf einer gebrauchten Tudor prüfen sollten — Zustand, Box und Papiere, Referenznummer und Authentifizierung.',
    description_en: 'What to check before buying a used Tudor — condition, box and papers, reference number, and authentication.' },
];

export const TUDOR_INTERNAL_LINKS = [
  {
    title_de: 'Beliebte Tudor Suchen', title_en: 'Popular Tudor Searches',
    links: [
      { label: 'Tudor Uhr', to: '/tudor-uhr' },
      { label: 'Tudor Uhren', to: '/tudor-uhren' },
      { label: 'Tudor watches', to: '/tudor-watches' },
      { label: 'Tudor Black Bay Uhr', to: '/tudor-black-bay-uhr' },
      { label: 'Tudor Royal Uhr', to: '/tudor-royal-uhr' },
      { label: 'Tudor Black Bay kaufen', to: '/tudor-black-bay-kaufen' },
    ],
  },
  {
    title_de: 'Tudor Kollektionen', title_en: 'Tudor Collections',
    links: [
      { label: 'Black Bay', to: '/tudor/black-bay' },
      { label: 'Pelagos', to: '/tudor/pelagos' },
      { label: 'Tudor Royal', to: '/tudor/tudor-royal' },
      { label: 'Ranger', to: '/tudor/ranger' },
      { label: '1926', to: '/tudor/1926' },
      { label: 'Clair de Rose', to: '/tudor/clair-de-rose' },
    ],
  },
  {
    title_de: 'Black Bay Familien', title_en: 'Black Bay Families',
    links: [
      { label: 'Black Bay 54', to: '/tudor/black-bay-54' },
      { label: 'Black Bay 58', to: '/tudor/black-bay-58' },
      { label: 'Black Bay Pro', to: '/tudor/black-bay-pro' },
      { label: 'Black Bay GMT', to: '/tudor/black-bay-gmt' },
      { label: 'Black Bay Chrono', to: '/tudor/black-bay-chrono' },
      { label: 'Black Bay Bronze', to: '/tudor/black-bay-bronze' },
      { label: 'Black Bay Ceramic', to: '/tudor/black-bay-ceramic' },
    ],
  },
  {
    title_de: 'Kaufen & Gebraucht', title_en: 'Buy & Pre-Owned',
    links: [
      { label: 'Tudor kaufen', to: '/tudor-kaufen' },
      { label: 'Tudor Uhr kaufen', to: '/tudor-uhr-kaufen' },
      { label: 'Tudor gebraucht', to: '/tudor-gebraucht' },
      { label: 'Gebrauchte Tudor Uhren', to: '/gebrauchte-tudor-uhren' },
      { label: 'Tudor Black Bay kaufen', to: '/tudor-black-bay-kaufen' },
      { label: 'Tudor Pelagos kaufen', to: '/tudor-pelagos-kaufen' },
    ],
  },
  {
    title_de: 'Ratgeber & Guides', title_en: 'Guides & Resources',
    links: [
      { label: 'Welche Tudor kaufen?', to: '/welche-tudor-uhr-kaufen' },
      { label: 'Black Bay vs Pelagos', to: '/tudor-black-bay-vs-pelagos' },
      { label: 'Tudor Black Bay Guide', to: '/tudor-black-bay-guide' },
      { label: 'Tudor Uhr Preis', to: '/tudor-uhr-preis' },
      { label: 'Tudor Story', to: '/tudor/story' },
      { label: 'Tudor Uhr Herren', to: '/tudor-uhr-herren' },
      { label: 'Tudor Uhr Damen', to: '/tudor-uhr-damen' },
    ],
  },
  {
    title_de: 'Verwandte Luxusuhren-Marken', title_en: 'Related Luxury Watch Brands',
    links: [
      { label: 'Rolex watches', to: '/brands/rolex' },
      { label: 'Omega watches', to: '/brands/omega' },
      { label: 'Breitling watches', to: '/brands/breitling' },
      { label: 'Tudor Black Bay', to: '/tudor/black-bay' },
      { label: 'IWC watches', to: '/brands/iwc-schaffhausen' },
      { label: 'Grand Seiko watches', to: '/brands/grand-seiko' },
    ],
  },
];

export const TUDOR_FAQS = [
  {
    q_de: 'Wo kann ich eine Tudor Uhr online kaufen?', q_en: 'Where can I buy a Tudor watch online?',
    a_de: "Sie können Tudor Uhren online bei Kariv Glamour kaufen. Stöbern Sie durch neue und <a href='/tudor-gebraucht'>gebrauchte Tudor Uhren</a> mit transparenten Produktdetails, Referenznummern und Zustandsbewertung.",
    a_en: "You can buy Tudor watches online at Kariv Glamour. Browse new and <a href='/tudor-gebraucht'>pre-owned Tudor watches</a> with transparent product details, reference numbers, and condition grading." },
  {
    q_de: 'Was ist die beliebteste Tudor Uhr?', q_en: 'What is the most popular Tudor watch?',
    a_de: "Die beliebteste Tudor Uhr ist die <a href='/tudor/black-bay'>Black Bay</a> — eine vintage-inspirierte Tauchuhr mit Snowflake-Zeigern, die Tudors stärkste Identität und meistgesuchte Produktfamilie ist.",
    a_en: "The most popular Tudor watch is the <a href='/tudor/black-bay'>Black Bay</a> — a vintage-inspired dive watch with snowflake hands, which is Tudor's strongest identity and most searched product family." },
  {
    q_de: 'Was ist die Tudor Black Bay?', q_en: 'What is the Tudor Black Bay?',
    a_de: "Die <a href='/tudor/black-bay'>Tudor Black Bay</a> ist eine vintage-inspirierte Tauchuhr-Familie mit 200M Wasserfestigkeit, Snowflake-Zeigern, drehbarer Lünette und Manufaktur-Kalibern. Zu den Sub-Familien gehören <a href='/tudor/black-bay-58'>Black Bay 58</a>, <a href='/tudor/black-bay-54'>Black Bay 54</a>, <a href='/tudor/black-bay-gmt'>Black Bay GMT</a> und <a href='/tudor/black-bay-chrono'>Black Bay Chrono</a>.",
    a_en: "The <a href='/tudor/black-bay'>Tudor Black Bay</a> is a vintage-inspired dive watch family with 200M water resistance, snowflake hands, rotating bezel and manufacture calibres. Sub-families include <a href='/tudor/black-bay-58'>Black Bay 58</a>, <a href='/tudor/black-bay-54'>Black Bay 54</a>, <a href='/tudor/black-bay-gmt'>Black Bay GMT</a> and <a href='/tudor/black-bay-chrono'>Black Bay Chrono</a>." },
  {
    q_de: 'Was ist der Unterschied zwischen Tudor Black Bay und Pelagos?', q_en: 'What is the difference between Tudor Black Bay and Pelagos?',
    a_de: "Die <a href='/tudor/black-bay'>Black Bay</a> ist eine vintage-inspirierte Tauchuhr mit klassischem Design, während die <a href='/tudor/pelagos'>Pelagos</a> eine professionelle Tauchuhr mit Titan-Gehäuse, 500M Wasserfestigkeit und technischeren Materialien ist. Lesen Sie unseren Vergleich: <a href='/tudor-black-bay-vs-pelagos'>Black Bay vs Pelagos</a>.",
    a_en: "The <a href='/tudor/black-bay'>Black Bay</a> is a vintage-inspired dive watch with classic design, while the <a href='/tudor/pelagos'>Pelagos</a> is a professional dive watch with titanium case, 500M water resistance and more technical materials. Read our comparison: <a href='/tudor-black-bay-vs-pelagos'>Black Bay vs Pelagos</a>." },
  {
    q_de: 'Ist Tudor Royal eine gute Alltagsuhr?', q_en: 'Is Tudor Royal a good everyday watch?',
    a_de: "Ja. Die <a href='/tudor/tudor-royal'>Tudor Royal</a> ist eine vielseitige Alltagsuhr mit integriertem Armband, Day-Date-Funktion und Größen für Herren und Damen. Sie ist ideal für diejenigen, die robusten Schweizer Luxus mit elegantem Stil suchen.",
    a_en: "Yes. The <a href='/tudor/tudor-royal'>Tudor Royal</a> is a versatile everyday watch with integrated bracelet, day-date function and sizes for men and women. It's ideal for those seeking robust Swiss luxury with elegant styling." },
  {
    q_de: 'Stellt Tudor Damenuhren her?', q_en: 'Does Tudor make women\'s watches?',
    a_de: "Ja. Tudor bietet <a href='/tudor-uhr-damen'>Damenuhren</a> in mehreren Kollektionen, einschließlich <a href='/tudor/clair-de-rose'>Clair de Rose</a> mit eleganten Gehäusegrößen, <a href='/tudor/1926'>1926</a> mit klassischen Proportionen und <a href='/tudor/tudor-royal'>Tudor Royal</a> in kleineren Größen.",
    a_en: "Yes. Tudor offers <a href='/tudor-uhr-damen'>women's watches</a> across several collections, including <a href='/tudor/clair-de-rose'>Clair de Rose</a> with elegant case sizes, <a href='/tudor/1926'>1926</a> with classic proportions, and <a href='/tudor/tudor-royal'>Tudor Royal</a> in smaller sizes." },
  {
    q_de: 'Ist es sicher, eine gebrauchte Tudor Uhr zu kaufen?', q_en: 'Is it safe to buy a pre-owned Tudor watch?',
    a_de: "Ja, bei Kariv Glamour ist der Kauf einer <a href='/tudor-gebraucht'>gebrauchten Tudor</a> sicher. Jede Uhr wird mit transparenter Zustandsbewertung, Referenznummer-Sichtbarkeit und Authentifizierungsstatus präsentiert. Wir verkaufen keine Replikate oder gefälschte Uhren.",
    a_en: "Yes, buying a <a href='/tudor-gebraucht'>pre-owned Tudor</a> at Kariv Glamour is safe. Each watch is presented with transparent condition grading, reference number visibility, and authentication status. We do not sell replica or counterfeit watches." },
  {
    q_de: 'Was sollte ich vor dem Kauf einer gebrauchten Tudor prüfen?', q_en: 'What should I check before buying a used Tudor?',
    a_de: "Prüfen Sie den Zustand von Gehäuse und Armband, verifizieren Sie das Uhrwerk (Automatik, Manufaktur-Kaliber), bestätigen Sie Box und Papiere, und überprüfen Sie die Referenznummer. Besuchen Sie unsere Seite für <a href='/tudor-gebraucht'>gebrauchte Tudor Uhren</a> mit transparenten Einträgen.",
    a_en: "Check the condition of the case and bracelet, verify the movement (automatic, manufacture calibre), confirm box and papers, and review the reference number. Visit our <a href='/tudor-gebraucht'>pre-owned Tudor</a> page for transparent listings." },
];

export const TUDOR_SEO_PAGES = {
  'tudor-uhr': {
    h1_de: 'Tudor Uhr', h1_en: 'Tudor Watch',
    title_de: 'Tudor Uhr | Kariv Glamour', title_en: 'Tudor Watch | Kariv Glamour',
    description_de: 'Entdecken Sie Tudor Uhren bei Kariv Glamour — Black Bay Heritage, Pelagos Tauchuhren, Tudor Royal, 1926 und Ranger.',
    description_en: 'Discover Tudor watches at Kariv Glamour — Black Bay heritage, Pelagos dive watches, Tudor Royal, 1926 and Ranger.',
    intro_de: 'Erkunden Sie Tudor Uhren bei Kariv Glamour — mit Black Bay Heritage, robusten Pelagos Tauchuhren, vielseitigem Tudor Royal, klassischen 1926 Modellen, Ranger Field-Watches und eleganten Clair de Rose Damenuhren.',
    intro_en: "Explore Tudor watches at Kariv Glamour — with Black Bay heritage, robust Pelagos dive watches, versatile Tudor Royal, classic 1926 models, Ranger field watches and elegant Clair de Rose women's watches.",
    filter: {},
  },
  'tudor-uhren': {
    h1_de: 'Tudor Uhren', h1_en: 'Tudor Watches',
    title_de: 'Tudor Uhren | Kariv Glamour', title_en: 'Tudor Watches | Kariv Glamour',
    description_de: 'Tudor Uhren bei Kariv Glamour — Black Bay, Pelagos, Tudor Royal, Ranger, 1926 und Clair de Rose Kollektionen.',
    description_en: 'Tudor watches at Kariv Glamour — Black Bay, Pelagos, Tudor Royal, Ranger, 1926 and Clair de Rose collections.',
    intro_de: 'Stöbern Sie durch Tudor Uhren nach Kollektion, Modell, Uhrwerk, Gehäusegröße, Zustand und Preis.',
    intro_en: 'Browse Tudor watches by collection, model, movement, case size, condition, and price.',
    filter: {},
  },
  'tudor-watches': {
    h1_de: 'Tudor Watches', h1_en: 'Tudor Watches',
    title_de: 'Tudor Watches | Kariv Glamour', title_en: 'Tudor Watches | Kariv Glamour',
    description_de: 'Tudor Watches bei Kariv Glamour — Black Bay, Pelagos, Tudor Royal, Ranger und 1926.',
    description_en: 'Tudor watches at Kariv Glamour — Black Bay, Pelagos, Tudor Royal, Ranger and 1926.',
    intro_de: 'Entdecken Sie Tudor Watches bei Kariv Glamour — robuste Schweizer Luxusuhren mit Tool-Watch-Charakter und Black Bay Heritage.',
    intro_en: 'Discover Tudor watches at Kariv Glamour — robust Swiss luxury watches with tool-watch character and Black Bay heritage.',
    filter: {},
  },
  'tudor-uhr-herren': {
    h1_de: 'Tudor Uhr Herren', h1_en: "Tudor Men's Watches",
    title_de: 'Tudor Uhr Herren | Kariv Glamour', title_en: "Tudor Men's Watches | Kariv Glamour",
    description_de: 'Tudor Herrenuhren bei Kariv Glamour — Black Bay, Pelagos, Ranger und Tudor Royal Modelle für Männer.',
    description_en: "Tudor men's watches at Kariv Glamour — Black Bay, Pelagos, Ranger and Tudor Royal models for men.",
    intro_de: 'Entdecken Sie Tudor Uhren für Herren — von der Black Bay über die Pelagos bis zum Tudor Royal und Ranger.',
    intro_en: "Discover Tudor watches for men — from Black Bay to Pelagos, Tudor Royal and Ranger.",
    filter: { gender: 'Men' },
  },
  'tudor-uhr-damen': {
    h1_de: 'Tudor Uhr Damen', h1_en: "Tudor Women's Watches",
    title_de: 'Tudor Uhr Damen | Kariv Glamour', title_en: "Tudor Women's Watches | Kariv Glamour",
    description_de: 'Tudor Damenuhren bei Kariv Glamour — Clair de Rose, 1926 und Tudor Royal Modelle in eleganten Gehäusen.',
    description_en: "Tudor women's watches at Kariv Glamour — Clair de Rose, 1926 and Tudor Royal models in elegant case sizes.",
    intro_de: 'Entdecken Sie Tudor Damenuhren — Clair de Rose, 1926 und Tudor Royal in kleineren, eleganten Gehäusegrößen.',
    intro_en: "Discover Tudor women's watches — Clair de Rose, 1926 and Tudor Royal in smaller, elegant case sizes.",
    filter: { gender: 'Women' },
  },
  'tudor-uhr-kaufen': {
    h1_de: 'Tudor Uhr kaufen', h1_en: 'Buy Tudor Watch',
    title_de: 'Tudor Uhr kaufen | Kariv Glamour', title_en: 'Buy Tudor Watch | Kariv Glamour',
    description_de: 'Tudor Uhr kaufen bei Kariv Glamour — neue und gebrauchte Modelle mit transparenter Produktinformation.',
    description_en: 'Buy Tudor watch at Kariv Glamour — new and pre-owned models with transparent product information.',
    intro_de: 'Tudor Uhr kaufen bei Kariv Glamour: neue und gebrauchte Modelle mit transparenter Produktinformation und Zustandsbewertung.',
    intro_en: 'Buy Tudor watch at Kariv Glamour: new and pre-owned models with transparent product information and condition grading.',
    filter: {},
  },
  'tudor-kaufen': {
    h1_de: 'Tudor kaufen', h1_en: 'Buy Tudor',
    title_de: 'Tudor kaufen | Kariv Glamour', title_en: 'Buy Tudor | Kariv Glamour',
    description_de: 'Tudor kaufen bei Kariv Glamour — Black Bay, Pelagos, Tudor Royal und mehr.',
    description_en: 'Buy Tudor at Kariv Glamour — Black Bay, Pelagos, Tudor Royal and more.',
    intro_de: 'Tudor kaufen bei Kariv Glamour: entdecken Sie Uhren aus allen Kollektionen mit transparenter Zustandsbewertung.',
    intro_en: 'Buy Tudor at Kariv Glamour: discover watches from all collections with transparent condition grading.',
    filter: {},
  },
  'tudor-gebraucht': {
    h1_de: 'Tudor gebraucht', h1_en: 'Pre-Owned Tudor',
    title_de: 'Tudor gebraucht | Kariv Glamour', title_en: 'Pre-Owned Tudor | Kariv Glamour',
    description_de: 'Gebrauchte Tudor Uhren bei Kariv Glamour mit transparenter Zustandsbewertung.',
    description_en: 'Pre-owned Tudor watches at Kariv Glamour with transparent condition grading.',
    intro_de: 'Entdecken Sie gebrauchte Tudor Uhren mit klarer Zustandsbewertung, Box und Papers und detaillierten Produktdaten.',
    intro_en: 'Discover pre-owned Tudor watches with clear condition grading, box and papers, and detailed product data.',
    filter: {},
  },
  'tudor-gebraucht-kaufen': {
    h1_de: 'Tudor gebraucht kaufen', h1_en: 'Buy Pre-Owned Tudor',
    title_de: 'Tudor gebraucht kaufen | Kariv Glamour', title_en: 'Buy Pre-Owned Tudor | Kariv Glamour',
    description_de: 'Tudor gebraucht kaufen bei Kariv Glamour — geprüfte Gebrauchtuhren mit Zustandsbericht.',
    description_en: 'Buy pre-owned Tudor at Kariv Glamour — inspected pre-owned watches with condition reports.',
    intro_de: 'Tudor gebraucht kaufen bei Kariv Glamour: geprüfte Uhren mit transparentem Zustandsbericht und Authentifizierung.',
    intro_en: 'Buy pre-owned Tudor at Kariv Glamour: inspected watches with transparent condition reports and authentication.',
    filter: {},
  },
  'gebrauchte-tudor-uhren': {
    h1_de: 'Gebrauchte Tudor Uhren', h1_en: 'Pre-Owned Tudor Watches',
    title_de: 'Gebrauchte Tudor Uhren | Kariv Glamour', title_en: 'Pre-Owned Tudor Watches | Kariv Glamour',
    description_de: 'Gebrauchte Tudor Uhren bei Kariv Glamour — Black Bay, Pelagos und mehr mit Zustandsbewertung.',
    description_en: 'Pre-owned Tudor watches at Kariv Glamour — Black Bay, Pelagos and more with condition grading.',
    intro_de: 'Stöbern Sie durch gebrauchte Tudor Uhren — von der Black Bay über die Pelagos bis zum Tudor Royal und 1926.',
    intro_en: 'Browse pre-owned Tudor watches — from Black Bay to Pelagos, Tudor Royal and 1926.',
    filter: {},
  },
  'tudor-black-bay-uhr': {
    h1_de: 'Tudor Black Bay Uhr', h1_en: 'Tudor Black Bay Watch',
    title_de: 'Tudor Black Bay Uhr | Kariv Glamour', title_en: 'Tudor Black Bay Watch | Kariv Glamour',
    description_de: 'Tudor Black Bay Uhren bei Kariv Glamour — vintage-inspirierte Tauchuhren mit Snowflake-Zeigern.',
    description_en: 'Tudor Black Bay watches at Kariv Glamour — vintage-inspired dive watches with snowflake hands.',
    intro_de: 'Entdecken Sie die Tudor Black Bay — Tudors stärkste Identität, bekannt für vintage-inspiriertes Tauchuhr-Design, Snowflake-Zeiger, drehbare Lünette und robusten Tool-Watch-Charakter.',
    intro_en: "Discover the Tudor Black Bay — Tudor's strongest identity, known for vintage-inspired dive-watch design, snowflake hands, rotating bezel and robust tool-watch character.",
    filter: { collection: 'Black Bay' },
  },
  'tudor-black-bay-kaufen': {
    h1_de: 'Tudor Black Bay kaufen', h1_en: 'Buy Tudor Black Bay',
    title_de: 'Tudor Black Bay kaufen | Kariv Glamour', title_en: 'Buy Tudor Black Bay | Kariv Glamour',
    description_de: 'Tudor Black Bay kaufen bei Kariv Glamour — neue und gebrauchte Tauchuhren.',
    description_en: 'Buy Tudor Black Bay at Kariv Glamour — new and pre-owned dive watches.',
    intro_de: 'Tudor Black Bay kaufen bei Kariv Glamour — vintage-inspirierte Tauchuhren mit Snowflake-Zeigern und Manufaktur-Kalibern.',
    intro_en: 'Buy Tudor Black Bay at Kariv Glamour — vintage-inspired dive watches with snowflake hands and manufacture calibres.',
    filter: { collection: 'Black Bay' },
  },
  'tudor-royal-uhr': {
    h1_de: 'Tudor Royal Uhr', h1_en: 'Tudor Royal Watch',
    title_de: 'Tudor Royal Uhr | Kariv Glamour', title_en: 'Tudor Royal Watch | Kariv Glamour',
    description_de: 'Tudor Royal Uhren bei Kariv Glamour — integriertes Armband, Day-Date und Alltagsluxus.',
    description_en: 'Tudor Royal watches at Kariv Glamour — integrated bracelet, day-date and everyday luxury.',
    intro_de: 'Entdecken Sie Tudor Royal — eine vielseitige Kollektion mit integriertem Armband, Day-Date-Optionen, verfeinertem Alltags-Stil und Größen für Herren und Damen.',
    intro_en: 'Discover Tudor Royal — a versatile collection with integrated bracelet design, day-date options, refined everyday styling and sizes for men and women.',
    filter: { collection: 'Tudor Royal' },
  },
  'tudor-pelagos-kaufen': {
    h1_de: 'Tudor Pelagos kaufen', h1_en: 'Buy Tudor Pelagos',
    title_de: 'Tudor Pelagos kaufen | Kariv Glamour', title_en: 'Buy Tudor Pelagos | Kariv Glamour',
    description_de: 'Tudor Pelagos kaufen bei Kariv Glamour — professionelle Titan-Tauchuhren mit 500M Wasserfestigkeit.',
    description_en: 'Buy Tudor Pelagos at Kariv Glamour — professional titanium dive watches with 500M water resistance.',
    intro_de: 'Tudor Pelagos kaufen bei Kariv Glamour — eine professionelle Tauchuhr mit Titan-Gehäuse, 500M Wasserfestigkeit und technischem Tool-Watch-Charakter.',
    intro_en: 'Buy Tudor Pelagos at Kariv Glamour — a professional dive watch with titanium case, 500M water resistance and technical tool-watch character.',
    filter: { collection: 'Pelagos' },
  },
  'welche-tudor-uhr-kaufen': {
    h1_de: 'Welche Tudor Uhr kaufen?', h1_en: 'Which Tudor to Buy?',
    title_de: 'Welche Tudor Uhr kaufen | Kariv Glamour', title_en: 'Which Tudor to Buy | Kariv Glamour',
    description_de: 'Tudor Kaufberatung — vergleichen Sie Black Bay, Pelagos, Tudor Royal, Ranger und 1926.',
    description_en: 'Tudor buying guide — compare Black Bay, Pelagos, Tudor Royal, Ranger and 1926.',
    intro_de: 'Welche Tudor Uhr passt zu Ihnen? Vergleichen Sie Kollektionen, Uhrwerke, Gehäusegrößen und Funktionen, um die richtige Entscheidung zu treffen.',
    intro_en: 'Which Tudor watch is right for you? Compare collections, movements, case sizes, and features to make the right decision.',
    isGuide: true,
    guideContent_de: [
      "Tudor ist bekannt für robusten Schweizer Luxus und Tool-Watch-Charakter. Die wichtigsten Kollektionen sind <a href='/tudor/black-bay'>Black Bay</a> (vintage Tauchuhren), <a href='/tudor/pelagos'>Pelagos</a> (professionelle Tauchuhren), <a href='/tudor/tudor-royal'>Tudor Royal</a> (Alltagsluxus mit integriertem Armband), <a href='/tudor/ranger'>Ranger</a> (Field-Watch), <a href='/tudor/1926'>1926</a> (klassische Alltagsuhren) und <a href='/tudor/clair-de-rose'>Clair de Rose</a> (Damenuhren).",
      "Für Tauchuhr-Fans ist die <a href='/tudor/black-bay'>Black Bay</a> die beste Wahl mit 200M Wasserfestigkeit und Snowflake-Zeigern. Für professionelles Tauchen empfiehlt sich die <a href='/tudor/pelagos'>Pelagos</a> mit 500M Wasserfestigkeit und Titan-Gehäuse. Für Alltagsluxus ist der <a href='/tudor/tudor-royal'>Tudor Royal</a> ideal. Für Field-Watch-Fans ist der <a href='/tudor/ranger'>Ranger</a> die richtige Wahl.",
      "Die Black Bay Familie ist Tudors stärkste Identität und umfasst Sub-Familien wie <a href='/tudor/black-bay-58'>Black Bay 58</a> (39mm), <a href='/tudor/black-bay-54'>Black Bay 54</a> (37mm), <a href='/tudor/black-bay-gmt'>Black Bay GMT</a>, <a href='/tudor/black-bay-chrono'>Black Bay Chrono</a> und <a href='/tudor/black-bay-bronze'>Black Bay Bronze</a>.",
      "Bei Kariv Glamour wird jede Tudor Uhr mit transparenten Produktdetails, klarer Zustandsbewertung und Referenznummer-Sichtbarkeit präsentiert. Wir verkaufen keine Replikate oder gefälschte Uhren.",
    ],
    guideContent_en: [
      "Tudor is known for robust Swiss luxury and tool-watch character. The main collections are <a href='/tudor/black-bay'>Black Bay</a> (vintage dive watches), <a href='/tudor/pelagos'>Pelagos</a> (professional dive watches), <a href='/tudor/tudor-royal'>Tudor Royal</a> (everyday luxury with integrated bracelet), <a href='/tudor/ranger'>Ranger</a> (field watch), <a href='/tudor/1926'>1926</a> (classic everyday watches) and <a href='/tudor/clair-de-rose'>Clair de Rose</a> (women's watches).",
      "For dive watch fans, the <a href='/tudor/black-bay'>Black Bay</a> is the best choice with 200M water resistance and snowflake hands. For professional diving, the <a href='/tudor/pelagos'>Pelagos</a> with 500M water resistance and titanium case is recommended. For everyday luxury, the <a href='/tudor/tudor-royal'>Tudor Royal</a> is ideal. For field watch fans, the <a href='/tudor/ranger'>Ranger</a> is the right choice.",
      "The Black Bay family is Tudor's strongest identity and includes sub-families like <a href='/tudor/black-bay-58'>Black Bay 58</a> (39mm), <a href='/tudor/black-bay-54'>Black Bay 54</a> (37mm), <a href='/tudor/black-bay-gmt'>Black Bay GMT</a>, <a href='/tudor/black-bay-chrono'>Black Bay Chrono</a> and <a href='/tudor/black-bay-bronze'>Black Bay Bronze</a>.",
      "At Kariv Glamour, each Tudor timepiece is presented with transparent product details, clear condition grading, and reference number visibility. We do not sell replica or counterfeit watches.",
    ],
  },
  'tudor-black-bay-guide': {
    h1_de: 'Tudor Black Bay Guide', h1_en: 'Tudor Black Bay Guide',
    title_de: 'Tudor Black Bay Guide | Kariv Glamour', title_en: 'Tudor Black Bay Guide | Kariv Glamour',
    description_de: 'Verstehen Sie die Tudor Black Bay Familie — von 54 über 58 bis GMT, Chrono und Bronze.',
    description_en: 'Understand the Tudor Black Bay family — from 54 to 58, GMT, Chrono and Bronze.',
    intro_de: 'Die Tudor Black Bay ist Tudors stärkste Produktfamilie. Dieser Guide erklärt die Sub-Familien, Gehäusegrößen, Uhrwerke und Funktionen der Black Bay Kollektion.',
    intro_en: "The Tudor Black Bay is Tudor's strongest product family. This guide explains the sub-families, case sizes, movements and features of the Black Bay collection.",
    isGuide: true,
    guideContent_de: [
      "Die <a href='/tudor/black-bay'>Tudor Black Bay</a> ist eine vintage-inspirierte Tauchuhr-Familie mit 200M Wasserfestigkeit, Snowflake-Zeigern und drehbarer Lünette. Sie ist Tudors bekannteste und meistgesuchte Kollektion.",
      "Die Black Bay Familie umfasst mehrere Sub-Familien: Die <a href='/tudor/black-bay-58'>Black Bay 58</a> (39mm, klassische Proportionen), die <a href='/tudor/black-bay-54'>Black Bay 54</a> (37mm, kompakter), die <a href='/tudor/black-bay-gmt'>Black Bay GMT</a> (zweite Zeitzone), die <a href='/tudor/black-bay-chrono'>Black Bay Chrono</a> (Chronograph), die <a href='/tudor/black-bay-bronze'>Black Bay Bronze</a> (Bronze-Gehäuse) und die <a href='/tudor/black-bay-ceramic'>Black Bay Ceramic</a> (Schwarz).",
      "Für Vergleiche zwischen Black Bay und Pelagos lesen Sie unseren <a href='/tudor-black-bay-vs-pelagos'>Black Bay vs Pelagos Guide</a>. Für allgemeine Kaufberatung besuchen Sie <a href='/welche-tudor-uhr-kaufen'>Welche Tudor kaufen?</a>.",
      "Bei Kariv Glamour finden Sie eine kuratierte Auswahl an Black Bay Modellen — von neuen bis zu <a href='/tudor-gebraucht'>gebrauchten Tudor Uhren</a> mit transparenter Zustandsbewertung.",
    ],
    guideContent_en: [
      "The <a href='/tudor/black-bay'>Tudor Black Bay</a> is a vintage-inspired dive watch family with 200M water resistance, snowflake hands and rotating bezel. It is Tudor's most recognizable and most searched collection.",
      "The Black Bay family includes several sub-families: the <a href='/tudor/black-bay-58'>Black Bay 58</a> (39mm, classic proportions), the <a href='/tudor/black-bay-54'>Black Bay 54</a> (37mm, compact), the <a href='/tudor/black-bay-gmt'>Black Bay GMT</a> (second time zone), the <a href='/tudor/black-bay-chrono'>Black Bay Chrono</a> (chronograph), the <a href='/tudor/black-bay-bronze'>Black Bay Bronze</a> (bronze case) and the <a href='/tudor/black-bay-ceramic'>Black Bay Ceramic</a> (black).",
      "For comparisons between Black Bay and Pelagos, read our <a href='/tudor-black-bay-vs-pelagos'>Black Bay vs Pelagos Guide</a>. For general buying advice, visit <a href='/welche-tudor-uhr-kaufen'>Which Tudor to Buy?</a>.",
      "At Kariv Glamour, you'll find a curated selection of Black Bay models — from new to <a href='/tudor-gebraucht'>pre-owned Tudor watches</a> with transparent condition grading.",
    ],
  },
  'tudor-black-bay-vs-pelagos': {
    h1_de: 'Tudor Black Bay vs Pelagos', h1_en: 'Tudor Black Bay vs Pelagos',
    title_de: 'Tudor Black Bay vs Pelagos | Kariv Glamour', title_en: 'Tudor Black Bay vs Pelagos | Kariv Glamour',
    description_de: 'Vergleich der Tudor Black Bay und Pelagos — zwei Tauchuhr-Kollektionen mit unterschiedlichem Charakter.',
    description_en: 'Comparison of Tudor Black Bay and Pelagos — two dive watch collections with different character.',
    intro_de: 'Der Vergleich zwischen Tudor Black Bay und Pelagos: Beide sind Tauchuhren, aber die Black Bay ist vintage-inspiriert mit klassischem Design, während die Pelagos eine professionelle Tauchuhr mit Titan-Gehäuse und 500M Wasserfestigkeit ist.',
    intro_en: 'The comparison between Tudor Black Bay and Pelagos: Both are dive watches, but the Black Bay is vintage-inspired with classic design, while the Pelagos is a professional dive watch with titanium case and 500M water resistance.',
    isGuide: true,
    guideContent_de: [
      "Die <a href='/tudor/black-bay'>Tudor Black Bay</a> ist eine vintage-inspirierte Tauchuhr mit 200M Wasserfestigkeit, Snowflake-Zeigern und klassischem Design. Die <a href='/tudor/pelagos'>Tudor Pelagos</a> ist eine professionelle Tauchuhr mit Titan-Gehäuse, 500M Wasserfestigkeit und technischeren Materialien.",
      "Die Black Bay richtet sich an diejenigen, die vintage Tauchuhr-Ästhetik mit moderner Zuverlässigkeit suchen, während die Pelagos für ernsthafte Taucher und Tool-Watch-Enthusiasten konzipiert ist.",
      "Bei Kariv Glamour können Sie beide Kollektionen vergleichen und die Tudor finden, die am besten zu Ihrem Stil und Budget passt.",
    ],
    guideContent_en: [
      "The <a href='/tudor/black-bay'>Tudor Black Bay</a> is a vintage-inspired dive watch with 200M water resistance, snowflake hands and classic design. The <a href='/tudor/pelagos'>Tudor Pelagos</a> is a professional dive watch with titanium case, 500M water resistance and more technical materials.",
      "The Black Bay is aimed at those seeking vintage dive watch aesthetics with modern reliability, while the Pelagos is designed for serious divers and tool-watch enthusiasts.",
      "At Kariv Glamour, you can compare both collections and find the Tudor that best fits your style and budget.",
    ],
  },
  'tudor-uhr-preis': {
    h1_de: 'Tudor Uhr Preis', h1_en: 'Tudor Watch Price',
    title_de: 'Tudor Uhr Preis | Kariv Glamour', title_en: 'Tudor Watch Price | Kariv Glamour',
    description_de: 'Tudor Uhr Preise bei Kariv Glamour — von der Black Bay über Pelagos bis Tudor Royal.',
    description_en: 'Tudor watch prices at Kariv Glamour — from Black Bay to Pelagos to Tudor Royal.',
    intro_de: 'Tudor Uhren bieten ausgezeichneten Wert für Schweizer Luxus. Die Preise variieren je nach Kollektion, Material und Zustand.',
    intro_en: 'Tudor watches offer excellent value for Swiss luxury. Prices vary by collection, material and condition.',
    isGuide: true,
    guideContent_de: [
      "Tudor Uhren bieten hervorragenden Wert für Schweizer Luxusuhren. Die <a href='/tudor/black-bay'>Black Bay</a> beginnt typischerweise im mittleren Preissegment, während die <a href='/tudor/pelagos'>Pelagos</a> als professionelle Tauchuhr etwas höher liegt. Der <a href='/tudor/tudor-royal'>Tudor Royal</a> bietet zugänglichen Alltagsluxus.",
      "Der Preis einer Tudor Uhr hängt von Kollektion, Material (Edelstahl, Titan, Bronze, Gold), Uhrwerk (Manufaktur-Kaliber, COSC/METAS-zertifiziert), Zustand und Box/Papiere ab. <a href='/tudor-gebraucht'>Gebrauchte Tudor Uhren</a> bieten oft ein besseres Preis-Leistungs-Verhältnis.",
      "Bei Kariv Glamour finden Sie transparente Preise für alle Tudor Modelle mit detaillierten Produktinformationen und Zustandsbewertungen.",
    ],
    guideContent_en: [
      "Tudor watches offer excellent value for Swiss luxury watches. The <a href='/tudor/black-bay'>Black Bay</a> typically starts in the mid-price range, while the <a href='/tudor/pelagos'>Pelagos</a> as a professional dive watch is slightly higher. The <a href='/tudor/tudor-royal'>Tudor Royal</a> offers accessible everyday luxury.",
      "The price of a Tudor watch depends on collection, material (stainless steel, titanium, bronze, gold), movement (manufacture calibre, COSC/METAS certified), condition and box/papers. <a href='/tudor-gebraucht'>Pre-owned Tudor watches</a> often offer better value.",
      "At Kariv Glamour, you'll find transparent prices for all Tudor models with detailed product information and condition grading.",
    ],
  },
  'tudor-story': {
    h1_de: 'Tudor Story', h1_en: 'Tudor Story',
    title_de: 'Tudor Story | Kariv Glamour', title_en: 'Tudor Story | Kariv Glamour',
    description_de: 'Die Tudor Story — robuster Schweizer Luxus, Tool-Watch-Charakter und Black Bay Tauchuhr-Tradition.',
    description_en: 'The Tudor story — robust Swiss luxury, tool-watch character and Black Bay dive-watch tradition.',
    intro_de: 'Tudor steht für robusten Schweizer Luxus, Tool-Watch-Charakter und die Black Bay Tauchuhr-Tradition — von der Black Bay über die Pelagos bis zum Tudor Royal und Ranger.',
    intro_en: "Tudor stands for robust Swiss luxury, tool-watch character and the Black Bay dive-watch tradition — from Black Bay to Pelagos, Tudor Royal and Ranger.",
    isGuide: true,
    guideContent_de: [
      "Tudor wurde 1926 von Hans Wilsdorf, dem Gründer von Rolex, in der Schweiz gegründet. Die Marke steht für robusten Schweizer Luxus mit Tool-Watch-Charakter und ist bekannt für die <a href='/tudor/black-bay'>Black Bay</a> Tauchuhr-Familie.",
      "Die <a href='/tudor/black-bay'>Black Bay</a> ist Tudors stärkste Identität — eine vintage-inspirierte Tauchuhr mit Snowflake-Zeigern, die erstmals in den 1960er Jahren erschien. Die <a href='/tudor/pelagos'>Pelagos</a> ist Tudors professionelle Tauchuhr mit Titan und 500M Wasserfestigkeit. Der <a href='/tudor/tudor-royal'>Tudor Royal</a> bietet Alltagsluxus mit integriertem Armband.",
      "Bei Kariv Glamour finden Sie eine kuratierte Auswahl an Tudor Uhren — von neuen Modellen bis zu <a href='/tudor-gebraucht'>gebrauchten Tudor Uhren</a> mit transparenter Zustandsbewertung.",
    ],
    guideContent_en: [
      "Tudor was founded in 1926 by Hans Wilsdorf, the founder of Rolex, in Switzerland. The brand stands for robust Swiss luxury with tool-watch character and is known for the <a href='/tudor/black-bay'>Black Bay</a> dive watch family.",
      "The <a href='/tudor/black-bay'>Black Bay</a> is Tudor's strongest identity — a vintage-inspired dive watch with snowflake hands, first introduced in the 1960s. The <a href='/tudor/pelagos'>Pelagos</a> is Tudor's professional dive watch with titanium and 500M water resistance. The <a href='/tudor/tudor-royal'>Tudor Royal</a> offers everyday luxury with integrated bracelet.",
      "At Kariv Glamour, you'll find a curated selection of Tudor watches — from new models to <a href='/tudor-gebraucht'>pre-owned Tudor watches</a> with transparent condition grading.",
    ],
  },
};