/** Caches lesson video assets, deliberately skipping full-body caching for
 * files above `maxCacheableBytes` to protect limited device storage. */

export class VideoCache {
  constructor(assetStore, fetchImpl = fetch, { maxCacheableBytes = 25 * 1024 * 1024 } = {}) {
    this._assetStore = assetStore;
    this._fetchImpl = fetchImpl;
    this._maxCacheableBytes = maxCacheableBytes;
  }

  async getPlaybackUrl(url) {
    const cached = await this._assetStore.get(url);
    if (cached) return URL.createObjectURL(cached);

    const response = await this._fetchImpl(url);
    const contentLength = Number(response.headers?.get?.('content-length') ?? 0);
    if (contentLength > 0 && contentLength <= this._maxCacheableBytes) {
      const blob = await response.blob();
      await this._assetStore.save(url, blob);
      return URL.createObjectURL(blob);
    }
    // Too large to cache offline; stream directly from network.
    return url;
  }
}
