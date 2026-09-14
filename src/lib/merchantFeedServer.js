import 'server-only';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { STORE_ID, loadAllProductsShaped } from '@/lib/supabaseData';
import { getCzkExchangeRates } from '@/lib/exchangeRatesServer';
import { buildMerchantFeed } from '@/lib/merchantFeed';
export async function loadMerchantFeed(locale, sellerType) {
  if (!supabaseAdmin) throw new Error('Marketplace database connection is not configured');
  const [products, { data, error }, exchangeRates] = await Promise.all([
    loadAllProductsShaped({ isPublished: true }),
    supabaseAdmin.from('dealer_profiles').select('*').eq('store_id', STORE_ID),
    locale === 'cs' ? getCzkExchangeRates() : Promise.resolve(null),
  ]);
  if (error) throw new Error(error.message);
  if (locale === 'cs' && !exchangeRates) throw new Error('Current CZK exchange rate is unavailable');
  return buildMerchantFeed(products, data || [], { locale, sellerType, exchangeRates });
}
