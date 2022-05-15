import type { RequestHandler } from '@sveltejs/kit';
import { loadMarkdownFile } from '$lib/helpers/loadMarkdownFile';
import { getPageSlugs } from '$lib/helpers/getPageSlugs';

export const get: RequestHandler = async () => {
  try {
    const pages: {
      slug: string;
      title: string;
      description: string;
    }[] = [];
    const slugs = await getPageSlugs();

    for (const slug of slugs) {
      const { data } = await loadMarkdownFile(slug);
      pages.push({
        slug,
        title: data.meta.title,
        description: data.meta.description
      });
    }

    return {
      status: 200,
      body: pages
    };
  } catch (error) {
    return {
      status: 404,
      body: { message: 'Not found' }
    };
  }
};
