import type { SanityCategory } from './../../interfaces/SanityCategory';
import sanityClient from '@sanity/client';
import { sanityConfig } from '../../config/sanityConfig';

interface ParamsGetCategories {
  isVisible: boolean | undefined;
}
/**
 * @params only get categories for menu display
 * @description retrun all Sanity Categories
 * @returns
 */
export async function getCategories(
  params: ParamsGetCategories = { isVisible: false }
): Promise<SanityCategory[]> {
  let isVisibleQuery = '';

  const paramsQuery: {
    isVisible?: boolean;
  } = {};

  if (typeof params.isVisible === 'boolean') {
    isVisibleQuery = '&& isVisible == $isVisible';
    paramsQuery.isVisible = params.isVisible;
  }

  const query = `*[_type == "category" && !(_id in path('drafts.**')) ${isVisibleQuery}]`;
  const client = sanityClient(sanityConfig);
  const categories = await client.fetch<SanityCategory[]>(query, paramsQuery);

  return categories;
}
