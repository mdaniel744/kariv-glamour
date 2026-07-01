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
    shortDescription_en: "Bvlgari's most iconic jewellery-watch collection, known for serpent-inspired design, wraparound bracelets, gem-set details and strong women's luxury appeal.",
    shortDescription_de: "Bvlgaris ikonischste Schmuckuhren-Kollektion, bekannt für schlangeninspiriertes Design, Wickelarmbänder, Edelsteinbesatz und starken weiblichen Luxus-Appeal." },
  { id: 2, name: 'Octo Finissimo', slug: 'octo-finissimo', image: IMG_CHRONOGRAPH,
    shortDescription_en: "A modern Bvlgari watch family known for ultra-thin architecture, angular Roman-inspired design, integrated bracelets and mechanical watchmaking innovation.",
    shortDescription_de: "Eine moderne Bvlgari-Uhrenfamilie, bekannt für ultradünne Architektur, eckiges römisches Design, integrierte Armbänder und mechanische Uhrmacher-Innovation." },
  { id: 3, name: 'Octo Roma', slug: 'octo-roma', image: '',
    shortDescription_en: "A refined Octo collection with softened geometry, automatic movements and a more classic expression of Bvlgari's Roman design language.",
    shortDescription_de: "Eine verfeinerte Octo-Kollektion mit weicherer Geometrie, automatischen Uhrwerken und einem klassischeren Ausdruck von Bvlgaris römischer Designsprache." },
  { id: 4, name: 'Bulgari Bulgari', slug: 'bulgari-bulgari', image: '',
    shortDescription_en: "A signature Bvlgari watch line recognized for its engraved bezel, clean luxury styling and strong brand identity.",
    shortDescription_de: "Eine signature Bvlgari-Uhrenlinie, die für ihre gravierte Lünette, ihr klares Luxus-Styling und ihre starke Markenidentität bekannt ist." },
  { id: 5, name: 'Lvcea', slug: 'lvcea', image: '',
    shortDescription_en: "An elegant women's Bvlgari watch collection combining jewellery-inspired details, feminine proportions and everyday luxury wearability.",
    shortDescription_de: "Eine elegante Bvlgari-Damenuhren-Kollektion, die schmuckinspirierte Details, feminine Proportionen und alltägliche Luxus-Tragbarkeit vereint." },
  { id: 6, name: 'Aluminium', slug: 'aluminium', image: IMG_ALUMINIUM,
    shortDescription_en: "A casual Bvlgari sport-watch collection with lightweight materials, bold contrast and modern everyday character.",
    shortDescription_de: "Eine sportliche Bvlgari-Uhren-Kollektion mit leichten Materialien, starkem Kontrast und modernem Alltagscharakter." },
  { id: 7, name: 'High Jewellery Watches', slug: 'high-jewellery-watches', image: '',
    shortDescription_en: "A rare Bvlgari category for gem-set watches, jewellery craftsmanship and collector-focused pieces.",
    shortDescription_de: "Eine seltene Bvlgari-Kategorie für edelsteinbesetzte Uhren, Schmuckhandwerk und sammlerorientierte Stücke." },
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
  { label_en: 'Serpenti', label_de: 'Serpenti', link: '/bvlgari/serpenti' },
  { label_en: 'Octo Finissimo', label_de: 'Octo Finissimo', link: '/bvlgari/octo-finissimo' },
  { label_en: 'Octo Roma', label_de: 'Octo Roma', link: '/bvlgari/octo-roma' },
  { label_en: "Women's", label_de: 'Damen', link: '/bvlgari-uhr-damen' },
  { label_en: "Men's", label_de: 'Herren', link: '/bvlgari-uhr-herren' },
  { label_en: 'Aluminium', label_de: 'Aluminium', link: '/bvlgari/aluminium' },
  { label_en: 'Pre-Owned', label_de: 'Gebraucht', link: '/bvlgari-gebraucht' },
];

export const BVLGARI_SEO_CARDS = [
  { title_en: 'Bvlgari Watch', title_de: 'Bvlgari Uhr', link: '/bvlgari-uhr',
    description_en: 'Explore Bvlgari watches at Kariv Glamour — Serpenti, Octo Finissimo, Octo Roma, Lvcea and Bulgari Bulgari with Italian luxury design.',
    description_de: 'Entdecken Sie Bvlgari Uhren bei Kariv Glamour — Serpenti, Octo Finissimo, Octo Roma, Lvcea und Bulgari Bulgari mit italienischem Luxusdesign.' },
  { title_en: "Bvlgari Women's Watches", title_de: 'Bvlgari Uhr Damen', link: '/bvlgari-uhr-damen',
    description_en: "Bvlgari women's watches at Kariv Glamour — Serpenti, Lvcea and Bulgari Bulgari models for women.",
    description_de: 'Bvlgari Damenuhren bei Kariv Glamour — Serpenti, Lvcea und Bulgari Bulgari Modelle für Damen.' },
  { title_en: "Bvlgari Men's Watches", title_de: 'Bvlgari Uhr Herren', link: '/bvlgari-uhr-herren',
    description_en: "Bvlgari men's watches at Kariv Glamour — Octo Finissimo, Octo Roma and Bulgari Bulgari models for men.",
    description_de: 'Bvlgari Herrenuhren bei Kariv Glamour — Octo Finissimo, Octo Roma und Bulgari Bulgari Modelle für Herren.' },
  { title_en: 'Bvlgari Serpenti', title_de: 'Bvlgari Serpenti', link: '/bvlgari/serpenti',
    description_en: 'Discover the Bvlgari Serpenti collection — serpent-inspired jewellery watches with tubogas bracelet and gem-set details.',
    description_de: 'Entdecken Sie die Bvlgari Serpenti Kollektion — schlangeninspirierte Schmuckuhren mit Tubogas-Armband und Edelsteinbesatz.' },
  { title_en: 'Bvlgari Serpenti Watch', title_de: 'Bvlgari Serpenti Watch', link: '/bvlgari-serpenti-watch',
    description_en: 'Learn about the Bvlgari Serpenti Watch — iconic serpent design with tubogas or seduttori bracelet.',
    description_de: 'Erfahren Sie mehr über die Bvlgari Serpenti Watch — ikonisches Schlangen-Design mit Tubogas- oder Seduttori-Armband.' },
  { title_en: 'Bvlgari Octo Finissimo', title_de: 'Bvlgari Octo Finissimo', link: '/bvlgari/octo-finissimo',
    description_en: 'Discover the Bvlgari Octo Finissimo collection — ultra-thin mechanical watches with angular Roman-inspired design.',
    description_de: 'Entdecken Sie die Bvlgari Octo Finissimo Kollektion — ultradünne mechanische Uhren mit eckigem römischem Design.' },
];

export const BVLGARI_READ_MORE = [
  { title_en: 'Bvlgari Story', title_de: 'Bvlgari Story', link: '/bvlgari/story',
    description_en: "Explore Bvlgari's heritage of Roman jewellery design, Italian luxury and Swiss watchmaking.",
    description_de: 'Entdecken Sie Bvlgaris Heritage von römischem Schmuck-Design, italienischem Luxus und Schweizer Uhrmacherkunst.' },
  { title_en: 'Bvlgari Serpenti Guide', title_de: 'Bvlgari Serpenti Guide', link: '/bvlgari-serpenti-guide',
    description_en: 'Understand the Bvlgari Serpenti family — serpent design, tubogas bracelets and jewellery-watch expertise.',
    description_de: 'Verstehen Sie die Bvlgari Serpenti Familie — Schlangendesign, Tubogas-Armbänder und Schmuckuhren-Expertise.' },
  { title_en: 'Bvlgari Octo Finissimo Guide', title_de: 'Bvlgari Octo Finissimo Guide', link: '/bvlgari-octo-finissimo-guide',
    description_en: 'Understand the Bvlgari Octo Finissimo family — ultra-thin architecture and mechanical innovation.',
    description_de: 'Verstehen Sie die Bvlgari Octo Finissimo Familie — ultradünne Architektur und mechanische Innovation.' },
  { title_en: "Bvlgari Women's Watch Guide", title_de: 'Bvlgari Damenuhren Guide', link: '/bvlgari-uhr-damen',
    description_en: "Discover Bvlgari women's watches — Serpenti, Lvcea and Bulgari Bulgari models for women.",
    description_de: 'Entdecken Sie Bvlgari Damenuhren — Serpenti, Lvcea und Bulgari Bulgari Modelle für Frauen.' },
  { title_en: 'Buying Pre-Owned Bvlgari', title_de: 'Gebrauchte Bvlgari kaufen', link: '/bvlgari-gebraucht',
    description_en: 'What to check before buying a used Bvlgari — condition, box and papers, reference number, and authentication.',
    description_de: 'Was Sie vor dem Kauf einer gebrauchten Bvlgari prüfen sollten — Zustand, Box und Papiere, Referenznummer und Authentifizierung.' },
];

export const BVLGARI_INTERNAL_LINKS = [
  {
    title_en: 'Popular Bvlgari Searches', title_de: 'Beliebte Bvlgari Suchen',
    links: [
      { label_en: 'Bvlgari Watch', label_de: 'Bvlgari Uhr', to: '/bvlgari-uhr' },
      { label_en: "Bvlgari Women's Watches", label_de: 'Bvlgari Uhr Damen', to: '/bvlgari-uhr-damen' },
      { label_en: "Bvlgari Men's Watches", label_de: 'Bvlgari Uhr Herren', to: '/bvlgari-uhr-herren' },
      { label_en: 'Bvlgari Serpenti', label_de: 'Bvlgari Serpenti', to: '/bvlgari/serpenti' },
      { label_en: 'Bvlgari Serpenti Watch', label_de: 'Bvlgari Serpenti Watch', to: '/bvlgari-serpenti-watch' },
      { label_en: 'Bvlgari Octo Finissimo', label_de: 'Bvlgari Octo Finissimo', to: '/bvlgari/octo-finissimo' },
    ],
  },
  {
    title_en: 'Bvlgari Collections', title_de: 'Bvlgari Kollektionen',
    links: [
      { label_en: 'Serpenti', label_de: 'Serpenti', to: '/bvlgari/serpenti' },
      { label_en: 'Octo Finissimo', label_de: 'Octo Finissimo', to: '/bvlgari/octo-finissimo' },
      { label_en: 'Octo Roma', label_de: 'Octo Roma', to: '/bvlgari/octo-roma' },
      { label_en: 'Bulgari Bulgari', label_de: 'Bulgari Bulgari', to: '/bvlgari/bulgari-bulgari' },
      { label_en: 'Lvcea', label_de: 'Lvcea', to: '/bvlgari/lvcea' },
      { label_en: 'Aluminium', label_de: 'Aluminium', to: '/bvlgari/aluminium' },
      { label_en: 'High Jewellery Watches', label_de: 'High Jewellery Watches', to: '/bvlgari/high-jewellery-watches' },
    ],
  },
  {
    title_en: 'Buy & Pre-Owned', title_de: 'Kaufen & Gebraucht',
    links: [
      { label_en: 'Buy Bvlgari', label_de: 'Bvlgari kaufen', to: '/bvlgari-kaufen' },
      { label_en: 'Buy Bvlgari Watch', label_de: 'Bvlgari Uhr kaufen', to: '/bvlgari-uhr-kaufen' },
      { label_en: 'Pre-Owned Bvlgari', label_de: 'Bvlgari gebraucht', to: '/bvlgari-gebraucht' },
      { label_en: 'Pre-Owned Bvlgari Watches', label_de: 'Gebrauchte Bvlgari Uhren', to: '/gebrauchte-bvlgari-uhren' },
    ],
  },
  {
    title_en: 'Bulgari Spelling Variants', title_de: 'Bulgari Schreibweise',
    links: [
      { label_en: 'Bulgari Watch', label_de: 'Bulgari Uhr', to: '/bulgari-uhr' },
      { label_en: 'Bulgari Watches', label_de: 'Bulgari Uhren', to: '/bulgari-uhren' },
      { label_en: 'Serpenti Bvlgari', label_de: 'Serpenti Bvlgari', to: '/serpenti-bvlgari' },
      { label_en: 'Bvlgari Octo Roma', label_de: 'Bvlgari Octo Roma', to: '/bvlgari-octo-roma' },
      { label_en: 'Bvlgari Lvcea', label_de: 'Bvlgari Lvcea', to: '/bvlgari-lvcea' },
    ],
  },
  {
    title_en: 'Guides & Resources', title_de: 'Ratgeber & Guides',
    links: [
      { label_en: 'Which Bvlgari to Buy?', label_de: 'Welche Bvlgari kaufen?', to: '/welche-bvlgari-uhr-kaufen' },
      { label_en: 'Bvlgari Serpenti Guide', label_de: 'Bvlgari Serpenti Guide', to: '/bvlgari-serpenti-guide' },
      { label_en: 'Octo Finissimo Guide', label_de: 'Octo Finissimo Guide', to: '/bvlgari-octo-finissimo-guide' },
      { label_en: 'Bvlgari Story', label_de: 'Bvlgari Story', to: '/bvlgari/story' },
    ],
  },
  {
    title_en: 'Related Luxury Watch Brands', title_de: 'Verwandte Luxusuhren-Marken',
    links: [
      { label_en: 'Cartier watches', label_de: 'Cartier Uhren', to: '/brands/cartier' },
      { label_en: 'Rolex watches', label_de: 'Rolex Uhren', to: '/brands/rolex' },
      { label_en: 'Omega watches', label_de: 'Omega Uhren', to: '/brands/omega' },
      { label_en: 'Patek Philippe watches', label_de: 'Patek Philippe Uhren', to: '/brands/patek-philippe' },
      { label_en: 'Audemars Piguet watches', label_de: 'Audemars Piguet Uhren', to: '/brands/audemars-piguet' },
      { label_en: 'Hublot watches', label_de: 'Hublot Uhren', to: '/brands/hublot' },
    ],
  },
];

export const BVLGARI_FAQS = [
  {
    q_en: 'Where can I buy a Bvlgari watch online?', q_de: 'Wo kann ich eine Bvlgari Uhr online kaufen?',
    a_en: "You can buy Bvlgari watches online at Kariv Glamour. Browse new and <a href='/bvlgari-gebraucht'>pre-owned Bvlgari watches</a> with transparent product details, reference numbers, and condition grading.",
    a_de: "Sie können Bvlgari Uhren online bei Kariv Glamour kaufen. Stöbern Sie durch neue und <a href='/bvlgari-gebraucht'>gebrauchte Bvlgari Uhren</a> mit transparenten Produktdetails, Referenznummern und Zustandsbewertung." },
  {
    q_en: 'What is the most iconic Bvlgari watch?', q_de: 'Was ist die ikonischste Bvlgari Uhr?',
    a_en: "The most iconic Bvlgari watch is the <a href='/bvlgari/serpenti'>Serpenti</a> — a serpent-inspired jewellery watch with tubogas bracelet, blending Bvlgari's Roman jewellery heritage with Swiss watchmaking.",
    a_de: "Die ikonischste Bvlgari Uhr ist die <a href='/bvlgari/serpenti'>Serpenti</a> — eine schlangeninspirierte Schmuckuhr mit Tubogas-Armband, die Bvlgaris römisches Schmuck-Erbe mit Schweizer Uhrmacherkunst vereint." },
  {
    q_en: 'What is the Bvlgari Serpenti watch?', q_de: 'Was ist die Bvlgari Serpenti Uhr?',
    a_en: "The <a href='/bvlgari/serpenti'>Bvlgari Serpenti</a> is an iconic jewellery watch with serpent-inspired design, available in variants like Tubogas, Seduttori and Misteriosi. Read more on our <a href='/bvlgari-serpenti-watch'>Serpenti Watch page</a>.",
    a_de: "Die <a href='/bvlgari/serpenti'>Bvlgari Serpenti</a> ist eine ikonische Schmuckuhr mit schlangeninspiriertem Design, die in Varianten wie Tubogas, Seduttori und Misteriosi erhältlich ist. Lesen Sie mehr auf unserer <a href='/bvlgari-serpenti-watch'>Serpenti Watch Seite</a>." },
  {
    q_en: 'Are Bvlgari Serpenti watches mainly for women?', q_de: 'Sind Bvlgari Serpenti Uhren hauptsächlich für Frauen?',
    a_en: "Yes, the <a href='/bvlgari/serpenti'>Serpenti</a> is one of the strongest <a href='/bvlgari-uhr-damen'>Bvlgari women's watches</a>. The serpent-inspired design and jewellery-watch aesthetic appeal primarily to women.",
    a_de: "Ja, die <a href='/bvlgari/serpenti'>Serpenti</a> ist eine der stärksten <a href='/bvlgari-uhr-damen'>Bvlgari Damenuhren</a>. Das schlangeninspirierte Design und die Schmuckuhren-Ästhetik richten sich überwiegend an Frauen." },
  {
    q_en: 'What is the difference between Bvlgari Serpenti and Lvcea?', q_de: 'Was ist der Unterschied zwischen Bvlgari Serpenti und Lvcea?',
    a_en: "The <a href='/bvlgari/serpenti'>Serpenti</a> is a serpent-inspired jewellery watch with wraparound bracelet, while the <a href='/bvlgari/lvcea'>Lvcea</a> is a more elegant women's watch collection with a more classic design and feminine proportions.",
    a_de: "Die <a href='/bvlgari/serpenti'>Serpenti</a> ist eine schlangeninspirierte Schmuckuhr mit Wickelarmband, während die <a href='/bvlgari/lvcea'>Lvcea</a> eine elegantere Damenuhren-Kollektion mit klassischerem Design und femininen Proportionen ist." },
  {
    q_en: 'What is Bvlgari Octo Finissimo?', q_de: 'Was ist Bvlgari Octo Finissimo?',
    a_en: "The <a href='/bvlgari/octo-finissimo'>Bvlgari Octo Finissimo</a> is a modern men's watch family known for its ultra-thin architecture, angular Roman-inspired design and mechanical world records.",
    a_de: "Die <a href='/bvlgari/octo-finissimo'>Bvlgari Octo Finissimo</a> ist eine moderne Herrenuhren-Familie, die für ihre ultradünne Architektur, ihr eckiges römisches Design und ihre mechanischen Weltrekorde bekannt ist." },
  {
    q_en: "Does Bvlgari make men's watches?", q_de: 'Stellt Bvlgari auch Herrenuhren her?',
    a_en: "Yes. The <a href='/bvlgari/octo-finissimo'>Octo Finissimo</a>, <a href='/bvlgari/octo-roma'>Octo Roma</a> and <a href='/bvlgari/aluminium'>Aluminium</a> collections are Bvlgari's strongest <a href='/bvlgari-uhr-herren'>men's watches</a> with automatic movements and integrated bracelets.",
    a_de: "Ja. Die <a href='/bvlgari/octo-finissimo'>Octo Finissimo</a>, <a href='/bvlgari/octo-roma'>Octo Roma</a> und <a href='/bvlgari/aluminium'>Aluminium</a> Kollektionen sind Bvlgaris stärkste <a href='/bvlgari-uhr-herren'>Herrenuhren</a> mit automatischen Uhrwerken und integrierten Armbändern." },
  {
    q_en: 'What should I check before buying a pre-owned Bvlgari watch?', q_de: 'Was sollte ich vor dem Kauf einer gebrauchten Bvlgari prüfen?',
    a_en: "Check the condition of the case and bracelet, verify the movement (automatic or quartz), confirm box and papers, and review the reference number. Visit our <a href='/bvlgari-gebraucht'>pre-owned Bvlgari</a> page for transparent listings.",
    a_de: "Prüfen Sie den Zustand von Gehäuse und Armband, verifizieren Sie das Uhrwerk (Automatik oder Quarz), bestätigen Sie Box und Papiere, und überprüfen Sie die Referenznummer. Besuchen Sie unsere Seite für <a href='/bvlgari-gebraucht'>gebrauchte Bvlgari Uhren</a> mit transparenten Einträgen." },
];

export const BVLGARI_SEO_PAGES = {
  'bvlgari-uhr': {
    h1_en: 'Bvlgari Watch', h1_de: 'Bvlgari Uhr',
    title_en: 'Bvlgari Watch | Kariv Glamour', title_de: 'Bvlgari Uhr | Kariv Glamour',
    description_en: 'Discover Bvlgari watches at Kariv Glamour — Serpenti, Octo Finissimo, Octo Roma, Lvcea and Bulgari Bulgari with Italian luxury design.',
    description_de: 'Entdecken Sie Bvlgari Uhren bei Kariv Glamour — Serpenti, Octo Finissimo, Octo Roma, Lvcea und Bulgari Bulgari mit italienischem Luxusdesign.',
    intro_en: "Explore Bvlgari watches at Kariv Glamour — with Italian luxury design, Roman jewellery heritage, Swiss watchmaking and iconic collections such as Serpenti, Octo Finissimo, Octo Roma, Lvcea and Bulgari Bulgari.",
    intro_de: 'Erkunden Sie Bvlgari Uhren bei Kariv Glamour — mit italienischem Luxusdesign, römischem Schmuck-Erbe, Schweizer Uhrmacherkunst und ikonischen Kollektionen wie Serpenti, Octo Finissimo, Octo Roma, Lvcea und Bulgari Bulgari.',
    filter: {},
  },
  'bvlgari-uhren': {
    h1_en: 'Bvlgari Watches', h1_de: 'Bvlgari Uhren',
    title_en: 'Bvlgari Watches | Kariv Glamour', title_de: 'Bvlgari Uhren | Kariv Glamour',
    description_en: 'Bvlgari watches at Kariv Glamour — Serpenti, Octo Finissimo, Octo Roma, Lvcea and Bulgari Bulgari collections.',
    description_de: 'Bvlgari Uhren bei Kariv Glamour — Serpenti, Octo Finissimo, Octo Roma, Lvcea und Bulgari Bulgari Kollektionen.',
    intro_en: 'Browse Bvlgari watches by collection, model, movement, case size, condition, and price.',
    intro_de: 'Stöbern Sie durch Bvlgari Uhren nach Kollektion, Modell, Uhrwerk, Gehäusegröße, Zustand und Preis.',
    filter: {},
  },
  'bulgari-uhr': {
    h1_en: 'Bulgari Watch', h1_de: 'Bulgari Uhr',
    title_en: 'Bulgari Watch | Kariv Glamour', title_de: 'Bulgari Uhr | Kariv Glamour',
    description_en: 'Bulgari watch at Kariv Glamour — the same iconic Bvlgari collections under the alternative spelling.',
    description_de: 'Bulgari Uhr bei Kariv Glamour — dieselben ikonischen Bvlgari Kollektionen unter der alternativen Schreibweise.',
    intro_en: 'Bulgari watch at Kariv Glamour: Discover the same iconic collections — Serpenti, Octo Finissimo, Octo Roma, Lvcea and Bulgari Bulgari — under the traditional spelling.',
    intro_de: 'Bulgari Uhr bei Kariv Glamour: Entdecken Sie dieselben ikonischen Kollektionen — Serpenti, Octo Finissimo, Octo Roma, Lvcea und Bulgari Bulgari — unter der traditionellen Schreibweise.',
    filter: {},
  },
  'bulgari-uhren': {
    h1_en: 'Bulgari Watches', h1_de: 'Bulgari Uhren',
    title_en: 'Bulgari Watches | Kariv Glamour', title_de: 'Bulgari Uhren | Kariv Glamour',
    description_en: 'Bulgari watches at Kariv Glamour — Serpenti, Octo and Lvcea under the alternative spelling.',
    description_de: 'Bulgari Uhren bei Kariv Glamour — Serpenti, Octo und Lvcea unter der alternativen Schreibweise.',
    intro_en: 'Bulgari watches at Kariv Glamour: Browse the iconic collections of the Bvlgari brand with Italian luxury design.',
    intro_de: 'Bulgari Uhren bei Kariv Glamour: Stöbern Sie durch die ikonischen Kollektionen der Marke Bvlgari mit italienischem Luxusdesign.',
    filter: {},
  },
  'bvlgari-uhr-damen': {
    h1_en: "Bvlgari Women's Watches", h1_de: 'Bvlgari Uhr Damen',
    title_en: "Bvlgari Women's Watches | Kariv Glamour", title_de: 'Bvlgari Uhr Damen | Kariv Glamour',
    description_en: "Bvlgari women's watches at Kariv Glamour — Serpenti, Lvcea and Bulgari Bulgari models for women.",
    description_de: 'Bvlgari Damenuhren bei Kariv Glamour — Serpenti, Lvcea und Bulgari Bulgari Modelle für Damen.',
    intro_en: "Discover Bvlgari women's watches — from the iconic Serpenti to the elegant Lvcea to the Bulgari Bulgari with jewellery-inspired details and feminine proportions.",
    intro_de: 'Entdecken Sie Bvlgari Damenuhren — von der ikonischen Serpenti über die elegante Lvcea bis zur Bulgari Bulgari mit schmuckinspirierten Details und femininen Proportionen.',
    filter: { gender: 'Women' },
  },
  'bvlgari-uhr-herren': {
    h1_en: "Bvlgari Men's Watches", h1_de: 'Bvlgari Uhr Herren',
    title_en: "Bvlgari Men's Watches | Kariv Glamour", title_de: 'Bvlgari Uhr Herren | Kariv Glamour',
    description_en: "Bvlgari men's watches at Kariv Glamour — Octo Finissimo, Octo Roma and Aluminium models for men.",
    description_de: 'Bvlgari Herrenuhren bei Kariv Glamour — Octo Finissimo, Octo Roma und Aluminium Modelle für Herren.',
    intro_en: "Discover Bvlgari men's watches — from the ultra-thin Octo Finissimo to the classic Octo Roma to the sporty Aluminium with automatic movements and integrated bracelets.",
    intro_de: 'Entdecken Sie Bvlgari Herrenuhren — von der ultradünnen Octo Finissimo über die klassische Octo Roma bis zur sportlichen Aluminium mit automatischen Uhrwerken und integrierten Armbändern.',
    filter: { gender: 'Men' },
  },
  'bvlgari-kaufen': {
    h1_en: 'Buy Bvlgari', h1_de: 'Bvlgari kaufen',
    title_en: 'Buy Bvlgari | Kariv Glamour', title_de: 'Bvlgari kaufen | Kariv Glamour',
    description_en: 'Buy Bvlgari at Kariv Glamour — Serpenti, Octo Finissimo, Octo Roma and more.',
    description_de: 'Bvlgari kaufen bei Kariv Glamour — Serpenti, Octo Finissimo, Octo Roma und mehr.',
    intro_en: 'Buy Bvlgari at Kariv Glamour: discover watches from all collections with transparent condition grading.',
    intro_de: 'Bvlgari kaufen bei Kariv Glamour: entdecken Sie Uhren aus allen Kollektionen mit transparenter Zustandsbewertung.',
    filter: {},
  },
  'bvlgari-uhr-kaufen': {
    h1_en: 'Buy Bvlgari Watch', h1_de: 'Bvlgari Uhr kaufen',
    title_en: 'Buy Bvlgari Watch | Kariv Glamour', title_de: 'Bvlgari Uhr kaufen | Kariv Glamour',
    description_en: 'Buy Bvlgari watch at Kariv Glamour — new and pre-owned models with transparent product information.',
    description_de: 'Bvlgari Uhr kaufen bei Kariv Glamour — neue und gebrauchte Modelle mit transparenter Produktinformation.',
    intro_en: 'Buy Bvlgari watch at Kariv Glamour: new and pre-owned models with transparent product information and condition grading.',
    intro_de: 'Bvlgari Uhr kaufen bei Kariv Glamour: neue und gebrauchte Modelle mit transparenter Produktinformation und Zustandsbewertung.',
    filter: {},
  },
  'bvlgari-gebraucht': {
    h1_en: 'Pre-Owned Bvlgari', h1_de: 'Bvlgari gebraucht',
    title_en: 'Pre-Owned Bvlgari | Kariv Glamour', title_de: 'Bvlgari gebraucht | Kariv Glamour',
    description_en: 'Pre-owned Bvlgari watches at Kariv Glamour with transparent condition grading.',
    description_de: 'Gebrauchte Bvlgari Uhren bei Kariv Glamour mit transparenter Zustandsbewertung.',
    intro_en: 'Discover pre-owned Bvlgari watches with clear condition grading, box and papers, and detailed product data.',
    intro_de: 'Entdecken Sie gebrauchte Bvlgari Uhren mit klarer Zustandsbewertung, Box und Papers und detaillierten Produktdaten.',
    filter: {},
  },
  'bvlgari-gebraucht-kaufen': {
    h1_en: 'Buy Pre-Owned Bvlgari', h1_de: 'Bvlgari gebraucht kaufen',
    title_en: 'Buy Pre-Owned Bvlgari | Kariv Glamour', title_de: 'Bvlgari gebraucht kaufen | Kariv Glamour',
    description_en: 'Buy pre-owned Bvlgari at Kariv Glamour — inspected pre-owned watches with condition reports.',
    description_de: 'Bvlgari gebraucht kaufen bei Kariv Glamour — geprüfte Gebrauchtuhren mit Zustandsbericht.',
    intro_en: 'Buy pre-owned Bvlgari at Kariv Glamour: inspected watches with transparent condition reports and authentication.',
    intro_de: 'Bvlgari gebraucht kaufen bei Kariv Glamour: geprüfte Uhren mit transparentem Zustandsbericht und Authentifizierung.',
    filter: {},
  },
  'gebrauchte-bvlgari-uhren': {
    h1_en: 'Pre-Owned Bvlgari Watches', h1_de: 'Gebrauchte Bvlgari Uhren',
    title_en: 'Pre-Owned Bvlgari Watches | Kariv Glamour', title_de: 'Gebrauchte Bvlgari Uhren | Kariv Glamour',
    description_en: 'Pre-owned Bvlgari watches at Kariv Glamour — Serpenti, Octo and Lvcea with condition grading.',
    description_de: 'Gebrauchte Bvlgari Uhren bei Kariv Glamour — Serpenti, Octo und Lvcea mit Zustandsbewertung.',
    intro_en: 'Browse pre-owned Bvlgari watches — from Serpenti to Octo Finissimo to Lvcea.',
    intro_de: 'Stöbern Sie durch gebrauchte Bvlgari Uhren — von der Serpenti über die Octo Finissimo bis zur Lvcea.',
    filter: {},
  },
  'bvlgari-serpenti-watch': {
    h1_en: 'Bvlgari Serpenti Watch', h1_de: 'Bvlgari Serpenti Watch',
    title_en: 'Bvlgari Serpenti Watch | Kariv Glamour', title_de: 'Bvlgari Serpenti Watch | Kariv Glamour',
    description_en: 'Learn about the Bvlgari Serpenti Watch — iconic serpent design with tubogas or seduttori bracelet.',
    description_de: 'Erfahren Sie mehr über die Bvlgari Serpenti Watch — ikonisches Schlangendesign mit Tubogas- oder Seduttori-Armband.',
    intro_en: 'The Bvlgari Serpenti Watch is an iconic jewellery watch with serpent-inspired design, available in variants like Tubogas, Seduttori, Misteriosi and Spiga. Explore the <a href="/bvlgari/serpenti">Serpenti collection</a>.',
    intro_de: 'Die Bvlgari Serpenti Watch ist eine ikonische Schmuckuhr mit schlangeninspiriertem Design, die in Varianten wie Tubogas, Seduttori, Misteriosi und Spiga erhältlich ist. Entdecken Sie die <a href="/bvlgari/serpenti">Serpenti Kollektion</a>.',
    isGuide: true,
    guideContent_en: [
      "The <a href='/bvlgari/serpenti'>Bvlgari Serpenti</a> is one of the most iconic jewellery watches in the world. Its serpent-inspired design combines Bvlgari's Roman jewellery heritage with Swiss watchmaking.",
      "The Serpenti is available in several variants: <strong>Tubogas</strong> (flexible wraparound bracelet), <strong>Seduttori</strong> (flatter, modern design), <strong>Misteriosi</strong> (hidden movement) and <strong>Spiga</strong> (braided bracelet).",
      "At Kariv Glamour, you'll find a curated selection of Serpenti watches — from new models to <a href='/bvlgari-gebraucht'>pre-owned Bvlgari watches</a> with transparent condition grading.",
    ],
    guideContent_de: [
      "Die <a href='/bvlgari/serpenti'>Bvlgari Serpenti</a> ist eine der ikonischsten Schmuckuhren der Welt. Ihr schlangeninspiriertes Design vereint Bvlgaris römisches Schmuck-Erbe mit Schweizer Uhrmacherkunst.",
      "Die Serpenti ist in mehreren Varianten erhältlich: <strong>Tubogas</strong> (flexibles Wickelarmband), <strong>Seduttori</strong> (flacheres, modernes Design), <strong>Misteriosi</strong> (verstecktes Uhrwerk) und <strong>Spiga</strong> (geflochtenes Armband).",
      "Bei Kariv Glamour finden Sie eine kuratierte Auswahl an Serpenti Uhren — von neuen Modellen bis zu <a href='/bvlgari-gebraucht'>gebrauchten Bvlgari Uhren</a> mit transparenter Zustandsbewertung.",
    ],
  },
  'serpenti-bvlgari': {
    h1_en: 'Serpenti Bvlgari', h1_de: 'Serpenti Bvlgari',
    title_en: 'Serpenti Bvlgari | Kariv Glamour', title_de: 'Serpenti Bvlgari | Kariv Glamour',
    description_en: 'Serpenti Bvlgari — the iconic jewellery watch with serpent design and tubogas bracelet.',
    description_de: 'Serpenti Bvlgari — die ikonische Schmuckuhr mit Schlangendesign und Tubogas-Armband.',
    intro_en: 'Serpenti Bvlgari is the brand\'s most iconic jewellery watch. Explore the <a href="/bvlgari/serpenti">Serpenti collection</a> at Kariv Glamour.',
    intro_de: 'Serpenti Bvlgari ist die ikonischste Schmuckuhr der Marke. Entdecken Sie die <a href="/bvlgari/serpenti">Serpenti Kollektion</a> bei Kariv Glamour.',
    filter: { collection: 'Serpenti' },
  },
  'bvlgari-octo-roma': {
    h1_en: 'Bvlgari Octo Roma', h1_de: 'Bvlgari Octo Roma',
    title_en: 'Bvlgari Octo Roma | Kariv Glamour', title_de: 'Bvlgari Octo Roma | Kariv Glamour',
    description_en: 'Bvlgari Octo Roma — softened geometry, automatic movements and classic Roman design language.',
    description_de: 'Bvlgari Octo Roma — weichere Geometrie, automatische Uhrwerke und klassische römische Designsprache.',
    intro_en: 'Discover the Bvlgari Octo Roma — a refined Octo collection with softened geometry, automatic movements and a more classic expression of Bvlgari\'s Roman design language.',
    intro_de: 'Entdecken Sie die Bvlgari Octo Roma — eine verfeinerte Octo-Kollektion mit weicherer Geometrie, automatischen Uhrwerken und einem klassischeren Ausdruck von Bvlgaris römischer Designsprache.',
    filter: { collection: 'Octo Roma' },
  },
  'bvlgari-lvcea': {
    h1_en: 'Bvlgari Lvcea', h1_de: 'Bvlgari Lvcea',
    title_en: 'Bvlgari Lvcea | Kariv Glamour', title_de: 'Bvlgari Lvcea | Kariv Glamour',
    description_en: "Bvlgari Lvcea — elegant women's watches with jewellery-inspired details and feminine proportions.",
    description_de: 'Bvlgari Lvcea — elegante Damenuhren mit schmuckinspirierten Details und femininen Proportionen.',
    intro_en: "Discover the Bvlgari Lvcea — an elegant women's watch collection combining jewellery-inspired details, feminine proportions and everyday luxury wearability.",
    intro_de: 'Entdecken Sie die Bvlgari Lvcea — eine elegante Damenuhren-Kollektion, die schmuckinspirierte Details, feminine Proportionen und alltägliche Luxus-Tragbarkeit vereint.',
    filter: { collection: 'Lvcea' },
  },
  'welche-bvlgari-uhr-kaufen': {
    h1_en: 'Which Bvlgari to Buy?', h1_de: 'Welche Bvlgari Uhr kaufen?',
    title_en: 'Which Bvlgari to Buy | Kariv Glamour', title_de: 'Welche Bvlgari Uhr kaufen | Kariv Glamour',
    description_en: 'Bvlgari buying guide — compare Serpenti, Octo Finissimo, Octo Roma, Lvcea and Bulgari Bulgari.',
    description_de: 'Bvlgari Kaufberatung — vergleichen Sie Serpenti, Octo Finissimo, Octo Roma, Lvcea und Bulgari Bulgari.',
    intro_en: 'Which Bvlgari watch is right for you? Compare collections, movements, case sizes, and features to make the right decision.',
    intro_de: 'Welche Bvlgari Uhr passt zu Ihnen? Vergleichen Sie Kollektionen, Uhrwerke, Gehäusegrößen und Funktionen, um die richtige Entscheidung zu treffen.',
    isGuide: true,
    guideContent_en: [
      "Bvlgari has two strong identities: jewellery watches for women (<a href='/bvlgari/serpenti'>Serpenti</a>, <a href='/bvlgari/lvcea'>Lvcea</a>) and modern men's tourbillons and ultra-thin watches (<a href='/bvlgari/octo-finissimo'>Octo Finissimo</a>, <a href='/bvlgari/octo-roma'>Octo Roma</a>).",
      "For women, the <a href='/bvlgari/serpenti'>Serpenti</a> is the most iconic choice with serpent design and tubogas bracelet. The <a href='/bvlgari/lvcea'>Lvcea</a> offers a more classic women's watch design.",
      "For men, the <a href='/bvlgari/octo-finissimo'>Octo Finissimo</a> is the best choice for ultra-thin mechanical watches. The <a href='/bvlgari/octo-roma'>Octo Roma</a> offers a more classic Octo design. The <a href='/bvlgari/aluminium'>Aluminium</a> is a sportier everyday watch.",
      "At Kariv Glamour, each Bvlgari timepiece is presented with transparent product details, clear condition grading, and reference number visibility. We do not sell replica or counterfeit watches.",
    ],
    guideContent_de: [
      "Bvlgari hat zwei starke Identitäten: Schmuckuhren für Damen (<a href='/bvlgari/serpenti'>Serpenti</a>, <a href='/bvlgari/lvcea'>Lvcea</a>) und moderne Herrentourbillons und ultradünne Uhren (<a href='/bvlgari/octo-finissimo'>Octo Finissimo</a>, <a href='/bvlgari/octo-roma'>Octo Roma</a>).",
      "Für Damen ist die <a href='/bvlgari/serpenti'>Serpenti</a> die ikonischste Wahl mit Schlangendesign und Tubogas-Armband. Die <a href='/bvlgari/lvcea'>Lvcea</a> bietet ein klassischeres Damenuhren-Design.",
      "Für Herren ist die <a href='/bvlgari/octo-finissimo'>Octo Finissimo</a> die beste Wahl für ultradünne mechanische Uhren. Die <a href='/bvlgari/octo-roma'>Octo Roma</a> bietet ein klassischeres Octo-Design. Die <a href='/bvlgari/aluminium'>Aluminium</a> ist eine sportlichere Alltagsuhr.",
      "Bei Kariv Glamour wird jede Bvlgari Uhr mit transparenten Produktdetails, klarer Zustandsbewertung und Referenznummer-Sichtbarkeit präsentiert. Wir verkaufen keine Replikate oder gefälschte Uhren.",
    ],
  },
  'bvlgari-serpenti-guide': {
    h1_en: 'Bvlgari Serpenti Guide', h1_de: 'Bvlgari Serpenti Guide',
    title_en: 'Bvlgari Serpenti Guide | Kariv Glamour', title_de: 'Bvlgari Serpenti Guide | Kariv Glamour',
    description_en: 'Understand the Bvlgari Serpenti family — serpent design, tubogas bracelets and jewellery-watch expertise.',
    description_de: 'Verstehen Sie die Bvlgari Serpenti Familie — Schlangendesign, Tubogas-Armbänder und Schmuckuhren-Expertise.',
    intro_en: 'The Bvlgari Serpenti Guide: Understand the Tubogas, Seduttori, Misteriosi and Spiga variants, and find the right Serpenti for your style.',
    intro_de: 'Die Bvlgari Serpenti Guide: Verstehen Sie die Varianten Tubogas, Seduttori, Misteriosi und Spiga, und finden Sie die richtige Serpenti für Ihren Stil.',
    isGuide: true,
    guideContent_en: [
      "The <a href='/bvlgari/serpenti'>Bvlgari Serpenti</a> is available in several variants: <strong>Tubogas</strong> (classic wraparound bracelet), <strong>Seduttori</strong> (modern, flat), <strong>Misteriosi</strong> (hidden movement) and <strong>Spiga</strong> (braided).",
      "The Serpenti is aimed primarily at <a href='/bvlgari-uhr-damen'>women</a> and is one of the strongest jewellery watches on the market. It combines Bvlgari's Roman jewellery heritage with Swiss watchmaking.",
      "At Kariv Glamour, you'll find a curated selection of Serpenti watches — from new models to <a href='/bvlgari-gebraucht'>pre-owned Bvlgari watches</a>.",
    ],
    guideContent_de: [
      "Die <a href='/bvlgari/serpenti'>Bvlgari Serpenti</a> ist in mehreren Varianten erhältlich: <strong>Tubogas</strong> (klassisches Wickelarmband), <strong>Seduttori</strong> (modern, flach), <strong>Misteriosi</strong> (verstecktes Uhrwerk) und <strong>Spiga</strong> (geflochten).",
      "Die Serpenti richtet sich hauptsächlich an <a href='/bvlgari-uhr-damen'>Damen</a> und ist eine der stärksten Schmuckuhren auf dem Markt. Sie vereint Bvlgaris römisches Schmuck-Erbe mit Schweizer Uhrmacherkunst.",
      "Bei Kariv Glamour finden Sie eine kuratierte Auswahl an Serpenti Uhren — von neuen Modellen bis zu <a href='/bvlgari-gebraucht'>gebrauchten Bvlgari Uhren</a>.",
    ],
  },
  'bvlgari-octo-finissimo-guide': {
    h1_en: 'Bvlgari Octo Finissimo Guide', h1_de: 'Bvlgari Octo Finissimo Guide',
    title_en: 'Bvlgari Octo Finissimo Guide | Kariv Glamour', title_de: 'Bvlgari Octo Finissimo Guide | Kariv Glamour',
    description_en: 'Understand the Bvlgari Octo Finissimo family — ultra-thin architecture and mechanical innovation.',
    description_de: 'Verstehen Sie die Bvlgari Octo Finissimo Familie — ultradünne Architektur und mechanische Innovation.',
    intro_en: 'The Bvlgari Octo Finissimo Guide: Understand the ultra-thin architecture, the angular Roman design language and the mechanical world records of the Octo Finissimo family.',
    intro_de: 'Die Bvlgari Octo Finissimo Guide: Verstehen Sie die ultradünne Architektur, die eckige römische Designsprache und die mechanischen Weltrekorde der Octo Finissimo Familie.',
    isGuide: true,
    guideContent_en: [
      "The <a href='/bvlgari/octo-finissimo'>Bvlgari Octo Finissimo</a> is known for its ultra-thin architecture and mechanical world records. The angular, Roman-inspired design is unique in haute horlogerie.",
      "The Octo Finissimo is aimed primarily at <a href='/bvlgari-uhr-herren'>men</a> and is available in variants like Automatic, Chronograph, Tourbillon and Skeleton.",
      "At Kariv Glamour, you'll find a curated selection of Octo Finissimo watches — from new models to <a href='/bvlgari-gebraucht'>pre-owned Bvlgari watches</a>.",
    ],
    guideContent_de: [
      "Die <a href='/bvlgari/octo-finissimo'>Bvlgari Octo Finissimo</a> ist für ihre ultradünne Architektur und ihre mechanischen Weltrekorde bekannt. Das eckige, römisch inspirierte Design ist einzigartig in der Haute Horlogerie.",
      "Die Octo Finissimo richtet sich hauptsächlich an <a href='/bvlgari-uhr-herren'>Herren</a> und ist in Varianten wie Automatik, Chronograph, Tourbillon und Skeleton erhältlich.",
      "Bei Kariv Glamour finden Sie eine kuratierte Auswahl an Octo Finissimo Uhren — von neuen Modellen bis zu <a href='/bvlgari-gebraucht'>gebrauchten Bvlgari Uhren</a>.",
    ],
  },
  'bvlgari-story': {
    h1_en: 'Bvlgari Story', h1_de: 'Bvlgari Story',
    title_en: 'Bvlgari Story | Kariv Glamour', title_de: 'Bvlgari Story | Kariv Glamour',
    description_en: 'The Bvlgari story — Roman jewellery design, Italian luxury and Swiss watchmaking.',
    description_de: 'Die Bvlgari Story — römisches Schmuck-Design, italienischer Luxus und Schweizer Uhrmacherkunst.',
    intro_en: "Bvlgari stands for Roman jewellery design, Italian luxury and Swiss watchmaking — from the iconic Serpenti to the Octo Finissimo to the Lvcea and Bulgari Bulgari.",
    intro_de: 'Bvlgari steht für römisches Schmuck-Design, italienischen Luxus und Schweizer Uhrmacherkunst — von der ikonischen Serpenti über die Octo Finissimo bis zur Lvcea und Bulgari Bulgari.',
    isGuide: true,
    guideContent_en: [
      "Bvlgari was founded in 1884 in Rome and is known for Italian luxury design, Roman jewellery heritage and Swiss watchmaking. The brand combines jewellery expertise with haute horlogerie.",
      "The <a href='/bvlgari/serpenti'>Serpenti</a> is Bvlgari's most iconic jewellery watch with serpent design. The <a href='/bvlgari/octo-finissimo'>Octo Finissimo</a> is the leading men's watch family with ultra-thin architecture. The <a href='/bvlgari/lvcea'>Lvcea</a> offers elegant women's watches.",
      "At Kariv Glamour, you'll find a curated selection of Bvlgari watches — from new models to <a href='/bvlgari-gebraucht'>pre-owned Bvlgari watches</a> with transparent condition grading.",
    ],
    guideContent_de: [
      "Bvlgari wurde 1884 in Rom gegründet und ist bekannt für italienisches Luxusdesign, römisches Schmuck-Erbe und Schweizer Uhrmacherkunst. Die Marke vereint Schmuck-Expertise mit Haute Horlogerie.",
      "Die <a href='/bvlgari/serpenti'>Serpenti</a> ist Bvlgaris ikonischste Schmuckuhr mit Schlangendesign. Die <a href='/bvlgari/octo-finissimo'>Octo Finissimo</a> ist die führende Herrenuhren-Familie mit ultradünner Architektur. Die <a href='/bvlgari/lvcea'>Lvcea</a> bietet elegante Damenuhren.",
      "Bei Kariv Glamour finden Sie eine kuratierte Auswahl an Bvlgari Uhren — von neuen Modellen bis zu <a href='/bvlgari-gebraucht'>gebrauchten Bvlgari Uhren</a> mit transparenter Zustandsbewertung.",
    ],
  },
};