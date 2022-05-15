import 'dotenv/config';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import copyfiles from 'copyfiles';
import chokidar from 'chokidar';
import rimraf from 'rimraf';
import { throttle } from 'throttle-debounce';

const { VITE_CONTENT_DIR } = process.env;

const watch = process.argv.includes('--watch');

const __dirname = dirname(fileURLToPath(import.meta.url));

const SOURCE = join(__dirname, '../', VITE_CONTENT_DIR, 'assets/**/*');
const TARGET = join(__dirname, '../', 'static/assets');

async function main() {
  if (watch) {
    const throttledCopyFiles = throttle(
      500,
      async () => {
        console.log('Syncing assets to static directory ...');
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
    console.log('Syncing assets to static directory ...');
    await clearAssets();
    await copyAssets();
  }
}

main().catch(console.error);

function copyAssets() {
  return new Promise((resolve) => {
    copyfiles([SOURCE, TARGET], { up: __dirname.split('/').length + 1 }, () => {
      resolve();
    });
  });
}

function clearAssets() {
  return new Promise((resolve) => {
    rimraf(TARGET, () => {
      resolve();
    });
  });
}
