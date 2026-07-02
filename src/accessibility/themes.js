/** Applies light/dark/high-contrast themes via a root class + persists choice. */

import { getItem, setItem } from '../storage/localstorage.js';

const STORAGE_KEY = 'casuya-bridge:theme';
const VALID_THEMES = ['light', 'dark', 'high-contrast'];

export function applyTheme(root, theme) {
  if (!VALID_THEMES.includes(theme)) theme = 'light';
  for (const t of VALID_THEMES) root.classList.remove(`theme-${t}`);
  root.classList.add(`theme-${theme}`);
  setItem(STORAGE_KEY, theme);
  return theme;
}

export function getSavedTheme(fallback = 'light') {
  return getItem(STORAGE_KEY, fallback);
}
