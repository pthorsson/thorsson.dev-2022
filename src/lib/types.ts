export type PageData = {
  layout: 'content' | 'landing' | 'collection';
  public: boolean;
  createdAt: string;
  animateTextReveals?: boolean;
  collection: { slug: string; data: PageData }[];
  meta: {
    title: string;
    description: string;
    image?: {
      src: string;
      alt: string;
    };
  };
  pageLinks: { slug: string; data: PageData }[];
};

export type MetaData = {
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

export type CvTemplateIntroContent = {
  heading: string;
  text: string;
  image: {
    src: string;
    alt: string;
  };
};

export type CvTemplateExperiencesContent = {
  heading: string;
  items: {
    from: string;
    to?: string;
    company: string;
    role: string;
    description: string;
  }[];
};

export type CvTemplateTextContent = {
  heading: string;
  text: string;
};

export type CvData = {
  meta: {
    title: string;
    description: string;
    fileName: string;
  };
  sections: (
    | {
        template: 'intro';
        content: CvTemplateIntroContent;
      }
    | {
        template: 'experiences';
        content: CvTemplateExperiencesContent;
      }
    | {
        template: 'text';
        content: CvTemplateTextContent;
      }
  )[];
};
