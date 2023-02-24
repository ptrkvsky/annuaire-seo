import type { SanityArticle } from './../interfaces/SanityArticle';

import type { Graph } from 'schema-dts';
import { getBreadcrumb } from './getBreadcrumb';

import getGraphWebsite from './getGraphWebsite';
import { type ParamsGetWebPage, getWebPage } from './getWebPage';
import type { IBreadcrumbGraphItem } from '@/interfaces/IBreadcrumbGraphItem';
import { getGraphBreadcrumbItems } from '@/features/article/functions/getGraphBreadcrumbItems';

export function getGraphBlogPost(post: SanityArticle) {
  const website = getGraphWebsite();
  const graphBreadcrumbItems: IBreadcrumbGraphItem[] =
    getGraphBreadcrumbItems(post);

  const paramsGetWebPage: ParamsGetWebPage = {
    url: `/${post.slug?.current}/`,
    datePublishedISO: post._createdAt || '',
    dateModifiedISO: post._updatedAt || '',
    breadcrumbId: '#breadcrumb',
    name: post.title,
    description: post.metaDesc,
  };

  const webpage = getWebPage(paramsGetWebPage);

  const breadcrumbList = getBreadcrumb(graphBreadcrumbItems);

  const schema: Graph = {
    '@context': 'https://schema.org',
    '@graph': [website, webpage, breadcrumbList],
  };

  return schema;
}
