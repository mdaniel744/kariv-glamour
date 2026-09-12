# Kariv Glamour — Google Merchant readiness audit

Audit date: 13 September 2026. Preferred storefront: **https://24kariv.com**.

## Verdict and scope

Kariv has a usable foundation—HTTPS product pages, bilingual product content, public photographs, visible prices and dedicated policy pages—but it is **not yet reasonable to claim Merchant Center readiness or approval**. The most material gaps concern truthful customer contact, shipping charges, seller/account structure, and consistency between visible offers and machine-readable product data. Better editorial pages are valuable, but do not resolve these commerce requirements by themselves.

This audit used read-only public requests and a source-code review. It did not access Merchant Center, place an order, send a support message, change a live setting, verify company registration independently, or certify legal compliance. Account approval and any suspension decision remain Google's responsibility.

## Local revision and verification

- Expanded all 71 brand-guide routes in English and German with topic-specific explanations and brand narratives. Every guide has relevant existing imagery or, for the unusual Jackpot mechanism with no matching photograph, a clearly labelled conceptual illustration. Broad comparison articles also use a second relevant image. Removed visible publication/update dates and reading-time labels from article templates; source references remain available.
- Removed the shop's 500-product cap and followed all tenant-scoped database response pages. Shop now caches the published-only catalogue, filters before pagination and reports the actual matching total. Corrected English/German search interpolation and cross-field searches.
- Product cards, detail, structured data, checkout and server-side new-order pricing share the same positive-price/lower-sale-price rule and saved currency. Existing order totals are preserved. Invalid offers cannot initiate checkout; unavailable items no longer advertise in-stock availability. Product metadata uses plain text and saved valid identifiers.
- Navigation and the global trust strip no longer promise that every listing is already authenticated or that every destination is fully insured. The trust strip links to authentication, buyer protection and shipping information. Product shipping copy directs buyers to the terms; the About location now matches the existing Prague company details. Other page-specific operational claims still need the owner review described below.
- All **116 automated tests passed**, including isolated real order-action tests against in-memory services. The optimized Next.js production build passed. Existing unrelated lint warnings remain.
- All **142 guide/language server-render checks passed**. Separate component-only fixtures were visually checked at 360–390px mobile and 1440px desktop, including dark mode: no page overflow, loaded Poppins, correct sampled imagery and uncropped watch cutouts. This does not test the full application shell, authentication, live catalogue or production image optimizer.
- Full local storefront testing is blocked by missing Kariv Clerk/Supabase configuration in this checkout and process environment. No dummy credentials or authentication bypass was introduced. No live order, Merchant account change, database update, commit or deployment was performed in this revision.

The shipping-rate decision, responsible-seller/account structure, legacy cart contract and end-to-end live verification below remain open. This revision is not a Merchant approval claim.

## What was observed live

All following public pages returned HTTP 200. Both product language versions declared canonical URLs on 24kariv.com.

| Sample | Observed result |
| --- | --- |
| [Customer service](https://24kariv.com/en/customer-service) | Placeholder German phone number, Germany location, a different support email from the policies, and unverified response/opening-time promises. |
| [Shipping information](https://24kariv.com/en/legal/shipping-policy) | Czech delivery free; other EU delivery charged before the order; 1–3 / 3–7 business-day transit estimates after dispatch. |
| [Returns and refunds](https://24kariv.com/en/legal/returns-refund-policy) | Separate page with company/address/email, withdrawal instructions, refund timing and return-cost qualifications. |
| [Cartier product, English](https://24kariv.com/en/product/cartier-pasha-perpetual-calendar-moon-gerald-genta-design-quartz-18k-yellow-gold) | EUR 22,668, in stock, Very Good condition, nine photographs; its authentication status is pending while surrounding site-wide badges say authenticated. |
| [Same Cartier, German](https://24kariv.com/de/product/cartier-pasha-perpetual-calendar-moon-gerald-genta-design-quartz-18k-yellow-gold) | German product name/description in structured data; same price, currency, stock and photographs as English. |
| [Robots](https://24kariv.com/robots.txt) / [sitemap](https://24kariv.com/sitemap.xml) | Preferred domain correct. Sitemap contained 2,032 URLs, including 1,266 product-language URLs—633 product URLs per language at audit time. This is not a count of every database record or necessarily of in-stock items. |

One public Cartier main photograph returned image/jpeg, 1280 × 960 pixels and 126,568 bytes. That sample exceeds the announced 500-pixel minimum in both dimensions. This is a sample, not an image audit of the entire catalogue.

## Priority findings

### 1. Replace misleading contact mechanisms — definite frontend defect

Baseline `src/page-content/CustomerService.jsx` used `service@kariv-glamour.com`, `+49 (0) 123 456 789`, and `Deutschland`. The existing authoritative application constant is `src/lib/companyDetails.js`: Kariv Glamour s.r.o., the Prague registered address, and info@karivglamour.com. Its form's submit handler only changed local state to display success; it did not send anything. `Footer.jsx` offered four social links pointing only to `#`.

**Prepared locally in this revision:** customer service now uses the existing company name, email and address; placeholder phone/hours and unsupported response promises are omitted; the form explicitly prepares a mailto draft, does not claim delivery, preserves the user's text and always shows a direct email fallback. All fields have visible labels in both languages. Nonfunctional footer social links are removed. This is not a backend email-delivery integration and is not yet a live verification result.

Google asks merchants to provide reachable contact and remove technical/placeholder flaws; consistent information matters across website and Merchant Center. [Google contact-information guidance](https://support.google.com/merchants/answer/12472091?hl=en), [editorial and technical requirements](https://support.google.com/merchants/answer/12079604?hl=en).

### 2. Shipping totals contradict the published policy — release blocker until business rates are supplied

`src/page-content/Checkout.jsx` renders shipping as Free for every destination, permits a free-text country and does not require it in `canSubmit`. `src/actions/orders.js#createOrder` sets `total_amount` to the watch price with no country-based shipping calculation. The live shipping page promises that other-EU shipping is charged and disclosed before order placement.

**Required decision:** confirm deliverable countries, actual other-EU rates or rate rules, dispatch/handling times, and whether third-party sellers share those rules. Then enforce the approved total and destination rules server-side, display them before confirmation, and mirror them in Merchant Center. Do not silently invent rates, assume worldwide free delivery, or publish shipping schema with guessed handling times. Existing 1–3 / 3–7 figures describe transit after dispatch, not total order-to-delivery time.

Google requires accurate final pricing, consistent currency and readily accessible purchase information throughout checkout. Account creation is allowed if straightforward; guest checkout is not an absolute requirement. [Checkout requirements](https://support.google.com/merchants/answer/9158778?hl=en).

### 3. Confirm merchant-of-record versus marketplace setup — account/business decision

Kariv supports independent dealer listings and `orders.dealer_user_id`. Product seller cards are conditional on a dealer ID; the sampled Cartier page did not show an identifiable seller card in its public rendered text. A seller's description includes its own history and watch-lab warranty claims, which must not be mistaken for Kariv's own verified commitments.

**Required decision:** is Kariv the contractual seller for all watches, or does each dealer sell directly through a marketplace? Clearly identify the responsible seller, professional/private status and applicable warranty/returns in the purchase flow. Do not add Kariv as every Product Offer's seller merely to fill a metadata field.

Google has a specific advanced/multi-client route for marketplaces; multi-seller feeds require a stable `external_seller_id`. Different seller return policies may call for separate seller subaccounts rather than one multi-seller account. Existing Merchant Center structure was not inspected. [Multi-seller accounts](https://support.google.com/merchants/answer/15108683?hl=en), [external seller ID](https://support.google.com/merchants/answer/11537846?hl=en).

### 4. Make structured offers match the visible and payable offer — fixes prepared locally

Audit baseline: `app/[locale]/product/[slug]/page.jsx`.

- Descriptions are truncated before stripping rich HTML; both live samples include `<p>`/`<br>` and an abrupt cutoff inside the JSON-LD description. Convert to clear plain text before making the metadata excerpt; keep the full visible product description.
- Schema uses `salePrice || price`; product detail displays the sale price only when below the regular price; order creation uses `sale_price ?? price`. A malformed/higher/zero sale price therefore takes different paths. Use one validated positive-price rule across product display, JSON-LD and checkout; reject invalid offers rather than output a zero-value sale.
- Product UI callers use `formatPrice(value)` without the existing `product.currency`; the formatter defaults to EUR. JSON-LD/order data use the product's currency. No non-EUR live mismatch was demonstrated, but the code permits it.
- The adapter exposes `mpn` and `gtin`, while schema ignores them and always uses `referenceNumber` as MPN. Emit verified existing identifiers; only use a watch reference as MPN where it really is the manufacturer's identifier. Never invent a GTIN or use a serial number as a substitute.
- The Buy Now button remains enabled for sold watches, though the server appropriately rejects non-active or zero-stock orders. Disable purchase initiation for unavailable watches and preserve browsing/wishlist options.
- `Reserved` is mapped to PreOrder, but reserving an already existing watch does not establish preorder eligibility. Unknown condition defaults to used; every Unworn value maps to new without proof of Google's new-condition criteria. Keep frontend condition grading and Merchant condition separate where necessary; confirm original packaging/use status rather than deriving it from an optimistic label.

**Prepared locally in this revision:** one shared pricing rule now drives product cards, product detail, shop price filters/sorting, product structured data, checkout display and the server's fresh product-price snapshot. Only a positive sale price below a positive regular price is active; unpriceable records or invalid currency cannot create a new order. Stored currency is preserved. Product metadata uses a readable word-boundary excerpt; Product JSON-LD keeps the full localized description as plain text. Saved MPN/valid-format-and-check-digit GTIN values are used, with no guessed identifier. Reserved, coming-soon and zero/missing-stock watches are not marked InStock or available through Buy Now. Unknown/Unworn condition is omitted rather than optimistically called new. Existing order totals and currency remain historical snapshots; the buyer order portal now formats those saved currencies explicitly. Shipping calculations and payment/escrow flow are unchanged.

Regression tests execute the real order action against in-memory database/auth fixtures only; no live order, profile write, payment or customer message was made. They cover valid/invalid sales, currencies, inactive and out-of-stock products, tenant scoping, sign-in requirements and unchanged idempotent historical orders. Live end-to-end checkout remains unverified.

**Separate legacy cart defect remains:** `cartContext.jsx` stores only `{productId, quantity}` and does not expose `cartTotal`, while `Cart.jsx` expects hydrated product objects and a total. A populated legacy cart can therefore render missing prices or form an invalid checkout link. The direct product Buy Now flow does not use this cart, but the legacy cart must be repaired or deliberately retired before a Merchant review; this revision does not redesign that flow.

Merchant listing markup needs a real, positive-priced purchasable Offer, appropriate currency and product imagery. Shipping/return enhancements are useful but optional; absent enhancement markup alone is not proof of an account-policy violation. [Merchant listing structured data](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing).

Google's feed condition definitions distinguish unopened new products from used/modified/opened products; an unworn second-hand watch is not automatically new for that purpose. [Condition specification](https://support.google.com/merchants/answer/6324469?hl=en). Existing assigned identifiers should be supplied accurately; missing identifiers must not be fabricated. [Product identifiers](https://support.google.com/merchants/answer/160161?hl=en).

### 5. Qualify trust claims and payment promises — evidence/business review

The live sample says Authentication pending, yet the header and shared TrustBar claim authenticated/verified by watchmakers. The same surfaces promise fully insured worldwide delivery while destination restrictions and fees remain unresolved. Review `src/components/shared/TrustBar.jsx`, `src/locales/{en,de}/common.json`, navigation copy, and product guarantee copy against actual operations. Prefer links explaining the authentication/insurance process over blanket claims about every listing.

The real order workflow begins with dealer review, then supplies bank-transfer information after acceptance. This audit did not test that a buyer can complete payment, receive confirmation and obtain a refund. Bank transfer is not declared automatically disallowed here, but the payment process must be a genuine secure purchasing workflow, not an enquiry-only funnel. Confirm the entity holding funds and the basis for the term escrow; do not invent a licensed provider, independent protection or deposit insurance.

Google considers misleading business identity, unsupported promises and undisclosed obligations when evaluating misrepresentation. [Misrepresentation policy](https://support.google.com/merchants/answer/12079606?hl=en). A conventional payment method and direct purchase capability are part of store requirements. [Store URL requirements](https://support.google.com/merchants/answer/12160471?hl=en).

### 6. Product feed and image readiness — not verified account-side

No merchant feed generator or Merchant API connector was located in this storefront repository; the shared dashboard or Merchant Center may already provide one. Do not create a second conflicting feed without checking. The sitemap is for crawling and is not a Merchant product feed. Review the active source for stable item IDs, locale-specific URLs/text, exact price/currency/stock/condition, real brand/reference identifiers, actual product images, update cadence and applicable seller IDs. Keep sold inventory and new listings synchronized.

Use actual photographs of the offered watch for product ads, not the editorial brand cutouts or stock illustrations. Check all main and additional URLs for public access, resolution, excessive cropping, retailer watermarks/promotional overlays and content rights. Google recommends high-resolution images; its 2026 announcement states that warnings for images below 500 × 500 began on 14 April 2026 and enforcement starts on **31 January 2027**. Do not describe that future deadline as an already effective September 2026 ban. [Image requirements](https://support.google.com/merchants/answer/6324350?hl=en), [2026 specification update](https://support.google.com/merchants/answer/16989427).

## Before asking Google to review

1. Deploy and click-test the truthful contact flow, shop search and correct published-product totals on mobile and desktop; do not equate inactive/draft inventory with available products.
2. Resolve shipping rates, destination validation and seller/account structure with the owner. Ensure website, order totals and Merchant Center agree.
3. Test both languages with available, sold, sale-price, missing-identifier and modified/pre-owned examples. Compare rendered content, structured data and the actual active data source.
4. Test an authorized end-to-end purchase/refund in an appropriate controlled workflow, including dealer acceptance, payment instructions, final amount, email/order confirmation and stock updates. Do not create live orders merely for this audit.
5. Confirm the verified/claimed Merchant Center website is 24kariv.com, business identity/address and verified phone match real records, and shipping/returns/target countries are configured. Verification and account access are owner-controlled steps.
6. Run Google's Rich Results Test and Search Console URL Inspection on representative deployed product URLs; inspect Merchant Center Diagnostics and actual data-source item counts. Request review only after the known blockers are genuinely resolved.

All official sources above were checked on 13 September 2026. This document records a point-in-time audit, not a promise of indexing, rankings, rich results or Merchant approval.
