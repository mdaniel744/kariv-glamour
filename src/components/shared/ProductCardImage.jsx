import MediaImage from '@/components/shared/MediaImage';
import { getMediaVariant } from '@/lib/media';

export default function ProductCardImage({ src, alt, className = 'object-cover transition-transform duration-700 group-hover:scale-105' }) {
  return (
    <MediaImage
      src={getMediaVariant(src, 'card')}
      alt={alt}
      fill
      sizes="(max-width: 639px) calc(50vw - 1.5rem), (max-width: 1023px) calc(33vw - 2rem), (max-width: 1439px) calc(25vw - 2.25rem), 280px"
      quality={82}
      className={className}
    />
  );
}
