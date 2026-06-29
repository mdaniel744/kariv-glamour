// Jaeger-LeCoultre collections, filters, and SEO data
// Positioned around refined Swiss watchmaking, the iconic Reverso case,
// ultra-thin dress watches, Polaris sport models, and high horology.

const REVERSO_HERO = 'https://images.unsplash.com/photo-1623998021446-45cd9b269c95?w=1200&q=80';
const MASTER_HERO = 'https://images.unsplash.com/photo-1612817159949-195b6d9e9e9c?w=1200&q=80';
const POLARIS = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80';
const DRESS_WATCH = 'https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&q=80';
const REVERSO_DETAIL = 'https://images.unsplash.com/photo-1639037687537-cb18b8a25875?w=800&q=80';
const COMPLICATIONS = 'https://images.unsplash.com/photo-1622434641406-a158d250c2a1?w=800&q=80';

export const JLC_HERO_IMAGE = REVERSO_HERO;
export const JLC_STORY_IMAGE = COMPLICATIONS;

export const JLC_COLLECTIONS = [
  { id: 1, name: 'Reverso', slug: 'reverso', image: REVERSO_DETAIL, shortDescription: "Jaeger-LeCoultre's most recognizable design, known for its reversible rectangular case, Art Deco character, and elegant dress-sport heritage." },
  { id: 2, name: 'Master Ultra Thin', slug: 'master-ultra-thin', image: MASTER_HERO, shortDescription: 'A refined collection focused on slim proportions, pure design, moonphase models, perpetual calendars, and elegant dress-watch styling.' },
  { id: 3, name: 'Master Control', slug: 'master-control', image: DRESS_WATCH, shortDescription: 'A classic round-watch collection with technical elegance, automatic movements, chronographs, calendar functions, and contemporary refinement.' },
  { id: 4, name: 'Polaris', slug: 'polaris', image: POLARIS, shortDescription: 'A modern sport-watch collection offering casual elegance, strong legibility, and versatile daily wear.' },
  { id: 5, name: 'Rendez-Vous', slug: 'rendez-vous', image: DRESS_WATCH, shortDescription: 'An elegant Jaeger-LeCoultre collection for women, often associated with refined proportions, moonphase details, and jewellery-inspired finishing.' },
  { id: 6, name: 'Duometre', slug: 'duometre', image: COMPLICATIONS, shortDescription: 'A high-watchmaking collection focused on advanced complications, precision, and Jaeger-LeCoultre\u2019s technical expertise.' },
  { id: 7, name: 'Atmos', slug: 'atmos', image: POLARIS, shortDescription: 'A luxury clock and horological object line, suitable for collectors interested in mechanical objects beyond wristwatches.', isHorological: true },
  { id: 8, name: 'Master Compressor', slug: 'master-compressor', image: POLARIS, shortDescription: 'A discontinued Jaeger-LeCoultre sports-watch family with strong interest for pre-owned and vintage collectors.', isDiscontinued: true },
];

export const JLC_CASE_MATERIALS = ['Stainless Steel', 'Rose Gold', 'Pink Gold', 'Yellow Gold', 'White Gold', 'Platinum', 'Titanium', 'Ceramic', 'Diamond-set'];
export const JLC_DIAL_COLORS = ['Silver', 'White', 'Black', 'Blue', 'Green', 'Grey', 'Champagne', 'Burgundy', 'Mother of Pearl', 'Skeleton'];
export const JLC_MOVEMENTS = ['Automatic', 'Manual-winding', 'Quartz'];
export const JLC_FEATURES = ['Reverso', 'Reverso Duoface', 'Reverso Monoface', 'Ultra-thin', 'Moonphase', 'Chronograph', 'Perpetual calendar', 'Calendar', 'Small seconds', 'World time', 'Alarm', 'Tourbillon', 'Minute repeater', 'Skeleton / openworked', 'High complication', 'Dress watch', 'Sport watch', 'Discontinued / vintage', 'Full set'];
export const JLC_BRACELETS = ['Steel', 'Leather', 'Alligator Leather', 'Calfskin', 'Rubber', 'Textile', 'Integrated bracelet', 'Gold'];
export const JLC_CASE_SIZES = ['29 mm', '34 mm', '35 mm', '36 mm', '38 mm', '39 mm', '40 mm', '41 mm', '42 mm', '45 mm'];
export const JLC_WATCH_SHAPES = ['Rectangular', 'Round', 'Cushion', 'Tonneau'];
export const JLC_TYPES = ['New', 'Pre-Owned', 'Vintage'];
export const JLC_BOX_PAPERS = ['Box included', 'Papers included', 'Full set'];
export const JLC_AVAILABILITY = ['In Stock', 'Reserved', 'Coming Soon', 'Sold'];

export const JLC_QUICK_FILTERS = [
  { label: 'Reverso', link: '/jaeger-lecoultre/reverso' },
  { label: 'Master Ultra Thin', link: '/jaeger-lecoultre/master-ultra-thin' },
  { label: 'Master Control', link: '/jaeger-lecoultre/master-control' },
  { label: 'Polaris', link: '/jaeger-lecoultre/polaris' },
  { label: 'Rendez-Vous', link: '/jaeger-lecoultre/rendez-vous' },
  { label: 'Duometre', link: '/jaeger-lecoultre/duometre' },
  { label: 'Gebraucht', link: '/gebrauchte-jaeger-lecoultre' },
];

export const JLC_SEO_CARDS = [
  { title: 'Jaeger-LeCoultre Uhr', description: 'Explore Jaeger-LeCoultre watches at Kariv Glamour — refined Swiss watchmaking, the iconic Reverso case, ultra-thin dress watches, and high horology complications.', link: '/jaeger-lecoultre-uhr' },
  { title: 'Jaeger-LeCoultre Reverso', description: 'Discover the Jaeger-LeCoultre Reverso — the most recognizable JLC design with its reversible rectangular case and Art Deco character.', link: '/jaeger-lecoultre/reverso' },
  { title: 'Jaeger-LeCoultre Master Ultra Thin', description: 'Browse Jaeger-LeCoultre Master Ultra Thin — slim proportions, pure design, moonphase models, and perpetual calendars.', link: '/jaeger-lecoultre/master-ultra-thin' },
  { title: 'Jaeger-LeCoultre Master Control', description: 'Explore Jaeger-LeCoultre Master Control — classic round watches with chronographs, calendar functions, and contemporary refinement.', link: '/jaeger-lecoultre/master-control' },
  { title: 'Gebrauchte Jaeger-LeCoultre', description: 'Explore pre-owned Jaeger-LeCoultre watches with transparent condition grading, box and papers information, and product-specific details.', link: '/gebrauchte-jaeger-lecoultre' },
  { title: 'Jaeger-LeCoultre Uhren Preise', description: 'Understand Jaeger-LeCoultre watch prices — what influences value across Reverso, Master Ultra Thin, Master Control, and Polaris.', link: '/jaeger-lecoultre-uhren-preise' },
];

export const JLC_READ_MORE = [
  { title: 'Jaeger-LeCoultre Story', description: "Explore Jaeger-LeCoultre's heritage of refined Swiss watchmaking, the Reverso, ultra-thin movements, and high horology since 1833.", link: '/jaeger-lecoultre/story' },
  { title: 'The Reverso Guide', description: 'Learn what makes the Jaeger-LeCoultre Reverso iconic — the reversible case, Art Deco design, and dress-sport heritage.', link: '/jaeger-lecoultre/reverso' },
  { title: 'Reverso Duoface Guide', description: 'Understand the Reverso Duoface — two dials, two time zones, and the pinnacle of reversible watch design.', link: '/jaeger-lecoultre/reverso-duoface' },
  { title: 'Master Ultra Thin Guide', description: 'Discover Jaeger-LeCoultre ultra-thin watchmaking — slim proportions, moonphase, and perpetual calendar mastery.', link: '/jaeger-lecoultre/master-ultra-thin' },
  { title: 'Master Control Guide', description: 'Explore the Master Control collection — classic round design, chronographs, and calendar complications.', link: '/jaeger-lecoultre/master-control' },
  { title: 'Buying Pre-Owned JLC', description: 'What to check before buying a used Jaeger-LeCoultre — condition, box and papers, calibre, and service history.', link: '/gebrauchte-jaeger-lecoultre' },
];

export const JLC_INTERNAL_LINKS = [
  {
    title: 'Beliebte JLC Suchen',
    links: [
      { label: 'Jaeger-LeCoultre Uhr', to: '/jaeger-lecoultre-uhr' },
      { label: 'Jaeger-LeCoultre Uhren', to: '/jaeger-lecoultre-uhren' },
      { label: 'Jaeger-LeCoultre Reverso', to: '/jaeger-lecoultre/reverso' },
      { label: 'Gebrauchte Jaeger-LeCoultre', to: '/gebrauchte-jaeger-lecoultre' },
      { label: 'Jaeger-LeCoultre Uhren Preise', to: '/jaeger-lecoultre-uhren-preise' },
    ],
  },
  {
    title: 'JLC Kollektionen',
    links: [
      { label: 'Reverso', to: '/jaeger-lecoultre/reverso' },
      { label: 'Master Ultra Thin', to: '/jaeger-lecoultre/master-ultra-thin' },
      { label: 'Master Control', to: '/jaeger-lecoultre/master-control' },
      { label: 'Polaris', to: '/jaeger-lecoultre/polaris' },
      { label: 'Rendez-Vous', to: '/jaeger-lecoultre/rendez-vous' },
      { label: 'Duometre', to: '/jaeger-lecoultre/duometre' },
      { label: 'Atmos', to: '/jaeger-lecoultre/atmos' },
    ],
  },
  {
    title: 'Kaufen & Gebraucht',
    links: [
      { label: 'Jaeger-LeCoultre kaufen', to: '/jaeger-lecoultre-kaufen' },
      { label: 'Jaeger-LeCoultre Uhr kaufen', to: '/jaeger-lecoultre-uhr-kaufen' },
      { label: 'Jaeger-LeCoultre gebraucht kaufen', to: '/jaeger-lecoultre-gebraucht-kaufen' },
      { label: 'Gebrauchte Jaeger-LeCoultre', to: '/gebrauchte-jaeger-lecoultre' },
    ],
  },
  {
    title: 'Ratgeber & Guides',
    links: [
      { label: 'Welche Jaeger-LeCoultre kaufen?', to: '/welche-jaeger-lecoultre-kaufen' },
      { label: 'Jaeger-LeCoultre Uhren Preise', to: '/jaeger-lecoultre-uhren-preise' },
      { label: 'Jaeger-LeCoultre alte Modelle', to: '/jaeger-lecoultre-alte-modelle' },
      { label: 'Reverso Duoface Guide', to: '/jaeger-lecoultre/reverso-duoface' },
      { label: 'Master Chronograph', to: '/jaeger-lecoultre/master-chronograph' },
      { label: 'Jaeger-LeCoultre Story', to: '/jaeger-lecoultre/story' },
    ],
  },
  {
    title: 'Verwandte Luxusuhren-Marken',
    links: [
      { label: 'Rolex watches', to: '/brands/rolex' },
      { label: 'Patek Philippe watches', to: '/brands/patek-philippe' },
      { label: 'Audemars Piguet watches', to: '/brands/audemars-piguet' },
      { label: 'Cartier watches', to: '/brands/cartier' },
      { label: 'IWC Schaffhausen watches', to: '/brands/iwc-schaffhausen' },
      { label: 'Grand Seiko watches', to: '/brands/grand-seiko' },
    ],
  },
];

export const JLC_FAQS = [
  { q: 'Where can I buy a Jaeger-LeCoultre watch online?', a: "You can buy Jaeger-LeCoultre watches online at Kariv Glamour. Browse new and <a href='/gebrauchte-jaeger-lecoultre'>pre-owned Jaeger-LeCoultre watches</a> with transparent product details, reference numbers, and condition grading." },
  { q: 'What is the most iconic Jaeger-LeCoultre watch?', a: "The <a href='/jaeger-lecoultre/reverso'>Jaeger-LeCoultre Reverso</a> is the brand's most recognizable design, known for its reversible rectangular case, Art Deco character, and elegant dress-sport heritage." },
  { q: 'What is the Jaeger-LeCoultre Reverso?', a: "The <a href='/jaeger-lecoultre/reverso'>Reverso</a> is Jaeger-LeCoultre's iconic reversible watch with a rectangular case that swivels to reveal a second side. It was originally created in 1931 for polo players and is now a symbol of Art Deco design." },
  { q: 'What is the difference between Reverso Monoface and Reverso Duoface?', a: "The Reverso Monoface has a single dial, while the <a href='/jaeger-lecoultre/reverso-duoface'>Reverso Duoface</a> features two dials on opposite sides of the reversible case, often displaying two time zones." },
  { q: 'What is the difference between Master Ultra Thin and Master Control?', a: "<a href='/jaeger-lecoultre/master-ultra-thin'>Master Ultra Thin</a> focuses on slim proportions, pure design, and ultra-thin movements, while <a href='/jaeger-lecoultre/master-control'>Master Control</a> is a classic round-watch collection with chronographs, calendar functions, and contemporary refinement." },
  { q: 'Is it safe to buy a pre-owned Jaeger-LeCoultre watch?', a: "Yes. Buying <a href='/gebrauchte-jaeger-lecoultre'>pre-owned Jaeger-LeCoultre</a> from Kariv Glamour includes clear condition grading, box and papers information, and <a href='/buyer-protection'>buyer protection</a> for eligible purchases." },
  { q: 'What should I check before buying a used Jaeger-LeCoultre?', a: "Check the condition of the case and bracelet, verify the calibre type, confirm box and papers, and review the service history. Visit our <a href='/gebrauchte-jaeger-lecoultre'>pre-owned JLC page</a> for transparent listings." },
  { q: 'What are Jaeger-LeCoultre Atmos clocks?', a: "The <a href='/jaeger-lecoultre/atmos'>Jaeger-LeCoultre Atmos</a> is a famous luxury clock line that runs on near-perpetual motion powered by atmospheric temperature changes. It is a horological object, not a wristwatch." },
];

export const JLC_SEO_PAGES = {
  'jaeger-lecoultre-uhr': {
    h1: 'Jaeger-LeCoultre Uhr',
    title: 'Jaeger-LeCoultre Uhr | Kariv Glamour',
    description: 'Entdecken Sie Jaeger-LeCoultre Uhren bei Kariv Glamour — raffinierte Schweizer Uhrmacherei, das ikonische Reverso Geh\u00e4use, ultra-thin Kleideruhren und Komplikationen.',
    intro: 'Erkunden Sie Jaeger-LeCoultre Uhren bei Kariv Glamour — bekannt f\u00fcr raffinierte Schweizer Uhrmacherei, das ikonische Reverso Geh\u00e4use, ultra-thin Kleideruhren, Polaris Sportuhren und hoch-horologische Komplikationen.',
    filter: {},
  },
  'jaeger-lecoultre-uhren': {
    h1: 'Jaeger-LeCoultre Uhren',
    title: 'Jaeger-LeCoultre Uhren | Kariv Glamour',
    description: 'Jaeger-LeCoultre Uhren bei Kariv Glamour — Reverso, Master Ultra Thin, Master Control, Polaris und Rendez-Vous.',
    intro: 'St\u00f6bern Sie durch Jaeger-LeCoultre Uhren nach Kollektion, Material, Uhrwerk, Geh\u00e4useform, Komplikation, Zustand und Preis.',
    filter: {},
  },
  'jaeger-lecoultre-uhren-herren': {
    h1: 'Jaeger-LeCoultre Uhren Herren',
    title: 'Jaeger-LeCoultre Uhren Herren | Kariv Glamour',
    description: 'Jaeger-LeCoultre Uhren Herren bei Kariv Glamour — Reverso, Master Ultra Thin, Master Control und Polaris.',
    intro: 'Entdecken Sie Jaeger-LeCoultre Uhren f\u00fcr Herren — vom Reverso \u00fcber Master Ultra Thin bis zu Polaris.',
    filter: { gender: 'Men' },
  },
  'jaeger-lecoultre-uhren-damen': {
    h1: 'Jaeger-LeCoultre Uhren Damen',
    title: 'Jaeger-LeCoultre Uhren Damen | Kariv Glamour',
    description: 'Jaeger-LeCoultre Uhren Damen bei Kariv Glamour — Reverso, Rendez-Vous und elegante Modelle.',
    intro: 'Entdecken Sie Jaeger-LeCoultre Uhren f\u00fcr Damen, darunter Rendez-Vous und kleinere Reverso Modelle.',
    filter: { gender: 'Women' },
  },
  'gebrauchte-jaeger-lecoultre': {
    h1: 'Gebrauchte Jaeger-LeCoultre',
    title: 'Gebrauchte Jaeger-LeCoultre | Kariv Glamour',
    description: 'Gebrauchte Jaeger-LeCoultre Uhren bei Kariv Glamour mit transparenter Zustandsbewertung.',
    intro: 'Entdecken Sie gebrauchte Jaeger-LeCoultre Uhren mit klarer Zustandsbewertung, Box und Papers Informationen und detaillierten Produktdaten.',
    filter: {},
  },
  'jaeger-lecoultre-kaufen': {
    h1: 'Jaeger-LeCoultre kaufen',
    title: 'Jaeger-LeCoultre kaufen | Kariv Glamour',
    description: 'Jaeger-LeCoultre kaufen bei Kariv Glamour — neue und gebrauchte JLC Modelle.',
    intro: 'Jaeger-LeCoultre kaufen bei Kariv Glamour: neue und gebrauchte Modelle mit transparenter Produktinformation.',
    filter: {},
  },
  'jaeger-lecoultre-uhr-kaufen': {
    h1: 'Jaeger-LeCoultre Uhr kaufen',
    title: 'Jaeger-LeCoultre Uhr kaufen | Kariv Glamour',
    description: 'Jaeger-LeCoultre Uhr kaufen bei Kariv Glamour — Reverso, Master Ultra Thin, Master Control, Polaris und mehr.',
    intro: 'Jaeger-LeCoultre Uhr kaufen bei Kariv Glamour — entdecken Sie Modelle aus den Kollektionen Reverso, Master Ultra Thin, Master Control, Polaris, Rendez-Vous und Duometre.',
    filter: {},
  },
  'jaeger-lecoultre-gebraucht-kaufen': {
    h1: 'Jaeger-LeCoultre gebraucht kaufen',
    title: 'Jaeger-LeCoultre gebraucht kaufen | Kariv Glamour',
    description: 'Jaeger-LeCoultre gebraucht kaufen bei Kariv Glamour mit klarer Zustandsbewertung.',
    intro: 'Jaeger-LeCoultre gebraucht kaufen bei Kariv Glamour — mit Zustandsbewertung, Box und Papers und detaillierten Produktdaten.',
    filter: {},
  },
  'jaeger-lecoultre-uhren-preise': {
    h1: 'Jaeger-LeCoultre Uhren Preise',
    title: 'Jaeger-LeCoultre Uhren Preise | Kariv Glamour',
    description: 'Verstehen Sie Jaeger-LeCoultre Uhren Preise — was den Wert beeinflusst.',
    intro: 'Jaeger-LeCoultre Uhren Preise variieren nach Kollektion, Material, Komplikation und Zustand. Erfahren Sie, was den Wert einer JLC Uhr bestimmt.',
    isGuide: true,
  },
  'was-kostet-eine-jaeger-lecoultre-uhr': {
    h1: 'Was kostet eine Jaeger-LeCoultre Uhr?',
    title: 'Was kostet eine Jaeger-LeCoultre Uhr | Kariv Glamour',
    description: 'Was kostet eine Jaeger-LeCoultre Uhr? Erfahren Sie mehr \u00fcber Preise und Wertfaktoren.',
    intro: 'Was kostet eine Jaeger-LeCoultre Uhr? Der Preis h\u00e4ngt von Kollektion, Material, Komplikation, Zustand und Box/Papers ab.',
    isGuide: true,
  },
  'jaeger-lecoultre-alte-modelle': {
    h1: 'Jaeger-LeCoultre alte Modelle',
    title: 'Jaeger-LeCoultre alte Modelle | Kariv Glamour',
    description: 'Jaeger-LeCoultre alte Modelle und eingestellte Kollektionen wie Master Compressor.',
    intro: 'Entdecken Sie Jaeger-LeCoultre alte Modelle und eingestellte Kollektionen wie den Master Compressor — eine beliebte Familie bei Vintage-Sammlern.',
    isGuide: true,
  },
  'welche-jaeger-lecoultre-kaufen': {
    h1: 'Welche Jaeger-LeCoultre kaufen?',
    title: 'Welche Jaeger-LeCoultre kaufen | Kariv Glamour',
    description: 'JLC Kaufberatung — vergleichen Sie Reverso, Master Ultra Thin, Master Control und Polaris.',
    intro: 'Welche Jaeger-LeCoultre Uhr passt zu Ihnen? Vergleichen Sie Kollektionen, Uhrenformen, Komplikationen und Geh\u00e4usegr\u00f6\u00dfen, um die richtige Entscheidung zu treffen.',
    isGuide: true,
  },
  'jaeger-lecoultre-reverso-duoface': {
    h1: 'Jaeger-LeCoultre Reverso Duoface',
    title: 'Jaeger-LeCoultre Reverso Duoface | Kariv Glamour',
    description: 'Der Reverso Duoface — zwei Zifferbl\u00e4tter, zwei Zeitzonen, das Highlight reversibler Uhrmacherei.',
    intro: 'Der Jaeger-LeCoultre Reverso Duoface verf\u00fcgt \u00fcber zwei Zifferbl\u00e4tter auf gegen\u00fcberliegenden Seiten des reversiblen Geh\u00e4uses und zeigt oft zwei Zeitzonen an.',
    isGuide: true,
  },
  'jaeger-lecoultre-master-chronograph': {
    h1: 'Jaeger-LeCoultre Master Chronograph',
    title: 'Jaeger-LeCoultre Master Chronograph | Kariv Glamour',
    description: 'Jaeger-LeCoultre Master Chronograph — klassische runde Uhren mit Chronographenfunktion.',
    intro: 'Der Jaeger-LeCoultre Master Chronograph verbindet klassisches Rundgeh\u00e4usedesign mit pr\u00e4ziser Chronographenfunktion und zeitloser Eleganz.',
    isGuide: true,
  },
  'jaeger-lecoultre-story': {
    h1: 'Jaeger-LeCoultre Story',
    title: 'Jaeger-LeCoultre Story | Kariv Glamour',
    description: 'Die Jaeger-LeCoultre Story — Schweizer Uhrmacherei, Reverso und High Horology seit 1833.',
    intro: 'Jaeger-LeCoultre steht f\u00fcr raffinierte Schweizer Uhrmacherei, das ikonische Reverso Geh\u00e4use, ultra-thin Kleideruhren, Polaris Sportuhren und hoch-horologische Komplikationen seit 1833.',
    isGuide: true,
  },
};