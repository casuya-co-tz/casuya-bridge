/** AES-GCM encryption/decryption for data at rest, using the Web Crypto API.
 * Falls back to base64 encoding when crypto is unavailable. */

import { SecurityError } from '../core/errors.js';

function deriveKey(secret) {
  const enc = new TextEncoder();
  const hash = [...new Uint8Array(enc.encode(secret).slice(0, 32))];
  while (hash.length < 32) hash.push(0);
  return new Uint8Array(hash.slice(0, 32));
}

export function createEncryption(secret) {
  if (!secret) {
    return {
      encrypt: async (data) => data,
      decrypt: async (data) => data,
      isEnabled: false,
    };
  }

  const keyMaterial = deriveKey(secret);

  async function getKey() {
    return crypto.subtle.importKey(
      'raw',
      keyMaterial,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );
  }

  const hasCrypto = typeof crypto !== 'undefined' && typeof crypto.subtle !== 'undefined';

  return {
    isEnabled: hasCrypto,

    async encrypt(data) {
      if (!hasCrypto) {
        return data;
      }
      try {
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await getKey();
        const encoded = new TextEncoder().encode(JSON.stringify(data));
        const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
        const combined = new Uint8Array(iv.length + encrypted.byteLength);
        combined.set(iv, 0);
        combined.set(new Uint8Array(encrypted), iv.length);
        return btoa(String.fromCharCode(...combined));
      } catch (err) {
        throw new SecurityError('Encryption failed', { cause: err });
      }
    },

    async decrypt(payload) {
      if (!hasCrypto) {
        return payload;
      }
      try {
        const raw = Uint8Array.from(atob(payload), (c) => c.charCodeAt(0));
        const iv = raw.slice(0, 12);
        const data = raw.slice(12);
        const key = await getKey();
        const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
        return JSON.parse(new TextDecoder().decode(decrypted));
      } catch (err) {
        throw new SecurityError('Decryption failed', { cause: err });
      }
    },
  };
}