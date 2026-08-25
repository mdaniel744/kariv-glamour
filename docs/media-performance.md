# Media and mobile performance

## Scope and architecture

Kariv Glamour uses Next.js 15 App Router, React 18, Supabase Storage, and a JavaScript/JSDoc codebase. Product rows store plain public image URLs (`featuredImage` and `productImages`) rather than structured media records. The current shared Supabase schema was not changed by this optimization.

The performance pass covers the home page, shop, brand pages, collection/SEO listings, dealer profile, product detail gallery, seller/admin uploads, fonts, caching, static media, and mobile catalogue layout. No video or 360-degree viewer exists in the current repository, so no video/360 behavior was altered.

## Baseline findings

- Public media contained 212 files and 60 MB. PNGs accounted for 36.2 MB.
- The largest single asset was a 7.3 MB transparent Hublot hero PNG.
- Four Kariv logo files totalled 6.8 MB and were loaded in the site header.
- Product cards requested original product URLs.
- The product carousel mounted every full-size gallery image and every thumbnail immediately.
- There was no `next/image` configuration, no responsive `sizes`, no image-origin policy, and no modern-format negotiation.
- Seller uploads trusted the browser MIME value and stored one unchanged public original. There were no size-specific derivatives, dimension checks, orientation correction, metadata removal, or immutable caching.
- Google Fonts were loaded through a render-blocking stylesheet import.

Full inventories are retained in `docs/media-inventory-before.*` and `docs/media-inventory-after.*`.

## Delivery design

`src/components/shared/MediaImage.jsx` is the common delivery boundary. It uses `next/image` for local assets and explicitly approved origins, while unknown remote origins fall back to a lazy, asynchronously decoded `<img>` so an unapproved legacy seller URL cannot break rendering.

Approved remote origins are intentionally narrow:

- `media.base44.com`
- `images.unsplash.com`
- public object paths on `*.supabase.co`

Next.js negotiates AVIF and WebP and now has mobile-first device widths from 320 to 1920 pixels. Context-specific `sizes` and quality values are set at the component that understands the layout:

| Surface | Source | Typical quality | Loading |
|---|---|---:|---|
| Product thumbnail | `thumb.webp` | 76 | lazy |
| Product/listing card | `card.webp` | 82 | lazy |
| Product display gallery | `display.webp` | 84–88 | first image priority; next image prepared |
| Zoom/lightbox | `zoom.webp` or legacy original | source quality | rendered only when opened |
| Home primary watch | responsive local source | 88 | the only priority home image |
| Brand primary watch | responsive local source | 88 | priority |

Product listing cards on the shop, brand grids, collection pages, and SEO landing pages now share the derivative-aware card path. Aspect-ratio containers remain in place to reserve layout space and control CLS.

## Product gallery behavior

The product gallery remains swipeable through the existing Embla carousel. It now:

1. Loads the first display image and conservatively prepares the next image.
2. Adds later display images as the buyer navigates instead of mounting every original at first paint.
3. Uses 320-pixel thumbnail derivatives in the thumbnail rail.
4. Opens a keyboard-accessible full-screen inspection view only on demand.
5. Loads the 2400-pixel zoom derivative (or a legacy original when no derivative family exists) only after the inspection view opens.
6. Supports Escape, left/right arrow keys, visible controls, image counters, and descriptive alt text.

This keeps browsing light while preserving high-detail inspection for dials, bezels, clasps, case backs, serial/reference areas, and condition marks.

## Seller upload pipeline

New image uploads are processed server-side with Sharp before entering the public catalogue path.

Validation and safety:

- Maximum image upload: 20 MB.
- Maximum decoded size: 60 megapixels.
- Product photos must be at least 400 × 400 pixels.
- Accepted image signatures: JPEG, PNG, WebP, GIF, and AVIF/HEIF.
- The decoded signature must match the declared MIME type.
- Animated catalogue images are rejected.
- PDFs are accepted only for payment proof, are limited to 10 MB, and must have a valid PDF signature.
- SVG uploads are not accepted, avoiding scriptable SVG risk.

Processing:

- EXIF orientation is applied automatically.
- Images are converted to sRGB.
- Metadata, including location metadata, is removed by default.
- Transparent inputs retain alpha in WebP output.
- No derivative is enlarged beyond the uploaded source.

Generated immutable derivative family:

| Name | Maximum box | WebP quality | Use |
|---|---:|---:|---|
| `thumb.webp` | 320 × 320 | 76 | uploader previews and thumbnail rails |
| `card.webp` | 700 × 900 | 82 | catalogue cards |
| `display.webp` | 1400 × 1800 | 88 | product page |
| `zoom.webp` | 2400 × 3000 | 92 | buyer inspection |
| `master.webp` | 4096 × 4096 | 96 | sanitized archival master |

Files use a UUID path (`user/media/id/variant.webp`) and one-year immutable storage cache metadata. The canonical database URL remains the display URL; other variants are resolved by deterministic filename replacement, avoiding a shared-schema migration.

The existing bucket is public. For privacy, the raw upload is not retained there; a high-quality, metadata-stripped master is kept instead. If legal/dispute policy requires byte-for-byte originals, create a separate private archive bucket with a written retention period and restricted admin access before enabling raw retention. Existing legacy seller photos were not deleted or rewritten.

## Static asset optimization

Seventeen confirmed, referenced static sources were resized and converted to WebP, their code references were updated, and the superseded originals were removed from the deployable public folder. They remain recoverable from Git.

- Selected assets: 29.81 MB → 3.95 MB (86.8% reduction).
- Entire public media directory: 60.00 MB → 34.14 MB (43.1% reduction).
- Files above the 2.5 MB per-asset budget: 0.
- Exact duplicate groups are reported but were not deleted because they may be deliberate aliases.

The optimized Hublot cutout, Kariv Principle photograph, and Kariv logo were visually inspected after conversion for alpha edges, dial detail, skin tones, and logo legibility.

## Fonts and caching

- Inter and Poppins now use `next/font` with `display: swap`; the blocking Google Fonts CSS import was removed.
- Next optimized images have a one-day minimum cache TTL.
- versioned/UUID seller derivatives use one-year immutable Supabase cache metadata.
- public brand, media, and logo paths use a one-day browser cache plus seven-day stale-while-revalidate.
- Next's hashed static assets retain Next's normal immutable caching behavior.

## Mobile catalogue behavior

- The shop remains server-paginated at 24 products, so it does not render the entire catalogue on first load.
- Product cards remain a two-column mobile grid and use compact responsive card sources.
- Home/category/model cards use responsive source sets rather than originals.
- Browser verification at 390 × 844 found no horizontal overflow on home, shop, or Omega brand pages.
- Gallery controls remain touch-sized and swipe navigation is preserved.

## Measurements

The same local Next.js development server and simulated Lighthouse mobile throttling were used before and after. Absolute scores include development JavaScript and Clerk keyless-mode overhead; payload and relative LCP changes are the meaningful comparison.

| Page | Score | LCP | CLS | Total transfer | Image transfer |
|---|---:|---:|---:|---:|---:|
| Home | 36 → 39 | 41.3s → 27.4s (33.6% faster) | 0.017 → 0 | 16,504 → 5,059 KiB | 11,834 → 177 KiB (98.5% less) |
| Shop | 35 → 33 | 37.8s → 28.8s (23.7% faster) | 0.129 → 0.129 | 8,765 → 4,879 KiB | 4,096 → 2 KiB |
| Omega | 38 → 46 | 39.9s → 30.1s (24.7% faster) | 0.001 → 0 | 9,764 → 5,906 KiB | 4,970 → 899 KiB (81.9% less) |

INP is a field metric and cannot be produced by this lab trace. TBT is retained in the raw reports as the lab interaction proxy, but it varied upward in the development runs because development/Clerk JavaScript dominates after images are removed. Production Web Vitals/RUM should be used for INP and final JavaScript prioritization.

Raw Lighthouse JSON and the generated summary are in:

- `docs/performance-baseline/`
- `docs/performance-after/`
- `docs/performance-summary.md`

## Maintenance commands

```bash
pnpm media:audit
pnpm media:check
pnpm media:optimize
pnpm test
pnpm lint
pnpm build
```

`media:check` enforces a 40 MB public-media budget and rejects any static asset over 2.5 MB. Unit/integration tests verify variant URL behavior, upload policy rules, restrictive remote origins, modern formats, and the critical card/gallery derivative paths.

When adding static media:

1. Use the smallest source that preserves the intended rendered detail.
2. Prefer WebP/AVIF for photographs and transparent watch cutouts; keep SVG only for trusted, reviewed vector assets.
3. Add explicit dimensions or a stable aspect-ratio container.
4. Set an accurate `sizes` value and avoid `priority` unless the asset is the primary above-the-fold image.
5. Run the inventory, budget, tests, and production build before merging.

## Remaining bottlenecks and follow-up

- Ninety-eight legacy raw `<img>` tags remain, down from 159. They are mostly editorial, admin, order, payment-proof, and low-frequency UI images; critical catalogue cards, product gallery, home shopping navigation, brand hero, and dealer profile paths were migrated first.
- Legacy product URLs that are not part of the new derivative family cannot provide a dedicated card/zoom file. Next.js still resizes approved origins; unknown origins use a safe lazy fallback.
- Local Supabase credentials/data are absent, so production product-card payloads and a real multi-image product detail could not be captured locally. The derivative selection and critical rendering paths are covered by automated tests and the production build.
- The app still has a large client-side development bundle. After production RUM identifies real INP contributors, the next performance pass should focus on route-level client boundaries, Clerk/auth payload, Framer Motion usage, and large libraries such as PDF/canvas/chart modules.
- A dedicated image CDN in front of Supabase can add edge transforms and origin shielding later. The current deterministic derivative contract is intentionally CDN-compatible.
