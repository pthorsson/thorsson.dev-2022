import type { PageLoad } from './$types';
import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import { loadPageBySlug } from '$lib/utils/loadPageBySlug';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export const load: PageLoad = async ({ params }) => {
  const data = await loadPageBySlug(params.slug);

  if (!data) {
    throw error(404, 'Not found');
  }

  return data;
};
