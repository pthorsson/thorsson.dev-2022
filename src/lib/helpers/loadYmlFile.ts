import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { CONTENT_DIR } from '$lib/config';
import YAML from 'yaml';
import markdown from '$lib/helpers/markdown';
import { isPlainObject } from 'is-plain-object';

export async function loadYmlFile(file: string) {
  const fileName = join(CONTENT_DIR, `data/${file}.yml`);
  const rawData = await readFile(fileName, 'utf8');

  const data = YAML.parse(rawData);

  applyMarkdown(data);

  return data;
}

function applyMarkdown(data: { [key: string]: any }) {
  for (const [key, value] of Object.entries(data)) {
    if (key.includes(':md_block') && typeof value === 'string') {
      data[key.replace(':md_block', '')] = markdown.parse(value, {
        breaks: true
      });
      delete data[key];
    } else if (key.includes(':md') && typeof value === 'string') {
      data[key.replace(':md', '')] = markdown.parseInline(value);
      delete data[key];
    } else if (isPlainObject(value)) {
      applyMarkdown(value);
    } else if (Array.isArray(value)) {
      for (const valueArrItem of value) {
        if (isPlainObject(valueArrItem)) {
          applyMarkdown(valueArrItem);
        }
      }
    }
  }
}
