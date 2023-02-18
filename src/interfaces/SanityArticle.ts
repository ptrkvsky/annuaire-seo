import type { SanitySlug } from './SanitySlug';

export interface SanityArticle {
  _createdAt?: string;
  _id: string;
  _rev?: string;
  _type: 'article';
  _updatedAt?: string;
  articleCategory: {
    _id?: string;
    _ref: string;
    _type: 'reference';
    title?: string;
    slug?: SanitySlug;
  };
  articleUser: {
    _ref: string;
    _type: 'reference';
  };
  imageMain: {
    _type: 'image';
    alt?: string;
    asset: {
      _ref: string;
      _type: 'reference';
      path?: string;
      url?: string;
    };
  };
  content: any[];
  slug: SanitySlug;
  metaTitle: string;
  metaDesc: string;
  intro: string;
  title: string;
  isActive?: boolean;
}
