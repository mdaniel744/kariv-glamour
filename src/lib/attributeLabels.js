// Display labels only. Canonical stored/filter values must never be translated.
const CZECH = {
  'Black': 'Černá', 'Blue': 'Modrá', 'Green': 'Zelená', 'Gray': 'Šedá', 'Grey': 'Šedá', 'Silver': 'Stříbrná',
  'White': 'Bílá', 'Brown': 'Hnědá', 'Champagne': 'Šampaňská', 'Pink': 'Růžová', 'Red': 'Červená', 'Violet': 'Fialová',
  'Orange': 'Oranžová', 'Yellow': 'Žlutá', 'Mother of Pearl': 'Perleť', 'Skeleton': 'Skeleton', 'Beige': 'Béžová',
  'Stainless Steel': 'Nerezová ocel', 'Steel': 'Ocel', 'Yellow Gold': 'Žluté zlato', 'Rose Gold': 'Růžové zlato',
  'White Gold': 'Bílé zlato', 'Platinum': 'Platina', 'Titanium': 'Titan', 'Ceramic': 'Keramika', 'Carbon': 'Karbon',
  'Bronze': 'Bronz', 'Two-Tone': 'Bicolor', 'Steel and Gold': 'Ocel a zlato', 'Steel and Rose Gold': 'Ocel a růžové zlato',
  'Rubber': 'Kaučuk', 'Leather': 'Kůže', 'Alligator Leather': 'Aligátoří kůže', 'Textile': 'Textil', 'Nylon': 'Nylon',
  'Automatic': 'Automatický nátah', 'Self-winding': 'Automatický nátah', 'Manual-winding': 'Ruční nátah',
  'Manual Winding': 'Ruční nátah', 'Quartz': 'Quartz', 'Mechanical': 'Mechanický', 'Chronograph': 'Chronograf',
  'New': 'Nové', 'Unworn': 'Nenošené', 'Excellent': 'Výborný', 'Very Good': 'Velmi dobrý', 'Good': 'Dobrý',
  'Vintage': 'Vintage', 'Used': 'Použité', 'Pre-Owned': 'Použité', 'Pre-owned': 'Použité',
  'Men': 'Pánské', "Men's": 'Pánské', 'Women': 'Dámské', "Women's": 'Dámské', 'Unisex': 'Unisex',
  'Round': 'Kulaté', 'Rectangular': 'Obdélníkové', 'Square': 'Čtvercové', 'Oval': 'Oválné', 'Cushion': 'Polštářové',
  'Tonneau': 'Soudkovité', 'Octagonal': 'Osmihranné', 'In Stock': 'Skladem', 'Sold': 'Prodáno',
  'Reserved': 'Rezervováno', 'Coming Soon': 'Již brzy', 'Full Set': 'Kompletní sada', 'Full set': 'Kompletní sada',
  'Box included': 'S krabičkou', 'Papers included': 'S doklady', 'Box and Papers': 'Krabička a doklady',
  'Box only': 'Pouze krabička', 'Papers only': 'Pouze doklady', 'Mini': 'Mini', 'Small': 'Malé', 'Medium': 'Střední',
  'Large': 'Velké', 'Extra Large': 'Velmi velké', 'Black Dial': 'Černý ciferník', 'Blue Dial': 'Modrý ciferník',
  'Green Dial': 'Zelený ciferník', 'Steel Case': 'Ocelové pouzdro', 'Rose Gold Case': 'Pouzdro z růžového zlata',
  'Titanium Case': 'Titanové pouzdro', 'Dress Watches': 'Společenské hodinky', 'Sports Watches': 'Sportovní hodinky',
  'Diving Watches': 'Potápěčské hodinky', 'Dive Watches': 'Potápěčské hodinky', 'Pilot Watches': 'Pilotní hodinky',
  'Moonphase': 'Měsíční fáze', 'Perpetual Calendar': 'Věčný kalendář', 'Annual Calendar': 'Roční kalendář',
  'Power Reserve': 'Rezerva chodu', 'Sapphire Crystal': 'Safírové sklíčko',
  'Sapphire': 'Safír', 'Mineral': 'Minerální sklo', 'Hesalite': 'Hesalit', 'Acrylic': 'Akrylát',
};

export function attributeLabel(value, locale) {
  if (locale !== 'cs' || typeof value !== 'string') return value;
  if (CZECH[value]) return CZECH[value];
  if (/^\d+(?:[.,]\d+)? mm Case$/.test(value)) return `${value.replace(/ Case$/, '')} pouzdro`;
  return value; // Brand names, references and collection names stay intact.
}
