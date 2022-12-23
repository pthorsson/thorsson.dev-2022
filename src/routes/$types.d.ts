import type * as Kit from '@sveltejs/kit';
import type { MetaData, PageData } from '$lib/types';

type RouteParams = {
  slug: string;
};

export type PageLoad = Kit.Load<RouteParams>;

export type LandingPageData = {
  metaData: MetaData;
  heading: string;
  firstSubHeading: string;
  secondSubHeading: string;
  links: {
    text: string;
    href: string;
  }[];
  promotedPages: {
    slug: string;
    pageData: PageData;
  }[];
};
