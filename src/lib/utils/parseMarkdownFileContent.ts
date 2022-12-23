import type { PageData } from '$lib/types';
import markdown from '$lib/utils/markdown';
import YAML from 'yaml';

export function parseMarkdownFileContent(
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
