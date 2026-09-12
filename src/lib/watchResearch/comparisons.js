import { bilingual as b } from './sources.js';
const row = (label, left, right) => ({ label, left, right });
export const COMPARISONS = {
  snowflakeShunbun: {
    left: 'SBGA211 Snowflake', right: 'SBGA413 Shunbun', sources: ['snowflake', 'shunbun'],
    rows: [
      row(b('Case diameter', 'Gehäusedurchmesser'), b('41 mm', '41 mm'), b('40 mm', '40 mm')),
      row(b('Lug-to-lug', 'Hörnerabstand'), b('49 mm', '49 mm'), b('47 mm', '47 mm')),
      row(b('Thickness', 'Höhe'), b('12.5 mm', '12,5 mm'), b('12.8 mm', '12,8 mm')),
      row(b('Case and bracelet', 'Gehäuse und Band'), b('Titanium', 'Titan'), b('Titanium', 'Titan')),
      row(b('Movement', 'Werk'), b('9R65 Spring Drive', '9R65 Spring Drive'), b('9R65 Spring Drive', '9R65 Spring Drive')),
      row(b('Dial appearance', 'Zifferblatt'), b('White texture', 'Weiße Struktur'), b('Pink-toned texture', 'Rosafarbene Struktur')),
    ],
    note: b('Reference-specific manufacturer measurements, not general specifications for every Snowflake or Shunbun variant. The smaller diameter is not the thinner watch.', 'Referenzbezogene Herstellermaße, keine allgemeinen Daten für jede Snowflake- oder Shunbun-Variante. Der kleinere Durchmesser bedeutet hier nicht das flachere Gehäuse.'),
  },
  speedSeamaster: {
    left: 'Speedmaster', right: 'Seamaster', sources: [],
    rows: [
      row(b('First distinction', 'Erste Unterscheidung'), b('Which chronograph and movement?', 'Welcher Chronograph und welches Werk?'), b('Diver 300M, Planet Ocean or Aqua Terra?', 'Diver 300M, Planet Ocean oder Aqua Terra?')),
      row(b('Useful comparison', 'Sinnvoller Vergleich'), b('Winding routine, pusher operation, crystal', 'Aufzug, Drücker, Glas'), b('Bezel, case thickness, intended water use', 'Lünette, Höhe, vorgesehene Wassernutzung')),
      row(b('Avoid assuming', 'Nicht voraussetzen'), b('Every Speedmaster is a manual Moonwatch', 'Jede Speedmaster ist eine Moonwatch mit Handaufzug'), b('Every Seamaster is the same type of diver', 'Jede Seamaster ist dieselbe Art Taucheruhr')),
    ],
    note: b('Use this to select a pair of exact references. It is a decision framework, not a complete family specification sheet.', 'Wählen Sie damit zwei konkrete Referenzen aus. Das ist eine Entscheidungshilfe, kein vollständiges Datenblatt der Modellfamilien.'),
  },
  blackBayPelagos: {
    left: 'Black Bay', right: 'Pelagos', sources: ['blackBay', 'pelagos'],
    rows: [
      row(b('Starting point', 'Ausgangspunkt'), b('Heritage-inspired styling across functions', 'Historisch geprägter Stil mit mehreren Funktionen'), b('Technical diving emphasis', 'Technischer Tauchfokus')),
      row(b('Narrow the search', 'Suche eingrenzen'), b('Simple display, GMT or chronograph?', 'Einfache Anzeige, GMT oder Chronograph?'), b('Standard, 39, LHD, FXD or Ultra?', 'Standard, 39, LHD, FXD oder Ultra?')),
      row(b('Fit check', 'Passformprüfung'), b('Thickness and bracelet adjustment', 'Höhe und Bandverstellung'), b('Material, strap attachment and weight', 'Material, Bandanschluss und Gewicht')),
    ],
    note: b('Depth ratings, certification and dimensions vary by reference. No family-wide specification is implied.', 'Tiefenangaben, Zertifizierung und Maße variieren nach Referenz. Es wird keine einheitliche Familienspezifikation behauptet.'),
  },
  luminorRadiomir: {
    left: 'Luminor', right: 'Radiomir', sources: ['panerai'],
    rows: [
      row(b('Visual starting point', 'Optischer Ausgangspunkt'), b('Crown-protection bridge', 'Kronenschutzbügel'), b('Different crown-and-case outline', 'Andere Kronen- und Gehäusekontur')),
      row(b('Check on your wrist', 'Am Handgelenk prüfen'), b('Bridge clearance and strap curve', 'Platz am Bügel und Bandkrümmung'), b('Lug construction and overall length', 'Hörnerkonstruktion und Gesamtlänge')),
      row(b('Verify separately', 'Separat verifizieren'), b('PAM reference, winding and depth rating', 'PAM-Referenz, Aufzug und Druckangabe'), b('PAM reference, winding and depth rating', 'PAM-Referenz, Aufzug und Druckangabe')),
    ],
    note: b('Model names describe design families. They do not establish the dimensions or movement of a listing.', 'Modellnamen beschreiben Designfamilien, nicht die genauen Maße oder das Werk eines Angebots.'),
  },
};
