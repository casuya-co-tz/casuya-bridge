/** High-level lesson renderer: pulls a package from storage, resolves
 * dependencies, mounts a sandbox, and drives the render-state machine. */

import { EVENTS } from '../core/constants.js';
import { RenderError } from '../core/errors.js';
import { RENDER_STATES, RenderStateManager } from './state-manager.js';
import { resolveDependencyUrls } from './dependencies.js';
import { createSandbox } from './sandbox.js';

export class LessonRenderer {
  constructor({ bus, packageStore, manifestStore, config, document: doc }) {
    this._bus = bus;
    this._packageStore = packageStore;
    this._manifestStore = manifestStore;
    this._config = config;
    this._document = doc;
    this._stateManager = new RenderStateManager(bus);
  }

  async render(slug, mountEl) {
    this._stateManager.transition(RENDER_STATES.LOADING, { slug });
    try {
      const pkg = await this._packageStore.get(slug);
      if (!pkg) throw new RenderError(`No cached package found for lesson '${slug}'`);

      const manifest = await this._manifestStore.get(slug);
      const deps = resolveDependencyUrls(manifest, { assetBaseUrl: this._config.apiBaseUrl });

      const sandbox = createSandbox(this._document, this._config.sandboxMode, {
        title: manifest?.metadata?.title ?? slug,
      });
      mountEl.replaceChildren(sandbox.element);
      sandbox.render(pkg.body_html ?? pkg.body ?? '', deps);

      this._bus?.emit(EVENTS.LESSON_LOADED, { slug });
      this._stateManager.transition(RENDER_STATES.READY, { slug });
      this._bus?.emit(EVENTS.LESSON_READY, { slug });

      return sandbox;
    } catch (err) {
      this._stateManager.transition(RENDER_STATES.ERROR, { slug, error: err });
      this._bus?.emit(EVENTS.LESSON_ERROR, { slug, error: err });
      throw err;
    }
  }

  get state() {
    return this._stateManager.state;
  }
}
