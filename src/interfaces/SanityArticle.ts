import type { SanitySlug } from './SanitySlug';

export interface SanityArticle {
  _createdAt?: Date;
  _id: string;
  _rev?: string;
  _type: 'article';
  _updatedAt?: Date;
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
    asset: {
      _ref: string;
      _type: 'reference';
      path?: string;
      url?: string;
    };
  };
  content: any[];
  slug: SanitySlug;
  title: string;
  isActive?: boolean;
}
