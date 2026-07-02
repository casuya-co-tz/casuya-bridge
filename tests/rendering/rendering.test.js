import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveDependencyUrls } from '../../src/rendering/dependencies.js';
import { RenderStateManager, RENDER_STATES } from '../../src/rendering/state-manager.js';
import { EventBus } from '../../src/core/events.js';

test('resolveDependencyUrls prefixes relative paths with assetBaseUrl', () => {
  const manifest = { dependencies: { stylesheets: ['style.css'], scripts: ['https://cdn.x/app.js'] } };
  const resolved = resolveDependencyUrls(manifest, { assetBaseUrl: 'https://casuya.co.tz/' });
  assert.deepEqual(resolved.stylesheets, ['https://casuya.co.tz/style.css']);
  assert.deepEqual(resolved.scripts, ['https://cdn.x/app.js']);
});

test('resolveDependencyUrls handles a manifest with no dependencies', () => {
  const resolved = resolveDependencyUrls({});
  assert.deepEqual(resolved, { stylesheets: [], scripts: [] });
});

test('RenderStateManager transitions and emits render:<state> events', () => {
  const bus = new EventBus();
  const manager = new RenderStateManager(bus);

  let lastState = null;
  bus.on('render:ready', (payload) => (lastState = payload));

  manager.transition(RENDER_STATES.LOADING);
  assert.equal(manager.state, RENDER_STATES.LOADING);

  manager.transition(RENDER_STATES.READY, { slug: 'mole-concept' });
  assert.equal(manager.state, RENDER_STATES.READY);
  assert.deepEqual(lastState, { slug: 'mole-concept' });
});
