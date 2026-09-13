// Czech editions of the three permanent homepage guides. Reference IDs stay
// stable across languages so the same chapter and source links keep working.
export const CZECH_EDITORIAL_GUIDES = {
  'how-to-safely-buy-a-pre-owned-luxury-watch': {
    category: 'Průvodce nákupem',
    title: 'Jak bezpečně koupit použité luxusní hodinky?',
    excerpt: 'Praktický postup, jak před nákupem prověřit prodejce, konkrétní hodinky, jejich historii, způsob platby a doručení.',
    readTime: '8 minut čtení',
    intro: [
      'Použité luxusní hodinky mohou nabídnout výjimečný design, historii i hodnotu. Jistota při nákupu ale závisí na mnohem více než lákavé ceně. Nejspolehlivější je opakovatelný postup: prověřit prodejce, určit přesnou referenci a doložit stav ještě před zaplacením.',
      'Tento průvodce vysvětluje nejdůležitější kontroly. Je určen zájemcům o první hodinky i sběratelům, kteří chtějí nabídky porovnávat podle jasných kritérií a vyhnout se zbytečným překvapením.',
    ],
    keyPoints: [
      'Prověřte prodejce a ochranu, která se vztahuje na konkrétní transakci.',
      'Porovnejte referenci, sériové údaje a provedení s nabídkou.',
      'Stav, servisní historii a původnost posuzujte odděleně.',
      'Použijte doložitelnou platbu a pojištěné doručení se záznamem.',
      'Hodinky zkontrolujte ihned v rámci lhůty pro vrácení nebo posouzení.',
    ],
    sections: [
      { id: 'seller-first', title: 'Začněte prodejcem, ne hodinkami', paragraphs: [
        'Přesvědčivá produktová stránka nenahradí prověření prodejce. Hledejte skutečnou identitu firmy, ověřitelné kontakty, jasné podmínky, aktuální zákaznické zkušenosti a historii obchodování s podobnými hodinkami. Profesionální prodejce má být ochoten odpovědět na konkrétní otázky a dodat další fotografie bez vytváření umělého časového tlaku.',
        'Před platbou si přečtěte pravidla vrácení, ověřování pravosti a záruky. Zjistěte, kdo odpovídá za situaci, kdy hodinky podstatně neodpovídají popisu, dorazí poškozené nebo neprojdou ověřením. Ochrana tržiště funguje nejlépe tehdy, když platba i komunikace zůstávají v rámci schváleného postupu.',
      ] },
      { id: 'identify-watch', title: 'Zjistěte, které hodinky přesně kupujete', paragraphs: [
        'Nabídka má uvádět značku, model, referenční číslo, přibližné období výroby, strojek a přiložené příslušenství. Porovnejte údaje s důvěryhodnými podklady výrobce nebo odbornými zdroji. Drobné rozdíly v nápisech na ciferníku, lunetě, náramku či proporcích pouzdra mohou znamenat jinou variantu nebo výměnu součásti při servisu.',
        'Požádejte o ostré aktuální snímky ciferníku, boků pouzdra, dýnka, spony, náramku a případně strojku. Identifikační čísla lze fotografovat s částečně zakrytými citlivými číslicemi. Cílem je ověřit, že fotografie patří nabízeným hodinkám a jejich jednotlivé prvky si navzájem odpovídají.',
      ] },
      { id: 'authenticity-originality', title: 'Rozlišujte pravost a původnost', paragraphs: [
        'Pravé hodinky mohou obsahovat pozdější servisní díly, nově upravené povrchy nebo náhradní příslušenství. Nemusí to znamenat špatný nákup, ovlivňuje to však sběratelský význam i cenu. Ověřování pravosti řeší, zda jsou hodinky a jejich součásti originální; původnost vyjadřuje, nakolik současný stav odpovídá původnímu továrnímu provedení.',
        'U drahého nebo vintage kusu si vyžádejte kontrolu kvalifikovaným hodinářem nebo zavedenou ověřovací službou. Jediná fotografie, vyhledání sériového čísla, krabička ani záruční karta samy o sobě nepředstavují konečný důkaz pravosti.',
      ] },
      { id: 'condition-service', title: 'Porozumějte stavu a servisní historii', paragraphs: [
        'Stav není jen otázkou viditelných škrábanců. Zjistěte, zda bylo pouzdro leštěno, náramek není nadměrně vytahaný, sklíčko či luneta nejsou poškozené a všechny funkce pracují správně. Pokud jsou součástí cenového zdůvodnění, vyžádejte si zprávu o přesnosti chodu, zkoušce vodotěsnosti a provedeném servisu.',
        'Nedávný servis může snížit riziko brzkých nákladů, pouze pokud je doložen a provedl jej důvěryhodný poskytovatel. Neověřené tvrzení „právě po servisu“ nemá stejnou váhu jako položková faktura. Při neznámé historii počítejte v rozpočtu s prohlídkou nebo opravou.',
      ] },
      { id: 'payment-delivery', title: 'Chraňte platbu i doručení', paragraphs: [
        'Zvolte způsob platby, který vytváří jasný záznam a zachovává ochranu slíbenou prodejcem nebo tržištěm. Buďte opatrní, pokud máte transakci přesunout jinam, zaplatit jinému příjemci nebo bez přesvědčivého důvodu použít nevratnou metodu.',
        'Doprava má být pojištěna na plnou kupní hodnotu, sledovatelná a předaná proti podpisu. Před odesláním si ověřte postup při škodní události. Po doručení zdokumentujte stav zásilky; rozbalení mimořádně hodnotného nákupu je vhodné natočit v jednom nepřerušeném záběru.',
      ] },
      { id: 'arrival-check', title: 'Po doručení neodkládejte kontrolu', paragraphs: [
        'Doručené hodinky porovnejte s nabídkou ještě během lhůty pro kontrolu nebo vrácení. Zkontrolujte referenci, viditelné sériové údaje, příslušenství, stav a základní funkce. Neodstraňujte ochranné fólie, neupravujte náramek ani hodinky delší dobu nenoste, dokud si nejste jisti shodou s dohodou.',
        'Při jakékoli nesrovnalosti prodejce ihned písemně informujte. Uschovejte balení, fotografie i záznamy transakce. Klidný a dobře zdokumentovaný postup dává oběma stranám nejlepší možnost věc účinně vyřešit.',
      ] },
    ],
    faq: [
      { question: 'Je bezpečné koupit použité luxusní hodinky online?', answer: 'Ano, může to být bezpečné, pokud je prodejce ověřitelný, nabídka podrobná, platba chráněná a hodinky můžete zkontrolovat během jasně stanovené lhůty pro vrácení nebo posouzení.' },
      { question: 'Musí mít každé použité hodinky krabičku a doklady?', answer: 'Ne. Starší hodinky se často prodávají bez nich. Jejich absence se má promítnout do posouzení a ceny; pravost je přesto nutné ověřit z hodinek samotných a spolehlivým odborným posouzením.' },
      { question: 'Kdy využít nezávislého hodináře?', answer: 'Nezávislá kontrola je obzvlášť užitečná u drahých, vintage, složitých nebo nedostatečně doložených hodinek a vždy, když prodejce nemůže poskytnout dostatek důkazů o stavu a pravosti.' },
    ],
  },
  'what-box-and-papers-mean-for-luxury-watches': {
    category: 'Ověřování pravosti',
    title: 'Co u luxusních hodinek znamená krabička a doklady?',
    excerpt: 'Co obsahuje kompletní sada, jak dokumenty ovlivňují důvěru a hodnotu a proč příslušenství nenahradí ověření pravosti.',
    readTime: '7 minut čtení',
    intro: [
      '„Krabička a doklady“ patří k nejběžnějším výrazům na trhu použitých hodinek, často se však používá příliš volně. Obvykle označuje originální prezentační krabičku spolu se záruční kartou, certifikátem nebo prodejní dokumentací výrobce, kterou hodinky obdržely při prvním nákupu.',
      'Toto příslušenství může podpořit doložený původ, úplnost a atraktivitu při dalším prodeji. Jde o užitečné podklady, nikoli náhradu kontroly hodinek samotných. Důležitější než označení „full set“ je přesný seznam skutečně dodaných položek.',
    ],
    keyPoints: [
      'Vyžádejte si seznam a fotografie všech přiložených položek.',
      'Zkontrolujte shodu referenčních a sériových údajů s hodinkami.',
      'Příslušenství berte jako podpůrný podklad, nikoli důkaz pravosti.',
      'Vliv na cenu závisí na značce, modelu, stáří a vzácnosti.',
      'Originální dokumenty ukládejte bezpečně, odděleně od běžného nošení.',
    ],
    sections: [
      { id: 'what-is-included', title: 'Co běžně patří do kompletní sady?', paragraphs: [
        'Moderní kompletní sada může obsahovat vnější obal, prezentační krabičku, záruční kartu, návod, visačky, chránič lunety, náhradní články náramku a původní prodejní doklad. Vintage hodinky mohou mít místo karty perforovaný papírový certifikát, chronometrický certifikát nebo záruční knížku s razítkem prodejce.',
        'Jednotná definice neexistuje. Balení a dokumentace se liší podle výrobce, trhu a roku výroby. Vyžádejte si proto položkový seznam. Nepředpokládejte, že výraz „krabička a doklady“ automaticky zahrnuje vše, co bylo dodáno k novým hodinkám.',
      ] },
      { id: 'documents-match', title: 'Jak mají doklady odpovídat hodinkám?', paragraphs: [
        'Je-li na záruční kartě nebo certifikátu uvedena reference a sériové či pouzdrové číslo, musí odpovídat hodinkám. Razítko prodejce, datum prodeje a kód země mohou doplnit kontext. Rozdíly vyžadují vysvětlení — nestačí, že dokument působí přesvědčivě.',
        'Ověřte také dobovou správnost dokumentu. Značky mění vzhled karet, papírových dokladů, hologramů a balení. Formát zavedený až několik let po výrobě hodinek může být servisním náhradním dokladem, nesprávně přiřazeným příslušenstvím nebo varovným signálem pro odbornou kontrolu.',
      ] },
      { id: 'authenticity-limit', title: 'Prokazují krabička a doklady pravost?', paragraphs: [
        'Ne. Originální příslušenství lze spojit s jinými hodinkami a existují přesvědčivé napodobeniny. Naopak mnoho pravých hodinek přišlo během desetiletí o původní balení a doklady. Hodinky je nutné ověřit podle konstrukce, strojku, identifikátorů a provedení.',
        'Shodná a dobově správná sada posiluje historii prezentovanou prodejcem. Nejlépe funguje jako součást širšího souboru důkazů: důvěryhodný prodejce, podrobná prohlídka, servisní záznamy a konzistentní historie vlastnictví.',
      ] },
      { id: 'value', title: 'Jak krabička a doklady ovlivňují cenu?', paragraphs: [
        'Sběratelé obecně připlácejí za úplnost, zvláště u novějších hodinek, limitovaných edic a vyhledávaných referencí. Příplatek není pevný. Závisí na vzácnosti, stavu, poptávce a obtížnosti získání správného příslušenství.',
        'U některých vintage hodinek mohou mít výjimečná původnost a stav větší význam než chybějící krabička. U téměř nových hodinek je absence záruční dokumentace nápadnější. Porovnávejte skutečně srovnatelné kusy, místo abyste všem značkám a modelům přisuzovali stejné procento.',
      ] },
      { id: 'replacement-items', title: 'Původní, náhradní a později doplněné příslušenství', paragraphs: [
        'Servisní pouzdro výrobce, náhradní krabička nebo později zakoupený návod mohou být užitečné, ale nejsou původní sadou. Prodejce má dodatečné doplnění jasně popsat. Ani dobově správná krabička nedokazuje, že byla prodána právě s těmito hodinkami.',
        'Servisní dokumenty mohou mít pro majitele větší užitek než dekorativní balení: zachycují provedené práce, vyměněné díly a stav k určitému datu. Posuzujte jednotlivé dokumenty podle skutečné informační hodnoty, nejen podle jejich vzhledu.',
      ] },
      { id: 'care', title: 'Jak sadu zkontrolovat a uchovat', paragraphs: [
        'Vyžádejte si snímky čísel, razítek, dat a stavu každé položky. Po nákupu dokumenty uchovávejte v suchu, naplocho a mimo sluneční světlo. Cenné doklady uložte bezpečně a nenoste celou sadu s sebou při běžném nošení nebo přepravě hodinek.',
        'K existující historii přidávejte kupní faktury, zprávy o ověření pravosti a budoucí servisní doklady. Přehledně vedený záznam usnadní servis, pojištění i další prodej, i když hodinky při pořízení neměly kompletní sadu.',
      ] },
    ],
    faq: [
      { question: 'Co znamená „watch only“?', answer: 'Obvykle jde o nabídku samotných hodinek bez původní prezentační krabičky a dokladů výrobce. Prodejce má přesto přesně uvést, zda dodává servisní dokumenty, náhradní články náramku nebo jiné příslušenství.' },
      { question: 'Jsou hodinky bez dokladů automaticky méně důvěryhodné?', answer: 'Ne. Chybějící doklady jsou běžné zejména u starších hodinek. Pravost se posuzuje z hodinek samotných, nedoložená historie však může ovlivnit důvěru kupujícího a tržní cenu.' },
      { question: 'Lze získat náhradní doklady?', answer: 'Pravidla se liší podle výrobce. Původní záruční karty se obvykle znovu nevydávají. Někdy lze získat servisní dokumentaci, archivní výpis nebo certifikát; tyto podklady je nutné správně označit.' },
    ],
  },
  'are-pre-owned-luxury-watches-a-good-investment': {
    category: 'Sběratelství a hodnota',
    title: 'Jsou použité luxusní hodinky dobrou investicí?',
    excerpt: 'Realistický pohled na zachování hodnoty, poptávku, náklady vlastnictví a rozdíl mezi sběratelstvím a investováním.',
    readTime: '8 minut čtení',
    intro: [
      'Některé použité hodinky si dobře drží hodnotu a malá část výrazně zdraží. To ale z každých luxusních hodinek nedělá spolehlivou investici. Ceny ovlivňuje móda, vzácnost, rozhodnutí značek, ekonomická situace a kvalita konkrétního kusu — faktory, které nelze dlouhodobě přesně předvídat.',
      'Užitečné je oddělit radost ze sběratelství od očekávání výnosu. Hodinky mohou být skvělým osobním nákupem, i když cena nikdy nevzroste. Tento průvodce ukazuje, co ovlivňuje finanční výsledek a jak o nákladech přemýšlet bez příslibů zaručeného zhodnocení.',
    ],
    keyPoints: [
      'Historický růst ceny nezaručuje budoucí výnos.',
      'Reference, stav, původnost a kupní cena jsou důležitější než samotná značka.',
      'Marže prodejců, servis, pojištění a poplatky při prodeji snižují výsledek.',
      'Trh hodinek je méně likvidní a přehledný než veřejné kapitálové trhy.',
      'Kupte si hodinky, které budete rádi vlastnit i bez růstu ceny.',
    ],
    sections: [
      { id: 'investment-reality', title: 'Začněte realistickým pohledem na investici', paragraphs: [
        'Hodinky během vlastnictví nevytvářejí příjem. Finanční zisk vznikne pouze tehdy, prodáte-li je za více než součet nákupní ceny, servisu, pojištění, uložení a prodejních nákladů. Aukční rekordy se týkají výjimečných předmětů a nejsou obvyklým výsledkem běžně vyráběných referencí.',
        'Tržní ceny mohou při omezené nabídce a vysoké poptávce rychle růst, ale se změnou nálady také klesat. Dlouhá doba držení toto riziko neodstraňuje. Hodinky je proto vhodnější chápat jako sběratelské předměty než náhradu diverzifikovaného finančního plánu.',
      ] },
      { id: 'value-drivers', title: 'Co podporuje dlouhodobou hodnotu?', paragraphs: [
        'Poptávka se často soustředí na známé reference, významnou designovou historii, nízkou produkci, ukončené varianty a hodinky se silnou sběratelskou komunitou. I v rámci jednoho modelu způsobují stav, původnost, ciferník, rok výroby a úplnost sady velké cenové rozdíly.',
        'Zásadní je kupní cena. I výborné hodinky mohou finančně zklamat, pokud je pořídíte během spekulativního vrcholu nebo s příliš vysokým příplatkem. Porovnávejte nabídkové ceny s uskutečněnými prodeji a rozlišujte maloobchodní ceny prodejců od částek, za které by hodinky vykoupili.',
      ] },
      { id: 'costs', title: 'Započítejte všechny náklady vlastnictví', paragraphs: [
        'Mechanické hodinky potřebují pravidelnou údržbu a servis složitých strojků může být nákladný. Další výdaje představuje pojištění, bezpečné uložení, doprava a ověřování pravosti. U vintage hodinek se mohou přidat obtížně dostupné součásti a dlouhé opravy.',
        'Také prodej něco stojí. Aukční provize, poplatky platforem, marže obchodníků a případné daňové dopady mohou vytvořit velký rozdíl mezi zveřejněnou tržní cenou a čistým příjmem. Než malý růst ceny označíte za zisk, spočítejte cenu potřebnou k pokrytí všech nákladů.',
      ] },
      { id: 'liquidity', title: 'Rozumějte likviditě a tvorbě ceny', paragraphs: [
        'Dvoje zdánlivě podobné hodinky mohou dosáhnout různé ceny kvůli stavu, regionu, pověsti prodejce a načasování. Cenové indexy slouží jako orientace, ale neumějí zkontrolovat konkrétní kus ani zaručit kupujícího.',
        'Oblíbené modely se za konkurenceschopnou cenu často prodají rychle; neobvyklé nebo velmi drahé reference mohou čekat měsíce. Při potřebě rychlého prodeje bývá nutné přijmout výkupní cenu obchodníka. Tuto slevu za likviditu zahrňte do každého výpočtu.',
      ] },
      { id: 'preowned-advantage', title: 'Kdy může použitý kus vycházet lépe', paragraphs: [
        'Nákup použitých hodinek může obejít část počáteční ztráty hodnoty u modelů obchodovaných pod maloobchodním ceníkem. Otevírá také přístup k ukončeným referencím a viditelné cenové historii. Ani jedno nezaručuje růst, ale usnadňuje posouzení ceny.',
        'Hledejte poctivě popsaný stav a cenu podloženou srovnatelnými nabídkami. Za správné hodinky může být rozumnější připlatit než vybrat nejlevnější kus, který vyžaduje velký servis, obsahuje změněné díly nebo má nejasný původ.',
      ] },
      { id: 'responsible-approach', title: 'Odpovědný přístup ke sběratelství', paragraphs: [
        'Vyberte hodinky, které odpovídají vašemu vkusu, zápěstí a způsobu používání. Prozkoumejte konkrétní referenci, uchovejte příslušenství i servisní historii a provádějte údržbu bez zbytečných kosmetických zásahů. Tím podpoříte radost z vlastnictví i budoucí zájem.',
        'Stanovte rozpočet, který nezávisí na rychlém prodeji, a nefinancujte nákup na základě očekávaného zdražení. Pokud je hlavním cílem výnos, proberte před investicí do sběratelských hodinek s kvalifikovaným poradcem regulované a diverzifikované alternativy.',
      ] },
    ],
    note: 'Článek slouží pouze k obecným informacím a není finančním, daňovým ani investičním poradenstvím. Hodnota hodinek může růst i klesat.',
    faq: [
      { question: 'Které značky hodinek si nejlépe drží hodnotu?', answer: 'Některé reference vyhledávaných výrobců si historicky držely hodnotu dobře. Výsledky se však výrazně liší podle modelu, stavu a nákupní ceny. Samotná značka nestačí.' },
      { question: 'Jsou limitované edice vždy dobrou investicí?', answer: 'Ne. Nízký počet kusů má význam pouze při skutečném sběratelském zájmu. Některé běžně vyráběné hodinky jsou likvidnější a žádanější než silně propagované speciální edice.' },
      { question: 'Jsou nenošené hodinky vždy dražší?', answer: 'Ne vždy. Vedle stavu rozhodují původnost, vzácnost, dokumentace a poptávka. Nesprávné skladování může poškodit i nenošené hodinky a řada kupujících dá přednost správně servisovanému kusu.' },
    ],
  },
};
