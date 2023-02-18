import type { SanityCategory } from './../../interfaces/SanityCategory';
import sanityClient from '@sanity/client';
import { sanityConfig } from '../../config/sanityConfig';

/**
 * @params only get categories for menu display
 * @description retrun all Sanity Categories
 * @returns
 */
export async function getCategories(
  params = { isVisible: false }
): Promise<SanityCategory[]> {
  let isVisibleQuery = '';
  const paramsQuery: {
    isVisible?: boolean;
  } = {};

  if (typeof params.isVisible === 'boolean') {
    isVisibleQuery = '&& isVisible == $isVisible';
    paramsQuery.isVisible = params.isVisible;
  }

  const query = `*[_type == "category" ${isVisibleQuery}]`;

  console.log(query, paramsQuery);

  const client = sanityClient(sanityConfig);
  const categories = await client.fetch<SanityCategory[]>(query, paramsQuery);

  return categories;
}
