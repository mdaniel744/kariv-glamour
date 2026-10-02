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

No production product data was changed, and this local code update has not been deployed.
