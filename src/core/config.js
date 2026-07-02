/** Configuration resolution and validation. */

import { DEFAULT_CONFIG } from './constants.js';
import { ConfigError } from './errors.js';

const VALID_SANDBOX_MODES = new Set(['iframe', 'shadow-dom']);

export function resolveConfig(overrides = {}) {
  const config = { ...DEFAULT_CONFIG, ...overrides };

  if (typeof config.syncIntervalMs !== 'number' || config.syncIntervalMs < 0) {
    throw new ConfigError('syncIntervalMs must be a non-negative number');
  }
  if (typeof config.maxRetries !== 'number' || config.maxRetries < 0) {
    throw new ConfigError('maxRetries must be a non-negative number');
  }
  if (!VALID_SANDBOX_MODES.has(config.sandboxMode)) {
    throw new ConfigError(
      `sandboxMode must be one of ${[...VALID_SANDBOX_MODES].join(', ')}`
    );
  }

  return Object.freeze(config);
}
