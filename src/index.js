/** casuya-bridge — offline-first student runtime and synchronization engine
 * for Casuya's compiled HTML lessons. */

export { CasuyaBridge } from './core/bridge.js';
export { createRuntime } from './core/runtime.js';
export { resolveConfig } from './core/config.js';
export { EventBus } from './core/events.js';
export { EVENTS, STORES, BRIDGE_VERSION, DEFAULT_CONFIG } from './core/constants.js';
export * from './core/errors.js';

export { createStore } from './storage/indexeddb.js';
export { ManifestStore } from './storage/manifests.js';
export { PackageStore } from './storage/packages.js';
export { AssetStore } from './storage/assets.js';
export { CacheFirstReader } from './storage/cache.js';

export { SyncQueue } from './sync/queue.js';
export { SyncEngine } from './sync/sync-engine.js';
export { toBatches } from './sync/batch.js';
export { backoffDelayMs, shouldRetry } from './sync/retry.js';

export { ProgressTracker } from './progress/tracker.js';
export { LessonSession } from './progress/sessions.js';
export { computeCompletion } from './progress/completion.js';
export { computeScore, letterGrade } from './progress/scores.js';
export { summarizeSessions } from './progress/analytics.js';

export { LessonRenderer } from './rendering/renderer.js';
export { RENDER_STATES } from './rendering/state-manager.js';

export { ConnectivityMonitor } from './network/connectivity.js';

export { signPayload, verifySignature, verifyOrThrow } from './security/signatures.js';
export { sha256Hex, verifyContentHash, verifyContentHashOrThrow } from './security/integrity.js';
export { validatePackageShape, validatePackageShapeOrThrow } from './security/validation.js';

export { applyTheme, getSavedTheme } from './accessibility/themes.js';
export { getZoomLevel, setZoomLevel, zoomIn, zoomOut } from './accessibility/zoom.js';

export { uuid } from './utils/uuid.js';
export { createLogger } from './utils/logger.js';
