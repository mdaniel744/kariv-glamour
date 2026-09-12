import MediaImage from '@/components/shared/MediaImage';

export default function GuideFigure({ media, priority = false, className = '' }) {
  if (!media) return null;
  return <figure className={`min-w-0 ${className}`}>
    <div className={`relative overflow-hidden rounded-2xl bg-secondary ${media.contain ? 'aspect-[4/3]' : 'aspect-[4/3] sm:aspect-[3/2]'}`}>
      <MediaImage src={media.src} alt={media.alt} fill priority={priority}
        sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 90vw, 720px"
        quality={80} className={media.contain ? 'object-contain p-6 sm:p-8' : 'object-cover'} />
    </div>
    <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">
      {media.alt}
    </figcaption>
  </figure>;
}
