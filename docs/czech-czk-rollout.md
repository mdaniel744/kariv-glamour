# Czech storefront and CZK checkout

## Agreed behavior

- Czech is language `cs`, country `CZ`, formatting locale `cs-CZ`, and currency `CZK` (`Kč`). The public route is `/cs`.
- CZK applies **only to the Czech storefront**. Selecting English or German retains the existing catalogue-currency behavior (Kariv EUR listings remain EUR). Location, IP address and dashboard interface language do not decide checkout currency.
- Catalogue prices remain in their original currency. No product prices, URLs, inventory or historic orders are rewritten by this feature.
- New Czech orders and their line items store the final CZK amount. Subsequent exchange-rate or interface-language changes do not convert an existing order.

## Pricing implementation

`currencyConversion.js` parses the Czech National Bank's published daily fixing. Rates are CZK **per stated amount**, so currencies quoted in units of 100 are normalized correctly. Amounts are rounded to two decimal places for bank transfers; there is no exchange markup.

`exchangeRatesServer.js` shares a rate snapshot across the server render, visible product prices and structured offers. The official feed is cached for one hour. Weekends/holidays use the most recent fixing; snapshots older than seven days are rejected. Missing, invalid or unavailable rates never become a 1:1 conversion or a silent EUR checkout. Czech ordering is disabled when a valid CZK quote cannot be established.

The order action reads the fresh tenant-scoped product, recomputes its actual regular/sale price and trusted conversion, and compares this to the amount shown to the buyer. If it changed, no order is created: checkout displays the new amount and requires confirmation again. Client-supplied amounts/rates are not trusted for pricing. The existing `orders.products` JSON holds the original price/currency and rate/source/date audit snapshot; no database migration is required.

Price filters and sorting compare displayed CZK prices on Czech pages. The home budget link converts the EUR 10,000 threshold rather than relabelling it as Kč 10,000. Crossing the EUR/CZK language boundary clears numeric URL price bounds so their units are not silently reinterpreted.

## Translation scope and shared dashboard

The public-site translation work includes the six UI dictionaries, informational/policy pages, brand navigation and guide content, and buyer account/payment controls. Some private dealer/admin management forms still contain hardcoded English; this update must not be described as a completed translation of every internal management screen. The brand-guide Czech editions are localized editorial content, not a literal paragraph-for-paragraph reproduction of every English essay. Brand/model names and canonical filtering attributes remain unchanged.

The existing translation table and translation feature now recognize `cs` / `cs-CZ`. Kariv's source product language remains English, independent of the authoring UI. New listings created through this repository generate missing German and Czech copy using the existing configured translation service. Saved translations, including human corrections and saved English versions of German-primary legacy products, are preserved.

This repository cannot configure or backfill the separate Ecom King import/translation pipeline. Before launch:

1. Add **Czech (`cs`) as a translation target for Kariv only** in that dashboard; retain English source and German target.
2. Back up and count affected Kariv products, then generate missing Czech titles/descriptions through that existing pipeline. Preserve existing human translations. Do not rewrite prices, inventory, attributes, publication status or URLs.
3. Verify new dashboard listings, dealer submissions and imports trigger Czech translation, not just this repository's product forms. Check edited English sources and translation refresh behavior in the dashboard.
4. Verify representative published products in all three storefront languages. Untranslated Czech product pages remain usable with source-copy fallback but are not advertised as indexed Czech product offers; they gain Czech indexing once their translated title and description are present.
5. Dynamic dashboard-authored guides and dealer descriptions also need Czech content in the existing CMS. Static repository content does not overwrite these records.

## Required payment operations check

Payment is currently bank transfer after dealer confirmation. The storefront stores and displays the agreed CZK amount, but bank beneficiary instructions are supplied through the separate dashboard. Confirm the receiving/escrow account accepts **CZK**, and that instructions, receipts, invoices, refunds and dealer settlement use the stored order currency and amount. Do not send EUR-only instructions for a CZK order or re-convert its total. No live bank transfer has been executed during implementation.

Standard shipping is free for every supported EU destination. The published policy and checkout now use the same zero-shipping-charge rule, and checkout requires a complete delivery address including the country. Merchant Center shipping settings must mirror this free-EU rule and the published delivery estimates.

## Verification and deployment

- Unit and mocked-server tests cover locale routing, dictionary keys/placeholders, translated product display, original/human copy preservation, CZK conversion, sale pricing, missing/stale rates, price-change reconfirmation, tenant/owner checks and immutable saved order currency.
- The public CNB feed was verified with an HTTP 200 response and a valid dated EUR fixing. Tests use deterministic sample rates, not a production hard-coded rate.
- Final verification on 13 September 2026: **160 tests passed**, production build passed, 28 Czech routes prerendered, and the diff whitespace check passed. Existing non-blocking lint warnings remain. Tests include Czech coverage of 2,582 localized brand-data fields, all 15 brands, 261 SEO pages, and guide rendering in all three languages.
- The legacy cart now hydrates saved product IDs, uses current localized prices and clearly totals the single watch that the existing one-watch checkout will order; it no longer relies on the missing `cartTotal` property.
- This workspace has no Kariv `.env.local` credentials, so live authenticated checkout, dashboard backfill and full local-app browsing could not be verified. Mocked tests never create real orders.
- Publication is by an explicit owner-requested push to `main`, which triggers the production webhook. Deploying the storefront does not configure the separate dashboard translation targets or verify the CZK bank-payment operations described above.

References: [CNB rate format](https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/), [official daily feed](https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt), [Google checkout requirements](https://support.google.com/merchants/answer/9158778?hl=en). This implementation is not a guarantee of Google Merchant approval.
