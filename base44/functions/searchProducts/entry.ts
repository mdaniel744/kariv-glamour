import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Parse query params
    const url = new URL(req.url);
    const sortBy = url.searchParams.get('sortBy') || '-created_date';
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 100);
    const skip = parseInt(url.searchParams.get('skip') || '0');
    
    // Filter params
    const brand = url.searchParams.getAll('brand');
    const condition = url.searchParams.getAll('condition');
    const gender = url.searchParams.getAll('gender');
    const caseMaterial = url.searchParams.getAll('caseMaterial');
    const dialColor = url.searchParams.getAll('dialColor');
    const movementType = url.searchParams.getAll('movementType');
    const priceMin = url.searchParams.get('priceMin');
    const priceMax = url.searchParams.get('priceMax');
    const isNewArrival = url.searchParams.get('isNewArrival') === 'true';
    const isCertifiedPreOwned = url.searchParams.get('isCertifiedPreOwned') === 'true';
    const isVintage = url.searchParams.get('isVintage') === 'true';
    const search = url.searchParams.get('search');
    const availability = url.searchParams.getAll('availability');

    // Build query object for single-value filters
    const query = {};
    
    if (brand.length === 1) query.brand = brand[0];
    if (condition.length === 1) query.condition = condition[0];
    if (gender.length === 1) query.gender = gender[0];
    if (caseMaterial.length === 1) query.caseMaterial = caseMaterial[0];
    if (dialColor.length === 1) query.dialColor = dialColor[0];
    if (movementType.length === 1) query.movementType = movementType[0];
    if (availability.length === 1) query.availability = availability[0];
    if (isNewArrival) query.isNewArrival = true;
    if (isCertifiedPreOwned) query.isCertifiedPreOwned = true;
    if (isVintage) query.isVintage = true;

    // Price range filters use MongoDB operators
    if (priceMin && priceMax) {
      query.price = { $gte: Number(priceMin), $lte: Number(priceMax) };
    } else if (priceMin) {
      query.price = { $gte: Number(priceMin) };
    } else if (priceMax) {
      query.price = { $lte: Number(priceMax) };
    }

    // Initial fetch with pagination
    let products = await base44.entities.Products.filter(query, sortBy, limit, skip);

    // Post-filter for multi-select fields
    if (brand.length > 1) {
      products = products.filter(p => brand.includes(p.brand));
    }
    if (condition.length > 1) {
      products = products.filter(p => condition.includes(p.condition));
    }
    if (gender.length > 1) {
      products = products.filter(p => gender.includes(p.gender));
    }
    if (caseMaterial.length > 0) {
      products = products.filter(p => caseMaterial.includes(p.caseMaterial));
    }
    if (dialColor.length > 0) {
      products = products.filter(p => dialColor.includes(p.dialColor));
    }
    if (movementType.length > 0) {
      products = products.filter(p => movementType.includes(p.movementType));
    }
    if (availability.length > 1) {
      products = products.filter(p => availability.includes(p.availability));
    }

    // Text search
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(p =>
        (p.productTitle || '').toLowerCase().includes(q) ||
        (p.productTitle_en || '').toLowerCase().includes(q) ||
        (p.productTitle_de || '').toLowerCase().includes(q) ||
        (p.brand || '').toLowerCase().includes(q) ||
        (p.collection || '').toLowerCase().includes(q) ||
        (p.referenceNumber || '').toLowerCase().includes(q)
      );
    }

    return Response.json({
      products,
      skip,
      limit,
      count: products.length,
      hasMore: products.length === limit
    });
  } catch (error) {
    return Response.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
});