import { ROLEX_SEO_PAGES } from '@/lib/rolexData';
import { PATEK_SEO_PAGES } from '@/lib/patekData';
import { OMEGA_SEO_PAGES } from '@/lib/omegaData';
import { CARTIER_SEO_PAGES } from '@/lib/cartierData';
import { HUBLOT_SEO_PAGES } from '@/lib/hublotData';
import { BREITLING_SEO_PAGES } from '@/lib/breitlingData';
import { AP_SEO_PAGES } from '@/lib/audemarsPiguetData';
import { GS_SEO_PAGES } from '@/lib/grandSeikoData';
import { IWC_SEO_PAGES } from '@/lib/iwcData';
import { JLC_SEO_PAGES } from '@/lib/jaegerLeCoultreData';
import { TH_SEO_PAGES } from '@/lib/tagHeuerData';
import { TUDOR_SEO_PAGES } from '@/lib/tudorData';
import { PANERAI_SEO_PAGES } from '@/lib/paneraiData';
import { BVLGARI_SEO_PAGES } from '@/lib/bvlgariData';
import { GP_SEO_PAGES } from '@/lib/girardPerregauxData';

const GROUPS = [
  { key: 'rolex', brandName: 'Rolex', brandSlug: 'rolex', pages: ROLEX_SEO_PAGES },
  { key: 'patekPhilippe', brandName: 'Patek Philippe', brandSlug: 'patek-philippe', pages: PATEK_SEO_PAGES },
  { key: 'omega', brandName: 'Omega', brandSlug: 'omega', pages: OMEGA_SEO_PAGES },
  { key: 'cartier', brandName: 'Cartier', brandSlug: 'cartier', pages: CARTIER_SEO_PAGES },
  { key: 'hublot', brandName: 'Hublot', brandSlug: 'hublot', pages: HUBLOT_SEO_PAGES },
  { key: 'breitling', brandName: 'Breitling', brandSlug: 'breitling', pages: BREITLING_SEO_PAGES },
  { key: 'audemarsPiguet', brandName: 'Audemars Piguet', brandSlug: 'audemars-piguet', pages: AP_SEO_PAGES },
  { key: 'grandSeiko', brandName: 'Grand Seiko', brandSlug: 'grand-seiko', pages: GS_SEO_PAGES },
  { key: 'iwc', brandName: 'IWC Schaffhausen', brandSlug: 'iwc-schaffhausen', pages: IWC_SEO_PAGES },
  { key: 'jaegerLeCoultre', brandName: 'Jaeger-LeCoultre', brandSlug: 'jaeger-lecoultre', pages: JLC_SEO_PAGES },
  { key: 'tagHeuer', brandName: 'TAG Heuer', brandSlug: 'tag-heuer', pages: TH_SEO_PAGES },
  { key: 'tudor', brandName: 'Tudor', brandSlug: 'tudor', pages: TUDOR_SEO_PAGES },
  { key: 'panerai', brandName: 'Panerai', brandSlug: 'panerai', pages: PANERAI_SEO_PAGES },
  { key: 'bvlgari', brandName: 'Bvlgari', brandSlug: 'bvlgari', pages: BVLGARI_SEO_PAGES },
  { key: 'girardPerregaux', brandName: 'Girard-Perregaux', brandSlug: 'girard-perregaux', pages: GP_SEO_PAGES },
];

export const SEO_LANDING_ROUTES = GROUPS.flatMap((group) =>
  Object.entries(group.pages).map(([slug, pageData]) => ({
    slug,
    pageData,
    pageKey: group.key,
    brandName: group.brandName,
    brandSlug: group.brandSlug,
  }))
);

const ROUTES_BY_SLUG = new Map(SEO_LANDING_ROUTES.map((route) => [route.slug, route]));

export function getSeoLandingRoute(slug) {
  return ROUTES_BY_SLUG.get(slug) || null;
}
