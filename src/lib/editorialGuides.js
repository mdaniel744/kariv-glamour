import { enrichEditorialGuide } from './editorialResearch.js';
import { CZECH_EDITORIAL_GUIDES } from './editorialGuides.cs.js';

export const EDITORIAL_GUIDES = [
  {
    slug: 'how-to-safely-buy-a-pre-owned-luxury-watch',
    image: '/media/kariv-principle.webp',
    datePublished: '2026-08-26',
    dateModified: '2026-08-26',
    translations: {
      en: {
        category: 'Buying Guide',
        title: 'How to safely buy a pre-owned luxury watch?',
        excerpt: 'A practical process for checking the seller, the watch, its history, the payment and the delivery before you commit.',
        readTime: '8 min read',
        intro: [
          'A pre-owned luxury watch can offer exceptional design, history and value, but a confident purchase depends on much more than finding an attractive price. The safest approach is a repeatable process that verifies the seller, identifies the exact watch and documents its condition before money changes hands.',
          'This guide explains the checks that matter most. It is designed for first-time buyers as well as collectors who want a clear framework for comparing listings and avoiding preventable surprises.',
        ],
        keyPoints: [
          'Verify the seller and the protections attached to the transaction.',
          'Match the reference, serial details and configuration to the listing.',
          'Evaluate condition, service history and originality separately.',
          'Use traceable payment and insured, documented delivery.',
          'Inspect the watch immediately during the return or review window.',
        ],
        sections: [
          {
            id: 'seller-first',
            title: 'Start with the seller, not the watch',
            paragraphs: [
              'A convincing product page does not replace seller due diligence. Look for a real business identity, verifiable contact details, clear terms, recent customer feedback and a history of dealing in comparable watches. A professional seller should be willing to answer specific questions and provide additional photographs without creating artificial pressure.',
              'Read the return, authenticity and warranty terms before paying. Confirm who is responsible if the watch differs materially from the description, arrives damaged or fails an authenticity review. Marketplace protection is most useful when the payment and all communication remain inside the approved transaction process.',
            ],
          },
          {
            id: 'identify-watch',
            title: 'Confirm exactly which watch is being offered',
            paragraphs: [
              'The listing should identify the brand, model, reference number, approximate production period, movement and included accessories. Compare these details with reliable manufacturer or specialist references. Small differences in dial text, bezel, bracelet or case proportions may indicate another variant—or a component changed during service.',
              'Ask for sharp, current images of the dial, case sides, case back, clasp, bracelet, movement where appropriate, and the identifying numbers with sensitive digits partially concealed. The purpose is to make sure the photographs belong to the watch being sold and that its configuration is internally consistent.',
            ],
          },
          {
            id: 'authenticity-originality',
            title: 'Separate authenticity from originality',
            paragraphs: [
              'An authentic watch can still contain later service parts, refinished surfaces or replacement accessories. Those details do not automatically make it a poor purchase, but they can affect collectability and price. Authentication asks whether the watch and its components are genuine; originality asks how closely the current watch matches its original factory configuration.',
              'For a high-value or vintage piece, request an inspection by a qualified watchmaker or established authentication service. No single photograph, serial lookup, box or warranty card should be treated as conclusive proof on its own.',
            ],
          },
          {
            id: 'condition-service',
            title: 'Understand condition and service history',
            paragraphs: [
              'Condition should cover more than visible scratches. Check whether the case has been polished, whether the bracelet is stretched, whether the crystal or bezel is damaged, and whether all functions operate correctly. Ask for a timekeeping report, water-resistance result and service documentation when these claims are part of the price.',
              'A recently serviced watch can reduce near-term maintenance risk, but only if the work is documented and the service provider is credible. An undocumented claim such as “just serviced” should not carry the same weight as an itemized invoice. Budget for inspection or service when the history is unknown.',
            ],
          },
          {
            id: 'payment-delivery',
            title: 'Protect the payment and delivery',
            paragraphs: [
              'Use a payment method that creates a clear record and preserves the protection promised by the seller or marketplace. Be cautious when asked to move the transaction to an unrelated channel, pay a different beneficiary or use an irreversible method without a compelling business reason.',
              'Shipping should be fully insured for the purchase value, tracked and handed over against a signature. Confirm the claims procedure before dispatch. When the parcel arrives, document its condition and record the unboxing of especially valuable purchases in one continuous video.',
            ],
          },
          {
            id: 'arrival-check',
            title: 'Inspect promptly after delivery',
            paragraphs: [
              'Compare the delivered watch with the listing while the review or return period is open. Check the reference, visible serial details, accessories, condition and basic functions. Do not remove protective stickers, size a bracelet or wear the watch extensively until you are satisfied that it matches the agreement.',
              'If anything is inconsistent, notify the seller in writing immediately and retain the packaging, photographs and transaction records. A calm, documented response gives both parties the best chance of resolving the issue efficiently.',
            ],
          },
        ],
        faq: [
          { question: 'Is it safe to buy a pre-owned luxury watch online?', answer: 'It can be safe when the seller is verifiable, the listing is detailed, the payment is protected and the watch can be inspected within a clear return or review period.' },
          { question: 'Should every pre-owned watch come with box and papers?', answer: 'No. Older watches are often sold without them. Their absence should be reflected in the evaluation and price, and authenticity must still be established from the watch itself and reliable expertise.' },
          { question: 'When should I use an independent watchmaker?', answer: 'Independent inspection is especially valuable for expensive, vintage, complicated or undocumented watches, or whenever the seller cannot provide enough evidence about condition and authenticity.' },
        ],
      },
      de: {
        category: 'Kaufleitfaden',
        title: 'Wie kauft man eine gebrauchte Luxusuhr sicher?',
        excerpt: 'Ein praktischer Ablauf zur Prüfung von Verkäufer, Uhr, Historie, Zahlung und Lieferung vor dem Kauf.',
        readTime: '8 Min. Lesezeit',
        intro: [
          'Eine gebrauchte Luxusuhr kann außergewöhnliches Design, Geschichte und einen attraktiven Gegenwert bieten. Ein sicherer Kauf hängt jedoch von weit mehr als einem guten Preis ab. Am zuverlässigsten ist ein klarer Ablauf, der den Verkäufer prüft, die konkrete Uhr identifiziert und ihren Zustand dokumentiert, bevor Geld überwiesen wird.',
          'Dieser Leitfaden erklärt die wichtigsten Kontrollen. Er richtet sich sowohl an Erstkäufer als auch an Sammler, die Angebote strukturiert vergleichen und vermeidbare Überraschungen ausschließen möchten.',
        ],
        keyPoints: [
          'Prüfen Sie den Verkäufer und den Schutz der Transaktion.',
          'Gleichen Sie Referenz, Serienangaben und Konfiguration mit dem Angebot ab.',
          'Bewerten Sie Zustand, Servicehistorie und Originalität getrennt.',
          'Nutzen Sie nachvollziehbare Zahlung und versicherten Versand.',
          'Kontrollieren Sie die Uhr sofort innerhalb der Rückgabe- oder Prüffrist.',
        ],
        sections: [
          {
            id: 'seller-first',
            title: 'Beginnen Sie mit dem Verkäufer, nicht mit der Uhr',
            paragraphs: [
              'Eine überzeugende Produktseite ersetzt keine Prüfung des Verkäufers. Achten Sie auf eine reale Unternehmensidentität, überprüfbare Kontaktdaten, verständliche Bedingungen, aktuelle Bewertungen und Erfahrung mit vergleichbaren Uhren. Ein professioneller Anbieter beantwortet konkrete Fragen und stellt auf Wunsch zusätzliche Fotos bereit, ohne künstlichen Zeitdruck aufzubauen.',
              'Lesen Sie Rückgabe-, Echtheits- und Garantiebedingungen vor der Zahlung. Klären Sie, wer verantwortlich ist, wenn die Uhr erheblich von der Beschreibung abweicht, beschädigt ankommt oder eine Echtheitsprüfung nicht besteht. Marktplatzschutz funktioniert am besten, wenn Zahlung und Kommunikation im vorgesehenen Transaktionsprozess bleiben.',
            ],
          },
          {
            id: 'identify-watch',
            title: 'Klären Sie genau, welche Uhr angeboten wird',
            paragraphs: [
              'Das Angebot sollte Marke, Modell, Referenznummer, ungefähren Produktionszeitraum, Werk und Zubehör nennen. Vergleichen Sie diese Angaben mit verlässlichen Hersteller- oder Fachquellen. Kleine Unterschiede bei Zifferblatt, Lünette, Armband oder Gehäuse können auf eine andere Variante oder auf bei einem Service ausgetauschte Teile hinweisen.',
              'Bitten Sie um scharfe, aktuelle Bilder von Zifferblatt, Gehäuseseiten, Boden, Schließe, Armband und gegebenenfalls Werk sowie von Identifikationsnummern mit teilweise verdeckten sensiblen Ziffern. So lässt sich prüfen, ob die Fotos zur angebotenen Uhr gehören und ihre Konfiguration stimmig ist.',
            ],
          },
          {
            id: 'authenticity-originality',
            title: 'Unterscheiden Sie Echtheit und Originalität',
            paragraphs: [
              'Eine echte Uhr kann spätere Serviceteile, aufgearbeitete Flächen oder ersetztes Zubehör enthalten. Das macht sie nicht automatisch zu einem schlechten Kauf, kann aber Sammlerwert und Preis beeinflussen. Echtheit fragt, ob Uhr und Komponenten authentisch sind; Originalität beschreibt, wie nah der heutige Zustand an der ursprünglichen Werksauslieferung liegt.',
              'Bei hochwertigen oder historischen Uhren empfiehlt sich die Prüfung durch einen qualifizierten Uhrmacher oder einen etablierten Authentifizierungsdienst. Kein einzelnes Foto, keine Serienabfrage, Box oder Garantiekarte ist allein ein endgültiger Echtheitsnachweis.',
            ],
          },
          {
            id: 'condition-service',
            title: 'Verstehen Sie Zustand und Servicehistorie',
            paragraphs: [
              'Der Zustand umfasst mehr als sichtbare Kratzer. Prüfen Sie, ob das Gehäuse poliert wurde, das Armband Spiel hat, Glas oder Lünette beschädigt sind und alle Funktionen korrekt arbeiten. Fordern Sie Gangwerte, eine Wasserdichtigkeitsprüfung und Servicenachweise an, wenn diese Aussagen den Preis mitbestimmen.',
              'Ein kürzlich erfolgter Service kann das kurzfristige Wartungsrisiko senken, wenn die Arbeit dokumentiert und der Dienstleister glaubwürdig ist. Eine unbelegte Aussage wie „frisch gewartet“ hat nicht denselben Wert wie eine detaillierte Rechnung. Planen Sie bei unbekannter Historie eine Prüfung oder Wartung ein.',
            ],
          },
          {
            id: 'payment-delivery',
            title: 'Sichern Sie Zahlung und Lieferung ab',
            paragraphs: [
              'Nutzen Sie eine Zahlungsmethode mit nachvollziehbarem Beleg und dem zugesagten Schutz des Verkäufers oder Marktplatzes. Seien Sie vorsichtig, wenn die Transaktion auf einen fremden Kanal verlagert, an einen anderen Empfänger gezahlt oder ohne überzeugenden Grund eine unwiderrufliche Methode genutzt werden soll.',
              'Der Versand sollte zum vollen Kaufwert versichert, nachverfolgbar und nur gegen Unterschrift übergeben werden. Klären Sie das Schadenverfahren vor dem Versand. Dokumentieren Sie den Zustand des Pakets bei Ankunft und filmen Sie das Öffnen besonders wertvoller Sendungen möglichst ohne Unterbrechung.',
            ],
          },
          {
            id: 'arrival-check',
            title: 'Prüfen Sie die Uhr direkt nach Erhalt',
            paragraphs: [
              'Vergleichen Sie die gelieferte Uhr innerhalb der Prüf- oder Rückgabefrist mit dem Angebot. Kontrollieren Sie Referenz, sichtbare Serienangaben, Zubehör, Zustand und Grundfunktionen. Entfernen Sie keine Schutzfolien, kürzen Sie kein Armband und tragen Sie die Uhr nicht ausgiebig, bevor alles der Vereinbarung entspricht.',
              'Bei Abweichungen informieren Sie den Verkäufer sofort schriftlich und bewahren Verpackung, Fotos und Transaktionsunterlagen auf. Eine ruhige, gut dokumentierte Reaktion erleichtert eine schnelle Lösung für beide Seiten.',
            ],
          },
        ],
        faq: [
          { question: 'Ist der Online-Kauf einer gebrauchten Luxusuhr sicher?', answer: 'Er kann sicher sein, wenn der Verkäufer überprüfbar ist, das Angebot detailliert ist, die Zahlung geschützt erfolgt und eine klare Rückgabe- oder Prüffrist besteht.' },
          { question: 'Muss jede gebrauchte Uhr Box und Papiere haben?', answer: 'Nein. Besonders ältere Uhren werden häufig ohne Zubehör angeboten. Das sollte bei Bewertung und Preis berücksichtigt werden; die Echtheit muss unabhängig davon geprüft werden.' },
          { question: 'Wann sollte ein unabhängiger Uhrmacher prüfen?', answer: 'Eine unabhängige Prüfung ist besonders bei teuren, historischen, komplizierten oder undokumentierten Uhren sinnvoll sowie immer dann, wenn Zustand und Echtheit nicht ausreichend belegt sind.' },
        ],
      },
    },
  },
  {
    slug: 'what-box-and-papers-mean-for-luxury-watches',
    image: '/brand-assets/omega/page/omega-box-and-papers.jpg',
    datePublished: '2026-08-26',
    dateModified: '2026-08-26',
    translations: {
      en: {
        category: 'Authentication',
        title: 'What do box and papers mean for luxury watches?',
        excerpt: 'What a full set really contains, how documents affect confidence and value, and why accessories never replace authentication.',
        readTime: '7 min read',
        intro: [
          '“Box and papers” is one of the most common phrases in the pre-owned watch market, but it is often used too loosely. The phrase usually means that a watch is accompanied by its original presentation box and the manufacturer-issued warranty card, certificate or sales documentation supplied when new.',
          'These accessories can improve provenance, completeness and resale appeal. They are useful evidence, but they are not a substitute for examining the watch itself. Understanding exactly what is included is more important than relying on the phrase “full set.”',
        ],
        keyPoints: [
          'Ask the seller to list and photograph every included item.',
          'Check that reference and serial details correspond with the watch.',
          'Treat accessories as supporting evidence, not proof of authenticity.',
          'Expect the value effect to vary by brand, model, age and rarity.',
          'Store original documents securely and separately from daily wear.',
        ],
        sections: [
          {
            id: 'what-is-included',
            title: 'What is normally included in a full set?',
            paragraphs: [
              'A modern full set may include an outer box, presentation box, warranty card, instruction booklet, hang tags, bezel protector, spare bracelet links and the original sales receipt. Vintage watches may instead have a punched paper certificate, chronometer certificate or retailer-stamped guarantee booklet.',
              'There is no universal definition. Packaging and documents differ between manufacturers, markets and production years. Ask for an itemized list rather than assuming that “box and papers” includes everything delivered with the watch when new.',
            ],
          },
          {
            id: 'documents-match',
            title: 'How should the documents match the watch?',
            paragraphs: [
              'Where present, the reference and serial or case number on a warranty card or certificate should correspond with the watch. The retailer stamp, sale date and country code may add useful context. Differences require an explanation; they should not be ignored simply because the document looks convincing.',
              'Check the format against the correct period. Brands change card designs, papers, holograms and packaging over time. A document style introduced years after the watch was produced may be a service replacement, a mismatched accessory or a warning sign that needs specialist review.',
            ],
          },
          {
            id: 'authenticity-limit',
            title: 'Do box and papers prove authenticity?',
            paragraphs: [
              'No. Genuine accessories can be paired with a different watch, and convincing reproductions exist. Conversely, many authentic watches have lost their original packaging and papers through decades of ownership. The watch must be authenticated on its own construction, movement, identifiers and configuration.',
              'A matching, period-correct set strengthens the history presented by the seller. It works best as one part of a wider evidence chain that includes a credible seller, detailed inspection, service records and a consistent ownership story.',
            ],
          },
          {
            id: 'value',
            title: 'How do box and papers affect value?',
            paragraphs: [
              'Collectors generally pay more for completeness, particularly for recent watches, limited editions and highly collectible references. The premium is not fixed. It depends on scarcity, condition, demand and how difficult the correct accessories would be to replace.',
              'For some vintage watches, exceptional originality and condition may matter more than a missing box. For a nearly new watch, missing warranty documentation can be more noticeable. Compare like-for-like market examples instead of applying one percentage to every brand and model.',
            ],
          },
          {
            id: 'replacement-items',
            title: 'Original, replacement and later-added accessories',
            paragraphs: [
              'A manufacturer service pouch, replacement box or later-purchased booklet may be useful, but it is not the original set. Sellers should describe later additions clearly. A period-correct box also does not prove that it was sold with this particular watch.',
              'Service documents can sometimes be more valuable to an owner than decorative packaging because they record work performed, parts replaced and the condition at a known date. Evaluate each document for the information it provides rather than for presentation alone.',
            ],
          },
          {
            id: 'care',
            title: 'How to inspect and preserve the set',
            paragraphs: [
              'Ask for photographs showing numbers, stamps, dates and the condition of every accessory. After purchase, keep papers dry, flat and away from sunlight. Store valuable documents securely and avoid carrying the complete set whenever the watch is worn or transported for routine use.',
              'Keep purchase invoices, authentication reports and future service receipts with the existing history. A well-organized record makes future servicing, insurance and resale easier even when the watch did not begin as a complete set.',
            ],
          },
        ],
        faq: [
          { question: 'What does “watch only” mean?', answer: 'It normally means the watch is offered without its original presentation box or manufacturer-issued papers. The seller should still specify any service documents, spare links or other accessories included.' },
          { question: 'Is a watch without papers automatically less authentic?', answer: 'No. Missing papers are common, especially with older watches. Authenticity must be assessed from the watch itself, although missing history may affect buyer confidence and market value.' },
          { question: 'Can replacement papers be issued?', answer: 'Policies vary by manufacturer. Original warranty cards are generally not reissued, but service documentation, archive extracts or certificates may sometimes be available and should be described accurately.' },
        ],
      },
      de: {
        category: 'Authentifizierung',
        title: 'Was bedeuten Box und Papiere bei Luxusuhren?',
        excerpt: 'Was ein Full Set enthält, wie Dokumente Vertrauen und Wert beeinflussen und warum Zubehör keine Authentifizierung ersetzt.',
        readTime: '7 Min. Lesezeit',
        intro: [
          '„Box und Papiere“ gehört zu den häufigsten Begriffen im Gebrauchtuhrenmarkt, wird jedoch oft zu ungenau verwendet. Gemeint sind normalerweise die originale Präsentationsbox sowie die vom Hersteller ausgestellte Garantiekarte, das Zertifikat oder die beim Neukauf mitgelieferten Verkaufsunterlagen.',
          'Dieses Zubehör kann Herkunft, Vollständigkeit und Wiederverkaufsattraktivität verbessern. Es ist ein nützlicher Beleg, ersetzt aber nicht die Prüfung der Uhr selbst. Entscheidend ist daher, genau zu verstehen, was tatsächlich enthalten ist.',
        ],
        keyPoints: [
          'Lassen Sie jedes enthaltene Teil einzeln auflisten und fotografieren.',
          'Prüfen Sie, ob Referenz- und Serienangaben zur Uhr passen.',
          'Betrachten Sie Zubehör als unterstützenden Beleg, nicht als Echtheitsnachweis.',
          'Der Werteinfluss hängt von Marke, Modell, Alter und Seltenheit ab.',
          'Bewahren Sie Originaldokumente sicher und getrennt vom täglichen Gebrauch auf.',
        ],
        sections: [
          {
            id: 'what-is-included',
            title: 'Was gehört normalerweise zu einem Full Set?',
            paragraphs: [
              'Ein modernes Full Set kann Umkarton, Präsentationsbox, Garantiekarte, Anleitung, Hangtags, Lünettenschutz, zusätzliche Armbandglieder und den ursprünglichen Kaufbeleg umfassen. Bei Vintage-Uhren finden sich stattdessen häufig gelochte Zertifikate, Chronometerzeugnisse oder vom Händler gestempelte Garantiehefte.',
              'Eine universelle Definition gibt es nicht. Verpackung und Unterlagen unterscheiden sich nach Hersteller, Markt und Produktionsjahr. Verlangen Sie deshalb eine genaue Auflistung, statt anzunehmen, dass „Box und Papiere“ automatisch den vollständigen ursprünglichen Lieferumfang bedeutet.',
            ],
          },
          {
            id: 'documents-match',
            title: 'Wie müssen die Dokumente zur Uhr passen?',
            paragraphs: [
              'Soweit vorhanden, sollten Referenz- sowie Serien- oder Gehäusenummer auf Garantiekarte oder Zertifikat mit der Uhr übereinstimmen. Händlerstempel, Verkaufsdatum und Ländercode können zusätzlichen Kontext liefern. Abweichungen benötigen eine nachvollziehbare Erklärung.',
              'Prüfen Sie auch, ob das Dokument zum Zeitraum passt. Marken ändern Karten, Papiere, Hologramme und Verpackungen. Ein erst Jahre später eingeführtes Format kann ein Serviceersatz, ein falsch zugeordnetes Zubehör oder ein Hinweis für eine fachliche Prüfung sein.',
            ],
          },
          {
            id: 'authenticity-limit',
            title: 'Beweisen Box und Papiere die Echtheit?',
            paragraphs: [
              'Nein. Echtes Zubehör kann mit einer anderen Uhr kombiniert werden, und es existieren überzeugende Nachbildungen. Umgekehrt haben viele authentische Uhren ihre ursprüngliche Verpackung und Unterlagen im Laufe der Jahre verloren. Die Uhr muss anhand von Konstruktion, Werk, Kennzeichnungen und Konfiguration geprüft werden.',
              'Ein passendes und zeitlich korrektes Set stärkt die vom Verkäufer dargestellte Geschichte. Am aussagekräftigsten ist es als Teil einer Beweiskette aus seriösem Verkäufer, detaillierter Prüfung, Serviceunterlagen und einer stimmigen Historie.',
            ],
          },
          {
            id: 'value',
            title: 'Wie beeinflussen Box und Papiere den Wert?',
            paragraphs: [
              'Sammler zahlen häufig mehr für Vollständigkeit, besonders bei neueren Uhren, limitierten Editionen und stark gesuchten Referenzen. Der Aufpreis ist nicht fest. Er hängt von Seltenheit, Zustand, Nachfrage und der Verfügbarkeit korrekter Zubehörteile ab.',
              'Bei manchen Vintage-Uhren können außergewöhnliche Originalität und guter Zustand wichtiger sein als eine fehlende Box. Bei einer fast neuen Uhr fallen fehlende Garantieunterlagen stärker auf. Vergleichen Sie ähnliche Marktangebote, statt einen pauschalen Prozentsatz anzuwenden.',
            ],
          },
          {
            id: 'replacement-items',
            title: 'Originales, ersetztes und später ergänztes Zubehör',
            paragraphs: [
              'Eine Hersteller-Servicebox, Ersatzbox oder später gekaufte Anleitung kann nützlich sein, gehört aber nicht zum ursprünglichen Set. Solche Ergänzungen sollten klar beschrieben werden. Auch eine zeitlich passende Box beweist nicht, dass sie mit genau dieser Uhr verkauft wurde.',
              'Serviceunterlagen können für den Besitzer wertvoller sein als dekorative Verpackung, weil sie Arbeiten, ersetzte Teile und den Zustand zu einem bekannten Zeitpunkt dokumentieren. Bewerten Sie jedes Dokument nach seinem Informationswert.',
            ],
          },
          {
            id: 'care',
            title: 'Set prüfen und richtig aufbewahren',
            paragraphs: [
              'Fordern Sie Fotos an, auf denen Nummern, Stempel, Daten und der Zustand aller Teile erkennbar sind. Bewahren Sie Papiere nach dem Kauf trocken, flach und lichtgeschützt auf. Wertvolle Dokumente sollten sicher und getrennt von der täglich getragenen Uhr gelagert werden.',
              'Ergänzen Sie Kaufrechnungen, Authentifizierungsberichte und spätere Servicebelege. Eine geordnete Historie erleichtert Wartung, Versicherung und Wiederverkauf, selbst wenn die Uhr ursprünglich nicht als vollständiges Set erworben wurde.',
            ],
          },
        ],
        faq: [
          { question: 'Was bedeutet „Watch only“?', answer: 'Normalerweise wird die Uhr ohne originale Präsentationsbox und Herstellerpapiere angeboten. Der Verkäufer sollte trotzdem Serviceunterlagen, zusätzliche Glieder und weiteres Zubehör genau nennen.' },
          { question: 'Ist eine Uhr ohne Papiere automatisch weniger echt?', answer: 'Nein. Fehlende Papiere sind besonders bei älteren Uhren häufig. Die Echtheit wird an der Uhr selbst geprüft; die fehlende Historie kann jedoch Vertrauen und Marktwert beeinflussen.' },
          { question: 'Können Ersatzpapiere ausgestellt werden?', answer: 'Das hängt vom Hersteller ab. Ursprüngliche Garantiekarten werden meist nicht neu ausgestellt. Servicebelege, Archivauszüge oder Zertifikate können teilweise erhältlich sein und müssen korrekt beschrieben werden.' },
        ],
      },
    },
  },
  {
    slug: 'are-pre-owned-luxury-watches-a-good-investment',
    image: '/brand-assets/rolex/pre-owned-luxury-rolex-watch.webp',
    datePublished: '2026-08-26',
    dateModified: '2026-08-26',
    translations: {
      en: {
        category: 'Collecting & Value',
        title: 'Are pre-owned luxury watches a good investment?',
        excerpt: 'A realistic look at value retention, market demand, ownership costs and the difference between collecting and investing.',
        readTime: '8 min read',
        intro: [
          'Some pre-owned watches retain value well and a small number appreciate substantially. That does not make every luxury watch a reliable investment. Prices are shaped by fashion, scarcity, brand decisions, economic conditions and the quality of each individual example—factors that are difficult to predict consistently.',
          'A better question is whether a particular watch offers strong long-term ownership value at a sensible purchase price. This guide outlines the factors to examine before treating potential appreciation as part of the decision.',
        ],
        keyPoints: [
          'Past price growth does not guarantee future returns.',
          'Reference, condition, originality and purchase price matter more than brand alone.',
          'Dealer spreads, servicing, insurance and selling fees reduce returns.',
          'The watch market is less liquid and transparent than public investments.',
          'Buy a watch you would be happy to own even if its price does not rise.',
        ],
        sections: [
          {
            id: 'investment-reality',
            title: 'Start with the investment reality',
            paragraphs: [
              'A watch produces no income while it is held. Any financial return depends on selling it later for more than the total amount spent on purchase, servicing, insurance, storage and transaction fees. Headline auction records describe exceptional objects and should not be treated as the normal result for a mass-produced reference.',
              'Market prices can rise quickly when supply is constrained and demand is strong, but they can also fall when sentiment changes. A long holding period does not remove this risk. Watches should therefore be considered collectible assets, not substitutes for a diversified financial plan.',
            ],
          },
          {
            id: 'value-drivers',
            title: 'What supports long-term value?',
            paragraphs: [
              'Demand usually concentrates around recognizable references, important design history, limited production, discontinued variants and watches with a strong collector community. Within the same model, condition, originality, dial configuration, production year and completeness can create large price differences.',
              'The purchase price is crucial. Even an excellent watch can be a poor financial result if bought during a speculative peak or at an excessive premium. Compare actual asking prices with completed sales where available, and distinguish dealer retail prices from the amount a dealer might pay to buy the watch back.',
            ],
          },
          {
            id: 'costs',
            title: 'Include every ownership cost',
            paragraphs: [
              'Mechanical watches need periodic maintenance, and complicated movements can be expensive to service. Insurance, secure storage, shipping and authentication may add further costs. Vintage watches can require specialist parts and longer repair times.',
              'Selling also has a cost. Auction commissions, marketplace fees, dealer margins and tax consequences can create a wide gap between a published market price and the cash received by the owner. Calculate the break-even price before assuming that a modest increase represents a profit.',
            ],
          },
          {
            id: 'liquidity',
            title: 'Understand liquidity and pricing',
            paragraphs: [
              'Two apparently similar watches may sell for different amounts because of condition, geography, seller reputation and timing. Public price guides are useful indicators, but they cannot inspect the exact watch or guarantee a buyer at that value.',
              'Popular models may sell quickly at a competitive price; unusual or expensive references can take months. If a fast sale is required, the owner may need to accept a wholesale offer. This liquidity discount should be part of any investment calculation.',
            ],
          },
          {
            id: 'preowned-advantage',
            title: 'Why pre-owned can improve the value equation',
            paragraphs: [
              'Buying pre-owned may avoid part of the initial depreciation experienced by models that trade below retail after purchase. It also gives buyers access to discontinued references and a visible market history. Neither advantage guarantees appreciation, but both can make pricing easier to evaluate.',
              'Focus on honest condition and a price supported by comparable examples. Paying more for the right watch can be wiser than choosing the cheapest listing if the latter needs major service, has altered parts or carries unclear provenance.',
            ],
          },
          {
            id: 'responsible-approach',
            title: 'A responsible collecting approach',
            paragraphs: [
              'Choose a watch that fits your taste, wrist and intended use. Research the exact reference, preserve the accessories and service history, and maintain the watch without unnecessary cosmetic alteration. These habits support both enjoyment and future desirability.',
              'Set a budget that does not depend on a quick resale and avoid borrowing based on expected price growth. If financial return is the main objective, speak with a qualified adviser about regulated and diversified alternatives before allocating money to collectible watches.',
            ],
          },
        ],
        note: 'This article is general educational information, not financial, tax or investment advice. Watch values can fall as well as rise.',
        faq: [
          { question: 'Which watch brands hold their value best?', answer: 'Certain references from highly demanded manufacturers have historically retained value well, but performance varies widely by model, condition and purchase price. Brand name alone is not enough.' },
          { question: 'Are limited editions always good investments?', answer: 'No. A limited production number only matters when genuine collector demand exists. Some regular-production watches are more liquid and desirable than heavily marketed limited editions.' },
          { question: 'Is an unworn watch always worth more?', answer: 'Not always. Condition matters, but originality, rarity, documentation and market demand also affect value. Improper storage can damage an unworn watch, and many buyers prefer a correctly serviced example.' },
        ],
      },
      de: {
        category: 'Sammeln & Wert',
        title: 'Sind gebrauchte Luxusuhren eine gute Investition?',
        excerpt: 'Ein realistischer Blick auf Werterhalt, Nachfrage, Besitzkosten und den Unterschied zwischen Sammeln und Investieren.',
        readTime: '8 Min. Lesezeit',
        intro: [
          'Einige gebrauchte Uhren halten ihren Wert gut, wenige steigen deutlich. Daraus folgt nicht, dass jede Luxusuhr eine zuverlässige Investition ist. Preise werden von Mode, Seltenheit, Markenentscheidungen, Wirtschaftslage und der Qualität des einzelnen Exemplars bestimmt—Faktoren, die sich nur schwer dauerhaft vorhersagen lassen.',
          'Sinnvoller ist die Frage, ob eine konkrete Uhr zu einem vernünftigen Kaufpreis einen starken langfristigen Besitzwert bietet. Dieser Leitfaden zeigt, welche Faktoren Sie prüfen sollten, bevor mögliche Wertsteigerung Teil Ihrer Entscheidung wird.',
        ],
        keyPoints: [
          'Vergangene Preissteigerungen garantieren keine zukünftigen Renditen.',
          'Referenz, Zustand, Originalität und Kaufpreis sind wichtiger als die Marke allein.',
          'Händlerspannen, Service, Versicherung und Verkaufsgebühren mindern die Rendite.',
          'Der Uhrenmarkt ist weniger liquide und transparent als öffentliche Kapitalmärkte.',
          'Kaufen Sie eine Uhr, die Sie auch ohne Preissteigerung gerne besitzen.',
        ],
        sections: [
          {
            id: 'investment-reality',
            title: 'Beginnen Sie mit der Investitionsrealität',
            paragraphs: [
              'Eine Uhr erzeugt während des Besitzes kein Einkommen. Ein finanzieller Gewinn entsteht nur, wenn sie später für mehr als die Gesamtkosten aus Kauf, Service, Versicherung, Lagerung und Verkauf veräußert wird. Rekorde aus Auktionen betreffen außergewöhnliche Objekte und sind kein typisches Ergebnis für regulär produzierte Referenzen.',
              'Marktpreise können bei knapper Versorgung und hoher Nachfrage schnell steigen, aber ebenso fallen, wenn sich die Stimmung ändert. Eine lange Haltedauer beseitigt dieses Risiko nicht. Uhren sind daher eher Sammlerwerte als Ersatz für einen diversifizierten Finanzplan.',
            ],
          },
          {
            id: 'value-drivers',
            title: 'Was unterstützt langfristigen Wert?',
            paragraphs: [
              'Nachfrage konzentriert sich häufig auf bekannte Referenzen, bedeutende Designgeschichte, geringe Produktion, eingestellte Varianten und Uhren mit einer starken Sammlergemeinschaft. Innerhalb desselben Modells können Zustand, Originalität, Zifferblatt, Produktionsjahr und Vollständigkeit große Preisunterschiede verursachen.',
              'Der Kaufpreis ist entscheidend. Selbst eine hervorragende Uhr kann finanziell enttäuschen, wenn sie während eines spekulativen Höhepunkts oder mit übermäßigem Aufschlag gekauft wird. Vergleichen Sie Angebotspreise mit tatsächlichen Verkäufen und unterscheiden Sie Händlerverkaufspreise von möglichen Ankaufspreisen.',
            ],
          },
          {
            id: 'costs',
            title: 'Berücksichtigen Sie sämtliche Besitzkosten',
            paragraphs: [
              'Mechanische Uhren benötigen regelmäßige Wartung; komplizierte Werke können teuer im Service sein. Versicherung, sichere Lagerung, Versand und Authentifizierung verursachen weitere Kosten. Bei Vintage-Uhren können spezielle Ersatzteile und lange Reparaturzeiten hinzukommen.',
              'Auch der Verkauf kostet Geld. Auktionsprovisionen, Plattformgebühren, Händlermargen und steuerliche Folgen können eine große Lücke zwischen veröffentlichtem Marktpreis und dem tatsächlichen Erlös schaffen. Berechnen Sie den Break-even-Preis, bevor Sie einen kleinen Preisanstieg als Gewinn betrachten.',
            ],
          },
          {
            id: 'liquidity',
            title: 'Verstehen Sie Liquidität und Preisbildung',
            paragraphs: [
              'Zwei scheinbar ähnliche Uhren können wegen Zustand, Region, Verkäuferreputation und Zeitpunkt unterschiedliche Preise erzielen. Preisindizes sind hilfreiche Orientierung, können aber das konkrete Exemplar nicht prüfen und garantieren keinen Käufer.',
              'Beliebte Modelle lassen sich zu einem wettbewerbsfähigen Preis oft schnell verkaufen; ungewöhnliche oder sehr teure Referenzen können Monate benötigen. Bei einem schnellen Verkauf muss häufig ein Händlerankaufspreis akzeptiert werden. Dieser Liquiditätsabschlag gehört in jede Kalkulation.',
            ],
          },
          {
            id: 'preowned-advantage',
            title: 'Warum gebraucht die Wertgleichung verbessern kann',
            paragraphs: [
              'Ein Gebrauchtkauf kann einen Teil des anfänglichen Wertverlusts vermeiden, den Modelle nach dem Neukauf erleben, wenn sie unter Listenpreis gehandelt werden. Zudem erhalten Käufer Zugang zu eingestellten Referenzen und einer sichtbaren Markthistorie. Beides garantiert keine Wertsteigerung, erleichtert aber die Preisbeurteilung.',
              'Achten Sie auf ehrlichen Zustand und einen durch Vergleichsangebote gestützten Preis. Für die richtige Uhr mehr zu bezahlen kann sinnvoller sein als das billigste Angebot, wenn dieses einen großen Servicebedarf, veränderte Teile oder unklare Herkunft hat.',
            ],
          },
          {
            id: 'responsible-approach',
            title: 'Ein verantwortungsvoller Sammelansatz',
            paragraphs: [
              'Wählen Sie eine Uhr, die zu Geschmack, Handgelenk und Nutzung passt. Recherchieren Sie die genaue Referenz, bewahren Sie Zubehör und Servicehistorie auf und warten Sie die Uhr ohne unnötige kosmetische Veränderungen. Das unterstützt Freude am Besitz und zukünftige Nachfrage.',
              'Setzen Sie ein Budget, das nicht von einem schnellen Wiederverkauf abhängt, und finanzieren Sie keinen Kauf auf Basis erwarteter Preissteigerungen. Wenn Rendite das Hauptziel ist, sprechen Sie vor einer Anlage in Sammleruhren mit einem qualifizierten Berater über regulierte und diversifizierte Alternativen.',
            ],
          },
        ],
        note: 'Dieser Artikel dient nur der allgemeinen Information und ist keine Finanz-, Steuer- oder Anlageberatung. Uhrenwerte können steigen oder fallen.',
        faq: [
          { question: 'Welche Uhrenmarken halten ihren Wert am besten?', answer: 'Bestimmte Referenzen stark nachgefragter Hersteller haben historisch guten Werterhalt gezeigt. Die Ergebnisse unterscheiden sich jedoch erheblich nach Modell, Zustand und Kaufpreis. Die Marke allein reicht nicht.' },
          { question: 'Sind limitierte Editionen immer gute Investitionen?', answer: 'Nein. Eine geringe Stückzahl ist nur relevant, wenn echte Sammlernachfrage besteht. Manche regulär produzierten Uhren sind liquider und begehrter als stark beworbene Sondereditionen.' },
          { question: 'Ist eine ungetragene Uhr immer mehr wert?', answer: 'Nicht immer. Neben dem Zustand zählen Originalität, Seltenheit, Dokumentation und Nachfrage. Falsche Lagerung kann auch eine ungetragene Uhr beschädigen; viele Käufer bevorzugen ein korrekt gewartetes Exemplar.' },
        ],
      },
    },
  },
].map((guide) => enrichEditorialGuide({
  ...guide,
  translations: { ...guide.translations, cs: CZECH_EDITORIAL_GUIDES[guide.slug] },
}));

export function getEditorialGuide(slug) {
  return EDITORIAL_GUIDES.find((guide) => guide.slug === slug) || null;
}

export function localizeEditorialGuide(guide, locale = 'en') {
  if (!guide) return null;
  return guide.translations[locale] || guide.translations.en;
}
