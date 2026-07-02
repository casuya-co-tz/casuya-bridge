/** IntersectionObserver-based lazy loading for media elements inside a
 * rendered lesson (falls back to eager loading where unavailable). */

export function observeLazyLoad(elements, loadFn, { root = null, rootMargin = '200px' } = {}) {
  if (typeof IntersectionObserver === 'undefined') {
    elements.forEach(loadFn);
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          loadFn(entry.target);
          observer.unobserve(entry.target);
        }
      }
    },
    { root, rootMargin }
  );

  elements.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
