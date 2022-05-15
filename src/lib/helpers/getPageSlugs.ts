import { join } from 'node:path';
import { readdir, stat } from 'node:fs/promises';
import { CONTENT_DIR } from '$lib/config';

export async function getPageSlugs() {
  const pageSlugs: string[] = [];
  const pagesDir = join(CONTENT_DIR, 'pages');

  await recursiveReaddir(pagesDir);

  async function recursiveReaddir(dir: string) {
    const files = await readdir(dir);

    for (const file of files) {
      const fileStat = await stat(join(dir, file));

      if (fileStat.isDirectory()) {
        await recursiveReaddir(join(dir, file));
      } else if (/\.md$/.test(file)) {
        pageSlugs.push(
          join(dir, file).replace('.md', '').replace(pagesDir, '')
        );
      }
    }
  }

  return pageSlugs;
}
