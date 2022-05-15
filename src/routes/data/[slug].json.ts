import type { RequestHandler } from '@sveltejs/kit';
import { loadYmlFile } from '$lib/helpers/loadYmlFile';

export const get: RequestHandler = async ({ params }) => {
  try {
    const data = await loadYmlFile(params.slug);

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
