import { ROLEX_COLLECTIONS } from '@/lib/rolexData';
import { PATEK_COLLECTIONS } from '@/lib/patekData';
import { OMEGA_COLLECTIONS } from '@/lib/omegaData';
import { CARTIER_COLLECTIONS } from '@/lib/cartierData';
import { HUBLOT_COLLECTIONS } from '@/lib/hublotData';
import { BREITLING_COLLECTIONS } from '@/lib/breitlingData';
import { AP_COLLECTIONS } from '@/lib/audemarsPiguetData';
import { GS_COLLECTIONS } from '@/lib/grandSeikoData';
import { IWC_COLLECTIONS } from '@/lib/iwcData';
import { JLC_COLLECTIONS } from '@/lib/jaegerLeCoultreData';
import { TH_COLLECTIONS } from '@/lib/tagHeuerData';
import { TUDOR_BLACK_BAY_SUBFAMILIES, TUDOR_COLLECTIONS } from '@/lib/tudorData';
import { PANERAI_COLLECTIONS } from '@/lib/paneraiData';
import { BVLGARI_COLLECTIONS } from '@/lib/bvlgariData';
import { GP_COLLECTIONS } from '@/lib/girardPerregauxData';

export const BRAND_COLLECTION_GROUPS = {
  rolex: { pageKey: 'rolex', brandName: 'Rolex', brandSlug: 'rolex', pathPrefix: 'rolex', collections: ROLEX_COLLECTIONS },
  patekPhilippe: { pageKey: 'patekPhilippe', brandName: 'Patek Philippe', brandSlug: 'patek-philippe', pathPrefix: 'patek-philippe', collections: PATEK_COLLECTIONS },
  omega: { pageKey: 'omega', brandName: 'Omega', brandSlug: 'omega', pathPrefix: 'omega', collections: OMEGA_COLLECTIONS },
  cartier: { pageKey: 'cartier', brandName: 'Cartier', brandSlug: 'cartier', pathPrefix: 'cartier', collections: CARTIER_COLLECTIONS },
  hublot: { pageKey: 'hublot', brandName: 'Hublot', brandSlug: 'hublot', pathPrefix: 'hublot', collections: HUBLOT_COLLECTIONS },
  breitling: { pageKey: 'breitling', brandName: 'Breitling', brandSlug: 'breitling', pathPrefix: 'breitling', collections: BREITLING_COLLECTIONS },
  audemarsPiguet: { pageKey: 'audemarsPiguet', brandName: 'Audemars Piguet', brandSlug: 'audemars-piguet', pathPrefix: 'audemars-piguet', collections: AP_COLLECTIONS },
  grandSeiko: { pageKey: 'grandSeiko', brandName: 'Grand Seiko', brandSlug: 'grand-seiko', pathPrefix: 'grand-seiko', collections: GS_COLLECTIONS },
  iwc: { pageKey: 'iwc', brandName: 'IWC Schaffhausen', brandSlug: 'iwc-schaffhausen', pathPrefix: 'iwc-schaffhausen', collections: IWC_COLLECTIONS },
  jaegerLeCoultre: { pageKey: 'jaegerLeCoultre', brandName: 'Jaeger-LeCoultre', brandSlug: 'jaeger-lecoultre', pathPrefix: 'jaeger-lecoultre', collections: JLC_COLLECTIONS },
  tagHeuer: { pageKey: 'tagHeuer', brandName: 'TAG Heuer', brandSlug: 'tag-heuer', pathPrefix: 'tag-heuer', collections: TH_COLLECTIONS },
  tudor: { pageKey: 'tudor', brandName: 'Tudor', brandSlug: 'tudor', pathPrefix: 'tudor', collections: [...TUDOR_COLLECTIONS, ...TUDOR_BLACK_BAY_SUBFAMILIES] },
  panerai: { pageKey: 'panerai', brandName: 'Panerai', brandSlug: 'panerai', pathPrefix: 'panerai', collections: PANERAI_COLLECTIONS },
  bvlgari: { pageKey: 'bvlgari', brandName: 'Bvlgari', brandSlug: 'bvlgari', pathPrefix: 'bvlgari', collections: BVLGARI_COLLECTIONS },
  girardPerregaux: { pageKey: 'girardPerregaux', brandName: 'Girard-Perregaux', brandSlug: 'girard-perregaux', pathPrefix: 'girard-perregaux', collections: GP_COLLECTIONS },
};

export const BRAND_COLLECTION_ROUTES = Object.values(BRAND_COLLECTION_GROUPS).flatMap((group) =>
  group.collections.map((collection) => ({ ...group, collection }))
);

export function getBrandCollection(routeKey, slug) {
  const group = BRAND_COLLECTION_GROUPS[routeKey];
  if (!group) return null;
  const collection = group.collections.find((item) => item.slug === slug);
  return collection ? { ...group, collection } : null;
}
