// Omega theme colors
export const OMEGA_THEME = {
  red: '#C8102E',
  redDark: '#9B0C22',
  black: '#0A0A0A',
  white: '#FFFFFF',
  steel: '#C0C0C0',
  steelLight: '#E8E8E8',
  oceanBlue: '#1B3A5C',
  oceanBlueLight: '#2C5282',
  moonGrey: '#9B9B9B',
  moonGreyLight: '#C0C0C0',
  lightBg: '#F5F5F5',
  warmWhite: '#FAFAFA',
  charcoal: '#1C1C1C',
  greyText: '#4A4A4A',
};

const OMEGA_COLLECTION_ASSET_BASE = '/brand-assets/omega/collections';
const OMEGA_PAGE_ASSET_BASE = '/brand-assets/omega/page';

export const OMEGA_LOGO_IMAGE = `${OMEGA_PAGE_ASSET_BASE}/omega-logo.svg`;

const PAGE_IMAGES = {
  hero: `${OMEGA_PAGE_ASSET_BASE}/buy-omega-watches.jpg`,
  buyOmega: `${OMEGA_PAGE_ASSET_BASE}/buy-omega-watches.jpg`,
  moonwatch: `${OMEGA_PAGE_ASSET_BASE}/buy-omega-moonwatch.webp`,
  planetOcean: `${OMEGA_PAGE_ASSET_BASE}/buy-omega-planet-ocean.webp`,
  seamaster: `${OMEGA_PAGE_ASSET_BASE}/buy-omega-seamaster.jpg`,
  seamasterDiver300m: `${OMEGA_PAGE_ASSET_BASE}/buy-omega-seamaster-diver-300m.webp`,
  preOwnedSpeedmaster: `${OMEGA_PAGE_ASSET_BASE}/buy-preowned-omega-speedmaster.jpeg`,
  preOwned: `${OMEGA_PAGE_ASSET_BASE}/buy-preowned-omega-watch.webp`,
  boxAndPapers: `${OMEGA_PAGE_ASSET_BASE}/omega-box-and-papers.jpg`,
  redLogo: `${OMEGA_PAGE_ASSET_BASE}/omega-red-logo.webp`,
  seamasterGuide: `${OMEGA_PAGE_ASSET_BASE}/omega-seamaster-guide.jpg`,
  speedmasterGuide: `${OMEGA_PAGE_ASSET_BASE}/omega-speedmaster-guide.jpg`,
  buyingGuide: `${OMEGA_PAGE_ASSET_BASE}/omega-watch-buying-guide.webp`,
  maintenance: `${OMEGA_PAGE_ASSET_BASE}/omega-watch-maintenance.jpeg`,
  watchmaking: `${OMEGA_PAGE_ASSET_BASE}/omega-watch-making.jpg`,
  story: `${OMEGA_PAGE_ASSET_BASE}/omega-watch-story.webp`,
  whichOmega: `${OMEGA_PAGE_ASSET_BASE}/which-omega-watch-to-buy.jpg`,
};

// Local fallback media for collection data. Database records override this when configured.
const UP = {
  seamaster: PAGE_IMAGES.seamaster,
  deville: PAGE_IMAGES.buyingGuide,
  speedmaster: PAGE_IMAGES.speedmasterGuide,
};

const COLLECTION_IMAGES = {
  seamaster: `${OMEGA_COLLECTION_ASSET_BASE}/omega-seamaster-collection.png`,
  speedmaster: `${OMEGA_COLLECTION_ASSET_BASE}/omega-speedmaster-collection.png`,
  constellation: `${OMEGA_COLLECTION_ASSET_BASE}/omega-constellation-collection.png`,
  deVille: `${OMEGA_COLLECTION_ASSET_BASE}/omega-de-ville-collection.png`,
};

// Local Omega reference images used by fallback cards and subcollections.
const IMG = {
  watch1: PAGE_IMAGES.buyOmega,
  watch2: PAGE_IMAGES.preOwned,
  watch3: PAGE_IMAGES.moonwatch,
  watch4: PAGE_IMAGES.seamasterDiver300m,
  watch5: PAGE_IMAGES.planetOcean,
  watch6: PAGE_IMAGES.watchmaking,
  watch7: PAGE_IMAGES.boxAndPapers,
  watch8: PAGE_IMAGES.maintenance,
};

export const OMEGA_HERO_IMAGE = PAGE_IMAGES.hero;

// Omega Collections (flat list with parentCollection)
export const OMEGA_COLLECTIONS = [
  // Main collections
  { id: 'seamaster', name: 'Seamaster', slug: 'seamaster', parentCollection: null, description_en: "Omega's ocean-inspired collection, created for those drawn to dive watches, maritime design and robust everyday performance.", description_de: "Omegas ozean-inspirierte Kollektion, geschaffen für Liebhaber von Taucheruhren, maritimem Design und robuster Alltagsleistung.", image: COLLECTION_IMAGES.seamaster, displayOrder: 1 },
  { id: 'speedmaster', name: 'Speedmaster', slug: 'speedmaster', parentCollection: null, description_en: "Omega's legendary chronograph family, strongly associated with racing, space exploration and the Moonwatch legacy.", description_de: "Omegas legendäre Chronographen-Familie, stark verbunden mit Motorsport, Weltraumforschung und der Moonwatch-Tradition.", image: COLLECTION_IMAGES.speedmaster, displayOrder: 2 },
  { id: 'constellation', name: 'Constellation', slug: 'constellation', parentCollection: null, description_en: 'An elegant Omega collection recognized for distinctive case details, integrated bracelet styling and refined daily luxury.', description_de: 'Eine elegante Omega-Kollektion, bekannt für markante Gehäusedetails, integriertes Armband-Styling und verfeinerten alltäglichen Luxus.', image: COLLECTION_IMAGES.constellation, displayOrder: 3 },
  { id: 'de-ville', name: 'De Ville', slug: 'de-ville', parentCollection: null, description_en: "A refined Omega dress-watch family focused on elegance, classic styling and sophisticated watchmaking.", description_de: 'Eine verfeinerte Omega Dress-Watch-Familie mit Fokus auf Eleganz, klassisches Styling und anspruchsvolle Uhrmacherei.', image: COLLECTION_IMAGES.deVille, displayOrder: 4 },

  // Seamaster subcollections
  { id: 'seamaster-aqua-terra', name: 'Seamaster Aqua Terra 150M', slug: 'seamaster-aqua-terra', parentCollection: 'Seamaster', description_en: 'A versatile Seamaster model blending sport, elegance and everyday wearability with a refined nautical character.', description_de: 'Ein vielseitiges Seamaster-Modell, das Sport, Eleganz und alltägliche Tragbarkeit mit einem nautischen Charakter vereint.', image: IMG.watch4, displayOrder: 5 },
  { id: 'seamaster-diver-300m', name: 'Seamaster Diver 300M', slug: 'seamaster-diver-300m', parentCollection: 'Seamaster', description_en: 'An iconic Omega dive watch known for its distinctive design, professional diving spirit and strong modern appeal.', description_de: 'Eine ikonische Omega-Taucheruhr, bekannt für ihr markantes Design, ihren professionellen Tauchgeist und starken modernen Appeal.', image: UP.seamaster, displayOrder: 6 },
  { id: 'seamaster-planet-ocean', name: 'Seamaster Planet Ocean', slug: 'seamaster-planet-ocean', parentCollection: 'Seamaster', description_en: 'A powerful dive-watch collection inspired by Omega\u2019s maritime heritage, with strong water resistance, robust construction and modern materials.', description_de: 'Eine kraftvolle Taucheruhren-Kollektion, inspiriert von Omegas maritimer Tradition, mit starker Wasserdichtigkeit, robuster Konstruktion und modernen Materialien.', image: IMG.watch5, displayOrder: 7 },
  { id: 'seamaster-planet-ocean-gmt', name: 'Seamaster Planet Ocean GMT', slug: 'seamaster-planet-ocean-gmt', parentCollection: 'Seamaster', description_en: 'A travel-ready Planet Ocean model combining dive-watch performance with dual-time-zone functionality.', description_de: 'Ein reisebereites Planet Ocean-Modell, das Taucheruhren-Leistung mit Dual-Zeitzonen-Funktionalität kombiniert.', image: IMG.watch6, displayOrder: 8 },
  { id: 'seamaster-planet-ocean-worldtimer', name: 'Seamaster Planet Ocean Worldtimer', slug: 'seamaster-planet-ocean-worldtimer', parentCollection: 'Seamaster', description_en: 'A world-time Planet Ocean model designed for global travellers who value both dive capability and multi-zone legibility.', description_de: 'Ein World-Time Planet Ocean-Modell, konzipiert für Weltreisende, die sowohl Tauchfähigkeit als auch Mehrzonen-Ablesbarkeit schätzen.', image: IMG.watch7, displayOrder: 9 },
  { id: 'seamaster-ultra-deep', name: 'Seamaster Planet Ocean Ultra Deep', slug: 'seamaster-ultra-deep', parentCollection: 'Seamaster', description_en: 'A serious depth-focused Seamaster line built for extreme underwater performance and technical presence.', description_de: 'Eine ernsthafte tiefenorientierte Seamaster-Linie, gebaut für extreme Unterwasserleistung und technische Präsenz.', image: IMG.watch8, displayOrder: 10 },
  { id: 'seamaster-heritage', name: 'Seamaster Heritage Models', slug: 'seamaster-heritage', parentCollection: 'Seamaster', description_en: 'Heritage-inspired Seamaster references that pay tribute to Omega\u2019s rich maritime and diving history.', description_de: 'Heritage-inspirierte Seamaster-Referenzen, die Omegas reiche maritime und Tauchgeschichte ehren.', image: IMG.watch1, displayOrder: 11 },

  // Speedmaster subcollections
  { id: 'speedmaster-moonwatch', name: 'Speedmaster Moonwatch Professional', slug: 'speedmaster-moonwatch', parentCollection: 'Speedmaster', description_en: 'The iconic chronograph known for its historic connection to space exploration and timeless tool-watch design.', description_de: 'Der ikonische Chronograph, bekannt für seine historische Verbindung zur Weltraumforschung und sein zeitloses Tool-Watch-Design.', image: UP.speedmaster, displayOrder: 12 },
  { id: 'speedmaster-dark-side-of-the-moon', name: 'Speedmaster Dark Side of the Moon', slug: 'speedmaster-dark-side-of-the-moon', parentCollection: 'Speedmaster', description_en: 'A bold Speedmaster line with ceramic construction, darker tones and a modern technical personality.', description_de: 'Eine kühne Speedmaster-Linie mit Keramikkonstruktion, dunkleren Tönen und einer modernen technischen Persönlichkeit.', image: IMG.watch2, displayOrder: 13 },
  { id: 'speedmaster-38', name: 'Speedmaster 38 mm', slug: 'speedmaster-38', parentCollection: 'Speedmaster', description_en: 'A refined Speedmaster interpretation with smaller proportions and versatile everyday appeal.', description_de: 'Eine verfeinerte Speedmaster-Interpretation mit kleineren Proportionen und vielseitigem alltäglichen Appeal.', image: IMG.watch3, displayOrder: 14 },
  { id: 'speedmaster-two-counters', name: 'Speedmaster Two Counters', slug: 'speedmaster-two-counters', parentCollection: 'Speedmaster', description_en: 'A Speedmaster design family with balanced chronograph styling and a clean two-register layout.', description_de: 'Eine Speedmaster-Designfamilie mit ausgewogenem Chronographen-Styling und einem klaren Zwei-Zähler-Layout.', image: IMG.watch4, displayOrder: 15 },
  { id: 'speedmaster-calibre-321', name: 'Speedmaster Calibre 321', slug: 'speedmaster-calibre-321', parentCollection: 'Speedmaster', description_en: 'A collector-focused Speedmaster line reviving the historic Calibre 321 movement with period-correct detailing.', description_de: 'Eine sammlerorientierte Speedmaster-Linie, die das historische Kaliber 321-Werk mit zeitgetreuen Details wiederbelebt.', image: IMG.watch5, displayOrder: 16 },

  // Constellation subcollections
  { id: 'globemaster', name: 'Globemaster', slug: 'globemaster', parentCollection: 'Constellation', description_en: 'A sophisticated Omega collection with classic design cues, strong precision identity and elegant finishing.', description_de: 'Eine anspruchsvolle Omega-Kollektion mit klassischen Designelementen, starker Präzisionsidentität und eleganter Verarbeitung.', image: IMG.watch6, displayOrder: 17 },

  // De Ville subcollections
  { id: 'de-ville-ladymatic', name: 'De Ville Ladymatic', slug: 'de-ville-ladymatic', parentCollection: 'De Ville', description_en: 'A feminine Omega collection combining elegance, detail and graceful luxury.', description_de: 'Eine feminine Omega-Kollektion, die Eleganz, Detail und anmutigen Luxus vereint.', image: IMG.watch7, displayOrder: 18 },
  { id: 'de-ville-tresor', name: 'De Ville Tr\u00e9sor', slug: 'de-ville-tresor', parentCollection: 'De Ville', description_en: 'A slim and elegant De Ville collection with dress-watch character and refined proportions.', description_de: 'Eine schlanke und elegante De Ville-Kollektion mit Dress-Watch-Charakter und verfeinerten Proportionen.', image: UP.deville, displayOrder: 19 },
  { id: 'de-ville-prestige', name: 'De Ville Prestige', slug: 'de-ville-prestige', parentCollection: 'De Ville', description_en: 'A classic Omega dress-watch line designed for timeless daily elegance.', description_de: 'Eine klassische Omega Dress-Watch-Linie, konzipiert für zeitlose tägliche Eleganz.', image: UP.deville, displayOrder: 20 },
  { id: 'de-ville-tourbillon', name: 'De Ville Tourbillon', slug: 'de-ville-tourbillon', parentCollection: 'De Ville', description_en: 'A high-watchmaking expression within Omega\u2019s De Ville family, suitable for collector-focused product discovery.', description_de: 'Ein Ausdruck der Haute Horlogerie innerhalb von Omegas De Ville-Familie, geeignet für sammlerorientierte Produktentdeckung.', image: IMG.watch8, displayOrder: 21 },
];

// Quick filter chips for product grid
export const OMEGA_QUICK_FILTERS = [
  { label_en: 'Omega Speedmaster', label_de: 'Omega Speedmaster', link: '/omega-speedmaster-kaufen' },
  { label_en: 'Omega Moonwatch', label_de: 'Omega Moonwatch', link: '/omega-moonwatch-kaufen' },
  { label_en: 'Omega Seamaster', label_de: 'Omega Seamaster', link: '/omega-seamaster-kaufen' },
  { label_en: 'Omega Seamaster Diver 300M', label_de: 'Omega Seamaster Diver 300M', link: '/omega-seamaster-diver-300m-kaufen' },
  { label_en: 'Omega Planet Ocean', label_de: 'Omega Planet Ocean', link: '/omega-seamaster-planet-ocean-kaufen' },
  { label_en: 'Omega Aqua Terra', label_de: 'Omega Aqua Terra', link: '/omega-seamaster-aqua-terra-kaufen' },
  { label_en: 'Omega Constellation', label_de: 'Omega Constellation', link: '/omega-constellation-kaufen' },
  { label_en: 'Omega De Ville', label_de: 'Omega De Ville', link: '/omega-de-ville-kaufen' },
  { label_en: 'Pre-Owned Omega', label_de: 'Omega gebraucht', link: '/omega-gebraucht-kaufen' },
  { label_en: 'Omega with Box and Papers', label_de: 'Omega mit Box und Papieren', link: '/watch-guides/box-and-papers' },
  { label_en: 'Omega Master Chronometer', label_de: 'Omega Master Chronometer', link: '/omega/master-chronometer-guide' },
];

// SEO Cards
export const OMEGA_SEO_CARDS = [
  { title_en: 'Buy Omega', title_de: 'Omega kaufen', description_en: 'Explore Omega watches through Kariv Glamour with refined product presentation, transparent product details and a smooth luxury shopping experience.', description_de: 'Entdecken Sie Omega Uhren bei Kariv Glamour mit verfeinerter Produktpräsentation, transparenten Produktdetails und einem reibungslosen Luxus-Einkaufserlebnis.', link: '/omega-kaufen', image: PAGE_IMAGES.buyOmega },
  { title_en: 'Buy Pre-Owned Omega', title_de: 'Omega gebraucht kaufen', description_en: 'Discover pre-owned Omega watches with clear condition grading, box and papers information, service history details and collector-friendly product data.', description_de: 'Entdecken Sie gebrauchte Omega Uhren mit klarer Zustandsbewertung, Box und Papiere Informationen, Service-Historie und sammlerfreundlichen Produktdaten.', link: '/omega-gebraucht-kaufen', image: PAGE_IMAGES.preOwned },
  { title_en: 'Buy Omega Speedmaster', title_de: 'Omega Speedmaster kaufen', description_en: 'Browse Omega Speedmaster watches, including Moonwatch-inspired chronographs and modern Speedmaster references.', description_de: 'Stöbern Sie durch Omega Speedmaster Uhren, inklusive Moonwatch-inspirierter Chronographen und moderner Speedmaster-Referenzen.', link: '/omega-speedmaster-kaufen', image: PAGE_IMAGES.preOwnedSpeedmaster },
  { title_en: 'Buy Omega Seamaster', title_de: 'Omega Seamaster kaufen', description_en: 'Explore Omega Seamaster watches, from Aqua Terra and Diver 300M models to Planet Ocean and Ultra Deep references.', description_de: 'Entdecken Sie Omega Seamaster Uhren, von Aqua Terra und Diver 300M bis Planet Ocean und Ultra Deep Referenzen.', link: '/omega-seamaster-kaufen', image: PAGE_IMAGES.seamaster },
  { title_en: 'Buy Omega Moonwatch', title_de: 'Omega Moonwatch kaufen', description_en: 'Discover the Omega Speedmaster Moonwatch, one of the most recognized chronographs in watch history.', description_de: 'Entdecken Sie die Omega Speedmaster Moonwatch, einen der bekanntesten Chronographen der Uhrengeschichte.', link: '/omega-moonwatch-kaufen', image: PAGE_IMAGES.moonwatch },
  { title_en: 'Buy Omega Seamaster Diver 300M', title_de: 'Omega Seamaster Diver 300M kaufen', description_en: 'Shop Omega Seamaster Diver 300M watches with distinctive styling, professional dive-watch character and strong everyday appeal.', description_de: 'Shoppen Sie Omega Seamaster Diver 300M Uhren mit markantem Styling, professionellem Taucheruhren-Charakter und starkem alltäglichen Appeal.', link: '/omega-seamaster-diver-300m-kaufen', image: PAGE_IMAGES.seamasterDiver300m },
  { title_en: 'Buy Omega Planet Ocean', title_de: 'Omega Planet Ocean kaufen', description_en: 'Explore Omega Seamaster Planet Ocean watches, designed for depth, durability and powerful dive-watch presence.', description_de: 'Entdecken Sie Omega Seamaster Planet Ocean Uhren, konzipiert für Tiefe, Haltbarkeit und kraftvolle Taucheruhren-Präsenz.', link: '/omega-seamaster-planet-ocean-kaufen', image: PAGE_IMAGES.planetOcean },
  { title_en: 'Which Omega to Buy?', title_de: 'Welche Omega kaufen?', description_en: 'Read the Omega buying guide to compare Speedmaster, Seamaster, Constellation and De Ville collections.', description_de: 'Lesen Sie die Omega Kaufberatung, um Speedmaster, Seamaster, Constellation und De Ville Kollektionen zu vergleichen.', link: '/welche-omega-kaufen', image: PAGE_IMAGES.whichOmega },
];

// Editorial sections data (Story, Watchmaking, Maintenance)
export const OMEGA_EDITORIAL_SECTIONS = [
  {
    id: 'omega-story',
    eyebrow_en: 'Heritage', eyebrow_de: 'Erbe',
    title_en: 'The Omega Story', title_de: 'Die Omega Story',
    description_en: 'Omega has built a legacy of precision, innovation and adventure. From timing the Olympic Games to accompanying astronauts on the Moon, and from equipping divers with the Seamaster to defining the modern chronograph with the Speedmaster, the Omega story spans over a century of horological achievement. At Kariv Glamour, we celebrate this heritage by offering carefully selected Omega timepieces, each presented with full transparency and expert insight.',
    description_de: 'Omega hat ein Erbe von Präzision, Innovation und Abenteuer aufgebaut. Von der Zeitmessung der Olympischen Spiele über die Begleitung von Astronauten auf dem Mond bis hin zur Ausrüstung von Tauchern mit der Seamaster und der Definition des modernen Chronographen mit der Speedmaster — die Omega Story umfasst über ein Jahrhundert uhrmacherischer Leistung. Bei Kariv Glamour feiern wir dieses Erbe mit sorgfältig ausgewählten Omega Zeitmessern, die mit voller Transparenz und fachkundiger Einsicht präsentiert werden.',
    cta_en: 'Read the Omega Story', cta_de: 'Die Omega Story lesen',
    link: '/omega/story',
    image: PAGE_IMAGES.story,
    internalLinks: [
      { text_en: 'Omega heritage', text_de: 'Omega Erbe', link: '/omega/story' },
      { text_en: 'space exploration', text_de: 'Weltraumforschung', link: '/omega-speedmaster-kaufen' },
      { text_en: 'ocean performance', text_de: 'Ozeanleistung', link: '/omega-seamaster-kaufen' },
      { text_en: 'precision timing', text_de: 'Präzisionszeitmessung', link: '/omega/watchmaking' },
      { text_en: 'Moonwatch', text_de: 'Moonwatch', link: '/omega-moonwatch-kaufen' },
    ],
  },
  {
    id: 'omega-watchmaking',
    eyebrow_en: 'Craftsmanship', eyebrow_de: 'Handwerkskunst',
    title_en: 'Omega Watchmaking', title_de: 'Omega Uhrmacherei',
    description_en: 'Omega watchmaking stands for precision, innovation and reliability. From the revolutionary Co-Axial escapement to Master Chronometer certification, anti-magnetic performance and carefully engineered dive-watch construction, every Omega is built to exacting standards. At Kariv Glamour, we help you understand the craftsmanship behind each Omega, including calibre numbers, movement types, water resistance and the difference between dress watches, sports watches and chronographs.',
    description_de: 'Omega Uhrmacherei steht für Präzision, Innovation und Zuverlässigkeit. Von der revolutionären Co-Axial-Hemmung über die Master Chronometer Zertifizierung, antimagnetische Leistung und sorgfältig konstruierte Taucheruhren — jede Omega wird nach höchsten Standards gefertigt. Bei Kariv Glamour helfen wir Ihnen, die Handwerkskunst hinter jeder Omega zu verstehen, einschließlich Kalibernummern, Werksarten, Wasserdichtigkeit und dem Unterschied zwischen Dress Watches, Sportuhren und Chronographen.',
    cta_en: 'Explore Omega Watchmaking', cta_de: 'Omega Uhrmacherei entdecken',
    link: '/omega/watchmaking',
    image: PAGE_IMAGES.watchmaking,
    internalLinks: [
      { text_en: 'Co-Axial movements', text_de: 'Co-Axial Werke', link: '/omega/co-axial-guide' },
      { text_en: 'Master Chronometer', text_de: 'Master Chronometer', link: '/omega/master-chronometer-guide' },
      { text_en: 'calibre numbers', text_de: 'Kalibernummern', link: '/watch-guides/watch-reference-number-guide' },
      { text_en: 'watch case materials', text_de: 'Gehäusematerialien', link: '/watch-guides/watch-case-materials' },
      { text_en: 'chronograph watches', text_de: 'Chronographen-Uhren', link: '/collections/chronograph-watches' },
      { text_en: 'dive watches', text_de: 'Taucheruhren', link: '/collections/dive-watches' },
    ],
  },
  {
    id: 'omega-maintenance',
    eyebrow_en: 'Care', eyebrow_de: 'Pflege',
    title_en: 'Omega Maintenance', title_de: 'Omega Wartung',
    description_en: 'Proper care preserves the beauty, reliability and value of an Omega watch. Regular servicing, water resistance checks, bracelet and strap care, leather and rubber strap protection, and post-salt-water rinsing for dive watches all contribute to long-term performance. For pre-owned and collectible Omega watches, preserving box, papers, warranty cards, service documents and invoices is especially important. Kariv Glamour provides guidance to help you maintain your timepiece with confidence.',
    description_de: 'Die richtige Pflege erhält die Schönheit, Zuverlässigkeit und den Wert einer Omega Uhr. Regelmäßige Wartung, Wasserdichtigkeitsprüfungen, Armband- und Bandpflege, Leder- und Kautschukband-Schutz sowie das Süßwasserspülen nach Salzwasser bei Taucheruhren tragen zur langfristigen Leistung bei. Bei gebrauchten und sammlerwürdigen Omega Uhren ist das Erhalten von Box, Papieren, Garantiekarten, Servicedokumenten und Rechnungen besonders wichtig. Kariv Glamour bietet Beratung, damit Sie Ihren Zeitmesser zuversichtlich pflegen können.',
    cta_en: 'Learn About Omega Maintenance', cta_de: 'Mehr über Omega Wartung erfahren',
    link: '/omega/maintenance',
    image: PAGE_IMAGES.maintenance,
    internalLinks: [
      { text_en: 'service history', text_de: 'Service-Historie', link: '/watch-guides/service-history' },
      { text_en: 'box and papers', text_de: 'Box und Papiere', link: '/watch-guides/box-and-papers' },
      { text_en: 'condition grading', text_de: 'Zustandsbewertung', link: '/condition-grading' },
      { text_en: 'pre-owned Omega', text_de: 'gebrauchte Omega', link: '/omega-gebraucht-kaufen' },
      { text_en: 'water resistance', text_de: 'Wasserdichtigkeit', link: '/watch-guides/watch-water-resistance' },
      { text_en: 'dive watch care', text_de: 'Taucheruhren-Pflege', link: '/watch-guides/dive-watch-care' },
    ],
  },
];

// Read More carousel cards
export const OMEGA_READ_MORE = [
  { title_en: 'Omega Story', title_de: 'Omega Story', description_en: 'Explore Omega\u2019s heritage, precision identity, sport timing, space history and ocean-focused watchmaking.', description_de: 'Entdecken Sie Omegas Erbe, Präzisionsidentität, Sportzeitmessung, Weltraumgeschichte und ozean-orientierte Uhrmacherei.', link: '/omega/story', image: PAGE_IMAGES.story },
  { title_en: 'Omega Watchmaking', title_de: 'Omega Uhrmacherei', description_en: 'Learn about Co-Axial movements, Master Chronometer performance, calibres, materials and technical details.', description_de: 'Erfahren Sie über Co-Axial Werke, Master Chronometer Leistung, Kaliber, Materialien und technische Details.', link: '/omega/watchmaking', image: PAGE_IMAGES.watchmaking },
  { title_en: 'Omega Maintenance', title_de: 'Omega Wartung', description_en: 'Understand how to care for an Omega watch and preserve its condition, reliability, documentation and long-term appeal.', description_de: 'Verstehen Sie, wie Sie eine Omega Uhr pflegen und ihren Zustand, ihre Zuverlässigkeit, Dokumentation und langfristige Anziehungskraft erhalten.', link: '/omega/maintenance', image: PAGE_IMAGES.maintenance },
  { title_en: 'Omega Buying Guide', title_de: 'Omega Kaufberatung', description_en: 'Compare Speedmaster, Seamaster, Constellation and De Ville to find the Omega model that fits your lifestyle.', description_de: 'Vergleichen Sie Speedmaster, Seamaster, Constellation und De Ville, um das Omega-Modell zu finden, das zu Ihrem Lebensstil passt.', link: '/welche-omega-kaufen', image: PAGE_IMAGES.buyingGuide },
  { title_en: 'Omega Speedmaster Guide', title_de: 'Omega Speedmaster Guide', description_en: 'Learn why the Speedmaster remains one of the most recognized chronographs in luxury watch collecting.', description_de: 'Erfahren Sie, warum die Speedmaster einer der bekanntesten Chronographen im Luxusuhren-Sammeln bleibt.', link: '/omega-speedmaster-kaufen', image: PAGE_IMAGES.speedmasterGuide },
  { title_en: 'Omega Seamaster Guide', title_de: 'Omega Seamaster Guide', description_en: 'Explore the Seamaster family, including Aqua Terra, Diver 300M, Planet Ocean and Ultra Deep models.', description_de: 'Entdecken Sie die Seamaster-Familie, einschließlich Aqua Terra, Diver 300M, Planet Ocean und Ultra Deep Modelle.', link: '/omega-seamaster-kaufen', image: PAGE_IMAGES.seamasterGuide },
  { title_en: 'Omega Box and Papers', title_de: 'Omega Box und Papiere', description_en: 'Learn why original documentation, warranty cards, service records and purchase history matter when buying Omega.', description_de: 'Erfahren Sie, warum Originaldokumentation, Garantiekarten, Servicunterlagen und Kaufhistorie beim Kauf von Omega wichtig sind.', link: '/watch-guides/box-and-papers', image: PAGE_IMAGES.boxAndPapers },
];

// Internal linking hub
export const OMEGA_INTERNAL_LINKS = {
  popularSearches: [
    { text_en: 'Buy Omega', text_de: 'Omega kaufen', link: '/omega-kaufen' },
    { text_en: 'Buy Omega watch', text_de: 'Omega Uhr kaufen', link: '/omega-uhr-kaufen' },
    { text_en: 'Buy pre-owned Omega', text_de: 'Omega gebraucht kaufen', link: '/omega-gebraucht-kaufen' },
    { text_en: 'Used Omega watches', text_de: 'Gebrauchte Omega Uhren', link: '/gebrauchte-omega-uhren' },
    { text_en: 'Omega for men', text_de: 'Omega für Herren', link: '/omega-herren' },
    { text_en: 'Omega for women', text_de: 'Omega für Damen', link: '/omega-damen' },
    { text_en: 'Omega with box and papers', text_de: 'Omega mit Box und Papieren', link: '/watch-guides/box-and-papers' },
  ],
  iconicModels: [
    { text_en: 'Buy Omega Speedmaster', text_de: 'Omega Speedmaster kaufen', link: '/omega-speedmaster-kaufen' },
    { text_en: 'Buy Omega Moonwatch', text_de: 'Omega Moonwatch kaufen', link: '/omega-moonwatch-kaufen' },
    { text_en: 'Buy Omega Seamaster', text_de: 'Omega Seamaster kaufen', link: '/omega-seamaster-kaufen' },
    { text_en: 'Buy Omega Seamaster Diver 300M', text_de: 'Omega Seamaster Diver 300M kaufen', link: '/omega-seamaster-diver-300m-kaufen' },
    { text_en: 'Buy Omega Planet Ocean', text_de: 'Omega Planet Ocean kaufen', link: '/omega-seamaster-planet-ocean-kaufen' },
    { text_en: 'Buy Omega Aqua Terra', text_de: 'Omega Aqua Terra kaufen', link: '/omega-seamaster-aqua-terra-kaufen' },
    { text_en: 'Buy Omega Constellation', text_de: 'Omega Constellation kaufen', link: '/omega-constellation-kaufen' },
    { text_en: 'Buy Omega De Ville', text_de: 'Omega De Ville kaufen', link: '/omega-de-ville-kaufen' },
  ],
  learningGuides: [
    { text_en: 'Which Omega to buy?', text_de: 'Welche Omega kaufen?', link: '/welche-omega-kaufen' },
    { text_en: 'Omega Speedmaster or Seamaster?', text_de: 'Omega Speedmaster oder Seamaster?', link: '/omega-speedmaster-oder-seamaster' },
    { text_en: 'Omega new or pre-owned?', text_de: 'Omega neu oder gebraucht kaufen?', link: '/omega-neu-oder-gebraucht' },
    { text_en: 'Omega box and papers guide', text_de: 'Omega Box und Papiere Guide', link: '/watch-guides/box-and-papers' },
    { text_en: 'Omega maintenance and care', text_de: 'Omega Wartung und Pflege', link: '/omega/maintenance' },
    { text_en: 'Omega Story', text_de: 'Omega Story', link: '/omega/story' },
    { text_en: 'Omega Watchmaking', text_de: 'Omega Uhrmacherei', link: '/omega/watchmaking' },
    { text_en: 'Omega Master Chronometer Guide', text_de: 'Omega Master Chronometer Guide', link: '/omega/master-chronometer-guide' },
  ],
  relatedBrands: [
    { text_en: 'Rolex watches', text_de: 'Rolex Uhren', link: '/brands/rolex' },
    { text_en: 'Breitling watches', text_de: 'Breitling Uhren', link: '/brands/breitling' },
    { text_en: 'TAG Heuer watches', text_de: 'TAG Heuer Uhren', link: '/brands/tag-heuer' },
    { text_en: 'Tudor watches', text_de: 'Tudor Uhren', link: '/brands/tudor' },
    { text_en: 'IWC Schaffhausen watches', text_de: 'IWC Schaffhausen Uhren', link: '/brands/iwc-schaffhausen' },
    { text_en: 'Cartier watches', text_de: 'Cartier Uhren', link: '/brands/cartier' },
    { text_en: 'Grand Seiko watches', text_de: 'Grand Seiko Uhren', link: '/brands/grand-seiko' },
    { text_en: 'Patek Philippe watches', text_de: 'Patek Philippe Uhren', link: '/brands/patek-philippe' },
  ],
  relatedCategories: [
    { text_en: 'Certified Pre-Owned Watches', text_de: 'Zertifizierte gebrauchte Uhren', link: '/certified-pre-owned' },
    { text_en: 'Vintage Watches', text_de: 'Vintage Uhren', link: '/vintage-watches' },
    { text_en: 'Men\u2019s Luxury Watches', text_de: 'Herren-Luxusuhren', link: '/mens-watches' },
    { text_en: 'Women\u2019s Luxury Watches', text_de: 'Damen-Luxusuhren', link: '/womens-watches' },
    { text_en: 'Dive Watches', text_de: 'Taucheruhren', link: '/collections/dive-watches' },
    { text_en: 'Chronograph Watches', text_de: 'Chronographen-Uhren', link: '/collections/chronograph-watches' },
    { text_en: 'GMT Watches', text_de: 'GMT-Uhren', link: '/collections/gmt-watches' },
    { text_en: 'Dress Watches', text_de: 'Dress Watches', link: '/collections/dress-watches' },
    { text_en: 'Sports Watches', text_de: 'Sportuhren', link: '/collections/sports-watches' },
  ],
};

// FAQ with segment-based answers for internal links
export const OMEGA_FAQS = [
  {
    question_en: 'Where can I buy an Omega watch online?', question_de: 'Wo kann ich online eine Omega Uhr kaufen?',
    answer: [
      { text_en: 'You can buy an Omega watch online through Kariv Glamour, where each timepiece is presented with transparent product details, clear condition grading, and reference number visibility. Browse our ', text_de: 'Sie können eine Omega Uhr online bei Kariv Glamour kaufen, wo jeder Zeitmesser mit transparenten Produktdetails, klarer Zustandsbewertung und Referenznummern-Sichtbarkeit präsentiert wird. Stöbern Sie durch unsere ' },
      { text_en: 'Omega collection', text_de: 'Omega-Kollektion', link: '/brands/omega' },
      { text_en: ' to explore available models, or visit our ', text_de: ', um verfügbare Modelle zu entdecken, oder besuchen Sie unsere ' },
      { text_en: 'pre-owned Omega', text_de: 'gebrauchte Omega', link: '/omega-gebraucht-kaufen' },
      { text_en: ' page for previously owned timepieces.', text_de: ' Seite für bereits getragene Zeitmesser.' },
    ],
  },
  {
    question_en: 'Is it safe to buy a pre-owned Omega?', question_de: 'Ist es sicher, eine gebrauchte Omega zu kaufen?',
    answer: [
      { text_en: 'Yes. When you buy a ', text_de: 'Ja. Wenn Sie eine ' },
      { text_en: 'pre-owned Omega', text_de: 'gebrauchte Omega', link: '/omega-gebraucht-kaufen' },
      { text_en: ' from Kariv Glamour, each watch is carefully reviewed and presented with clear ', text_de: ' bei Kariv Glamour kaufen, wird jede Uhr sorgfältig geprüft und mit klarer ' },
      { text_en: 'condition grading', text_de: 'Zustandsbewertung', link: '/condition-grading' },
      { text_en: ', ', text_de: ', ' },
      { text_en: 'box and papers', text_de: 'Box und Papiere', link: '/watch-guides/box-and-papers' },
      { text_en: ' information, and service history where available. We do not sell replica or counterfeit watches.', text_de: ' Information und, sofern verfügbar, Service-Historie präsentiert. Wir verkaufen keine Replika oder Fälschungen.' },
    ],
  },
  {
    question_en: 'What does "box and papers" mean when buying an Omega?', question_de: 'Was bedeutet "Box und Papiere" beim Kauf einer Omega?',
    answer: [
      { text_en: 'Box and papers refers to the original presentation box and warranty documents that accompany an Omega watch. Having the original ', text_de: 'Box und Papiere bezieht sich auf die Original-Präsentationsbox und die Garantiedokumente, die eine Omega Uhr begleiten. Das Vorhandensein der originalen ' },
      { text_en: 'box and papers', text_de: 'Box und Papiere', link: '/watch-guides/box-and-papers' },
      { text_en: ' can enhance collectability and resale value. Learn more in our dedicated guide.', text_de: ' kann die Sammelwürdigkeit und den Wiederverkaufswert steigern. Erfahren Sie mehr in unserem dedicated Guide.' },
    ],
  },
  {
    question_en: 'Which Omega should I buy first?', question_de: 'Welche Omega sollte ich zuerst kaufen?',
    answer: [
      { text_en: 'The right first Omega depends on your lifestyle, taste, and budget. The Seamaster is an iconic sports watch, while the De Ville offers elegant dress-watch appeal. Read our ', text_de: 'Die richtige erste Omega hängt von Ihrem Lebensstil, Geschmack und Budget ab. Die Seamaster ist eine ikonische Sportuhr, während die De Ville eleganten Dress-Watch-Appeal bietet. Lesen Sie unseren ' },
      { text_en: 'Which Omega should I buy first?', text_de: 'Welche Omega sollte ich zuerst kaufen?', link: '/welche-omega-kaufen' },
      { text_en: ' guide for a detailed comparison of popular models.', text_de: ' Guide für einen detaillierten Vergleich beliebter Modelle.' },
    ],
  },
  {
    question_en: 'What is the difference between Omega Speedmaster and Seamaster?', question_de: 'Was ist der Unterschied zwischen Omega Speedmaster und Seamaster?',
    answer: [
      { text_en: 'The ', text_de: 'Die ' },
      { text_en: 'Speedmaster', text_de: 'Speedmaster', link: '/omega-speedmaster-kaufen' },
      { text_en: ' is Omega\u2019s legendary chronograph family associated with racing and space exploration, while the ', text_de: ' ist Omegas legendäre Chronographen-Familie, verbunden mit Motorsport und Weltraumforschung, während die ' },
      { text_en: 'Seamaster', text_de: 'Seamaster', link: '/omega-seamaster-kaufen' },
      { text_en: ' is Omega\u2019s ocean-inspired dive-watch collection. The Speedmaster is a tool chronograph, while the Seamaster is built for water performance. Read our ', text_de: ' ist Omegas ozean-inspirierte Taucheruhren-Kollektion. Die Speedmaster ist ein Tool-Chronograph, während die Seamaster für Wasserleistung gebaut ist. Lesen Sie unseren ' },
      { text_en: 'Speedmaster or Seamaster', text_de: 'Speedmaster oder Seamaster', link: '/omega-speedmaster-oder-seamaster' },
      { text_en: ' comparison for more detail.', text_de: ' Vergleich für mehr Details.' },
    ],
  },
  {
    question_en: 'What is the difference between Seamaster Diver 300M and Planet Ocean?', question_de: 'Was ist der Unterschied zwischen Seamaster Diver 300M und Planet Ocean?',
    answer: [
      { text_en: 'The ', text_de: 'Die ' },
      { text_en: 'Diver 300M', text_de: 'Diver 300M', link: '/omega-seamaster-diver-300m-kaufen' },
      { text_en: ' is rated to 300 metres and is known for its distinctive design and everyday wearability, while the ', text_de: ' ist bis 300 Meter geprüft und bekannt für ihr markantes Design und alltägliche Tragbarkeit, während die ' },
      { text_en: 'Planet Ocean', text_de: 'Planet Ocean', link: '/omega-seamaster-planet-ocean-kaufen' },
      { text_en: ' offers greater depth ratings, more robust construction and a more technical dive-watch personality.', text_de: ' tiefere Tauchtiefen, robustere Konstruktion und eine technischere Taucheruhren-Persönlichkeit bietet.' },
    ],
  },
  {
    question_en: 'What is the Omega Moonwatch?', question_de: 'Was ist die Omega Moonwatch?',
    answer: [
      { text_en: 'The Omega ', text_de: 'Die Omega ' },
      { text_en: 'Moonwatch', text_de: 'Moonwatch', link: '/omega-moonwatch-kaufen' },
      { text_en: ' is the Speedmaster Professional chronograph famously associated with NASA\u2019s lunar missions. It remains one of the most recognized chronographs in watch history. Explore our ', text_de: ' ist der Speedmaster Professional Chronograph, der berühmt mit den Mondmissionen der NASA verbunden ist. Sie bleibt einer der bekanntesten Chronographen der Uhrengeschichte. Entdecken Sie unsere ' },
      { text_en: 'Speedmaster', text_de: 'Speedmaster', link: '/omega-speedmaster-kaufen' },
      { text_en: ' collection to browse available references.', text_de: ' Kollektion, um verfügbare Referenzen zu durchsuchen.' },
    ],
  },
  {
    question_en: 'What is an Omega Master Chronometer?', question_de: 'Was ist ein Omega Master Chronometer?',
    answer: [
      { text_en: 'A ', text_de: 'Ein ' },
      { text_en: 'Master Chronometer', text_de: 'Master Chronometer', link: '/omega/master-chronometer-guide' },
      { text_en: ' is an Omega watch that has passed rigorous testing for precision, magnetic resistance and water resistance, certified by an independent institute. This certification represents one of the highest standards in the Swiss watch industry.', text_de: ' ist eine Omega Uhr, die strenge Prüfungen für Präzision, Magnetresistenz und Wasserdichtigkeit bestanden hat, zertifiziert durch ein unabhängiges Institut. Diese Zertifizierung repräsentiert einen der höchsten Standards in der Schweizer Uhrenindustrie.' },
    ],
  },
  {
    question_en: 'What is a Co-Axial movement?', question_de: 'Was ist ein Co-Axial Werk?',
    answer: [
      { text_en: 'A ', text_de: 'Ein ' },
      { text_en: 'Co-Axial movement', text_de: 'Co-Axial Werk', link: '/omega/co-axial-guide' },
      { text_en: ' is an Omega-developed escapement technology designed to reduce friction and improve long-term precision and service intervals. It is one of the key innovations in modern Omega watchmaking.', text_de: ' ist eine von Omega entwickelte Hemmungstechnologie, die Reibung reduziert und die langfristige Präzision sowie Serviceintervalle verbessert. Sie ist eine der wichtigsten Innovationen der modernen Omega Uhrmacherei.' },
    ],
  },
  {
    question_en: 'Are Omega watches good for daily wear?', question_de: 'Sind Omega Uhren für den täglichen Gebrauch geeignet?',
    answer: [
      { text_en: 'Yes. Omega watches are engineered for durability and reliability. Models like the Seamaster and Speedmaster are particularly well-suited for daily wear, combining robust construction with versatile design. Explore our ', text_de: 'Ja. Omega Uhren sind für Haltbarkeit und Zuverlässigkeit konstruiert. Modelle wie die Seamaster und Speedmaster sind besonders gut für den täglichen Gebrauch geeignet, da sie robuste Konstruktion mit vielseitigem Design verbinden. Entdecken Sie unsere ' },
      { text_en: 'Seamaster', text_de: 'Seamaster', link: '/omega-seamaster-kaufen' },
      { text_en: ' and ', text_de: ' und ' },
      { text_en: 'Speedmaster', text_de: 'Speedmaster', link: '/omega-speedmaster-kaufen' },
      { text_en: ' collections for everyday options.', text_de: ' Kollektionen für alltägliche Optionen.' },
    ],
  },
  {
    question_en: 'What should I check before buying a used Omega?', question_de: 'Worauf sollte ich vor dem Kauf einer gebrauchten Omega achten?',
    answer: [
      { text_en: 'Before buying a used Omega, check the ', text_de: 'Vor dem Kauf einer gebrauchten Omega sollten Sie die ' },
      { text_en: 'condition grading', text_de: 'Zustandsbewertung', link: '/condition-grading' },
      { text_en: ', reference number, year of production, ', text_de: ', Referenznummer, Produktionsjahr, ' },
      { text_en: 'box and papers', text_de: 'Box und Papiere', link: '/watch-guides/box-and-papers' },
      { text_en: ' status, ', text_de: ' Status, ' },
      { text_en: 'service history', text_de: 'Service-Historie', link: '/watch-guides/service-history' },
      { text_en: ', and authenticity. Our guides provide detailed information to help you evaluate each timepiece.', text_de: ' und Echtheit prüfen. Unsere Guides bieten detaillierte Informationen, die Ihnen bei der Bewertung jedes Zeitmessers helfen.' },
    ],
  },
  {
    question_en: 'Can I return an Omega watch purchased online?', question_de: 'Kann ich eine online gekaufte Omega Uhr zurückgeben?',
    answer: [
      { text_en: 'Yes. Kariv Glamour offers a return policy for eligible purchases. Please review our ', text_de: 'Ja. Kariv Glamour bietet eine Rückgaberichtlinie für berechtigte Käufe. Bitte lesen Sie unsere ' },
      { text_en: 'returns', text_de: 'Rückgaben', link: '/returns-and-refunds' },
      { text_en: ' page for full details on return conditions and process.', text_de: ' Seite für vollständige Details zu Rückgabebedingungen und -prozess.' },
    ],
  },
];

// Trust points
export const OMEGA_TRUST_POINTS = [
  { text_en: 'Transparent product descriptions', text_de: 'Transparente Produktbeschreibungen' },
  { text_en: 'Clear condition grading', text_de: 'Klare Zustandsbewertung' },
  { text_en: 'Box and papers information', text_de: 'Box und Papiere Informationen' },
  { text_en: 'Reference number visibility', text_de: 'Referenznummern-Sichtbarkeit' },
  { text_en: 'Calibre information where available', text_de: 'Kaliberinformationen, sofern verfügbar' },
  { text_en: 'Service history visibility where available', text_de: 'Service-Historie-Sichtbarkeit, sofern verfügbar' },
  { text_en: 'Secure checkout', text_de: 'Sicherer Checkout' },
  { text_en: 'Insured shipping', text_de: 'Versicherter Versand' },
  { text_en: 'Customer support before purchase', text_de: 'Kundensupport vor dem Kauf' },
  { text_en: 'No replica or counterfeit watches', text_de: 'Keine Replika oder Fälschungen' },
];

export const OMEGA_TRUST_LINKS = [
  { text_en: 'Authentication Process', text_de: 'Authentifizierungsprozess', link: '/authentication' },
  { text_en: 'Condition Grading', text_de: 'Zustandsbewertung', link: '/condition-grading' },
  { text_en: 'Box and Papers Guide', text_de: 'Box und Papiere Guide', link: '/watch-guides/box-and-papers' },
  { text_en: 'Service History Guide', text_de: 'Service-Historie Guide', link: '/watch-guides/service-history' },
  { text_en: 'Returns and Refunds', text_de: 'Rückgaben und Erstattungen', link: '/returns-and-refunds' },
  { text_en: 'Shipping Policy', text_de: 'Versandrichtlinie', link: '/shipping-policy' },
  { text_en: 'Contact Customer Service', text_de: 'Kundenservice kontaktieren', link: '/customer-service' },
];

// SEO Landing pages content
export const OMEGA_SEO_PAGES = {
  'omega-kaufen': {
    title_en: 'Buy Omega | New & Pre-Owned Omega Watches | Kariv Glamour', title_de: 'Omega kaufen | Neue & gebrauchte Omega Uhren | Kariv Glamour',
    description_en: 'Discover Omega watches at Kariv Glamour. Buy new, pre-owned and vintage Omega models like Speedmaster, Moonwatch, Seamaster, Diver 300M, Planet Ocean, Constellation and De Ville with transparent product information.', description_de: 'Entdecken Sie Omega Uhren bei Kariv Glamour. Kaufen Sie neue, gebrauchte und vintage Omega Modelle wie Speedmaster, Moonwatch, Seamaster, Diver 300M, Planet Ocean, Constellation und De Ville mit transparenter Produktinformation.',
    h1_en: 'Buy Omega at Kariv Glamour', h1_de: 'Omega kaufen bei Kariv Glamour',
    intro_en: 'At Kariv Glamour, you can buy Omega watches online — with transparent product information, clear condition grading and a refined shopping experience. Discover new, pre-owned and vintage Omega models from the maison\u2019s most iconic collections.', intro_de: 'Bei Kariv Glamour können Sie Omega Uhren online kaufen — mit transparenter Produktinformation, klarer Zustandsbewertung und einem verfeinerten Einkaufserlebnis. Entdecken Sie neue, gebrauchte und vintage Omega Modelle von den ikonischsten Kollektionen der Manufaktur.',
    collectionFilter: null,
  },
  'omega-uhr-kaufen': {
    title_en: 'Buy Omega Watch | Omega Watches Online | Kariv Glamour', title_de: 'Omega Uhr kaufen | Omega Uhren online | Kariv Glamour',
    description_en: 'Buy an Omega watch at Kariv Glamour. Discover Omega watches like Speedmaster, Seamaster, Constellation and De Ville with transparent product information and reference numbers.', description_de: 'Omega Uhr kaufen bei Kariv Glamour. Entdecken Sie Omega Uhren wie Speedmaster, Seamaster, Constellation und De Ville mit transparenter Produktinformation und Referenznummern.',
    h1_en: 'Buy an Omega Watch', h1_de: 'Omega Uhr kaufen',
    intro_en: 'If you want to buy an Omega watch, Kariv Glamour offers a curated selection of timepieces. Each watch is presented with transparent product information, reference number visibility and clear condition grading.', intro_de: 'Wenn Sie eine Omega Uhr kaufen möchten, bietet Kariv Glamour eine kuratierte Auswahl an Zeitmessern. Jede Uhr wird mit transparenter Produktinformation, Referenznummern-Sichtbarkeit und klarer Zustandsbewertung präsentiert.',
    collectionFilter: null,
  },
  'omega-gebraucht-kaufen': {
    title_en: 'Buy Pre-Owned Omega | Pre-Owned Omega Watches | Kariv Glamour', title_de: 'Omega gebraucht kaufen | Pre-Owned Omega Uhren | Kariv Glamour',
    description_en: 'Buy pre-owned Omega at Kariv Glamour. Discover tested pre-owned Omega watches with clear condition grading, box and papers information and detailed product presentation.', description_de: 'Omega gebraucht kaufen bei Kariv Glamour. Entdecken Sie geprüfte pre-owned Omega Uhren mit klarer Zustandsbewertung, Box und Papiere Informationen und detaillierter Produktpräsentation.',
    h1_en: 'Buy Pre-Owned Omega', h1_de: 'Omega gebraucht kaufen',
    intro_en: 'If you want to buy a pre-owned Omega, Kariv Glamour offers a curated selection of pre-owned timepieces. Each watch is presented with clear condition grading, box and papers information and reference number visibility.', intro_de: 'Wenn Sie eine Omega gebraucht kaufen möchten, bietet Kariv Glamour eine kuratierte Auswahl an pre-owned Zeitmessern. Jede Uhr wird mit klarer Zustandsbewertung, Box und Papiere Informationen und Referenznummern-Sichtbarkeit präsentiert.',
    collectionFilter: { isCertifiedPreOwned: true },
  },
  'gebrauchte-omega-uhren': {
    title_en: 'Used Omega Watches | Kariv Glamour', title_de: 'Gebrauchte Omega Uhren | Used Omega Watches | Kariv Glamour',
    description_en: 'Browse used Omega watches at Kariv Glamour. Speedmaster, Seamaster, Constellation and De Ville — with transparent condition grading and reference numbers.', description_de: 'Stöbern Sie durch gebrauchte Omega Uhren bei Kariv Glamour. Von der Speedmaster über die Seamaster bis zur Constellation — jede Uhr wird mit transparenter Zustandsbewertung und vollständigen Produktinformationen präsentiert.',
    h1_en: 'Used Omega Watches', h1_de: 'Gebrauchte Omega Uhren',
    intro_en: 'Browse used Omega watches at Kariv Glamour. From Speedmaster to Seamaster to Constellation — each watch is presented with transparent condition grading and complete product information.', intro_de: 'Stöbern Sie durch gebrauchte Omega Uhren bei Kariv Glamour. Von der Speedmaster über die Seamaster bis zur Constellation — jede Uhr wird mit transparenter Zustandsbewertung und vollständigen Produktinformationen präsentiert.',
    collectionFilter: { isCertifiedPreOwned: true },
  },
  'omega-speedmaster-kaufen': {
    title_en: 'Buy Omega Speedmaster | Moonwatch & Chronographs | Kariv Glamour', title_de: 'Omega Speedmaster kaufen | Moonwatch & Chronographen | Kariv Glamour',
    description_en: 'Buy the Omega Speedmaster at Kariv Glamour. Discover the legendary Omega chronograph, associated with motorsport, space exploration and the Moonwatch legacy.', description_de: 'Omega Speedmaster kaufen bei Kariv Glamour. Entdecken Sie den legendären Omega Chronographen, assoziiert mit Motorsport, Weltraumforschung und der Moonwatch-Tradition.',
    h1_en: 'Buy Omega Speedmaster', h1_de: 'Omega Speedmaster kaufen',
    intro_en: 'The Omega Speedmaster is one of the world\u2019s most recognized chronographs. At Kariv Glamour, you can buy the Speedmaster — with transparent product information and clear condition grading.', intro_de: 'Die Omega Speedmaster ist einer der bekanntesten Chronographen der Welt. Bei Kariv Glamour können Sie die Speedmaster kaufen — mit transparenter Produktinformation und klarer Zustandsbewertung.',
    collectionFilter: { collection: 'Speedmaster' },
  },
  'omega-moonwatch-kaufen': {
    title_en: 'Buy Omega Moonwatch | Speedmaster Moonwatch | Kariv Glamour', title_de: 'Omega Moonwatch kaufen | Speedmaster Moonwatch | Kariv Glamour',
    description_en: 'Buy the Omega Moonwatch at Kariv Glamour. Discover the Omega Speedmaster Moonwatch, one of the most recognized chronographs in watch history.', description_de: 'Omega Moonwatch kaufen bei Kariv Glamour. Entdecken Sie die Omega Speedmaster Moonwatch, eine der bekanntesten Chronographen der Uhrengeschichte.',
    h1_en: 'Buy Omega Moonwatch', h1_de: 'Omega Moonwatch kaufen',
    intro_en: 'The Omega Speedmaster Moonwatch is one of the most iconic chronographs in watch history. At Kariv Glamour, you can buy the Moonwatch — with transparent product information and clear condition grading.', intro_de: 'Die Omega Speedmaster Moonwatch ist einer der ikonischsten Chronographen der Uhrengeschichte. Bei Kariv Glamour können Sie die Moonwatch kaufen — mit transparenter Produktinformation und klarer Zustandsbewertung.',
    collectionFilter: { collection: 'Speedmaster' },
  },
  'omega-seamaster-kaufen': {
    title_en: 'Buy Omega Seamaster | Aqua Terra, Diver 300M & Planet Ocean | Kariv Glamour', title_de: 'Omega Seamaster kaufen | Aqua Terra, Diver 300M & Planet Ocean | Kariv Glamour',
    description_en: 'Buy the Omega Seamaster at Kariv Glamour. Discover Omega Seamaster watches from Aqua Terra and Diver 300M to Planet Ocean and Ultra Deep.', description_de: 'Omega Seamaster kaufen bei Kariv Glamour. Entdecken Sie Omega Seamaster Uhren von Aqua Terra und Diver 300M bis Planet Ocean und Ultra Deep.',
    h1_en: 'Buy Omega Seamaster', h1_de: 'Omega Seamaster kaufen',
    intro_en: 'The Omega Seamaster is an ocean-inspired collection built for dive watches, maritime design and robust everyday performance. At Kariv Glamour, you can buy the Seamaster — with transparent product information.', intro_de: 'Die Omega Seamaster ist eine ozean-inspirierte Kollektion, die für Taucheruhren, maritimes Design und robuste Alltagsleistung steht. Bei Kariv Glamour können Sie die Seamaster kaufen — mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Seamaster' },
  },
  'omega-seamaster-diver-300m-kaufen': {
    title_en: 'Buy Omega Seamaster Diver 300M | Kariv Glamour', title_de: 'Omega Seamaster Diver 300M kaufen | Kariv Glamour',
    description_en: 'Buy the Omega Seamaster Diver 300M at Kariv Glamour. Shop the Diver 300M with distinctive styling, professional dive-watch character and strong modern appeal.', description_de: 'Omega Seamaster Diver 300M kaufen bei Kariv Glamour. Shoppen Sie die Diver 300M mit markantem Design, professionellem Taucheruhren-Charakter und starkem modernem Appeal.',
    h1_en: 'Buy Omega Seamaster Diver 300M', h1_de: 'Omega Seamaster Diver 300M kaufen',
    intro_en: 'The Omega Seamaster Diver 300M is an iconic dive watch, known for its distinctive design and professional diving spirit. At Kariv Glamour, you can buy the Diver 300M — with transparent product information.', intro_de: 'Die Omega Seamaster Diver 300M ist eine ikonische Taucheruhr, bekannt für ihr markantes Design und ihren professionellen Tauchgeist. Bei Kariv Glamour können Sie die Diver 300M kaufen — mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Seamaster' },
  },
  'omega-seamaster-planet-ocean-kaufen': {
    title_en: 'Buy Omega Seamaster Planet Ocean | Kariv Glamour', title_de: 'Omega Seamaster Planet Ocean kaufen | Kariv Glamour',
    description_en: 'Buy the Omega Seamaster Planet Ocean at Kariv Glamour. Discover Planet Ocean watches designed for depth, durability and powerful dive-watch presence.', description_de: 'Omega Seamaster Planet Ocean kaufen bei Kariv Glamour. Entdecken Sie Planet Ocean Uhren, konzipiert für Tiefe, Haltbarkeit und kraftvolle Taucheruhren-Präsenz.',
    h1_en: 'Buy Omega Seamaster Planet Ocean', h1_de: 'Omega Seamaster Planet Ocean kaufen',
    intro_en: 'The Omega Seamaster Planet Ocean is a powerful dive-watch collection inspired by Omega\u2019s maritime heritage. At Kariv Glamour, you can buy the Planet Ocean — with transparent product information.', intro_de: 'Die Omega Seamaster Planet Ocean ist eine kraftvolle Taucheruhren-Kollektion, inspiriert von Omegas maritimer Tradition. Bei Kariv Glamour können Sie die Planet Ocean kaufen — mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Seamaster' },
  },
  'omega-seamaster-aqua-terra-kaufen': {
    title_en: 'Buy Omega Seamaster Aqua Terra | Kariv Glamour', title_de: 'Omega Seamaster Aqua Terra kaufen | Kariv Glamour',
    description_en: 'Buy the Omega Seamaster Aqua Terra at Kariv Glamour. A versatile Seamaster model line combining sport, elegance and everyday wearability.', description_de: 'Omega Seamaster Aqua Terra kaufen bei Kariv Glamour. Eine vielseitige Seamaster-Modellreihe, die Sport, Eleganz und alltägliche Tragbarkeit vereint.',
    h1_en: 'Buy Omega Seamaster Aqua Terra', h1_de: 'Omega Seamaster Aqua Terra kaufen',
    intro_en: 'The Omega Seamaster Aqua Terra 150M combines sport, elegance and everyday wearability with a nautical character. At Kariv Glamour, you can buy the Aqua Terra — with transparent product information.', intro_de: 'Die Omega Seamaster Aqua Terra 150M vereint Sport, Eleganz und alltägliche Tragbarkeit mit einem nautischen Charakter. Bei Kariv Glamour können Sie die Aqua Terra kaufen — mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Seamaster' },
  },
  'omega-constellation-kaufen': {
    title_en: 'Buy Omega Constellation | Kariv Glamour', title_de: 'Omega Constellation kaufen | Kariv Glamour',
    description_en: 'Buy the Omega Constellation at Kariv Glamour. Discover an elegant Omega collection with distinctive case details, integrated bracelet styling and refined luxury.', description_de: 'Omega Constellation kaufen bei Kariv Glamour. Entdecken Sie eine elegante Omega Kollektion mit markanten Gehäusedetails, integriertem Armband-Styling und verfeinertem Luxus.',
    h1_en: 'Buy Omega Constellation', h1_de: 'Omega Constellation kaufen',
    intro_en: 'The Omega Constellation is an elegant collection known for distinctive case details and integrated bracelet styling. At Kariv Glamour, you can buy the Constellation — with transparent product information.', intro_de: 'Die Omega Constellation ist eine elegante Kollektion, die für markante Gehäusedetails und integriertes Armband-Styling steht. Bei Kariv Glamour können Sie die Constellation kaufen — mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Constellation' },
  },
  'omega-de-ville-kaufen': {
    title_en: 'Buy Omega De Ville | Dress Watches | Kariv Glamour', title_de: 'Omega De Ville kaufen | Dress Watches | Kariv Glamour',
    description_en: 'Buy the Omega De Ville at Kariv Glamour. Discover a refined Omega dress-watch family focused on elegance, classic styling and sophisticated watchmaking.', description_de: 'Omega De Ville kaufen bei Kariv Glamour. Entdecken Sie eine verfeinerte Omega Dress-Watch-Familie mit Fokus auf Eleganz, klassisches Styling und anspruchsvolle Uhrmacherei.',
    h1_en: 'Buy Omega De Ville', h1_de: 'Omega De Ville kaufen',
    intro_en: 'The Omega De Ville is a refined dress-watch family known for elegance and sophisticated watchmaking. At Kariv Glamour, you can buy the De Ville — with transparent product information.', intro_de: 'Die Omega De Ville ist eine verfeinerte Dress-Watch-Familie, die für Eleganz und anspruchsvolle Uhrmacherei steht. Bei Kariv Glamour können Sie die De Ville kaufen — mit transparenter Produktinformation.',
    collectionFilter: { collection: 'De Ville' },
  },
  'omega-herren': {
    title_en: 'Buy Omega for Men | Men\u2019s Omega Watches | Kariv Glamour', title_de: 'Omega für Herren kaufen | Herren Omega Uhren | Kariv Glamour',
    description_en: 'Buy Omega for men at Kariv Glamour. Discover Omega men\u2019s watches — from Speedmaster to Seamaster — with transparent product information.', description_de: 'Omega für Herren kaufen bei Kariv Glamour. Entdecken Sie Omega Herrenuhren — von der Speedmaster bis zur Seamaster — mit transparenter Produktinformation.',
    h1_en: 'Omega for Men', h1_de: 'Omega für Herren',
    intro_en: 'Discover Omega watches for men at Kariv Glamour. From professional dive watches to elegant chronographs — each watch is presented with transparent product information.', intro_de: 'Entdecken Sie Omega Uhren für Herren bei Kariv Glamour. Von professionellen Taucheruhren bis zu eleganten Chronographen — jede Uhr wird mit transparenter Produktinformation präsentiert.',
    collectionFilter: { gender: 'Men' },
  },
  'omega-damen': {
    title_en: 'Buy Omega for Women | Women\u2019s Omega Watches | Kariv Glamour', title_de: 'Omega für Damen kaufen | Damen Omega Uhren | Kariv Glamour',
    description_en: 'Buy Omega for women at Kariv Glamour. Discover Omega women\u2019s watches — from Constellation to De Ville — with transparent product information.', description_de: 'Omega für Damen kaufen bei Kariv Glamour. Entdecken Sie Omega Damenuhren — von der Constellation bis zur De Ville — mit transparenter Produktinformation.',
    h1_en: 'Omega for Women', h1_de: 'Omega für Damen',
    intro_en: 'Discover Omega watches for women at Kariv Glamour. From Constellation to De Ville Ladymatic — each watch is presented with transparent product information.', intro_de: 'Entdecken Sie Omega Uhren für Damen bei Kariv Glamour. Von der Constellation bis zur De Ville Ladymatic — jede Uhr wird mit transparenter Produktinformation präsentiert.',
    collectionFilter: { gender: 'Women' },
  },
  'welche-omega-kaufen': {
    title_en: 'Which Omega to Buy? | Omega Buying Guide | Kariv Glamour', title_de: 'Welche Omega kaufen? | Omega Kaufberatung | Kariv Glamour',
    description_en: 'Which Omega to buy? Read the Omega buying guide at Kariv Glamour to compare Speedmaster, Seamaster, Constellation and De Ville and find the right model.', description_de: 'Welche Omega kaufen? Lesen Sie die Omega Kaufberatung bei Kariv Glamour, um Speedmaster, Seamaster, Constellation und De Ville zu vergleichen und das richtige Modell zu finden.',
    h1_en: 'Which Omega to Buy?', h1_de: 'Welche Omega kaufen?',
    intro_en: 'Choosing the right Omega depends on your lifestyle, taste and budget. The Speedmaster is an iconic chronograph, the Seamaster a professional dive watch. This guide helps you make the right decision.', intro_de: 'Die Wahl der richtigen Omega hängt von Ihrem Lebensstil, Geschmack und Budget ab. Die Speedmaster ist ein ikonischer Chronograph, die Seamaster eine professionelle Taucheruhr. Dieser Guide hilft Ihnen, die richtige Entscheidung zu treffen.',
    collectionFilter: null, isGuide: true,
  },
  'omega-speedmaster-oder-seamaster': {
    title_en: 'Omega Speedmaster or Seamaster? | Kariv Glamour', title_de: 'Omega Speedmaster oder Seamaster? | Kariv Glamour',
    description_en: 'Omega Speedmaster or Seamaster? Compare both collections at Kariv Glamour to find the right Omega for your needs.', description_de: 'Omega Speedmaster oder Seamaster? Vergleichen Sie beide Kollektionen bei Kariv Glamour, um die richtige Omega für Ihre Bedürfnisse zu finden.',
    h1_en: 'Omega Speedmaster or Seamaster?', h1_de: 'Omega Speedmaster oder Seamaster?',
    intro_en: 'Should you buy an Omega Speedmaster or Seamaster? The Speedmaster is a legendary chronograph for space and motorsport, while the Seamaster is an ocean-inspired dive watch. Both have unique advantages.', intro_de: 'Sollten Sie eine Omega Speedmaster oder Seamaster kaufen? Die Speedmaster ist ein legendärer Chronograph für Weltraum und Motorsport, während die Seamaster eine ozean-inspirierte Taucheruhr ist. Beide haben einzigartige Vorteile.',
    collectionFilter: null, isGuide: true,
  },
  'omega-neu-oder-gebraucht': {
    title_en: 'Omega New or Pre-Owned? | Kariv Glamour', title_de: 'Omega neu oder gebraucht kaufen? | Kariv Glamour',
    description_en: 'Omega new or pre-owned? Compare the pros and cons of both options at Kariv Glamour to make the right decision.', description_de: 'Omega neu oder gebraucht kaufen? Vergleichen Sie die Vor- und Nachteile beider Optionen bei Kariv Glamour, um die richtige Entscheidung zu treffen.',
    h1_en: 'Omega New or Pre-Owned?', h1_de: 'Omega neu oder gebraucht kaufen?',
    intro_en: 'Should you buy a new or pre-owned Omega? A new Omega offers full warranty and unworn condition, while a pre-owned Omega often offers better value and access to discontinued models.', intro_de: 'Sollten Sie eine Omega neu oder gebraucht kaufen? Eine neue Omega bietet volle Garantie und unbenutzten Zustand, während eine gebrauchte Omega oft ein besseres Preis-Leistungs-Verhältnis und Zugang zu diskontinuierten Modellen bietet.',
    collectionFilter: null, isGuide: true,
  },
  'omega-story': {
    title_en: 'The Omega Story | Heritage & History | Kariv Glamour', title_de: 'The Omega Story | Erbe & Geschichte | Kariv Glamour',
    description_en: 'Discover the Omega Story at Kariv Glamour. Learn about the heritage, precision, space exploration, ocean performance and enduring appeal behind Omega.', description_de: 'Entdecken Sie die Omega Story bei Kariv Glamour. Erfahren Sie über das Erbe, Präzision, Weltraumforschung, Ozeanleistung und die bleibende Anziehungskraft hinter Omega.',
    h1_en: 'The Omega Story', h1_de: 'Die Omega Story',
    intro_en: 'Omega has shaped a history spanning over a century. From Olympic timing to the Moon landing to the ocean-inspired Seamaster — the Omega story is one of precision, innovation and adventure.', intro_de: 'Omega hat eine Geschichte von über einem Jahrhundert geprägt. Von olympischer Zeitmessung über die Mondlandung bis zur ozean-inspirierten Seamaster — die Omega Story ist eine von Präzision, Innovation und Abenteuer.',
    collectionFilter: null, isGuide: true,
  },
  'omega-watchmaking': {
    title_en: 'Omega Watchmaking | Co-Axial & Master Chronometer | Kariv Glamour', title_de: 'Omega Uhrmacherei | Co-Axial & Master Chronometer | Kariv Glamour',
    description_en: 'Learn about Omega watchmaking at Kariv Glamour. Co-Axial movements, Master Chronometer certification, calibres, materials and design principles.', description_de: 'Erfahren Sie über Omega Uhrmacherei bei Kariv Glamour. Co-Axial Werke, Master Chronometer Zertifizierung, Kaliber, Materialien und Designprinzipien.',
    h1_en: 'Omega Watchmaking', h1_de: 'Omega Uhrmacherei',
    intro_en: 'Omega watchmaking stands for precision, innovation and reliability. From the revolutionary Co-Axial escapement to Master Chronometer certification — every component is built to the highest standards.', intro_de: 'Omega Uhrmacherei steht für Präzision, Innovation und Zuverlässigkeit. Vom revolutionären Co-Axial-Hemmungssystem bis zur Master Chronometer Zertifizierung — jede Komponente ist für höchste Standards konstruiert.',
    collectionFilter: null, isGuide: true,
  },
  'omega-maintenance': {
    title_en: 'Omega Maintenance | Care & Servicing | Kariv Glamour', title_de: 'Omega Wartung | Pflege & Service | Kariv Glamour',
    description_en: 'Omega maintenance and care at Kariv Glamour. Learn how to care for an Omega watch and preserve its condition, reliability and long-term value.', description_de: 'Omega Wartung und Pflege bei Kariv Glamour. Erfahren Sie, wie Sie eine Omega Uhr pflegen und ihren Zustand, ihre Zuverlässigkeit und langfristigen Wert erhalten.',
    h1_en: 'Omega Maintenance', h1_de: 'Omega Wartung',
    intro_en: 'Proper care preserves the beauty, reliability and value of an Omega watch. Regular servicing, water resistance checks, bracelet care and preserving box, papers and service documents contribute to long-term performance.', intro_de: 'Die richtige Pflege erhält die Schönheit, Zuverlässigkeit und den Wert einer Omega Uhr. Regelmäßige Wartung, Wasserdichtigkeitsprüfungen, Armbandpflege und das Erhalten von Box, Papieren und Servicedokumenten tragen zur langfristigen Leistung bei.',
    collectionFilter: null, isGuide: true,
  },
  'omega-master-chronometer-guide': {
    title_en: 'Omega Master Chronometer Guide | Kariv Glamour', title_de: 'Omega Master Chronometer Guide | Kariv Glamour',
    description_en: 'Learn everything about the Omega Master Chronometer certification at Kariv Glamour. Precision, magnetic resistance and water resistance at the highest standard.', description_de: 'Erfahren Sie alles über die Omega Master Chronometer Zertifizierung bei Kariv Glamour. Präzision, Magnetresistenz und Wasserdichtigkeit auf höchstem Standard.',
    h1_en: 'Omega Master Chronometer Guide', h1_de: 'Omega Master Chronometer Guide',
    intro_en: 'The Master Chronometer certification is one of the highest standards in Swiss watchmaking. It guarantees precision, magnetic resistance and water resistance through independent testing.', intro_de: 'Die Master Chronometer Zertifizierung ist einer der höchsten Standards in der Schweizer Uhrmacherei. Sie garantiert Präzision, Magnetresistenz und Wasserdichtigkeit durch unabhängige Prüfung.',
    collectionFilter: null, isGuide: true,
  },
  'omega-co-axial-guide': {
    title_en: 'Omega Co-Axial Guide | Kariv Glamour', title_de: 'Omega Co-Axial Guide | Kariv Glamour',
    description_en: 'Learn everything about the Omega Co-Axial escapement at Kariv Glamour. Reduced friction, improved precision and longer service intervals.', description_de: 'Erfahren Sie alles über die Omega Co-Axial Hemmung bei Kariv Glamour. Reduzierte Reibung, verbesserte Präzision und längere Serviceintervalle.',
    h1_en: 'Omega Co-Axial Guide', h1_de: 'Omega Co-Axial Guide',
    intro_en: 'The Co-Axial escapement is an Omega-developed innovation that reduces friction and improves long-term precision and service intervals. It is one of the key innovations in modern Omega watchmaking.', intro_de: 'Die Co-Axial Hemmung ist eine von Omega entwickelte Innovation, die Reibung reduziert und die langfristige Präzision sowie Serviceintervalle verbessert. Sie ist eine der wichtigsten Innovationen der modernen Omega Uhrmacherei.',
    collectionFilter: null, isGuide: true,
  },
};
