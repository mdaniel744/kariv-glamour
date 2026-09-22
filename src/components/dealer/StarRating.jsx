import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating = 0, size = 14, interactive = false, onChange = null }) {
  const [hover, setHover] = useState(0);
  const display = hover || rating;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onChange?.(star)}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
          aria-label={interactive ? `${star} ${star === 1 ? 'star' : 'stars'}` : undefined}
          aria-hidden={interactive ? undefined : true}
        >
          <Star
            size={size}
            className={star <= display ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}
          />
        </button>
      ))}
    </div>
  );
}
