/** Chooses and drives the configured sandbox strategy (iframe or shadow-dom). */

import { createLessonIframe, writeIframeContent } from './iframe.js';
import { createShadowContainer, renderIntoShadow } from './shadow-dom.js';

export function createSandbox(document, mode, options = {}) {
  if (mode === 'shadow-dom') {
    const { host, shadowRoot } = createShadowContainer(document);
    return {
      mode,
      element: host,
      render: (bodyHtml, deps) => renderIntoShadow(shadowRoot, bodyHtml, deps.stylesheets),
    };
  }

  const iframe = createLessonIframe(document, options);
  return {
    mode: 'iframe',
    element: iframe,
    render: (bodyHtml, deps) => {
      const linkTags = deps.stylesheets.map((u) => `<link rel="stylesheet" href="${u}">`).join('');
      const scriptTags = deps.scripts.map((u) => `<script src="${u}"></script>`).join('');
      writeIframeContent(iframe, `<!doctype html><html><head>${linkTags}</head><body>${bodyHtml}${scriptTags}</body></html>`);
    },
  };
}
