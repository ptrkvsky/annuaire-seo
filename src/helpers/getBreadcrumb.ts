import type { IBreadcrumbGraphItem } from '@/interfaces/IBreadcrumbGraphItem';
import type { BreadcrumbList } from 'schema-dts';
import { seoConfig } from '../config';

export function getBreadcrumb(breadcrumbItems: IBreadcrumbGraphItem[]) {
  const itemListElement = breadcrumbItems.map((breadCrumbItem, index) => ({
    '@type': 'ListItem',
    position: index,
    name: breadCrumbItem.label,
    item: `${seoConfig.baseURL}${breadCrumbItem.slug}`,
  })) as any;

  const breadcrumbList: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    itemListElement,
  };
  return breadcrumbList;
}
