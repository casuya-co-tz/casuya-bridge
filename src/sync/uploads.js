/** Uploads a batch of queued events to the server API. */

import { buildJsonRequest } from '../network/requests.js';
import { fetchWithTimeout } from '../network/fetcher.js';

export async function uploadBatch(apiBaseUrl, batch, { fetchImpl } = {}) {
  const request = buildJsonRequest(`${apiBaseUrl}/sync/events`, {
    body: { events: batch.map((record) => record.event) },
  });
  return fetchWithTimeout(request, { fetchImpl });
}
