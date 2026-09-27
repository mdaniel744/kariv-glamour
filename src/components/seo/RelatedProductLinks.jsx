import Link from 'next/link';

const HEADINGS = {
  en: 'Watches in this collection',
  de: 'Uhren in dieser Kollektion',
  cs: 'Hodinky v této kolekci',
};

export default function RelatedProductLinks({ locale, products }) {
  if (!products?.length) return null;
  return (
    <nav aria-label={HEADINGS[locale]} className="mx-auto max-w-6xl px-5 pb-8 sm:px-7">
      <h2 className="mb-3 text-sm font-semibold text-foreground">{HEADINGS[locale]}</h2>
      <ul className="flex flex-wrap gap-2">
        {products.map((product) => (
          <li key={product.slug}>
            <Link
              href={`/${locale}/product/${product.slug}`}
              className="inline-flex rounded-full border border-border px-3 py-2 text-sm text-primary hover:border-primary"
            >
              {product.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
