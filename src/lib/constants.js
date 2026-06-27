export const BRAND_DATA = [
  { name: "Rolex", slug: "rolex" },
  { name: "Patek Philippe", slug: "patek-philippe" },
  { name: "Omega", slug: "omega" },
  { name: "Cartier", slug: "cartier" },
  { name: "Audemars Piguet", slug: "audemars-piguet" },
  { name: "Breitling", slug: "breitling" },
  { name: "Hublot", slug: "hublot" },
  { name: "Grand Seiko", slug: "grand-seiko" },
  { name: "IWC Schaffhausen", slug: "iwc" },
  { name: "Jaeger-LeCoultre", slug: "jaeger-lecoultre" },
  { name: "TAG Heuer", slug: "tag-heuer" },
  { name: "Tudor", slug: "tudor" },
  { name: "Panerai", slug: "panerai" },
  { name: "Bvlgari", slug: "bvlgari" },
  { name: "Girard-Perregaux", slug: "girard-perregaux" }
];

export const DIAL_COLORS = ["Black", "Blue", "Green", "Gray", "Silver", "White", "Brown", "Champagne", "Pink", "Red", "Violet", "Orange", "Yellow", "Mother of Pearl", "Skeleton", "Pavé", "Beige"];

export const CASE_MATERIALS = ["Stainless Steel", "Yellow Gold", "Rose Gold", "White Gold", "Platinum", "Titanium", "Ceramic", "Carbon", "Bronze", "Two-Tone", "Steel and Gold", "Steel and Rose Gold"];

export const BRACELET_MATERIALS = ["Steel", "Titanium", "Yellow Gold", "Rose Gold", "White Gold", "Platinum", "Rubber", "Leather", "Alligator Leather", "Textile", "Nylon", "Ceramic"];

export const MOVEMENT_TYPES = ["Automatic", "Self-winding", "Manual-winding", "Quartz", "Spring Drive", "Hi-Beat", "Mechanical", "Tourbillon", "Chronograph"];

export const CONDITIONS = ["New", "Unworn", "Excellent", "Very Good", "Good", "Vintage"];

export const GENDERS = ["Men", "Women", "Unisex"];

export const WATCH_SHAPES = ["Round", "Rectangular", "Square", "Oval", "Cushion", "Tonneau", "Octagonal"];

export const SORT_OPTIONS = [
  { value: "-created_date", label: "Newest First" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "brand", label: "Brand A–Z" },
  { value: "-brand", label: "Brand Z–A" }
];

export const BRAND_DISCLAIMER = "Kariv Glamour is an independent luxury watch ecommerce platform. Unless expressly stated, Kariv Glamour is not affiliated with, endorsed by, or an official authorized dealer of the brands displayed on this website. Brand names, model names, and trademarks are used only to identify authentic products available for sale.";

export const formatPrice = (price, currency = "EUR") => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(price);
};