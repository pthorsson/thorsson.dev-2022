import type { PageData } from '$lib/types';
import { join } from 'node:path';
import { readFile, readdir } from 'node:fs/promises';
import { CONTENT_DIR } from '$lib/config';
import markdown from '$lib/helpers/markdown';
import YAML from 'yaml';

export async function loadMarkdownFile(fileName: string) {
  const { data, body } = await readMarkdownFile(fileName);

  if (data.layout === 'landing' && data.pageLinks) {
    for (let i = 0; i < data.pageLinks.length; i++) {
      const slug = data.pageLinks[i] as unknown as string;

      const promotedPage = await readMarkdownFile(slug);

      data.pageLinks[i] = {
        slug,
        data: promotedPage.data
      };
    }
  }

  if (data.layout === 'collection' && data.collection) {
    const collection = data.collection as unknown as string;
    const collectionDir = join(CONTENT_DIR, 'pages', collection);
    const collectionFiles = (await readdir(collectionDir))
      .filter((file) => /\.md$/.test(file))
      .map((file) => file.replace(/\.md$/, ''));

    data.collection = [];

    for (let i = 0; i < collectionFiles.length; i++) {
      const collectionFile = collectionFiles[i];
      const collectionFilePath = join(collection, collectionFile);

      const page = await readMarkdownFile(collectionFilePath);

      data.collection.push({
        slug: `/${collectionFilePath}`,
        data: page.data
      });
    }
  }

  return {
    data,
    body
  };
}

/**
 * Reads markdown file and splits and returns meta data and markdown body.
 */
async function readMarkdownFile(
  file: string
): Promise<{ data: PageData; body: string }> {
  const fileName = join(CONTENT_DIR, 'pages', `${file}.md`);
  const rawData = await readFile(fileName, 'utf8');

  const lines = rawData.split(/\r?\n/);

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

  const dataStr = metaDataLines.join('\n').trim();
  const bodyStr = markdownLines.join('\n').trim();

  return {
    data: YAML.parse(dataStr),
    body: markdown.parse(bodyStr)
  };
}
