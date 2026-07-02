/** Custom error hierarchy for casuya-bridge. */

export class BridgeError extends Error {
  constructor(message, { cause } = {}) {
    super(message, cause ? { cause } : undefined);
    this.name = this.constructor.name;
  }
}

export class RenderError extends BridgeError {}
export class StorageErrorBridge extends BridgeError {}
export class SyncError extends BridgeError {}
export class NetworkError extends BridgeError {}
export class SecurityError extends BridgeError {}
export class ValidationErrorBridge extends BridgeError {}
export class ConfigError extends BridgeError {}
