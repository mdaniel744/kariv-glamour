import * as supabaseData from '@/lib/supabaseData';

// Base44 is fully removed — this file is the compatibility shim so the ~150
// call sites that still write `dataClient.entities.X.method()` / `dataClient.auth.*`
// / etc. don't all need touching at once. Migrated concerns are real
// Supabase calls; everything else is a clean "not yet available" stub that
// throws, which every call site already catches (verified — see the
// order/escrow/dealer-marketplace deferral) and shows as an empty state or
// error toast, never a crash.

const MIGRATED_ENTITIES = {
  Products: supabaseData.Products,
  Brands: supabaseData.Brands,
  Collections: supabaseData.Collections,
  FAQ: supabaseData.FAQ,
  WatchGuides: supabaseData.WatchGuides,
  LegalPages: supabaseData.LegalPages,
  WebsiteString: supabaseData.WebsiteString,
};

// Orders/order_messages/disputes/customers are live now — every real
// consumer reads/writes them through src/actions/orders.js and
// src/actions/customers.js directly (service-role, ownership-scoped),
// never through this generic shim (its filter/list "load everything then
// filter in JS" shape is wrong for per-user order data). 'Orders' stays
// deferred here only because DealerProfile.jsx's review-eligibility check
// still references it — that whole feature depends on the out-of-scope
// dealer_reviews table and is intentionally left stubbed.
//
// Dealer profiles/reviews, dealer applications (read), and the admin-only
// translation/glossary tooling remain deferred — no Supabase tables/
// read-policies exist for these yet.
const DEFERRED_ENTITY_NAMES = [
  'Orders',
  'DealerProfile', 'DealerReview', 'DealerApplications',
  'User',
  'GlossaryTerm', 'TranslationSettings', 'TranslationJob',
];

async function notYetAvailable() {
  throw new Error('Not yet available — this feature is being migrated off Base44.');
}

const deferredEntity = {
  filter: notYetAvailable,
  list: notYetAvailable,
  get: notYetAvailable,
  create: notYetAvailable,
  update: notYetAvailable,
  delete: notYetAvailable,
};

const entities = {
  ...MIGRATED_ENTITIES,
  ...Object.fromEntries(DEFERRED_ENTITY_NAMES.map((name) => [name, deferredEntity])),
};

export const dataClient = {
  entities,
  auth: {
    me: notYetAvailable,
    updateMe: notYetAvailable,
    logout: () => {},
    redirectToLogin: () => {},
  },
  integrations: {
    Core: {
      UploadFile: notYetAvailable,
      InvokeLLM: notYetAvailable,
    },
  },
  functions: {
    invoke: notYetAvailable,
  },
};
