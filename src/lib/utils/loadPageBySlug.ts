import type { PageData } from '$lib/types';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import YAML from 'yaml';
import { CONTENT_DIR } from '$lib/config';
import markdown from '$lib/utils/markdown';
import { processObject } from '$lib/utils/processObject';

export async function loadPageBySlug(slug: string) {
  const path = join(CONTENT_DIR, 'pages', slug);

  const content =
    (await tryReadFile(`${path}.md`)) ||
    (await tryReadFile(`${path}/_index.md`));

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

function parseMarkdownFileContent(
  content: string
): { pageData: PageData; body: string } | null {
  const lines = content.split(/\r?\n/);

  const metaDataLines = [];
  const markdownLines = [];

  let i = 0;

  if (lines[0].trim() === '---') {
    i = 1;

    while (lines[i].trim() !== '---') {
      metaDataLines.push(lines[i]);
      i++;
    }

    i++;
  }

  markdownLines.push(...lines.slice(i));

  const pageDataStr = metaDataLines.join('\n').trim();
  const bodyStr = markdownLines.join('\n').trim();

  return {
    pageData: YAML.parse(pageDataStr),
    body: markdown.parse(bodyStr)
  };
}
