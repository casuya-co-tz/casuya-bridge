/** Downloads updated lesson manifests/packages from the server API. */

import { fetchWithTimeout } from '../network/fetcher.js';

export async function downloadManifests(apiBaseUrl, { fetchImpl } = {}) {
  const response = await fetchWithTimeout(
    { url: `${apiBaseUrl}/lessons/manifests`, method: 'GET', headers: {} },
    { fetchImpl }
  );
  return Array.isArray(response.body) ? response.body : [];
}

export async function downloadPackage(apiBaseUrl, slug, { fetchImpl } = {}) {
  const response = await fetchWithTimeout(
    { url: `${apiBaseUrl}/lessons/${slug}/package`, method: 'GET', headers: {} },
    { fetchImpl }
  );
  return response.body;
}
