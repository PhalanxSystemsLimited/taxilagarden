/**
 * Load a stylesheet on demand (used for Leaflet & PhotoSwipe so their CSS never blocks rendering).
 * Files live in /public/vendor (copied from node_modules by scripts/prepare-assets.mjs).
 * @param {string} href
 * @returns {Promise<void>}
 */
export function loadCss(href) {
  if (document.querySelector(`link[data-lazy-css="${href}"]`)) return Promise.resolve();
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.lazyCss = href;
    link.onload = () => resolve();
    link.onerror = () => resolve();
    document.head.appendChild(link);
  });
}
