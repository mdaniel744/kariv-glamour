import { applyCzechSeoPages, applyCzechBrandContent } from './czechBrandData.js';
import { applyCzechBrandFaqs } from './czechBrandFaqs.js';

// Girard-Perregaux collections, filters, and SEO data
// Positioned as understated haute horlogerie, integrated-bracelet sport-chic design,
// dress watches, Art Deco cases, visible mechanics, and collector value.

const IMG_LAUREATO_BLUE = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/d226e4bce_GirardPerregauxLaureato-Edelstahl-ArmbandEdelstahl-38mm.webp';
const IMG_FIFTY_GOLD = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/b9e660ab8_LAUREATOFIFTY39mm81008-63-3412-1CMUhrGirard-Perregaux.png';
const GP_COLLECTION_ASSET_BASE = '/brand-assets/girard-perregaux/collections';

const GP_COLLECTION_IMAGES = {
  laureato: `${GP_COLLECTION_ASSET_BASE}/girard-perregaux-laureato-collection.png`,
  nineteenSixtySix: `${GP_COLLECTION_ASSET_BASE}/girard-perregaux-1966-collection.png`,
  bridges: `${GP_COLLECTION_ASSET_BASE}/girard-perregaux-bridges-collection.png`,
  catsEye: `${GP_COLLECTION_ASSET_BASE}/girard-perregaux-cats-eye-collection.png`,
};

export const GP_HERO_IMAGE = IMG_LAUREATO_BLUE;
export const GP_STORY_IMAGE = IMG_FIFTY_GOLD;

export const GP_COLLECTIONS = [
  { id: 1, name: 'Laureato', slug: 'laureato', image: GP_COLLECTION_IMAGES.laureato,
    shortDescription_en: "Girard-Perregaux's sport-chic luxury watch family, known for its octagonal bezel, integrated bracelet, balanced proportions and in-house Swiss precision.",
    shortDescription_de: "Girard-Perregaux' Sport-chic-Uhrenfamilie, bekannt für ihre achteckige Lünette, das integrierte Armband, die ausgewogenen Proportionen und die hausinterne Schweizer Präzision." },
  { id: 2, name: '1966', slug: '1966', image: GP_COLLECTION_IMAGES.nineteenSixtySix,
    shortDescription_en: "A refined dress-watch collection with clean round cases, mechanical elegance, moonphase, calendar and classic automatic models.",
    shortDescription_de: "Eine verfeinerte Dress-Watch-Kollektion mit runden Gehäusen, mechanischer Eleganz, Mondphase, Kalender und klassischen Automatik-Modellen." },
  { id: 3, name: 'Vintage 1945', slug: 'vintage-1945', image: '',
    shortDescription_en: "An Art Deco-inspired Girard-Perregaux collection with rectangular cases, curved geometry and strong interest among vintage and collector-watch buyers.",
    shortDescription_de: "Eine Art-Deco-inspirierte Girard-Perregaux-Kollektion mit rechteckigen Gehäusen, geschwungener Geometrie und starkem Interesse bei Vintage- und Sammleruhren-Käufern." },
  { id: 4, name: 'Bridges', slug: 'bridges', image: GP_COLLECTION_IMAGES.bridges,
    shortDescription_en: "A high-horology collection where Girard-Perregaux's signature bridge architecture makes the movement visible from the dial side.",
    shortDescription_de: "Eine Haute-Horlogerie-Kollektion, in der Girard-Perregaux' signature Brücken-Architektur das Uhrwerk von der Zifferblattseite sichtbar macht." },
  { id: 5, name: "Cat's Eye", slug: 'cats-eye', image: GP_COLLECTION_IMAGES.catsEye,
    shortDescription_en: "A feminine haute horlogerie collection with oval cases, gem-set details and refined complications.",
    shortDescription_de: "Eine feminine Haute-Horlogerie-Kollektion mit ovalen Gehäusen, Edelsteinbesatz und verfeinerten Komplikationen." },
  { id: 6, name: 'Legacy / Vintage Models', slug: 'legacy-vintage-models', image: '',
    shortDescription_en: "A collector-focused area for older Girard-Perregaux watches, discontinued models, rare references and special high-complication pieces.",
    shortDescription_de: "Ein sammlerorientierter Bereich für ältere Girard-Perregaux-Uhren, eingestellte Modelle, seltene Referenzen und besondere hochkomplizierte Stücke." },
];

export const GP_CASE_MATERIALS = ['Stainless Steel', 'Titanium', 'Rose Gold', 'Pink Gold', 'Yellow Gold', 'White Gold', 'Platinum', 'Ceramic', 'Carbon', 'Two-tone / Bicolor', 'Diamond-set'];
export const GP_MOVEMENTS = ['Automatic', 'Manual-winding', 'Manufacture Calibre', 'Tourbillon', 'Quartz'];
export const GP_DIAL_COLORS = ['Black', 'Blue', 'Silver', 'White', 'Grey', 'Green', 'Champagne', 'Brown', 'Mother of Pearl', 'Skeleton', 'Aventurine', 'Onyx', 'Clous de Paris'];
export const GP_FEATURES = ['Laureato', 'Laureato Chronograph', 'Laureato Absolute', 'Laureato Skeleton', 'Laureato 38 mm', 'Laureato 42 mm', '1966', '1966 Moonphase', '1966 Full Calendar', 'Vintage 1945', 'Bridges', 'Three Bridges', 'Free Bridge', 'Neo Bridges', "Cat's Eye", 'Jackpot', 'Tourbillon', 'Chronograph', 'Moonphase', 'Full calendar', 'Annual calendar', 'Skeleton / openworked', 'Integrated bracelet', 'Art Deco case', 'High complication', 'Limited edition', 'Discontinued / vintage', 'Full set'];
export const GP_WATCH_TYPES = ['Mechanical', 'Quartz'];
export const GP_BRACELETS = ['Integrated steel bracelet', 'Leather strap', 'Alligator strap', 'Rubber strap', 'Titanium bracelet', 'Gold bracelet'];
export const GP_CASE_SIZES = ['30 mm', '34 mm', '36 mm', '38 mm', '39 mm', '40 mm', '42 mm', '44 mm', '45 mm'];
export const GP_TYPES = ['New', 'Pre-Owned', 'Vintage'];
export const GP_BOX_PAPERS = ['Box included', 'Papers included', 'Full set'];
export const GP_AVAILABILITY = ['In Stock', 'Reserved', 'Coming Soon', 'Sold'];

export const GP_QUICK_FILTERS = [
  { label_en: 'Laureato', label_de: 'Laureato', link: '/girard-perregaux/laureato', filter: { collection: 'Laureato' } },
  { label_en: '1966', label_de: '1966', link: '/girard-perregaux/1966', filter: { collection: '1966' } },
  { label_en: 'Vintage 1945', label_de: 'Vintage 1945', link: '/girard-perregaux/vintage-1945', filter: { collection: 'Vintage 1945' } },
  { label_en: 'Bridges', label_de: 'Bridges', link: '/girard-perregaux/bridges', filter: { collection: 'Bridges' } },
  { label_en: 'Pre-Owned', label_de: 'Gebraucht', link: '/girard-perregaux-gebraucht', filter: { preOwned: true } },
  { label_en: 'Vintage Models', label_de: 'Alte Modelle', link: '/girard-perregaux-alte-modelle', filter: { vintage: true } },
];

export const GP_SEO_CARDS = [
  { title_en: 'Girard-Perregaux Watch', title_de: 'Girard-Perregaux Uhr', link: '/girard-perregaux-uhr',
    description_en: "Explore Girard-Perregaux watches at Kariv Glamour — Laureato, 1966, Vintage 1945, Bridges and Cat's Eye with Swiss haute horlogerie.",
    description_de: "Entdecken Sie Girard-Perregaux Uhren bei Kariv Glamour — Laureato, 1966, Vintage 1945, Bridges und Cat's Eye mit Schweizer Haute Horlogerie." },
  { title_en: 'Girard-Perregaux Laureato', title_de: 'Girard-Perregaux Laureato', link: '/girard-perregaux/laureato',
    description_en: 'Discover the Girard-Perregaux Laureato collection — octagonal bezel, integrated bracelet and in-house Swiss precision.',
    description_de: 'Entdecken Sie die Girard-Perregaux Laureato Kollektion — achteckige Lünette, integriertes Armband und hausinterne Schweizer Präzision.' },
  { title_en: 'Girard-Perregaux 1966', title_de: 'Girard-Perregaux 1966', link: '/girard-perregaux/1966',
    description_en: 'Discover the Girard-Perregaux 1966 collection — refined dress watches with mechanical elegance and moonphase.',
    description_de: 'Entdecken Sie die Girard-Perregaux 1966 Kollektion — verfeinerte Dress-Watches mit mechanischer Eleganz und Mondphase.' },
  { title_en: 'Girard-Perregaux Vintage 1945', title_de: 'Girard-Perregaux Vintage 1945', link: '/girard-perregaux/vintage-1945',
    description_en: 'Discover the Girard-Perregaux Vintage 1945 collection — Art Deco cases, curved geometry and vintage charm.',
    description_de: 'Entdecken Sie die Girard-Perregaux Vintage 1945 Kollektion — Art-Deco-Gehäuse, geschwungene Geometrie und Vintage-Charme.' },
  { title_en: 'Older Girard-Perregaux Models', title_de: 'Girard-Perregaux alte Modelle', link: '/girard-perregaux-alte-modelle',
    description_en: 'Discover older Girard-Perregaux watches, discontinued models and rare references for collectors.',
    description_de: 'Entdecken Sie ältere Girard-Perregaux-Uhren, eingestellte Modelle und seltene Referenzen für Sammler.' },
  { title_en: 'Girard-Perregaux Jackpot', title_de: 'Girard-Perregaux Jackpot', link: '/girard-perregaux-jackpot',
    description_en: 'The Girard-Perregaux Jackpot Tourbillon — a rare collector watch with slot-machine design and tourbillon complication.',
    description_de: 'Der Girard-Perregaux Jackpot Tourbillon — eine seltene Sammleruhr mit Slot-Machine-Design und Tourbillon-Komplikation.' },
];

export const GP_READ_MORE = [
  { title_en: 'Girard-Perregaux Story', title_de: 'Girard-Perregaux Story', link: '/girard-perregaux/story',
    description_en: "Explore Girard-Perregaux's heritage of Swiss haute horlogerie, visible mechanics and integrated-bracelet design.",
    description_de: "Entdecken Sie Girard-Perregaux' Heritage von Schweizer Haute Horlogerie, sichtbarer Mechanik und integriertem Armband-Design." },
  { title_en: 'Laureato Guide', title_de: 'Laureato Guide', link: '/girard-perregaux-laureato-guide',
    description_en: 'Understand the Girard-Perregaux Laureato family — octagonal bezel, integrated bracelet and sport-chic design.',
    description_de: 'Verstehen Sie die Girard-Perregaux Laureato Familie — achteckige Lünette, integriertes Armband und Sport-chic-Design.' },
  { title_en: '1966 Guide', title_de: '1966 Guide', link: '/girard-perregaux/1966',
    description_en: 'Discover the Girard-Perregaux 1966 collection — dress watches, moonphase and mechanical elegance.',
    description_de: 'Entdecken Sie die Girard-Perregaux 1966 Kollektion — Dress-Watches, Mondphase und mechanische Eleganz.' },
  { title_en: 'Vintage 1945 Guide', title_de: 'Vintage 1945 Guide', link: '/girard-perregaux/vintage-1945',
    description_en: 'Understand the Girard-Perregaux Vintage 1945 family — Art Deco cases and curved geometry.',
    description_de: 'Verstehen Sie die Girard-Perregaux Vintage 1945 Familie — Art-Deco-Gehäuse und geschwungene Geometrie.' },
  { title_en: 'Rare GP Watches Guide', title_de: 'Seltene GP Uhren Guide', link: '/girard-perregaux-jackpot',
    description_en: 'Discover rare Girard-Perregaux watches — Jackpot Tourbillon, Bridges and high-complication collector pieces.',
    description_de: 'Entdecken Sie seltene Girard-Perregaux-Uhren — Jackpot Tourbillon, Bridges und hochkomplizierte Sammlerstücke.' },
  { title_en: 'Buying Pre-Owned Girard-Perregaux', title_de: 'Gebrauchte Girard-Perregaux kaufen', link: '/girard-perregaux-gebraucht',
    description_en: 'What to check before buying a used Girard-Perregaux — condition, box and papers, reference number, and authentication.',
    description_de: 'Was Sie vor dem Kauf einer gebrauchten Girard-Perregaux prüfen sollten — Zustand, Box und Papiere, Referenznummer und Authentifizierung.' },
];

export const GP_INTERNAL_LINKS = [
  {
    title_en: 'Popular Girard-Perregaux Searches', title_de: 'Beliebte Girard-Perregaux Suchen',
    links: [
      { label_en: 'Girard-Perregaux Watch', label_de: 'Girard-Perregaux Uhr', to: '/girard-perregaux-uhr' },
      { label_en: 'Girard-Perregaux Laureato', label_de: 'Girard-Perregaux Laureato', to: '/girard-perregaux/laureato' },
      { label_en: 'Girard-Perregaux 1966', label_de: 'Girard-Perregaux 1966', to: '/girard-perregaux/1966' },
      { label_en: 'Girard-Perregaux Vintage 1945', label_de: 'Girard-Perregaux Vintage 1945', to: '/girard-perregaux/vintage-1945' },
      { label_en: 'Girard-Perregaux Bridges', label_de: 'Girard-Perregaux Bridges', to: '/girard-perregaux/bridges' },
      { label_en: 'Girard-Perregaux Jackpot', label_de: 'Girard-Perregaux Jackpot', to: '/girard-perregaux-jackpot' },
    ],
  },
  {
    title_en: 'Girard-Perregaux Collections', title_de: 'Girard-Perregaux Kollektionen',
    links: [
      { label_en: 'Laureato', label_de: 'Laureato', to: '/girard-perregaux/laureato' },
      { label_en: '1966', label_de: '1966', to: '/girard-perregaux/1966' },
      { label_en: 'Vintage 1945', label_de: 'Vintage 1945', to: '/girard-perregaux/vintage-1945' },
      { label_en: 'Bridges', label_de: 'Bridges', to: '/girard-perregaux/bridges' },
      { label_en: "Cat's Eye", label_de: "Cat's Eye", to: '/girard-perregaux/cats-eye' },
    ],
  },
  {
    title_en: 'Collector & Vintage', title_de: 'Sammler & Vintage',
    links: [
      { label_en: 'Older Girard-Perregaux Models', label_de: 'Girard-Perregaux alte Modelle', to: '/girard-perregaux-alte-modelle' },
      { label_en: 'Vintage Girard-Perregaux Watches', label_de: 'Vintage Girard-Perregaux Uhren', to: '/vintage-girard-perregaux-uhren' },
      { label_en: 'Girard-Perregaux Jackpot', label_de: 'Girard-Perregaux Jackpot', to: '/girard-perregaux-jackpot' },
      { label_en: 'Pre-Owned Girard-Perregaux Watches', label_de: 'Gebrauchte Girard-Perregaux Uhren', to: '/gebrauchte-girard-perregaux-uhren' },
    ],
  },
  {
    title_en: 'Buy & Pre-Owned', title_de: 'Kaufen & Gebraucht',
    links: [
      { label_en: 'Buy Girard-Perregaux', label_de: 'Girard-Perregaux kaufen', to: '/girard-perregaux-kaufen' },
      { label_en: 'Buy Girard-Perregaux Watch', label_de: 'Girard-Perregaux Uhr kaufen', to: '/girard-perregaux-uhr-kaufen' },
      { label_en: 'Pre-Owned Girard-Perregaux', label_de: 'Girard-Perregaux gebraucht', to: '/girard-perregaux-gebraucht' },
      { label_en: 'Buy Pre-Owned Girard-Perregaux', label_de: 'Girard-Perregaux gebraucht kaufen', to: '/girard-perregaux-gebraucht-kaufen' },
      { label_en: 'Buy Girard-Perregaux Laureato', label_de: 'Girard-Perregaux Laureato kaufen', to: '/girard-perregaux-laureato-kaufen' },
    ],
  },
  {
    title_en: 'Guides & Resources', title_de: 'Ratgeber & Guides',
    links: [
      { label_en: 'Which Girard-Perregaux to Buy?', label_de: 'Welche Girard-Perregaux kaufen?', to: '/welche-girard-perregaux-uhr-kaufen' },
      { label_en: 'Laureato Guide', label_de: 'Laureato Guide', to: '/girard-perregaux-laureato-guide' },
      { label_en: 'Girard-Perregaux Watch Price', label_de: 'Girard-Perregaux Uhr Preis', to: '/girard-perregaux-uhr-preis' },
      { label_en: 'Girard-Perregaux Story', label_de: 'Girard-Perregaux Story', to: '/girard-perregaux/story' },
    ],
  },
  {
    title_en: 'Related Luxury Watch Brands', title_de: 'Verwandte Luxusuhren-Marken',
    links: [
      { label_en: 'Audemars Piguet watches', label_de: 'Audemars Piguet Uhren', to: '/brands/audemars-piguet' },
      { label_en: 'Patek Philippe watches', label_de: 'Patek Philippe Uhren', to: '/brands/patek-philippe' },
      { label_en: 'Jaeger-LeCoultre watches', label_de: 'Jaeger-LeCoultre Uhren', to: '/brands/jaeger-lecoultre' },
      { label_en: 'IWC watches', label_de: 'IWC Uhren', to: '/brands/iwc-schaffhausen' },
      { label_en: 'Rolex watches', label_de: 'Rolex Uhren', to: '/brands/rolex' },
      { label_en: 'Cartier watches', label_de: 'Cartier Uhren', to: '/brands/cartier' },
    ],
  },
];

export const GP_FAQS = [
  {
    q_en: 'Where can I buy a Girard-Perregaux watch online?', q_de: 'Wo kann ich eine Girard-Perregaux Uhr online kaufen?',
    a_en: "You can buy Girard-Perregaux watches online at Kariv Glamour. Browse new and <a href='/girard-perregaux-gebraucht'>pre-owned Girard-Perregaux watches</a> with transparent product details, reference numbers, and condition grading.",
    a_de: "Sie können Girard-Perregaux Uhren online bei Kariv Glamour kaufen. Stöbern Sie durch neue und <a href='/girard-perregaux-gebraucht'>gebrauchte Girard-Perregaux Uhren</a> mit transparenten Produktdetails, Referenznummern und Zustandsbewertung." },
  {
    q_en: 'What is the most popular Girard-Perregaux watch?', q_de: 'Was ist die beliebteste Girard-Perregaux Uhr?',
    a_en: "The most popular Girard-Perregaux watch is the <a href='/girard-perregaux/laureato'>Laureato</a> — a sport-chic watch with octagonal bezel, integrated bracelet and in-house Swiss precision.",
    a_de: "Die beliebteste Girard-Perregaux Uhr ist die <a href='/girard-perregaux/laureato'>Laureato</a> — eine Sport-chic-Uhr mit achteckiger Lünette, integriertem Armband und hausinterner Schweizer Präzision." },
  {
    q_en: 'What is the Girard-Perregaux Laureato?', q_de: 'Was ist die Girard-Perregaux Laureato?',
    a_en: "The <a href='/girard-perregaux/laureato'>Girard-Perregaux Laureato</a> is the brand's sport-chic collection with octagonal bezel, integrated bracelet and Clous de Paris dial. Read our <a href='/girard-perregaux-laureato-guide'>Laureato Guide</a>.",
    a_de: "Die <a href='/girard-perregaux/laureato'>Girard-Perregaux Laureato</a> ist die Sport-chic-Kollektion der Marke mit achteckiger Lünette, integriertem Armband und Clous-de-Paris-Zifferblatt. Lesen Sie unseren <a href='/girard-perregaux-laureato-guide'>Laureato Guide</a>." },
  {
    q_en: 'What is the difference between Laureato and 1966?', q_de: 'Was ist der Unterschied zwischen Laureato und 1966?',
    a_en: "The <a href='/girard-perregaux/laureato'>Laureato</a> is a sport-chic watch with octagonal bezel and integrated bracelet, while the <a href='/girard-perregaux/1966'>1966</a> is a classic dress-watch collection with round cases and mechanical elegance.",
    a_de: "Die <a href='/girard-perregaux/laureato'>Laureato</a> ist eine Sport-chic-Uhr mit achteckiger Lünette und integriertem Armband, während die <a href='/girard-perregaux/1966'>1966</a> eine klassische Dress-Watch-Kollektion mit runden Gehäusen und mechanischer Eleganz ist." },
  {
    q_en: 'What is Girard-Perregaux Vintage 1945?', q_de: 'Was ist Girard-Perregaux Vintage 1945?',
    a_en: "The <a href='/girard-perregaux/vintage-1945'>Girard-Perregaux Vintage 1945</a> is an Art Deco-inspired collection with rectangular cases, curved geometry and strong interest among vintage and collector-watch buyers.",
    a_de: "Die <a href='/girard-perregaux/vintage-1945'>Girard-Perregaux Vintage 1945</a> ist eine Art-Deco-inspirierte Kollektion mit rechteckigen Gehäusen, geschwungener Geometrie und starkem Interesse bei Vintage- und Sammleruhren-Käufern." },
  {
    q_en: 'What is the Girard-Perregaux Jackpot?', q_de: 'Was ist der Girard-Perregaux Jackpot?',
    a_en: "The <a href='/girard-perregaux-jackpot'>Girard-Perregaux Jackpot</a> is a rare collector watch with slot-machine design and tourbillon complication, linked to the Vintage 1945 Jackpot Tourbillon in rose gold.",
    a_de: "Der <a href='/girard-perregaux-jackpot'>Girard-Perregaux Jackpot</a> ist eine seltene Sammleruhr mit Slot-Machine-Design und Tourbillon-Komplikation, verknüpft mit dem Vintage 1945 Jackpot Tourbillon aus Roségold." },
  {
    q_en: 'Is it safe to buy a pre-owned Girard-Perregaux watch?', q_de: 'Ist es sicher, eine gebrauchte Girard-Perregaux Uhr zu kaufen?',
    a_en: "Yes, buying a <a href='/girard-perregaux-gebraucht'>pre-owned Girard-Perregaux</a> at Kariv Glamour is safe. Each watch is presented with transparent condition grading, reference number visibility, and authentication status.",
    a_de: "Ja, bei Kariv Glamour ist der Kauf einer <a href='/girard-perregaux-gebraucht'>gebrauchten Girard-Perregaux</a> sicher. Jede Uhr wird mit transparenter Zustandsbewertung, Referenznummer-Sichtbarkeit und Authentifizierungsstatus präsentiert." },
  {
    q_en: 'What should I check before buying an older Girard-Perregaux watch?', q_de: 'Was sollte ich vor dem Kauf einer älteren Girard-Perregaux prüfen?',
    a_en: "Check the condition of the case and bracelet, verify the movement, confirm box and papers, and review the reference number. Visit our <a href='/girard-perregaux-alte-modelle'>older Girard-Perregaux models</a> page.",
    a_de: "Prüfen Sie den Zustand von Gehäuse und Armband, verifizieren Sie das Uhrwerk, bestätigen Sie Box und Papiere, und überprüfen Sie die Referenznummer. Besuchen Sie unsere Seite für <a href='/girard-perregaux-alte-modelle'>alte Girard-Perregaux Modelle</a>." },
];

export const GP_SEO_PAGES = {
  'girard-perregaux-uhr': {
    h1_en: 'Girard-Perregaux Watch', h1_de: 'Girard-Perregaux Uhr',
    title_en: 'Girard-Perregaux Watch | Kariv Glamour', title_de: 'Girard-Perregaux Uhr | Kariv Glamour',
    description_en: "Discover Girard-Perregaux watches at Kariv Glamour — Laureato, 1966, Vintage 1945, Bridges and Cat's Eye with Swiss haute horlogerie.",
    description_de: "Entdecken Sie Girard-Perregaux Uhren bei Kariv Glamour — Laureato, 1966, Vintage 1945, Bridges und Cat's Eye mit Schweizer Haute Horlogerie.",
    intro_en: "Explore Girard-Perregaux watches at Kariv Glamour — with Swiss haute horlogerie, the sport-chic Laureato, refined 1966 dress watches, Art Deco-inspired Vintage 1945 models, visible Bridges architecture and rare collector references.",
    intro_de: 'Erkunden Sie Girard-Perregaux Uhren bei Kariv Glamour — mit Schweizer Haute Horlogerie, der Sport-chic Laureato, verfeinerten 1966 Dress-Watches, Art-Deco-inspirierten Vintage 1945 Modellen, sichtbarer Bridges-Architektur und seltenen Sammlerreferenzen.',
    filter: {},
  },
  'girard-perregaux-uhren': {
    h1_en: 'Girard-Perregaux Watches', h1_de: 'Girard-Perregaux Uhren',
    title_en: 'Girard-Perregaux Watches | Kariv Glamour', title_de: 'Girard-Perregaux Uhren | Kariv Glamour',
    description_en: 'Girard-Perregaux watches at Kariv Glamour — Laureato, 1966, Vintage 1945 and Bridges collections.',
    description_de: 'Girard-Perregaux Uhren bei Kariv Glamour — Laureato, 1966, Vintage 1945 und Bridges Kollektionen.',
    intro_en: 'Browse Girard-Perregaux watches by collection, model, movement, case size, condition, and price.',
    intro_de: 'Stöbern Sie durch Girard-Perregaux Uhren nach Kollektion, Modell, Uhrwerk, Gehäusegröße, Zustand und Preis.',
    filter: {},
  },
  'girard-perregaux-kaufen': {
    h1_en: 'Buy Girard-Perregaux', h1_de: 'Girard-Perregaux kaufen',
    title_en: 'Buy Girard-Perregaux | Kariv Glamour', title_de: 'Girard-Perregaux kaufen | Kariv Glamour',
    description_en: 'Buy Girard-Perregaux at Kariv Glamour — Laureato, 1966, Vintage 1945 and more.',
    description_de: 'Girard-Perregaux kaufen bei Kariv Glamour — Laureato, 1966, Vintage 1945 und mehr.',
    intro_en: 'Buy Girard-Perregaux at Kariv Glamour: discover watches from all collections with transparent condition grading.',
    intro_de: 'Girard-Perregaux kaufen bei Kariv Glamour: entdecken Sie Uhren aus allen Kollektionen mit transparenter Zustandsbewertung.',
    filter: {},
  },
  'girard-perregaux-uhr-kaufen': {
    h1_en: 'Buy Girard-Perregaux Watch', h1_de: 'Girard-Perregaux Uhr kaufen',
    title_en: 'Buy Girard-Perregaux Watch | Kariv Glamour', title_de: 'Girard-Perregaux Uhr kaufen | Kariv Glamour',
    description_en: 'Buy Girard-Perregaux watch at Kariv Glamour — new and pre-owned models with transparent product information.',
    description_de: 'Girard-Perregaux Uhr kaufen bei Kariv Glamour — neue und gebrauchte Modelle mit transparenter Produktinformation.',
    intro_en: 'Buy Girard-Perregaux watch at Kariv Glamour: new and pre-owned models with transparent product information and condition grading.',
    intro_de: 'Girard-Perregaux Uhr kaufen bei Kariv Glamour: neue und gebrauchte Modelle mit transparenter Produktinformation und Zustandsbewertung.',
    filter: {},
  },
  'girard-perregaux-gebraucht': {
    h1_en: 'Pre-Owned Girard-Perregaux', h1_de: 'Girard-Perregaux gebraucht',
    title_en: 'Pre-Owned Girard-Perregaux | Kariv Glamour', title_de: 'Girard-Perregaux gebraucht | Kariv Glamour',
    description_en: 'Pre-owned Girard-Perregaux watches at Kariv Glamour with transparent condition grading.',
    description_de: 'Gebrauchte Girard-Perregaux Uhren bei Kariv Glamour mit transparenter Zustandsbewertung.',
    intro_en: 'Discover pre-owned Girard-Perregaux watches with clear condition grading, box and papers, and detailed product data.',
    intro_de: 'Entdecken Sie gebrauchte Girard-Perregaux Uhren mit klarer Zustandsbewertung, Box und Papers und detaillierten Produktdaten.',
    filter: {},
  },
  'girard-perregaux-gebraucht-kaufen': {
    h1_en: 'Buy Pre-Owned Girard-Perregaux', h1_de: 'Girard-Perregaux gebraucht kaufen',
    title_en: 'Buy Pre-Owned Girard-Perregaux | Kariv Glamour', title_de: 'Girard-Perregaux gebraucht kaufen | Kariv Glamour',
    description_en: 'Buy pre-owned Girard-Perregaux at Kariv Glamour — inspected pre-owned watches with condition reports.',
    description_de: 'Girard-Perregaux gebraucht kaufen bei Kariv Glamour — geprüfte Gebrauchtuhren mit Zustandsbericht.',
    intro_en: 'Buy pre-owned Girard-Perregaux at Kariv Glamour: inspected watches with transparent condition reports and authentication.',
    intro_de: 'Girard-Perregaux gebraucht kaufen bei Kariv Glamour: geprüfte Uhren mit transparentem Zustandsbericht und Authentifizierung.',
    filter: {},
  },
  'gebrauchte-girard-perregaux-uhren': {
    h1_en: 'Pre-Owned Girard-Perregaux Watches', h1_de: 'Gebrauchte Girard-Perregaux Uhren',
    title_en: 'Pre-Owned Girard-Perregaux Watches | Kariv Glamour', title_de: 'Gebrauchte Girard-Perregaux Uhren | Kariv Glamour',
    description_en: 'Pre-owned Girard-Perregaux watches at Kariv Glamour — Laureato, 1966 and Vintage 1945 with condition grading.',
    description_de: 'Gebrauchte Girard-Perregaux Uhren bei Kariv Glamour — Laureato, 1966 und Vintage 1945 mit Zustandsbewertung.',
    intro_en: 'Browse pre-owned Girard-Perregaux watches — from Laureato to 1966 to Vintage 1945.',
    intro_de: 'Stöbern Sie durch gebrauchte Girard-Perregaux Uhren — von der Laureato über die 1966 bis zur Vintage 1945.',
    filter: {},
  },
  'girard-perregaux-laureato-kaufen': {
    h1_en: 'Buy Girard-Perregaux Laureato', h1_de: 'Girard-Perregaux Laureato kaufen',
    title_en: 'Buy Girard-Perregaux Laureato | Kariv Glamour', title_de: 'Girard-Perregaux Laureato kaufen | Kariv Glamour',
    description_en: 'Buy Girard-Perregaux Laureato at Kariv Glamour — octagonal bezel and integrated bracelet.',
    description_de: 'Girard-Perregaux Laureato kaufen bei Kariv Glamour — achteckige Lünette und integriertes Armband.',
    intro_en: 'Buy Girard-Perregaux Laureato at Kariv Glamour — sport-chic design with octagonal bezel, integrated bracelet and in-house Swiss precision.',
    intro_de: 'Girard-Perregaux Laureato kaufen bei Kariv Glamour — Sport-chic-Design mit achteckiger Lünette, integriertem Armband und hausinterner Schweizer Präzision.',
    filter: { collection: 'Laureato' },
  },
  'girard-perregaux-bridges': {
    h1_en: 'Girard-Perregaux Bridges', h1_de: 'Girard-Perregaux Bridges',
    title_en: 'Girard-Perregaux Bridges | Kariv Glamour', title_de: 'Girard-Perregaux Bridges | Kariv Glamour',
    description_en: 'Girard-Perregaux Bridges — haute horlogerie with visible bridge architecture.',
    description_de: 'Girard-Perregaux Bridges — Haute Horlogerie mit sichtbarer Brücken-Architektur.',
    intro_en: 'Discover the Girard-Perregaux Bridges collection — haute horlogerie where the signature bridge architecture makes the movement visible from the dial side.',
    intro_de: 'Entdecken Sie die Girard-Perregaux Bridges Kollektion — Haute Horlogerie, in der die signature Brücken-Architektur das Uhrwerk von der Zifferblattseite sichtbar macht.',
    filter: { collection: 'Bridges' },
  },
  'girard-perregaux-alte-modelle': {
    h1_en: 'Older Girard-Perregaux Models', h1_de: 'Girard-Perregaux alte Modelle',
    title_en: 'Older Girard-Perregaux Models | Kariv Glamour', title_de: 'Girard-Perregaux alte Modelle | Kariv Glamour',
    description_en: 'Older Girard-Perregaux watches, discontinued models and rare references for collectors.',
    description_de: 'Ältere Girard-Perregaux-Uhren, eingestellte Modelle und seltene Referenzen für Sammler.',
    intro_en: 'Discover older Girard-Perregaux watches, discontinued models and rare references — from Vintage 1945 to older Laureato references to high-complication collector pieces.',
    intro_de: 'Entdecken Sie ältere Girard-Perregaux-Uhren, eingestellte Modelle und seltene Referenzen — von der Vintage 1945 über ältere Laureato-Referenzen bis zu hochkomplizierten Sammlerstücken.',
    isGuide: true,
    guideContent_en: [
      "The <a href='/girard-perregaux/vintage-1945'>Vintage 1945</a> collection is an important anchor for older Girard-Perregaux watches with Art Deco cases and curved geometry. Older <a href='/girard-perregaux/laureato'>Laureato</a> references are also very popular among collectors.",
      "Other interesting areas include the <a href='/girard-perregaux/1966'>1966</a> older models, the <a href='/girard-perregaux/bridges'>Bridges</a> collection and the rare <a href='/girard-perregaux-jackpot'>Jackpot Tourbillon</a>.",
      "At Kariv Glamour, you'll find <a href='/girard-perregaux-gebraucht'>pre-owned Girard-Perregaux watches</a> with transparent condition grading, box and papers, and reference number visibility.",
    ],
    guideContent_de: [
      "Die <a href='/girard-perregaux/vintage-1945'>Vintage 1945</a> Kollektion ist ein wichtiger Anker für ältere Girard-Perregaux-Uhren mit Art-Deco-Gehäusen und geschwungener Geometrie. Ältere <a href='/girard-perregaux/laureato'>Laureato</a> Referenzen sind bei Sammlern ebenfalls sehr beliebt.",
      "Weitere interessante Bereiche sind die <a href='/girard-perregaux/1966'>1966</a> ältere Modelle, die <a href='/girard-perregaux/bridges'>Bridges</a> Kollektion und der seltene <a href='/girard-perregaux-jackpot'>Jackpot Tourbillon</a>.",
      "Bei Kariv Glamour finden Sie <a href='/girard-perregaux-gebraucht'>gebrauchte Girard-Perregaux Uhren</a> mit transparenter Zustandsbewertung, Box und Papers und Referenznummer-Sichtbarkeit.",
    ],
  },
  'vintage-girard-perregaux-uhren': {
    h1_en: 'Vintage Girard-Perregaux Watches', h1_de: 'Vintage Girard-Perregaux Uhren',
    title_en: 'Vintage Girard-Perregaux Watches | Kariv Glamour', title_de: 'Vintage Girard-Perregaux Uhren | Kariv Glamour',
    description_en: 'Vintage Girard-Perregaux watches at Kariv Glamour — classic models for collectors.',
    description_de: 'Vintage Girard-Perregaux Uhren bei Kariv Glamour — klassische Modelle für Sammler.',
    intro_en: 'Discover vintage Girard-Perregaux watches — from Vintage 1945 to older Laureato references to discontinued models and collector pieces.',
    intro_de: 'Entdecken Sie Vintage Girard-Perregaux Uhren — von der Vintage 1945 über ältere Laureato-Referenzen bis zu eingestellten Modellen und Sammlerstücken.',
    isGuide: true,
    guideContent_en: [
      "Vintage Girard-Perregaux watches include the <a href='/girard-perregaux/vintage-1945'>Vintage 1945</a> collection, older <a href='/girard-perregaux/laureato'>Laureato</a> references and discontinued models from various eras.",
      "The rare <a href='/girard-perregaux-jackpot'>Jackpot Tourbillon</a> is one of the brand's most notable collector pieces.",
      "At Kariv Glamour, you'll find <a href='/girard-perregaux-gebraucht'>pre-owned Girard-Perregaux watches</a> with transparent condition grading.",
    ],
    guideContent_de: [
      "Vintage Girard-Perregaux Uhren umfassen die <a href='/girard-perregaux/vintage-1945'>Vintage 1945</a> Kollektion, ältere <a href='/girard-perregaux/laureato'>Laureato</a> Referenzen und eingestellte Modelle aus verschiedenen Epochen.",
      "Der seltene <a href='/girard-perregaux-jackpot'>Jackpot Tourbillon</a> ist eines der bemerkenswertesten Sammlerstücke der Marke.",
      "Bei Kariv Glamour finden Sie <a href='/girard-perregaux-gebraucht'>gebrauchte Girard-Perregaux Uhren</a> mit transparenter Zustandsbewertung.",
    ],
  },
  'girard-perregaux-jackpot': {
    h1_en: 'Girard-Perregaux Jackpot', h1_de: 'Girard-Perregaux Jackpot',
    title_en: 'Girard-Perregaux Jackpot | Kariv Glamour', title_de: 'Girard-Perregaux Jackpot | Kariv Glamour',
    description_en: 'The Girard-Perregaux Jackpot Tourbillon — a rare collector watch with slot-machine design and tourbillon complication.',
    description_de: 'Der Girard-Perregaux Jackpot Tourbillon — eine seltene Sammleruhr mit Slot-Machine-Design und Tourbillon-Komplikation.',
    intro_en: 'The Girard-Perregaux Jackpot is a rare high-complication collector watch linked to the Vintage 1945 Jackpot Tourbillon — a rose-gold slot-machine tourbillon from a numbered edition launched in 2007.',
    intro_de: 'Der Girard-Perregaux Jackpot ist eine seltene hochkomplizierte Sammleruhr, die mit dem Vintage 1945 Jackpot Tourbillon verknüpft ist — ein Roségold-Slot-Machine-Tourbillon aus einer nummerierten Edition von 2007.',
    isGuide: true,
    guideContent_en: [
      "The <a href='/girard-perregaux-jackpot'>Girard-Perregaux Jackpot</a> is not a regular collection but a rare high-complication collector watch. It is linked to the Vintage 1945 Jackpot Tourbillon — a rose-gold slot-machine tourbillon from a numbered edition launched in 2007.",
      "The Jackpot is highly sought after by collectors of Girard-Perregaux watches and represents the highest level of mechanical complication from the brand.",
      "At Kariv Glamour, you'll find a curated selection of rare Girard-Perregaux watches. Also visit our <a href='/girard-perregaux-alte-modelle'>older models</a> page for more collector pieces.",
    ],
    guideContent_de: [
      "Der <a href='/girard-perregaux-jackpot'>Girard-Perregaux Jackpot</a> ist keine normale Kollektion, sondern eine seltene hochkomplizierte Sammleruhr. Er ist verknüpft mit dem Vintage 1945 Jackpot Tourbillon — ein Roségold-Slot-Machine-Tourbillon aus einer nummerierten Edition von 2007.",
      "Der Jackpot ist bei Sammlern von Girard-Perregaux-Uhren sehr begehrt und repräsentiert die höchste Stufe der mechanischen Komplikation der Marke.",
      "Bei Kariv Glamour finden Sie eine kuratierte Auswahl an seltenen Girard-Perregaux-Uhren. Besuchen Sie auch unsere <a href='/girard-perregaux-alte-modelle'>alte Modelle</a> Seite für weitere Sammlerstücke.",
    ],
  },
  'welche-girard-perregaux-uhr-kaufen': {
    h1_en: 'Which Girard-Perregaux to Buy?', h1_de: 'Welche Girard-Perregaux Uhr kaufen?',
    title_en: 'Which Girard-Perregaux to Buy | Kariv Glamour', title_de: 'Welche Girard-Perregaux Uhr kaufen | Kariv Glamour',
    description_en: 'Girard-Perregaux buying guide — compare Laureato, 1966, Vintage 1945 and Bridges.',
    description_de: 'Girard-Perregaux Kaufberatung — vergleichen Sie Laureato, 1966, Vintage 1945 und Bridges.',
    intro_en: 'Which Girard-Perregaux watch is right for you? Compare collections, movements, case sizes, and complications to make the right decision.',
    intro_de: 'Welche Girard-Perregaux Uhr passt zu Ihnen? Vergleichen Sie Kollektionen, Uhrwerke, Gehäusegrößen und Komplikationen, um die richtige Entscheidung zu treffen.',
    isGuide: true,
    guideContent_en: [
      "Girard-Perregaux has several strong collections: the <a href='/girard-perregaux/laureato'>Laureato</a> (sport-chic with octagonal bezel), the <a href='/girard-perregaux/1966'>1966</a> (classic dress watches), the <a href='/girard-perregaux/vintage-1945'>Vintage 1945</a> (Art Deco cases), the <a href='/girard-perregaux/bridges'>Bridges</a> (visible mechanics) and the <a href='/girard-perregaux/cats-eye'>Cat's Eye</a> (feminine haute horlogerie).",
      "For the sporty-elegant experience, the <a href='/girard-perregaux/laureato'>Laureato</a> is the best choice. For classic dress watches, the <a href='/girard-perregaux/1966'>1966</a> is ideal. For Art Deco charm, the <a href='/girard-perregaux/vintage-1945'>Vintage 1945</a> is recommended. For visible mechanics, the <a href='/girard-perregaux/bridges'>Bridges</a> are perfect.",
      "For collectors, there's the rare <a href='/girard-perregaux-jackpot'>Jackpot Tourbillon</a> and <a href='/girard-perregaux-alte-modelle'>older Girard-Perregaux models</a>. At Kariv Glamour, each watch is presented with transparent product details and condition grading.",
    ],
    guideContent_de: [
      "Girard-Perregaux hat mehrere starke Kollektionen: die <a href='/girard-perregaux/laureato'>Laureato</a> (Sport-chic mit achteckiger Lünette), die <a href='/girard-perregaux/1966'>1966</a> (klassische Dress-Watches), die <a href='/girard-perregaux/vintage-1945'>Vintage 1945</a> (Art-Deco-Gehäuse), die <a href='/girard-perregaux/bridges'>Bridges</a> (sichtbare Mechanik) und die <a href='/girard-perregaux/cats-eye'>Cat's Eye</a> (feminine Haute Horlogerie).",
      "Für das sportlich-elegante Erlebnis ist die <a href='/girard-perregaux/laureato'>Laureato</a> die beste Wahl. Für klassische Dress-Watches ist die <a href='/girard-perregaux/1966'>1966</a> ideal. Für Art-Deco-Charme empfiehlt sich die <a href='/girard-perregaux/vintage-1945'>Vintage 1945</a>. Für sichtbare Mechanik sind die <a href='/girard-perregaux/bridges'>Bridges</a> perfekt.",
      "Für Sammler gibt es den seltenen <a href='/girard-perregaux-jackpot'>Jackpot Tourbillon</a> und <a href='/girard-perregaux-alte-modelle'>alte Girard-Perregaux Modelle</a>. Bei Kariv Glamour wird jede Uhr mit transparenten Produktdetails und Zustandsbewertung präsentiert.",
    ],
  },
  'girard-perregaux-laureato-guide': {
    h1_en: 'Girard-Perregaux Laureato Guide', h1_de: 'Girard-Perregaux Laureato Guide',
    title_en: 'Girard-Perregaux Laureato Guide | Kariv Glamour', title_de: 'Girard-Perregaux Laureato Guide | Kariv Glamour',
    description_en: 'Understand the Girard-Perregaux Laureato family — octagonal bezel, integrated bracelet and sport-chic design.',
    description_de: 'Verstehen Sie die Girard-Perregaux Laureato Familie — achteckige Lünette, integriertes Armband und Sport-chic-Design.',
    intro_en: 'The Girard-Perregaux Laureato Guide: Understand the octagonal bezel, the integrated bracelet, the Clous de Paris dial and the in-house Swiss precision of the Laureato family.',
    intro_de: 'Die Girard-Perregaux Laureato Guide: Verstehen Sie die achteckige Lünette, das integrierte Armband, das Clous-de-Paris-Zifferblatt und die hausinterne Schweizer Präzision der Laureato Familie.',
    isGuide: true,
    guideContent_en: [
      "The <a href='/girard-perregaux/laureato'>Girard-Perregaux Laureato</a> is the brand's sport-chic collection with octagonal bezel, integrated bracelet and Clous de Paris dial. It is the brand's strongest shopping anchor collection.",
      "The Laureato is available in several variants: Automatic, Chronograph, Absolute (sportier), Skeleton and in various case sizes (38mm, 42mm, 44mm).",
      "At Kariv Glamour, you'll find a curated selection of Laureato watches — from new models to <a href='/girard-perregaux-gebraucht'>pre-owned Girard-Perregaux watches</a>.",
    ],
    guideContent_de: [
      "Die <a href='/girard-perregaux/laureato'>Girard-Perregaux Laureato</a> ist die Sport-chic-Kollektion der Marke mit achteckiger Lünette, integriertem Armband und Clous-de-Paris-Zifferblatt. Sie ist die stärkste Einkaufsanker-Kollektion der Marke.",
      "Die Laureato ist in mehreren Varianten erhältlich: Automatik, Chronograph, Absolute (sportlicher), Skeleton und in verschiedenen Gehäusegrößen (38mm, 42mm, 44mm).",
      "Bei Kariv Glamour finden Sie eine kuratierte Auswahl an Laureato Uhren — von neuen Modellen bis zu <a href='/girard-perregaux-gebraucht'>gebrauchten Girard-Perregaux Uhren</a>.",
    ],
  },
  'girard-perregaux-uhr-preis': {
    h1_en: 'Girard-Perregaux Watch Price', h1_de: 'Girard-Perregaux Uhr Preis',
    title_en: 'Girard-Perregaux Watch Price | Kariv Glamour', title_de: 'Girard-Perregaux Uhr Preis | Kariv Glamour',
    description_en: 'Girard-Perregaux prices at Kariv Glamour — from Laureato to 1966 to Vintage 1945.',
    description_de: 'Girard-Perregaux Preise bei Kariv Glamour — von der Laureato über 1966 bis Vintage 1945.',
    intro_en: 'Girard-Perregaux watches offer Swiss haute horlogerie and visible mechanics. Prices vary by collection, material and condition.',
    intro_de: 'Girard-Perregaux Uhren bieten Schweizer Haute Horlogerie und sichtbare Mechanik. Die Preise variieren je nach Kollektion, Material und Zustand.',
    isGuide: true,
    guideContent_en: [
      "Girard-Perregaux watches offer Swiss haute horlogerie and visible mechanics. The <a href='/girard-perregaux/laureato'>Laureato</a> is the most sought-after collection, while the <a href='/girard-perregaux/1966'>1966</a> and <a href='/girard-perregaux/vintage-1945'>Vintage 1945</a> are very popular among collectors.",
      "The price of a Girard-Perregaux watch depends on collection, material (stainless steel, titanium, rose gold, platinum), complication (tourbillon, chronograph, moonphase), case size and condition. <a href='/girard-perregaux-gebraucht'>Pre-owned Girard-Perregaux watches</a> often offer better value.",
      "At Kariv Glamour, you'll find transparent prices for all Girard-Perregaux models with detailed product information and condition grading.",
    ],
    guideContent_de: [
      "Girard-Perregaux Uhren bieten Schweizer Haute Horlogerie und sichtbare Mechanik. Die <a href='/girard-perregaux/laureato'>Laureato</a> ist die meistgesuchte Kollektion, während die <a href='/girard-perregaux/1966'>1966</a> und <a href='/girard-perregaux/vintage-1945'>Vintage 1945</a> bei Sammlern sehr beliebt sind.",
      "Der Preis einer Girard-Perregaux Uhr hängt von Kollektion, Material (Edelstahl, Titan, Roségold, Platin), Komplikation (Tourbillon, Chronograph, Mondphase), Gehäusegröße und Zustand ab. <a href='/girard-perregaux-gebraucht'>Gebrauchte Girard-Perregaux Uhren</a> bieten oft ein besseres Preis-Leistungs-Verhältnis.",
      "Bei Kariv Glamour finden Sie transparente Preise für alle Girard-Perregaux Modelle mit detaillierten Produktinformationen und Zustandsbewertungen.",
    ],
  },
  'girard-perregaux-story': {
    h1_en: 'Girard-Perregaux Story', h1_de: 'Girard-Perregaux Story',
    title_en: 'Girard-Perregaux Story | Kariv Glamour', title_de: 'Girard-Perregaux Story | Kariv Glamour',
    description_en: 'The Girard-Perregaux story — Swiss haute horlogerie, visible mechanics and integrated-bracelet design.',
    description_de: 'Die Girard-Perregaux Story — Schweizer Haute Horlogerie, sichtbare Mechanik und integriertes Armband-Design.',
    intro_en: "Girard-Perregaux stands for Swiss haute horlogerie, visible mechanics and integrated-bracelet design — from the sport-chic Laureato to the 1966 dress watches to the Vintage 1945 and the rare Bridges.",
    intro_de: 'Girard-Perregaux steht für Schweizer Haute Horlogerie, sichtbare Mechanik und integriertes Armband-Design — von der Sport-chic Laureato über die 1966 Dress-Watches bis zur Vintage 1945 und den seltenen Bridges.',
    isGuide: true,
    guideContent_en: [
      "Girard-Perregaux is one of the oldest Swiss watch manufacturers with a history dating back to 1791. The brand is known for its haute horlogerie, visible mechanics and the integrated-bracelet design of the Laureato.",
      "The <a href='/girard-perregaux/laureato'>Laureato</a> is the brand's sport-chic icon. The <a href='/girard-perregaux/1966'>1966</a> collection stands for classic dress watches. The <a href='/girard-perregaux/vintage-1945'>Vintage 1945</a> offers Art Deco charm. The <a href='/girard-perregaux/bridges'>Bridges</a> make the mechanics visible. The rare <a href='/girard-perregaux-jackpot'>Jackpot Tourbillon</a> is a high-complication collector piece.",
      "At Kariv Glamour, you'll find a curated selection of Girard-Perregaux watches — from new models to <a href='/girard-perregaux-gebraucht'>pre-owned Girard-Perregaux watches</a>.",
    ],
    guideContent_de: [
      "Girard-Perregaux ist eine der ältesten Schweizer Uhrenmanufakturen mit einer Geschichte, die bis ins Jahr 1791 zurückreicht. Die Marke ist bekannt für ihre Haute Horlogerie, sichtbare Mechanik und das integrierte Armband-Design der Laureato.",
      "Die <a href='/girard-perregaux/laureato'>Laureato</a> ist die Sport-chic-Ikone der Marke. Die <a href='/girard-perregaux/1966'>1966</a> Kollektion steht für klassische Dress-Watches. Die <a href='/girard-perregaux/vintage-1945'>Vintage 1945</a> bietet Art-Deco-Charme. Die <a href='/girard-perregaux/bridges'>Bridges</a> machen die Mechanik sichtbar. Der seltene <a href='/girard-perregaux-jackpot'>Jackpot Tourbillon</a> ist ein hochkompliziertes Sammlerstück.",
      "Bei Kariv Glamour finden Sie eine kuratierte Auswahl an Girard-Perregaux Uhren — von neuen Modellen bis zu <a href='/girard-perregaux-gebraucht'>gebrauchten Girard-Perregaux Uhren</a>.",
    ],
  },
};

applyCzechSeoPages(GP_SEO_PAGES, 'Girard-Perregaux', 'girardPerregaux');
applyCzechBrandFaqs(GP_FAQS, 'girardPerregaux');
applyCzechBrandContent('girardPerregaux', GP_COLLECTIONS, GP_QUICK_FILTERS, GP_SEO_CARDS, GP_READ_MORE, GP_INTERNAL_LINKS);
