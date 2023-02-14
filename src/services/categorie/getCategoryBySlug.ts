import type { SanityCategory } from '../../interfaces/SanityCategory';
import sanityClient from '@sanity/client';
import { sanityConfig } from '../../config/sanityConfig';

/**
 * @param slug - category's slug
 * @returns
 */
export default async function getCategoryBySlug(slug: string) {
  const params: { slug: string } = { slug };

  const query = `*[_type == "category" && slug.current == $slug]`;

  const client = sanityClient(sanityConfig);
  const categories = await client.fetch<SanityCategory[]>(query, params);

  if (categories.length > 0) {
    const category = categories[0];
    return category;
  }
  return undefined;
}
