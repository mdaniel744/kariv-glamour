'use client';
import { useId } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { marketplaceCopy } from '@/lib/marketplaceCopy';
export default function StarRating({ rating = 0, size = 14, interactive = false, onChange = undefined }) {
  const id = useId();
  const { locale } = useLanguage();
  const t = marketplaceCopy(locale);
  const stars = [1, 2, 3, 4, 5];
  if (!interactive) return <span className="inline-flex gap-0.5" role="img" aria-label={rating + ' / 5 ' + t.star}>
    {stars.map(star => <Star key={star} aria-hidden="true" size={size} className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40'} />)}
  </span>;
  return <fieldset className="inline-flex gap-2"><legend className="sr-only">{t.stars}</legend>
    {stars.map(star => <label key={star} className="cursor-pointer rounded p-1 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary">
      <input className="sr-only" type="radio" name={id} value={star} checked={Number(rating) === star} onChange={() => onChange?.(star)} />
      <span className="sr-only">{star} {t.star}</span>
      <Star aria-hidden="true" size={size} className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40'} />
    </label>)}
  </fieldset>;
}
