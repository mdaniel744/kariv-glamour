import { CZECH_LEGAL_PAGES } from './legalPageCzech.js';

const LAST_UPDATED_EN = 'Last updated: 25 August 2026';
const LAST_UPDATED_DE = 'Zuletzt aktualisiert: 25. August 2026';

function createLegalPage({ slug, titleEn, titleDe, descriptionEn, descriptionDe, contentEn, contentDe }) {
  const cs = CZECH_LEGAL_PAGES[slug];
  return Object.freeze({
    slug,
    title: titleEn,
    title_en: titleEn,
    title_de: titleDe,
    title_cs: cs.title,
    content: contentEn,
    content_en: contentEn,
    content_de: contentDe,
    content_cs: cs.content,
    seoTitle: `${titleEn} | Kariv Glamour`,
    seoTitle_en: `${titleEn} | Kariv Glamour`,
    seoTitle_de: `${titleDe} | Kariv Glamour`,
    seoTitle_cs: `${cs.title} | Kariv Glamour`,
    seoDescription: descriptionEn,
    seoDescription_en: descriptionEn,
    seoDescription_de: descriptionDe,
    seoDescription_cs: cs.description,
  });
}

const SHIPPING_POLICY = createLegalPage({
  slug: 'shipping-policy',
  titleEn: 'Shipping Information',
  titleDe: 'Versandinformationen',
  descriptionEn: 'Free EU shipping, tracking, insurance, delivery and customs information for Kariv Glamour orders.',
  descriptionDe: 'Informationen zu kostenlosem EU-Versand, Sendungsverfolgung, Versicherung, Lieferung und Zoll bei Kariv Glamour.',
  contentEn: `_${LAST_UPDATED_EN}_

## 1. Where we deliver

Available delivery destinations are shown on the product listing or confirmed during checkout. Some watches, sellers or insured carriers may be subject to destination restrictions. If an order cannot be delivered to the address supplied, we will contact you before shipment and arrange an appropriate solution or refund.

## 2. Shipping charges and delivery estimates

- **Delivery within the Czech Republic:** Shipping is free on every order. Once your order has been confirmed and its status has been marked **Shipped**, delivery normally takes **1–3 business days**.
- **Delivery to other EU countries:** Shipping is free on every order. Once your order has been confirmed and marked **Shipped**, delivery normally takes **3–7 business days**.

Standard delivery is free to every supported destination in the European Union. These timeframes are estimates rather than guaranteed delivery dates. Delivery may take longer because of seller handling time, authentication checks, carrier disruptions, public holidays or events outside reasonable control. Any applicable tax or other non-shipping amount payable through Kariv Glamour is shown before the order is placed.

## 3. Insured and tracked delivery

Eligible watches must be sent by a trackable and appropriately insured service. Signature or identity confirmation may be required at delivery. Tracking information is added to the order when available. Do not authorise an unattended delivery for a high-value shipment unless you accept the associated risk and the carrier allows it.

Unless you independently appoint a carrier that was not offered through the transaction, responsibility for the watch remains with the professional seller until you, or a person designated by you, receives it.

## 4. Address changes and failed delivery

Check the delivery address carefully before placing an order. For security reasons, an address normally cannot be changed after dispatch. Additional carrier charges caused by an incorrect address, repeated delivery attempts or an uncollected parcel may be charged where permitted by law and disclosed to you.

## 5. Customs and import charges

Cross-border orders may be subject to customs procedures, import VAT, duties or brokerage charges. Unless the checkout expressly states that these costs are included, the recipient is responsible for them. Customs processing can delay delivery and is controlled by the relevant authority rather than Kariv Glamour or the seller.

## 6. On delivery

Inspect the outer package before accepting it. If it is visibly damaged, note the damage with the carrier where possible, photograph the package before opening it, keep all packaging and contact [info@karivglamour.com](mailto:info@karivglamour.com) promptly. For loss, theft, damage or a delivery discrepancy, include your order number, photographs and any carrier report. This reporting request does not limit mandatory consumer rights.`,
  contentDe: `_${LAST_UPDATED_DE}_

## 1. Liefergebiete

Die verfügbaren Lieferziele werden im Produktangebot angezeigt oder während des Bestellvorgangs bestätigt. Für bestimmte Uhren, Händler oder versicherte Versanddienstleister können Lieferbeschränkungen gelten. Kann eine Bestellung nicht an die angegebene Adresse geliefert werden, kontaktieren wir Sie vor dem Versand und vereinbaren eine geeignete Lösung oder Erstattung.

## 2. Versandkosten und Lieferprognosen

- **Lieferung innerhalb der Tschechischen Republik:** Der Versand ist bei jeder Bestellung kostenlos. Nachdem Ihre Bestellung bestätigt und mit dem Status **Versendet** gekennzeichnet wurde, beträgt die übliche Lieferzeit **1–3 Werktage**.
- **Lieferung in andere EU-Länder:** Der Versand ist bei jeder Bestellung kostenlos. Nachdem Ihre Bestellung bestätigt und als **Versendet** gekennzeichnet wurde, beträgt die übliche Lieferzeit **3–7 Werktage**.

Der Standardversand ist an jedes unterstützte Ziel innerhalb der Europäischen Union kostenlos. Diese Zeiträume sind Schätzungen und keine garantierten Liefertermine. Die Lieferung kann sich durch Bearbeitungszeiten des Händlers, Echtheitsprüfungen, Störungen beim Versanddienstleister, Feiertage oder Ereignisse außerhalb des zumutbaren Einflussbereichs verzögern. Alle anfallenden Steuern oder sonstigen Beträge außerhalb der Versandkosten, die über Kariv Glamour zu zahlen sind, werden vor Abgabe der Bestellung angezeigt.

## 3. Versicherter Versand mit Sendungsverfolgung

Berechtigte Uhren müssen mit einer nachverfolgbaren und angemessen versicherten Versandart versendet werden. Bei der Zustellung kann eine Unterschrift oder Identitätsprüfung erforderlich sein. Die Sendungsverfolgung wird der Bestellung hinzugefügt, sobald sie verfügbar ist. Erteilen Sie für hochwertige Sendungen keine Abstellgenehmigung, sofern Sie das damit verbundene Risiko nicht übernehmen und der Versanddienstleister dies nicht zulässt.

Sofern Sie nicht selbst einen von der Transaktion unabhängigen Versanddienstleister beauftragen, verbleibt die Verantwortung für die Uhr beim gewerblichen Verkäufer, bis Sie oder eine von Ihnen benannte Person sie erhalten haben.

## 4. Adressänderungen und fehlgeschlagene Zustellung

Prüfen Sie die Lieferadresse vor der Bestellung sorgfältig. Aus Sicherheitsgründen kann sie nach dem Versand normalerweise nicht mehr geändert werden. Zusätzliche Kosten aufgrund einer falschen Adresse, wiederholter Zustellversuche oder einer nicht abgeholten Sendung können, soweit gesetzlich zulässig und Ihnen mitgeteilt, berechnet werden.

## 5. Zoll und Einfuhrabgaben

Bei grenzüberschreitenden Bestellungen können Zollverfahren, Einfuhrumsatzsteuer, Zölle oder Abfertigungsgebühren anfallen. Sofern im Checkout nicht ausdrücklich angegeben ist, dass diese Kosten enthalten sind, trägt sie der Empfänger. Die Zollabfertigung kann die Lieferung verzögern und wird von der zuständigen Behörde kontrolliert, nicht von Kariv Glamour oder dem Verkäufer.

## 6. Bei der Zustellung

Prüfen Sie die Außenverpackung vor der Annahme. Dokumentieren Sie sichtbare Schäden nach Möglichkeit beim Versanddienstleister, fotografieren Sie das Paket vor dem Öffnen, bewahren Sie die gesamte Verpackung auf und kontaktieren Sie zeitnah [info@karivglamour.com](mailto:info@karivglamour.com). Geben Sie bei Verlust, Diebstahl, Beschädigung oder Lieferabweichungen Ihre Bestellnummer, Fotos und einen vorhandenen Zustellbericht an. Diese Meldebitte schränkt zwingende Verbraucherrechte nicht ein.`,
});

const RETURNS_POLICY = createLegalPage({
  slug: 'returns-refund-policy',
  titleEn: 'Returns & Refunds',
  titleDe: 'Rückgabe & Rückerstattung',
  descriptionEn: 'Withdrawal, return eligibility and refund information for Kariv Glamour purchases.',
  descriptionDe: 'Informationen zu Widerruf, Rückgabeberechtigung und Erstattungen bei Kariv Glamour.',
  contentEn: `_${LAST_UPDATED_EN}_

## 1. Statutory right of withdrawal

If you are an EU/EEA consumer buying online from a professional seller, you generally have 14 days after you, or a person designated by you, receives the watch to withdraw from the purchase without giving a reason. Mandatory rights in your country may provide additional protection.

To exercise the right, send a clear statement before the deadline to [info@karivglamour.com](mailto:info@karivglamour.com). Include your name, order number, the watch, delivery date and a reliable contact method. We will acknowledge the request and provide secure return instructions. Do not send a watch to the registered office without receiving return instructions first.

## 2. Returning the watch

After notifying us, return the watch within 14 days using the instructed tracked and insured service. Include the watch, presentation box, papers, certificates, warranty card, tags, spare links, accessories and all other items supplied. Package the watch securely and retain proof of shipment.

You may inspect a watch as you would reasonably be permitted to do in a shop. You may be responsible for diminished value caused by handling beyond what is necessary to establish its nature, characteristics and functioning. This does not remove statutory rights relating to defects or a product that is not as described.

Unless the seller agreed otherwise, the listing or checkout stated otherwise, or the return concerns a covered defect, misdescription or seller error, the consumer may bear the direct cost of return shipping where permitted by law.

## 3. Refund timing and method

For a valid withdrawal, amounts due—including the cost of the least expensive standard delivery offered for the original order—will be refunded without undue delay and no later than 14 days after the withdrawal notice. The refund may be withheld until the watch is received or you provide evidence of return, whichever occurs first.

Refunds are normally issued through the original payment route or the applicable escrow process unless another method is agreed. Extra costs for an upgraded delivery method are not refundable unless required by law.

## 4. Defective, damaged or misdescribed watches

If a watch arrives damaged, defective, incomplete, inauthentic or materially different from the listing, contact us promptly and within the buyer-protection period shown on the order. Do not wear, resize, open, repair or alter it. Provide photographs and a clear description. We may arrange inspection, insured return, repair, replacement, price reduction or refund as appropriate. Reasonable covered return costs will not be charged to the consumer.

## 5. Exceptions

The right of withdrawal may be excluded only where the law permits—for example, for a genuinely personalised item made to your specification. A listing marked “final sale” does not override mandatory consumer rights. Purchases from a private seller may be subject to different statutory rules; the seller’s status is shown with the transaction.

## 6. Questions

Contact [info@karivglamour.com](mailto:info@karivglamour.com) before returning any high-value item. Nothing in this policy limits rights that cannot lawfully be excluded.`,
  contentDe: `_${LAST_UPDATED_DE}_

## 1. Gesetzliches Widerrufsrecht

Wenn Sie als Verbraucher im EU-/EWR-Raum online bei einem gewerblichen Verkäufer kaufen, haben Sie grundsätzlich 14 Tage ab dem Tag, an dem Sie oder eine von Ihnen benannte Person die Uhr erhalten, um den Kauf ohne Angabe von Gründen zu widerrufen. Zwingende Vorschriften Ihres Landes können zusätzlichen Schutz bieten.

Zur Ausübung des Widerrufs senden Sie vor Ablauf der Frist eine eindeutige Erklärung an [info@karivglamour.com](mailto:info@karivglamour.com). Nennen Sie Ihren Namen, die Bestellnummer, die Uhr, das Lieferdatum und eine verlässliche Kontaktmöglichkeit. Wir bestätigen die Anfrage und stellen sichere Rücksendeanweisungen bereit. Senden Sie keine Uhr ohne vorherige Rücksendeanweisung an den eingetragenen Firmensitz.

## 2. Rücksendung der Uhr

Senden Sie die Uhr nach Ihrer Mitteilung innerhalb von 14 Tagen mit dem angewiesenen nachverfolgbaren und versicherten Versanddienst zurück. Fügen Sie Uhr, Box, Papiere, Zertifikate, Garantiekarte, Etiketten, Ersatzglieder, Zubehör und sämtliche mitgelieferten Gegenstände bei. Verpacken Sie die Uhr sicher und bewahren Sie den Versandnachweis auf.

Sie dürfen die Uhr so prüfen, wie dies vernünftigerweise auch in einem Geschäft möglich wäre. Für einen Wertverlust aufgrund eines Umgangs, der über die Prüfung von Art, Eigenschaften und Funktionsweise hinausgeht, können Sie verantwortlich sein. Gesetzliche Rechte bei Mängeln oder einer von der Beschreibung abweichenden Ware bleiben unberührt.

Sofern der Verkäufer nichts anderes vereinbart hat, im Angebot oder Checkout nichts anderes angegeben wurde und die Rückgabe nicht auf einem abgedeckten Mangel, einer Falschbeschreibung oder einem Verkäuferfehler beruht, kann der Verbraucher die unmittelbaren Rücksendekosten tragen, soweit dies gesetzlich zulässig ist.

## 3. Zeitpunkt und Art der Erstattung

Bei einem wirksamen Widerruf werden die geschuldeten Beträge einschließlich der Kosten der günstigsten für die ursprüngliche Bestellung angebotenen Standardlieferung unverzüglich und spätestens 14 Tage nach Eingang des Widerrufs erstattet. Die Erstattung kann zurückgehalten werden, bis die Uhr eingegangen ist oder Sie den Rückversand nachweisen, je nachdem, welches Ereignis früher eintritt.

Erstattungen erfolgen grundsätzlich über den ursprünglichen Zahlungsweg oder den jeweiligen Treuhandprozess, sofern keine andere Methode vereinbart wurde. Mehrkosten einer höherwertigen Versandart werden nur erstattet, wenn dies gesetzlich vorgeschrieben ist.

## 4. Mangelhafte, beschädigte oder falsch beschriebene Uhren

Trifft eine Uhr beschädigt, mangelhaft, unvollständig, nicht echt oder wesentlich abweichend vom Angebot ein, kontaktieren Sie uns unverzüglich und innerhalb der in der Bestellung genannten Käuferschutzfrist. Tragen, kürzen, öffnen, reparieren oder verändern Sie die Uhr nicht. Legen Sie Fotos und eine klare Beschreibung vor. Je nach Fall können Prüfung, versicherte Rücksendung, Reparatur, Ersatz, Preisminderung oder Erstattung erfolgen. Angemessene Kosten einer berechtigten Rücksendung werden dem Verbraucher nicht auferlegt.

## 5. Ausnahmen

Das Widerrufsrecht ist nur ausgeschlossen, soweit das Gesetz dies erlaubt—beispielsweise bei einem tatsächlich nach Ihren Vorgaben personalisierten Artikel. Der Hinweis „Final Sale“ setzt zwingende Verbraucherrechte nicht außer Kraft. Für Käufe von einem privaten Verkäufer können andere gesetzliche Regeln gelten; der Status des Verkäufers wird bei der Transaktion angezeigt.

## 6. Fragen

Kontaktieren Sie [info@karivglamour.com](mailto:info@karivglamour.com), bevor Sie einen hochwertigen Artikel zurücksenden. Diese Richtlinie beschränkt keine Rechte, die gesetzlich nicht ausgeschlossen werden dürfen.`,
});

const WARRANTY_POLICY = createLegalPage({
  slug: 'warranty-policy',
  titleEn: 'Warranty',
  titleDe: 'Garantie',
  descriptionEn: 'Legal guarantee, commercial warranty and claims information for watches sold through Kariv Glamour.',
  descriptionDe: 'Informationen zu Gewährleistung, Herstellergarantie und Ansprüchen für über Kariv Glamour verkaufte Uhren.',
  contentEn: `_${LAST_UPDATED_EN}_

## 1. Your legal guarantee

Consumers who buy goods from a professional seller in the EU have a legal guarantee that the goods conform to the contract. This protection is separate from any manufacturer or commercial warranty and cannot be reduced by it. The applicable period and remedies are determined by mandatory law; under EU rules, consumers generally receive a minimum two-year legal guarantee from delivery. Special rules may apply to second-hand goods where national law permits a shorter period expressly agreed at purchase, but never less than the mandatory minimum.

The professional seller identified in your order is responsible for the legal guarantee. If a watch is defective or does not match the agreed description, the available remedies may include repair or replacement without charge and, where the legal conditions are met, a price reduction or termination and refund.

## 2. Manufacturer and commercial warranties

A manufacturer or dealer warranty applies only when it is expressly included in the product listing, warranty card or order confirmation. Its provider, territory, duration, transferability and exclusions are governed by the stated warranty terms. Kariv Glamour does not extend a manufacturer warranty merely by displaying a brand or product. A commercial warranty never replaces mandatory legal rights against the seller.

## 3. Condition and ordinary wear

Pre-owned and vintage watches are sold with the condition, age, service history and known imperfections disclosed in the listing. Normal wear consistent with that description, expected ageing, routine servicing, battery replacement, damage caused by misuse, impact, water exposure beyond the stated rating, magnetism, unauthorised work or modifications is not itself a conformity defect. This does not exclude a defect that existed at delivery or a fact the seller failed to disclose.

## 4. Making a claim

Contact [info@karivglamour.com](mailto:info@karivglamour.com) with the order number, a description of the issue, photographs or video and any relevant service report. Do not arrange third-party repairs before the seller has had a reasonable opportunity to assess the claim, except where urgent action is necessary to prevent further damage. We will coordinate the next steps with the responsible seller.

Nothing in this policy limits non-excludable consumer rights.`,
  contentDe: `_${LAST_UPDATED_DE}_

## 1. Ihre gesetzliche Gewährleistung

Verbraucher, die in der EU Waren von einem gewerblichen Verkäufer kaufen, haben einen gesetzlichen Anspruch darauf, dass die Ware dem Vertrag entspricht. Dieser Schutz besteht unabhängig von einer Hersteller- oder gewerblichen Garantie und kann durch diese nicht eingeschränkt werden. Frist und Rechtsbehelfe richten sich nach dem zwingenden Recht; nach EU-Recht besteht grundsätzlich eine gesetzliche Gewährleistung von mindestens zwei Jahren ab Lieferung. Für gebrauchte Waren können besondere Regeln gelten, wenn nationales Recht eine beim Kauf ausdrücklich vereinbarte kürzere Frist zulässt, jedoch niemals unterhalb des zwingenden Mindestschutzes.

Für die gesetzliche Gewährleistung ist der in Ihrer Bestellung ausgewiesene gewerbliche Verkäufer verantwortlich. Ist eine Uhr mangelhaft oder entspricht sie nicht der vereinbarten Beschreibung, können je nach gesetzlichen Voraussetzungen kostenlose Reparatur oder Ersatz sowie gegebenenfalls Preisminderung oder Vertragsbeendigung und Erstattung verlangt werden.

## 2. Hersteller- und gewerbliche Garantien

Eine Hersteller- oder Händlergarantie gilt nur, wenn sie im Produktangebot, in der Garantiekarte oder in der Bestellbestätigung ausdrücklich enthalten ist. Anbieter, Gebiet, Laufzeit, Übertragbarkeit und Ausschlüsse richten sich nach den jeweiligen Garantiebedingungen. Kariv Glamour erweitert keine Herstellergarantie allein dadurch, dass eine Marke oder ein Produkt angezeigt wird. Eine gewerbliche Garantie ersetzt niemals zwingende gesetzliche Ansprüche gegen den Verkäufer.

## 3. Zustand und gewöhnliche Abnutzung

Gebrauchte und Vintage-Uhren werden mit dem im Angebot beschriebenen Zustand, Alter, Wartungsverlauf und bekannten Gebrauchsspuren verkauft. Normale, der Beschreibung entsprechende Abnutzung, zu erwartende Alterung, übliche Wartung, Batteriewechsel sowie Schäden durch Fehlgebrauch, Stoß, Wassereinwirkung über die angegebene Dichtigkeit hinaus, Magnetismus, nicht autorisierte Eingriffe oder Veränderungen stellen für sich genommen keinen Vertragsmangel dar. Ein bei Lieferung vorhandener oder vom Verkäufer nicht offengelegter Mangel bleibt davon unberührt.

## 4. Anspruch geltend machen

Kontaktieren Sie [info@karivglamour.com](mailto:info@karivglamour.com) mit Bestellnummer, Fehlerbeschreibung, Fotos oder Video und gegebenenfalls einem Servicebericht. Lassen Sie keine Reparatur durch Dritte durchführen, bevor der Verkäufer eine angemessene Gelegenheit zur Prüfung hatte, außer eine dringende Maßnahme ist erforderlich, um weiteren Schaden zu verhindern. Wir koordinieren die nächsten Schritte mit dem verantwortlichen Verkäufer.

Diese Richtlinie beschränkt keine unabdingbaren Verbraucherrechte.`,
});

const TERMS_POLICY = createLegalPage({
  slug: 'terms-and-conditions',
  titleEn: 'Terms & Conditions',
  titleDe: 'Allgemeine Geschäftsbedingungen',
  descriptionEn: 'Terms governing use of the Kariv Glamour marketplace and purchases made through it.',
  descriptionDe: 'Bedingungen für die Nutzung des Kariv-Glamour-Marktplatzes und darüber getätigte Käufe.',
  contentEn: `_${LAST_UPDATED_EN}_

## 1. Scope and operator

These terms govern use of the Kariv Glamour website, customer accounts and transactions completed through the platform. The platform is operated by the company identified above. Product-specific terms shown in a listing or order confirmation form part of the transaction. If a mandatory consumer rule conflicts with these terms, the mandatory rule prevails.

## 2. Marketplace and seller identity

Kariv Glamour may offer products itself and may also enable approved professional dealers or other clearly identified sellers to list watches. The seller and, where different, the contractual counterparty are identified on the listing, checkout or order confirmation. The purchase contract is between the buyer and that seller. Kariv Glamour provides marketplace, communication, order-support and, for eligible transactions, buyer-protection or payment-coordination services.

## 3. Accounts and eligibility

You must provide accurate, current information, protect your login credentials and promptly report unauthorised account use. You must be legally capable of entering the transaction. We may request identity, address, source-of-funds or other compliance information where reasonably necessary for fraud prevention, sanctions checks, payment security or legal obligations.

## 4. Listings, condition and availability

Watches may be new, pre-owned or vintage. Read the entire listing, including condition, measurements, year, service history, scope of delivery, box and papers, warranty, seller identity, shipping availability and photographs. Minor colour or scale differences can occur between screens and physical products. A reference to an estimated production year or service history is not a guarantee unless expressly stated.

Submitting an order is an offer to purchase. An automated acknowledgement does not necessarily constitute acceptance. A contract is formed when the seller accepts the order or Kariv Glamour sends an express acceptance confirmation on the seller’s behalf. Availability is not guaranteed until acceptance. We may reject or cancel an order where the product is unavailable, pricing is clearly erroneous, compliance checks fail or fraud is reasonably suspected; any amount already due for refund will be returned.

## 5. Prices, taxes and payment

The price, currency, included taxes, shipping charge and known mandatory fees are shown before the order is placed. Cross-border duties or import taxes are handled as stated in the Shipping Information page. Use only the payment instructions shown in the authenticated order area. Payments made directly to a seller or another person outside the approved process are not covered by Kariv Buyer Protection.

Eligible transactions may use a protected payment or escrow-style process. Funds are released according to the transaction status, delivery confirmation, inspection period and any open dispute. The availability and precise operation of that service are shown with the order.

## 6. Delivery, inspection, returns and defects

Delivery is governed by the [Shipping Information](/legal/shipping-policy). Withdrawal, returns and refunds are governed by the [Returns & Refunds Policy](/legal/returns-refund-policy). Legal conformity rights and any additional warranty are explained in the [Warranty Policy](/legal/warranty-policy). Inspect the watch promptly after delivery and preserve all packaging and supplied items during the applicable return or dispute period.

## 7. Authentication and brand status

Sellers must describe products accurately and comply with the platform’s authenticity standards. Authentication is an expert assessment based on the watch and information available at the time; see the [Authenticity Disclaimer](/legal/authenticity-disclaimer). Brand names and trademarks are used for product identification; see the [Brand Disclaimer](/legal/brand-disclaimer).

## 8. Prohibited conduct

You may not misuse the platform, submit false information, interfere with security, scrape or copy protected content without permission, evade fees, manipulate reviews, infringe intellectual-property rights, use another person’s payment or identity information, or move a protected transaction off-platform to avoid safeguards. We may restrict or suspend access where reasonably necessary to protect users, investigate suspected abuse or comply with law.

## 9. Intellectual property

The Kariv Glamour website, layout, original text, graphics, software and house branding are protected by applicable intellectual-property laws. Product trademarks remain the property of their respective owners. A limited right to use the website for personal shopping is granted; no ownership rights are transferred.

## 10. Availability and liability

We work to keep the service secure and available but cannot promise uninterrupted or error-free access. Nothing in these terms excludes liability for fraud, wilful misconduct, death or personal injury caused by negligence, breach of mandatory consumer law, or any liability that cannot legally be limited. Subject to those rights, each party is responsible for losses that were reasonably foreseeable from its breach; Kariv Glamour is not responsible for an independent seller’s acts beyond the extent imposed by law or an expressly stated buyer-protection commitment.

## 11. Governing law and consumer disputes

These terms are governed by Czech law. If you are a consumer, this choice does not deprive you of mandatory protection under the law of your habitual country of residence. Courts with jurisdiction under applicable consumer and civil-procedure rules may hear disputes.

Please contact [info@karivglamour.com](mailto:info@karivglamour.com) first so we can try to resolve a complaint. Consumers may also seek out-of-court resolution from the Czech Trade Inspection Authority (Česká obchodní inspekce), the Czech consumer ADR body: [coi.gov.cz](https://coi.gov.cz/en/alternative-dispute-resolution/).

## 12. Changes and contact

We may update these terms prospectively for legal, security or service changes. The version accepted for an order continues to govern that order unless the law requires otherwise. Questions can be sent to [info@karivglamour.com](mailto:info@karivglamour.com).`,
  contentDe: `_${LAST_UPDATED_DE}_

## 1. Geltungsbereich und Betreiber

Diese Bedingungen regeln die Nutzung der Kariv-Glamour-Website, der Kundenkonten und der über die Plattform abgeschlossenen Transaktionen. Betreiber ist das oben genannte Unternehmen. Produktspezifische Bedingungen im Angebot oder in der Bestellbestätigung werden Bestandteil der Transaktion. Widerspricht eine zwingende Verbraucherschutzvorschrift diesen Bedingungen, geht die zwingende Vorschrift vor.

## 2. Marktplatz und Verkäuferidentität

Kariv Glamour kann Produkte selbst anbieten und zugleich zugelassenen gewerblichen Händlern oder anderen klar gekennzeichneten Verkäufern ermöglichen, Uhren einzustellen. Verkäufer und gegebenenfalls abweichender Vertragspartner werden im Angebot, Checkout oder in der Bestellbestätigung ausgewiesen. Der Kaufvertrag kommt zwischen Käufer und diesem Verkäufer zustande. Kariv Glamour stellt Marktplatz-, Kommunikations- und Bestellunterstützung sowie bei berechtigten Transaktionen Käuferschutz- oder Zahlungskoordinationsdienste bereit.

## 3. Konten und Teilnahmeberechtigung

Sie müssen richtige und aktuelle Angaben machen, Ihre Zugangsdaten schützen und eine unbefugte Kontonutzung unverzüglich melden. Sie müssen rechtlich zum Abschluss der Transaktion befugt sein. Soweit dies für Betrugsprävention, Sanktionsprüfung, Zahlungssicherheit oder gesetzliche Pflichten vernünftigerweise erforderlich ist, können wir Identitäts-, Adress-, Herkunftsnachweise für Gelder oder andere Compliance-Informationen anfordern.

## 4. Angebote, Zustand und Verfügbarkeit

Uhren können neu, gebraucht oder vintage sein. Lesen Sie das gesamte Angebot, insbesondere Zustand, Maße, Jahr, Wartungsverlauf, Lieferumfang, Box und Papiere, Garantie, Verkäuferidentität, Versandmöglichkeiten und Fotos. Zwischen Bildschirmdarstellung und physischem Produkt können geringe Farb- oder Größenabweichungen entstehen. Eine Angabe zum geschätzten Herstellungsjahr oder Wartungsverlauf ist nur verbindlich, wenn dies ausdrücklich erklärt wird.

Mit der Bestellung geben Sie ein Kaufangebot ab. Eine automatische Eingangsbestätigung ist nicht zwingend die Annahme. Der Vertrag kommt zustande, wenn der Verkäufer die Bestellung annimmt oder Kariv Glamour in dessen Namen eine ausdrückliche Annahmebestätigung sendet. Die Verfügbarkeit ist bis zur Annahme nicht garantiert. Eine Bestellung kann abgelehnt oder storniert werden, wenn der Artikel nicht verfügbar ist, ein Preis offensichtlich fehlerhaft ist, Compliance-Prüfungen scheitern oder ein begründeter Betrugsverdacht besteht; bereits erstattungspflichtige Beträge werden zurückgezahlt.

## 5. Preise, Steuern und Zahlung

Preis, Währung, enthaltene Steuern, Versandkosten und bekannte zwingende Gebühren werden vor Abgabe der Bestellung angezeigt. Grenzüberschreitende Zölle oder Einfuhrsteuern richten sich nach den Versandinformationen. Verwenden Sie ausschließlich die Zahlungsanweisungen im authentifizierten Bestellbereich. Direktzahlungen an einen Verkäufer oder Dritten außerhalb des genehmigten Prozesses sind nicht vom Kariv-Käuferschutz umfasst.

Für berechtigte Transaktionen kann ein geschützter Zahlungs- oder Treuhandprozess angeboten werden. Die Freigabe der Gelder richtet sich nach Transaktionsstatus, Lieferbestätigung, Prüfzeitraum und offenen Streitfällen. Verfügbarkeit und genaue Funktionsweise werden bei der Bestellung angezeigt.

## 6. Lieferung, Prüfung, Rückgabe und Mängel

Die Lieferung richtet sich nach den [Versandinformationen](/legal/shipping-policy). Widerruf, Rückgabe und Erstattung richten sich nach der [Rückgabe- und Erstattungsrichtlinie](/legal/returns-refund-policy). Gesetzliche Mängelrechte und zusätzliche Garantien werden in der [Garantierichtlinie](/legal/warranty-policy) erläutert. Prüfen Sie die Uhr nach Lieferung zeitnah und bewahren Sie während der geltenden Rückgabe- oder Streitfrist sämtliche Verpackungen und mitgelieferten Gegenstände auf.

## 7. Echtheitsprüfung und Markenstatus

Verkäufer müssen Produkte richtig beschreiben und die Echtheitsstandards der Plattform einhalten. Die Authentifizierung ist eine fachkundige Beurteilung auf Grundlage der zum Prüfzeitpunkt verfügbaren Uhr und Informationen; siehe [Echtheitserklärung](/legal/authenticity-disclaimer). Markennamen und Warenzeichen dienen der Produktidentifikation; siehe [Marken-Haftungsausschluss](/legal/brand-disclaimer).

## 8. Unzulässige Nutzung

Sie dürfen die Plattform nicht missbrauchen, falsche Angaben machen, Sicherheitsmaßnahmen beeinträchtigen, geschützte Inhalte ohne Erlaubnis automatisiert erfassen oder kopieren, Gebühren umgehen, Bewertungen manipulieren, Schutzrechte verletzen, Zahlungs- oder Identitätsdaten Dritter verwenden oder eine geschützte Transaktion zur Umgehung von Schutzmaßnahmen außerhalb der Plattform verlagern. Der Zugang kann eingeschränkt oder gesperrt werden, soweit dies zum Schutz der Nutzer, zur Untersuchung vermuteten Missbrauchs oder zur Rechtsbefolgung vernünftigerweise erforderlich ist.

## 9. Geistiges Eigentum

Website, Layout, Originaltexte, Grafiken, Software und Hausmarke von Kariv Glamour sind durch anwendbare Schutzrechte geschützt. Produktmarken bleiben Eigentum ihrer jeweiligen Inhaber. Sie erhalten ein begrenztes Recht zur persönlichen Nutzung der Website zum Einkauf; Eigentumsrechte werden nicht übertragen.

## 10. Verfügbarkeit und Haftung

Wir bemühen uns um einen sicheren und verfügbaren Dienst, können jedoch keinen unterbrechungs- oder fehlerfreien Zugang zusagen. Keine Bestimmung schließt die Haftung für Betrug, Vorsatz, Tod oder Körperverletzung aufgrund von Fahrlässigkeit, Verletzung zwingenden Verbraucherrechts oder sonstige gesetzlich nicht beschränkbare Haftung aus. Vorbehaltlich dieser Rechte haftet jede Partei für vernünftigerweise vorhersehbare Schäden aus ihrer Pflichtverletzung; für Handlungen eines unabhängigen Verkäufers haftet Kariv Glamour nur in dem gesetzlich vorgeschriebenen oder im Käuferschutz ausdrücklich zugesagten Umfang.

## 11. Anwendbares Recht und Verbraucherstreitigkeiten

Es gilt tschechisches Recht. Sind Sie Verbraucher, entzieht Ihnen diese Rechtswahl nicht den zwingenden Schutz des Rechts Ihres gewöhnlichen Aufenthaltslandes. Zuständig sind die Gerichte nach den anwendbaren Verbraucher- und Zivilverfahrensregeln.

Kontaktieren Sie bei Beschwerden zunächst [info@karivglamour.com](mailto:info@karivglamour.com), damit wir eine Lösung versuchen können. Verbraucher können sich außerdem an die Tschechische Handelsinspektion (Česká obchodní inspekce) als tschechische Stelle für die außergerichtliche Streitbeilegung wenden: [coi.gov.cz](https://coi.gov.cz/en/alternative-dispute-resolution/).

## 12. Änderungen und Kontakt

Wir können diese Bedingungen für zukünftige Vorgänge aufgrund rechtlicher, sicherheitsbezogener oder dienstlicher Änderungen anpassen. Für eine Bestellung bleibt die bei Vertragsschluss akzeptierte Fassung maßgeblich, sofern das Gesetz nichts anderes verlangt. Fragen richten Sie an [info@karivglamour.com](mailto:info@karivglamour.com).`,
});

const PRIVACY_POLICY = createLegalPage({
  slug: 'privacy-policy',
  titleEn: 'Privacy Policy',
  titleDe: 'Datenschutzerklärung',
  descriptionEn: 'How Kariv Glamour collects, uses, shares and protects personal data under the GDPR.',
  descriptionDe: 'Wie Kariv Glamour personenbezogene Daten nach der DSGVO erhebt, nutzt, weitergibt und schützt.',
  contentEn: `_${LAST_UPDATED_EN}_

## 1. Controller and contact

Kariv Glamour s.r.o. is the controller for personal data processed to operate this website and its marketplace services, except where a clearly identified seller or service provider acts as a separate controller. Questions and data-protection requests may be sent to [info@karivglamour.com](mailto:info@karivglamour.com).

## 2. Data we process

Depending on how you use the service, we may process:

- identity, account and contact data, including name, email, telephone number and authentication identifiers;
- billing, delivery and transaction data, including address, order history, payment status, escrow reference and proof of payment;
- dealer, listing and product data submitted by sellers;
- messages, customer-service requests, disputes, reviews and other communications;
- security and compliance data used to prevent fraud, verify users and satisfy legal obligations; and
- technical and usage data such as IP address, device/browser information, logs, cookie identifiers and consent preferences.

Please do not send unnecessary sensitive personal data. Payment providers and banks may process payment credentials directly under their own notices; Kariv Glamour does not need full card credentials where they are handled by those providers.

## 3. Purposes and legal bases

We process personal data when necessary to:

- create and secure accounts, display listings, form and perform contracts, process orders, coordinate payment, shipping, returns, disputes and customer support (GDPR Article 6(1)(b));
- meet tax, accounting, consumer-protection, sanctions, anti-fraud and other legal obligations (Article 6(1)(c));
- protect the platform, users and legal claims, improve services, administer approved dealers and prevent misuse where our legitimate interests do not override your rights (Article 6(1)(f)); and
- send optional marketing or use non-essential tracking when you have given consent (Article 6(1)(a)). You may withdraw consent at any time without affecting earlier lawful processing.

## 4. Recipients and service providers

Data is shared only where needed with the seller or buyer involved in a transaction and with providers supporting identity and authentication (including Clerk), database and storage services (including Supabase), hosting, security, communications, payment or banking, insurance, delivery, professional advice and customer support. It may also be disclosed to public authorities when required by law or necessary to establish, exercise or defend legal claims.

Each independent seller receives only the information reasonably required to fulfil the transaction and must process it lawfully. Service providers acting for Kariv Glamour are subject to contractual data-protection duties.

## 5. International transfers

Some technology or service providers may process data outside the European Economic Area. Where required, we use an adequacy decision, approved standard contractual clauses or another lawful transfer mechanism and supplementary safeguards. Information about the applicable safeguard can be requested by email, subject to protection of confidential information.

## 6. Retention

We retain data only for as long as needed for the stated purpose. Account data is generally kept while the account is active; support, security and dispute records are kept for the period reasonably necessary to resolve the matter and protect legal claims. Transaction, tax and accounting records may be retained for the statutory period, which can be up to ten years where applicable. Consent records are retained as needed to demonstrate and manage your choice. Data is then deleted or anonymised unless continued retention is legally required.

## 7. Your rights

Subject to the GDPR and applicable exceptions, you may request access, correction, deletion, restriction, objection and data portability. You may object at any time to direct marketing and may withdraw consent. Where processing relies on legitimate interests, you may object on grounds relating to your situation. You also have rights relating to decisions based solely on automated processing that produce legal or similarly significant effects. Kariv Glamour does not intend to make such decisions without the safeguards required by law.

Send requests to [info@karivglamour.com](mailto:info@karivglamour.com). We may need to verify your identity. We normally respond within one month, subject to lawful extensions for complex requests.

You may lodge a complaint with the Czech Office for Personal Data Protection (Úřad pro ochranu osobních údajů), Pplk. Sochora 27, 170 00 Praha 7, Czech Republic: [uoou.gov.cz](https://uoou.gov.cz/en). You may also contact the supervisory authority in your EU/EEA country of residence or work.

## 8. Cookies and local storage

The website uses cookies and similar storage for authentication, security, preferences and other purposes described in the [Cookie Policy](/legal/cookie-policy). Non-essential technologies are used only under an appropriate legal basis and, where required, after consent.

## 9. Security and children

We use proportionate technical and organisational safeguards, but no internet service can guarantee absolute security. The marketplace is not directed to children under 18, and we do not knowingly solicit their data for purchases.

## 10. Changes

We may update this notice when services, providers or legal requirements change. Material changes will be communicated appropriately, and the current date appears above.`,
  contentDe: `_${LAST_UPDATED_DE}_

## 1. Verantwortlicher und Kontakt

Kariv Glamour s.r.o. ist Verantwortlicher für personenbezogene Daten, die zum Betrieb dieser Website und ihrer Marktplatzdienste verarbeitet werden, soweit nicht ein klar ausgewiesener Verkäufer oder Dienstleister als eigener Verantwortlicher handelt. Datenschutzfragen und Betroffenenanfragen richten Sie an [info@karivglamour.com](mailto:info@karivglamour.com).

## 2. Verarbeitete Daten

Abhängig von Ihrer Nutzung können wir folgende Daten verarbeiten:

- Identitäts-, Konto- und Kontaktdaten wie Name, E-Mail-Adresse, Telefonnummer und Authentifizierungskennungen;
- Rechnungs-, Liefer- und Transaktionsdaten wie Adresse, Bestellverlauf, Zahlungsstatus, Treuhandreferenz und Zahlungsnachweis;
- Händler-, Angebots- und Produktdaten, die Verkäufer einstellen;
- Nachrichten, Kundenserviceanfragen, Streitfälle, Bewertungen und sonstige Kommunikation;
- Sicherheits- und Compliance-Daten zur Betrugsprävention, Nutzerprüfung und Erfüllung gesetzlicher Pflichten; sowie
- technische und Nutzungsdaten wie IP-Adresse, Geräte-/Browserinformationen, Protokolle, Cookie-Kennungen und Einwilligungspräferenzen.

Übermitteln Sie keine unnötigen sensiblen personenbezogenen Daten. Zahlungsdienstleister und Banken können Zahlungsdaten unmittelbar nach ihren eigenen Hinweisen verarbeiten; Kariv Glamour benötigt keine vollständigen Kartendaten, wenn diese durch solche Anbieter verarbeitet werden.

## 3. Zwecke und Rechtsgrundlagen

Wir verarbeiten personenbezogene Daten, soweit dies erforderlich ist, um:

- Konten zu erstellen und zu sichern, Angebote darzustellen, Verträge anzubahnen und zu erfüllen sowie Bestellungen, Zahlung, Versand, Rückgabe, Streitfälle und Kundenservice abzuwickeln (Art. 6 Abs. 1 lit. b DSGVO);
- steuerliche, buchhalterische, verbraucherschutzrechtliche, sanktionsbezogene, betrugspräventive und sonstige gesetzliche Pflichten zu erfüllen (Art. 6 Abs. 1 lit. c);
- Plattform, Nutzer und Rechtsansprüche zu schützen, Dienste zu verbessern, zugelassene Händler zu verwalten und Missbrauch zu verhindern, sofern unsere berechtigten Interessen Ihre Rechte nicht überwiegen (Art. 6 Abs. 1 lit. f); und
- optionale Werbung zu versenden oder nicht erforderliche Tracking-Technologien einzusetzen, wenn Sie eingewilligt haben (Art. 6 Abs. 1 lit. a). Sie können die Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.

## 4. Empfänger und Dienstleister

Daten werden nur soweit erforderlich mit dem an einer Transaktion beteiligten Verkäufer oder Käufer sowie mit Anbietern für Identität und Authentifizierung (einschließlich Clerk), Datenbank und Speicher (einschließlich Supabase), Hosting, Sicherheit, Kommunikation, Zahlung oder Bankdienstleistung, Versicherung, Lieferung, professionelle Beratung und Kundenservice geteilt. Eine Offenlegung an Behörden erfolgt, wenn sie gesetzlich vorgeschrieben oder zur Begründung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist.

Jeder unabhängige Verkäufer erhält nur die Informationen, die vernünftigerweise zur Erfüllung der Transaktion erforderlich sind, und muss sie rechtmäßig verarbeiten. Im Auftrag von Kariv Glamour handelnde Dienstleister unterliegen vertraglichen Datenschutzpflichten.

## 5. Internationale Übermittlungen

Einige Technologie- oder Dienstleistungsanbieter können Daten außerhalb des Europäischen Wirtschaftsraums verarbeiten. Soweit erforderlich, nutzen wir einen Angemessenheitsbeschluss, genehmigte Standardvertragsklauseln oder einen anderen zulässigen Übermittlungsmechanismus sowie ergänzende Schutzmaßnahmen. Informationen zur anwendbaren Garantie können per E-Mail angefordert werden, vorbehaltlich des Schutzes vertraulicher Informationen.

## 6. Speicherdauer

Wir speichern Daten nur so lange, wie es für den genannten Zweck erforderlich ist. Kontodaten werden grundsätzlich während der aktiven Kontonutzung aufbewahrt; Support-, Sicherheits- und Streitfalldaten so lange, wie dies zur Klärung und zum Schutz von Rechtsansprüchen vernünftigerweise erforderlich ist. Transaktions-, Steuer- und Buchhaltungsdaten können für die gesetzliche Frist gespeichert werden, die gegebenenfalls bis zu zehn Jahre beträgt. Einwilligungsnachweise werden so lange aufbewahrt, wie dies zum Nachweis und zur Verwaltung Ihrer Wahl erforderlich ist. Danach werden Daten gelöscht oder anonymisiert, sofern keine weitere gesetzliche Aufbewahrungspflicht besteht.

## 7. Ihre Rechte

Nach Maßgabe der DSGVO und ihrer Ausnahmen können Sie Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Datenübertragbarkeit verlangen. Sie können Direktwerbung jederzeit widersprechen und eine Einwilligung widerrufen. Beruht die Verarbeitung auf berechtigten Interessen, können Sie aus Gründen Ihrer besonderen Situation widersprechen. Sie haben außerdem Rechte bei ausschließlich automatisierten Entscheidungen mit rechtlicher oder ähnlich erheblicher Wirkung. Kariv Glamour beabsichtigt keine solchen Entscheidungen ohne die gesetzlich erforderlichen Schutzmaßnahmen.

Anfragen richten Sie an [info@karivglamour.com](mailto:info@karivglamour.com). Wir können einen Identitätsnachweis verlangen. Die Antwort erfolgt grundsätzlich innerhalb eines Monats; bei komplexen Anfragen sind gesetzliche Verlängerungen möglich.

Sie können sich bei der tschechischen Datenschutzbehörde (Úřad pro ochranu osobních údajů), Pplk. Sochora 27, 170 00 Praha 7, Tschechische Republik, beschweren: [uoou.gov.cz](https://uoou.gov.cz/en). Alternativ können Sie die Aufsichtsbehörde in Ihrem EU-/EWR-Wohn- oder Arbeitsland kontaktieren.

## 8. Cookies und lokale Speicherung

Die Website verwendet Cookies und ähnliche Speichertechnologien für Authentifizierung, Sicherheit, Präferenzen und weitere in der [Cookie-Richtlinie](/legal/cookie-policy) beschriebene Zwecke. Nicht erforderliche Technologien werden nur auf geeigneter Rechtsgrundlage und, soweit vorgeschrieben, nach Einwilligung eingesetzt.

## 9. Sicherheit und Minderjährige

Wir setzen angemessene technische und organisatorische Schutzmaßnahmen ein; kein Internetdienst kann jedoch absolute Sicherheit garantieren. Der Marktplatz richtet sich nicht an Personen unter 18 Jahren, und wir fordern deren Daten nicht wissentlich für Käufe an.

## 10. Änderungen

Wir können diesen Hinweis anpassen, wenn sich Dienste, Anbieter oder rechtliche Anforderungen ändern. Wesentliche Änderungen werden angemessen mitgeteilt; das aktuelle Datum steht oben.`,
});

const COOKIE_POLICY = createLegalPage({
  slug: 'cookie-policy',
  titleEn: 'Cookie Policy',
  titleDe: 'Cookie-Richtlinie',
  descriptionEn: 'Information about cookies, local storage and consent choices on Kariv Glamour.',
  descriptionDe: 'Informationen zu Cookies, lokaler Speicherung und Einwilligungsoptionen bei Kariv Glamour.',
  contentEn: `_${LAST_UPDATED_EN}_

## 1. What cookies are

Cookies are small text files stored by a website on your device. Similar technologies include local storage, pixels and identifiers used to remember a session or preference. Session cookies expire when the session ends; persistent cookies remain until their stated expiry or until deleted.

## 2. Technologies used on Kariv Glamour

The precise cookies may vary with the services and features enabled, but they fall into these categories:

| Category | Purpose | Basis |
| --- | --- | --- |
| Strictly necessary | Sign-in, account security, fraud prevention, cart, checkout, network routing and saving a cookie choice | Necessary to provide the requested service or comply with security obligations |
| Preferences | Remember language, appearance and other user-requested settings, including through local storage | Necessary for the requested preference or consent where required |
| Analytics | Understand aggregate use, errors and performance so the service can be improved | Used only with consent where consent is required |
| Marketing | Measure campaigns or personalise advertising | Used only after valid consent |

Authentication providers such as Clerk may set security and session cookies. The app also stores the selected appearance preference on the device. Database and hosting providers may process technical request information needed to deliver and secure the service.

## 3. Consent

Strictly necessary technologies may operate without consent because the service cannot be securely provided without them. Non-essential analytics or marketing technologies remain disabled until you make an affirmative choice where consent is required. Closing or ignoring a consent prompt is not treated as acceptance.

You can withdraw a non-essential consent as easily as it was given through the cookie settings control when such technologies are enabled. Withdrawal does not affect earlier lawful processing.

## 4. Managing device storage

Browser settings let you inspect, block or delete cookies and local-storage data. Blocking strictly necessary cookies can prevent sign-in, cart, checkout or security functions from working. Deleting preference storage may reset language, theme or consent choices. Instructions differ by browser and device.

## 5. Third-party content

Embedded media or services from another provider can place their own cookies only where technically necessary or after the required consent. Those providers may act under their own privacy and cookie notices. Kariv Glamour does not use the fact that you accepted one provider as consent for an unrelated provider or purpose.

## 6. Updates and contact

We update this policy when technology or legal requirements change. For details about personal-data processing, see the [Privacy Policy](/legal/privacy-policy). Questions may be sent to [info@karivglamour.com](mailto:info@karivglamour.com).`,
  contentDe: `_${LAST_UPDATED_DE}_

## 1. Was Cookies sind

Cookies sind kleine Textdateien, die eine Website auf Ihrem Gerät speichert. Ähnliche Technologien sind lokaler Speicher, Pixel und Kennungen, mit denen eine Sitzung oder Präferenz gespeichert wird. Sitzungscookies enden mit der Sitzung; dauerhafte Cookies bleiben bis zu ihrem angegebenen Ablauf oder bis zur Löschung bestehen.

## 2. Bei Kariv Glamour eingesetzte Technologien

Die genauen Cookies können je nach aktivierten Diensten und Funktionen variieren. Sie gehören zu folgenden Kategorien:

| Kategorie | Zweck | Grundlage |
| --- | --- | --- |
| Unbedingt erforderlich | Anmeldung, Kontosicherheit, Betrugsprävention, Warenkorb, Checkout, Netzwerkrouting und Speicherung der Cookie-Auswahl | Erforderlich zur Bereitstellung des angeforderten Dienstes oder zur Erfüllung von Sicherheitsanforderungen |
| Präferenzen | Speicherung von Sprache, Darstellung und anderen vom Nutzer gewünschten Einstellungen, auch im lokalen Speicher | Für die gewünschte Einstellung erforderlich oder Einwilligung, soweit vorgeschrieben |
| Analyse | Aggregierte Nutzung, Fehler und Leistung verstehen, um den Dienst zu verbessern | Nur mit Einwilligung, soweit diese erforderlich ist |
| Marketing | Kampagnen messen oder Werbung personalisieren | Nur nach wirksamer Einwilligung |

Authentifizierungsanbieter wie Clerk können Sicherheits- und Sitzungscookies setzen. Die App speichert außerdem die gewählte Darstellungspräferenz auf dem Gerät. Datenbank- und Hostinganbieter können technische Anfrageinformationen verarbeiten, die zur Bereitstellung und Absicherung des Dienstes erforderlich sind.

## 3. Einwilligung

Unbedingt erforderliche Technologien dürfen ohne Einwilligung betrieben werden, weil der Dienst ohne sie nicht sicher bereitgestellt werden kann. Nicht erforderliche Analyse- oder Marketingtechnologien bleiben deaktiviert, bis Sie eine aktive Auswahl getroffen haben, soweit eine Einwilligung erforderlich ist. Das Schließen oder Ignorieren einer Einwilligungsabfrage gilt nicht als Zustimmung.

Eine Einwilligung in nicht erforderliche Technologien kann über die Cookie-Einstellungen ebenso einfach widerrufen werden, wie sie erteilt wurde, sobald solche Technologien aktiviert sind. Der Widerruf berührt die Rechtmäßigkeit der vorherigen Verarbeitung nicht.

## 4. Gerätespeicher verwalten

In den Browsereinstellungen können Sie Cookies und lokale Speicherdaten prüfen, blockieren oder löschen. Werden unbedingt erforderliche Cookies blockiert, können Anmeldung, Warenkorb, Checkout oder Sicherheitsfunktionen ausfallen. Das Löschen von Präferenzdaten kann Sprache, Theme oder Einwilligungsauswahl zurücksetzen. Die Anleitung hängt vom Browser und Gerät ab.

## 5. Inhalte Dritter

Eingebettete Medien oder Dienste eines anderen Anbieters dürfen eigene Cookies nur setzen, wenn dies technisch erforderlich ist oder die notwendige Einwilligung vorliegt. Diese Anbieter können nach eigenen Datenschutz- und Cookie-Hinweisen handeln. Die Zustimmung zu einem Anbieter gilt nicht als Einwilligung für einen anderen Anbieter oder Zweck.

## 6. Änderungen und Kontakt

Wir aktualisieren diese Richtlinie bei Änderungen der Technologie oder Rechtslage. Einzelheiten zur Verarbeitung personenbezogener Daten finden Sie in der [Datenschutzerklärung](/legal/privacy-policy). Fragen richten Sie an [info@karivglamour.com](mailto:info@karivglamour.com).`,
});

const AUTHENTICITY_POLICY = createLegalPage({
  slug: 'authenticity-disclaimer',
  titleEn: 'Authenticity Disclaimer',
  titleDe: 'Echtheitserklärung',
  descriptionEn: 'How authenticity assessments and product representations work on Kariv Glamour.',
  descriptionDe: 'Wie Echtheitsprüfungen und Produktdarstellungen bei Kariv Glamour funktionieren.',
  contentEn: `_${LAST_UPDATED_EN}_

## 1. Authentication standard

Kariv Glamour requires sellers to list authentic watches and provide accurate product information. Where an authentication review is offered, qualified reviewers assess the watch using the information and physical characteristics available at the time. The review may consider reference and serial information, movement, case, dial, hands, bracelet, hallmarks, materials, workmanship, provenance and supporting documents.

## 2. Nature of an assessment

Authentication is a professional opinion, not a statement by the original manufacturer and not an unlimited guarantee against every concealed alteration. Vintage and pre-owned watches may contain legitimate service parts or period replacements. A watch can also include aftermarket, customised or replaced components; these must be disclosed when known and may affect value, originality or manufacturer service eligibility.

Box, papers, warranty cards, receipts and certificates support provenance but do not by themselves prove that every component is original. Unless expressly stated, Kariv Glamour is not issuing a manufacturer certificate or manufacturer warranty.

## 3. Listings and photographs

Product photographs and condition reports form part of the listing. Buyers should review them with the written description, reference number, dimensions, service history and scope of delivery. Screen colour and image scale may differ slightly from the physical watch. Material discrepancies must be reported promptly.

## 4. If you have a concern

If you reasonably believe a delivered watch is inauthentic or materially different from the listing, do not wear, open, resize, repair or alter it. Keep all packaging and contact [info@karivglamour.com](mailto:info@karivglamour.com) promptly with the order number, photographs and the basis for your concern. We may request independent inspection and will apply the relevant buyer-protection, return and legal-conformity rights.

This disclaimer does not exclude liability for fraud or misrepresentation and does not limit mandatory consumer rights.`,
  contentDe: `_${LAST_UPDATED_DE}_

## 1. Authentifizierungsstandard

Kariv Glamour verpflichtet Verkäufer, ausschließlich echte Uhren anzubieten und zutreffende Produktangaben zu machen. Wird eine Echtheitsprüfung angeboten, beurteilen qualifizierte Prüfer die Uhr anhand der zum Prüfzeitpunkt verfügbaren Informationen und physischen Merkmale. Geprüft werden können Referenz- und Serienangaben, Werk, Gehäuse, Zifferblatt, Zeiger, Armband, Punzen, Materialien, Verarbeitung, Herkunft und Begleitdokumente.

## 2. Charakter der Beurteilung

Eine Authentifizierung ist eine fachkundige Beurteilung, keine Erklärung des Originalherstellers und keine unbegrenzte Garantie gegen jede verborgene Veränderung. Vintage- und gebrauchte Uhren können legitime Service- oder zeitgemäße Ersatzteile enthalten. Eine Uhr kann auch nachträglich gefertigte, individualisierte oder ersetzte Komponenten enthalten; soweit bekannt, müssen diese offengelegt werden und können Wert, Originalität oder die Serviceberechtigung beim Hersteller beeinflussen.

Box, Papiere, Garantiekarten, Belege und Zertifikate stützen die Herkunft, beweisen jedoch allein nicht, dass jede Komponente original ist. Sofern nicht ausdrücklich erklärt, stellt Kariv Glamour kein Herstellerzertifikat und keine Herstellergarantie aus.

## 3. Angebote und Fotos

Produktfotos und Zustandsberichte sind Bestandteil des Angebots. Käufer sollten sie zusammen mit schriftlicher Beschreibung, Referenznummer, Maßen, Wartungsverlauf und Lieferumfang prüfen. Bildschirmfarben und Bildmaßstab können geringfügig von der physischen Uhr abweichen. Wesentliche Abweichungen sind unverzüglich zu melden.

## 4. Bei Zweifeln

Wenn Sie begründet annehmen, dass eine gelieferte Uhr nicht echt ist oder wesentlich vom Angebot abweicht, dürfen Sie sie nicht tragen, öffnen, kürzen, reparieren oder verändern. Bewahren Sie sämtliche Verpackungen auf und kontaktieren Sie zeitnah [info@karivglamour.com](mailto:info@karivglamour.com) mit Bestellnummer, Fotos und Begründung. Wir können eine unabhängige Prüfung verlangen und wenden die einschlägigen Käuferschutz-, Rückgabe- und gesetzlichen Mängelrechte an.

Dieser Hinweis schließt keine Haftung für Betrug oder Falschdarstellung aus und beschränkt keine zwingenden Verbraucherrechte.`,
});

const BRAND_POLICY = createLegalPage({
  slug: 'brand-disclaimer',
  titleEn: 'Brand Disclaimer',
  titleDe: 'Marken-Haftungsausschluss',
  descriptionEn: 'Trademark, brand affiliation and product-identification information for Kariv Glamour.',
  descriptionDe: 'Informationen zu Marken, Herstellerbeziehungen und Produktkennzeichnung bei Kariv Glamour.',
  contentEn: `_${LAST_UPDATED_EN}_

## Independent marketplace

Kariv Glamour is an independent luxury-watch marketplace. Unless a product listing expressly states otherwise, Kariv Glamour is not affiliated with, endorsed by, sponsored by, or an authorised dealer or official service centre of the watch manufacturers displayed on this website.

## Trademarks and product names

Brand names, logos, model names, reference numbers and other trademarks belong to their respective owners. They are used in listings, navigation and editorial material only as reasonably necessary to identify, describe, compare or discuss genuine products offered by sellers. Their use does not imply a commercial relationship, approval or sponsorship.

## Product imagery and information

Product photographs are supplied by Kariv Glamour or authorised sellers for the relevant listing. Manufacturer descriptions or historical facts may be summarised for identification and informational purposes. Rights holders may report a concern about inaccurate attribution or unauthorised content to [info@karivglamour.com](mailto:info@karivglamour.com).

## Warranties and service

Manufacturer warranties, service eligibility and after-sales support apply only under the manufacturer’s own terms and only when expressly included with the watch. Displaying a brand does not create a manufacturer warranty. Mandatory rights against the contractual seller remain unaffected.`,
  contentDe: `_${LAST_UPDATED_DE}_

## Unabhängiger Marktplatz

Kariv Glamour ist ein unabhängiger Marktplatz für Luxusuhren. Sofern ein Produktangebot nicht ausdrücklich etwas anderes angibt, ist Kariv Glamour mit den auf dieser Website gezeigten Uhrenherstellern weder verbunden noch von ihnen unterstützt oder gesponsert und ist kein autorisierter Händler oder offizielles Servicezentrum dieser Hersteller.

## Marken und Produktnamen

Markennamen, Logos, Modellnamen, Referenznummern und sonstige Kennzeichen gehören ihren jeweiligen Inhabern. Sie werden in Angeboten, Navigation und redaktionellen Inhalten ausschließlich insoweit verwendet, wie dies zur Identifikation, Beschreibung, zum Vergleich oder zur Besprechung echter, von Verkäufern angebotener Produkte angemessen erforderlich ist. Die Verwendung bedeutet keine Geschäftsbeziehung, Genehmigung oder Unterstützung.

## Produktbilder und Informationen

Produktfotos werden von Kariv Glamour oder zugelassenen Verkäufern für das jeweilige Angebot bereitgestellt. Herstellerbeschreibungen oder historische Fakten können zu Identifikations- und Informationszwecken zusammengefasst werden. Rechteinhaber können Bedenken wegen einer falschen Zuordnung oder unbefugter Inhalte an [info@karivglamour.com](mailto:info@karivglamour.com) melden.

## Garantie und Service

Herstellergarantien, Serviceberechtigung und Kundendienst gelten ausschließlich nach den Bedingungen des Herstellers und nur, wenn sie ausdrücklich mit der Uhr angeboten werden. Die Anzeige einer Marke begründet keine Herstellergarantie. Zwingende Rechte gegen den vertraglichen Verkäufer bleiben unberührt.`,
});

const IMPRESSUM = createLegalPage({
  slug: 'impressum',
  titleEn: 'Impressum',
  titleDe: 'Impressum',
  descriptionEn: 'Official company and contact details for Kariv Glamour s.r.o.',
  descriptionDe: 'Offizielle Unternehmens- und Kontaktdaten der Kariv Glamour s.r.o.',
  contentEn: `_${LAST_UPDATED_EN}_

## Responsible for this website

Kariv Glamour s.r.o. is represented by its Managing Director, Peter Vasko. Legal notices may be sent to the registered office or to [info@karivglamour.com](mailto:info@karivglamour.com).

## Consumer dispute resolution

Please contact us first so we can try to resolve a complaint directly. Consumers may apply to the Czech Trade Inspection Authority (Česká obchodní inspekce), the competent Czech body for alternative dispute resolution: [coi.gov.cz](https://coi.gov.cz/en/alternative-dispute-resolution/).

We are not obliged or committed to participate before another consumer arbitration body unless mandatory law requires it.`,
  contentDe: `_${LAST_UPDATED_DE}_

## Verantwortlich für diese Website

Kariv Glamour s.r.o. wird durch den Geschäftsführer Peter Vasko vertreten. Rechtliche Mitteilungen können an den eingetragenen Firmensitz oder an [info@karivglamour.com](mailto:info@karivglamour.com) gesendet werden.

## Verbraucherstreitbeilegung

Bitte kontaktieren Sie uns zunächst, damit wir eine Beschwerde unmittelbar zu lösen versuchen können. Verbraucher können sich an die Tschechische Handelsinspektion (Česká obchodní inspekce) als zuständige tschechische Stelle für alternative Streitbeilegung wenden: [coi.gov.cz](https://coi.gov.cz/en/alternative-dispute-resolution/).

Zur Teilnahme an einem Verfahren vor einer anderen Verbraucherschlichtungsstelle sind wir weder verpflichtet noch bereit, sofern zwingendes Recht nichts anderes verlangt.`,
});

const LEGAL_PAGE_FALLBACKS = Object.freeze({
  [SHIPPING_POLICY.slug]: SHIPPING_POLICY,
  [RETURNS_POLICY.slug]: RETURNS_POLICY,
  [WARRANTY_POLICY.slug]: WARRANTY_POLICY,
  [TERMS_POLICY.slug]: TERMS_POLICY,
  [PRIVACY_POLICY.slug]: PRIVACY_POLICY,
  [COOKIE_POLICY.slug]: COOKIE_POLICY,
  [AUTHENTICITY_POLICY.slug]: AUTHENTICITY_POLICY,
  [BRAND_POLICY.slug]: BRAND_POLICY,
  [IMPRESSUM.slug]: IMPRESSUM,
});

export function getLegalPageFallback(slug) {
  return LEGAL_PAGE_FALLBACKS[slug] || null;
}

export function getAllLegalPageFallbacks() {
  return Object.values(LEGAL_PAGE_FALLBACKS);
}

export function mergeLegalPageFallbacks(records = []) {
  const remotePages = Array.isArray(records) ? records.filter(Boolean).map(withCzechLegalFallback) : [];
  const remoteSlugs = new Set(remotePages.map((page) => page.slug));
  return [
    ...remotePages,
    ...getAllLegalPageFallbacks().filter((page) => !remoteSlugs.has(page.slug)),
  ];
}

// Preserve any published human-edited Czech text; supply local Czech policy
// fields only when a dashboard record has no Czech version yet.
export function withCzechLegalFallback(record) {
  const fallback = getLegalPageFallback(record?.slug);
  if (!record || !fallback) return record;
  return { ...record, ...Object.fromEntries(['title_cs', 'content_cs', 'seoTitle_cs', 'seoDescription_cs'].map((key) => [key, record[key] || fallback[key]])) };
}
