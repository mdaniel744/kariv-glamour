import { SOURCES } from '@/lib/watchResearch/sources';

export function SourceLinks({ ids = [], locale }) {
  if (!ids.length) return null;
  return <p className="mt-3 text-sm leading-6 text-muted-foreground">
    {locale === 'cs' ? 'Zdroje: ' : locale === 'de' ? 'Quellen: ' : 'Sources: '}
    {ids.map((id, index) => {
      const source = SOURCES[id];
      return <span key={id}>{index > 0 && '; '}<a className="underline underline-offset-4 hover:text-primary" href={source.url} title={source.title}>{source.publisher}</a></span>;
    })}
  </p>;
}

export default function ResearchSources({ ids, locale }) {
  return <section className="mt-10 border-t border-border pt-7" aria-labelledby="research-sources">
    <h2 id="research-sources" className="text-xl font-semibold">{locale === 'cs' ? 'Zdroje a další čtení' : locale === 'de' ? 'Quellen zum Weiterlesen' : 'References and further reading'}</h2>
    <p className="mt-3 text-base leading-7 text-muted-foreground">{locale === 'cs' ? 'Dokumentace výrobců a nezávislé zdroje k údajům v článku. Technické specifikace platí pro uvedenou referenci, nikoli automaticky pro všechny hodinky stejné kolekce.' : locale === 'de'
      ? 'Herstellerunterlagen und unabhängige Quellen zu den im Artikel besprochenen Angaben. Technische Daten gelten für die genannte Referenz, nicht automatisch für jede Uhr einer Kollektion.'
      : 'Manufacturer documentation and independent sources behind the details discussed above. Technical specifications apply to the named reference, not automatically to every watch in a collection.'}</p>
    <ul className="mt-4 space-y-3 text-sm leading-6">
      {ids.map((id) => <li key={id}><a className="text-primary underline underline-offset-4" href={SOURCES[id].url}>{SOURCES[id].publisher} — {SOURCES[id].title}</a></li>)}
    </ul>
  </section>;
}
