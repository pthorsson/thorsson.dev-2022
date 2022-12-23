import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import env from 'dotenv';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

env.config();

const PAGES_DIR = join(process.env.VITE_CONTENT_DIR, 'pages');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    prerender: {
      entries: getEntries(PAGES_DIR)
    }
  }
};

export default config;

/**
 * Recursively reads pages.
 */
function getEntries(dir) {
  const entries = [];

  (function getEntriesRecursive(dir, parents) {
    for (const file of readdirSync(dir)) {
      const path = join(dir, file);

      if (file === '_index.md') {
        entries.push(`/${parents.join('/')}`);
      } else if (/\.md$/.test(file)) {
        entries.push(`/${[...parents, file.replace('.md', '')].join('/')}`);
      } else if (statSync(path).isDirectory()) {
        getEntriesRecursive(path, [...parents, file]);
      }
    }
  })(dir, []);

  return entries;
}
