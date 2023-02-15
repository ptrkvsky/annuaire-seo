import type { SanityCategory } from '../../interfaces/SanityCategory';
import { sanityConfig } from '@/config/sanityConfig';
import sanityClient from '@sanity/client';

/**
 *
 * @param idCategory - string
 */
export default async function getSisterCategories(idCategory: string) {
  const query = `*[_type == "category" && parent._ref== $idCategory]`;
  const params = { idCategory };
  const client = sanityClient(sanityConfig);
  const categories = await client.fetch<SanityCategory[]>(query, params);
  return categories;
}
