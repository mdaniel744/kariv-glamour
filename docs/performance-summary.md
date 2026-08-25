# Mobile performance measurements

Lighthouse 3-page comparison on the local Next.js development server, simulated mobile throttling, captured on 2026-08-25. Development JavaScript and Clerk keyless-mode code make the absolute scores unsuitable as production targets; the same environment was used before and after so payload and LCP changes remain comparable. INP is a field metric and is not available from this lab run; TBT remains in the JSON reports as the lab interaction proxy.

| Page | Score | LCP | CLS | Total transfer | Image transfer |
|---|---:|---:|---:|---:|---:|
| home | 36 → 39 | 41.3s → 27.4s (33.6% faster) | 0.017 → 0 | 16504 → 5059 KiB | 11834 → 177 KiB (98.5% less) |
| shop | 35 → 33 | 37.8s → 28.8s (23.7% faster) | 0.129 → 0.129 | 8765 → 4879 KiB | 4096 → 2 KiB (100% less) |
| omega | 38 → 46 | 39.9s → 30.1s (24.7% faster) | 0.001 → 0 | 9764 → 5906 KiB | 4970 → 899 KiB (81.9% less) |

Raw reports are retained in `docs/performance-baseline` and `docs/performance-after`.
