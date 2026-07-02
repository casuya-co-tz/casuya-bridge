/** Caches lesson audio clips through the AssetStore. */

export class AudioCache {
  constructor(assetStore, fetchImpl = fetch) {
    this._assetStore = assetStore;
    this._fetchImpl = fetchImpl;
  }

  async getObjectUrl(url) {
    let blob = await this._assetStore.get(url);
    if (!blob) {
      const response = await this._fetchImpl(url);
      blob = await response.blob();
      await this._assetStore.save(url, blob);
    }
    return URL.createObjectURL(blob);
  }
}
