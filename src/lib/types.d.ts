export type MetaData = {
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
};

export type PageData = {
  layout: 'content' | 'collection';
  public: boolean;
  createdAt: string;
  meta: MetaData;
  animateTextReveals?: boolean;
  collection: { slug: string; pageData: PageData }[];
};

export type SiteMetaData = {
  baseTitle: string;
  navigation: {
    indexLinkText: {
      main: string;
      suffix: string;
    };
    links: {
      text: string;
      href: string;
    }[];
  };
};
