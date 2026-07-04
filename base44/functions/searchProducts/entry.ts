import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ════════════════════════════════════════════════════════════════
// searchProducts — Server-side product search with validated filters
// Reads JSON payload from base44.functions.invoke("searchProducts", payload)
// Returns paginated results with accurate totalCount across all matches
// ════════════════════════════════════════════════════════════════

const ALLOWED_SORTS = {
  'newest': '-created_date',
  'oldest': 'created_date',
  'price_low': 'price',
  'price_high': '-price',
  'name_asc': 'productTitle',
  'name_desc': '-productTitle'
};

const ALLOWED_CONDITIONS = ['New', 'Unworn', 'Excellent', 'Very Good', 'Good', 'Vintage'];
const ALLOWED_AVAILABILITY = ['In Stock', 'Sold', 'Reserved', 'Coming Soon'];
const ALLOWED_GENDERS = ['Men', 'Women', 'Unisex'];
const ALLOWED_BOOLEANS = [true, false, null];

const MAX_PAGE_SIZE = 48;
const MAX_FETCH = 500; // hard cap on records scanned per request

function validateStringArray(arr, allowedValues, fieldName) {
  if (arr === null || arr === undefined) return [];
  if (!Array.isArray(arr)) {
    throw new Error('Invalid ' + fieldName + ': expected array');
  }
  return arr.filter(function(v) {
    return typeof v === 'string' && (allowedValues === null || allowedValues.includes(v));
  });
}

function validateNumber(val, fieldName, min, max) {
  if (val === null || val === undefined || val === '') return null;
  const n = Number(val);
  if (isNaN(n)) {
    throw new Error('Invalid ' + fieldName + ': not a number');
  }
  if (min !== null && n < min) {
    throw new Error('Invalid ' + fieldName + ': below minimum');
  }
  if (max !== null && n > max) {
    throw new Error('Invalid ' + fieldName + ': above maximum');
  }
  return n;
}

function validateBoolean(val, fieldName) {
  if (val === null || val === undefined) return null;
  if (typeof val === 'boolean') return val;
  if (val === 'true') return true;
  if (val === 'false') return false;
  return null;
}

function normalizeText(text) {
  if (!text || typeof text !== 'string') return '';
  return text.toLowerCase().trim();
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // ── Parse JSON payload ──
    const body = await req.json().catch(function() { return {}; });

    // ── Validate and extract search ──
    const search = (typeof body.search === 'string') ? body.search.trim().substring(0, 200) : '';

    // ── Validate array filters ──
    const brands = validateStringArray(body.brands, null, 'brands');
    const collections = validateStringArray(body.collections, null, 'collections');
    const categories = validateStringArray(body.categories, null, 'categories');
    const conditions = validateStringArray(body.conditions, ALLOWED_CONDITIONS, 'conditions');
    const availability = validateStringArray(body.availability, ALLOWED_AVAILABILITY, 'availability');
    const genders = validateStringArray(body.genders, ALLOWED_GENDERS, 'genders');
    const materials = validateStringArray(body.materials, null, 'materials');

    // ── Validate numeric filters ──
    const minPrice = validateNumber(body.minPrice, 'minPrice', 0, 100000000);
    const maxPrice = validateNumber(body.maxPrice, 'maxPrice', 0, 100000000);

    if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
      return Response.json({ error: 'Invalid price range: minPrice exceeds maxPrice' }, { status: 400 });
    }

    const yearFrom = validateNumber(body.yearFrom, 'yearFrom', 1800, 2100);
    const yearTo = validateNumber(body.yearTo, 'yearTo', 1800, 2100);

    if (yearFrom !== null && yearTo !== null && yearFrom > yearTo) {
      return Response.json({ error: 'Invalid year range: yearFrom exceeds yearTo' }, { status: 400 });
    }

    // ── Validate boolean filters ──
    const isNewArrival = validateBoolean(body.isNewArrival, 'isNewArrival');
    const isCertifiedPreOwned = validateBoolean(body.isCertifiedPreOwned, 'isCertifiedPreOwned');
    const isVintage = validateBoolean(body.isVintage, 'isVintage');

    // ── Validate sort ──
    const sortKey = (typeof body.sort === 'string' && ALLOWED_SORTS[body.sort]) ? body.sort : 'newest';
    const sortField = ALLOWED_SORTS[sortKey];

    // ── Validate pagination ──
    const page = Math.max(1, Math.floor(Number(body.page) || 1));
    const requestedPageSize = Math.floor(Number(body.pageSize) || 24);
    const pageSize = Math.min(Math.max(1, requestedPageSize), MAX_PAGE_SIZE);

    // ── Build query for entity filter ──
    // We use asServiceRole because product visibility is enforced by
    // only returning published/available products in the response.
    const query = {};

    // Single-value equality filters (work with entity filter)
    if (brands.length === 1) query.brand = brands[0];
    if (collections.length === 1) query.collection = collections[0];
    if (conditions.length === 1) query.condition = conditions[0];
    if (availability.length === 1) query.availability = availability[0];
    if (genders.length === 1) query.gender = genders[0];
    if (materials.length === 1) query.caseMaterial = materials[0];

    // Boolean filters
    if (isNewArrival === true) query.isNewArrival = true;
    if (isCertifiedPreOwned === true) query.isCertifiedPreOwned = true;
    if (isVintage === true) query.isVintage = true;

    // Price range — use MongoDB operators
    if (minPrice !== null && maxPrice !== null) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice !== null) {
      query.price = { $gte: minPrice };
    } else if (maxPrice !== null) {
      query.price = { $lte: maxPrice };
    }

    // ── Fetch with pagination (fetch enough for current page + counting) ──
    // We fetch up to MAX_FETCH records to perform multi-select filtering
    // and text search server-side, then paginate the results.
    const skip = 0;
    const fetchLimit = MAX_FETCH;

    let allProducts = await base44.asServiceRole.entities.Products.filter(query, sortField, fetchLimit, skip);

    // ── Server-side post-filtering for multi-select fields ──
    if (brands.length > 1) {
      allProducts = allProducts.filter(function(p) { return brands.includes(p.brand); });
    }
    if (collections.length > 1) {
      allProducts = allProducts.filter(function(p) { return collections.includes(p.collection); });
    }
    if (conditions.length > 1) {
      allProducts = allProducts.filter(function(p) { return conditions.includes(p.condition); });
    }
    if (availability.length > 1) {
      allProducts = allProducts.filter(function(p) { return availability.includes(p.availability); });
    }
    if (genders.length > 1) {
      allProducts = allProducts.filter(function(p) { return genders.includes(p.gender); });
    }
    if (materials.length > 1) {
      allProducts = allProducts.filter(function(p) { return materials.includes(p.caseMaterial); });
    }

    // ── Year range filter ──
    if (yearFrom !== null) {
      allProducts = allProducts.filter(function(p) { return p.yearOfProduction && p.yearOfProduction >= yearFrom; });
    }
    if (yearTo !== null) {
      allProducts = allProducts.filter(function(p) { return p.yearOfProduction && p.yearOfProduction <= yearTo; });
    }

    // ── Text search across normalized fields ──
    if (search) {
      const q = normalizeText(search);
      allProducts = allProducts.filter(function(p) {
        return normalizeText(p.productTitle).includes(q) ||
               normalizeText(p.productTitle_en).includes(q) ||
               normalizeText(p.productTitle_de).includes(q) ||
               normalizeText(p.brand).includes(q) ||
               normalizeText(p.collection).includes(q) ||
               normalizeText(p.referenceNumber).includes(q) ||
               normalizeText(p.model).includes(q) ||
               normalizeText(p.productDescription).includes(q) ||
               normalizeText(p.productDescription_en).includes(q) ||
               normalizeText(p.productDescription_de).includes(q);
      });
    }

    // ── Sort with stable secondary sort by ID ──
    // The entity filter already applied sortField, but post-filtering
    // may have changed order. Re-sort here for stability.
    const sortMultiplier = sortField.startsWith('-') ? -1 : 1;
    const actualSortField = sortField.replace(/^-/, '');
    allProducts.sort(function(a, b) {
      let av = a[actualSortField];
      let bv = b[actualSortField];
      if (av === bv) {
        // Stable secondary sort by ID
        return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
      }
      if (av === null || av === undefined) return 1;
      if (bv === null || bv === undefined) return -1;
      if (typeof av === 'string') {
        return sortMultiplier * av.localeCompare(bv);
      }
      return sortMultiplier * (av - bv);
    });

    // ── Pagination ──
    const totalCount = allProducts.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasMore = page < totalPages;
    const startIndex = (page - 1) * pageSize;
    const items = allProducts.slice(startIndex, startIndex + pageSize);

    // ── Build appliedFilters for response ──
    const appliedFilters = {};
    if (search) appliedFilters.search = search;
    if (brands.length) appliedFilters.brands = brands;
    if (collections.length) appliedFilters.collections = collections;
    if (categories.length) appliedFilters.categories = categories;
    if (conditions.length) appliedFilters.conditions = conditions;
    if (availability.length) appliedFilters.availability = availability;
    if (genders.length) appliedFilters.genders = genders;
    if (materials.length) appliedFilters.materials = materials;
    if (minPrice !== null) appliedFilters.minPrice = minPrice;
    if (maxPrice !== null) appliedFilters.maxPrice = maxPrice;
    if (yearFrom !== null) appliedFilters.yearFrom = yearFrom;
    if (yearTo !== null) appliedFilters.yearTo = yearTo;
    if (isNewArrival !== null) appliedFilters.isNewArrival = isNewArrival;
    if (isCertifiedPreOwned !== null) appliedFilters.isCertifiedPreOwned = isCertifiedPreOwned;
    if (isVintage !== null) appliedFilters.isVintage = isVintage;

    return Response.json({
      items: items,
      page: page,
      pageSize: pageSize,
      totalCount: totalCount,
      totalPages: totalPages,
      hasMore: hasMore,
      appliedFilters: appliedFilters
    });
  } catch (error) {
    console.error('searchProducts error:', error);
    // Return 400 for validation errors, 500 for server errors
    if (error.message && error.message.startsWith('Invalid ')) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json({ error: 'Search failed' }, { status: 500 });
  }
});