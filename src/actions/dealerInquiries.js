'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getCzkExchangeRates } from '@/lib/exchangeRatesServer';
import { getProductPricing } from '@/lib/productMerchant';
import { requireAdmin, requireDealer, requireUser } from '@/lib/serverAuth';
import { STORE_ID } from '@/lib/supabaseData';

const INQUIRY_STATUSES = new Set(['pending', 'accepted', 'declined', 'countered', 'quoted', 'withdrawn']);
const OPEN_INQUIRY_STATUSES = ['pending', 'countered', 'quoted'];
const RESPONSE_ACTIONS = new Set(['accept', 'decline', 'counter', 'quote']);
const MAX_MESSAGE_LENGTH = 2000;
const MAX_DAILY_INQUIRIES = 10;
const SELLER_KIND_DEALER = 'dealer';
const SELLER_KIND_KARIV = 'kariv';

function failed(error) {
  return { ok: false, error, inquiry: null };
}

function inquiryServiceError(error) {
  if (error?.code === '42P01' || error?.code === 'PGRST205') {
    return 'Dealer inquiries are not configured in the database yet.';
  }
  return error?.message || 'Unable to complete the dealer inquiry request.';
}

function cleanText(value, maxLength = MAX_MESSAGE_LENGTH) {
  const text = typeof value === 'string' ? value.trim() : '';
  return text ? text.slice(0, maxLength) : null;
}

function money(value) {
  if (value === '' || value == null) return null;
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0 || number > 999_999_999_999.99) return null;
  return Math.round((number + Number.EPSILON) * 100) / 100;
}

function currentProductPrice(product) {
  const regular = money(product?.price);
  const sale = money(product?.sale_price);
  return sale != null && regular != null && sale < regular ? sale : regular;
}

function firstProductImage(images) {
  if (Array.isArray(images)) return cleanText(images.find((image) => typeof image === 'string'), 2000);
  return null;
}

function normalizeIntent(input) {
  const value = String(input?.type || input?.requestType || input?.intent || '').trim().toLowerCase();
  if (['quote', 'request_quote', 'quote_request', 'purchase_request'].includes(value)) return 'purchase_request';
  if (['offer', 'make_offer'].includes(value)) return 'offer';
  return null;
}

function normalizeResponseAction(value) {
  const action = String(value || '').trim().toLowerCase();
  if (action === 'counter_offer') return 'counter';
  if (action === 'send_quote') return 'quote';
  return action;
}

function listLimit(options) {
  const requested = typeof options === 'number' ? options : options?.limit;
  const parsed = Number(requested);
  return Number.isInteger(parsed) ? Math.min(Math.max(parsed, 1), 100) : 100;
}

function shapeInquiry(row) {
  if (!row) return null;
  return {
    id: row.id,
    productId: row.product_id,
    buyerUserId: row.buyer_user_id,
    dealerUserId: row.dealer_user_id,
    sellerKind: row.seller_kind || SELLER_KIND_DEALER,
    buyerName: row.buyer_name || 'Buyer',
    dealerName: row.dealer_name || 'Dealer',
    productName: row.product_name,
    productSlug: row.product_slug,
    productImage: row.product_image || '',
    type: row.intent === 'purchase_request' ? 'quote' : 'offer',
    intent: row.intent,
    status: row.status,
    listingPrice: Number(row.listing_price),
    currency: row.currency,
    offerAmount: row.buyer_offer_amount == null ? null : Number(row.buyer_offer_amount),
    message: row.buyer_message || '',
    responseAmount: row.dealer_response_amount == null ? null : Number(row.dealer_response_amount),
    responseMessage: row.dealer_message || '',
    respondedAt: row.dealer_responded_at || null,
    withdrawnAt: row.buyer_withdrawn_at || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    // An inquiry records intent only. Even an accepted response neither
    // reserves inventory nor creates an order or payment obligation.
    createsOrder: false,
  };
}

async function latestDealerApplication(dealerUserId) {
  return supabaseAdmin
    .from('dealer_applications')
    .select('status, company_name')
    .eq('store_id', STORE_ID)
    .eq('dealer_user_id', dealerUserId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
}

async function notifyUser({ userId, type, title, body, linkPath }) {
  const { error } = await supabaseAdmin.from('notifications').insert({
    store_id: STORE_ID,
    user_id: userId,
    type,
    title,
    body,
    link_path: linkPath,
  });
  // Notification delivery must not turn a successfully persisted inquiry into
  // an apparent failure that the user retries and duplicates.
  if (error) console.error('Unable to create dealer inquiry notification:', error.message);
}

export async function createDealerInquiry(input = {}) {
  const user = await requireUser();
  if (!user.emailVerified) return failed('Verify your email address before contacting a dealer.');

  const productId = typeof input?.productId === 'string' ? input.productId.trim() : '';
  const intent = normalizeIntent(input);
  const buyerMessage = cleanText(input?.message ?? input?.buyerMessage);
  const rawMessage = typeof (input?.message ?? input?.buyerMessage) === 'string'
    ? (input.message ?? input.buyerMessage).trim()
    : '';
  const offerAmount = money(input?.offerAmount ?? input?.amount);

  if (!productId) return failed('Choose a watch before contacting the dealer.');
  if (!intent) return failed('Choose whether to request a quote or make an offer.');
  if (rawMessage.length > MAX_MESSAGE_LENGTH) return failed(`Messages cannot exceed ${MAX_MESSAGE_LENGTH.toLocaleString('en-US')} characters.`);
  if (intent === 'offer' && offerAmount == null) return failed('Enter a valid offer amount.');

  const { data: product, error: productError } = await supabaseAdmin
    .from('products')
    .select('id, dealer_id, name, slug, images, price, sale_price, currency, status, stock_quantity')
    .eq('store_id', STORE_ID)
    .eq('id', productId)
    .maybeSingle();
  if (productError) return failed(inquiryServiceError(productError));
  if (!product || product.status !== 'active' || Number(product.stock_quantity || 0) < 1 || !product.dealer_id) {
    return failed('This dealer watch is no longer available for inquiries.');
  }
  if (product.dealer_id === user.id) return failed('You cannot submit an inquiry for your own listing.');

  const listingPrice = currentProductPrice(product);
  const currency = String(product.currency || '').trim().toUpperCase();
  if (listingPrice == null || !/^[A-Z]{3}$/.test(currency)) {
    return failed('This listing does not have valid pricing information.');
  }
  const requestedCurrency = typeof input?.currency === 'string' ? input.currency.trim().toUpperCase() : '';
  if (requestedCurrency && requestedCurrency !== currency) {
    return failed('The listing currency changed. Please review the watch and try again.');
  }

  const applicationResult = await latestDealerApplication(product.dealer_id);
  if (applicationResult.error) return failed(inquiryServiceError(applicationResult.error));
  if (applicationResult.data?.status !== 'approved') {
    return failed('This dealer is not currently approved to receive purchase inquiries.');
  }

  const since = new Date(Date.now() - 86_400_000).toISOString();
  const { count, error: countError } = await supabaseAdmin
    .from('dealer_inquiries')
    .select('id', { count: 'exact', head: true })
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', user.id)
    .gte('created_at', since);
  if (countError) return failed(inquiryServiceError(countError));
  if ((count || 0) >= MAX_DAILY_INQUIRIES) {
    return failed('You have reached today’s inquiry limit. Please try again later.');
  }

  const now = new Date().toISOString();
  const row = {
    store_id: STORE_ID,
    product_id: product.id,
    buyer_user_id: user.id,
    dealer_user_id: product.dealer_id,
    seller_kind: SELLER_KIND_DEALER,
    buyer_name: cleanText(user.fullName, 160) || 'Buyer',
    dealer_name: cleanText(applicationResult.data.company_name, 200) || 'Dealer',
    product_name: cleanText(product.name, 500) || 'Watch',
    product_slug: cleanText(product.slug, 500) || product.id,
    product_image: firstProductImage(product.images),
    intent,
    status: 'pending',
    listing_price: listingPrice,
    currency,
    buyer_offer_amount: intent === 'offer' ? offerAmount : null,
    buyer_message: buyerMessage,
    updated_at: now,
  };
  const { data, error } = await supabaseAdmin
    .from('dealer_inquiries')
    .insert(row)
    .select('*')
    .single();

  if (error?.code === '23505') return failed('You already have an open inquiry for this watch.');
  if (error) return failed(inquiryServiceError(error));

  await notifyUser({
    userId: product.dealer_id,
    type: 'dealer_inquiry_created',
    title: intent === 'offer' ? 'New offer received' : 'New quote request',
    body: `${row.buyer_name} contacted you about ${row.product_name}.`,
    linkPath: '/portal/sales-inquiries',
  });
  return { ok: true, error: null, inquiry: shapeInquiry(data) };
}

export async function createKarivOffer(input = {}) {
  const user = await requireUser();
  if (!user.emailVerified) return failed('Verify your email address before making an offer.');

  const productId = typeof input?.productId === 'string' ? input.productId.trim() : '';
  const buyerMessage = cleanText(input?.message ?? input?.buyerMessage);
  const rawMessage = typeof (input?.message ?? input?.buyerMessage) === 'string'
    ? (input.message ?? input.buyerMessage).trim()
    : '';
  const offerAmount = money(input?.offerAmount ?? input?.amount);
  const locale = ['en', 'de', 'cs'].includes(input?.locale) ? input.locale : 'en';

  if (!productId) return failed('Choose a watch before making an offer.');
  if (offerAmount == null) return failed('Enter a valid offer amount.');
  if (rawMessage.length > MAX_MESSAGE_LENGTH) return failed(`Messages cannot exceed ${MAX_MESSAGE_LENGTH.toLocaleString('en-US')} characters.`);

  const { data: product, error: productError } = await supabaseAdmin
    .from('products')
    .select('id, dealer_id, name, slug, images, price, sale_price, currency, status, stock_quantity')
    .eq('store_id', STORE_ID)
    .eq('id', productId)
    .is('dealer_id', null)
    .maybeSingle();
  if (productError) return failed(inquiryServiceError(productError));
  if (!product || product.status !== 'active' || Number(product.stock_quantity || 0) < 1) {
    return failed('This Kariv watch is no longer available for offers.');
  }

  const exchangeRates = locale === 'cs' ? await getCzkExchangeRates() : null;
  const pricing = getProductPricing({
    price: product.price,
    salePrice: product.sale_price,
    currency: product.currency,
  }, { locale, exchangeRates });
  const listingPrice = money(pricing.price);
  const currency = String(pricing.currency || '').trim().toUpperCase();
  if (listingPrice == null || !/^[A-Z]{3}$/.test(currency)) {
    return failed('This listing does not have valid pricing information.');
  }
  const requestedCurrency = typeof input?.currency === 'string' ? input.currency.trim().toUpperCase() : '';
  if (requestedCurrency && requestedCurrency !== currency) {
    return failed('The listing currency changed. Please review the watch and try again.');
  }

  const since = new Date(Date.now() - 86_400_000).toISOString();
  const { count, error: countError } = await supabaseAdmin
    .from('dealer_inquiries')
    .select('id', { count: 'exact', head: true })
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', user.id)
    .gte('created_at', since);
  if (countError) return failed(inquiryServiceError(countError));
  if ((count || 0) >= MAX_DAILY_INQUIRIES) {
    return failed('You have reached today’s inquiry limit. Please try again later.');
  }

  const now = new Date().toISOString();
  const row = {
    store_id: STORE_ID,
    product_id: product.id,
    buyer_user_id: user.id,
    dealer_user_id: null,
    seller_kind: SELLER_KIND_KARIV,
    buyer_name: cleanText(user.fullName, 160) || 'Buyer',
    dealer_name: 'Kariv Glamour',
    product_name: cleanText(product.name, 500) || 'Watch',
    product_slug: cleanText(product.slug, 500) || product.id,
    product_image: firstProductImage(product.images),
    intent: 'offer',
    status: 'pending',
    listing_price: listingPrice,
    currency,
    buyer_offer_amount: offerAmount,
    buyer_message: buyerMessage,
    updated_at: now,
  };
  const { data, error } = await supabaseAdmin
    .from('dealer_inquiries')
    .insert(row)
    .select('*')
    .single();

  if (error?.code === '23505') return failed('You already have an open offer for this watch.');
  if (error) return failed(inquiryServiceError(error));
  return { ok: true, error: null, inquiry: shapeInquiry(data) };
}

/** @param {{ status?: string, limit?: number } | number} [options] */
export async function listMyBuyerInquiries(options = {}) {
  const user = await requireUser();
  let query = supabaseAdmin
    .from('dealer_inquiries')
    .select('*')
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(listLimit(options));
  const status = typeof options === 'object' ? options?.status : null;
  if (INQUIRY_STATUSES.has(status)) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) return { ok: false, error: inquiryServiceError(error), inquiries: [] };
  return { ok: true, error: null, inquiries: (data || []).map(shapeInquiry) };
}

/** @param {{ status?: string, limit?: number } | number} [options] */
export async function listMyDealerInquiries(options = {}) {
  const dealer = await requireDealer();
  let query = supabaseAdmin
    .from('dealer_inquiries')
    .select('*')
    .eq('store_id', STORE_ID)
    .eq('seller_kind', SELLER_KIND_DEALER)
    .eq('dealer_user_id', dealer.id)
    .order('created_at', { ascending: false })
    .limit(listLimit(options));
  const status = typeof options === 'object' ? options?.status : null;
  if (INQUIRY_STATUSES.has(status)) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) return { ok: false, error: inquiryServiceError(error), inquiries: [] };
  return { ok: true, error: null, inquiries: (data || []).map(shapeInquiry) };
}

export async function respondToDealerInquiry(input = {}, legacyAction, legacyData = {}) {
  const dealer = await requireDealer();
  const payload = typeof input === 'string'
    ? { ...legacyData, inquiryId: input, action: legacyAction }
    : input;
  const inquiryId = typeof payload?.inquiryId === 'string' ? payload.inquiryId.trim() : '';
  const action = normalizeResponseAction(payload?.action ?? payload?.response);
  const responseMessage = cleanText(payload?.message ?? payload?.responseMessage);
  const rawMessage = typeof (payload?.message ?? payload?.responseMessage) === 'string'
    ? (payload.message ?? payload.responseMessage).trim()
    : '';
  const responseAmount = money(payload?.amount ?? payload?.responseAmount ?? payload?.offerAmount);

  if (!inquiryId) return failed('Inquiry not found.');
  if (!RESPONSE_ACTIONS.has(action)) return failed('Choose accept, decline, counter, or quote.');
  if (rawMessage.length > MAX_MESSAGE_LENGTH) return failed(`Messages cannot exceed ${MAX_MESSAGE_LENGTH.toLocaleString('en-US')} characters.`);

  const { data: inquiry, error: inquiryError } = await supabaseAdmin
    .from('dealer_inquiries')
    .select('*')
    .eq('id', inquiryId)
    .eq('store_id', STORE_ID)
    .eq('seller_kind', SELLER_KIND_DEALER)
    .eq('dealer_user_id', dealer.id)
    .maybeSingle();
  if (inquiryError) return failed(inquiryServiceError(inquiryError));
  if (!inquiry) return failed('Inquiry not found.');
  if (inquiry.status !== 'pending') return failed('This inquiry has already been answered or withdrawn.');
  if (action === 'counter' && inquiry.intent !== 'offer') return failed('Only an offer can receive a counteroffer.');
  if (action === 'quote' && inquiry.intent !== 'purchase_request') return failed('Only a quote request can receive a quote.');
  if ((action === 'counter' || action === 'quote') && responseAmount == null) {
    return failed('Enter a valid response amount.');
  }

  // Declining is deliberately allowed when a listing has just sold or been
  // removed. Positive responses are allowed only while this dealer still owns
  // an active, in-stock listing and remains approved.
  if (action !== 'decline') {
    const [{ data: product, error: productError }, applicationResult] = await Promise.all([
      supabaseAdmin
        .from('products')
        .select('id, dealer_id, status, stock_quantity')
        .eq('store_id', STORE_ID)
        .eq('id', inquiry.product_id)
        .maybeSingle(),
      latestDealerApplication(dealer.id),
    ]);
    if (productError || applicationResult.error) return failed(inquiryServiceError(productError || applicationResult.error));
    if (!product || product.dealer_id !== dealer.id || product.status !== 'active' || Number(product.stock_quantity || 0) < 1) {
      return failed('This watch is no longer available. You may decline the inquiry instead.');
    }
    if (applicationResult.data?.status !== 'approved') {
      return failed('Your dealer approval is not currently active.');
    }
  }

  const status = action === 'accept'
    ? 'accepted'
    : action === 'decline'
      ? 'declined'
      : action === 'counter'
        ? 'countered'
        : 'quoted';
  const acceptedAmount = inquiry.intent === 'offer'
    ? money(inquiry.buyer_offer_amount)
    : money(inquiry.listing_price);
  const dealerResponseAmount = action === 'accept'
    ? acceptedAmount
    : action === 'decline'
      ? null
      : responseAmount;
  if (action === 'accept' && dealerResponseAmount == null) return failed('The inquiry amount is no longer valid.');

  const now = new Date().toISOString();
  const { data, error } = await supabaseAdmin
    .from('dealer_inquiries')
    .update({
      status,
      dealer_response_amount: dealerResponseAmount,
      dealer_message: responseMessage,
      dealer_responded_at: now,
      updated_at: now,
    })
    .eq('id', inquiry.id)
    .eq('store_id', STORE_ID)
    .eq('seller_kind', SELLER_KIND_DEALER)
    .eq('dealer_user_id', dealer.id)
    .eq('status', 'pending')
    .select('*')
    .maybeSingle();
  if (error) return failed(inquiryServiceError(error));
  if (!data) return failed('This inquiry changed while you were responding. Refresh and try again.');

  const titleByStatus = {
    accepted: 'Your offer was accepted',
    declined: 'Dealer inquiry update',
    countered: 'You received a counteroffer',
    quoted: 'Your quote is ready',
  };
  await notifyUser({
    userId: data.buyer_user_id,
    type: 'dealer_inquiry_updated',
    title: titleByStatus[status],
    body: `${data.dealer_name} responded about ${data.product_name}.`,
    linkPath: '/portal/inquiries',
  });
  return { ok: true, error: null, inquiry: shapeInquiry(data) };
}

/** @param {{ status?: string, limit?: number }} [options] */
export async function listKarivOffers(options = {}) {
  await requireAdmin();
  let query = supabaseAdmin
    .from('dealer_inquiries')
    .select('*')
    .eq('store_id', STORE_ID)
    .eq('seller_kind', SELLER_KIND_KARIV)
    .order('created_at', { ascending: false })
    .limit(listLimit(options));
  const status = typeof options === 'object' ? options?.status : null;
  if (INQUIRY_STATUSES.has(status)) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) return { ok: false, error: inquiryServiceError(error), inquiries: [] };
  return { ok: true, error: null, inquiries: (data || []).map(shapeInquiry) };
}

export async function respondToKarivOffer(input = {}) {
  const admin = await requireAdmin();
  const inquiryId = typeof input?.inquiryId === 'string' ? input.inquiryId.trim() : '';
  const action = String(input?.action || '').trim().toLowerCase();
  const responseMessage = cleanText(input?.message ?? input?.responseMessage);
  const rawMessage = typeof (input?.message ?? input?.responseMessage) === 'string'
    ? (input.message ?? input.responseMessage).trim()
    : '';

  if (!inquiryId) return failed('Offer not found.');
  if (!['accept', 'decline'].includes(action)) return failed('Choose accept or decline.');
  if (rawMessage.length > MAX_MESSAGE_LENGTH) return failed(`Messages cannot exceed ${MAX_MESSAGE_LENGTH.toLocaleString('en-US')} characters.`);

  const { data: inquiry, error: inquiryError } = await supabaseAdmin
    .from('dealer_inquiries')
    .select('*')
    .eq('id', inquiryId)
    .eq('store_id', STORE_ID)
    .eq('seller_kind', SELLER_KIND_KARIV)
    .is('dealer_user_id', null)
    .maybeSingle();
  if (inquiryError) return failed(inquiryServiceError(inquiryError));
  if (!inquiry || inquiry.intent !== 'offer') return failed('Offer not found.');
  if (inquiry.status !== 'pending') return failed('This offer has already been answered or withdrawn.');

  if (action === 'accept') {
    const { data: product, error: productError } = await supabaseAdmin
      .from('products')
      .select('id, dealer_id, status, stock_quantity')
      .eq('store_id', STORE_ID)
      .eq('id', inquiry.product_id)
      .is('dealer_id', null)
      .maybeSingle();
    if (productError) return failed(inquiryServiceError(productError));
    if (!product || product.status !== 'active' || Number(product.stock_quantity || 0) < 1) {
      return failed('This watch is no longer available. Decline the offer instead.');
    }
  }

  const now = new Date().toISOString();
  const status = action === 'accept' ? 'accepted' : 'declined';
  const responseAmount = action === 'accept' ? money(inquiry.buyer_offer_amount) : null;
  if (action === 'accept' && responseAmount == null) return failed('The offer amount is no longer valid.');

  const { data, error } = await supabaseAdmin
    .from('dealer_inquiries')
    .update({
      status,
      dealer_response_amount: responseAmount,
      dealer_message: responseMessage,
      dealer_responded_at: now,
      updated_at: now,
      responded_by_user_id: admin.id,
    })
    .eq('id', inquiry.id)
    .eq('store_id', STORE_ID)
    .eq('seller_kind', SELLER_KIND_KARIV)
    .is('dealer_user_id', null)
    .eq('status', 'pending')
    .select('*')
    .maybeSingle();
  if (error) return failed(inquiryServiceError(error));
  if (!data) return failed('This offer changed while you were responding. Refresh and try again.');

  await notifyUser({
    userId: data.buyer_user_id,
    type: 'kariv_offer_updated',
    title: status === 'accepted' ? 'Your offer was accepted' : 'Your offer was declined',
    body: `Kariv Glamour responded to your offer for ${data.product_name}.`,
    linkPath: '/portal/inquiries',
  });
  return { ok: true, error: null, inquiry: shapeInquiry(data) };
}

export async function withdrawDealerInquiry(input) {
  const user = await requireUser();
  const inquiryId = typeof input === 'string'
    ? input.trim()
    : typeof input?.inquiryId === 'string'
      ? input.inquiryId.trim()
      : '';
  if (!inquiryId) return failed('Inquiry not found.');

  const now = new Date().toISOString();
  const { data, error } = await supabaseAdmin
    .from('dealer_inquiries')
    .update({ status: 'withdrawn', buyer_withdrawn_at: now, updated_at: now })
    .eq('id', inquiryId)
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', user.id)
    .in('status', OPEN_INQUIRY_STATUSES)
    .select('*')
    .maybeSingle();
  if (error) return failed(inquiryServiceError(error));
  if (!data) return failed('Only your own open inquiry can be withdrawn.');

  if ((data.seller_kind || SELLER_KIND_DEALER) === SELLER_KIND_DEALER && data.dealer_user_id) {
    await notifyUser({
      userId: data.dealer_user_id,
      type: 'dealer_inquiry_withdrawn',
      title: 'Inquiry withdrawn',
      body: `${data.buyer_name} withdrew the inquiry about ${data.product_name}.`,
      linkPath: '/portal/sales-inquiries',
    });
  }
  return { ok: true, error: null, inquiry: shapeInquiry(data) };
}
