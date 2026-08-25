import Image from 'next/image';
import { canOptimizeMedia } from '@/lib/media';

export default function MediaImage({
  src,
  alt = '',
  fill = false,
  width = undefined,
  height = undefined,
  sizes = undefined,
  quality = 82,
  priority = false,
  loading = undefined,
  className = '',
  style = undefined,
  unoptimized = false,
  ...props
}) {
  if (!src) return null;

  if (canOptimizeMedia(src)) {
    const loadingProps = priority ? {} : { loading: loading || 'lazy' };
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        quality={quality}
        priority={priority}
        unoptimized={unoptimized}
        className={className}
        style={style}
        {...loadingProps}
        {...props}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? 'eager' : (loading || 'lazy')}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      style={fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%', ...style } : style}
      {...props}
    />
  );
}
