import type { SanityArticle } from '../../interfaces/SanityArticle';
import sanityClient from '@sanity/client';
import { sanityConfig } from '../../config/sanityConfig';

/**
 *
 * @description retrun all Sanity Articles from a User
 * @returns
 */
export async function getElementById<SanityDocument>(id: string) {
  const query = `*[_id == $id]`;
  const params = { id };
  const client = sanityClient(sanityConfig);
  const elements = await client.fetch<SanityDocument[]>(query, params);
  if (elements && elements.length > 0) {
    return elements[0];
  }
  return undefined;
}
