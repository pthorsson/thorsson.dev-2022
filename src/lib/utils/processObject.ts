import { isPlainObject } from 'is-plain-object';
import markdown from '$lib/utils/markdown';
import { loadPageBySlug } from '$lib/utils/loadPageBySlug';

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
          data: page.pageData
        }
      : null;
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
