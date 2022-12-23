import type { PageLoad } from './$types';
import type { SiteMetaData } from '$lib/types';
import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import { loadDataFile } from '$lib/utils/loadDataFile';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export const load: PageLoad = async () => {
  const data = await loadDataFile<SiteMetaData>('meta');

  if (!data) {
    throw error(500, 'Could not load site meta data');
  }

  return data;
};
