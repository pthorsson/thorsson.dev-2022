import './load-env.js';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, process.env.VITE_CONTENT_DIR);

console.log(`Using "${process.env.VITE_CONTENT_DIR}" for content`);

const pages = readdirSync(join(CONTENT_DIR, 'pages'))
  .filter((file) => file.endsWith('.md'))
  .map((file) => '/' + file.replace('.md', ''));

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    prerender: {
      default: true,
      entries: pages
    }
  }
};

export default config;
