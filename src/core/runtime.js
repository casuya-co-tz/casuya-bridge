/** Wires up all subsystems (storage, sync, progress, rendering,
 * connectivity) into a single running instance. */

import { resolveConfig } from './config.js';
import { EventBus } from './events.js';
import { HookRegistry } from './hooks.js';
import { createStore } from '../storage/indexeddb.js';
import { ManifestStore } from '../storage/manifests.js';
import { PackageStore } from '../storage/packages.js';
import { AssetStore } from '../storage/assets.js';
import { SyncQueue } from '../sync/queue.js';
import { SyncEngine } from '../sync/sync-engine.js';
import { registerBackgroundSync } from '../sync/background-sync.js';
import { ConnectivityMonitor } from '../network/connectivity.js';
import { ProgressTracker } from '../progress/tracker.js';
import { LessonRenderer } from '../rendering/renderer.js';

export function createRuntime(overrides = {}) {
  const config = resolveConfig(overrides);
  const bus = new EventBus();
  const hooks = new HookRegistry();

  const db = createStore(config.dbName, config.dbVersion);
  const manifestStore = new ManifestStore(db);
  const packageStore = new PackageStore(db);
  const assetStore = new AssetStore(db);
  const queue = new SyncQueue(db);

  const connectivity = new ConnectivityMonitor(bus);
  const syncEngine = new SyncEngine({ bus, queue, manifestStore, packageStore, config });
  const progress = new ProgressTracker({ db, bus, queue });

  const renderer =
    typeof document !== 'undefined'
      ? new LessonRenderer({ bus, packageStore, manifestStore, config, document })
      : null;

  let unregisterBackgroundSync = null;

  return {
    config,
    bus,
    hooks,
    db,
    manifestStore,
    packageStore,
    assetStore,
    queue,
    connectivity,
    syncEngine,
    progress,
    renderer,

    start() {
      connectivity.start();
      syncEngine.start();
      unregisterBackgroundSync = registerBackgroundSync(bus, syncEngine);
    },

    stop() {
      connectivity.stop();
      syncEngine.stop();
      unregisterBackgroundSync?.();
    },
  };
}
