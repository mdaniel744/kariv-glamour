// The initial shop cards are server-rendered for crawlers. Send only fields
// those cards (including the image gallery and wishlist action) need; full
// catalogue records can carry long descriptions and inflate the HTML heavily.
export function shopCardProduct(product) {
  return {
    id: product.id,
    slug: product.slug,
    productTitle: product.productTitle,
    productTitle_en: product.productTitle_en,
    productTitle_de: product.productTitle_de,
    productTitle_cs: product.productTitle_cs,
    brand: product.brand,
    featuredImage: product.featuredImage,
    productImages: product.productImages,
    images: product.images,
    price: product.price,
    salePrice: product.salePrice,
    currency: product.currency,
    isNewArrival: product.isNewArrival,
    condition: product.condition,
    yearOfProduction: product.yearOfProduction,
    authenticationStatus: product.authenticationStatus,
  };
}
