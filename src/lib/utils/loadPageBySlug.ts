import type { PageData } from '$lib/types';
import { readFile } from 'node:fs/promises';
import { CONTENT_DIR } from '$lib/config';
import { join } from 'node:path';
import { parseMarkdownFileContent } from '$lib/utils/parseMarkdownFileContent';
import { processObject } from '$lib/utils/processObject';

export async function loadPageBySlug(slug: string) {
  const path = join(CONTENT_DIR, 'pages', slug);

  let content: string | null;

  if (slug === '/') {
    content = await tryReadFile(`${path}/_index.md`);
  } else {
    content =
      (await tryReadFile(`${path}.md`)) ||
      (await tryReadFile(`${path}/_index.md`));
  }

  if (content) {
    const data = parseMarkdownFileContent(content);

    return data
      ? {
          pageData: await processObject<PageData>(data.pageData),
          body: data.body
        }
      : null;
  }

  return null;
}

async function tryReadFile(path: string) {
  try {
    return await readFile(path, 'utf8');
  } catch (error) {
    return null;
  }
}
