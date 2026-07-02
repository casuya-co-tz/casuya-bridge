/** Resolves a lesson's declared stylesheet/script dependencies against the
 * host page's own asset base, so cached local copies are used when present. */

export function resolveDependencyUrls(manifest, { assetBaseUrl = '' } = {}) {
  const deps = manifest?.dependencies ?? { stylesheets: [], scripts: [] };
  const resolve = (url) => (url.startsWith('http') ? url : `${assetBaseUrl}${url}`);
  return {
    stylesheets: (deps.stylesheets ?? []).map(resolve),
    scripts: (deps.scripts ?? []).map(resolve),
  };
}
