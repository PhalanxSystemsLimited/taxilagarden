/**
 * Custom Astro client directive: `client:interaction`.
 * Hydrates the island on the first pointer / key / touch / focus event.
 * @type {import('astro').ClientDirective}
 */
export default (load) => {
  const events = ['pointerdown', 'keydown', 'touchstart', 'focusin'];
  let done = false;
  const go = async () => {
    if (done) return;
    done = true;
    events.forEach((e) => window.removeEventListener(e, go, true));
    const hydrate = await load();
    await hydrate();
  };
  events.forEach((e) => window.addEventListener(e, go, { capture: true, passive: true }));
};
