/** Text-zoom controls for lesson content, persisted across sessions. */

import { getItem, setItem } from '../storage/localstorage.js';

const STORAGE_KEY = 'casuya-bridge:zoom';
const MIN_ZOOM = 0.8;
const MAX_ZOOM = 2.0;
const STEP = 0.1;

export function getZoomLevel() {
  return getItem(STORAGE_KEY, 1.0);
}

export function setZoomLevel(root, level) {
  const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(level.toFixed(2))));
  root.style.setProperty('--casuya-zoom', String(clamped));
  setItem(STORAGE_KEY, clamped);
  return clamped;
}

export function zoomIn(root) {
  return setZoomLevel(root, getZoomLevel() + STEP);
}

export function zoomOut(root) {
  return setZoomLevel(root, getZoomLevel() - STEP);
}
