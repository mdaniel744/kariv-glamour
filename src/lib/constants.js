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

export const BRAND_LOGOS = {
  "rolex": "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/d565f9b76_RolexLogo.svg",
  "patek-philippe": "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/f4bf21975_PatekPhilippeLogo.svg",
  "omega": "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/711da8f99_OmegaWatchesLogo.svg",
  "cartier": "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/446c28c26_Cartier.svg",
  "audemars-piguet": "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/0295b16b6_AudemarsPiguetlogoblack.svg",
  "breitling": "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/b66c03d45_Breitling1884.svg",
  "hublot": "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/504665e88_HublotLogo.svg",
  "grand-seiko": "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/cb784ea15_GrandSeiko.svg",
  "tag-heuer": "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/5087a4d1c_TagHeuerLogo.svg",
  "tudor": "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/0f27e79fb_TudorLogo.svg",
  "bvlgari": "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/2e66a7b94_bvlgarikaufen.svg",
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