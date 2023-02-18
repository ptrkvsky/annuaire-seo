import type { SanitySlug } from './SanitySlug';

export interface SanityCategory {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: 'category';
  _updatedAt: Date;
  slug: SanitySlug;
  title: string;
  isVisible: boolean;
  parent?: {
    _ref: string;
    _type: string;
  };
}
