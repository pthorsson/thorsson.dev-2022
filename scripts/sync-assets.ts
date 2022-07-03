import '../load-env.js';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import copyfiles from 'copyfiles';
import chokidar from 'chokidar';
import rimraf from 'rimraf';
import { throttle } from 'throttle-debounce';

const { VITE_CONTENT_DIR = '.' } = process.env;

const watch = process.argv.includes('--watch');

const __dirname = dirname(fileURLToPath(import.meta.url));

const ROOT_DIR = join(__dirname, '../');
const CONTENT_DIR = join(ROOT_DIR, VITE_CONTENT_DIR);

const SOURCE = join(CONTENT_DIR, 'assets/**/*');
const TARGET = join(ROOT_DIR, 'static/assets');

async function main() {
  if (watch) {
    const throttledCopyFiles = throttle(
      500,
      async () => {
        console.log(
          '[scripts/sync-assets] Syncing assets to static directory ...'
        );
        await clearAssets();
        await copyAssets();
      },
      {
        noLeading: true,
        noTrailing: false
      }
    );

    chokidar.watch(SOURCE).on('all', throttledCopyFiles);
  } else {
    console.log('[scripts/sync-assets] Syncing assets to static directory ...');
    await clearAssets();
    await copyAssets();
  }
}

main().catch(console.error);

function copyAssets() {
  return new Promise<void>((resolve) => {
    copyfiles(
      [SOURCE, TARGET],
      { up: CONTENT_DIR.split('/').length + 1 },
      () => {
        resolve();
      }
    );
  });
}

function clearAssets() {
  return new Promise<void>((resolve) => {
    rimraf(TARGET, () => {
      resolve();
    });
  });
}
