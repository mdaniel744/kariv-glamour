# Search indexing audit — 16 September 2026

## Scope and evidence

The reported Search Console reason was **Excluded by 'noindex' tag**. No example URL from that report was supplied, so its exact affected set and crawl dates remain unverified.

Audited the shared route/metadata code, the complete Kariv public product catalogue through tenant-scoped read-only queries, and representative live HTTP responses across all three languages: home, shop, brands, collections, editorial guides, legal/information pages, products, login and missing pages. This was not an HTTP crawl of every sitemap URL.

- `https://24kariv.com/robots.txt` and `/sitemap.xml` return HTTP 200; public pages are not globally blocked.
- Sampled public pages have self-referencing `24kariv.com` canonicals, index/follow directives and no blocking X-Robots-Tag header.
- The catalogue snapshot contained **695 active products**. All had a saved Czech title. **650** had Czech descriptions; **45** had no long description in the primary, English, German or Czech fields.
- The original implementation reused a Merchant-content completeness check for ordinary Search indexing. Consequently, those 45 Czech URLs were noindexed and omitted from the sitemap, even though their product pages displayed titles and watch details normally.
- Confirmed live examples included `/cs/product/patek-philippe-aquanaut-blue-2025-5168g-001`, `/cs/product/hublot-big-bang-original-arije-tantalum-limited-edition-10-pieces-301-645978`, and `/cs/product/rolex-sea-dweller-super-mint-condition-new-card-2020-126603`.

## Changes

1. Separate Search indexability from Merchant offer eligibility. Published Czech products need a saved Czech title; if a description is displayed, it must not be an untranslated fallback. A description absent in every language no longer blocks an otherwise usable product page. English/German behavior is unchanged.
2. Use the same eligibility helper for product robots metadata, Czech hreflang alternatives and the sitemap. Czech meta-description snippets no longer fall back to English/German copy.
3. Preserve Merchant's existing description requirement and offer safeguards. This change does not claim these products are Merchant-ready or eligible for Product rich results.
4. Propagate temporary product/translation read failures instead of disguising them as missing translations or missing products. Reject incomplete translation pagination and read past short pages when a total count is unavailable.
5. Remove the 500-record limit on legacy title-derived URL lookups. Keep all existing product slugs unchanged.
6. Let sitemap catalogue failures fail revalidation rather than publish a successful but empty product list.

No database content, prices, stock, images, seller assignments or publication status was changed. Login/account/admin/checkout exclusions and genuine missing-page behavior remain unchanged.

## Verification and rollout

Regression tests cover translated products, absent versus untranslated descriptions, empty markup, genuine missing products, transient errors/retries, tenant isolation, catalogue pagination and legacy products beyond the old limit.

Validation completed locally: **185 tests pass**, production build passes (existing unrelated lint warnings remain), and HTTP smoke tests return 200/index/follow for previously excluded Czech products and their English/German counterparts. Czech login still returns noindex. The generated sitemap contains **3,234 URLs**, including **695 products per language**, and the served sitemap includes the previously excluded example. No commit, push or deployment was performed as part of this audit.

After deployment:

1. Check a formerly excluded Czech product with Search Console's **URL Inspection → Test live URL**. Confirm crawling/indexing are allowed and its canonical is the corresponding `24kariv.com` URL.
2. Confirm the updated URLs are present in `/sitemap.xml` and submit that sitemap if it is not already registered.
3. Request indexing for representative public pages. Use **Validate fix** for unintended public-page exclusions; do not remove intentional private/account exclusions just to clear the report.
4. Review the actual example URLs from Google's report. Historical crawl results may differ from current live responses, and Google decides whether to index eligible pages.

Useful descriptions should still be added to the 45 products from verified watch information for customer clarity and Merchant readiness; no descriptions were invented during this technical fix.

References: [Google Search technical requirements](https://developers.google.com/search/docs/essentials/technical), [noindex behavior](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [Search Console Page indexing report](https://support.google.com/webmasters/answer/7440203?hl=en).
