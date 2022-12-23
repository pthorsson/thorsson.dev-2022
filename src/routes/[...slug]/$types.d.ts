import type * as Kit from '@sveltejs/kit';

type RouteParams = {
  slug: string;
};

export type PageLoad = Kit.Load<RouteParams>;
