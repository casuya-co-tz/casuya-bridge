/** Public-facing facade class — the main entry point consumers instantiate. */

import { createRuntime } from './runtime.js';

export class CasuyaBridge {
  constructor(options = {}) {
    this._runtime = createRuntime(options);
  }

  start() {
    this._runtime.start();
    return this;
  }

  stop() {
    this._runtime.stop();
    return this;
  }

  on(event, handler) {
    return this._runtime.bus.on(event, handler);
  }

  async renderLesson(slug, mountEl) {
    if (!this._runtime.renderer) {
      throw new Error('renderLesson requires a DOM environment (document is undefined)');
    }
    return this._runtime.renderer.render(slug, mountEl);
  }

  startSession(options) {
    return this._runtime.progress.startSession(options);
  }

  visitSection(sessionId, sectionId) {
    return this._runtime.progress.visitSection(sessionId, sectionId);
  }

  recordAnswer(sessionId, answer) {
    return this._runtime.progress.recordAnswer(sessionId, answer);
  }

  async endSession(sessionId) {
    return this._runtime.progress.endSession(sessionId);
  }

  async syncNow() {
    return this._runtime.syncEngine.syncNow();
  }

  get isOnline() {
    return this._runtime.connectivity.isOnline;
  }

  /** Escape hatch for advanced consumers who need direct subsystem access. */
  get runtime() {
    return this._runtime;
  }
}
