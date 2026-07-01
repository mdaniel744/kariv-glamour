// Panerai collections, filters, and SEO data
// Panerai is positioned around bold Italian design, large cases, strong wrist presence,
// luminous dials, cushion cases, crown-protecting bridge, military/diving heritage,
// and masculine tool-watch styling.

const IMG_LUMINOR_MARINA = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/adaf5b6ae_LuminorMarina44mmPanerai.jpg';
const IMG_LUMINOR_BLUE = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/5e675af64_PaneraiLuminorPAM01085.jpg';
const IMG_SUBMERSIBLE_CARBON = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/4ff4ed57d_PaneraiLuminorSubmersibleCarbonHerrenuhr.webp';
const IMG_LUMINOR_BROWN = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/b4d15186c_PaneraiLuminor.png';
const IMG_LUMINOR_STEALTH = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/0681edc57_PaneraiUhren-SetinklWechselarmbandLuminorMarinaPAM01662kaufen.jpg';

export const PANERAI_HERO_IMAGE = IMG_LUMINOR_MARINA;
export const PANERAI_STORY_IMAGE = IMG_LUMINOR_BROWN;

export const PANERAI_COLLECTIONS = [
  { id: 1, name: 'Luminor', slug: 'luminor', image: IMG_LUMINOR_BLUE,
    shortDescription_en: "Panerai's most recognizable watch family, known for its bold cushion case, crown-protecting bridge, luminous dial design and strong everyday presence.",
    shortDescription_de: "Panerais bekannteste Uhrenfamilie, bekannt für das markante Cushion-Gehäuse, die kronenschützende Brücke, leuchtende Zifferblätter und starke Alltagspräsenz." },
  { id: 2, name: 'Luminor Marina', slug: 'luminor-marina', image: IMG_LUMINOR_MARINA,
    shortDescription_en: "A key Luminor subfamily with small seconds, strong Panerai identity and broad appeal among collectors looking for classic Panerai design.",
    shortDescription_de: "Eine wichtige Luminor-Subfamilie mit kleinen Sekunden, starker Panerai-Identität und breiter Beliebtheit bei Sammlern, die klassisches Panerai-Design suchen." },
  { id: 3, name: 'Radiomir', slug: 'radiomir', image: '',
    shortDescription_en: "A historic Panerai collection with cushion-shaped cases, wire lugs, vintage military character and a cleaner dress-tool watch profile.",
    shortDescription_de: "Eine historische Panerai-Kollektion mit Cushion-Gehäusen, Drahtbandstegen, militärischem Vintage-Charakter und einem saubereren Dress-Tool-Watch-Profil." },
  { id: 4, name: 'Submersible', slug: 'submersible', image: IMG_SUBMERSIBLE_CARBON,
    shortDescription_en: "Panerai's technical dive-watch collection, built around water resistance, rotating bezels, bold materials and sport-focused design.",
    shortDescription_de: "Panerais technische Tauchuhr-Kollektion, konzipiert für Wasserfestigkeit, drehbare Lünetten, mutige Materialien und sportliches Design." },
  { id: 5, name: 'Luminor Due', slug: 'luminor-due', image: '',
    shortDescription_en: "A slimmer and more refined Panerai collection with lighter proportions, elegant styling and versatile sizes for daily wear.",
    shortDescription_de: "Eine schlankere und verfeinerte Panerai-Kollektion mit leichteren Proportionen, elegantem Stil und vielseitigen Größen für das tägliche Tragen." },
];

export const PANERAI_CASE_MATERIALS = ['Stainless Steel', 'Titanium', 'Carbotech', 'BMG-Tech', 'Goldtech', 'Bronze', 'Ceramic', 'Black Ceramic', 'Platinum', 'Composite'];
export const PANERAI_MOVEMENTS = ['Automatic', 'Manual-winding', 'Manufacture Calibre', 'P.9010', 'P.9012', 'P.5000', 'P.6000', 'P.4000'];
export const PANERAI_DIAL_COLORS = ['Black', 'Blue', 'Green', 'Brown', 'Tobacco', 'White', 'Beige', 'Grey', 'Anthracite', 'California dial'];
export const PANERAI_FEATURES = ['Luminor', 'Luminor Marina', 'Radiomir', 'Submersible', 'Luminor Due', 'Small seconds', 'GMT', 'Chronograph', 'Power reserve', '8 Days', '3 Days', 'Marina Militare', 'Destro / left-handed crown', 'Sandwich dial', 'California dial', 'Cushion case', 'Crown-protecting bridge', 'Dive watch', 'Limited edition', 'Full set'];
export const PANERAI_WATCH_TYPES = ['Mechanical', 'Quartz'];
export const PANERAI_BRACELETS = ['Leather', 'Alligator leather', 'Rubber', 'Caoutchouc', 'Textile', 'Canvas', 'Velcro', 'Steel bracelet', 'Titanium bracelet'];
export const PANERAI_CASE_SIZES = ['38 mm', '40 mm', '42 mm', '44 mm', '45 mm', '47 mm'];
export const PANERAI_TYPES = ['New', 'Pre-Owned', 'Vintage'];
export const PANERAI_BOX_PAPERS = ['Box included', 'Papers included', 'Full set'];
export const PANERAI_AVAILABILITY = ['In Stock', 'Reserved', 'Coming Soon', 'Sold'];

export const PANERAI_QUICK_FILTERS = [
  { label_en: 'Luminor', label_de: 'Luminor', link: '/panerai/luminor' },
  { label_en: 'Luminor Marina', label_de: 'Luminor Marina', link: '/panerai/luminor-marina' },
  { label_en: 'Radiomir', label_de: 'Radiomir', link: '/panerai/radiomir' },
  { label_en: 'Submersible', label_de: 'Submersible', link: '/panerai/submersible' },
  { label_en: 'Luminor Due', label_de: 'Luminor Due', link: '/panerai/luminor-due' },
  { label_en: "Men's", label_de: 'Herren', link: '/panerai-uhr-herren' },
  { label_en: 'Pre-Owned', label_de: 'Gebraucht', link: '/panerai-gebraucht' },
];

export const PANERAI_SEO_CARDS = [
  { title_en: 'Panerai Watch', title_de: 'Panerai Uhr', link: '/panerai-uhr',
    description_en: 'Explore Panerai watches at Kariv Glamour — Luminor, Radiomir, Submersible and Luminor Due with bold design and diving heritage.',
    description_de: 'Entdecken Sie Panerai Uhren bei Kariv Glamour — Luminor, Radiomir, Submersible und Luminor Due mit markantem Design und Taucher-Heritage.' },
  { title_en: 'Panerai Watches', title_de: 'Panerai Uhren', link: '/panerai-uhren',
    description_en: 'Panerai watches at Kariv Glamour — cushion cases, crown-protecting bridge and luminous dials.',
    description_de: 'Panerai Uhren bei Kariv Glamour — Cushion-Gehäuse, kronenschützende Brücke und leuchtende Zifferblätter.' },
  { title_en: "Panerai Men's Watches", title_de: 'Panerai Uhr Herren', link: '/panerai-uhr-herren',
    description_en: "Panerai men's watches at Kariv Glamour — Luminor, Radiomir and Submersible models for men.",
    description_de: 'Panerai Herrenuhren bei Kariv Glamour — Luminor, Radiomir und Submersible Modelle für Männer.' },
  { title_en: 'Panerai Luminor', title_de: 'Panerai Luminor', link: '/panerai/luminor',
    description_en: 'Discover the Panerai Luminor collection — the bold cushion case with crown-protecting bridge and luminous dial.',
    description_de: 'Entdecken Sie die Panerai Luminor Kollektion — das markante Cushion-Gehäuse mit kronenschützender Brücke und leuchtendem Zifferblatt.' },
  { title_en: 'Panerai Luminor Marina', title_de: 'Panerai Luminor Marina', link: '/panerai/luminor-marina',
    description_en: 'Discover the Panerai Luminor Marina — small seconds, strong Panerai identity and classic design.',
    description_de: 'Entdecken Sie die Panerai Luminor Marina — kleine Sekunden, starke Panerai-Identität und klassisches Design.' },
  { title_en: 'Panerai Submersible', title_de: 'Panerai Submersible', link: '/panerai/submersible',
    description_en: 'Discover the Panerai Submersible — technical dive watches with rotating bezel and bold materials.',
    description_de: 'Entdecken Sie die Panerai Submersible — technische Tauchuhren mit drehbarer Lünette und mutigen Materialien.' },
];

export const PANERAI_READ_MORE = [
  { title_en: 'Panerai Story', title_de: 'Panerai Story', link: '/panerai/story',
    description_en: "Explore Panerai's heritage of Italian design, Swiss watchmaking and military diving tradition.",
    description_de: 'Entdecken Sie Panerais Heritage von italienischem Design, Schweizer Uhrmacherkunst und militärischer Taucher-Tradition.' },
  { title_en: 'Panerai Luminor Guide', title_de: 'Panerai Luminor Guide', link: '/panerai/luminor',
    description_en: 'Understand the Panerai Luminor family — cushion case, crown-protecting bridge and luminous dials.',
    description_de: 'Verstehen Sie die Panerai Luminor Familie — Cushion-Gehäuse, kronenschützende Brücke und leuchtende Zifferblätter.' },
  { title_en: 'Panerai Radiomir Guide', title_de: 'Panerai Radiomir Guide', link: '/panerai/radiomir',
    description_en: 'Discover the Panerai Radiomir — historic cushion cases, wire lugs and military vintage character.',
    description_de: 'Entdecken Sie die Panerai Radiomir — historische Cushion-Gehäuse, Drahtbandstege und militärischen Vintage-Charakter.' },
  { title_en: 'Panerai Submersible Guide', title_de: 'Panerai Submersible Guide', link: '/panerai/submersible',
    description_en: 'Understand the Panerai Submersible — technical dive watches with rotating bezel and sporty design.',
    description_de: 'Verstehen Sie die Panerai Submersible — technische Tauchuhren mit drehbarer Lünette und sportlichem Design.' },
  { title_en: 'Buying Pre-Owned Panerai', title_de: 'Gebrauchte Panerai kaufen', link: '/panerai-gebraucht',
    description_en: 'What to check before buying a used Panerai — condition, box and papers, reference number, and authentication.',
    description_de: 'Was Sie vor dem Kauf einer gebrauchten Panerai prüfen sollten — Zustand, Box und Papiere, Referenznummer und Authentifizierung.' },
];

export const PANERAI_INTERNAL_LINKS = [
  {
    title_en: 'Popular Panerai Searches', title_de: 'Beliebte Panerai Suchen',
    links: [
      { label_en: 'Panerai Watch', label_de: 'Panerai Uhr', to: '/panerai-uhr' },
      { label_en: 'Panerai Watches', label_de: 'Panerai Uhren', to: '/panerai-uhren' },
      { label_en: "Panerai Men's Watches", label_de: 'Panerai Uhr Herren', to: '/panerai-uhr-herren' },
      { label_en: 'Panerai Luminor', label_de: 'Panerai Luminor', to: '/panerai/luminor' },
      { label_en: 'Panerai Luminor Marina', label_de: 'Panerai Luminor Marina', to: '/panerai/luminor-marina' },
      { label_en: 'Panerai Submersible', label_de: 'Panerai Submersible', to: '/panerai/submersible' },
    ],
  },
  {
    title_en: 'Panerai Collections', title_de: 'Panerai Kollektionen',
    links: [
      { label_en: 'Luminor', label_de: 'Luminor', to: '/panerai/luminor' },
      { label_en: 'Luminor Marina', label_de: 'Luminor Marina', to: '/panerai/luminor-marina' },
      { label_en: 'Radiomir', label_de: 'Radiomir', to: '/panerai/radiomir' },
      { label_en: 'Submersible', label_de: 'Submersible', to: '/panerai/submersible' },
      { label_en: 'Luminor Due', label_de: 'Luminor Due', to: '/panerai/luminor-due' },
    ],
  },
  {
    title_en: 'Buy & Pre-Owned', title_de: 'Kaufen & Gebraucht',
    links: [
      { label_en: 'Buy Panerai', label_de: 'Panerai kaufen', to: '/panerai-kaufen' },
      { label_en: 'Buy Panerai Watch', label_de: 'Panerai Uhr kaufen', to: '/panerai-uhr-kaufen' },
      { label_en: 'Pre-Owned Panerai', label_de: 'Panerai gebraucht', to: '/panerai-gebraucht' },
      { label_en: 'Pre-Owned Panerai Watches', label_de: 'Gebrauchte Panerai Uhren', to: '/gebrauchte-panerai-uhren' },
      { label_en: 'Buy Panerai Luminor', label_de: 'Panerai Luminor kaufen', to: '/panerai-luminor-kaufen' },
    ],
  },
  {
    title_en: 'Models & Features', title_de: 'Modelle & Funktionen',
    links: [
      { label_en: 'Panerai Luminor Marina', label_de: 'Panerai Luminor Marina', to: '/panerai-luminor-marina' },
      { label_en: 'Panerai Luminor 44mm', label_de: 'Panerai Luminor 44mm', to: '/panerai-luminor-44mm' },
      { label_en: 'Panerai Submersible 42mm', label_de: 'Panerai Submersible 42mm', to: '/panerai-submersible-42mm' },
      { label_en: 'Panerai Radiomir 1940', label_de: 'Panerai Radiomir 1940', to: '/panerai-radiomir-1940' },
      { label_en: 'Panerai 8 Days', label_de: 'Panerai 8 Days', to: '/panerai-8-days' },
      { label_en: 'Panerai Destro', label_de: 'Panerai Destro', to: '/panerai-destro' },
    ],
  },
  {
    title_en: 'Guides & Resources', title_de: 'Ratgeber & Guides',
    links: [
      { label_en: 'Which Panerai to Buy?', label_de: 'Welche Panerai kaufen?', to: '/welche-panerai-uhr-kaufen' },
      { label_en: 'Luminor vs Radiomir', label_de: 'Luminor vs Radiomir', to: '/panerai-luminor-vs-radiomir' },
      { label_en: 'Luminor vs Submersible', label_de: 'Luminor vs Submersible', to: '/panerai-luminor-vs-submersible' },
      { label_en: 'Panerai Watch Price', label_de: 'Panerai Uhr Preis', to: '/panerai-uhr-preis' },
      { label_en: 'Panerai Story', label_de: 'Panerai Story', to: '/panerai/story' },
    ],
  },
  {
    title_en: 'Related Luxury Watch Brands', title_de: 'Verwandte Luxusuhren-Marken',
    links: [
      { label_en: 'Rolex watches', label_de: 'Rolex Uhren', to: '/brands/rolex' },
      { label_en: 'Omega watches', label_de: 'Omega Uhren', to: '/brands/omega' },
      { label_en: 'Tudor watches', label_de: 'Tudor Uhren', to: '/brands/tudor' },
      { label_en: 'Breitling watches', label_de: 'Breitling Uhren', to: '/brands/breitling' },
      { label_en: 'IWC watches', label_de: 'IWC Uhren', to: '/brands/iwc-schaffhausen' },
      { label_en: 'TAG Heuer watches', label_de: 'TAG Heuer Uhren', to: '/brands/tag-heuer' },
    ],
  },
];

export const PANERAI_FAQS = [
  {
    q_en: 'Where can I buy a Panerai watch online?', q_de: 'Wo kann ich eine Panerai Uhr online kaufen?',
    a_en: "You can buy Panerai watches online at Kariv Glamour. Browse new and <a href='/panerai-gebraucht'>pre-owned Panerai watches</a> with transparent product details, reference numbers, and condition grading.",
    a_de: "Sie können Panerai Uhren online bei Kariv Glamour kaufen. Stöbern Sie durch neue und <a href='/panerai-gebraucht'>gebrauchte Panerai Uhren</a> mit transparenten Produktdetails, Referenznummern und Zustandsbewertung." },
  {
    q_en: 'What is the most popular Panerai watch?', q_de: 'Was ist die beliebteste Panerai Uhr?',
    a_en: "The most popular Panerai watch is the <a href='/panerai/luminor-marina'>Luminor Marina</a> — a bold chronometer with small seconds sub-dial that embodies Panerai's strongest identity with crown-protecting bridge and luminous dial.",
    a_de: "Die beliebteste Panerai Uhr ist die <a href='/panerai/luminor-marina'>Luminor Marina</a> — ein markanter Chronometer mit kleinem Sekundenzähler, der Panerais stärkste Identität mit kronenschützender Brücke und leuchtendem Zifferblatt verkörpert." },
  {
    q_en: 'What is the difference between Panerai Luminor and Radiomir?', q_de: 'Was ist der Unterschied zwischen Panerai Luminor und Radiomir?',
    a_en: "The <a href='/panerai/luminor'>Luminor</a> has a cushion case with the iconic crown-protecting bridge, while the <a href='/panerai/radiomir'>Radiomir</a> has a historic cushion case with wire lugs and no crown bridge. Read our comparison: <a href='/panerai-luminor-vs-radiomir'>Luminor vs Radiomir</a>.",
    a_de: "Die <a href='/panerai/luminor'>Luminor</a> hat ein Cushion-Gehäuse mit der ikonischen kronenschützenden Brücke, während die <a href='/panerai/radiomir'>Radiomir</a> ein historisches Cushion-Gehäuse mit Drahtbandstegen und ohne Kronenbrücke hat. Lesen Sie unseren Vergleich: <a href='/panerai-luminor-vs-radiomir'>Luminor vs Radiomir</a>." },
  {
    q_en: 'What is Panerai Luminor Marina?', q_de: 'Was ist Panerai Luminor Marina?',
    a_en: "The <a href='/panerai/luminor-marina'>Panerai Luminor Marina</a> is a subfamily of the Luminor with a small seconds sub-dial at 9 o'clock. It is one of the most popular Panerai models and embodies classic Panerai design with crown-protecting bridge and luminous dial.",
    a_de: "Die <a href='/panerai/luminor-marina'>Panerai Luminor Marina</a> ist eine Subfamilie der Luminor mit einem kleinen Sekundenzähler bei 9 Uhr. Sie ist eines der beliebtesten Panerai Modelle und verkörpert das klassische Panerai Design mit kronenschützender Brücke und leuchtendem Zifferblatt." },
  {
    q_en: 'Is Panerai Submersible a dive watch?', q_de: 'Ist die Panerai Submersible eine Tauchuhr?',
    a_en: "Yes. The <a href='/panerai/submersible'>Panerai Submersible</a> is a professional dive watch with rotating bezel, high water resistance and bold materials like Carbotech and bronze. Read our comparison: <a href='/panerai-luminor-vs-submersible'>Luminor vs Submersible</a>.",
    a_de: "Ja. Die <a href='/panerai/submersible'>Panerai Submersible</a> ist eine professionelle Tauchuhr mit drehbarer Lünette, hoher Wasserfestigkeit und mutigen Materialien wie Carbotech und Bronze. Lesen Sie unseren Vergleich: <a href='/panerai-luminor-vs-submersible'>Luminor vs Submersible</a>." },
  {
    q_en: "Are Panerai watches mainly men's watches?", q_de: 'Sind Panerai Uhren hauptsächlich Herrenuhren?',
    a_en: "Yes, Panerai is known for large cases and strong wrist presence, making them traditionally <a href='/panerai-uhr-herren'>men's watches</a>. However, the <a href='/panerai/luminor-due'>Luminor Due</a> collection offers slimmer proportions and more versatile sizes.",
    a_de: "Ja, Panerai ist bekannt für große Gehäuse und starke Handgelenkspräsenz, was sie traditionell zu <a href='/panerai-uhr-herren'>Herrenuhren</a> macht. Die <a href='/panerai/luminor-due'>Luminor Due</a> Kollektion bietet jedoch schlankere Proportionen und vielseitigere Größen." },
  {
    q_en: 'Is it safe to buy a pre-owned Panerai watch?', q_de: 'Ist es sicher, eine gebrauchte Panerai Uhr zu kaufen?',
    a_en: "Yes, buying a <a href='/panerai-gebraucht'>pre-owned Panerai</a> at Kariv Glamour is safe. Each watch is presented with transparent condition grading, reference number visibility, and authentication status. We do not sell replica or counterfeit watches.",
    a_de: "Ja, bei Kariv Glamour ist der Kauf einer <a href='/panerai-gebraucht'>gebrauchten Panerai</a> sicher. Jede Uhr wird mit transparenter Zustandsbewertung, Referenznummer-Sichtbarkeit und Authentifizierungsstatus präsentiert. Wir verkaufen keine Replikate oder gefälschte Uhren." },
  {
    q_en: 'What should I check before buying a used Panerai?', q_de: 'Was sollte ich vor dem Kauf einer gebrauchten Panerai prüfen?',
    a_en: "Check the condition of the case and bracelet, verify the movement (automatic or manual-winding), confirm box and papers, and review the reference number. Visit our <a href='/panerai-gebraucht'>pre-owned Panerai</a> page for transparent listings.",
    a_de: "Prüfen Sie den Zustand von Gehäuse und Armband, verifizieren Sie das Uhrwerk (Automatik oder Handaufzug), bestätigen Sie Box und Papiere, und überprüfen Sie die Referenznummer. Besuchen Sie unsere Seite für <a href='/panerai-gebraucht'>gebrauchte Panerai Uhren</a> mit transparenten Einträgen." },
];

export const PANERAI_SEO_PAGES = {
  'panerai-uhr': {
    h1_en: 'Panerai Watch', h1_de: 'Panerai Uhr',
    title_en: 'Panerai Watch | Kariv Glamour', title_de: 'Panerai Uhr | Kariv Glamour',
    description_en: 'Discover Panerai watches at Kariv Glamour — Luminor, Radiomir, Submersible and Luminor Due with bold design and diving heritage.',
    description_de: 'Entdecken Sie Panerai Uhren bei Kariv Glamour — Luminor, Radiomir, Submersible und Luminor Due mit markantem Design und Taucher-Heritage.',
    intro_en: "Explore Panerai watches at Kariv Glamour — with bold Italian design, cushion cases, crown-protecting bridge, luminous dials and iconic collections such as Luminor, Luminor Marina, Radiomir, Submersible and Luminor Due.",
    intro_de: 'Erkunden Sie Panerai Uhren bei Kariv Glamour — mit markantem italienischem Design, Cushion-Gehäusen, kronenschützender Brücke, leuchtenden Zifferblättern und ikonischen Kollektionen wie Luminor, Luminor Marina, Radiomir, Submersible und Luminor Due.',
    filter: {},
  },
  'panerai-uhren': {
    h1_en: 'Panerai Watches', h1_de: 'Panerai Uhren',
    title_en: 'Panerai Watches | Kariv Glamour', title_de: 'Panerai Uhren | Kariv Glamour',
    description_en: 'Panerai watches at Kariv Glamour — Luminor, Radiomir, Submersible and Luminor Due collections.',
    description_de: 'Panerai Uhren bei Kariv Glamour — Luminor, Radiomir, Submersible und Luminor Due Kollektionen.',
    intro_en: 'Browse Panerai watches by collection, model, movement, case size, condition, and price.',
    intro_de: 'Stöbern Sie durch Panerai Uhren nach Kollektion, Modell, Uhrwerk, Gehäusegröße, Zustand und Preis.',
    filter: {},
  },
  'panerai-watches': {
    h1_en: 'Panerai Watches', h1_de: 'Panerai Watches',
    title_en: 'Panerai Watches | Kariv Glamour', title_de: 'Panerai Watches | Kariv Glamour',
    description_en: 'Panerai watches at Kariv Glamour — Luminor, Radiomir and Submersible.',
    description_de: 'Panerai Watches bei Kariv Glamour — Luminor, Radiomir und Submersible.',
    intro_en: 'Discover Panerai watches at Kariv Glamour — bold Italian design and Swiss watchmaking.',
    intro_de: 'Entdecken Sie Panerai Watches bei Kariv Glamour — markantes italienisches Design und Schweizer Uhrmacherkunst.',
    filter: {},
  },
  'panerai-uhr-herren': {
    h1_en: "Panerai Men's Watches", h1_de: 'Panerai Uhr Herren',
    title_en: "Panerai Men's Watches | Kariv Glamour", title_de: 'Panerai Uhr Herren | Kariv Glamour',
    description_en: "Panerai men's watches at Kariv Glamour — Luminor, Radiomir and Submersible models for men.",
    description_de: 'Panerai Herrenuhren bei Kariv Glamour — Luminor, Radiomir und Submersible Modelle für Männer.',
    intro_en: "Discover Panerai watches for men — from Luminor to Radiomir to Submersible with large cases and strong presence.",
    intro_de: 'Entdecken Sie Panerai Uhren für Herren — von der Luminor über die Radiomir bis zur Submersible mit großen Gehäusen und starker Präsenz.',
    filter: { gender: 'Men' },
  },
  'panerai-kaufen': {
    h1_en: 'Buy Panerai', h1_de: 'Panerai kaufen',
    title_en: 'Buy Panerai | Kariv Glamour', title_de: 'Panerai kaufen | Kariv Glamour',
    description_en: 'Buy Panerai at Kariv Glamour — Luminor, Radiomir, Submersible and more.',
    description_de: 'Panerai kaufen bei Kariv Glamour — Luminor, Radiomir, Submersible und mehr.',
    intro_en: 'Buy Panerai at Kariv Glamour: discover watches from all collections with transparent condition grading.',
    intro_de: 'Panerai kaufen bei Kariv Glamour: entdecken Sie Uhren aus allen Kollektionen mit transparenter Zustandsbewertung.',
    filter: {},
  },
  'panerai-uhr-kaufen': {
    h1_en: 'Buy Panerai Watch', h1_de: 'Panerai Uhr kaufen',
    title_en: 'Buy Panerai Watch | Kariv Glamour', title_de: 'Panerai Uhr kaufen | Kariv Glamour',
    description_en: 'Buy Panerai watch at Kariv Glamour — new and pre-owned models with transparent product information.',
    description_de: 'Panerai Uhr kaufen bei Kariv Glamour — neue und gebrauchte Modelle mit transparenter Produktinformation.',
    intro_en: 'Buy Panerai watch at Kariv Glamour: new and pre-owned models with transparent product information and condition grading.',
    intro_de: 'Panerai Uhr kaufen bei Kariv Glamour: neue und gebrauchte Modelle mit transparenter Produktinformation und Zustandsbewertung.',
    filter: {},
  },
  'panerai-gebraucht': {
    h1_en: 'Pre-Owned Panerai', h1_de: 'Panerai gebraucht',
    title_en: 'Pre-Owned Panerai | Kariv Glamour', title_de: 'Panerai gebraucht | Kariv Glamour',
    description_en: 'Pre-owned Panerai watches at Kariv Glamour with transparent condition grading.',
    description_de: 'Gebrauchte Panerai Uhren bei Kariv Glamour mit transparenter Zustandsbewertung.',
    intro_en: 'Discover pre-owned Panerai watches with clear condition grading, box and papers, and detailed product data.',
    intro_de: 'Entdecken Sie gebrauchte Panerai Uhren mit klarer Zustandsbewertung, Box und Papers und detaillierten Produktdaten.',
    filter: {},
  },
  'panerai-gebraucht-kaufen': {
    h1_en: 'Buy Pre-Owned Panerai', h1_de: 'Panerai gebraucht kaufen',
    title_en: 'Buy Pre-Owned Panerai | Kariv Glamour', title_de: 'Panerai gebraucht kaufen | Kariv Glamour',
    description_en: 'Buy pre-owned Panerai at Kariv Glamour — inspected pre-owned watches with condition reports.',
    description_de: 'Panerai gebraucht kaufen bei Kariv Glamour — geprüfte Gebrauchtuhren mit Zustandsbericht.',
    intro_en: 'Buy pre-owned Panerai at Kariv Glamour: inspected watches with transparent condition reports and authentication.',
    intro_de: 'Panerai gebraucht kaufen bei Kariv Glamour: geprüfte Uhren mit transparentem Zustandsbericht und Authentifizierung.',
    filter: {},
  },
  'gebrauchte-panerai-uhren': {
    h1_en: 'Pre-Owned Panerai Watches', h1_de: 'Gebrauchte Panerai Uhren',
    title_en: 'Pre-Owned Panerai Watches | Kariv Glamour', title_de: 'Gebrauchte Panerai Uhren | Kariv Glamour',
    description_en: 'Pre-owned Panerai watches at Kariv Glamour — Luminor, Radiomir and Submersible with condition grading.',
    description_de: 'Gebrauchte Panerai Uhren bei Kariv Glamour — Luminor, Radiomir und Submersible mit Zustandsbewertung.',
    intro_en: 'Browse pre-owned Panerai watches — from Luminor to Radiomir to Submersible.',
    intro_de: 'Stöbern Sie durch gebrauchte Panerai Uhren — von der Luminor über die Radiomir bis zur Submersible.',
    filter: {},
  },
  'panerai-luminor-kaufen': {
    h1_en: 'Buy Panerai Luminor', h1_de: 'Panerai Luminor kaufen',
    title_en: 'Buy Panerai Luminor | Kariv Glamour', title_de: 'Panerai Luminor kaufen | Kariv Glamour',
    description_en: 'Buy Panerai Luminor at Kariv Glamour — cushion case and crown-protecting bridge.',
    description_de: 'Panerai Luminor kaufen bei Kariv Glamour — Cushion-Gehäuse und kronenschützende Brücke.',
    intro_en: 'Buy Panerai Luminor at Kariv Glamour — bold cushion cases with crown-protecting bridge and luminous dials.',
    intro_de: 'Panerai Luminor kaufen bei Kariv Glamour — markante Cushion-Gehäuse mit kronenschützender Brücke und leuchtenden Zifferblättern.',
    filter: { collection: 'Luminor' },
  },
  'panerai-luminor-marina': {
    h1_en: 'Panerai Luminor Marina', h1_de: 'Panerai Luminor Marina',
    title_en: 'Panerai Luminor Marina | Kariv Glamour', title_de: 'Panerai Luminor Marina | Kariv Glamour',
    description_en: 'Panerai Luminor Marina — small seconds, strong Panerai identity and classic design.',
    description_de: 'Panerai Luminor Marina — kleine Sekunden, starke Panerai-Identität und klassisches Design.',
    intro_en: "Discover the Panerai Luminor Marina — a key Luminor subfamily with small seconds sub-dial at 9 o'clock and classic Panerai design.",
    intro_de: 'Entdecken Sie die Panerai Luminor Marina — eine wichtige Luminor-Subfamilie mit kleinem Sekundenzähler bei 9 Uhr und klassischem Panerai-Design.',
    filter: { collection: 'Luminor Marina' },
  },
  'panerai-radiomir': {
    h1_en: 'Panerai Radiomir', h1_de: 'Panerai Radiomir',
    title_en: 'Panerai Radiomir | Kariv Glamour', title_de: 'Panerai Radiomir | Kariv Glamour',
    description_en: 'Panerai Radiomir — historic cushion cases, wire lugs and military vintage character.',
    description_de: 'Panerai Radiomir — historische Cushion-Gehäuse, Drahtbandstege und militärischer Vintage-Charakter.',
    intro_en: 'Discover the Panerai Radiomir — a historic collection with cushion-shaped cases, wire lugs, vintage military character and a cleaner dress-tool watch profile.',
    intro_de: 'Entdecken Sie die Panerai Radiomir — eine historische Kollektion mit Cushion-Gehäusen, Drahtbandstegen, militärischem Vintage-Charakter und einem saubereren Dress-Tool-Watch-Profil.',
    filter: { collection: 'Radiomir' },
  },
  'panerai-luminor-44mm': {
    h1_en: 'Panerai Luminor 44mm', h1_de: 'Panerai Luminor 44mm',
    title_en: 'Panerai Luminor 44mm | Kariv Glamour', title_de: 'Panerai Luminor 44mm | Kariv Glamour',
    description_en: 'Panerai Luminor 44mm — the classic case size with bold presence.',
    description_de: 'Panerai Luminor 44mm — die klassische Gehäusegröße mit markanter Präsenz.',
    intro_en: 'Discover Panerai Luminor 44mm — the classic case size that delivers bold wrist presence and everyday comfort.',
    intro_de: 'Entdecken Sie Panerai Luminor 44mm — die klassische Gehäusegröße, die für markante Handgelenkspräsenz und Alltagskomfort sorgt.',
    filter: { collection: 'Luminor' },
    clientFilter: (p) => { const d = p.caseDiameter || ''; return d.includes('44'); },
  },
  'panerai-submersible-42mm': {
    h1_en: 'Panerai Submersible 42mm', h1_de: 'Panerai Submersible 42mm',
    title_en: 'Panerai Submersible 42mm | Kariv Glamour', title_de: 'Panerai Submersible 42mm | Kariv Glamour',
    description_en: 'Panerai Submersible 42mm — compact dive watch with rotating bezel.',
    description_de: 'Panerai Submersible 42mm — kompakte Tauchuhr mit drehbarer Lünette.',
    intro_en: 'Discover Panerai Submersible 42mm — a more compact dive watch with rotating bezel, high water resistance and sporty design.',
    intro_de: 'Entdecken Sie Panerai Submersible 42mm — eine kompaktere Tauchuhr mit drehbarer Lünette, hoher Wasserfestigkeit und sportlichem Design.',
    filter: { collection: 'Submersible' },
    clientFilter: (p) => { const d = p.caseDiameter || ''; return d.includes('42'); },
  },
  'panerai-radiomir-1940': {
    h1_en: 'Panerai Radiomir 1940', h1_de: 'Panerai Radiomir 1940',
    title_en: 'Panerai Radiomir 1940 | Kariv Glamour', title_de: 'Panerai Radiomir 1940 | Kariv Glamour',
    description_en: 'Panerai Radiomir 1940 — historic proportions with modern reliability.',
    description_de: 'Panerai Radiomir 1940 — historische Proportionen mit moderner Zuverlässigkeit.',
    intro_en: 'Discover the Panerai Radiomir 1940 — historic cushion case proportions with wider lugs and modern reliability.',
    intro_de: 'Entdecken Sie die Panerai Radiomir 1940 — historische Cushion-Gehäuse-Proportionen mit verbreiterten Bandstegen und moderner Zuverlässigkeit.',
    filter: { collection: 'Radiomir' },
    clientFilter: (p) => { const f = [p.model, p.productTitle, p.collection].filter(Boolean).join(' ').toLowerCase(); return f.includes('1940'); },
  },
  'panerai-8-days': {
    h1_en: 'Panerai 8 Days', h1_de: 'Panerai 8 Days',
    title_en: 'Panerai 8 Days | Kariv Glamour', title_de: 'Panerai 8 Days | Kariv Glamour',
    description_en: 'Panerai 8 Days — manufacture calibre with 8 days power reserve.',
    description_de: 'Panerai 8 Days — Manufakturkaliber mit 8 Tagen Gangreserve.',
    intro_en: "Discover Panerai 8 Days models — watches with manufacture calibres offering 8 days of power reserve, demonstrating Panerai's watchmaking expertise.",
    intro_de: 'Entdecken Sie Panerai 8 Days Modelle — Uhren mit Manufakturkalibern, die 8 Tage Gangreserve bieten und Panerais Uhrmacher-Expertise demonstrieren.',
    filter: {},
    clientFilter: (p) => { const f = [p.functions, p.movementType, p.model, p.productTitle].filter(Boolean).join(' ').toLowerCase(); return f.includes('8 day') || f.includes('8 days') || f.includes('acht tage'); },
  },
  'panerai-destro': {
    h1_en: 'Panerai Destro', h1_de: 'Panerai Destro',
    title_en: 'Panerai Destro | Kariv Glamour', title_de: 'Panerai Destro | Kariv Glamour',
    description_en: 'Panerai Destro — left-handed crown for comfort on the right wrist.',
    description_de: 'Panerai Destro — linkshändige Krone für Tragekomfort am rechten Handgelenk.',
    intro_en: 'Discover Panerai Destro models — watches with the crown on the left side, designed for left-handed wearers or those who wear their watch on the right wrist.',
    intro_de: 'Entdecken Sie Panerai Destro Modelle — Uhren mit linksseitiger Krone, die für Linkshänder und Träger entwickelt wurden, die ihre Uhr am rechten Handgelenk tragen.',
    filter: {},
    clientFilter: (p) => { const f = [p.functions, p.model, p.productTitle].filter(Boolean).join(' ').toLowerCase(); return f.includes('destro') || f.includes('left-handed'); },
  },
  'welche-panerai-uhr-kaufen': {
    h1_en: 'Which Panerai to Buy?', h1_de: 'Welche Panerai Uhr kaufen?',
    title_en: 'Which Panerai to Buy | Kariv Glamour', title_de: 'Welche Panerai Uhr kaufen | Kariv Glamour',
    description_en: 'Panerai buying guide — compare Luminor, Radiomir, Submersible and Luminor Due.',
    description_de: 'Panerai Kaufberatung — vergleichen Sie Luminor, Radiomir, Submersible und Luminor Due.',
    intro_en: 'Which Panerai watch is right for you? Compare collections, movements, case sizes, and features to make the right decision.',
    intro_de: 'Welche Panerai Uhr passt zu Ihnen? Vergleichen Sie Kollektionen, Uhrwerke, Gehäusegrößen und Funktionen, um die richtige Entscheidung zu treffen.',
    isGuide: true,
    guideContent_en: [
      "Panerai is known for bold Italian design, large cases and military diving tradition. The main collections are <a href='/panerai/luminor'>Luminor</a> (crown-protecting bridge), <a href='/panerai/luminor-marina'>Luminor Marina</a> (small seconds), <a href='/panerai/radiomir'>Radiomir</a> (historic cushion case), <a href='/panerai/submersible'>Submersible</a> (dive watches) and <a href='/panerai/luminor-due'>Luminor Due</a> (slimmer).",
      "For the classic Panerai experience, the <a href='/panerai/luminor'>Luminor</a> with crown-protecting bridge is the best choice. For small seconds enthusiasts, the <a href='/panerai/luminor-marina'>Luminor Marina</a> is ideal. For historic vintage charm, the <a href='/panerai/radiomir'>Radiomir</a> is recommended. For dive watches, the <a href='/panerai/submersible'>Submersible</a> is the right choice. For slimmer proportions, the <a href='/panerai/luminor-due'>Luminor Due</a> is perfect.",
      "At Kariv Glamour, each Panerai timepiece is presented with transparent product details, clear condition grading, and reference number visibility. We do not sell replica or counterfeit watches.",
    ],
    guideContent_de: [
      "Panerai ist bekannt für markantes italienisches Design, große Gehäuse und militärische Taucher-Tradition. Die wichtigsten Kollektionen sind <a href='/panerai/luminor'>Luminor</a> (kronenschützende Brücke), <a href='/panerai/luminor-marina'>Luminor Marina</a> (kleine Sekunden), <a href='/panerai/radiomir'>Radiomir</a> (historisches Cushion-Gehäuse), <a href='/panerai/submersible'>Submersible</a> (Tauchuhren) und <a href='/panerai/luminor-due'>Luminor Due</a> (schlanker).",
      "Für das klassische Panerai-Erlebnis ist die <a href='/panerai/luminor'>Luminor</a> mit kronenschützender Brücke die beste Wahl. Für Liebhaber des kleinen Sekundenzählers ist die <a href='/panerai/luminor-marina'>Luminor Marina</a> ideal. Für historischen Vintage-Charme empfiehlt sich die <a href='/panerai/radiomir'>Radiomir</a>. Für Tauchuhren ist die <a href='/panerai/submersible'>Submersible</a> die richtige Wahl. Für schlankere Proportionen ist die <a href='/panerai/luminor-due'>Luminor Due</a> perfekt.",
      "Bei Kariv Glamour wird jede Panerai Uhr mit transparenten Produktdetails, klarer Zustandsbewertung und Referenznummer-Sichtbarkeit präsentiert. Wir verkaufen keine Replikate oder gefälschte Uhren.",
    ],
  },
  'panerai-luminor-vs-radiomir': {
    h1_en: 'Panerai Luminor vs Radiomir', h1_de: 'Panerai Luminor vs Radiomir',
    title_en: 'Panerai Luminor vs Radiomir | Kariv Glamour', title_de: 'Panerai Luminor vs Radiomir | Kariv Glamour',
    description_en: 'Comparison of Panerai Luminor and Radiomir — two iconic collections with different character.',
    description_de: 'Vergleich der Panerai Luminor und Radiomir — zwei ikonische Kollektionen mit unterschiedlichem Charakter.',
    intro_en: 'The comparison between Panerai Luminor and Radiomir: Both have cushion cases, but the Luminor has the iconic crown-protecting bridge, while the Radiomir has wire lugs and a more historic profile.',
    intro_de: 'Der Vergleich zwischen Panerai Luminor und Radiomir: Beide haben Cushion-Gehäuse, aber die Luminor hat die ikonische kronenschützende Brücke, während die Radiomir Drahtbandstege und ein historischeres Profil hat.',
    isGuide: true,
    guideContent_en: [
      "The <a href='/panerai/luminor'>Panerai Luminor</a> has a cushion case with the iconic crown-protecting bridge, while the <a href='/panerai/radiomir'>Panerai Radiomir</a> has a historic cushion case with wire lugs and no crown bridge.",
      "The Luminor is aimed at those seeking the modern Panerai design with crown bridge, while the Radiomir is for lovers of vintage charm and historic proportions.",
      "At Kariv Glamour, you can compare both collections and find the Panerai that best fits your style and budget.",
    ],
    guideContent_de: [
      "Die <a href='/panerai/luminor'>Panerai Luminor</a> hat ein Cushion-Gehäuse mit der ikonischen kronenschützenden Brücke, während die <a href='/panerai/radiomir'>Panerai Radiomir</a> ein historisches Cushion-Gehäuse mit Drahtbandstegen und ohne Kronenbrücke hat.",
      "Die Luminor richtet sich an diejenigen, die das moderne Panerai-Design mit Kronenbrücke suchen, während die Radiomir für Liebhaber von Vintage-Charme und historischen Proportionen ist.",
      "Bei Kariv Glamour können Sie beide Kollektionen vergleichen und die Panerai finden, die am besten zu Ihrem Stil und Budget passt.",
    ],
  },
  'panerai-luminor-vs-submersible': {
    h1_en: 'Panerai Luminor vs Submersible', h1_de: 'Panerai Luminor vs Submersible',
    title_en: 'Panerai Luminor vs Submersible | Kariv Glamour', title_de: 'Panerai Luminor vs Submersible | Kariv Glamour',
    description_en: 'Comparison of Panerai Luminor and Submersible — everyday watch vs. dive watch.',
    description_de: 'Vergleich der Panerai Luminor und Submersible — Alltagsuhr vs. Tauchuhr.',
    intro_en: 'The comparison between Panerai Luminor and Submersible: The Luminor is an everyday watch with crown-protecting bridge, while the Submersible is a professional dive watch with rotating bezel.',
    intro_de: 'Der Vergleich zwischen Panerai Luminor und Submersible: Die Luminor ist eine Alltagsuhr mit kronenschützender Brücke, während die Submersible eine professionelle Tauchuhr mit drehbarer Lünette ist.',
    isGuide: true,
    guideContent_en: [
      "The <a href='/panerai/luminor'>Panerai Luminor</a> is an everyday watch with crown-protecting bridge, while the <a href='/panerai/submersible'>Panerai Submersible</a> is a professional dive watch with rotating bezel, higher water resistance and bolder materials.",
      "The Luminor is ideal for everyday and office wear, while the Submersible is designed for divers and sport enthusiasts.",
      "At Kariv Glamour, you can compare both collections and find the Panerai that best fits your lifestyle.",
    ],
    guideContent_de: [
      "Die <a href='/panerai/luminor'>Panerai Luminor</a> ist eine Alltagsuhr mit kronenschützender Brücke, während die <a href='/panerai/submersible'>Panerai Submersible</a> eine professionelle Tauchuhr mit drehbarer Lünette, höherer Wasserfestigkeit und mutigeren Materialien ist.",
      "Die Luminor ist ideal für Alltag und Büro, während die Submersible für Taucher und Sport-Enthusiasten konzipiert ist.",
      "Bei Kariv Glamour können Sie beide Kollektionen vergleichen und die Panerai finden, die am besten zu Ihrem Lebensstil passt.",
    ],
  },
  'panerai-uhr-preis': {
    h1_en: 'Panerai Watch Price', h1_de: 'Panerai Uhr Preis',
    title_en: 'Panerai Watch Price | Kariv Glamour', title_de: 'Panerai Uhr Preis | Kariv Glamour',
    description_en: 'Panerai prices at Kariv Glamour — from Luminor to Radiomir to Submersible.',
    description_de: 'Panerai Preise bei Kariv Glamour — von der Luminor über Radiomir bis Submersible.',
    intro_en: 'Panerai watches offer bold design and Swiss watchmaking. Prices vary by collection, material and condition.',
    intro_de: 'Panerai Uhren bieten markantes Design und Schweizer Uhrmacherkunst. Die Preise variieren je nach Kollektion, Material und Zustand.',
    isGuide: true,
    guideContent_en: [
      "Panerai watches offer bold Italian design and Swiss watchmaking. The <a href='/panerai/luminor'>Luminor</a> typically starts in the mid-price range, while the <a href='/panerai/submersible'>Submersible</a> as a technical dive watch is often higher. The <a href='/panerai/radiomir'>Radiomir</a> offers historic vintage charm.",
      "The price of a Panerai watch depends on collection, material (stainless steel, titanium, Carbotech, Goldtech, bronze), movement (automatic, manual-winding, manufacture calibre), case size and condition. <a href='/panerai-gebraucht'>Pre-owned Panerai watches</a> often offer better value.",
      "At Kariv Glamour, you'll find transparent prices for all Panerai models with detailed product information and condition grading.",
    ],
    guideContent_de: [
      "Panerai Uhren bieten markantes italienisches Design und Schweizer Uhrmacherkunst. Die <a href='/panerai/luminor'>Luminor</a> beginnt typischerweise im mittleren Preissegment, während die <a href='/panerai/submersible'>Submersible</a> als technische Tauchuhr oft höher liegt. Die <a href='/panerai/radiomir'>Radiomir</a> bietet historischen Vintage-Charme.",
      "Der Preis einer Panerai Uhr hängt von Kollektion, Material (Edelstahl, Titan, Carbotech, Goldtech, Bronze), Uhrwerk (Automatik, Handaufzug, Manufakturkaliber), Gehäusegröße und Zustand ab. <a href='/panerai-gebraucht'>Gebrauchte Panerai Uhren</a> bieten oft ein besseres Preis-Leistungs-Verhältnis.",
      "Bei Kariv Glamour finden Sie transparente Preise für alle Panerai Modelle mit detaillierten Produktinformationen und Zustandsbewertungen.",
    ],
  },
  'panerai-story': {
    h1_en: 'Panerai Story', h1_de: 'Panerai Story',
    title_en: 'Panerai Story | Kariv Glamour', title_de: 'Panerai Story | Kariv Glamour',
    description_en: 'The Panerai story — Italian design, Swiss watchmaking and military diving tradition.',
    description_de: 'Die Panerai Story — italienisches Design, Schweizer Uhrmacherkunst und militärische Taucher-Tradition.',
    intro_en: "Panerai stands for bold Italian design, Swiss watchmaking and military diving tradition — from Luminor to Radiomir to Submersible and Luminor Due.",
    intro_de: 'Panerai steht für markantes italienisches Design, Schweizer Uhrmacherkunst und militärische Taucher-Tradition — von der Luminor über die Radiomir bis zur Submersible und Luminor Due.',
    isGuide: true,
    guideContent_en: [
      "Panerai was founded in 1860 in Florence, Italy, and is known for bold Italian design, Swiss watchmaking and military diving tradition. The brand originally supplied watches to the Italian Navy.",
      "The <a href='/panerai/luminor'>Luminor</a> with its iconic crown-protecting bridge is Panerai's most recognizable collection. The <a href='/panerai/radiomir'>Radiomir</a> is the historic collection with cushion case and wire lugs. The <a href='/panerai/submersible'>Submersible</a> is the technical dive watch collection.",
      "At Kariv Glamour, you'll find a curated selection of Panerai watches — from new models to <a href='/panerai-gebraucht'>pre-owned Panerai watches</a> with transparent condition grading.",
    ],
    guideContent_de: [
      "Panerai wurde 1860 in Florenz, Italien, gegründet und ist bekannt für markantes italienisches Design, Schweizer Uhrmacherkunst und militärische Taucher-Tradition. Die Marke lieferte ursprünglich Uhren an die italienische Marine.",
      "Die <a href='/panerai/luminor'>Luminor</a> mit ihrer ikonischen kronenschützenden Brücke ist Panerais bekannteste Kollektion. Die <a href='/panerai/radiomir'>Radiomir</a> ist die historische Kollektion mit Cushion-Gehäuse und Drahtbandstegen. Die <a href='/panerai/submersible'>Submersible</a> ist die technische Tauchuhr-Kollektion.",
      "Bei Kariv Glamour finden Sie eine kuratierte Auswahl an Panerai Uhren — von neuen Modellen bis zu <a href='/panerai-gebraucht'>gebrauchten Panerai Uhren</a> mit transparenter Zustandsbewertung.",
    ],
  },
};