// Bvlgari collections, filters, and SEO data
// Bvlgari has two strong identities: jewellery-watch (Serpenti, Lvcea) and
// modern men's haute-horology (Octo, Octo Finissimo, Octo Roma).
// Positioned around Italian luxury design, Roman jewellery heritage, Swiss watchmaking.

const IMG_SERPENTI = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/cc9634d7e_BvlgariStainlessSteelSerpentiTubogas35mmGreyDialLadies.webp';
const IMG_ALUMINIUM = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/aa6055397_BvlgariAluminiumUhr.jpg';
const IMG_CHRONOGRAPH = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/0d5b84b72_BVLGARICHRONOGRAPH.png';

export const BVLGARI_HERO_IMAGE = IMG_SERPENTI;
export const BVLGARI_STORY_IMAGE = IMG_ALUMINIUM;

export const BVLGARI_COLLECTIONS = [
  { id: 1, name: 'Serpenti', slug: 'serpenti', image: IMG_SERPENTI,
    shortDescription_de: "Bvlgaris ikonischste Schmuckuhren-Kollektion, bekannt für schlangeninspiriertes Design, Wickelarmbänder, Edelsteinbesatz und starken weiblichen Luxus-Appeal.",
    shortDescription_en: "Bvlgari's most iconic jewellery-watch collection, known for serpent-inspired design, wraparound bracelets, gem-set details and strong women's luxury appeal." },
  { id: 2, name: 'Octo Finissimo', slug: 'octo-finissimo', image: IMG_CHRONOGRAPH,
    shortDescription_de: "Eine moderne Bvlgari-Uhrenfamilie, bekannt für ultradünne Architektur, eckiges römisches Design, integrierte Armbänder und mechanische Uhrmacher-Innovation.",
    shortDescription_en: "A modern Bvlgari watch family known for ultra-thin architecture, angular Roman-inspired design, integrated bracelets and mechanical watchmaking innovation." },
  { id: 3, name: 'Octo Roma', slug: 'octo-roma', image: '',
    shortDescription_de: "Eine verfeinerte Octo-Kollektion mit weicherer Geometrie, automatischen Uhrwerken und einem klassischeren Ausdruck von Bvlgaris römischer Designsprache.",
    shortDescription_en: "A refined Octo collection with softened geometry, automatic movements and a more classic expression of Bvlgari's Roman design language." },
  { id: 4, name: 'Bulgari Bulgari', slug: 'bulgari-bulgari', image: '',
    shortDescription_de: "Eine signature Bvlgari-Uhrenlinie, die für ihre gravierte Lünette, ihr klares Luxus-Styling und ihre starke Markenidentität bekannt ist.",
    shortDescription_en: "A signature Bvlgari watch line recognized for its engraved bezel, clean luxury styling and strong brand identity." },
  { id: 5, name: 'Lvcea', slug: 'lvcea', image: '',
    shortDescription_de: "Eine elegante Bvlgari-Damenuhren-Kollektion, die schmuckinspirierte Details, feminine Proportionen und alltägliche Luxus-Tragbarkeit vereint.",
    shortDescription_en: "An elegant women's Bvlgari watch collection combining jewellery-inspired details, feminine proportions and everyday luxury wearability." },
  { id: 6, name: 'Aluminium', slug: 'aluminium', image: IMG_ALUMINIUM,
    shortDescription_de: "Eine sportliche Bvlgari-Uhren-Kollektion mit leichten Materialien, starkem Kontrast und modernem Alltagscharakter.",
    shortDescription_en: "A casual Bvlgari sport-watch collection with lightweight materials, bold contrast and modern everyday character." },
  { id: 7, name: 'High Jewellery Watches', slug: 'high-jewellery-watches', image: '',
    shortDescription_de: "Eine seltene Bvlgari-Kategorie für edelsteinbesetzte Uhren, Schmuckhandwerk und sammlerorientierte Stücke.",
    shortDescription_en: "A rare Bvlgari category for gem-set watches, jewellery craftsmanship and collector-focused pieces." },
];

export const BVLGARI_CASE_MATERIALS = ['Stainless Steel', 'Titanium', 'Rose Gold', 'Yellow Gold', 'White Gold', 'Platinum', 'Ceramic', 'Aluminium', 'Carbon', 'Steel and Gold', 'Diamond-set', 'Gem-set'];
export const BVLGARI_MOVEMENTS = ['Automatic', 'Quartz', 'Manual-winding', 'Manufacture Calibre', 'Tourbillon', 'Minute Repeater'];
export const BVLGARI_DIAL_COLORS = ['Black', 'Silver', 'White', 'Blue', 'Green', 'Pink', 'Champagne', 'Brown', 'Mother of Pearl', 'Skeleton', 'Diamond-set', 'Gem-set'];
export const BVLGARI_FEATURES = ['Serpenti', 'Serpenti Tubogas', 'Serpenti Seduttori', 'Serpenti Misteriosi', 'Serpenti Spiga', 'Octo Finissimo', 'Octo Roma', 'Bulgari Bulgari', 'Lvcea', 'Aluminium', 'High Jewellery', 'Jewellery watch', 'Ultra-thin', 'Skeleton', 'Chronograph', 'Tourbillon', 'Minute repeater', 'Integrated bracelet', 'Tubogas bracelet', 'Double-spiral bracelet', 'Diamond-set', 'Gem-set', 'Mother-of-pearl dial', 'Full set'];
export const BVLGARI_WATCH_TYPES = ['Mechanical', 'Quartz'];
export const BVLGARI_BRACELETS = ['Tubogas bracelet', 'Steel bracelet', 'Titanium bracelet', 'Gold bracelet', 'Ceramic bracelet', 'Leather strap', 'Alligator strap', 'Rubber strap', 'Aluminium / rubber strap', 'Gem-set bracelet'];
export const BVLGARI_CASE_SIZES = ['23 mm', '26 mm', '27 mm', '28 mm', '30 mm', '33 mm', '35 mm', '37 mm', '38 mm', '40 mm', '41 mm', '42 mm'];
export const BVLGARI_TYPES = ['New', 'Pre-Owned', 'Vintage'];
export const BVLGARI_BOX_PAPERS = ['Box included', 'Papers included', 'Full set'];
export const BVLGARI_AVAILABILITY = ['In Stock', 'Reserved', 'Coming Soon', 'Sold'];

export const BVLGARI_QUICK_FILTERS = [
  { label: 'Serpenti', link: '/bvlgari/serpenti' },
  { label: 'Octo Finissimo', link: '/bvlgari/octo-finissimo' },
  { label: 'Octo Roma', link: '/bvlgari/octo-roma' },
  { label: 'Damen', link: '/bvlgari-uhr-damen' },
  { label: 'Herren', link: '/bvlgari-uhr-herren' },
  { label: 'Aluminium', link: '/bvlgari/aluminium' },
  { label: 'Gebraucht', link: '/bvlgari-gebraucht' },
];

export const BVLGARI_SEO_CARDS = [
  { title: 'Bvlgari Uhr', link: '/bvlgari-uhr',
    description_de: 'Entdecken Sie Bvlgari Uhren bei Kariv Glamour — Serpenti, Octo Finissimo, Octo Roma, Lvcea und Bulgari Bulgari mit italienischem Luxusdesign.',
    description_en: 'Explore Bvlgari watches at Kariv Glamour — Serpenti, Octo Finissimo, Octo Roma, Lvcea and Bulgari Bulgari with Italian luxury design.' },
  { title: 'Bvlgari Uhr Damen', link: '/bvlgari-uhr-damen',
    description_de: 'Bvlgari Damenuhren bei Kariv Glamour — Serpenti, Lvcea und Bulgari Bulgari Modelle für Damen.',
    description_en: "Bvlgari women's watches at Kariv Glamour — Serpenti, Lvcea and Bulgari Bulgari models for women." },
  { title: 'Bvlgari Uhr Herren', link: '/bvlgari-uhr-herren',
    description_de: 'Bvlgari Herrenuhren bei Kariv Glamour — Octo Finissimo, Octo Roma und Bulgari Bulgari Modelle für Herren.',
    description_en: "Bvlgari men's watches at Kariv Glamour — Octo Finissimo, Octo Roma and Bulgari Bulgari models for men." },
  { title: 'Bvlgari Serpenti', link: '/bvlgari/serpenti',
    description_de: 'Entdecken Sie die Bvlgari Serpenti Kollektion — schlangeninspirierte Schmuckuhren mit Tubogas-Armband und Edelsteinbesatz.',
    description_en: 'Discover the Bvlgari Serpenti collection — serpent-inspired jewellery watches with tubogas bracelet and gem-set details.' },
  { title: 'Bvlgari Serpenti Watch', link: '/bvlgari-serpenti-watch',
    description_de: 'Erfahren Sie mehr über die Bvlgari Serpenti Watch — ikonisches Schlangen-Design mit Tubogas- oder Seduttori-Armband.',
    description_en: 'Learn about the Bvlgari Serpenti Watch — iconic serpent design with tubogas or seduttori bracelet.' },
  { title: 'Bvlgari Octo Finissimo', link: '/bvlgari/octo-finissimo',
    description_de: 'Entdecken Sie die Bvlgari Octo Finissimo Kollektion — ultradünne mechanische Uhren mit eckigem römischem Design.',
    description_en: 'Discover the Bvlgari Octo Finissimo collection — ultra-thin mechanical watches with angular Roman-inspired design.' },
];

export const BVLGARI_READ_MORE = [
  { title: 'Bvlgari Story', link: '/bvlgari/story',
    description_de: 'Entdecken Sie Bvlgaris Heritage von römischem Schmuck-Design, italienischem Luxus und Schweizer Uhrmacherkunst.',
    description_en: "Explore Bvlgari's heritage of Roman jewellery design, Italian luxury and Swiss watchmaking." },
  { title: 'Bvlgari Serpenti Guide', link: '/bvlgari-serpenti-guide',
    description_de: 'Verstehen Sie die Bvlgari Serpenti Familie — Schlangendesign, Tubogas-Armbänder und Schmuckuhren-Expertise.',
    description_en: 'Understand the Bvlgari Serpenti family — serpent design, tubogas bracelets and jewellery-watch expertise.' },
  { title: 'Bvlgari Octo Finissimo Guide', link: '/bvlgari-octo-finissimo-guide',
    description_de: 'Verstehen Sie die Bvlgari Octo Finissimo Familie — ultradünne Architektur und mechanische Innovation.',
    description_en: 'Understand the Bvlgari Octo Finissimo family — ultra-thin architecture and mechanical innovation.' },
  { title: 'Bvlgari Women\'s Watch Guide', link: '/bvlgari-uhr-damen',
    description_de: 'Entdecken Sie Bvlgari Damenuhren — Serpenti, Lvcea und Bulgari Bulgari Modelle für Frauen.',
    description_en: "Discover Bvlgari women's watches — Serpenti, Lvcea and Bulgari Bulgari models for women." },
  { title: 'Gebrauchte Bvlgari kaufen', link: '/bvlgari-gebraucht',
    description_de: 'Was Sie vor dem Kauf einer gebrauchten Bvlgari prüfen sollten — Zustand, Box und Papiere, Referenznummer und Authentifizierung.',
    description_en: 'What to check before buying a used Bvlgari — condition, box and papers, reference number, and authentication.' },
];

export const BVLGARI_INTERNAL_LINKS = [
  {
    title_de: 'Beliebte Bvlgari Suchen', title_en: 'Popular Bvlgari Searches',
    links: [
      { label: 'Bvlgari Uhr', to: '/bvlgari-uhr' },
      { label: 'Bvlgari Uhr Damen', to: '/bvlgari-uhr-damen' },
      { label: 'Bvlgari Uhr Herren', to: '/bvlgari-uhr-herren' },
      { label: 'Bvlgari Serpenti', to: '/bvlgari/serpenti' },
      { label: 'Bvlgari Serpenti Watch', to: '/bvlgari-serpenti-watch' },
      { label: 'Bvlgari Octo Finissimo', to: '/bvlgari/octo-finissimo' },
    ],
  },
  {
    title_de: 'Bvlgari Kollektionen', title_en: 'Bvlgari Collections',
    links: [
      { label: 'Serpenti', to: '/bvlgari/serpenti' },
      { label: 'Octo Finissimo', to: '/bvlgari/octo-finissimo' },
      { label: 'Octo Roma', to: '/bvlgari/octo-roma' },
      { label: 'Bulgari Bulgari', to: '/bvlgari/bulgari-bulgari' },
      { label: 'Lvcea', to: '/bvlgari/lvcea' },
      { label: 'Aluminium', to: '/bvlgari/aluminium' },
      { label: 'High Jewellery Watches', to: '/bvlgari/high-jewellery-watches' },
    ],
  },
  {
    title_de: 'Kaufen & Gebraucht', title_en: 'Buy & Pre-Owned',
    links: [
      { label: 'Bvlgari kaufen', to: '/bvlgari-kaufen' },
      { label: 'Bvlgari Uhr kaufen', to: '/bvlgari-uhr-kaufen' },
      { label: 'Bvlgari gebraucht', to: '/bvlgari-gebraucht' },
      { label: 'Gebrauchte Bvlgari Uhren', to: '/gebrauchte-bvlgari-uhren' },
    ],
  },
  {
    title_de: 'Bulgari Schreibweise', title_en: 'Bulgari Spelling Variants',
    links: [
      { label: 'Bulgari Uhr', to: '/bulgari-uhr' },
      { label: 'Bulgari Uhren', to: '/bulgari-uhren' },
      { label: 'Serpenti Bvlgari', to: '/serpenti-bvlgari' },
      { label: 'Bvlgari Octo Roma', to: '/bvlgari-octo-roma' },
      { label: 'Bvlgari Lvcea', to: '/bvlgari-lvcea' },
    ],
  },
  {
    title_de: 'Ratgeber & Guides', title_en: 'Guides & Resources',
    links: [
      { label: 'Welche Bvlgari kaufen?', to: '/welche-bvlgari-uhr-kaufen' },
      { label: 'Bvlgari Serpenti Guide', to: '/bvlgari-serpenti-guide' },
      { label: 'Octo Finissimo Guide', to: '/bvlgari-octo-finissimo-guide' },
      { label: 'Bvlgari Story', to: '/bvlgari/story' },
    ],
  },
  {
    title_de: 'Verwandte Luxusuhren-Marken', title_en: 'Related Luxury Watch Brands',
    links: [
      { label: 'Cartier watches', to: '/brands/cartier' },
      { label: 'Rolex watches', to: '/brands/rolex' },
      { label: 'Omega watches', to: '/brands/omega' },
      { label: 'Patek Philippe watches', to: '/brands/patek-philippe' },
      { label: 'Audemars Piguet watches', to: '/brands/audemars-piguet' },
      { label: 'Hublot watches', to: '/brands/hublot' },
    ],
  },
];

export const BVLGARI_FAQS = [
  {
    q_de: 'Wo kann ich eine Bvlgari Uhr online kaufen?', q_en: 'Where can I buy a Bvlgari watch online?',
    a_de: "Sie können Bvlgari Uhren online bei Kariv Glamour kaufen. Stöbern Sie durch neue und <a href='/bvlgari-gebraucht'>gebrauchte Bvlgari Uhren</a> mit transparenten Produktdetails, Referenznummern und Zustandsbewertung.",
    a_en: "You can buy Bvlgari watches online at Kariv Glamour. Browse new and <a href='/bvlgari-gebraucht'>pre-owned Bvlgari watches</a> with transparent product details, reference numbers, and condition grading." },
  {
    q_de: 'Was ist die ikonischste Bvlgari Uhr?', q_en: 'What is the most iconic Bvlgari watch?',
    a_de: "Die ikonischste Bvlgari Uhr ist die <a href='/bvlgari/serpenti'>Serpenti</a> — eine schlangeninspirierte Schmuckuhr mit Tubogas-Armband, die Bvlgaris römisches Schmuck-Erbe mit Schweizer Uhrmacherkunst vereint.",
    a_en: "The most iconic Bvlgari watch is the <a href='/bvlgari/serpenti'>Serpenti</a> — a serpent-inspired jewellery watch with tubogas bracelet, blending Bvlgari's Roman jewellery heritage with Swiss watchmaking." },
  {
    q_de: 'Was ist die Bvlgari Serpenti Uhr?', q_en: 'What is the Bvlgari Serpenti watch?',
    a_de: "Die <a href='/bvlgari/serpenti'>Bvlgari Serpenti</a> ist eine ikonische Schmuckuhr mit schlangeninspiriertem Design, die in Varianten wie Tubogas, Seduttori und Misteriosi erhältlich ist. Lesen Sie mehr auf unserer <a href='/bvlgari-serpenti-watch'>Serpenti Watch Seite</a>.",
    a_en: "The <a href='/bvlgari/serpenti'>Bvlgari Serpenti</a> is an iconic jewellery watch with serpent-inspired design, available in variants like Tubogas, Seduttori and Misteriosi. Read more on our <a href='/bvlgari-serpenti-watch'>Serpenti Watch page</a>." },
  {
    q_de: 'Sind Bvlgari Serpenti Uhren hauptsächlich für Frauen?', q_en: 'Are Bvlgari Serpenti watches mainly for women?',
    a_de: "Ja, die <a href='/bvlgari/serpenti'>Serpenti</a> ist eine der stärksten <a href='/bvlgari-uhr-damen'>Bvlgari Damenuhren</a>. Das schlangeninspirierte Design und die Schmuckuhren-Ästhetik richten sich überwiegend an Frauen.",
    a_en: "Yes, the <a href='/bvlgari/serpenti'>Serpenti</a> is one of the strongest <a href='/bvlgari-uhr-damen'>Bvlgari women's watches</a>. The serpent-inspired design and jewellery-watch aesthetic appeal primarily to women." },
  {
    q_de: 'Was ist der Unterschied zwischen Bvlgari Serpenti und Lvcea?', q_en: 'What is the difference between Bvlgari Serpenti and Lvcea?',
    a_de: "Die <a href='/bvlgari/serpenti'>Serpenti</a> ist eine schlangeninspirierte Schmuckuhr mit Wickelarmband, während die <a href='/bvlgari/lvcea'>Lvcea</a> eine elegantere Damenuhren-Kollektion mit klassischerem Design und femininen Proportionen ist.",
    a_en: "The <a href='/bvlgari/serpenti'>Serpenti</a> is a serpent-inspired jewellery watch with wraparound bracelet, while the <a href='/bvlgari/lvcea'>Lvcea</a> is a more elegant women's watch collection with a more classic design and feminine proportions." },
  {
    q_de: 'Was ist Bvlgari Octo Finissimo?', q_en: 'What is Bvlgari Octo Finissimo?',
    a_de: "Die <a href='/bvlgari/octo-finissimo'>Bvlgari Octo Finissimo</a> ist eine moderne Herrenuhren-Familie, die für ihre ultradünne Architektur, ihr eckiges römisches Design und ihre mechanischen Weltrekorde bekannt ist.",
    a_en: "The <a href='/bvlgari/octo-finissimo'>Bvlgari Octo Finissimo</a> is a modern men's watch family known for its ultra-thin architecture, angular Roman-inspired design and mechanical world records." },
  {
    q_de: 'Stellt Bvlgari auch Herrenuhren her?', q_en: 'Does Bvlgari make men\'s watches?',
    a_de: "Ja. Die <a href='/bvlgari/octo-finissimo'>Octo Finissimo</a>, <a href='/bvlgari/octo-roma'>Octo Roma</a> und <a href='/bvlgari/aluminium'>Aluminium</a> Kollektionen sind Bvlgaris stärkste <a href='/bvlgari-uhr-herren'>Herrenuhren</a> mit automatischen Uhrwerken und integrierten Armbändern.",
    a_en: "Yes. The <a href='/bvlgari/octo-finissimo'>Octo Finissimo</a>, <a href='/bvlgari/octo-roma'>Octo Roma</a> and <a href='/bvlgari/aluminium'>Aluminium</a> collections are Bvlgari's strongest <a href='/bvlgari-uhr-herren'>men's watches</a> with automatic movements and integrated bracelets." },
  {
    q_de: 'Was sollte ich vor dem Kauf einer gebrauchten Bvlgari prüfen?', q_en: 'What should I check before buying a pre-owned Bvlgari watch?',
    a_de: "Prüfen Sie den Zustand von Gehäuse und Armband, verifizieren Sie das Uhrwerk (Automatik oder Quarz), bestätigen Sie Box und Papiere, und überprüfen Sie die Referenznummer. Besuchen Sie unsere Seite für <a href='/bvlgari-gebraucht'>gebrauchte Bvlgari Uhren</a> mit transparenten Einträgen.",
    a_en: "Check the condition of the case and bracelet, verify the movement (automatic or quartz), confirm box and papers, and review the reference number. Visit our <a href='/bvlgari-gebraucht'>pre-owned Bvlgari</a> page for transparent listings." },
];

export const BVLGARI_SEO_PAGES = {
  'bvlgari-uhr': {
    h1_de: 'Bvlgari Uhr', h1_en: 'Bvlgari Watch',
    title_de: 'Bvlgari Uhr | Kariv Glamour', title_en: 'Bvlgari Watch | Kariv Glamour',
    description_de: 'Entdecken Sie Bvlgari Uhren bei Kariv Glamour — Serpenti, Octo Finissimo, Octo Roma, Lvcea und Bulgari Bulgari mit italienischem Luxusdesign.',
    description_en: 'Discover Bvlgari watches at Kariv Glamour — Serpenti, Octo Finissimo, Octo Roma, Lvcea and Bulgari Bulgari with Italian luxury design.',
    intro_de: 'Erkunden Sie Bvlgari Uhren bei Kariv Glamour — mit italienischem Luxusdesign, römischem Schmuck-Erbe, Schweizer Uhrmacherkunst und ikonischen Kollektionen wie Serpenti, Octo Finissimo, Octo Roma, Lvcea und Bulgari Bulgari.',
    intro_en: "Explore Bvlgari watches at Kariv Glamour — with Italian luxury design, Roman jewellery heritage, Swiss watchmaking and iconic collections such as Serpenti, Octo Finissimo, Octo Roma, Lvcea and Bulgari Bulgari.",
    filter: {},
  },
  'bvlgari-uhren': {
    h1_de: 'Bvlgari Uhren', h1_en: 'Bvlgari Watches',
    title_de: 'Bvlgari Uhren | Kariv Glamour', title_en: 'Bvlgari Watches | Kariv Glamour',
    description_de: 'Bvlgari Uhren bei Kariv Glamour — Serpenti, Octo Finissimo, Octo Roma, Lvcea und Bulgari Bulgari Kollektionen.',
    description_en: 'Bvlgari watches at Kariv Glamour — Serpenti, Octo Finissimo, Octo Roma, Lvcea and Bulgari Bulgari collections.',
    intro_de: 'Stöbern Sie durch Bvlgari Uhren nach Kollektion, Modell, Uhrwerk, Gehäusegröße, Zustand und Preis.',
    intro_en: 'Browse Bvlgari watches by collection, model, movement, case size, condition, and price.',
    filter: {},
  },
  'bulgari-uhr': {
    h1_de: 'Bulgari Uhr', h1_en: 'Bulgari Watch',
    title_de: 'Bulgari Uhr | Kariv Glamour', title_en: 'Bulgari Watch | Kariv Glamour',
    description_de: 'Bulgari Uhr bei Kariv Glamour — dieselben ikonischen Bvlgari Kollektionen unter der alternativen Schreibweise.',
    description_en: 'Bulgari watch at Kariv Glamour — the same iconic Bvlgari collections under the alternative spelling.',
    intro_de: 'Bulgari Uhr bei Kariv Glamour: Entdecken Sie dieselben ikonischen Kollektionen — Serpenti, Octo Finissimo, Octo Roma, Lvcea und Bulgari Bulgari — unter der traditionellen Schreibweise.',
    intro_en: 'Bulgari watch at Kariv Glamour: Discover the same iconic collections — Serpenti, Octo Finissimo, Octo Roma, Lvcea and Bulgari Bulgari — under the traditional spelling.',
    filter: {},
  },
  'bulgari-uhren': {
    h1_de: 'Bulgari Uhren', h1_en: 'Bulgari Watches',
    title_de: 'Bulgari Uhren | Kariv Glamour', title_en: 'Bulgari Watches | Kariv Glamour',
    description_de: 'Bulgari Uhren bei Kariv Glamour — Serpenti, Octo und Lvcea unter der alternativen Schreibweise.',
    description_en: 'Bulgari watches at Kariv Glamour — Serpenti, Octo and Lvcea under the alternative spelling.',
    intro_de: 'Bulgari Uhren bei Kariv Glamour: Stöbern Sie durch die ikonischen Kollektionen der Marke Bvlgari mit italienischem Luxusdesign.',
    intro_en: 'Bulgari watches at Kariv Glamour: Browse the iconic collections of the Bvlgari brand with Italian luxury design.',
    filter: {},
  },
  'bvlgari-uhr-damen': {
    h1_de: 'Bvlgari Uhr Damen', h1_en: "Bvlgari Women's Watches",
    title_de: 'Bvlgari Uhr Damen | Kariv Glamour', title_en: "Bvlgari Women's Watches | Kariv Glamour",
    description_de: 'Bvlgari Damenuhren bei Kariv Glamour — Serpenti, Lvcea und Bulgari Bulgari Modelle für Damen.',
    description_en: "Bvlgari women's watches at Kariv Glamour — Serpenti, Lvcea and Bulgari Bulgari models for women.",
    intro_de: 'Entdecken Sie Bvlgari Damenuhren — von der ikonischen Serpenti über die elegante Lvcea bis zur Bulgari Bulgari mit schmuckinspirierten Details und femininen Proportionen.',
    intro_en: "Discover Bvlgari women's watches — from the iconic Serpenti to the elegant Lvcea to the Bulgari Bulgari with jewellery-inspired details and feminine proportions.",
    filter: { gender: 'Women' },
  },
  'bvlgari-uhr-herren': {
    h1_de: 'Bvlgari Uhr Herren', h1_en: "Bvlgari Men's Watches",
    title_de: 'Bvlgari Uhr Herren | Kariv Glamour', title_en: "Bvlgari Men's Watches | Kariv Glamour",
    description_de: 'Bvlgari Herrenuhren bei Kariv Glamour — Octo Finissimo, Octo Roma und Aluminium Modelle für Herren.',
    description_en: "Bvlgari men's watches at Kariv Glamour — Octo Finissimo, Octo Roma and Aluminium models for men.",
    intro_de: 'Entdecken Sie Bvlgari Herrenuhren — von der ultradünnen Octo Finissimo über die klassische Octo Roma bis zur sportlichen Aluminium mit automatischen Uhrwerken und integrierten Armbändern.',
    intro_en: "Discover Bvlgari men's watches — from the ultra-thin Octo Finissimo to the classic Octo Roma to the sporty Aluminium with automatic movements and integrated bracelets.",
    filter: { gender: 'Men' },
  },
  'bvlgari-kaufen': {
    h1_de: 'Bvlgari kaufen', h1_en: 'Buy Bvlgari',
    title_de: 'Bvlgari kaufen | Kariv Glamour', title_en: 'Buy Bvlgari | Kariv Glamour',
    description_de: 'Bvlgari kaufen bei Kariv Glamour — Serpenti, Octo Finissimo, Octo Roma und mehr.',
    description_en: 'Buy Bvlgari at Kariv Glamour — Serpenti, Octo Finissimo, Octo Roma and more.',
    intro_de: 'Bvlgari kaufen bei Kariv Glamour: entdecken Sie Uhren aus allen Kollektionen mit transparenter Zustandsbewertung.',
    intro_en: 'Buy Bvlgari at Kariv Glamour: discover watches from all collections with transparent condition grading.',
    filter: {},
  },
  'bvlgari-uhr-kaufen': {
    h1_de: 'Bvlgari Uhr kaufen', h1_en: 'Buy Bvlgari Watch',
    title_de: 'Bvlgari Uhr kaufen | Kariv Glamour', title_en: 'Buy Bvlgari Watch | Kariv Glamour',
    description_de: 'Bvlgari Uhr kaufen bei Kariv Glamour — neue und gebrauchte Modelle mit transparenter Produktinformation.',
    description_en: 'Buy Bvlgari watch at Kariv Glamour — new and pre-owned models with transparent product information.',
    intro_de: 'Bvlgari Uhr kaufen bei Kariv Glamour: neue und gebrauchte Modelle mit transparenter Produktinformation und Zustandsbewertung.',
    intro_en: 'Buy Bvlgari watch at Kariv Glamour: new and pre-owned models with transparent product information and condition grading.',
    filter: {},
  },
  'bvlgari-gebraucht': {
    h1_de: 'Bvlgari gebraucht', h1_en: 'Pre-Owned Bvlgari',
    title_de: 'Bvlgari gebraucht | Kariv Glamour', title_en: 'Pre-Owned Bvlgari | Kariv Glamour',
    description_de: 'Gebrauchte Bvlgari Uhren bei Kariv Glamour mit transparenter Zustandsbewertung.',
    description_en: 'Pre-owned Bvlgari watches at Kariv Glamour with transparent condition grading.',
    intro_de: 'Entdecken Sie gebrauchte Bvlgari Uhren mit klarer Zustandsbewertung, Box und Papers und detaillierten Produktdaten.',
    intro_en: 'Discover pre-owned Bvlgari watches with clear condition grading, box and papers, and detailed product data.',
    filter: {},
  },
  'bvlgari-gebraucht-kaufen': {
    h1_de: 'Bvlgari gebraucht kaufen', h1_en: 'Buy Pre-Owned Bvlgari',
    title_de: 'Bvlgari gebraucht kaufen | Kariv Glamour', title_en: 'Buy Pre-Owned Bvlgari | Kariv Glamour',
    description_de: 'Bvlgari gebraucht kaufen bei Kariv Glamour — geprüfte Gebrauchtuhren mit Zustandsbericht.',
    description_en: 'Buy pre-owned Bvlgari at Kariv Glamour — inspected pre-owned watches with condition reports.',
    intro_de: 'Bvlgari gebraucht kaufen bei Kariv Glamour: geprüfte Uhren mit transparentem Zustandsbericht und Authentifizierung.',
    intro_en: 'Buy pre-owned Bvlgari at Kariv Glamour: inspected watches with transparent condition reports and authentication.',
    filter: {},
  },
  'gebrauchte-bvlgari-uhren': {
    h1_de: 'Gebrauchte Bvlgari Uhren', h1_en: 'Pre-Owned Bvlgari Watches',
    title_de: 'Gebrauchte Bvlgari Uhren | Kariv Glamour', title_en: 'Pre-Owned Bvlgari Watches | Kariv Glamour',
    description_de: 'Gebrauchte Bvlgari Uhren bei Kariv Glamour — Serpenti, Octo und Lvcea mit Zustandsbewertung.',
    description_en: 'Pre-owned Bvlgari watches at Kariv Glamour — Serpenti, Octo and Lvcea with condition grading.',
    intro_de: 'Stöbern Sie durch gebrauchte Bvlgari Uhren — von der Serpenti über die Octo Finissimo bis zur Lvcea.',
    intro_en: 'Browse pre-owned Bvlgari watches — from Serpenti to Octo Finissimo to Lvcea.',
    filter: {},
  },
  'bvlgari-serpenti-watch': {
    h1_de: 'Bvlgari Serpenti Watch', h1_en: 'Bvlgari Serpenti Watch',
    title_de: 'Bvlgari Serpenti Watch | Kariv Glamour', title_en: 'Bvlgari Serpenti Watch | Kariv Glamour',
    description_de: 'Erfahren Sie mehr über die Bvlgari Serpenti Watch — ikonisches Schlangendesign mit Tubogas- oder Seduttori-Armband.',
    description_en: 'Learn about the Bvlgari Serpenti Watch — iconic serpent design with tubogas or seduttori bracelet.',
    intro_de: 'Die Bvlgari Serpenti Watch ist eine ikonische Schmuckuhr mit schlangeninspiriertem Design, die in Varianten wie Tubogas, Seduttori, Misteriosi und Spiga erhältlich ist. Entdecken Sie die <a href="/bvlgari/serpenti">Serpenti Kollektion</a>.',
    intro_en: 'The Bvlgari Serpenti Watch is an iconic jewellery watch with serpent-inspired design, available in variants like Tubogas, Seduttori, Misteriosi and Spiga. Explore the <a href="/bvlgari/serpenti">Serpenti collection</a>.',
    isGuide: true,
    guideContent_de: [
      "Die <a href='/bvlgari/serpenti'>Bvlgari Serpenti</a> ist eine der ikonischsten Schmuckuhren der Welt. Ihr schlangeninspiriertes Design vereint Bvlgaris römisches Schmuck-Erbe mit Schweizer Uhrmacherkunst.",
      "Die Serpenti ist in mehreren Varianten erhältlich: <strong>Tubogas</strong> (flexibles Wickelarmband), <strong>Seduttori</strong> (flacheres, modernes Design), <strong>Misteriosi</strong> (verstecktes Uhrwerk) und <strong>Spiga</strong> (geflochtenes Armband).",
      "Bei Kariv Glamour finden Sie eine kuratierte Auswahl an Serpenti Uhren — von neuen Modellen bis zu <a href='/bvlgari-gebraucht'>gebrauchten Bvlgari Uhren</a> mit transparenter Zustandsbewertung.",
    ],
    guideContent_en: [
      "The <a href='/bvlgari/serpenti'>Bvlgari Serpenti</a> is one of the most iconic jewellery watches in the world. Its serpent-inspired design combines Bvlgari's Roman jewellery heritage with Swiss watchmaking.",
      "The Serpenti is available in several variants: <strong>Tubogas</strong> (flexible wraparound bracelet), <strong>Seduttori</strong> (flatter, modern design), <strong>Misteriosi</strong> (hidden movement) and <strong>Spiga</strong> (braided bracelet).",
      "At Kariv Glamour, you'll find a curated selection of Serpenti watches — from new models to <a href='/bvlgari-gebraucht'>pre-owned Bvlgari watches</a> with transparent condition grading.",
    ],
  },
  'serpenti-bvlgari': {
    h1_de: 'Serpenti Bvlgari', h1_en: 'Serpenti Bvlgari',
    title_de: 'Serpenti Bvlgari | Kariv Glamour', title_en: 'Serpenti Bvlgari | Kariv Glamour',
    description_de: 'Serpenti Bvlgari — die ikonische Schmuckuhr mit Schlangendesign und Tubogas-Armband.',
    description_en: 'Serpenti Bvlgari — the iconic jewellery watch with serpent design and tubogas bracelet.',
    intro_de: 'Serpenti Bvlgari ist die ikonischste Schmuckuhr der Marke. Entdecken Sie die <a href="/bvlgari/serpenti">Serpenti Kollektion</a> bei Kariv Glamour.',
    intro_en: 'Serpenti Bvlgari is the brand\'s most iconic jewellery watch. Explore the <a href="/bvlgari/serpenti">Serpenti collection</a> at Kariv Glamour.',
    filter: { collection: 'Serpenti' },
  },
  'bvlgari-octo-roma': {
    h1_de: 'Bvlgari Octo Roma', h1_en: 'Bvlgari Octo Roma',
    title_de: 'Bvlgari Octo Roma | Kariv Glamour', title_en: 'Bvlgari Octo Roma | Kariv Glamour',
    description_de: 'Bvlgari Octo Roma — weichere Geometrie, automatische Uhrwerke und klassische römische Designsprache.',
    description_en: 'Bvlgari Octo Roma — softened geometry, automatic movements and classic Roman design language.',
    intro_de: 'Entdecken Sie die Bvlgari Octo Roma — eine verfeinerte Octo-Kollektion mit weicherer Geometrie, automatischen Uhrwerken und einem klassischeren Ausdruck von Bvlgaris römischer Designsprache.',
    intro_en: 'Discover the Bvlgari Octo Roma — a refined Octo collection with softened geometry, automatic movements and a more classic expression of Bvlgari\'s Roman design language.',
    filter: { collection: 'Octo Roma' },
  },
  'bvlgari-lvcea': {
    h1_de: 'Bvlgari Lvcea', h1_en: 'Bvlgari Lvcea',
    title_de: 'Bvlgari Lvcea | Kariv Glamour', title_en: 'Bvlgari Lvcea | Kariv Glamour',
    description_de: 'Bvlgari Lvcea — elegante Damenuhren mit schmuckinspirierten Details und femininen Proportionen.',
    description_en: 'Bvlgari Lvcea — elegant women\'s watches with jewellery-inspired details and feminine proportions.',
    intro_de: 'Entdecken Sie die Bvlgari Lvcea — eine elegante Damenuhren-Kollektion, die schmuckinspirierte Details, feminine Proportionen und alltägliche Luxus-Tragbarkeit vereint.',
    intro_en: 'Discover the Bvlgari Lvcea — an elegant women\'s watch collection combining jewellery-inspired details, feminine proportions and everyday luxury wearability.',
    filter: { collection: 'Lvcea' },
  },
  'welche-bvlgari-uhr-kaufen': {
    h1_de: 'Welche Bvlgari Uhr kaufen?', h1_en: 'Which Bvlgari to Buy?',
    title_de: 'Welche Bvlgari Uhr kaufen | Kariv Glamour', title_en: 'Which Bvlgari to Buy | Kariv Glamour',
    description_de: 'Bvlgari Kaufberatung — vergleichen Sie Serpenti, Octo Finissimo, Octo Roma, Lvcea und Bulgari Bulgari.',
    description_en: 'Bvlgari buying guide — compare Serpenti, Octo Finissimo, Octo Roma, Lvcea and Bulgari Bulgari.',
    intro_de: 'Welche Bvlgari Uhr passt zu Ihnen? Vergleichen Sie Kollektionen, Uhrwerke, Gehäusegrößen und Funktionen, um die richtige Entscheidung zu treffen.',
    intro_en: 'Which Bvlgari watch is right for you? Compare collections, movements, case sizes, and features to make the right decision.',
    isGuide: true,
    guideContent_de: [
      "Bvlgari hat zwei starke Identitäten: Schmuckuhren für Damen (<a href='/bvlgari/serpenti'>Serpenti</a>, <a href='/bvlgari/lvcea'>Lvcea</a>) und moderne Herrentourbillons und ultradünne Uhren (<a href='/bvlgari/octo-finissimo'>Octo Finissimo</a>, <a href='/bvlgari/octo-roma'>Octo Roma</a>).",
      "Für Damen ist die <a href='/bvlgari/serpenti'>Serpenti</a> die ikonischste Wahl mit Schlangendesign und Tubogas-Armband. Die <a href='/bvlgari/lvcea'>Lvcea</a> bietet ein klassischeres Damenuhren-Design.",
      "Für Herren ist die <a href='/bvlgari/octo-finissimo'>Octo Finissimo</a> die beste Wahl für ultradünne mechanische Uhren. Die <a href='/bvlgari/octo-roma'>Octo Roma</a> bietet ein klassischeres Octo-Design. Die <a href='/bvlgari/aluminium'>Aluminium</a> ist eine sportlichere Alltagsuhr.",
      "Bei Kariv Glamour wird jede Bvlgari Uhr mit transparenten Produktdetails, klarer Zustandsbewertung und Referenznummer-Sichtbarkeit präsentiert. Wir verkaufen keine Replikate oder gefälschte Uhren.",
    ],
    guideContent_en: [
      "Bvlgari has two strong identities: jewellery watches for women (<a href='/bvlgari/serpenti'>Serpenti</a>, <a href='/bvlgari/lvcea'>Lvcea</a>) and modern men's tourbillons and ultra-thin watches (<a href='/bvlgari/octo-finissimo'>Octo Finissimo</a>, <a href='/bvlgari/octo-roma'>Octo Roma</a>).",
      "For women, the <a href='/bvlgari/serpenti'>Serpenti</a> is the most iconic choice with serpent design and tubogas bracelet. The <a href='/bvlgari/lvcea'>Lvcea</a> offers a more classic women's watch design.",
      "For men, the <a href='/bvlgari/octo-finissimo'>Octo Finissimo</a> is the best choice for ultra-thin mechanical watches. The <a href='/bvlgari/octo-roma'>Octo Roma</a> offers a more classic Octo design. The <a href='/bvlgari/aluminium'>Aluminium</a> is a sportier everyday watch.",
      "At Kariv Glamour, each Bvlgari timepiece is presented with transparent product details, clear condition grading, and reference number visibility. We do not sell replica or counterfeit watches.",
    ],
  },
  'bvlgari-serpenti-guide': {
    h1_de: 'Bvlgari Serpenti Guide', h1_en: 'Bvlgari Serpenti Guide',
    title_de: 'Bvlgari Serpenti Guide | Kariv Glamour', title_en: 'Bvlgari Serpenti Guide | Kariv Glamour',
    description_de: 'Verstehen Sie die Bvlgari Serpenti Familie — Schlangendesign, Tubogas-Armbänder und Schmuckuhren-Expertise.',
    description_en: 'Understand the Bvlgari Serpenti family — serpent design, tubogas bracelets and jewellery-watch expertise.',
    intro_de: 'Die Bvlgari Serpenti Guide: Verstehen Sie die Varianten Tubogas, Seduttori, Misteriosi und Spiga, und finden Sie die richtige Serpenti für Ihren Stil.',
    intro_en: 'The Bvlgari Serpenti Guide: Understand the Tubogas, Seduttori, Misteriosi and Spiga variants, and find the right Serpenti for your style.',
    isGuide: true,
    guideContent_de: [
      "Die <a href='/bvlgari/serpenti'>Bvlgari Serpenti</a> ist in mehreren Varianten erhältlich: <strong>Tubogas</strong> (klassisches Wickelarmband), <strong>Seduttori</strong> (modern, flach), <strong>Misteriosi</strong> (verstecktes Uhrwerk) und <strong>Spiga</strong> (geflochten).",
      "Die Serpenti richtet sich hauptsächlich an <a href='/bvlgari-uhr-damen'>Damen</a> und ist eine der stärksten Schmuckuhren auf dem Markt. Sie vereint Bvlgaris römisches Schmuck-Erbe mit Schweizer Uhrmacherkunst.",
      "Bei Kariv Glamour finden Sie eine kuratierte Auswahl an Serpenti Uhren — von neuen Modellen bis zu <a href='/bvlgari-gebraucht'>gebrauchten Bvlgari Uhren</a>.",
    ],
    guideContent_en: [
      "The <a href='/bvlgari/serpenti'>Bvlgari Serpenti</a> is available in several variants: <strong>Tubogas</strong> (classic wraparound bracelet), <strong>Seduttori</strong> (modern, flat), <strong>Misteriosi</strong> (hidden movement) and <strong>Spiga</strong> (braided).",
      "The Serpenti is aimed primarily at <a href='/bvlgari-uhr-damen'>women</a> and is one of the strongest jewellery watches on the market. It combines Bvlgari's Roman jewellery heritage with Swiss watchmaking.",
      "At Kariv Glamour, you'll find a curated selection of Serpenti watches — from new models to <a href='/bvlgari-gebraucht'>pre-owned Bvlgari watches</a>.",
    ],
  },
  'bvlgari-octo-finissimo-guide': {
    h1_de: 'Bvlgari Octo Finissimo Guide', h1_en: 'Bvlgari Octo Finissimo Guide',
    title_de: 'Bvlgari Octo Finissimo Guide | Kariv Glamour', title_en: 'Bvlgari Octo Finissimo Guide | Kariv Glamour',
    description_de: 'Verstehen Sie die Bvlgari Octo Finissimo Familie — ultradünne Architektur und mechanische Innovation.',
    description_en: 'Understand the Bvlgari Octo Finissimo family — ultra-thin architecture and mechanical innovation.',
    intro_de: 'Die Bvlgari Octo Finissimo Guide: Verstehen Sie die ultradünne Architektur, die eckige römische Designsprache und die mechanischen Weltrekorde der Octo Finissimo Familie.',
    intro_en: 'The Bvlgari Octo Finissimo Guide: Understand the ultra-thin architecture, the angular Roman design language and the mechanical world records of the Octo Finissimo family.',
    isGuide: true,
    guideContent_de: [
      "Die <a href='/bvlgari/octo-finissimo'>Bvlgari Octo Finissimo</a> ist für ihre ultradünne Architektur und ihre mechanischen Weltrekorde bekannt. Das eckige, römisch inspirierte Design ist einzigartig in der Haute Horlogerie.",
      "Die Octo Finissimo richtet sich hauptsächlich an <a href='/bvlgari-uhr-herren'>Herren</a> und ist in Varianten wie Automatik, Chronograph, Tourbillon und Skeleton erhältlich.",
      "Bei Kariv Glamour finden Sie eine kuratierte Auswahl an Octo Finissimo Uhren — von neuen Modellen bis zu <a href='/bvlgari-gebraucht'>gebrauchten Bvlgari Uhren</a>.",
    ],
    guideContent_en: [
      "The <a href='/bvlgari/octo-finissimo'>Bvlgari Octo Finissimo</a> is known for its ultra-thin architecture and mechanical world records. The angular, Roman-inspired design is unique in haute horlogerie.",
      "The Octo Finissimo is aimed primarily at <a href='/bvlgari-uhr-herren'>men</a> and is available in variants like Automatic, Chronograph, Tourbillon and Skeleton.",
      "At Kariv Glamour, you'll find a curated selection of Octo Finissimo watches — from new models to <a href='/bvlgari-gebraucht'>pre-owned Bvlgari watches</a>.",
    ],
  },
  'bvlgari-story': {
    h1_de: 'Bvlgari Story', h1_en: 'Bvlgari Story',
    title_de: 'Bvlgari Story | Kariv Glamour', title_en: 'Bvlgari Story | Kariv Glamour',
    description_de: 'Die Bvlgari Story — römisches Schmuck-Design, italienischer Luxus und Schweizer Uhrmacherkunst.',
    description_en: 'The Bvlgari story — Roman jewellery design, Italian luxury and Swiss watchmaking.',
    intro_de: 'Bvlgari steht für römisches Schmuck-Design, italienischen Luxus und Schweizer Uhrmacherkunst — von der ikonischen Serpenti über die Octo Finissimo bis zur Lvcea und Bulgari Bulgari.',
    intro_en: "Bvlgari stands for Roman jewellery design, Italian luxury and Swiss watchmaking — from the iconic Serpenti to the Octo Finissimo to the Lvcea and Bulgari Bulgari.",
    isGuide: true,
    guideContent_de: [
      "Bvlgari wurde 1884 in Rom gegründet und ist bekannt für italienisches Luxusdesign, römisches Schmuck-Erbe und Schweizer Uhrmacherkunst. Die Marke vereint Schmuck-Expertise mit Haute Horlogerie.",
      "Die <a href='/bvlgari/serpenti'>Serpenti</a> ist Bvlgaris ikonischste Schmuckuhr mit Schlangendesign. Die <a href='/bvlgari/octo-finissimo'>Octo Finissimo</a> ist die führende Herrenuhren-Familie mit ultradünner Architektur. Die <a href='/bvlgari/lvcea'>Lvcea</a> bietet elegante Damenuhren.",
      "Bei Kariv Glamour finden Sie eine kuratierte Auswahl an Bvlgari Uhren — von neuen Modellen bis zu <a href='/bvlgari-gebraucht'>gebrauchten Bvlgari Uhren</a> mit transparenter Zustandsbewertung.",
    ],
    guideContent_en: [
      "Bvlgari was founded in 1884 in Rome and is known for Italian luxury design, Roman jewellery heritage and Swiss watchmaking. The brand combines jewellery expertise with haute horlogerie.",
      "The <a href='/bvlgari/serpenti'>Serpenti</a> is Bvlgari's most iconic jewellery watch with serpent design. The <a href='/bvlgari/octo-finissimo'>Octo Finissimo</a> is the leading men's watch family with ultra-thin architecture. The <a href='/bvlgari/lvcea'>Lvcea</a> offers elegant women's watches.",
      "At Kariv Glamour, you'll find a curated selection of Bvlgari watches — from new models to <a href='/bvlgari-gebraucht'>pre-owned Bvlgari watches</a> with transparent condition grading.",
    ],
  },
};