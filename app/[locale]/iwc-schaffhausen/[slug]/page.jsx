import BrandCollectionRoute, { buildBrandCollectionMetadata } from '@/components/next-pages/BrandCollectionRoute';
export const revalidate = 900;
export const generateMetadata = (props) => buildBrandCollectionMetadata(props, 'iwc');
export default function Page({ params }) { return <BrandCollectionRoute params={params} routeKey="iwc" />; }
