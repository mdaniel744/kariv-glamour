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

// Orders, order messages, disputes, dealer profiles/reviews, dealer
// applications (read), customers, and the admin-only translation/glossary
// tooling are deferred — no Supabase tables/read-policies exist for these
// yet (or, for dealer_applications, no anon SELECT policy at all).
const DEFERRED_ENTITY_NAMES = [
  'Orders', 'OrderMessage', 'Dispute',
  'DealerProfile', 'DealerReview', 'DealerApplications',
  'User', 'Customers',
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
