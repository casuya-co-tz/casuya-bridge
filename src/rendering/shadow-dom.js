/** Renders a lesson body inside a shadow root instead of an iframe — style
 * isolation without the postMessage overhead, for trusted first-party
 * lesson content where full JS sandboxing isn't required. */

export function createShadowContainer(document, { mode = 'open' } = {}) {
  const host = document.createElement('div');
  const shadowRoot = host.attachShadow({ mode });
  return { host, shadowRoot };
}

export function renderIntoShadow(shadowRoot, bodyHtml, stylesheetUrls = []) {
  const linkTags = stylesheetUrls
    .map((url) => `<link rel="stylesheet" href="${url}">`)
    .join('');
  shadowRoot.innerHTML = `${linkTags}${bodyHtml}`;
}
