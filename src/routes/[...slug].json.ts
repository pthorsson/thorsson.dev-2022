import type { RequestHandler } from '@sveltejs/kit';
import { loadMarkdownFile } from '$lib/helpers/loadMarkdownFile';

export const get: RequestHandler = async ({ params }) => {
  try {
    const data = await loadMarkdownFile(params.slug);

    return {
      status: 200,
      body: data
    };
  } catch (error) {
    return {
      status: 404,
      body: { message: 'Not found' }
    };
  }
};
