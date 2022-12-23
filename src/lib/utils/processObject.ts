import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { isPlainObject } from 'is-plain-object';
import markdown from '$lib/utils/markdown';
import { loadPageBySlug } from '$lib/utils/loadPageBySlug';
import type { PageData } from '$lib/types';
import { CONTENT_DIR } from '$lib/config';

const actions = {
  async md(value: string) {
    return markdown.parseInline(value);
  },
  async md_block(value: string) {
    return markdown.parse(value, { breaks: true });
  },
  async page(value: string) {
    const page = await loadPageBySlug(value);

    return page
      ? {
          slug: value,
          pageData: page.pageData
        }
      : null;
  },
  async sub_pages(value: string) {
    const subPages: { slug: string; pageData: PageData }[] = [];
    const dir = join(CONTENT_DIR, 'pages', value);
    const files = await readdir(dir);

    for (const file of files) {
      if (file !== '_index.md' && file.includes('.md')) {
        const slug = join(value, file.replace('.md', ''));
        const data = await loadPageBySlug(slug);

        if (data?.pageData) {
          subPages.push({
            slug,
            pageData: data.pageData
          });
        }
      }
    }

    return subPages;
  }
} as const;

export async function processObject<T>(data: {
  [key: string]: any;
}): Promise<T> {
  const clonedData = JSON.parse(JSON.stringify(data));

  async function _processObject(obj: any) {
    for (const [key, value] of Object.entries(obj)) {
      const action = key.split(':')[1] as keyof typeof actions;

      if (actions[action]) {
        const cleanKey = key.split(':')[0];

        if (typeof value === 'string') {
          obj[cleanKey] = await actions[action](value);

          if (isPlainObject(obj[cleanKey])) {
            await _processObject(obj[cleanKey]);
          }

          delete obj[key];
        } else if (Array.isArray(value)) {
          obj[cleanKey] = [];

          for (let i = 0; i < value.length; i++) {
            if (typeof value[i] === 'string') {
              obj[cleanKey][i] = await actions[action](value[i]);

              if (isPlainObject(obj[cleanKey][i])) {
                await _processObject(obj[cleanKey][i]);
              }
            }
          }

          delete obj[key];
        }
      } else if (isPlainObject(value)) {
        await _processObject(value);
      }
    }
  }

  await _processObject(clonedData);

  return clonedData as T;
}
