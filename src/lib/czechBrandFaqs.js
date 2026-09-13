const a = (path, label) => `<a href='${path}'>${label}</a>`;
const faq = (question, answer) => ({ question, answer });
const buy = (brand, path) => faq(`Kde mohu koupit hodinky ${brand} online?`, `Hodinky ${brand} můžete prohlížet a koupit na Kariv Glamour. Projděte nové i ${a(path, 'použité modely')} s podrobnými údaji, referenčními čísly a hodnocením stavu.`);
const safe = (brand, path) => faq(`Je bezpečné koupit použité hodinky ${brand}?`, `U ${a(path, `použitých hodinek ${brand}`)} uvádíme stav, údaje o krabičce a dokladech a dostupnou servisní historii. Pro způsobilé nákupy platí ${a('/buyer-protection', 'ochrana kupujícího')}. Před objednáním si ověřte podrobnosti konkrétní nabídky; repliky a padělky nenabízíme.`);
const papers = (brand) => faq(`Co znamená „box and papers“ při nákupu ${brand}?`, `${a('/guides/what-box-and-papers-mean-for-luxury-watches', 'Krabička a doklady')} označují původní prezentační krabičku a záruční či certifikační dokumentaci. Mohou podpořit doložení původu a ovlivnit sběratelskou hodnotu. Samy o sobě však neprokazují pravost každé součásti; ověřte přesný rozsah dodávky.`);
const checks = (brand, path, detail = '') => faq(`Co zkontrolovat před nákupem použitých hodinek ${brand}?`, `Ověřte referenci, stav pouzdra a náramku, typ strojku, krabičku a doklady a dostupnou servisní historii. ${detail} Prohlédněte si ${a(path, `použité hodinky ${brand}`)} a před nákupem se zeptejte na nejasnosti.`);
const returns = (brand) => faq(`Mohu vrátit hodinky ${brand} zakoupené online?`, `Způsobilé nákupy lze vrátit podle ${a('/legal/returns-refund-policy', 'podmínek vrácení a refundace')}. Na této stránce najdete platné lhůty, podmínky a postup. Před odesláním cenných hodinek zpět kontaktujte podporu.`);
const sell = (brand) => faq(`Mohu prodat své hodinky ${brand}?`, `Pokud chcete hodinky ${brand} prodat, navštivte ${a('/sell-trade', 'stránku prodeje a výměny')}, kde najdete informace o posouzení a dalším postupu.`);

export const CZECH_BRAND_FAQS = {
  rolex: [
    buy('Rolex', '/rolex-gebraucht-kaufen'), safe('Rolex', '/rolex-gebraucht-kaufen'), papers('Rolex'),
    faq('Které Rolex si vybrat jako první?', `Volba závisí na způsobu nošení, vkusu a rozpočtu. Datejust je všestranná klasika, Submariner výrazná sportovní volba. Podrobné porovnání najdete v ${a('/welche-rolex-kaufen', 'průvodci výběrem Rolex')}.`),
    faq('Jaký je rozdíl mezi Rolex Datejust a Day-Date?', `Datejust zobrazuje datum, Day-Date navíc den v týdnu. Day-Date se tradičně vyrábí z drahých kovů. Porovnejte ${a('/rolex-datejust-kaufen', 'Datejust')} a ${a('/rolex-day-date-kaufen', 'Day-Date')} podle přesné reference, velikosti a materiálu.`),
    faq('Jaký je rozdíl mezi Rolex Submariner a Sea-Dweller?', `Obě rodiny mají profesionální potápěčský původ. Sea-Dweller je zaměřen na větší tlakové zatížení, zatímco Submariner bývá univerzálnější pro každodenní nošení. Porovnejte ${a('/rolex-submariner-kaufen', 'Submariner')} a ${a('/rolex/sea-dweller', 'Sea-Dweller')}; rozhodující jsou údaje konkrétní reference.`),
    faq('Proč se některé modely Rolex obtížně shánějí?', 'U některých referencí se omezená nabídka setkává s vysokou poptávkou. To může zhoršit dostupnost v běžném prodeji. Kariv Glamour ukazuje aktuálně nabízené kusy včetně vyhledávaných použitých referencí.'),
    faq('Prodává Kariv Glamour hodinky Rolex?', 'Ano. Nabídka zahrnuje nové, použité a historické modely podle aktuální dostupnosti. U každých hodinek uvádíme produktové informace, hodnocení stavu a referenční údaje.'),
    returns('Rolex'), checks('Rolex', '/rolex-gebraucht-kaufen', 'Zajímejte se také o odhad roku výroby, pravost a případně vyměněné součásti.'),
  ],
  patekPhilippe: [
    buy('Patek Philippe', '/patek-philippe-gebraucht-kaufen'), safe('Patek Philippe', '/patek-philippe-gebraucht-kaufen'), papers('Patek Philippe'),
    faq('Co je výpis z archivu Patek Philippe?', `Jde o dokument výrobce s historickými údaji konkrétních hodinek, například výrobním datem, referencí a původním provedením. Pomáhá doložit historii, nenahrazuje však současnou prohlídku. Více uvádí ${a('/patek-philippe-archives-extract-guide', 'průvodce archivním výpisem')}.`),
    faq('Které Patek Philippe si vybrat jako první?', `Záleží na způsobu nošení, vkusu a rozpočtu. Calatrava představuje společenskou klasiku, Nautilus sportovně laděný model. Porovnejte rodiny a reference v ${a('/welche-patek-philippe-kaufen', 'průvodci výběrem Patek Philippe')}.`),
    faq('Jaký je rozdíl mezi Nautilus a Aquanaut?', `${a('/patek-philippe-nautilus-kaufen', 'Nautilus')} je známý pouzdrem inspirovaným lodním okénkem a provedeními s integrovaným náramkem. ${a('/patek-philippe-aquanaut-kaufen', 'Aquanaut')} působí současněji a sportovněji, často s kompozitním řemínkem. Obě rodiny obsahují více referencí; náramek a materiál ověřte u nabídky.`),
    faq('Jaký je rozdíl mezi Calatrava a Grand Complications?', `${a('/patek-philippe-calatrava-kaufen', 'Calatrava')} zdůrazňuje eleganci a čisté společenské proporce. ${a('/patek-philippe-grand-complications-kaufen', 'Grand Complications')} nabízí náročné funkce, například věčné kalendáře, minutové repetice a tourbillony. Zvolte funkci, kterou chcete vlastnit a obsluhovat.`),
    faq('Proč se některé Patek Philippe obtížně shánějí?', 'Některé reference mají omezenou nabídku nebo mimořádně vysokou poptávku. Kariv Glamour vybírá dostupné hodinky včetně vyhledávaných kusů na trhu použitých hodinek.'),
    faq('Prodává Kariv Glamour hodinky Patek Philippe?', 'Ano. Podle dostupnosti nabízíme nové, použité i historické modely s jasnými údaji, stavem a referencí. Kariv Glamour je nezávislý prodejce, nikoli oficiální autorizovaný dealer Patek Philippe.'),
    checks('Patek Philippe', '/patek-philippe-gebraucht-kaufen', 'Ověřte také rok výroby, případný archivní výpis a správnou délku náramku nebo řemínku.'),
    faq('Jsou Patek Philippe zajímavé pro sběratele?', `Značka je ceněna pro řemeslo, historii a vzácné reference. Sběratelskou hodnotu ovlivňují komplikace, materiál, dokumentace a konkrétní stav, nikoli jen jméno. Podrobnosti najdete v ${a('/welche-patek-philippe-kaufen', 'průvodci výběrem')}; budoucí výnos není zaručen.`),
    returns('Patek Philippe'),
  ],
  omega: [
    buy('Omega', '/omega-gebraucht-kaufen'), safe('Omega', '/omega-gebraucht-kaufen'), papers('Omega'),
    faq('Kterou Omegu si vybrat jako první?', `Záleží na vašem životním stylu, vkusu a rozpočtu. Seamaster je sportovní výchozí volbou, De Ville nabízí společenskou eleganci. Porovnejte kolekce v ${a('/welche-omega-kaufen', 'průvodci výběrem Omega')}.`),
    faq('Jaký je rozdíl mezi Omega Speedmaster a Seamaster?', `${a('/omega-speedmaster-kaufen', 'Speedmaster')} je chronografická rodina spojená se závoděním a kosmickým výzkumem. ${a('/omega-seamaster-kaufen', 'Seamaster')} zahrnuje více vodou inspirovaných i každodenních modelů. Konkrétní rozdíly popisuje ${a('/omega-speedmaster-oder-seamaster', 'porovnání Speedmaster a Seamaster')}.`),
    faq('Jaký je rozdíl mezi Seamaster Diver 300M a Planet Ocean?', `${a('/omega-seamaster-diver-300m-kaufen', 'Diver 300M')} je známý charakteristickým designem a jmenovitou vodotěsností 300 metrů. ${a('/omega-seamaster-planet-ocean-kaufen', 'Planet Ocean')} má techničtější potápěčské zaměření. Rozměry, hloubkové limity i vhodnost konkrétního použitého kusu ověřujte podle reference a aktuálního stavu.`),
    faq('Co je Omega Moonwatch?', `${a('/omega-moonwatch-kaufen', 'Moonwatch')} označuje Speedmaster Professional známý spojením s lunárními misemi NASA. Patří mezi nejznámější chronografy. Projděte reference v nabídce a rozlišujte generace strojků i materiál sklíčka.`),
    faq('Co znamená Omega Master Chronometer?', `Jde o hodinky, které prošly souborem zkoušek přesnosti, odolnosti proti magnetismu a dalších vlastností v rámci certifikace METAS. Podrobnosti vysvětluje ${a('/omega-master-chronometer-guide', 'průvodce Master Chronometer')}. Certifikaci vždy ověřte pro konkrétní model.`),
    faq('Co je strojek Co-Axial?', `Co-Axial označuje konstrukci krokového ústrojí, kterou Omega využívá pro odlišný přenos energie a omezení tření. Není to příslib bezúdržbovosti. Více vysvětluje ${a('/omega-co-axial-guide', 'průvodce Co-Axial')}.`),
    faq('Hodí se Omega pro každodenní nošení?', `Mnoho referencí ${a('/omega-seamaster-kaufen', 'Seamaster')} a ${a('/omega-speedmaster-kaufen', 'Speedmaster')} spojuje odolnou konstrukci s univerzálním stylem. Vhodnost závisí na konkrétní referenci, pohodlí a aktuálním stavu hodinek.`),
    checks('Omega', '/omega-gebraucht-kaufen', 'Rozlišujte přesnou referenci, výrobní období a doložené údaje o pravosti.'), returns('Omega'),
  ],
  cartier: [
    buy('Cartier', '/cartier-gebraucht-kaufen'), safe('Cartier', '/cartier-gebraucht-kaufen'),
    faq('Které hodinky Cartier patří k nejikoničtějším?', `${a('/cartier-tank-kaufen', 'Cartier Tank')} a ${a('/cartier-santos-kaufen', 'Santos de Cartier')} patří k nejznámějším designům díky výrazným tvarům a nadčasovým proporcím.`),
    faq('Jaký je rozdíl mezi Cartier Tank a Santos?', `${a('/cartier-tank-kaufen', 'Tank')} má obdélníkové pouzdro se střídmými proporcemi. ${a('/cartier-santos-kaufen', 'Santos de Cartier')} využívá čtvercovou geometrii a viditelné šrouby pro výraznější architektonický charakter.`),
    faq('Nabízí Cartier vhodné hodinky pro ženy?', `${a('/cartier-damen', 'Dámská nabídka Cartier')} zahrnuje Panthère, Baignoire, Tank a Ballon Bleu se šperkovou elegancí a různými proporcemi. Rozhodující je velikost a osobní preference.`),
    faq('Nabízí Cartier vhodné hodinky pro muže?', `${a('/cartier-herren', 'Pánské hodinky Cartier')} zahrnují Santos, Tank, Pasha a Ballon Bleu. Spojují výrazné tvary s elegantními proporcemi; vybírejte podle konkrétní velikosti a strojku.`),
    papers('Cartier'), checks('Cartier', '/cartier-gebraucht-kaufen'), returns('Cartier'),
  ],
  hublot: [
    buy('Hublot', '/hublot-gebraucht'), safe('Hublot', '/hublot-gebraucht'),
    faq('Které kolekce Hublot jsou nejznámější?', `Mezi hlavní kolekce patří ${a('/hublot/big-bang', 'Big Bang')}, ${a('/hublot/big-bang-unico', 'Big Bang Unico')} a ${a('/hublot/classic-fusion', 'Classic Fusion')}.`),
    faq('Jaký je rozdíl mezi Big Bang a Classic Fusion?', `${a('/hublot/big-bang', 'Big Bang')} je výraznější a sportovnější, se silnou přítomností na zápěstí. ${a('/hublot/classic-fusion', 'Classic Fusion')} nabízí čistší a střídmější design.`),
    faq('Co je Hublot Big Bang Unico?', `${a('/hublot/big-bang-unico', 'Big Bang Unico')} je technická řada s otevřeným chronografickým designem a vlastním strojkem Unico značky Hublot.`),
    faq('Hodí se Hublot pro každodenní nošení?', `Mnoho modelů využívá moderní materiály včetně keramiky a titanu pro běžné nošení. U ${a('/hublot-gebraucht', 'použitého Hublotu')} pečlivě ověřte stav materiálu, řemínku a spony.`),
    checks('Hublot', '/hublot-gebraucht'), papers('Hublot'),
  ],
  breitling: [
    buy('Breitling', '/breitling-uhr-gebraucht'), safe('Breitling', '/breitling-uhr-gebraucht'),
    faq('Které kolekce Breitling jsou nejznámější?', `Mezi hlavní rodiny patří ${a('/breitling/navitimer', 'Navitimer')}, ${a('/breitling/chronomat', 'Chronomat')}, ${a('/breitling/superocean', 'Superocean')} a ${a('/breitling/avenger', 'Avenger')}.`),
    faq('Jaký je rozdíl mezi Navitimer a Chronomat?', `${a('/breitling/navitimer', 'Navitimer')} je známý leteckým chronografem a kruhovým logaritmickým pravítkem. ${a('/breitling/chronomat', 'Chronomat')} zdůrazňuje sportovní univerzálnost a výrazné úchyty na lunetě. Funkce se liší podle reference.`),
    faq('Co je kolekce Breitling Professional?', `${a('/breitling/professional', 'Professional')} zahrnuje přístrojově zaměřené hodinky jako Aerospace, Emergency, Exospace B55 a Endurance Pro pro specifické profesionální využití.`),
    faq('Mají hodinky Breitling certifikaci COSC?', 'Mnoho strojků Breitling je certifikováno COSC jako chronometry splňující stanovené požadavky na přesnost. Certifikaci ověřte u konkrétního produktu.'),
    checks('Breitling', '/breitling-uhr-gebraucht', 'Ověřte také případnou certifikaci COSC.'), sell('Breitling'),
  ],
  audemarsPiguet: [
    buy('Audemars Piguet', '/audemars-piguet-gebraucht'), safe('Audemars Piguet', '/audemars-piguet-gebraucht'),
    faq('Které jsou hlavní kolekce Audemars Piguet?', `Patří mezi ně ${a('/audemars-piguet/royal-oak', 'Royal Oak')}, ${a('/audemars-piguet/royal-oak-offshore', 'Royal Oak Offshore')}, ${a('/audemars-piguet/royal-oak-concept', 'Royal Oak Concept')} a ${a('/audemars-piguet/code-1159', 'Code 11.59')}.`),
    faq('Jaký je rozdíl mezi Royal Oak a Royal Oak Offshore?', `${a('/audemars-piguet/royal-oak', 'Royal Oak')} vznikl v roce 1972 jako sportovní hodinky s integrovaným náramkem. ${a('/audemars-piguet/royal-oak-offshore', 'Offshore')} byl uveden v roce 1993 jako větší a výrazněji sportovní interpretace.`),
    faq('Co je kolekce Code 11.59?', `${a('/audemars-piguet/code-1159', 'Code 11.59')} byla představena v roce 2019. Nabízí moderní architekturu kulatého pouzdra, komplikace a společenský charakter vedle rodin Royal Oak.`),
    faq('Co je Royal Oak Concept?', `${a('/audemars-piguet/royal-oak-concept', 'Royal Oak Concept')} je technicky a futuristicky zaměřená řada s náročnými komplikacemi, například tourbillonem či GMT, a avantgardními materiály a pouzdry.`),
    faq('Kolik stojí hodinky Audemars Piguet?', `Cena se výrazně liší podle kolekce, materiálu, komplikací a reference. Souvislosti vysvětluje ${a('/audemars-piguet-uhr-preis', 'průvodce cenami AP')}.`), sell('Audemars Piguet'),
  ],
  grandSeiko: [
    buy('Grand Seiko', '/grand-seiko-gebraucht'),
    faq('Co je Grand Seiko Spring Drive?', `Spring Drive kombinuje energii hnacího pera s přesností elektronické regulace a plynulým pohybem sekundové ručky. Přesnost závisí na kalibru. Více v ${a('/grand-seiko-spring-drive-guide', 'průvodci Spring Drive')}.`),
    faq('Co je Grand Seiko Snowflake?', `${a('/grand-seiko-snowflake', 'Snowflake SBGA211')} patří do Heritage a používá Spring Drive 9R65 s rezervou chodu 72 hodin. Strukturovaný bílý číselník je inspirován sněhovými pláněmi oblasti Šinšú.`),
    faq('Co je Grand Seiko Shunbun?', `${a('/grand-seiko-shunbun', 'Shunbun SBGA413')} má pouzdro inspirované 62GS a číselník zachycující krátkou jarní scenérii. Pohání jej Spring Drive 9R65 s přibližně 72hodinovou rezervou chodu.`),
    safe('Grand Seiko', '/grand-seiko-gebraucht'),
    faq('Jaký je rozdíl mezi Grand Seiko Heritage a Elegance?', `${a('/grand-seiko/heritage', 'Heritage')} zdůrazňuje vyvážený design a základní hodinářské hodnoty. ${a('/grand-seiko/elegance', 'Elegance')} se soustředí na společenské hodinky s jemnějšími proporcemi a formálním charakterem.`),
    faq('Hodí se Grand Seiko GMT na cesty?', `${a('/grand-seiko-gmt', 'Grand Seiko GMT')} nabízí zobrazení dvou časových pásem v provedeních Spring Drive i s mechanickými strojky. Ověřte způsob nastavování a čitelnost konkrétní reference.`),
    checks('Grand Seiko', '/grand-seiko-gebraucht', 'Prohlédněte leštěné plochy Zaratsu a rozlišujte Spring Drive, Hi-Beat a quartz.'),
  ],
  iwc: [
    buy('IWC Schaffhausen', '/iwc-schaffhausen-gebraucht'),
    faq('Které jsou hlavní kolekce IWC?', `Patří mezi ně ${a('/iwc-schaffhausen/pilots-watches', 'Pilot’s Watches')}, ${a('/iwc-schaffhausen/portugieser', 'Portugieser')}, ${a('/iwc-schaffhausen/portofino', 'Portofino')}, ${a('/iwc-schaffhausen/ingenieur', 'Ingenieur')} a ${a('/iwc-schaffhausen/aquatimer', 'Aquatimer')}.`),
    faq('Jaký je rozdíl mezi IWC Portugieser a Portofino?', `${a('/iwc-schaffhausen/portugieser', 'Portugieser')} nabízí elegantní proporce, chronografy a složité komplikace. ${a('/iwc-schaffhausen/portofino', 'Portofino')} zdůrazňuje jednoduchost, štíhlou eleganci a univerzální společenský charakter.`),
    faq('Co je IWC Ingenieur?', `${a('/iwc-schaffhausen/ingenieur', 'Ingenieur')} je sportovně zaměřená rodina s technickým charakterem a známými variantami s integrovaným náramkem. Přesnou konstrukci a strojek určuje reference.`),
    faq('Hodí se automatické IWC pro každodenní nošení?', `${a('/iwc-schaffhausen-automatic', 'Automatické IWC')} mohou nabídnout spolehlivé každodenní nošení. Kalibr, rezerva chodu a její případný ukazatel se liší podle modelu; ověřte konkrétní referenci a aktuální stav.`),
    safe('IWC Schaffhausen', '/iwc-schaffhausen-gebraucht'), checks('IWC', '/iwc-schaffhausen-gebraucht'), papers('IWC'),
  ],
  jaegerLeCoultre: [
    buy('Jaeger-LeCoultre', '/gebrauchte-jaeger-lecoultre'),
    faq('Které hodinky Jaeger-LeCoultre jsou nejikoničtější?', `${a('/jaeger-lecoultre/reverso', 'Reverso')} je nejznámější design značky: otočné obdélníkové pouzdro, charakter art deco a spojení elegance se sportovním původem.`),
    faq('Co je Jaeger-LeCoultre Reverso?', `${a('/jaeger-lecoultre/reverso', 'Reverso')} má obdélníkové pouzdro, které se otáčí a ukáže druhou stranu. Vzniklo v roce 1931 pro hráče póla a stalo se symbolem designu art deco.`),
    faq('Jaký je rozdíl mezi Reverso Monoface a Duoface?', `Monoface má jeden číselník. ${a('/jaeger-lecoultre/reverso-duoface', 'Duoface')} má číselníky na opačných stranách otočného pouzdra, které mohou zobrazovat dvě časová pásma.`),
    faq('Jaký je rozdíl mezi Master Ultra Thin a Master Control?', `${a('/jaeger-lecoultre/master-ultra-thin', 'Master Ultra Thin')} zdůrazňuje štíhlé proporce, čistý design a tenké strojky. ${a('/jaeger-lecoultre/master-control', 'Master Control')} nabízí klasická kulatá pouzdra, chronografy a kalendářní funkce.`),
    safe('Jaeger-LeCoultre', '/gebrauchte-jaeger-lecoultre'), checks('Jaeger-LeCoultre', '/gebrauchte-jaeger-lecoultre'),
    faq('Co jsou hodiny Jaeger-LeCoultre Atmos?', `${a('/jaeger-lecoultre/atmos', 'Atmos')} jsou luxusní stolní hodiny využívající změny okolní teploty k doplňování energie. Nejde o náramkové hodinky ani doslovné perpetuum mobile.`),
  ],
  tagHeuer: [
    buy('TAG Heuer', '/tag-heuer-gebraucht'),
    faq('Které jsou hlavní kolekce TAG Heuer?', `Najdete zde závodní ${a('/tag-heuer/carrera', 'Carrera')}, potápěčsky zaměřený ${a('/tag-heuer/aquaracer', 'Aquaracer')}, sportovní ${a('/tag-heuer/formula-1', 'Formula 1')}, čtvercové ${a('/tag-heuer/monaco', 'Monaco')}, chytré ${a('/tag-heuer/connected', 'Connected')} a ${a('/tag-heuer/link', 'Link')} s integrovaným náramkem.`),
    faq('Jaký je rozdíl mezi Carrera a Formula 1?', `Carrera je spojena se závodními chronografy, Formula 1 se sportovním charakterem a různými quartzovými i mechanickými možnostmi. Obě rodiny mají více generací; strojek určujte referencí. Podrobnosti v ${a('/tag-heuer-carrera-vs-formula-1', 'porovnání Carrera a Formula 1')}.`),
    faq('Je TAG Heuer Aquaracer vhodný pro potápění?', `Rodina ${a('/tag-heuer/aquaracer', 'Aquaracer')} zahrnuje potápěčské modely. ${a('/tag-heuer-aquaracer-300m', 'Aquaracer 300M')} má u příslušných referencí jmenovitou vodotěsnost 300 metrů. Pro použití ve vodě ověřte konkrétní návod a aktuální těsnost použitého kusu.`),
    faq('Co je TAG Heuer Monaco?', `${a('/tag-heuer/monaco', 'Monaco')} je známý chronograf se čtvercovým pouzdrem a vazbou na motorsport. Historické Monaco patřilo k raným automatickým chronografům.`),
    faq('Co je TAG Heuer Connected Calibre E5?', `${a('/tag-heuer/connected-calibre-e5', 'Connected Calibre E5')} nabízí sportovní, golfové, běžecké a další digitální funkce v pouzdrech 40 a 45 mm. Ověřte kompatibilitu telefonu a konkrétní materiál. Více v ${a('/tag-heuer-connected-calibre-e5-guide', 'průvodci E5')}.`),
    faq('Nabízí TAG Heuer hodinky pro muže?', `${a('/tag-heuer-uhr-herren', 'Pánská nabídka TAG Heuer')} zahrnuje závodní chronografy Carrera, potápěčsky zaměřené Aquaracer i sportovní Formula 1. Vybírejte podle rozměrů a konkrétního použití.`),
    checks('TAG Heuer', '/tag-heuer-gebraucht', 'Rozlišujte automatický, quartzový a digitální systém Connected.'),
  ],
  tudor: [
    buy('Tudor', '/tudor-gebraucht'),
    faq('Která rodina Tudor patří k nejvyhledávanějším?', `${a('/tudor/black-bay', 'Black Bay')} patří k nejznámějším rodinám. Je spojena s historicky inspirovaným vzhledem a charakteristickými ručkami Snowflake.`),
    faq('Co je Tudor Black Bay?', `${a('/tudor/black-bay', 'Black Bay')} je rodina s potápěčským původem a různými funkcemi. Patří sem ${a('/tudor/black-bay-58', 'Black Bay 58')}, ${a('/tudor/black-bay-54', '54')}, ${a('/tudor/black-bay-gmt', 'GMT')} a ${a('/tudor/black-bay-chrono', 'Chrono')}. Rozměry, strojek a vodotěsnost ověřujte podle reference.`),
    faq('Jaký je rozdíl mezi Black Bay a Pelagos?', `Black Bay zdůrazňuje historické tvary, Pelagos techničtější potápěčské použití. Materiál a vodotěsnost se mezi referencemi liší; pro celou rodinu neplatí jeden hloubkový limit. Více v ${a('/tudor-black-bay-vs-pelagos', 'porovnání Black Bay a Pelagos')}.`),
    faq('Hodí se Tudor Royal pro každodenní nošení?', `${a('/tudor/tudor-royal', 'Royal')} spojuje integrovaný náramek s elegantním sportovním stylem a různými velikostmi. Některé reference mají zobrazení dne a data; výbavu ověřte u konkrétního kusu.`),
    faq('Vyrábí Tudor hodinky pro ženy?', `${a('/tudor-uhr-damen', 'Dámská nabídka')} zahrnuje ${a('/tudor/clair-de-rose', 'Clair de Rose')}, klasickou ${a('/tudor/1926', '1926')} a menší provedení ${a('/tudor/tudor-royal', 'Royal')}.`),
    safe('Tudor', '/tudor-gebraucht'), checks('Tudor', '/tudor-gebraucht'),
  ],
  panerai: [
    buy('Panerai', '/panerai-gebraucht'),
    faq('Které Panerai patří k nejznámějším?', `${a('/panerai/luminor-marina', 'Luminor Marina')} vyjadřuje charakteristický design značky ochranným můstkem korunky, svítícím číselníkem a malým sekundovým ukazatelem.`),
    faq('Jaký je rozdíl mezi Luminor a Radiomir?', `Luminor je známý polštářovým pouzdrem a můstkem korunky, Radiomir odlišnou korunkou bez tohoto můstku. Konstrukce nožek se liší mezi generacemi. Více v ${a('/panerai-luminor-vs-radiomir', 'porovnání Luminor a Radiomir')}.`),
    faq('Co je Panerai Luminor Marina?', `${a('/panerai/luminor-marina', 'Luminor Marina')} je podrodina Luminoru s malou sekundovou ručkou na pozici deváté hodiny. Spojuje můstek korunky a charakteristický svítící číselník.`),
    faq('Je Panerai Submersible potápěčský model?', `${a('/panerai/submersible', 'Submersible')} je potápěčsky zaměřená rodina s otočnou lunetou a různými materiály, například Carbotech nebo bronzem. Konkrétní vodotěsnost ověřte podle reference. Podrobnosti v ${a('/panerai-luminor-vs-submersible', 'porovnání Luminor a Submersible')}.`),
    faq('Jsou Panerai převážně pánské hodinky?', 'Panerai je známé velkými pouzdry a výrazným usazením na zápěstí, tradičně spojovaným s pánskými hodinkami. Luminor Due přidává štíhlejší proporce a univerzálnější velikosti. Rozhodující je, co vám sedí.'),
    safe('Panerai', '/panerai-gebraucht'), checks('Panerai', '/panerai-gebraucht', 'Ověřte referenci PAM a ruční nebo automatický nátah.'),
  ],
  bvlgari: [
    buy('Bvlgari', '/bvlgari-gebraucht'),
    faq('Které Bvlgari patří k nejikoničtějším?', `${a('/bvlgari/serpenti', 'Serpenti')} propojuje hadí motiv a římské šperkařské dědictví se švýcarským hodinářstvím. Mezi známá provedení patří Tubogas.`),
    faq('Co jsou hodinky Bvlgari Serpenti?', `${a('/bvlgari/serpenti', 'Serpenti')} je šperková rodina s hadím motivem a variantami Tubogas, Seduttori či Misteriosi. Více v ${a('/bvlgari-serpenti-watch', 'průvodci Serpenti')}.`),
    faq('Jsou Serpenti určeny hlavně ženám?', `Serpenti patří k nejznámějším modelům v ${a('/bvlgari-uhr-damen', 'dámské nabídce Bvlgari')}. Hadí motiv a šperková estetika tradičně oslovují především ženy; při výběru je důležitá skutečná velikost a osobní vkus.`),
    faq('Jaký je rozdíl mezi Serpenti a Lvcea?', `${a('/bvlgari/serpenti', 'Serpenti')} staví na hadím motivu a podle varianty ovinutém náramku. ${a('/bvlgari/lvcea', 'Lvcea')} nabízí klasičtější elegantní design a odlišné proporce.`),
    faq('Co je Bvlgari Octo Finissimo?', `${a('/bvlgari/octo-finissimo', 'Octo Finissimo')} je rodina známá ultratenkou mechanickou architekturou a hranatým geometrickým designem s římskou inspirací. Rozměry se liší podle reference.`),
    faq('Vyrábí Bvlgari hodinky pro muže?', `Mezi výrazné kolekce v ${a('/bvlgari-uhr-herren', 'pánské nabídce')} patří ${a('/bvlgari/octo-finissimo', 'Octo Finissimo')}, ${a('/bvlgari/octo-roma', 'Octo Roma')} a ${a('/bvlgari/aluminium', 'Aluminium')}. Strojek a provedení pásku ověřujte pro konkrétní model.`),
    checks('Bvlgari', '/bvlgari-gebraucht', 'U šperkových modelů ověřte také stav náramku a zasazení kamenů.'),
  ],
  girardPerregaux: [
    buy('Girard-Perregaux', '/girard-perregaux-gebraucht'),
    faq('Které Girard-Perregaux patří k nejznámějším?', `${a('/girard-perregaux/laureato', 'Laureato')} je sportovně elegantní rodina s osmihrannou lunetou a integrovaným náramkem.`),
    faq('Co je Girard-Perregaux Laureato?', 'Laureato spojuje osmihrannou lunetu, integrovaný náramek a u známých variant číselník Clous de Paris. Historii a výběr vysvětluje ' + a('/girard-perregaux-laureato-guide', 'průvodce Laureato') + '.'),
    faq('Jaký je rozdíl mezi Laureato a 1966?', `${a('/girard-perregaux/laureato', 'Laureato')} nabízí sportovně elegantní design s integrovaným náramkem. ${a('/girard-perregaux/1966', '1966')} se soustředí na společenskou eleganci a kulatá pouzdra.`),
    faq('Co je Girard-Perregaux Vintage 1945?', `${a('/girard-perregaux/vintage-1945', 'Vintage 1945')} je rodina inspirovaná art deco s obdélníkovým pouzdrem a zakřivenými proporcemi. Název označuje kolekci, nikoli rok výroby konkrétního kusu.`),
    faq('Co je Girard-Perregaux Jackpot?', `${a('/girard-perregaux-jackpot', 'Jackpot')} je vzácný model spojený s Vintage 1945 Jackpot Tourbillon. Kombinuje tourbillon s miniaturní herní indikací a zvukovým mechanismem; nejde o peněžní výherní zařízení.`),
    safe('Girard-Perregaux', '/girard-perregaux-gebraucht'),
    checks('Girard-Perregaux', '/girard-perregaux-alte-modelle', 'U starších modelů zvažte také dostupnost servisu a součástí.'),
  ],
};

function segments(html) {
  const result = [];
  let cursor = 0;
  for (const match of html.matchAll(/<a href='([^']+)'>([^<]+)<\/a>/g)) {
    if (match.index > cursor) result.push({ text_cs: html.slice(cursor, match.index) });
    result.push({ text_cs: match[2], link: match[1] });
    cursor = match.index + match[0].length;
  }
  if (cursor < html.length) result.push({ text_cs: html.slice(cursor) });
  return result;
}

export function applyCzechBrandFaqs(records, brandKey) {
  const translated = CZECH_BRAND_FAQS[brandKey];
  records.forEach((record, index) => {
    const copy = translated[index];
    if (!copy) return;
    if ('question_en' in record) {
      record.question_cs = copy.question;
      record.answer_cs = Array.isArray(record.answer) ? segments(copy.answer) : copy.answer.replace(/<[^>]+>/g, '');
    } else {
      record.q_cs = copy.question;
      record.a_cs = copy.answer;
    }
  });
}
