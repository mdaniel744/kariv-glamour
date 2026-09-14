import { getProductPricing, getProductAvailability, getProductCondition, productIdentifiers, merchantPlainText } from './productMerchant.js';
import { sellerValidation, isSellerPublic, EXTERNAL_SELLER_ID } from './marketplace.js';
import { productSlug } from './slug.js';
import { getSiteUrl } from './seo.js';

const xml = value => String(value).replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c]));
export function buildMerchantFeed(products, sellers, { locale = '', sellerType = '', exchangeRates = null } = {}) {
  if (!['cs', 'de'].includes(locale) || !['marketplace_owned', 'third_party'].includes(sellerType)) throw new Error('Invalid feed language or seller group');
  const sellerMap = new Map(sellers.map(s => [s.user_id, s]));
  const ids = new Map();
  for (const p of products) ids.set(p.stableFeedId, (ids.get(p.stableFeedId) || 0) + 1);
  const included = [], excluded = [];
  for (const product of products) {
    const seller = sellerMap.get(product.dealerId);
    const reasons = [];
    if (!seller) reasons.push('missing_seller');
    else {
      if (seller.seller_type !== sellerType) reasons.push('different_seller_group');
      if (!isSellerPublic(seller)) reasons.push(seller.is_demo ? 'demo_seller' : 'seller_unapproved_or_suspended');
      reasons.push(...sellerValidation(seller));
      if (!seller.merchant_feed_eligible) reasons.push('seller_feed_disabled');
    }
    if (product.ownershipVerificationStatus !== 'verified') reasons.push('unverified_ownership');
    if (!product.merchantFeedEligible) reasons.push('product_feed_disabled');
    if (!product.stableFeedId || !EXTERNAL_SELLER_ID.test(product.stableFeedId)) reasons.push('invalid_feed_id');
    if (ids.get(product.stableFeedId) > 1) reasons.push('duplicate_feed_id');
    if (!product.isPublished || !getProductAvailability(product).inStock) reasons.push('not_purchasable');
    const title = merchantPlainText(product['productTitle_' + locale]);
    const description = merchantPlainText(product['productDescription_' + locale]);
    if (!title || !description) reasons.push('missing_translation');
    const pricing = getProductPricing(product, { locale, exchangeRates });
    if (!pricing.price || pricing.currency !== (locale === 'cs' ? 'CZK' : 'EUR')) reasons.push('invalid_price_or_currency');
    const slug = productSlug(product);
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) reasons.push('invalid_landing_url');
    const link = getSiteUrl() + '/' + locale + '/product/' + slug;
    const image = product.featuredImage || product.productImages?.[0];
    let imageLink;
    try { imageLink = new URL(image, getSiteUrl()).href; } catch { /* diagnostics below */ }
    if (!image || !/^https:\/\//.test(imageLink || '')) reasons.push('invalid_image');
    const condition = getProductCondition(product)?.replace('https://schema.org/', '').replace('Condition', '').toLowerCase();
    if (!condition) reasons.push('unknown_condition');
    if (!product.brand) reasons.push('missing_brand');
    if (reasons.length) { excluded.push({ id: product.id, reasons: [...new Set(reasons)] }); continue; }
    const identifiers = productIdentifiers(product);
    const gtin = Object.entries(identifiers).find(([k]) => k.startsWith('gtin'))?.[1];
    included.push({
      id: product.stableFeedId, title, description, link, image_link: imageLink,
      price: pricing.price.toFixed(2) + ' ' + pricing.currency, availability: 'in_stock', condition,
      brand: product.brand, ...(identifiers.mpn ? { mpn: identifiers.mpn } : {}), ...(gtin ? { gtin } : {}),
      ...(sellerType === 'third_party' ? { external_seller_id: seller.external_seller_id } : {}),
      shipping: { country: locale === 'cs' ? 'CZ' : 'DE', price: '0.00 ' + pricing.currency },
    });
  }
  const exclusionsByReason = {};
  for (const entry of excluded) for (const reason of entry.reasons) exclusionsByReason[reason] = (exclusionsByReason[reason] || 0) + 1;
  return { included, excluded, summary: { totalIncluded: included.length, totalExcluded: excluded.length, exclusionsByReason } };
}
export function merchantFeedXml(feed) {
  const items = feed.included.map(offer => '<item>' + Object.entries(offer).map(([key, value]) =>
    key === 'shipping' ? '<g:shipping><g:country>' + xml(value.country) + '</g:country><g:price>' + xml(value.price) + '</g:price></g:shipping>' :
      '<g:' + key + '>' + xml(value) + '</g:' + key + '>').join('') + '</item>').join('');
  return '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel><title>Kariv Glamour</title><link>' + xml(getSiteUrl()) + '</link><description>Watch inventory</description>' + items + '</channel></rss>';
}
