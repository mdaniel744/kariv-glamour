import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { compileFunction } from 'node:vm';
import ts from 'typescript';

function compile(path, imports) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    fileName: path,
  });
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((specifier) => {
    assert.ok(specifier in imports, `Unexpected dependency in ${path}: ${specifier}`);
    return imports[specifier];
  }, module, module.exports);
  return module.exports;
}

function childrenOf(node) {
  if (node == null || typeof node === 'boolean') return [];
  if (Array.isArray(node)) return node.flatMap(childrenOf);
  if (typeof node !== 'object') return [];
  return [node, ...childrenOf(node.props?.children)];
}

function textOf(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  return textOf(node.props?.children);
}

function createHarness({ locale = 'en', user = null, isLoadingAuth = false, available = false } = {}) {
  const state = [];
  const pushes = [];
  const eligibilityCalls = [];
  let cursor = 0;
  let effects = [];

  const fakeReact = {
    useState(initial) {
      const index = cursor;
      cursor += 1;
      if (!(index in state)) state[index] = typeof initial === 'function' ? initial() : initial;
      return [state[index], (next) => {
        state[index] = typeof next === 'function' ? next(state[index]) : next;
      }];
    },
    useEffect(effect) { effects.push(effect); },
    useId() { return 'purchase-select'; },
  };
  const reactModule = { ...fakeReact, default: fakeReact, __esModule: true };
  const jsxRuntime = {
    Fragment: Symbol('Fragment'),
    jsx: (type, props, key) => ({ type, key, props: props || {} }),
    jsxs: (type, props, key) => ({ type, key, props: props || {} }),
  };
  function DealerReviewForm() { return null; }
  function DealerReviewPurchases() { return null; }

  const { default: Composer } = compile('src/components/dealer/DealerReviewComposer.jsx', {
    react: reactModule,
    'react/jsx-runtime': jsxRuntime,
    'next/navigation': { useRouter: () => ({ push: (path) => pushes.push(path), refresh() {} }) },
    'lucide-react': { MessageSquare: () => null },
    'react-i18next': { useTranslation: () => ({ t: (key) => key }) },
    '@/lib/AuthContext': { useAuth: () => ({ user, isLoadingAuth }) },
    '@/lib/languageContext': { useLanguage: () => ({ localePath: (path) => `/${locale}${path}` }) },
    '@/actions/dealerReviews': {
      getDealerReviewEligibility: async (...args) => {
        eligibilityCalls.push(args);
        return { ok: true, reviewableOrders: [] };
      },
    },
    './DealerReviewForm': DealerReviewForm,
    './DealerReviewPurchases': DealerReviewPurchases,
  });

  function render() {
    cursor = 0;
    effects = [];
    const wrapper = Composer({ dealerId: 'dealer-1', dealerName: 'Prague Watch House', available });
    assert.equal(typeof wrapper.type, 'function');
    cursor = 0;
    const tree = wrapper.type(wrapper.props);
    const pendingEffects = effects;
    effects = [];
    for (const effect of pendingEffects) effect();
    return tree;
  }

  function signInOrCommentButton(tree) {
    return childrenOf(tree).find((node) => node.type === 'button' && (
      textOf(node).includes('components.dealerReviews.signInToComment') ||
      textOf(node).includes('components.dealerReviews.writeComment') ||
      textOf(node).includes('components.dealerReviews.closeForm')
    ));
  }

  return { render, signInOrCommentButton, pushes, eligibilityCalls, DealerReviewForm };
}

test('logged-out visitors can open local sign-in even when public reviews are unavailable', () => {
  const originalWindow = globalThis.window;
  globalThis.window = { location: { pathname: '/en/product/rolex', search: '?ref=shop', hash: '#comments' } };
  try {
    const harness = createHarness({ locale: 'en', user: null, isLoadingAuth: false, available: false });
    const tree = harness.render();
    const button = harness.signInOrCommentButton(tree);
    assert.ok(button);
    assert.equal(button.props.disabled, false);
    button.props.onClick();
    assert.deepEqual(harness.pushes, [
      '/en/login?returnTo=%2Fen%2Fproduct%2Frolex%3Fref%3Dshop%23comments',
    ]);
    assert.equal(harness.eligibilityCalls.length, 0);
  } finally {
    globalThis.window = originalWindow;
  }
});

test('comment sign-in stays disabled only while authentication is loading', () => {
  const harness = createHarness({ user: null, isLoadingAuth: true, available: false });
  const button = harness.signInOrCommentButton(harness.render());
  assert.ok(button);
  assert.equal(button.props.disabled, true);
});

for (const locale of ['en', 'de', 'cs']) {
  test(`${locale} comment sign-in preserves the complete return URL`, () => {
    const originalWindow = globalThis.window;
    globalThis.window = { location: { pathname: `/${locale}/product/cartier`, search: '?source=dealer', hash: '#reviews' } };
    try {
      const harness = createHarness({ locale, user: null, isLoadingAuth: false, available: false });
      const button = harness.signInOrCommentButton(harness.render());
      button.props.onClick();
      assert.deepEqual(harness.pushes, [
        `/${locale}/login?returnTo=${encodeURIComponent(`/${locale}/product/cartier?source=dealer#reviews`)}`,
      ]);
      assert.equal(harness.eligibilityCalls.length, 0);
    } finally {
      globalThis.window = originalWindow;
    }
  });
}

test('signed-in unavailable reviews show an explanation without form or private eligibility lookup', () => {
  const harness = createHarness({ user: { id: 'buyer-1' }, isLoadingAuth: false, available: false });
  let tree = harness.render();
  const button = harness.signInOrCommentButton(tree);
  assert.equal(button.props.disabled, false);
  button.props.onClick();

  tree = harness.render();
  assert.match(textOf(tree), /pages\.productDetail\.dealerPreview\.reviewsNotConfigured/);
  assert.equal(childrenOf(tree).some((node) => node.type === harness.DealerReviewForm), false);
  assert.equal(harness.eligibilityCalls.length, 0);
});
