/** Builds dist/casuya-bridge.esm.js (ESM), .js (IIFE global), and .min.js
 * using esbuild. Run with `npm run build`. */

import { build } from 'esbuild';
import { mkdirSync } from 'node:fs';

mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });

const entryPoint = new URL('../src/index.js', import.meta.url).pathname;
const outDir = new URL('../dist/', import.meta.url).pathname;

async function run() {
  // ESM build
  await build({
    entryPoints: [entryPoint],
    outfile: `${outDir}casuya-bridge.esm.js`,
    format: 'esm',
    bundle: true,
    sourcemap: true,
    target: ['es2020'],
  });

  // IIFE global build (window.CasuyaBridge)
  await build({
    entryPoints: [entryPoint],
    outfile: `${outDir}casuya-bridge.js`,
    format: 'iife',
    globalName: 'CasuyaBridgeLib',
    bundle: true,
    sourcemap: true,
    target: ['es2020'],
  });

  // Minified IIFE build
  await build({
    entryPoints: [entryPoint],
    outfile: `${outDir}casuya-bridge.min.js`,
    format: 'iife',
    globalName: 'CasuyaBridgeLib',
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ['es2020'],
  });

  console.log('Build complete: dist/casuya-bridge.{js,esm.js,min.js}');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
