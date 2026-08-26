export const BRAND_COLLECTION_FILTER_EVENT = 'kariv:brand-collection-filter';

export function handleBrandCollectionFilterClick(event, collection) {
  if (
    event.defaultPrevented
    || event.button !== 0
    || event.metaKey
    || event.ctrlKey
    || event.shiftKey
    || event.altKey
  ) return;

  event.preventDefault();
  window.dispatchEvent(new CustomEvent(BRAND_COLLECTION_FILTER_EVENT, {
    detail: { collection },
  }));

  window.requestAnimationFrame(() => {
    document.querySelector('.brand-products-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}
