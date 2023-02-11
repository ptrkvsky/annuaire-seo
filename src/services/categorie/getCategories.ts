import type { SanityCategory } from './../../interfaces/SanityCategory';
import sanityClient from '@sanity/client';
import { sanityConfig } from '../../config/sanityConfig';

/**
 *
 * @description retrun all Sanity Categories
 * @returns
 */
export async function getCategories(): Promise<SanityCategory[]> {
  const query = `*[_type == "category"]`;
  const client = sanityClient(sanityConfig);
  const categories = await client.fetch<SanityCategory[]>(query);

  return categories;
}
