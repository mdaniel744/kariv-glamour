import { bilingual as b, REVIEW_DATE } from './watchResearch/sources.js';
export const EDITORIAL_RESEARCH = {
  'how-to-safely-buy-a-pre-owned-luxury-watch': {
    sources: ['rolexWarranty', 'patekService'],
    title: b('Verify the actual warranty and service route', 'Den tatsächlichen Garantie- und Serviceweg prüfen'),
    paragraphs: [
      b('A manufacturer guarantee, a seller warranty and a documented service are different protections. Rolex states specific conditions for its new-watch guarantee, including the original sale and completed guarantee card. A resale listing does not establish that a fresh manufacturer guarantee has begun. Ask who will handle a claim and what evidence accompanies the watch.', 'Herstellergarantie, Verkäufergarantie und dokumentierter Service sind unterschiedliche Absicherungen. Rolex nennt konkrete Bedingungen für seine Neuuhrengarantie, einschließlich Erstverkauf und ausgefüllter Garantiekarte. Ein Wiederverkaufsangebot belegt keinen neu beginnenden Herstellerschutz. Fragen Sie nach Ansprechpartner und mitgelieferten Belegen.'),
      b('Service support should also be checked before buying an unusual reference. Patek Philippe describes a long-term commitment to its watches, but individual work still requires assessment and an estimate. Establish the service route for the exact watch, rather than assuming every repair will be quick or inexpensive.', 'Auch Serviceunterstützung sollte vor dem Kauf ungewöhnlicher Referenzen geklärt werden. Patek Philippe beschreibt eine langfristige Verpflichtung gegenüber seinen Uhren; konkrete Arbeiten benötigen trotzdem Prüfung und Kostenvoranschlag. Entscheidend ist der Serviceweg der genauen Uhr, nicht die Annahme einer stets schnellen oder günstigen Reparatur.'),
    ],
  },
  'what-box-and-papers-mean-for-luxury-watches': {
    sources: ['patekArchive', 'rolexService'],
    title: b('Archive extracts and service cards', 'Archivauszüge und Servicekarten'),
    paragraphs: [
      b('Patek Philippe distinguishes its original Certificate of Origin from an Extract from the Archives. The original certificate cannot be replaced; the extract reports historical information under the manufacturer’s application conditions. Describe an extract accurately instead of advertising it as the original papers of a newly complete set.', 'Patek Philippe unterscheidet das ursprüngliche Certificate of Origin vom Archivauszug. Das Originalzertifikat ist nicht ersetzbar; der Auszug gibt historische Angaben nach den Antragsbedingungen des Herstellers wieder. Ein Auszug sollte korrekt benannt und nicht als Originalpapier eines nachträglich vervollständigten Sets angeboten werden.'),
      b('A Rolex service card relates to work carried out through its service network and the associated service guarantee. It serves a different purpose from the original sales guarantee. Ask what a document actually records, rather than treating every branded card as equivalent provenance.', 'Eine Rolex-Servicekarte bezieht sich auf Arbeiten über das Servicenetz und die zugehörige Servicegarantie. Sie hat eine andere Funktion als die ursprüngliche Verkaufsgarantie. Fragen Sie, was ein Dokument konkret belegt, statt jede Markenkarte als gleichwertigen Herkunftsnachweis anzusehen.'),
    ],
  },
  'are-pre-owned-luxury-watches-a-good-investment': {
    sources: ['market'],
    title: b('Market interest is not a return forecast', 'Marktinteresse ist keine Renditeprognose'),
    paragraphs: [
      b('Deloitte’s Swiss Watch Industry Insights 2024 report, published in January 2025, examines the pre-owned market as a distinct part of the watch industry. It offers market context, not a valuation of an individual watch or a forecast that a reference will rise. A survey about buyer interest is not a completed-sales price index.', 'Deloittes Swiss Watch Industry Insights 2024, veröffentlicht im Januar 2025, untersucht den Gebrauchtmarkt als eigenen Teil der Uhrenbranche. Der Bericht liefert Marktkontext, keine Bewertung einer einzelnen Uhr und keine Prognose steigender Referenzpreise. Eine Befragung zum Käuferinteresse ist kein Preisindex abgeschlossener Verkäufe.'),
      b('Create a cost ledger: purchase and delivery, expected service, insurance and eventual selling costs. Compare a realistic net sale scenario with that total. If the watch would only be affordable after an assumed price increase, it is not a comfortable collecting budget. No fixed appreciation rate or investment ranking is implied by this guide.', 'Erstellen Sie eine Kostenübersicht: Kauf und Lieferung, erwarteter Service, Versicherung und spätere Verkaufskosten. Vergleichen Sie einen realistischen Nettoverkaufserlös mit dieser Summe. Ist die Uhr nur nach angenommener Wertsteigerung tragbar, passt sie nicht in ein entspanntes Sammlerbudget. Dieser Guide unterstellt weder feste Renditen noch eine Anlagerangfolge.'),
    ],
  },
};
export function enrichEditorialGuide(guide) {
  const research = EDITORIAL_RESEARCH[guide.slug];
  if (!research) return guide;
  return { ...guide, dateModified: REVIEW_DATE, sources: research.sources,
    translations: Object.fromEntries(Object.entries(guide.translations).map(([locale, article]) => [locale, {
      ...article, sections: [...article.sections, { id: 'source-check', title: research.title[locale], paragraphs: research.paragraphs.map((paragraph) => paragraph[locale]), sources: research.sources }],
    }])),
  };
}
