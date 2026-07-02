/** Preloads a lesson's declared media assets ahead of time (e.g. right
 * after a manifest download, before the student opens the lesson). */

export async function preloadAssets(urls, { imageCache, audioCache, concurrency = 3 } = {}) {
  const queue = [...urls];
  const results = [];

  async function worker() {
    while (queue.length > 0) {
      const url = queue.shift();
      try {
        const cache = /\.(mp3|wav|ogg)$/i.test(url) ? audioCache : imageCache;
        await cache?.getObjectUrl(url);
        results.push({ url, ok: true });
      } catch (err) {
        results.push({ url, ok: false, error: err.message });
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, worker));
  return results;
}
