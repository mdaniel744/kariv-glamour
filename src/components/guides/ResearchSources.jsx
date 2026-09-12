import { SOURCES, REVIEW_DATE } from '@/lib/watchResearch/sources';

export function SourceLinks({ ids = [], locale }) {
  if (!ids.length) return null;
  return <p className="mt-3 text-sm leading-6 text-muted-foreground">
    {locale === 'de' ? 'Quellen: ' : 'Sources: '}
    {ids.map((id, index) => {
      const source = SOURCES[id];
      return <span key={id}>{index > 0 && '; '}<a className="underline underline-offset-4 hover:text-primary" href={source.url}>{source.publisher}: {source.title}</a></span>;
    })}
  </p>;
}

export default function ResearchSources({ ids, locale }) {
  return <section className="mt-10 border-t border-border pt-7" aria-labelledby="research-sources">
    <h2 id="research-sources" className="text-xl font-semibold">{locale === 'de' ? 'Quellen und redaktioneller Ansatz' : 'Sources and editorial approach'}</h2>
    <p className="mt-3 text-base leading-7 text-muted-foreground">{locale === 'de'
      ? 'Die historischen und technischen Angaben beruhen auf den unten verlinkten Hersteller-, Prüfstellen- und gegebenenfalls Auktionsquellen. Die Kaufhinweise sind redaktionelle Orientierung, kein Test des angebotenen Einzelexemplars. Spezifikationen gelten nur für die genannte Referenz; ältere Modelle können abweichen.'
      : 'Historical and technical facts are based on the manufacturer, certification-body and, where relevant, auction sources linked below. Buying guidance is editorial analysis, not a hands-on assessment of an individual listing. Specifications apply only to the named reference; earlier models can differ.'}</p>
    <ul className="mt-4 space-y-3 text-sm leading-6">
      {ids.map((id) => <li key={id}><a className="text-primary underline underline-offset-4" href={SOURCES[id].url}>{SOURCES[id].publisher} — {SOURCES[id].title}</a></li>)}
    </ul>
    <p className="mt-4 text-sm text-muted-foreground">{locale === 'de' ? 'Quellen geprüft am ' : 'Sources checked on '}<time dateTime={REVIEW_DATE}>{new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(REVIEW_DATE + 'T12:00:00Z'))}</time>.</p>
  </section>;
}
