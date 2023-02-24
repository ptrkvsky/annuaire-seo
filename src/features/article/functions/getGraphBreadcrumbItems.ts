import type { IBreadcrumbGraphItem } from './../../../interfaces/IBreadcrumbGraphItem';
import type { SanityArticle } from './../../../interfaces/SanityArticle';
import slugify from '@/utils/slugify';

export function getGraphBreadcrumbItems(post: SanityArticle) {
  const breadcrumbItems: IBreadcrumbGraphItem[] = [
    {
      label: 'Accueil',
      slug: '/',
    },
    {
      label: post?.articleCategory?.title || '',
      slug: `/categorie/${slugify(post?.articleCategory?.title || '')}`,
    },
    {
      label: post.title,
      slug: `/article/${slugify(post?.slug?.current)}/`,
    },
  ];
  return breadcrumbItems;
}
