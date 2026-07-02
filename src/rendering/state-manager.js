/** Tracks the render lifecycle state of a lesson (idle -> loading -> ready/error). */

export const RENDER_STATES = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error',
});

export class RenderStateManager {
  constructor(bus) {
    this._bus = bus;
    this._state = RENDER_STATES.IDLE;
  }

  get state() {
    return this._state;
  }

  transition(next, payload) {
    this._state = next;
    this._bus?.emit(`render:${next}`, payload);
  }
}
