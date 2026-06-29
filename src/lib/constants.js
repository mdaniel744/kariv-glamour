export const BRAND_DATA = [
  { name: "Rolex", slug: "rolex" },
  { name: "Patek Philippe", slug: "patek-philippe" },
  { name: "Omega", slug: "omega" },
  { name: "Cartier", slug: "cartier" },
  { name: "Audemars Piguet", slug: "audemars-piguet" },
  { name: "Breitling", slug: "breitling" },
  { name: "Hublot", slug: "hublot" },
  { name: "Grand Seiko", slug: "grand-seiko" },
  { name: "IWC Schaffhausen", slug: "iwc-schaffhausen" },
  { name: "Jaeger-LeCoultre", slug: "jaeger-lecoultre" },
  { name: "TAG Heuer", slug: "tag-heuer" },
  { name: "Tudor", slug: "tudor" },
  { name: "Panerai", slug: "panerai" },
  { name: "Bvlgari", slug: "bvlgari" },
  { name: "Girard-Perregaux", slug: "girard-perregaux" }
];

// ============================================================================
// BRAND_LOGOS — Theme-aware brand logo assets
// ----------------------------------------------------------------------------
// Each brand has TWO logo variants:
//   light  → dark-colored logo shape, displayed on LIGHT/white backgrounds
//   dark   → white-colored logo shape, displayed on DARK/black backgrounds
//
// Upload guidelines:
//   - Format: SVG (vector, transparent background) preferred
//   - Width: ~400px
//   - light: logo shape in black or dark color
//   - dark:  logo shape in white or light color
//   - Ensure clear/transparent background (no solid fill behind the shape)
//
// To add a new logo: upload both variants, then add a new entry below
// keyed by the brand slug (must match BRAND_DATA slug).
// If a dark variant is not yet uploaded, leave `dark` as "" — the BrandLogo
// component will automatically fall back to the light variant.
// ============================================================================
export const BRAND_LOGOS = {
  "rolex": {
    light: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/d565f9b76_RolexLogo.svg",
    dark: ""
  },
  "patek-philippe": {
    light: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/f4bf21975_PatekPhilippeLogo.svg",
    dark: ""
  },
  "omega": {
    light: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/711da8f99_OmegaWatchesLogo.svg",
    dark: ""
  },
  "cartier": {
    light: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/446c28c26_Cartier.svg",
    dark: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/74d2ad8ac_Cartierwhitelogo.svg"
  },
  "audemars-piguet": {
    light: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/0295b16b6_AudemarsPiguetlogoblack.svg",
    dark: ""
  },
  "breitling": {
    light: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/b66c03d45_Breitling1884.svg",
    dark: ""
  },
  "hublot": {
    light: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/504665e88_HublotLogo.svg",
    dark: ""
  },
  "grand-seiko": {
    light: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/cb784ea15_GrandSeiko.svg",
    dark: ""
  },
  "tag-heuer": {
    light: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/5087a4d1c_TagHeuerLogo.svg",
    dark: ""
  },
  "tudor": {
    light: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/0f27e79fb_TudorLogo.svg",
    dark: ""
  },
  "bvlgari": {
    light: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/2e66a7b94_bvlgarikaufen.svg",
    dark: ""
  },
};

// ============================================================================
// BRAND_FAVICONS — Small brand marks for menus, filters, and compact UI.
// ----------------------------------------------------------------------------
// Two variants per brand (same convention as BRAND_LOGOS):
//   light  → dark-colored mark, shown on LIGHT/white backgrounds
//   dark   → white-colored mark, shown on DARK/black backgrounds
//
// Only brands with a provided favicon file appear here. Brands without an
// entry render as plain text (no icon) via the BrandFavicon component.
// Upload the missing variants and add entries below as they become available.
// ============================================================================
export const BRAND_FAVICONS = {
  "rolex": {
    light: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/de44bd3d1_RolexFavicon.svg",
    dark: ""
  },
  "patek-philippe": {
    light: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/f13729613_PatekPhilippeFavicon.svg",
    dark: ""
  },
  "audemars-piguet": {
    light: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/66ee9e565_AudemarsPiguetFavicon.svg",
    dark: ""
  },
  "breitling": {
    light: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/14578ef90_BreitlingLogoFavicon.svg",
    dark: ""
  },
  "hublot": {
    light: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/88042f5e7_HublotFavicon.svg",
    dark: ""
  },
};

export const DIAL_COLORS = ["Black", "Blue", "Green", "Gray", "Silver", "White", "Brown", "Champagne", "Pink", "Red", "Violet", "Orange", "Yellow", "Mother of Pearl", "Skeleton", "Pavé", "Beige"];

export const CASE_MATERIALS = ["Stainless Steel", "Yellow Gold", "Rose Gold", "White Gold", "Platinum", "Titanium", "Ceramic", "Carbon", "Bronze", "Two-Tone", "Steel and Gold", "Steel and Rose Gold"];

export const BRACELET_MATERIALS = ["Steel", "Titanium", "Yellow Gold", "Rose Gold", "White Gold", "Platinum", "Rubber", "Leather", "Alligator Leather", "Textile", "Nylon", "Ceramic"];

export const MOVEMENT_TYPES = ["Automatic", "Self-winding", "Manual-winding", "Quartz", "Spring Drive", "Hi-Beat", "Mechanical", "Tourbillon", "Chronograph"];

export const CONDITIONS = ["New", "Unworn", "Excellent", "Very Good", "Good", "Vintage"];

export const GENDERS = ["Men", "Women", "Unisex"];

export const WATCH_SHAPES = ["Round", "Rectangular", "Square", "Oval", "Cushion", "Tonneau", "Octagonal"];

export const SORT_OPTIONS = [
  { value: "-created_date", label: "Neueste zuerst" },
  { value: "price", label: "Preis: Niedrig zu Hoch" },
  { value: "-price", label: "Preis: Hoch zu Niedrig" },
  { value: "brand", label: "Marke A–Z" },
  { value: "-brand", label: "Marke Z–A" }
];

export const BRAND_DISCLAIMER = "Kariv Glamour is an independent luxury watch ecommerce platform. Unless expressly stated, Kariv Glamour is not affiliated with, endorsed by, or an official authorized dealer of the brands displayed on this website. Brand names, model names, and trademarks are used only to identify authentic products available for sale.";

export const formatPrice = (price, currency = "EUR") => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(price);
};