// Jaeger-LeCoultre collections, filters, and SEO data
// Positioned around refined Swiss watchmaking, the iconic Reverso case,
// ultra-thin dress watches, Polaris sport models, and high horology.

const JLC_COLLECTION_ASSET_BASE = '/brand-assets/jaeger-lecoultre/collections';
const JLC_PAGE_ASSET_BASE = '/brand-assets/jaeger-lecoultre/page';

const COLLECTION_IMAGES = {
  reverso: `${JLC_COLLECTION_ASSET_BASE}/jaeger-lecoultre-reverso-collection.png`,
  masterUltraThin: `${JLC_COLLECTION_ASSET_BASE}/jaeger-lecoultre-master-ultra-thin-collection.png`,
  masterControl: `${JLC_COLLECTION_ASSET_BASE}/jaeger-lecoultre-master-control-collection.png`,
  polaris: `${JLC_COLLECTION_ASSET_BASE}/jaeger-lecoultre-polaris-collection.png`,
  rendezVous: `${JLC_COLLECTION_ASSET_BASE}/jaeger-lecoultre-rendez-vous-collection.png`,
  duometre: `${JLC_COLLECTION_ASSET_BASE}/jaeger-lecoultre-duometre-collection.png`,
  masterCompressor: `${JLC_COLLECTION_ASSET_BASE}/jaeger-lecoultre-master-compressor-collection.png`,
};

export const JLC_PAGE_IMAGES = {
  hero: `${JLC_PAGE_ASSET_BASE}/jaeger-lecoultre-hero.webp`,
  story: `${JLC_PAGE_ASSET_BASE}/jaeger-lecoultre-brand-story.webp`,
  preOwned: `${JLC_PAGE_ASSET_BASE}/jaeger-lecoultre-pre-owned.webp`,
  masterControlGuide: `${JLC_PAGE_ASSET_BASE}/jaeger-lecoultre-master-control-guide.webp`,
  masterUltraThinGuide: `${JLC_PAGE_ASSET_BASE}/jaeger-lecoultre-master-ultra-thin-guide.jpg`,
  reversoDuoface: `${JLC_PAGE_ASSET_BASE}/jaeger-lecoultre-reverso-duoface.jpg`,
  reverso: `${JLC_PAGE_ASSET_BASE}/jaeger-lecoultre-reverso.jpg`,
};

export const JLC_HERO_IMAGE = JLC_PAGE_IMAGES.hero;
export const JLC_STORY_IMAGE = JLC_PAGE_IMAGES.story;

export const JLC_COLLECTIONS = [
  { id: 1, name: 'Reverso', slug: 'reverso', image: COLLECTION_IMAGES.reverso, shortDescription_en: "Jaeger-LeCoultre's most recognizable design, known for its reversible rectangular case, Art Deco character, and elegant dress-sport heritage.", shortDescription_de: "Das bekannteste Design von Jaeger-LeCoultre, berühmt für sein reversibles rechteckiges Gehäuse, Art-Deco-Charakter und elegantes Dress-Sport-Erbe." },
  { id: 2, name: 'Master Ultra Thin', slug: 'master-ultra-thin', image: COLLECTION_IMAGES.masterUltraThin, shortDescription_en: 'A refined collection focused on slim proportions, pure design, moonphase models, perpetual calendars, and elegant dress-watch styling.', shortDescription_de: 'Eine verfeinerte Kollektion, fokussiert auf schlanke Proportionen, reines Design, Mondphasen-Modelle, ewige Kalender und elegante Dress-Uhren-Stilistik.' },
  { id: 3, name: 'Master Control', slug: 'master-control', image: COLLECTION_IMAGES.masterControl, shortDescription_en: 'A classic round-watch collection with technical elegance, automatic movements, chronographs, calendar functions, and contemporary refinement.', shortDescription_de: 'Eine klassische Runduhren-Kollektion mit technischer Eleganz, Automatik-Uhrwerken, Chronographen, Kalenderfunktionen und zeitgemäßer Raffinesse.' },
  { id: 4, name: 'Polaris', slug: 'polaris', image: COLLECTION_IMAGES.polaris, shortDescription_en: 'A modern sport-watch collection offering casual elegance, strong legibility, and versatile daily wear.', shortDescription_de: 'Eine moderne Sportuhren-Kollektion mit lässiger Eleganz, starker Ablesbarkeit und vielseitiger Alltagstauglichkeit.' },
  { id: 5, name: 'Rendez-Vous', slug: 'rendez-vous', image: COLLECTION_IMAGES.rendezVous, shortDescription_en: 'An elegant Jaeger-LeCoultre collection for women, often associated with refined proportions, moonphase details, and jewellery-inspired finishing.', shortDescription_de: 'Eine elegante Jaeger-LeCoultre-Kollektion für Damen, oft mit verfeinerten Proportionen, Mondphasen-Details und schmuckinspirierter Verarbeitung.' },
  { id: 6, name: 'Duometre', slug: 'duometre', image: COLLECTION_IMAGES.duometre, shortDescription_en: 'A high-watchmaking collection focused on advanced complications, precision, and Jaeger-LeCoultre\u2019s technical expertise.', shortDescription_de: 'Eine High-Watchmaking-Kollektion, fokussiert auf fortschrittliche Komplikationen, Präzision und Jaeger-LeCoultries technische Expertise.' },
  { id: 7, name: 'Atmos', slug: 'atmos', image: '', shortDescription_en: 'A luxury clock and horological object line, suitable for collectors interested in mechanical objects beyond wristwatches.', shortDescription_de: 'Eine Luxusuhren- und Horologie-Objekt-Linie, geeignet für Sammler, die an mechanischen Objekten jenseits von Armbanduhren interessiert sind.', isHorological: true },
  { id: 8, name: 'Master Compressor', slug: 'master-compressor', image: COLLECTION_IMAGES.masterCompressor, shortDescription_en: 'A discontinued Jaeger-LeCoultre sports-watch family with strong interest for pre-owned and vintage collectors.', shortDescription_de: 'Eine eingestellte Jaeger-LeCoultre-Sportuhren-Familie mit großem Interesse für Gebraucht- und Vintage-Sammler.', isDiscontinued: true },
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
  { label_en: 'Reverso', label_de: 'Reverso', link: '/jaeger-lecoultre/reverso' },
  { label_en: 'Master Ultra Thin', label_de: 'Master Ultra Thin', link: '/jaeger-lecoultre/master-ultra-thin' },
  { label_en: 'Master Control', label_de: 'Master Control', link: '/jaeger-lecoultre/master-control' },
  { label_en: 'Polaris', label_de: 'Polaris', link: '/jaeger-lecoultre/polaris' },
  { label_en: 'Rendez-Vous', label_de: 'Rendez-Vous', link: '/jaeger-lecoultre/rendez-vous' },
  { label_en: 'Duometre', label_de: 'Duometre', link: '/jaeger-lecoultre/duometre' },
  { label_en: 'Pre-Owned', label_de: 'Gebraucht', link: '/gebrauchte-jaeger-lecoultre' },
];

export const JLC_SEO_CARDS = [
  { title_en: 'Jaeger-LeCoultre Watch', title_de: 'Jaeger-LeCoultre Uhr', description_en: 'Explore Jaeger-LeCoultre watches at Kariv Glamour — refined Swiss watchmaking, the iconic Reverso case, ultra-thin dress watches, and high horology complications.', description_de: 'Entdecken Sie Jaeger-LeCoultre Uhren bei Kariv Glamour — raffinierte Schweizer Uhrmacherei, das ikonische Reverso-Gehäuse, ultra-thin Dress-Uhren und hoch-horologische Komplikationen.', link: '/jaeger-lecoultre-uhr', image: JLC_PAGE_IMAGES.hero },
  { title_en: 'Jaeger-LeCoultre Reverso', title_de: 'Jaeger-LeCoultre Reverso', description_en: 'Discover the Jaeger-LeCoultre Reverso — the most recognizable JLC design with its reversible rectangular case and Art Deco character.', description_de: 'Entdecken Sie die Jaeger-LeCoultre Reverso — das bekannteste JLC-Design mit ihrem reversiblen rechteckigen Gehäuse und Art-Deco-Charakter.', link: '/jaeger-lecoultre/reverso', image: JLC_PAGE_IMAGES.reverso },
  { title_en: 'Jaeger-LeCoultre Master Ultra Thin', title_de: 'Jaeger-LeCoultre Master Ultra Thin', description_en: 'Browse Jaeger-LeCoultre Master Ultra Thin — slim proportions, pure design, moonphase models, and perpetual calendars.', description_de: 'Stöbern Sie durch Jaeger-LeCoultre Master Ultra Thin — schlanke Proportionen, reines Design, Mondphasen-Modelle und ewige Kalender.', link: '/jaeger-lecoultre/master-ultra-thin', image: JLC_PAGE_IMAGES.masterUltraThinGuide },
  { title_en: 'Jaeger-LeCoultre Master Control', title_de: 'Jaeger-LeCoultre Master Control', description_en: 'Explore Jaeger-LeCoultre Master Control — classic round watches with chronographs, calendar functions, and contemporary refinement.', description_de: 'Entdecken Sie Jaeger-LeCoultre Master Control — klassische Runduhren mit Chronographen, Kalenderfunktionen und zeitgemäßer Raffinesse.', link: '/jaeger-lecoultre/master-control', image: JLC_PAGE_IMAGES.masterControlGuide },
  { title_en: 'Pre-Owned Jaeger-LeCoultre', title_de: 'Gebrauchte Jaeger-LeCoultre', description_en: 'Explore pre-owned Jaeger-LeCoultre watches with transparent condition grading, box and papers information, and product-specific details.', description_de: 'Entdecken Sie gebrauchte Jaeger-LeCoultre Uhren mit transparenter Zustandsbewertung, Box und Papers Informationen und produktspezifischen Details.', link: '/gebrauchte-jaeger-lecoultre', image: JLC_PAGE_IMAGES.preOwned },
  { title_en: 'Jaeger-LeCoultre Watch Prices', title_de: 'Jaeger-LeCoultre Uhren Preise', description_en: 'Understand Jaeger-LeCoultre watch prices — what influences value across Reverso, Master Ultra Thin, Master Control, and Polaris.', description_de: 'Verstehen Sie Jaeger-LeCoultre Uhren Preise — was den Wert über Reverso, Master Ultra Thin, Master Control und Polaris beeinflusst.', link: '/jaeger-lecoultre-uhren-preise', image: JLC_PAGE_IMAGES.story },
];

export const JLC_READ_MORE = [
  { title_en: 'Jaeger-LeCoultre Story', title_de: 'Jaeger-LeCoultre Story', description_en: "Explore Jaeger-LeCoultre's heritage of refined Swiss watchmaking, the Reverso, ultra-thin movements, and high horology since 1833.", description_de: "Entdecken Sie Jaeger-LeCoultries Erbe raffinierter Schweizer Uhrmacherei, der Reverso, ultra-thin Uhrwerke und High Horology seit 1833.", link: '/jaeger-lecoultre/story', image: JLC_PAGE_IMAGES.story },
  { title_en: 'The Reverso Guide', title_de: 'Der Reverso Guide', description_en: 'Learn what makes the Jaeger-LeCoultre Reverso iconic — the reversible case, Art Deco design, and dress-sport heritage.', description_de: 'Erfahren Sie, was die Jaeger-LeCoultre Reverso ikonisch macht — das reversible Gehäuse, Art-Deco-Design und Dress-Sport-Erbe.', link: '/jaeger-lecoultre/reverso', image: JLC_PAGE_IMAGES.reverso },
  { title_en: 'Reverso Duoface Guide', title_de: 'Reverso Duoface Guide', description_en: 'Understand the Reverso Duoface — two dials, two time zones, and the pinnacle of reversible watch design.', description_de: 'Verstehen Sie die Reverso Duoface — zwei Zifferblätter, zwei Zeitzonen und den Höhepunkt reversibler Uhrmacherei.', link: '/jaeger-lecoultre/reverso-duoface', image: JLC_PAGE_IMAGES.reversoDuoface },
  { title_en: 'Master Ultra Thin Guide', title_de: 'Master Ultra Thin Guide', description_en: 'Discover Jaeger-LeCoultre ultra-thin watchmaking — slim proportions, moonphase, and perpetual calendar mastery.', description_de: 'Entdecken Sie Jaeger-LeCoultre ultra-thin Uhrmacherei — schlanke Proportionen, Mondphase und ewige Kalender-Meisterschaft.', link: '/jaeger-lecoultre/master-ultra-thin', image: JLC_PAGE_IMAGES.masterUltraThinGuide },
  { title_en: 'Master Control Guide', title_de: 'Master Control Guide', description_en: 'Explore the Master Control collection — classic round design, chronographs, and calendar complications.', description_de: 'Entdecken Sie die Master Control Kollektion — klassisches Runddesign, Chronographen und Kalender-Komplikationen.', link: '/jaeger-lecoultre/master-control', image: JLC_PAGE_IMAGES.masterControlGuide },
  { title_en: 'Buying Pre-Owned JLC', title_de: 'Gebrauchte JLC kaufen', description_en: 'What to check before buying a used Jaeger-LeCoultre — condition, box and papers, calibre, and service history.', description_de: 'Worauf Sie vor dem Kauf einer gebrauchten Jaeger-LeCoultre achten sollten — Zustand, Box und Papers, Kaliber und Service-Historie.', link: '/gebrauchte-jaeger-lecoultre', image: JLC_PAGE_IMAGES.preOwned },
];

export const JLC_INTERNAL_LINKS = [
  {
    title_en: 'Popular JLC Searches', title_de: 'Beliebte JLC Suchen',
    links: [
      { label_en: 'Jaeger-LeCoultre Watch', label_de: 'Jaeger-LeCoultre Uhr', to: '/jaeger-lecoultre-uhr' },
      { label_en: 'Jaeger-LeCoultre Watches', label_de: 'Jaeger-LeCoultre Uhren', to: '/jaeger-lecoultre-uhren' },
      { label_en: 'Jaeger-LeCoultre Reverso', label_de: 'Jaeger-LeCoultre Reverso', to: '/jaeger-lecoultre/reverso' },
      { label_en: 'Pre-Owned Jaeger-LeCoultre', label_de: 'Gebrauchte Jaeger-LeCoultre', to: '/gebrauchte-jaeger-lecoultre' },
      { label_en: 'Jaeger-LeCoultre Watch Prices', label_de: 'Jaeger-LeCoultre Uhren Preise', to: '/jaeger-lecoultre-uhren-preise' },
    ],
  },
  {
    title_en: 'JLC Collections', title_de: 'JLC Kollektionen',
    links: [
      { label_en: 'Reverso', label_de: 'Reverso', to: '/jaeger-lecoultre/reverso' },
      { label_en: 'Master Ultra Thin', label_de: 'Master Ultra Thin', to: '/jaeger-lecoultre/master-ultra-thin' },
      { label_en: 'Master Control', label_de: 'Master Control', to: '/jaeger-lecoultre/master-control' },
      { label_en: 'Polaris', label_de: 'Polaris', to: '/jaeger-lecoultre/polaris' },
      { label_en: 'Rendez-Vous', label_de: 'Rendez-Vous', to: '/jaeger-lecoultre/rendez-vous' },
      { label_en: 'Duometre', label_de: 'Duometre', to: '/jaeger-lecoultre/duometre' },
      { label_en: 'Atmos', label_de: 'Atmos', to: '/jaeger-lecoultre/atmos' },
    ],
  },
  {
    title_en: 'Buy & Pre-Owned', title_de: 'Kaufen & Gebraucht',
    links: [
      { label_en: 'Buy Jaeger-LeCoultre', label_de: 'Jaeger-LeCoultre kaufen', to: '/jaeger-lecoultre-kaufen' },
      { label_en: 'Buy Jaeger-LeCoultre Watch', label_de: 'Jaeger-LeCoultre Uhr kaufen', to: '/jaeger-lecoultre-uhr-kaufen' },
      { label_en: 'Buy Pre-Owned Jaeger-LeCoultre', label_de: 'Jaeger-LeCoultre gebraucht kaufen', to: '/jaeger-lecoultre-gebraucht-kaufen' },
      { label_en: 'Pre-Owned Jaeger-LeCoultre', label_de: 'Gebrauchte Jaeger-LeCoultre', to: '/gebrauchte-jaeger-lecoultre' },
    ],
  },
  {
    title_en: 'Guides & Resources', title_de: 'Ratgeber & Guides',
    links: [
      { label_en: 'Which Jaeger-LeCoultre to Buy?', label_de: 'Welche Jaeger-LeCoultre kaufen?', to: '/welche-jaeger-lecoultre-kaufen' },
      { label_en: 'Jaeger-LeCoultre Watch Prices', label_de: 'Jaeger-LeCoultre Uhren Preise', to: '/jaeger-lecoultre-uhren-preise' },
      { label_en: 'Jaeger-LeCoultre Old Models', label_de: 'Jaeger-LeCoultre alte Modelle', to: '/jaeger-lecoultre-alte-modelle' },
      { label_en: 'Reverso Duoface Guide', label_de: 'Reverso Duoface Guide', to: '/jaeger-lecoultre/reverso-duoface' },
      { label_en: 'Master Chronograph', label_de: 'Master Chronograph', to: '/jaeger-lecoultre/master-chronograph' },
      { label_en: 'Jaeger-LeCoultre Story', label_de: 'Jaeger-LeCoultre Story', to: '/jaeger-lecoultre/story' },
    ],
  },
  {
    title_en: 'Related Luxury Watch Brands', title_de: 'Verwandte Luxusuhren-Marken',
    links: [
      { label_en: 'Rolex watches', label_de: 'Rolex Uhren', to: '/brands/rolex' },
      { label_en: 'Patek Philippe watches', label_de: 'Patek Philippe Uhren', to: '/brands/patek-philippe' },
      { label_en: 'Audemars Piguet watches', label_de: 'Audemars Piguet Uhren', to: '/brands/audemars-piguet' },
      { label_en: 'Cartier watches', label_de: 'Cartier Uhren', to: '/brands/cartier' },
      { label_en: 'IWC Schaffhausen watches', label_de: 'IWC Schaffhausen Uhren', to: '/brands/iwc-schaffhausen' },
      { label_en: 'Grand Seiko watches', label_de: 'Grand Seiko Uhren', to: '/brands/grand-seiko' },
    ],
  },
];

export const JLC_FAQS = [
  { q_en: 'Where can I buy a Jaeger-LeCoultre watch online?', q_de: 'Wo kann ich online eine Jaeger-LeCoultre Uhr kaufen?', a_en: "You can buy Jaeger-LeCoultre watches online at Kariv Glamour. Browse new and <a href='/gebrauchte-jaeger-lecoultre'>pre-owned Jaeger-LeCoultre watches</a> with transparent product details, reference numbers, and condition grading.", a_de: "Sie können Jaeger-LeCoultre Uhren online bei Kariv Glamour kaufen. Stöbern Sie durch neue und <a href='/gebrauchte-jaeger-lecoultre'>gebrauchte Jaeger-LeCoultre Uhren</a> mit transparenten Produktdetails, Referenznummern und Zustandsbewertung." },
  { q_en: 'What is the most iconic Jaeger-LeCoultre watch?', q_de: 'Was ist die ikonischste Jaeger-LeCoultre Uhr?', a_en: "The <a href='/jaeger-lecoultre/reverso'>Jaeger-LeCoultre Reverso</a> is the brand's most recognizable design, known for its reversible rectangular case, Art Deco character, and elegant dress-sport heritage.", a_de: "Die <a href='/jaeger-lecoultre/reverso'>Jaeger-LeCoultre Reverso</a> ist das bekannteste Design der Marke, berühmt für ihr reversibles rechteckiges Gehäuse, Art-Deco-Charakter und elegantes Dress-Sport-Erbe." },
  { q_en: 'What is the Jaeger-LeCoultre Reverso?', q_de: 'Was ist die Jaeger-LeCoultre Reverso?', a_en: "The <a href='/jaeger-lecoultre/reverso'>Reverso</a> is Jaeger-LeCoultre's iconic reversible watch with a rectangular case that swivels to reveal a second side. It was originally created in 1931 for polo players and is now a symbol of Art Deco design.", a_de: "Die <a href='/jaeger-lecoultre/reverso'>Reverso</a> ist Jaeger-LeCoultries ikonische reversible Uhr mit einem rechteckigen Gehäuse, das sich dreht, um eine zweite Seite freizulegen. Sie wurde ursprünglich 1931 für Polospieler geschaffen und ist heute ein Symbol für Art-Deco-Design." },
  { q_en: 'What is the difference between Reverso Monoface and Reverso Duoface?', q_de: 'Was ist der Unterschied zwischen Reverso Monoface und Reverso Duoface?', a_en: "The Reverso Monoface has a single dial, while the <a href='/jaeger-lecoultre/reverso-duoface'>Reverso Duoface</a> features two dials on opposite sides of the reversible case, often displaying two time zones.", a_de: "Die Reverso Monoface hat ein einzelnes Zifferblatt, während die <a href='/jaeger-lecoultre/reverso-duoface'>Reverso Duoface</a> zwei Zifferblätter auf gegenüberliegenden Seiten des reversiblen Gehäuses aufweist, oft mit zwei Zeitzonen." },
  { q_en: 'What is the difference between Master Ultra Thin and Master Control?', q_de: 'Was ist der Unterschied zwischen Master Ultra Thin und Master Control?', a_en: "<a href='/jaeger-lecoultre/master-ultra-thin'>Master Ultra Thin</a> focuses on slim proportions, pure design, and ultra-thin movements, while <a href='/jaeger-lecoultre/master-control'>Master Control</a> is a classic round-watch collection with chronographs, calendar functions, and contemporary refinement.", a_de: "<a href='/jaeger-lecoultre/master-ultra-thin'>Master Ultra Thin</a> fokussiert sich auf schlanke Proportionen, reines Design und ultra-thin Uhrwerke, während <a href='/jaeger-lecoultre/master-control'>Master Control</a> eine klassische Runduhren-Kollektion mit Chronographen, Kalenderfunktionen und zeitgemäßer Raffinesse ist." },
  { q_en: 'Is it safe to buy a pre-owned Jaeger-LeCoultre watch?', q_de: 'Ist es sicher, eine gebrauchte Jaeger-LeCoultre Uhr zu kaufen?', a_en: "Yes. Buying <a href='/gebrauchte-jaeger-lecoultre'>pre-owned Jaeger-LeCoultre</a> from Kariv Glamour includes clear condition grading, box and papers information, and <a href='/buyer-protection'>buyer protection</a> for eligible purchases.", a_de: "Ja. Der Kauf von <a href='/gebrauchte-jaeger-lecoultre'>gebrauchten Jaeger-LeCoultre Uhren</a> bei Kariv Glamour umfasst klare Zustandsbewertung, Box und Papers Informationen und <a href='/buyer-protection'>Käuferschutz</a> für berechtigte Käufe." },
  { q_en: 'What should I check before buying a used Jaeger-LeCoultre?', q_de: 'Worauf sollte ich vor dem Kauf einer gebrauchten Jaeger-LeCoultre achten?', a_en: "Check the condition of the case and bracelet, verify the calibre type, confirm box and papers, and review the service history. Visit our <a href='/gebrauchte-jaeger-lecoultre'>pre-owned JLC page</a> for transparent listings.", a_de: "Prüfen Sie den Zustand von Gehäuse und Armband, verifizieren Sie den Kaliber-Typ, bestätigen Sie Box und Papers und prüfen Sie die Service-Historie. Besuchen Sie unsere <a href='/gebrauchte-jaeger-lecoultre'>Seite für gebrauchte JLC Uhren</a> für transparente Angebote." },
  { q_en: 'What are Jaeger-LeCoultre Atmos clocks?', q_de: 'Was sind Jaeger-LeCoultre Atmos Uhren?', a_en: "The <a href='/jaeger-lecoultre/atmos'>Jaeger-LeCoultre Atmos</a> is a famous luxury clock line that runs on near-perpetual motion powered by atmospheric temperature changes. It is a horological object, not a wristwatch.", a_de: "Die <a href='/jaeger-lecoultre/atmos'>Jaeger-LeCoultre Atmos</a> ist eine berühmte Luxusuhren-Linie, die durch nahezu unbegrenzte Bewegung läuft, angetrieben von atmosphärischen Temperaturänderungen. Es ist ein horologisches Objekt, keine Armbanduhr." },
];

export const JLC_SEO_PAGES = {
  'jaeger-lecoultre-uhr': {
    h1_en: 'Jaeger-LeCoultre Watch', h1_de: 'Jaeger-LeCoultre Uhr',
    title_en: 'Jaeger-LeCoultre Watch | Kariv Glamour', title_de: 'Jaeger-LeCoultre Uhr | Kariv Glamour',
    description_en: 'Explore Jaeger-LeCoultre watches at Kariv Glamour — refined Swiss watchmaking, the iconic Reverso case, ultra-thin dress watches and complications.',
    description_de: 'Entdecken Sie Jaeger-LeCoultre Uhren bei Kariv Glamour — raffinierte Schweizer Uhrmacherei, das ikonische Reverso-Gehäuse, ultra-thin Kleideruhren und Komplikationen.',
    intro_en: 'Explore Jaeger-LeCoultre watches at Kariv Glamour — known for refined Swiss watchmaking, the iconic Reverso case, ultra-thin dress watches, Polaris sport watches and high-horology complications.',
    intro_de: 'Erkunden Sie Jaeger-LeCoultre Uhren bei Kariv Glamour — bekannt für raffinierte Schweizer Uhrmacherei, das ikonische Reverso-Gehäuse, ultra-thin Kleideruhren, Polaris Sportuhren und hoch-horologische Komplikationen.',
    filter: {},
  },
  'jaeger-lecoultre-uhren': {
    h1_en: 'Jaeger-LeCoultre Watches', h1_de: 'Jaeger-LeCoultre Uhren',
    title_en: 'Jaeger-LeCoultre Watches | Kariv Glamour', title_de: 'Jaeger-LeCoultre Uhren | Kariv Glamour',
    description_en: 'Jaeger-LeCoultre watches at Kariv Glamour — Reverso, Master Ultra Thin, Master Control, Polaris and Rendez-Vous.',
    description_de: 'Jaeger-LeCoultre Uhren bei Kariv Glamour — Reverso, Master Ultra Thin, Master Control, Polaris und Rendez-Vous.',
    intro_en: 'Browse Jaeger-LeCoultre watches by collection, material, movement, case shape, complication, condition and price.',
    intro_de: 'Stöbern Sie durch Jaeger-LeCoultre Uhren nach Kollektion, Material, Uhrwerk, Gehäuseform, Komplikation, Zustand und Preis.',
    filter: {},
  },
  'jaeger-lecoultre-uhren-herren': {
    h1_en: "Jaeger-LeCoultre Men's Watches", h1_de: 'Jaeger-LeCoultre Uhren Herren',
    title_en: "Jaeger-LeCoultre Men's Watches | Kariv Glamour", title_de: 'Jaeger-LeCoultre Uhren Herren | Kariv Glamour',
    description_en: "Jaeger-LeCoultre men's watches at Kariv Glamour — Reverso, Master Ultra Thin, Master Control and Polaris.",
    description_de: 'Jaeger-LeCoultre Uhren Herren bei Kariv Glamour — Reverso, Master Ultra Thin, Master Control und Polaris.',
    intro_en: 'Discover Jaeger-LeCoultre watches for men — from the Reverso to Master Ultra Thin and Polaris.',
    intro_de: 'Entdecken Sie Jaeger-LeCoultre Uhren für Herren — vom Reverso über Master Ultra Thin bis zu Polaris.',
    filter: { gender: 'Men' },
  },
  'jaeger-lecoultre-uhren-damen': {
    h1_en: "Jaeger-LeCoultre Women's Watches", h1_de: 'Jaeger-LeCoultre Uhren Damen',
    title_en: "Jaeger-LeCoultre Women's Watches | Kariv Glamour", title_de: 'Jaeger-LeCoultre Uhren Damen | Kariv Glamour',
    description_en: "Jaeger-LeCoultre women's watches at Kariv Glamour — Reverso, Rendez-Vous and elegant models.",
    description_de: 'Jaeger-LeCoultre Uhren Damen bei Kariv Glamour — Reverso, Rendez-Vous und elegante Modelle.',
    intro_en: 'Discover Jaeger-LeCoultre watches for women, including Rendez-Vous and smaller Reverso models.',
    intro_de: 'Entdecken Sie Jaeger-LeCoultre Uhren für Damen, darunter Rendez-Vous und kleinere Reverso Modelle.',
    filter: { gender: 'Women' },
  },
  'gebrauchte-jaeger-lecoultre': {
    h1_en: 'Pre-Owned Jaeger-LeCoultre', h1_de: 'Gebrauchte Jaeger-LeCoultre',
    title_en: 'Pre-Owned Jaeger-LeCoultre | Kariv Glamour', title_de: 'Gebrauchte Jaeger-LeCoultre | Kariv Glamour',
    description_en: 'Pre-owned Jaeger-LeCoultre watches at Kariv Glamour with transparent condition grading.',
    description_de: 'Gebrauchte Jaeger-LeCoultre Uhren bei Kariv Glamour mit transparenter Zustandsbewertung.',
    intro_en: 'Discover pre-owned Jaeger-LeCoultre watches with clear condition grading, box and papers information and detailed product data.',
    intro_de: 'Entdecken Sie gebrauchte Jaeger-LeCoultre Uhren mit klarer Zustandsbewertung, Box und Papers Informationen und detaillierten Produktdaten.',
    filter: {},
  },
  'jaeger-lecoultre-kaufen': {
    h1_en: 'Buy Jaeger-LeCoultre', h1_de: 'Jaeger-LeCoultre kaufen',
    title_en: 'Buy Jaeger-LeCoultre | Kariv Glamour', title_de: 'Jaeger-LeCoultre kaufen | Kariv Glamour',
    description_en: 'Buy Jaeger-LeCoultre at Kariv Glamour — new and pre-owned JLC models.',
    description_de: 'Jaeger-LeCoultre kaufen bei Kariv Glamour — neue und gebrauchte JLC Modelle.',
    intro_en: 'Buy Jaeger-LeCoultre at Kariv Glamour: new and pre-owned models with transparent product information.',
    intro_de: 'Jaeger-LeCoultre kaufen bei Kariv Glamour: neue und gebrauchte Modelle mit transparenter Produktinformation.',
    filter: {},
  },
  'jaeger-lecoultre-uhr-kaufen': {
    h1_en: 'Buy Jaeger-LeCoultre Watch', h1_de: 'Jaeger-LeCoultre Uhr kaufen',
    title_en: 'Buy Jaeger-LeCoultre Watch | Kariv Glamour', title_de: 'Jaeger-LeCoultre Uhr kaufen | Kariv Glamour',
    description_en: 'Buy Jaeger-LeCoultre watch at Kariv Glamour — Reverso, Master Ultra Thin, Master Control, Polaris and more.',
    description_de: 'Jaeger-LeCoultre Uhr kaufen bei Kariv Glamour — Reverso, Master Ultra Thin, Master Control, Polaris und mehr.',
    intro_en: 'Buy Jaeger-LeCoultre watches at Kariv Glamour — discover models from the Reverso, Master Ultra Thin, Master Control, Polaris, Rendez-Vous and Duometre collections.',
    intro_de: 'Jaeger-LeCoultre Uhr kaufen bei Kariv Glamour — entdecken Sie Modelle aus den Kollektionen Reverso, Master Ultra Thin, Master Control, Polaris, Rendez-Vous und Duometre.',
    filter: {},
  },
  'jaeger-lecoultre-gebraucht-kaufen': {
    h1_en: 'Buy Pre-Owned Jaeger-LeCoultre', h1_de: 'Jaeger-LeCoultre gebraucht kaufen',
    title_en: 'Buy Pre-Owned Jaeger-LeCoultre | Kariv Glamour', title_de: 'Jaeger-LeCoultre gebraucht kaufen | Kariv Glamour',
    description_en: 'Buy pre-owned Jaeger-LeCoultre at Kariv Glamour with clear condition grading.',
    description_de: 'Jaeger-LeCoultre gebraucht kaufen bei Kariv Glamour mit klarer Zustandsbewertung.',
    intro_en: 'Buy pre-owned Jaeger-LeCoultre at Kariv Glamour — with condition grading, box and papers and detailed product data.',
    intro_de: 'Jaeger-LeCoultre gebraucht kaufen bei Kariv Glamour — mit Zustandsbewertung, Box und Papers und detaillierten Produktdaten.',
    filter: {},
  },
  'jaeger-lecoultre-uhren-preise': {
    h1_en: 'Jaeger-LeCoultre Watch Prices', h1_de: 'Jaeger-LeCoultre Uhren Preise',
    title_en: 'Jaeger-LeCoultre Watch Prices | Kariv Glamour', title_de: 'Jaeger-LeCoultre Uhren Preise | Kariv Glamour',
    description_en: 'Understand Jaeger-LeCoultre watch prices — what influences value.',
    description_de: 'Verstehen Sie Jaeger-LeCoultre Uhren Preise — was den Wert beeinflusst.',
    intro_en: 'Jaeger-LeCoultre watch prices vary by collection, material, complication and condition. Learn what determines the value of a JLC watch.',
    intro_de: 'Jaeger-LeCoultre Uhren Preise variieren nach Kollektion, Material, Komplikation und Zustand. Erfahren Sie, was den Wert einer JLC Uhr bestimmt.',
    isGuide: true,
  },
  'was-kostet-eine-jaeger-lecoultre-uhr': {
    h1_en: 'How Much Does a Jaeger-LeCoultre Watch Cost?', h1_de: 'Was kostet eine Jaeger-LeCoultre Uhr?',
    title_en: 'How Much Does a Jaeger-LeCoultre Watch Cost | Kariv Glamour', title_de: 'Was kostet eine Jaeger-LeCoultre Uhr | Kariv Glamour',
    description_en: 'How much does a Jaeger-LeCoultre watch cost? Learn more about prices and value factors.',
    description_de: 'Was kostet eine Jaeger-LeCoultre Uhr? Erfahren Sie mehr über Preise und Wertfaktoren.',
    intro_en: 'How much does a Jaeger-LeCoultre watch cost? The price depends on collection, material, complication, condition and box/papers.',
    intro_de: 'Was kostet eine Jaeger-LeCoultre Uhr? Der Preis hängt von Kollektion, Material, Komplikation, Zustand und Box/Papers ab.',
    isGuide: true,
  },
  'jaeger-lecoultre-alte-modelle': {
    h1_en: 'Jaeger-LeCoultre Old Models', h1_de: 'Jaeger-LeCoultre alte Modelle',
    title_en: 'Jaeger-LeCoultre Old Models | Kariv Glamour', title_de: 'Jaeger-LeCoultre alte Modelle | Kariv Glamour',
    description_en: 'Jaeger-LeCoultre old models and discontinued collections like Master Compressor.',
    description_de: 'Jaeger-LeCoultre alte Modelle und eingestellte Kollektionen wie Master Compressor.',
    intro_en: 'Discover Jaeger-LeCoultre old models and discontinued collections like the Master Compressor — a popular family among vintage collectors.',
    intro_de: 'Entdecken Sie Jaeger-LeCoultre alte Modelle und eingestellte Kollektionen wie den Master Compressor — eine beliebte Familie bei Vintage-Sammlern.',
    isGuide: true,
  },
  'welche-jaeger-lecoultre-kaufen': {
    h1_en: 'Which Jaeger-LeCoultre to Buy?', h1_de: 'Welche Jaeger-LeCoultre kaufen?',
    title_en: 'Which Jaeger-LeCoultre to Buy | Kariv Glamour', title_de: 'Welche Jaeger-LeCoultre kaufen | Kariv Glamour',
    description_en: 'JLC buying advice — compare Reverso, Master Ultra Thin, Master Control and Polaris.',
    description_de: 'JLC Kaufberatung — vergleichen Sie Reverso, Master Ultra Thin, Master Control und Polaris.',
    intro_en: 'Which Jaeger-LeCoultre watch is right for you? Compare collections, watch shapes, complications and case sizes to make the right decision.',
    intro_de: 'Welche Jaeger-LeCoultre Uhr passt zu Ihnen? Vergleichen Sie Kollektionen, Uhrenformen, Komplikationen und Gehäusegrößen, um die richtige Entscheidung zu treffen.',
    isGuide: true,
  },
  'jaeger-lecoultre-reverso-duoface': {
    h1_en: 'Jaeger-LeCoultre Reverso Duoface', h1_de: 'Jaeger-LeCoultre Reverso Duoface',
    title_en: 'Jaeger-LeCoultre Reverso Duoface | Kariv Glamour', title_de: 'Jaeger-LeCoultre Reverso Duoface | Kariv Glamour',
    description_en: 'The Reverso Duoface — two dials, two time zones, the pinnacle of reversible watchmaking.',
    description_de: 'Der Reverso Duoface — zwei Zifferblätter, zwei Zeitzonen, das Highlight reversibler Uhrmacherei.',
    intro_en: 'The Jaeger-LeCoultre Reverso Duoface features two dials on opposite sides of the reversible case, often displaying two time zones.',
    intro_de: 'Der Jaeger-LeCoultre Reverso Duoface verfügt über zwei Zifferblätter auf gegenüberliegenden Seiten des reversiblen Gehäuses und zeigt oft zwei Zeitzonen an.',
    isGuide: true,
  },
  'jaeger-lecoultre-master-chronograph': {
    h1_en: 'Jaeger-LeCoultre Master Chronograph', h1_de: 'Jaeger-LeCoultre Master Chronograph',
    title_en: 'Jaeger-LeCoultre Master Chronograph | Kariv Glamour', title_de: 'Jaeger-LeCoultre Master Chronograph | Kariv Glamour',
    description_en: 'Jaeger-LeCoultre Master Chronograph — classic round watches with chronograph function.',
    description_de: 'Jaeger-LeCoultre Master Chronograph — klassische Runduhren mit Chronographenfunktion.',
    intro_en: 'The Jaeger-LeCoultre Master Chronograph combines classic round case design with precise chronograph function and timeless elegance.',
    intro_de: 'Der Jaeger-LeCoultre Master Chronograph verbindet klassisches Rundgehäusedesign mit präziser Chronographenfunktion und zeitloser Eleganz.',
    isGuide: true,
  },
  'jaeger-lecoultre-story': {
    h1_en: 'Jaeger-LeCoultre Story', h1_de: 'Jaeger-LeCoultre Story',
    title_en: 'Jaeger-LeCoultre Story | Kariv Glamour', title_de: 'Jaeger-LeCoultre Story | Kariv Glamour',
    description_en: 'The Jaeger-LeCoultre Story — Swiss watchmaking, Reverso and high horology since 1833.',
    description_de: 'Die Jaeger-LeCoultre Story — Schweizer Uhrmacherei, Reverso und High Horology seit 1833.',
    intro_en: 'Jaeger-LeCoultre stands for refined Swiss watchmaking, the iconic Reverso case, ultra-thin dress watches, Polaris sport watches and high-horology complications since 1833.',
    intro_de: 'Jaeger-LeCoultre steht für raffinierte Schweizer Uhrmacherei, das ikonische Reverso-Gehäuse, ultra-thin Kleideruhren, Polaris Sportuhren und hoch-horologische Komplikationen seit 1833.',
    isGuide: true,
  },
};
