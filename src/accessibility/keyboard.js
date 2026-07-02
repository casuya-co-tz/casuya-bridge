/** Keyboard navigation helpers for lesson chrome (not the sandboxed content
 * itself, which manages its own focus). */

export function enableArrowNavigation(container, { selector = '[data-nav-item]' } = {}) {
  function onKeydown(event) {
    if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return;
    const items = [...container.querySelectorAll(selector)];
    const currentIndex = items.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    event.preventDefault();
    const delta = event.key === 'ArrowDown' ? 1 : -1;
    const nextIndex = (currentIndex + delta + items.length) % items.length;
    items[nextIndex]?.focus();
  }

  container.addEventListener('keydown', onKeydown);
  return () => container.removeEventListener('keydown', onKeydown);
}
