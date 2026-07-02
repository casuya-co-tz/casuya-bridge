/** Manages an ARIA live region for announcing dynamic changes (progress
 * updates, sync status, errors) to screen reader users. */

export function createLiveRegion(document, { politeness = 'polite' } = {}) {
  const region = document.createElement('div');
  region.setAttribute('role', 'status');
  region.setAttribute('aria-live', politeness);
  region.style.position = 'absolute';
  region.style.width = '1px';
  region.style.height = '1px';
  region.style.overflow = 'hidden';
  region.style.clip = 'rect(0 0 0 0)';
  document.body.appendChild(region);

  return {
    announce(message) {
      region.textContent = '';
      // Re-trigger the live region even if the message is identical.
      requestAnimationFrame?.(() => {
        region.textContent = message;
      }) ?? (region.textContent = message);
    },
    destroy() {
      region.remove();
    },
  };
}
