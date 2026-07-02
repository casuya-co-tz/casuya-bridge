/** Creates a sandboxed <iframe> for a lesson body, isolating its JS/CSS
 * from the host page while still allowing same-origin storage access for
 * progress postMessages. */

const DEFAULT_SANDBOX = 'allow-scripts allow-same-origin allow-forms';

export function createLessonIframe(document, { title = 'Lesson', sandbox = DEFAULT_SANDBOX } = {}) {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('title', title);
  iframe.setAttribute('sandbox', sandbox);
  iframe.style.border = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  return iframe;
}

export function writeIframeContent(iframe, html) {
  const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
  if (!doc) throw new Error('Iframe document is not accessible');
  doc.open();
  doc.write(html);
  doc.close();
  return doc;
}
