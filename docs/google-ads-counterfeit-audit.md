# Google Ads counterfeit-goods audit — 2 October 2026

This is a website and catalog-risk review, not a determination that any watch is counterfeit. Google Ads' [counterfeit-goods policy](https://support.google.com/adspolicy/answer/176017) applies to the ad and its destination. Merchant Center has a related [counterfeit-products policy](https://support.google.com/merchants/answer/6149993). An approved Merchant Center account does not resolve a Google Ads suspension by itself.

## Site-level findings and local corrections

- The live site previously described all watches as physically inspected, certified or authenticated. The owner confirmed that the catalog's `Authentication: Verified` value means only that listing information was reviewed. The English, German and Czech storefront copy and the product detail status text now distinguish these states.
- The `Certified Pre-Owned` marketing label was not supported by an item-level certification workflow. It now reads `Selected Pre-Owned` while retaining the existing filter field and URL compatibility.
- Manufacturer brand landing pages now identify Kariv as an independent marketplace. Brand-page structured data no longer claims the manufacturer's `Brand` entity at a Kariv URL.
- Older pre-owned brand/model pages claiming watches were inspected or verified have been aligned with the listing-review standard.
- Checkout copy no longer promises a universal watchmaker authenticity guarantee or escrow route. Delivery wording is limited to available EU destinations.

## Catalog findings requiring evidence, not copy changes

A read-only tenant-scoped scan found 750 active product records: 745 marked `Verified`, one `Pending`, four without an authentication status. There were no listings openly advertised as replicas. Several product descriptions disclose aftermarket, custom or non-original components. These are not automatically counterfeit, but they merit priority review before an Ads appeal or continued advertising:

- `rolex-submariner-date-40mm-black-iced-out-5ct-diamonds-oyster-stainless-steel-wa`
- `cartier-santos-de-cartier-small-iced-out-wssa0082`
- `cartier-santos-de-cartier-aftermarket-diamond-wssa0018`
- `cartier-santos-de-cartier-iced-out-box-and-papers-wssa0018`
- `cartier-santos-de-cartier-iced-out-39-8mm-blue-dial-2023-wssa0030`
- `rolex-lady-datejust-custom-diamond-bracelet-appraisal-certificate-69178`
- `audemars-piguet-royal-oak-concept-26228bc-ss-d314cr-01`
- `patek-philippe-annual-calendar-5205g-010`
- `rolex-gmt-master-ii-16713`

These slugs are examples for review, not a complete quarantine list. Some descriptions appear to be copied from third-party dealers and speak in the seller's voice; seller identity, service claims and included accessories should be checked against the actual offer. Product titles, images and records were not changed in this audit.

For each item under review, retain its supplier invoice or provenance, reference/serial checks where appropriate, dated photographs of the actual item, condition and parts disclosures, and any independent inspection/service records. An original box, papers or appraisal alone is not conclusive proof of authenticity. If the base watch cannot be substantiated as genuine, remove the offer from the website and feeds together; do not hide it only from Google.

## Before appealing

1. Review the actual suspended ads, assets, keywords, account verification and landing pages; Google did not identify a specific URL in the notice shared with this audit.
2. Review the modified/aftermarket listings and any merchant feed entries for the same products. Correct inaccurate seller, originality or affiliation claims and stop advertising items whose authenticity cannot be supported.
3. Publish the tested site changes, then submit one factual [Google Ads suspension appeal](https://support.google.com/google-ads/answer/9841640) explaining the corrections and available item evidence. Do not create another account to work around the suspension.

## Follow-up: independence and policy alignment

The initial corrections above were deployed in commit `4c0724a`. A further local review on 2 October 2026 made these changes in English, German and Czech:

- Homepage hero: “Find your next watch”, a neutral watch search prompt and category shortcuts instead of manufacturer names. Product/model names remain where needed to identify the goods; they are not a prohibited keyword list.
- About, navigation and authentication content: Kariv is an independent marketplace and reseller, with listings from private owners, independent businesses and Kariv's own inventory. No manufacturer affiliation, endorsement, sponsorship, authorised-dealer status or manufacturer certification is claimed.
- The authentication page explains listing-information review rather than presenting an unsupported sequence of physical watch inspections. Item-specific inspection claims need a provider, date, scope and supporting record.
- Brand and authenticity disclaimers state unconditional independence, distinguish seller approval from watch authentication, and require accurate disclosure of replacement parts and modifications. Disclosure does not legitimise counterfeit components.
- Terms, warranty, returns, shipping and Buyer Protection copy are aligned: standard checkout is the usual route; escrow applies only where expressly offered and confirmed for the order. Consumer withdrawal rights are distinct from defect/authenticity remedies. No general money-back or manufacturer-warranty promise is made.
- Product return summaries no longer imply that a “final sale” label can remove mandatory rights.

A read-only, tenant-scoped check found no public remote legal-page records overriding the local policy content. The 15 live brand records contained no claims that Kariv is affiliated with manufacturers or physically inspects every watch. Stored brand SEO/FAQ overrides were empty. Individual product records were not altered.

Google's [counterfeit policy](https://support.google.com/adspolicy/answer/176017?hl=en) recommends clear independence and the advertiser's own branding. Its [trademark guidance](https://support.google.com/adspolicy/answer/6118?hl=en) distinguishes legitimate reseller/product identification from misleading use. [Misrepresentation rules](https://support.google.com/adspolicy/answer/6020955?hl=en) prohibit false affiliations, qualifications and unavailable services. These findings do not establish the cause of the account suspension or guarantee reinstatement.

Return/warranty wording was checked against [EU consumer shopping guidance](https://europa.eu/youreurope/citizens/consumers/shopping/shopping-consumer-rights/index_en.htm), [withdrawal guidance](https://europa.eu/youreurope/citizens/consumers/shopping/returns/index_en.htm) and [guarantees guidance](https://europa.eu/youreurope/citizens/consumers/shopping/guarantees-returns/index_en.htm). Professional/private seller status must be made clear before purchase; the policy text cannot substitute for accurate seller records and order information. Final marketplace legal terms should be reviewed by qualified Czech/EU counsel against the actual business operation.

At audit completion, the homepage and policy source-code changes above were local and awaiting deployment. They are included in this source-code update; the production catalog corrections below were applied separately. The item-level evidence review remains necessary before presenting an appeal as fully resolved.

## Production catalog wording corrections — 2–3 October 2026

The owner confirmed that selling businesses own their watches and retain supporting documents, but did not supply item-by-item inspection records or a verified seller-to-product mapping. The corrections therefore do not invent business names, inspectors, certificates or manufacturer relationships. They explain the authentic-watches-only requirement, attribute an offer of authenticity to the seller where appropriate, and separate that claim from physical authentication by Kariv.

- A private, local backup captured all 750 active Kariv product rows and their 7,193 saved translation rows before any mutation. Backups, reviewed manifests and per-write journals are outside the repository under `private-audits/claims-2026-10-02`; they must not be published.
- Corrected descriptive content for **318 distinct products**: 215 source product rows and 658 currently selected translation rows (211 English, 235 German, 212 Czech). This is 873 unique records. A final language/affiliation cleanup revisited 19 of those records.
- Replaced unsupported blanket expert-inspection, universal certification, manufacturer-sourcing and partner-certification wording. Removed inferences that a receipt, box, papers or warranty card alone proves authenticity or recent servicing.
- Preserved specific dated/named service and assessment statements, included-document descriptions, technical COSC/METAS specifications, and disclosures of aftermarket or non-original components. Those retained item-level claims still require supporting evidence; this wording task did not authenticate the watches.
- An independent post-write snapshot comparison verified every saved replacement and found **no unexpected field changes** across the backed-up records. Titles, URLs, prices, stock, images, attributes, seller assignments and publication status were unchanged. Only reviewed description/metadata text and its update timestamps changed. No orders or other tenants were written.
- The repair uses tenant-scoped descriptive-field allowlists, timestamp guards, current-translation precedence checks, a reviewed-manifest digest and intent/completion journals. It stops on a conflicting edit; its `reconcile` mode is read-only. Restoring a record must restore only the changed text fields after checking current values/timestamps, never overwrite an entire old row.

Public HTML checks confirmed the updated wording on the Daytona Le Mans, Omega Aqua Terra receipt-provenance and Breitling Superocean partner-certification examples in English, German and Czech (nine successful public responses), with the targeted old claims absent. Initial cached responses were stale; follow-up checks after revalidation returned the saved corrections. The final database comparison had no unexpected changes, and all 364 tests plus lint passed. Verify public responses after cache refresh rather than assuming a successful database write has already refreshed every page.

The authenticity policy in this source-code update also requires sellers to own listed watches and retain supporting records, distinguishes seller checks from Kariv's listing review, and distinguishes retained evidence from documents actually included in the sale. Unlike the database text corrections, that policy addition takes effect when this code is deployed. Deployment does not rerun the catalog repair scripts.

### Remaining evidence and content work

This is not an authenticity certification or a guarantee of Google Ads reinstatement. Named/dated inspections, appraisals, certificates, originality claims and some certificate-context CPO statements remain for evidence review. Third-party seller shipping, payment and warranty boilerplate was not comprehensively rewritten by this product-authenticity pass; for example, the Breitling `ab2010121b1s1` source copy still describes US FedEx pickup and escrow and should be reconciled with Kariv's actual fulfilment/payment terms. Imports or dashboard edits can reintroduce old copy; no automated ingestion rewrite or other tenant behavior was added.
