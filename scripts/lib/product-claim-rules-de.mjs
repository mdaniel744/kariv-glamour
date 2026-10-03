// Reviewed exact German text-node replacements. No item-specific proof is inferred.
// The caller must restrict these rules to the approved German product-copy fields.
// generic-cpo rules must not run in fields describing actual certificates/documents.
export const rules = [
  {
    "id": "de-item-day-date-seller-authenticity",
    "from": "Sie ist 100 % authentisch und präsentiert sich wunderschön am Handgelenk, was sie zu einer hervorragenden Gelegenheit macht, eines der ikonischsten und prestigeträchtigsten Modelle von Rolex zu einem wettbewerbsfähigen Preis zu besitzen.",
    "to": "Der Verkäufer bietet sie als echt an. Sie präsentiert sich wunderschön am Handgelenk, was sie zu einer hervorragenden Gelegenheit macht, eines der ikonischsten und prestigeträchtigsten Modelle von Rolex zu einem wettbewerbsfähigen Preis zu besitzen."
  },
  {
    "id": "de-item-omega-found-condition-authenticity",
    "from": "Alles ist 100 % authentisch von Omega und wird im Zustand verkauft, in dem sie vorgefunden wurde.",
    "to": "Der Verkäufer bietet die Uhr und ihre Komponenten als echte Omega-Teile an. Sie wird im Zustand verkauft, in dem sie vorgefunden wurde."
  },
  {
    "id": "de-item-calatrava-seller-authenticity",
    "from": "100% authentisch. Verifiziert von einem arztgeführten Händler.",
    "to": "Die Uhr wird vom Verkäufer als echt angeboten."
  },
  {
    "id": "de-item-cartier-components-seller-attribution",
    "from": "Das Zifferblatt und das Glas sind in hervorragendem Zustand, und alle Komponenten – einschließlich Zifferblatt, Gehäuse, Krone, Armband und Schließe – sind vollständig authentisch.",
    "to": "Das Zifferblatt und das Glas sind in hervorragendem Zustand. Nach Angaben des Verkäufers sind alle Komponenten – einschließlich Zifferblatt, Gehäuse, Krone, Armband und Schließe – vollständig authentisch."
  },
  {
    "id": "de-docs-2021-warranty-not-service-proof",
    "from": "Es wird mit der originalen Garantiekarte von 2021 geliefert, was Ihnen Sicherheit hinsichtlich der Authentizität und der jüngsten Servicehistorie gibt.",
    "to": "Es wird mit der originalen Garantiekarte von 2021 geliefert. Die Karte unterstützt Angaben zur Herkunft; sie belegt allein weder die Echtheit noch eine aktuelle Wartung."
  },
  {
    "id": "de-docs-hublot-ewarranty-not-authenticity-proof",
    "from": "Die Uhr wird mit einer internationalen Garantie über das elektronische Garantiesystem von Hublot und einer Originalbox geliefert, was Authentizität und Sammlerwert gewährleistet.",
    "to": "Die Uhr wird mit einer internationalen Garantie über das elektronische Garantiesystem von Hublot und einer Originalbox geliefert. Garantie und Box sind allein kein abschließender Echtheitsnachweis."
  },
  {
    "id": "de-docs-full-set-not-authenticity-proof",
    "from": "Es bestätigt die Authentizität, stützt den zukünftigen Wiederverkaufswert und bietet Ihnen das vollständige Eigentumserlebnis, das Sammler erwarten.",
    "to": "Das vollständige Set dokumentiert den Lieferumfang und kann Angaben zur Herkunft unterstützen; es ist allein kein abschließender Echtheitsnachweis."
  },
  {
    "id": "de-docs-box-papers-not-authenticity-protection",
    "from": "Die Originalbox und die Papiere sind im Markt für gebrauchte Luxusuhren von enormer Bedeutung, da sie sowohl die Authentizität als auch den Wiederverkaufswert schützen.",
    "to": "Die Originalbox und die Papiere dokumentieren den Lieferumfang und können Angaben zur Herkunft unterstützen; sie sind allein kein abschließender Echtheitsnachweis."
  },
  {
    "id": "de-docs-ap-full-set-not-authenticity-proof",
    "from": "Dieses Exemplar kommt als Full Set, komplett mit der AP-Markenbox und Papieren, was seine Authentizität und Sammelwürdigkeit bestätigt.",
    "to": "Dieses Exemplar kommt als Full Set, komplett mit der AP-Markenbox und Papieren. Box und Papiere unterstützen Angaben zur Herkunft, sind allein jedoch kein abschließender Echtheitsnachweis."
  },
  {
    "id": "generic-cpo-de-used-and-authenticated",
    "from": "Zertifiziert gebraucht und authentifiziert.",
    "to": "Gebraucht; vom Verkäufer als echt angeboten."
  },
  {
    "id": "de-inline-set-generic-verified",
    "from": "Das Set enthält die Originalbox und die Originalpapiere, und die Uhr wurde als authentisch verifiziert.",
    "to": "Das Set enthält die Originalbox und die Originalpapiere. Der Verkäufer bietet die Uhr als echt an."
  },
  {
    "id": "de-inline-condition-documents-verified",
    "from": "Da das Stück gebraucht und im Zustand gut bewertet ist und seine Echtheit verifiziert wurde, dienen die mitgelieferten Papiere als begleitende Aufzeichnung.",
    "to": "Das Stück ist gebraucht und wird im Zustand gut bewertet; die mitgelieferten Papiere dienen als begleitende Aufzeichnung. Der Verkäufer bietet die Uhr als echt an."
  },
  {
    "id": "de-inline-box-verified-no-original-papers",
    "from": "Die Uhr ist auf Echtheit geprüft und wird mit ihrer Originalbox geliefert; Originalpapiere sind nicht enthalten.",
    "to": "Die Uhr wird mit ihrer Originalbox geliefert; Originalpapiere sind nicht enthalten. Der Verkäufer bietet die Uhr als echt an."
  },
  {
    "id": "de-status-verified-label",
    "from": "Verifiziert",
    "to": "Vom Verkäufer als echt angeboten",
    "wholeNode": true,
    "precedingText": "Authentifizierung:"
  },
  {
    "id": "de-status-confirmed-label",
    "from": "Bestätigt",
    "to": "Vom Verkäufer als echt angeboten",
    "wholeNode": true,
    "precedingText": "Authentifizierung:"
  },
  {
    "id": "generic-cpo-de-status-verified-used-label",
    "from": "Verifiziert, zertifiziert gebraucht",
    "to": "Gebraucht; vom Verkäufer als echt angeboten",
    "wholeNode": true,
    "precedingText": "Authentifizierung:"
  },
  {
    "id": "de-residual-certification-centre-boilerplate",
    "from": "Wir sind das Zertifizierungszentrum für Chrono24 in den USA. Wir sind das führende Uhrenserviceunternehmen in New York City. Unser Team ist hochqualifiziert in der Wartung und Restaurierung einer breiten Palette moderner, vintage und hochwertiger Uhren und gewährleistet deren Langlebigkeit und Präzision. Seit über 72 Jahren im Geschäft, arbeiten wir mit den weltweit führenden Herstellern, Einzelhändlern, Auktionshäusern, Sammlern und Wiederverkäufern zusammen, einschließlich Chrono24. Wir warten jede Uhr, die wir verkaufen, vollständig und bieten bei jedem Kauf eine 1-jährige GCW-Garantie.",
    "to": "Verkäufer müssen ihre Angaben zu Zertifizierungen und Serviceleistungen belegen können. Zum Angebot gehört eine 1-jährige GCW-Garantie."
  },
  {
    "id": "de-residual-external-authentication-eligibility",
    "from": ", und dieses Angebot ist auf Anfrage für den Authentifizierungsservice von Chrono24 berechtigt.",
    "to": ". Eine externe Authentifizierung ist nur dann Bestandteil des Angebots, wenn sie ausdrücklich vereinbart und dokumentiert ist."
  },
  {
    "id": "de-residual-all-pieces-departure-inspection",
    "from": "Alle Stücke werden bei Abgang inspiziert und mit detaillierter Videografie als funktionierend dokumentiert.",
    "to": "Verkäufer müssen Angaben zur Funktion und zu durchgeführten Prüfungen belegen können. Fragen Sie nach verfügbaren Videos der angebotenen Uhr."
  },
  {
    "id": "de-residual-all-pieces-departure-inspection-alternative",
    "from": "Alle Stücke werden bei Abreise inspiziert und mit detaillierter Videografie als funktionierend dokumentiert.",
    "to": "Verkäufer müssen Angaben zur Funktion und zu durchgeführten Prüfungen belegen können. Fragen Sie nach verfügbaren Videos der angebotenen Uhr."
  },
  {
    "id": "de-residual-inhouse-pre-shipment-inspection",
    "from": "Jede Uhr wird vor dem Versand von unseren hauseigenen Uhrmachern inspiziert, einschließlich abschließender Wartung, Reinigung und Politur, falls erforderlich.",
    "to": "Verkäufer müssen Angaben zu Prüfungen, Wartung, Reinigung und Politur der angebotenen Uhr belegen können."
  },
  {
    "id": "de-residual-order-triggered-tests",
    "from": "Sobald eine Bestellung aufgegeben wurde, führt unser Uhrmacher einen abschließenden Zeit- und Drucktest durch, inspiziert das Uhrwerk und stellt sicher, dass die Uhr in Top-Zustand läuft.",
    "to": "Fragen Sie den Verkäufer nach den für die angebotene Uhr verfügbaren Prüf- und Wartungsnachweisen. Angaben zu durchgeführten Prüfungen müssen belegbar sein."
  },
  {
    "id": "de-residual-all-pieces-function-inspection",
    "from": "Jedes Stück wird gründlich inspiziert und getestet, um sicherzustellen, dass alle Funktionen einwandfrei arbeiten.",
    "to": "Verkäufer müssen den Funktionszustand zutreffend beschreiben und ihre Angaben zu durchgeführten Prüfungen belegen können."
  },
  {
    "id": "de-inline-authentic-used-verification",
    "from": "und ist als authentisch und zertifiziert gebraucht verifiziert.",
    "to": "und wird vom Verkäufer als echte Gebrauchtuhr angeboten."
  },
  {
    "id": "de-inline-authentic-verified-certified-used",
    "from": "als authentisch verifiziert und zertifiziert gebraucht",
    "to": "vom Verkäufer als echt angeboten und gebraucht"
  },
  {
    "id": "de-inline-used-good-authenticated",
    "from": ", und authentifiziert, und es wird",
    "to": ", und es wird"
  },
  {
    "id": "de-inline-year-authentic-verified",
    "from": "produziert im Jahr 2000 und als authentisch verifiziert.",
    "to": "produziert im Jahr 2000 und vom Verkäufer als echt angeboten."
  },
  {
    "id": "de-inline-condition-authentic-verified-which",
    "from": "angeboten und als authentisch verifiziert, was für Käufer relevant ist",
    "to": "angeboten, was für Käufer relevant ist"
  },
  {
    "id": "de-inline-item-authenticated-and-tested",
    "from": "und wurde authentifiziert und getestet – bereit, direkt aus der Box getragen zu werden.",
    "to": "und ist bereit, direkt aus der Box getragen zu werden. Der Verkäufer bietet die Uhr als echt an."
  },
  {
    "id": "de-inline-box-docs-with-verified-status",
    "from": "Da die Uhr mit Originalbox und Originalpapieren geliefert wird und verifiziert ist, begleitet die Dokumentation die Uhr.",
    "to": "Da die Uhr mit Originalbox und Originalpapieren geliefert wird, begleitet die Dokumentation die Uhr."
  },
  {
    "id": "de-inline-box-docs-with-past-verification",
    "from": "Da die Uhr mit ihrer Originalbox und den Papieren geliefert wird und verifiziert wurde, begleitet die Dokumentation das Stück, anstatt separat beschafft zu werden.",
    "to": "Da die Uhr mit ihrer Originalbox und den Papieren geliefert wird, begleitet die Dokumentation das Stück, anstatt separat beschafft zu werden."
  },
  {
    "id": "de-inline-vintage-verified-example",
    "from": "und ein verifiziertes Exemplar statt eines vollständigen Sammler-Sets suchen.",
    "to": "und eine einzelne Uhr statt eines vollständigen Sammler-Sets suchen."
  },
  {
    "id": "de-inline-condition-comma-genuineness-checked",
    "from": "in gutem Zustand, auf Echtheit geprüft und wird ohne Originalbox oder Papiere geliefert.",
    "to": "in gutem Zustand und wird ohne Originalbox oder Papiere geliefert."
  },
  {
    "id": "de-inline-condition-comma-genuineness-checked-delivered",
    "from": "in sehr gutem Zustand, auf Echtheit geprüft und ohne Originalbox oder Originalpapiere geliefert.",
    "to": "in sehr gutem Zustand und wird ohne Originalbox oder Originalpapiere geliefert."
  },
  {
    "id": "generic-cpo-de-certified-used-full-set",
    "from": "Dieses Exemplar wird als Full Set geliefert, mit Originalbox und Originalpapieren, und wurde als gebraucht verifiziert und zertifiziert.",
    "to": "Dieses Exemplar wird als gebrauchtes Full Set geliefert, mit Originalbox und Originalpapieren."
  },
  {
    "id": "generic-cpo-de-2016-full-set-certification",
    "from": "Dieses gebrauchte Exemplar stammt aus dem Jahr 2016 und wird als komplettes Set mit Originalbox und Originalpapieren geliefert, auf Echtheit geprüft und als zertifiziert gebraucht.",
    "to": "Dieses gebrauchte Exemplar stammt aus dem Jahr 2016 und wird als komplettes Set mit Originalbox und Originalpapieren geliefert."
  },
  {
    "id": "generic-cpo-de-english-condition",
    "from": "Certified Pre-Owned-Zustand",
    "to": "gebrauchten Zustand"
  },
  {
    "id": "generic-cpo-de-english-offered",
    "from": "als Certified Pre-Owned",
    "to": "als gebraucht"
  },
  {
    "id": "generic-cpo-de-english-condition-list",
    "from": "Gebraucht, Sehr gut; Certified Pre-Owned",
    "to": "Gebraucht, Sehr gut"
  },
  {
    id: 'generic-cpo-de-documentation-inference',
    from: 'Die Originalbox und die Originalpapiere dokumentieren den Lieferumfang, und der Status als zertifizierte Gebrauchtuhr zeigt an, dass die Uhr vor der Listung geprüft und verifiziert wurde.',
    to: 'Die Originalbox und die Originalpapiere dokumentieren den Lieferumfang. Verkäufer müssen ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'generic-cpo-de-evaluation-inference',
    from: 'Da die Uhr zertifiziert gebraucht und verifiziert ist, wurden Zustand und Echtheit vor der Listung bewertet.',
    to: 'Verkäufer müssen die Angaben zu Zustand und Echtheit der angebotenen Uhr belegen können.',
  },
  {
    id: 'generic-cpo-de-identity-documentation-inference',
    from: 'Dieses Exemplar ist verifiziert und zertifiziert gebraucht, was Käufern neben der Uhr selbst auch eine Dokumentation der Identität der Uhr bietet.',
    to: 'Dieses Exemplar wird als gebraucht angeboten. Verkäufer müssen ihre Angaben zur Identität und Echtheit der Uhr belegen können.',
  },
  {
    id: 'generic-cpo-de-included-documentation-inference',
    from: 'Die Uhr ist verifiziert und zertifiziert gebraucht, sodass die Verpackung und die Dokumente zusammen mit ihr geliefert werden.',
    to: 'Die Uhr wird als gebraucht angeboten; die Verpackung und die Dokumente werden mitgeliefert.',
  },
  {
    id: 'de-authenticity-boilerplate-intro',
    from: 'Authentizität ist für uns von größter Bedeutung. Wir sind sehr stolz auf die Qualität und Authentizität der Produkte, die wir anbieten, und unternehmen große Anstrengungen, um sicherzustellen, dass alle unsere Produkte echt und korrekt dargestellt sind.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-authenticity-boilerplate-sourcing',
    from: 'Um die Authentizität unserer Produkte zu gewährleisten, arbeiten wir eng mit unseren Lieferanten zusammen, um sicherzustellen, dass alle von uns angebotenen Produkte direkt vom Originalhersteller bezogen werden. Außerdem haben wir strenge Qualitätskontrollmaßnahmen eingeführt, um sicherzustellen, dass alle Produkte unseren hohen Authentizitätsstandards entsprechen.',
    to: 'Verkäufer müssen nachvollziehbare Angaben zur Herkunft ihrer Uhren machen können.',
  },
  {
    id: 'de-authenticity-boilerplate-reassurance',
    from: 'Wir verstehen, dass Authentizität für viele unserer Kunden ein zentrales Anliegen ist, und möchten Ihnen versichern, dass wir dies sehr ernst nehmen. Wir verpflichten uns, unseren Kunden hochwertige, authentische Produkte anzubieten, und werden stets alles daransetzen, deren Authentizität zu gewährleisten.',
    to: 'Bitten Sie den Verkäufer vor dem Kauf um die verfügbaren Nachweise und Angaben zur Echtheit.',
  },
  {
    id: 'de-universal-certificate',
    from: '✅ Authentisch: Alle Uhren sind authentifiziert und werden mit einem Echtheitszertifikat geliefert',
    to: 'Angaben zur Echtheit: Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können. Ob ein Echtheitszertifikat enthalten ist, muss im jeweiligen Angebot angegeben sein.',
  },
  {
    id: 'de-multiple-methods',
    from: 'Jede Uhr wird sorgfältig geprüft und durch mehrere Authentifizierungsmethoden verifiziert.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-our-experts-spaced-percent',
    from: '100 % authentisch und vor dem Versand von unseren Experten verifiziert.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-our-experts-percent',
    from: '100% authentisch und vor dem Versand von unseren Experten verifiziert.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-numbered-guarantee',
    from: '③Wir garantieren, dass alle verkauften Uhren 100 % authentisch sind und die Bilder die tatsächliche Uhr zeigen.',
    to: '③Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können. Die Bilder müssen die tatsächlich angebotene Uhr zeigen.',
  },
  {
    id: 'de-provenance-photography',
    from: 'Alle Fotos und Videos werden mit professioneller Makroausrüstung aufgenommen, um den Zustand genau offenzulegen, und jede Uhr wird mit Ehrlichkeit und Transparenz präsentiert, mit vollständig authentischer Provenienz.',
    to: 'Alle Fotos und Videos werden mit professioneller Makroausrüstung aufgenommen, um den Zustand genau offenzulegen. Verkäufer müssen ihre Angaben zur Herkunft der Uhr belegen können.',
  },
  {
    id: 'de-our-watchmaker-function',
    from: 'Jede Uhr wird von unserem Uhrmacher auf Echtheit und einwandfreie Funktion geprüft.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Angaben zu Echtheit und Funktion belegen können.',
  },
  {
    id: 'de-our-inhouse-experts',
    from: 'Jede Uhr wird von unseren hauseigenen Experten gründlich authentifiziert und geprüft, und jedes Stück ist echt.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-malformed-guarantee',
    from: 'Wir die vollständige Echtheit unserer Produkte. Alle Uhren durchlaufen eine gründliche Inspektion, um dies zu gewährleisten.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-all-models-acquired-spaced-percent',
    from: 'Alle Modelle wurden als 100 % authentisch bestätigt und bei der jeweiligen Marke oder einem autorisierten Händler der Marke erworben.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Angaben zu Echtheit und Herkunft belegen können.',
  },
  {
    id: 'de-all-models-acquired-percent',
    from: 'Alle Modelle wurden als 100% authentisch bestätigt und bei der jeweiligen Marke oder einem autorisierten Händler der Marke erworben.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Angaben zu Echtheit und Herkunft belegen können.',
  },
  {
    id: 'de-all-models-purchased',
    from: 'Alle Modelle wurden als 100 % authentisch bestätigt und bei der jeweiligen Marke oder einem autorisierten Händler der Marke gekauft.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Angaben zu Echtheit und Herkunft belegen können.',
  },
  {
    id: 'de-multiple-methods-conservative-description',
    from: 'Jede Uhr, die wir verkaufen, wird sorgfältig geprüft und durch mehrere Authentifizierungsmethoden verifiziert, und wir beschreiben den Zustand konservativ, damit Sie begeistert sind, wenn sie ankommt.',
    to: 'Verkäufer müssen echte Uhren anbieten, ihre Echtheitsangaben belegen können und den Zustand der angebotenen Uhr zutreffend beschreiben.',
  },
  {
    id: 'de-every-offered-watch',
    from: 'Jede Uhr, die wir anbieten, wird authentifiziert und genau so beschrieben, wie sie ist.',
    to: 'Verkäufer müssen echte Uhren anbieten, ihre Echtheitsangaben belegen können und den Zustand zutreffend beschreiben.',
  },
  {
    id: 'de-guarantee-effective-communication',
    from: 'Wir stehen dafür ein, dass unsere Uhren wie beschrieben und authentisch sind – Wir streben bei jedem einzelnen Vorgang nach 100 % positiven Transaktionen durch effiziente und effektive Kommunikation.',
    to: 'Verkäufer müssen ihre Angebote zutreffend beschreiben und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-our-inhouse-watch-experts',
    from: 'Jede Uhr wird von unseren hauseigenen Uhrenexperten gründlich authentifiziert und geprüft.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-our-certified-watchmakers',
    from: 'Jede Uhr wird von unseren zertifizierten Uhrmachern geprüft und authentifiziert.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-universal-verification-with-photos',
    from: 'Jede Uhr, die wir verkaufen, wird gründlich geprüft und authentifiziert, und die hochauflösenden Fotos zeigen genau das Stück, das Sie erhalten.',
    to: 'Verkäufer müssen ihre Echtheitsangaben belegen können. Die hochauflösenden Fotos zeigen das angebotene Stück.',
  },
  {
    id: 'de-exclusively-verified-watches',
    from: 'Wir führen ausschließlich authentische, echte Luxusuhren und stellen sicher, dass alle auf ihre Echtheit geprüft werden.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-condition-and-universal-guarantee',
    from: 'Dieses besondere Exemplar wird in ungetragenem oder gebrauchtem Zustand angeboten, und jede Uhr, die wir verkaufen, ist 100 % authentisch.',
    to: 'Dieses besondere Exemplar wird in ungetragenem oder gebrauchtem Zustand angeboten. Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-personal-seller-universal',
    from: 'Jedes Stück, das ich anbiete, ist authentisch, wettbewerbsfähig bepreist und wird schnell versandt.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können. Angaben zu Preis und Versand sind dem jeweiligen Angebot zu entnehmen.',
  },
  {
    id: 'de-our-inhouse-watchmaker',
    from: 'Vollständig geprüft und authentifiziert von unserem hauseigenen Uhrmacher, läuft dieser Zeitmesser genau und ist bereit zum Tragen.',
    to: 'Dieser Zeitmesser läuft genau und ist bereit zum Tragen. Verkäufer müssen ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-our-watchmaker-quality',
    from: 'Jedes unserer Stücke wird zuvor von unserem Uhrmacher geprüft, um die Qualität des Stücks zu authentifizieren.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Angaben zu Echtheit und Zustand belegen können.',
  },
  {
    id: 'de-our-watchmaker-quality-alternative',
    from: 'Jedes unserer Stücke wird zuvor von unserem Uhrmacher überprüft, um die Qualität des Stücks zu authentifizieren.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Angaben zu Echtheit und Zustand belegen können.',
  },
  {
    id: 'de-every-sold-watch-exactly-described',
    from: 'Jede Uhr, die wir verkaufen, ist 100 % authentisch und genau beschrieben.',
    to: 'Verkäufer müssen echte Uhren anbieten, ihre Echtheitsangaben belegen können und den Zustand zutreffend beschreiben.',
  },
  {
    id: 'de-our-team-item-clause',
    from: 'wird diese Uhr als Nur-Uhr angeboten und wurde von unserem Team authentifiziert.',
    to: 'wird diese Uhr als Nur-Uhr angeboten. Verkäufer müssen ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-our-experienced-watchmaker',
    from: 'Unser erfahrener Uhrmacher prüft jede Uhr sorgfältig auf Authentizität und optimale Leistung.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Angaben zu Echtheit und Funktion belegen können.',
  },
  {
    id: 'de-universal-replacement-certificate',
    from: 'Sollten keine Papiere für die Uhr vorhanden sein, stellen wir Ihnen ein Echtheitszertifikat aus.',
    to: 'Falls Originalpapiere fehlen, fragen Sie den Verkäufer nach den verfügbaren Nachweisen zur Echtheit.',
  },
  {
    id: 'de-complete-confidence-guarantee',
    from: 'Wir stehen uneingeschränkt dahinter, dass alle unsere Zeitmesser 100% authentisch sind. Jedes Stück wird gründlich inspiziert, bevor Sie es erhalten, sodass Sie mit vollstem Vertrauen kaufen können, dass es authentisch ist und genau wie in unserem Angebot beschrieben.',
    to: 'Verkäufer müssen echte Uhren anbieten, ihre Echtheitsangaben belegen können und den Zustand zutreffend beschreiben.',
  },
  {
    id: 'de-full-confidence-guarantee',
    from: 'Wir stehen voll und ganz dahinter, dass alle unsere Zeitmesser 100% authentisch sind. Jedes Stück wird gründlich inspiziert, bevor Sie es erhalten, damit Sie in vollständigem Vertrauen kaufen können, dass es authentisch ist und genau wie in unserem Angebot beschrieben.',
    to: 'Verkäufer müssen echte Uhren anbieten, ihre Echtheitsangaben belegen können und den Zustand zutreffend beschreiben.',
  },
  {
    id: 'de-total-confidence-guarantee',
    from: 'Wir stehen voll und ganz dahinter, dass alle unsere Zeitmesser zu 100 % authentisch sind. Jedes Stück wird gründlich geprüft, bevor Sie es erhalten, sodass Sie mit vollstem Vertrauen kaufen können, dass es authentisch ist und genau wie in unserem Angebot beschrieben.',
    to: 'Verkäufer müssen echte Uhren anbieten, ihre Echtheitsangaben belegen können und den Zustand zutreffend beschreiben.',
  },
  {
    id: 'de-full-authenticity-fragment',
    from: 'Vollständige Authentizität unserer Produkte. Alle Uhren durchlaufen eine gründliche Inspektion, um dies sicherzustellen.',
    to: 'Verkäufer müssen ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-our-laboratory',
    from: 'Jedes Stück wird in unserem hochmodernen Labor von erfahrenen Uhrmachern authentifiziert, gewartet und poliert.',
    to: 'Verkäufer müssen ihre Angaben zu Echtheit, Wartung und Aufarbeitung der angebotenen Uhr belegen können.',
  },
  {
    id: 'de-our-technicians-preserve-refinishing',
    from: 'Die Uhr wurde von unseren Expertentechnikern inspiziert und das Gehäuse, das Armband und alle externen Teile können poliert/aufgearbeitet worden sein.',
    to: 'Das Gehäuse, das Armband und alle externen Teile können poliert/aufgearbeitet worden sein. Verkäufer müssen ihre Angaben zu Prüfungen belegen können.',
  },
  {
    id: 'de-universal-honesty-its-authenticity',
    from: 'Jede Uhr, die wir anbieten, wird sorgfältig geprüft, auf ihre Echtheit verifiziert und mit vollständiger Ehrlichkeit präsentiert.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-guarantee-every-transaction',
    from: 'Wir stehen hinter unseren Uhren, dass sie wie beschrieben und authentisch sind – Wir streben bei jeder Transaktion nach 100% positiven Transaktionen durch effiziente und effektive Kommunikation.',
    to: 'Verkäufer müssen ihre Angebote zutreffend beschreiben und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-strict-inspection-guarantee',
    from: 'Jede Uhr durchläuft einen strengen Inspektionsprozess, um die Authentizität zu gewährleisten.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-strict-inspection-process',
    from: 'Jede unserer Uhren durchläuft einen strengen Inspektionsprozess zur Authentizitätsprüfung.',
    to: 'Verkäufer müssen ihre Angaben zu Echtheit und durchgeführten Prüfungen belegen können.',
  },
  {
    id: 'de-verified-authenticity-label',
    from: 'Verifizierte Authentizität: Jede Uhr wird geprüft und als 100 % authentisch bestätigt.',
    to: 'Angaben zur Echtheit: Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-before-shipping-confidence',
    from: 'Jede Uhr, die wir anbieten, wird vor dem Versand vollständig authentifiziert und geprüft, sodass Sie mit vollstem Vertrauen kaufen können.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-our-watchmaker-item-prefix',
    from: 'Dieses Stück wurde von unserem Uhrmacher vollständig authentifiziert und verfügt über',
    to: 'Dieses Stück verfügt über',
  },
  {
    id: 'de-every-watch-certified-authentic',
    from: 'Jede Uhr, die wir verkaufen, ist als authentisch zertifiziert, in ausgezeichnetem funktionellem und kosmetischem Zustand.',
    to: 'Verkäufer müssen echte Uhren anbieten, ihre Echtheitsangaben belegen können und den funktionellen sowie äußeren Zustand zutreffend beschreiben.',
  },
  {
    id: 'de-our-repair-centre',
    from: 'Jede Uhr wird in unserem Uhrenreparaturzentrum authentifiziert und ordnungsgemäß gewartet/poliert (sofern innerhalb des Wartungsfensters), direkt bevor wir sie einstellen.',
    to: 'Verkäufer müssen ihre Angaben zu Echtheit, Wartung und Politur der angebotenen Uhr belegen können.',
  },
  {
    id: 'de-various-methods',
    from: 'Wir haben jede Uhr sorgfältig inspiziert und durch verschiedene Authentifizierungsmethoden verifiziert.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-our-watchmaker-function-alternative',
    from: 'Jede Uhr wird von unserem Uhrmacher auf Echtheit sowie Funktion geprüft.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Angaben zu Echtheit und Funktion belegen können.',
  },
  {
    id: 'de-buy-with-confidence',
    from: 'Kaufen Sie mit Vertrauen: Alle Uhren, die wir anbieten, sind 100% authentisch und genau beschrieben.',
    to: 'Verkäufer müssen echte Uhren anbieten, ihre Echtheitsangaben belegen können und den Zustand zutreffend beschreiben.',
  },
  {
    id: 'de-all-sold-watches-with-photos',
    from: 'Alle verkauften Uhren sind 100 % authentisch, und die Bilder, die Sie sehen, zeigen die tatsächliche Uhr.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können. Die Bilder zeigen die angebotene Uhr.',
  },
  {
    id: 'de-every-watch-guaranteed-functional',
    from: 'Jede von uns verkaufte Uhr ist garantiert 100 % authentisch und voll funktionsfähig.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Angaben zu Echtheit und Funktion belegen können.',
  },
  {
    id: 'de-exclusively-vintage-verified',
    from: 'Wir handeln ausschließlich mit authentischen Vintage- und gebrauchten mechanischen Zeitmessern, die jeweils sorgfältig geprüft, authentifiziert und bewahrt werden, um ihre ursprüngliche Integrität zu erhalten.',
    to: 'Verkäufer von Vintage- und gebrauchten mechanischen Zeitmessern müssen echte Uhren anbieten und ihre Angaben zu Echtheit, Zustand und Veränderungen belegen können.',
  },
  {
    id: 'de-customer-focused-guarantee',
    from: 'Wir stehen dafür ein, dass unsere Uhren wie beschrieben und authentisch sind – wir sind sehr kundenorientiert und streben bei jedem einzelnen Geschäft nach 100 % positiven Transaktionen.',
    to: 'Verkäufer müssen ihre Angebote zutreffend beschreiben und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-authenticity-dash-label',
    from: 'Authentizität — jede angebotene Uhr ist 100 % authentisch und exakt wie beschrieben.',
    to: 'Angaben zur Echtheit — Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-universal-inspection-with-warranty',
    from: 'Alle unsere Produkte wurden vor der Listung auf Qualität und Authentizität geprüft und kommen mit einer standardmäßigen 1-Jahres-Garantie.',
    to: 'Die angebotenen Produkte kommen mit einer standardmäßigen 1-Jahres-Garantie. Verkäufer müssen ihre Angaben zu Echtheit und Zustand belegen können.',
  },
  {
    id: 'de-universal-honesty-authenticity',
    from: 'Jede Uhr, die wir anbieten, wird sorgfältig geprüft, auf Echtheit verifiziert und mit vollständiger Ehrlichkeit präsentiert.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-receipt-provenance-not-conclusive-proof',
    from: 'Ohne originale Omega-Kunststoffkarten, aber mit der originalen Kaufquittung des autorisierten Händlers Jared, die 100 % Authentizität belegt.',
    to: 'Ohne originale Omega-Kunststoffkarten, aber mit der originalen Kaufquittung des autorisierten Händlers Jared, die Angaben zur Herkunft unterstützt und allein kein abschließender Echtheitsnachweis ist.',
  },
  {
    id: 'de-experienced-watchmakers-universal',
    from: 'Jede Uhr wird von erfahrenen Uhrmachern authentifiziert, geprüft und gewartet und ist 100% authentisch.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Angaben zu Echtheit und Wartung belegen können.',
  },
  {
    id: 'de-money-back-authenticity-guarantee',
    from: 'Als lizenzierter Händler in Florida garantieren wir die Echtheit oder Ihr Geld zurück.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können. Maßgeblich sind die geltenden Rückgabe- und Käuferschutzbedingungen.',
  },
  {
    id: 'de-our-inhouse-specialists',
    from: 'Jede von uns verkaufte Uhr wird von unseren hauseigenen Spezialisten gründlich authentifiziert und geprüft.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-every-watch-transparent-condition',
    from: 'Jede Uhr ist 100% authentisch und ihr Zustand wird sorgfältig und transparent beschrieben.',
    to: 'Der Zustand der angebotenen Uhr muss sorgfältig und transparent beschrieben sein.',
  },
  {
    id: 'de-all-watches-authentic-verified',
    from: 'Alle Uhren sind 100 % authentisch und verifiziert.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-universal-honesty-authenticity-alternative',
    from: 'Jede Uhr, die wir anbieten, wird sorgfältig geprüft, auf Authentizität verifiziert und mit vollständiger Ehrlichkeit präsentiert.',
    to: 'Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-every-watch-new-unworn',
    from: 'Jede Uhr, die wir anbieten, ist nicht nur authentisch, sondern auch brandneu, ungetragen und mit der Originalgarantie ausgestattet.',
    to: 'Die angebotenen Uhren sind brandneu, ungetragen und mit der Originalgarantie ausgestattet. Verkäufer müssen ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-partner-certified-heading',
    from: 'PARTNER CERTIFIED',
    to: 'ANGABEN ZUR ECHTHEIT',
  },
  {
    id: 'de-unsupported-partner-certification',
    from: 'Wir sind Kariv Glamour Partner Certified.',
    to: 'Verkäufer müssen ihre Echtheitsangaben belegen können.',
  },
  {
    id: 'de-no-certification-stop',
    from: 'Die Uhr kann direkt ohne zusätzlichen Zertifizierungsstopp versandt werden.',
    to: 'Eine Prüfung der Angebotsangaben ist keine physische Echtheitsprüfung.',
  },
  {
    id: "de-residual-our-watchmakers-before-delivery",
    from: "Sobald Sie eine Bestellung aufgeben, wird die Uhr von unseren Uhrmachern vor der Lieferung gründlich geprüft und gewartet.",
    to: "Verkäufer müssen ihre Angaben zu Prüfungen und Wartung der angebotenen Uhr belegen können.",
  },
  {
    id: "de-residual-every-watch-personally-inspected",
    from: "Jede Uhr, die ich verkaufe, wird persönlich geprüft und mit derselben Liebe zum Detail behandelt, die ich in meine berufliche Arbeit einbringe.",
    to: "Verkäufer müssen den Zustand der angebotenen Uhr zutreffend beschreiben und Angaben zu durchgeführten Prüfungen belegen können.",
  },
  {
    id: "de-residual-every-watch-function-tested",
    from: "Alle Uhren werden vor der Einstellung auf Funktion und Ganggenauigkeit geprüft.",
    to: "Verkäufer müssen ihre Angaben zu Funktion, Ganggenauigkeit und durchgeführten Prüfungen belegen können.",
  },
  {
    id: "de-residual-every-watch-shipping-tested",
    from: "Jede Uhr wird vor dem Versand gründlich geprüft, wobei die Zeitmessleistung verifiziert und Gehäuse sowie Armband gegen die Artikelbeschreibung kontrolliert werden, um Genauigkeit zu gewährleisten.",
    to: "Verkäufer müssen die angebotene Uhr zutreffend beschreiben und Angaben zu durchgeführten Prüfungen belegen können.",
  },
  {
    id: "de-residual-check-documents-instead-of-verification",
    from: "Da Box und Papiere fehlen, ist die verifizierte Authentifizierung der relevante Bezugspunkt für den Käufer.",
    to: "Da Box und Papiere fehlen, sollten Käufer den Verkäufer nach den verfügbaren Nachweisen zur Echtheit und Herkunft fragen.",
  },
  {
    id: "de-residual-box-papers-provenance",
    from: "Die enthaltene Box und die Papiere sorgen für echten Mehrwert und Sicherheit, da sie Authentizität und Herkunft bestätigen.",
    to: "Die enthaltene Box und die Papiere unterstützen Angaben zur Herkunft, sind allein jedoch kein abschließender Echtheitsnachweis.",
  },
  {
    id: "de-residual-documentation-comparison",
    from: "Diese Kombination aus Dokumentation und Verifizierung ist relevant für Käufer, die gebrauchte Exemplare derselben Referenz vergleichen.",
    to: "Die enthaltene Dokumentation ist relevant für Käufer, die gebrauchte Exemplare derselben Referenz vergleichen. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-certificate-on-request-watch-register",
    from: "Sie wurde von unseren Uhrmachern vollständig authentifiziert und alle Prüfungen über Watch Register und ähnliche Datenbanken haben einwandfreie Ergebnisse ergeben.",
    to: "Die Prüfungen über Watch Register und ähnliche Datenbanken haben einwandfreie Ergebnisse ergeben. Solche Datenbankprüfungen ersetzen keine physische Echtheitsprüfung; Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-full-set-documentation",
    from: "Das Vorhandensein der Originalbox und der Originalpapiere zusammen mit der verifizierten Authentifizierung dokumentiert die Uhr als komplettes Set.",
    to: "Die Originalbox und die Originalpapiere dokumentieren den Lieferumfang als komplettes Set. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-verified-new-production-year",
    from: "Die Uhr wurde auf ihre Echtheit verifiziert, und das Produktionsjahr ist 2025.",
    to: "Das Produktionsjahr ist 2025. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-verified-no-papers-water-warning",
    from: "Sie ist verifiziert, jedoch sind keine Originalbox und keine Papiere enthalten, und die Wasserdichtigkeit ist bei einer Vintage-Uhr nicht gewährleistet.",
    to: "Es sind keine Originalbox und keine Papiere enthalten, und die Wasserdichtigkeit ist bei einer Vintage-Uhr nicht gewährleistet. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-authenticated-with-papers",
    from: "Die Uhr wurde authentifiziert, und Papiere sind vorhanden, während die Originalbox nicht enthalten ist.",
    to: "Papiere sind vorhanden, während die Originalbox nicht enthalten ist. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-verification-available-documents",
    from: "Dieses Exemplar wurde vollständig verifiziert und enthält die auf den Fotos gezeigte Begleitdokumentation.",
    to: "Dieses Exemplar enthält die auf den Fotos gezeigte Begleitdokumentation. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-function-performance-preserved",
    from: "Die Uhr wurde auf Authentizität und ordnungsgemäße Funktionalität geprüft und läuft zum Zeitpunkt der Listung wie erwartet.",
    to: "Die Uhr läuft zum Zeitpunkt der Listung wie erwartet. Verkäufer müssen ihre Angaben zu Echtheit und Funktion belegen können.",
  },
  {
    id: "de-residual-verification-purpose-good-condition",
    from: "Die Uhr ist zur Authentifizierung verifiziert und befindet sich in sehr gutem Zustand.",
    to: "Die Uhr befindet sich in sehr gutem Zustand. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-verification-purpose-watch-only",
    from: "Dieses Exemplar ist zur Authentifizierung verifiziert und wird als nur Uhr angeboten, ohne Originalbox oder Originalpapiere; das Produktionsjahr ist nicht bekannt.",
    to: "Dieses Exemplar wird als nur Uhr angeboten, ohne Originalbox oder Originalpapiere; das Produktionsjahr ist nicht bekannt. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-verification-purpose-men",
    from: "für Herren bestimmt und zur Authentifizierung verifiziert.",
    to: "für Herren bestimmt. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-verification-new-set",
    from: "Die Uhr wird neu geliefert, mit Originalbox und Originalpapieren, und ist authentifiziert.",
    to: "Die Uhr wird neu geliefert, mit Originalbox und Originalpapieren. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-verified-preserve-bracelet",
    from: "Die Uhr ist verifiziert, und das Armband ist noch nicht in der Länge angepasst.",
    to: "Das Armband ist noch nicht in der Länge angepasst. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-verified-preserve-box-no-papers",
    from: "Die Uhr ist verifiziert, und der Lieferumfang umfasst die Originalbox, jedoch keine Originalpapiere.",
    to: "Der Lieferumfang umfasst die Originalbox, jedoch keine Originalpapiere. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-piece-authenticity-only",
    from: "Das Stück wurde auf Authentizität geprüft.",
    to: "Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-unqualified-shipping-verification",
    from: "100% authentisch und vor dem Versand verifiziert.",
    to: "Verkäufer müssen echte Uhren anbieten und ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-inspected-authentic-ready",
    from: "Geprüft, authentisch und versandbereit.",
    to: "Versandbereit. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-authentic-inspected-ready",
    from: "Authentisch, geprüft, versandbereit.",
    to: "Versandbereit. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-notes-authenticated",
    from: "Anmerkungen: Vollständig geprüft, authentifiziert, läuft gut und bereit zum Tragen.",
    to: "Anmerkungen: Läuft gut und bereit zum Tragen. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-in-stock-authenticity",
    from: "Diese Uhr ist derzeit bei uns auf Lager, 100% authentisch und versandbereit.",
    to: "Diese Uhr ist auf Lager und versandbereit. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-residual-certified-authentic-item",
    from: "Diese Uhr ist als authentisch zertifiziert, in ausgezeichnetem funktionellem und kosmetischem Zustand.",
    to: "Diese Uhr ist in ausgezeichnetem funktionellem und kosmetischem Zustand. Verkäufer müssen ihre Echtheitsangaben belegen können.",
  },
  {
    id: "de-inline-verification-was-verified",
    from: "Die Authentifizierung wurde verifiziert",
    to: "Der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-verification-is-verified",
    from: "Die Authentifizierung ist verifiziert",
    to: "Der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-verification-was-confirmed",
    from: "Die Authentifizierung wurde bestätigt",
    to: "Der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-authenticity-was-verified",
    from: "Die Authentizität wurde verifiziert",
    to: "Der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-lower-verification-was-verified",
    from: "die Authentifizierung wurde verifiziert",
    to: "der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-lower-verification-is-verified",
    from: "die Authentifizierung ist verifiziert",
    to: "der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-lower-verification-was-confirmed",
    from: "die Authentifizierung wurde bestätigt",
    to: "der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-lower-verification-reported",
    from: "die Authentifizierung wird als verifiziert angegeben",
    to: "der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-lower-authenticity-was-verified",
    from: "die Authentizität wurde verifiziert",
    to: "der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-lower-authenticity-is-verified",
    from: "die Authentizität ist verifiziert",
    to: "der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-authenticity-short-label",
    from: "; Authentifizierung verifiziert",
    to: "; Echtheitsnachweis des Verkäufers erforderlich",
  },
  {
    id: "de-inline-authenticity-status-short-label",
    from: ", Authentizität verifiziert",
    to: ", Echtheitsnachweis des Verkäufers erforderlich",
  },
  {
    id: "de-inline-verified-authentication-attribute",
    from: " mit verifizierter Authentifizierung",
    to: "",
  },
  {
    id: "de-inline-and-verified-authentication-attribute",
    from: " und verifizierter Authentifizierung",
    to: "",
  },
  {
    id: "de-inline-and-completed-verification",
    from: " und bereits abgeschlossener Verifizierung",
    to: "",
  },
  {
    id: "de-inline-verified-used-example",
    from: "gebrauchtes, verifiziertes Exemplar",
    to: "gebrauchtes Exemplar",
  },
  {
    id: "de-inline-verified-used-watch",
    from: "verifizierte Gebrauchtuhr",
    to: "Gebrauchtuhr",
  },
  {
    id: "de-inline-verified-used-full-set",
    from: "verifiziertes gebrauchtes Full Set",
    to: "gebrauchtes Full Set",
  },
  {
    id: "de-inline-verified-new-example",
    from: "neues, verifiziertes Exemplar",
    to: "neues Exemplar",
  },
  {
    id: "de-inline-and-verified-certified-used",
    from: "verifiziert und zertifiziert gebraucht",
    to: "zertifiziert gebraucht",
  },
  {
    id: "de-inline-used-and-verified",
    from: "gebraucht und verifiziert",
    to: "gebraucht",
  },
  {
    id: "de-inline-used-comma-verified",
    from: "gebraucht, verifiziert",
    to: "gebraucht",
  },
  {
    id: "de-inline-verified-and-certified-watch",
    from: "verifizierte und zertifizierte Gebrauchtuhr",
    to: "zertifizierte Gebrauchtuhr",
  },
  {
    id: "de-inline-new-and-verified",
    from: "neu und verifiziert",
    to: "neu",
  },
  {
    id: "de-inline-new-comma-verified",
    from: "neu, verifiziert und wird",
    to: "neu und wird",
  },
  {
    id: "de-inline-watch-verified-and-supplied",
    from: "Die Uhr ist verifiziert und wird",
    to: "Die Uhr wird",
  },
  {
    id: "de-inline-watch-authentic-verified-and-supplied",
    from: "Die Uhr ist als authentisch verifiziert und wird",
    to: "Die Uhr wird",
  },
  {
    id: "de-inline-watch-authentic-verified-and-includes",
    from: "Die Uhr ist als authentisch verifiziert und enthält",
    to: "Die Uhr enthält",
  },
  {
    id: "de-inline-example-authentic-verified-and-supplied",
    from: "Exemplar ist als authentisch verifiziert und wird",
    to: "Exemplar wird",
  },
  {
    id: "de-inline-example-verified-and-supplied",
    from: "Exemplar ist verifiziert und wird",
    to: "Exemplar wird",
  },
  {
    id: "de-inline-complete-authenticated-set",
    from: "vollständiges, authentifiziertes Set",
    to: "vollständiges Set",
  },
  {
    id: "de-inline-authenticated-preowned-character",
    from: "den Charakter eines authentifizierten Gebrauchtstücks",
    to: "den Charakter eines Gebrauchtstücks",
  },
  {
    id: "de-inline-its-authenticity-verified",
    from: "und ihre Echtheit wurde verifiziert",
    to: "und der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-his-authenticity-verified",
    from: "und seine Echtheit wurde verifiziert",
    to: "und der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-its-authenticity-status",
    from: "und ihre Authentizität wurde verifiziert",
    to: "und der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-exemplar-authenticity-verified",
    from: "das Exemplar wurde auf Echtheit verifiziert",
    to: "der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-watch-is-authentic-verified",
    from: "und die Uhr ist als authentisch verifiziert",
    to: "und der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-watch-is-verified",
    from: "und die Uhr ist verifiziert",
    to: "und der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-further-authenticity-confirmed",
    from: "wobei die Authentifizierung bereits bestätigt wurde",
    to: "wobei der Verkäufer die Uhr als echt anbietet",
  },
  {
    id: "de-inline-and-it-authenticity-checked",
    from: "und es wurde auf Authentizität geprüft",
    to: "und der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-and-it-genuineness-checked",
    from: "und es wurde auf Echtheit geprüft",
    to: "und der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-and-watch-genuineness-checked",
    from: "und die Uhr wurde auf Echtheit geprüft",
    to: "und der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-and-she-genuineness-checked",
    from: "und sie wurde auf Echtheit überprüft",
    to: "und der Verkäufer bietet die Uhr als echt an",
  },
  {
    id: "de-inline-and-authenticated",
    from: "und wurde authentifiziert.",
    to: "und der Verkäufer bietet die Uhr als echt an.",
  },
  {
    id: "de-inline-and-authentic-verified",
    from: "und wurde als authentisch verifiziert.",
    to: "und der Verkäufer bietet die Uhr als echt an.",
  },
  {
    id: "de-inline-and-authenticity-checked",
    from: "und wurde auf Authentizität geprüft.",
    to: "und der Verkäufer bietet die Uhr als echt an.",
  },
  {
    id: "de-inline-and-genuineness-checked",
    from: "und wurde auf Echtheit geprüft.",
    to: "und der Verkäufer bietet die Uhr als echt an.",
  },
  {
    id: "de-inline-and-verified-evaluated",
    from: "und wurde verifiziert und bewertet.",
    to: "und der Verkäufer bietet die Uhr als echt an.",
  },
  {
    id: "de-inline-verified-to-authenticate",
    from: " und verifiziert für die Authentifizierung",
    to: "",
  },
  {
    id: "de-inline-good-authentication-verification",
    from: ", und für die Authentifizierung verifiziert.",
    to: ". Der Verkäufer bietet die Uhr als echt an.",
  },
  {
    id: "de-inline-exemplars-own-docs",
    from: "Dieses Exemplar ist als authentisch verifiziert, und die beiliegenden Serviceunterlagen dokumentieren seine Wartungshistorie, was für eine Uhr dieses Alters relevant ist.",
    to: "Die beiliegenden Serviceunterlagen dokumentieren die Wartungshistorie dieses Exemplars, was für eine Uhr dieses Alters relevant ist. Der Verkäufer bietet die Uhr als echt an.",
  },
  {
    id: "de-inline-no-docs-which-checked",
    from: "die auf ihre Echtheit geprüft wurde und ohne Originalbox oder Papiere geliefert wird",
    to: "die ohne Originalbox oder Papiere geliefert wird",
  },
  {
    id: "de-inline-no-docs-which-genuineness-checked",
    from: "das auf Echtheit geprüft wurde und ohne Originalbox oder Originalpapiere geliefert wird",
    to: "das ohne Originalbox oder Originalpapiere geliefert wird",
  },
  {
    id: "de-inline-verified-watch-only-short",
    from: ", als authentisch verifiziert und wird als Nur-Uhr geliefert",
    to: " und wird als Nur-Uhr geliefert",
  },
  {
    id: "de-inline-verified-with-service-year",
    from: ", dessen Authentizität verifiziert wurde, und wurde 2026 hergestellt",
    to: " und wurde 2026 hergestellt",
  },
  {
    id: "de-inline-verified-without-box",
    from: "dessen Authentizität verifiziert wurde und das ohne Originalbox oder Papiere geliefert wird",
    to: "das ohne Originalbox oder Papiere geliefert wird",
  },
  {
    id: "de-inline-verified-no-box-year",
    from: "geliefert wird und dessen Echtheit verifiziert wurde",
    to: "geliefert wird",
  },
  {
    id: "de-inline-documents-genuineness-predicate",
    from: "und ist als authentisch verifiziert.",
    to: "und der Verkäufer bietet die Uhr als echt an.",
  },
  {
    id: 'generic-cpo-de-preowned-redundant-verified',
    from: 'gebrauchtes, verifiziertes, zertifiziertes Pre-Owned-Exemplar',
    to: 'gebrauchtes Exemplar',
  },
  {
    id: 'generic-cpo-de-preowned-redundant-piece',
    from: 'gebrauchtes, zertifiziertes Pre-Owned-Stück',
    to: 'gebrauchtes Stück',
  },
  {
    id: 'generic-cpo-de-preowned-redundant-example',
    from: 'gebrauchte, zertifizierte Pre-Owned-Exemplar',
    to: 'gebrauchte Exemplar',
  },
  {
    id: 'generic-cpo-de-preowned-redundant-mens-watch',
    from: 'gebrauchte, zertifizierte Pre-Owned-Herrenuhr',
    to: 'gebrauchte Herrenuhr',
  },
  {
    id: 'generic-cpo-de-redundant-watch',
    from: 'gebrauchte, zertifizierte Gebrauchtuhr',
    to: 'Gebrauchtuhr',
  },
  {
    id: 'generic-cpo-de-redundant-example',
    from: 'gebrauchte, zertifizierte Exemplar aus Vorbesitz',
    to: 'gebrauchte Exemplar aus Vorbesitz',
  },
  {
    id: 'generic-cpo-de-verified-preowned-piece',
    from: 'verifiziertes, zertifiziertes Gebrauchtstück',
    to: 'Gebrauchtstück',
  },
  {
    id: 'generic-cpo-de-used-certified-piece',
    from: 'gebrauchtes zertifiziertes Stück',
    to: 'gebrauchtes Stück',
  },
  {
    id: 'generic-cpo-de-preowned-neuter',
    from: 'zertifiziertes Pre-Owned',
    to: 'Pre-Owned',
  },
  {
    id: 'generic-cpo-de-used-neuter',
    from: 'zertifiziertes gebrauchtes',
    to: 'gebrauchtes',
  },
  {
    id: 'generic-cpo-de-used-feminine-upper',
    from: 'Zertifizierte gebrauchte',
    to: 'Gebrauchte',
  },
  {
    id: 'generic-cpo-de-used-feminine',
    from: 'zertifizierte gebrauchte',
    to: 'gebrauchte',
  },
  {
    id: 'generic-cpo-de-used-watch-upper',
    from: 'Zertifizierte Gebrauchtuhr',
    to: 'Gebrauchtuhr',
  },
  {
    id: 'generic-cpo-de-used-watch',
    from: 'zertifizierte Gebrauchtuhr',
    to: 'Gebrauchtuhr',
  },
  {
    id: 'generic-cpo-de-used-example-neuter',
    from: 'zertifiziertes Gebrauchtexemplar',
    to: 'Gebrauchtexemplar',
  },
  {
    id: 'generic-cpo-de-used-example',
    from: 'zertifizierte Gebrauchtexemplar',
    to: 'Gebrauchtexemplar',
  },
  {
    id: 'generic-cpo-de-used-condition-dative',
    from: 'zertifiziertem Gebrauchtzustand',
    to: 'gebrauchtem Zustand',
  },
  {
    id: 'generic-cpo-de-used-predicate-upper',
    from: 'Zertifiziert gebraucht',
    to: 'Gebraucht',
  },
  {
    id: 'generic-cpo-de-used-predicate',
    from: 'zertifiziert gebraucht',
    to: 'gebraucht',
  },
  { id: 'de-cleanup-repeated-used', from: 'gebraucht, gebraucht,', to: 'gebraucht,' },
  { id: 'de-cleanup-condition-and-fullset', from: 'Dieses Exemplar ist gebraucht, Zustand Sehr Gut, und gebraucht, geliefert als Full Set mit der Originalbox und den Originalpapieren.', to: 'Dieses Exemplar ist gebraucht, Zustand Sehr Gut, und wird als Full Set mit der Originalbox und den Originalpapieren geliefert.' },
  { id: 'de-cleanup-condition-list', from: 'Gebraucht, Sehr Gut, gebraucht', to: 'Gebraucht, Sehr Gut' },
  { id: 'de-cleanup-used-rating', from: 'mit der Bewertung Sehr gut und als gebraucht eingestuft,', to: 'mit der Bewertung Sehr gut,' },
  { id: 'de-cleanup-redundant-condition', from: 'Gebraucht, sehr gut; gebraucht;', to: 'Gebraucht, sehr gut;' },
  { id: 'de-cleanup-seller-attribution-flow', from: 'Die Uhr ist vom Verkäufer als echt angeboten und gebraucht und wird mit ihrer Originalbox und den Originalpapieren geliefert.', to: 'Die Uhr ist gebraucht, wird vom Verkäufer als echt angeboten und mit ihrer Originalbox und den Originalpapieren geliefert.' },
];
