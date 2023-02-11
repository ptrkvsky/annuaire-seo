import type { SanityArticle } from './../../interfaces/SanityArticle';
import sanityClient from '@sanity/client';
import { sanityConfig } from '../../config/sanityConfig';

/**
 *
 * @description retrun all Sanity Articles
 * @returns
 */
export async function getArticles() {
  const query = `*[_type == "article"]`;
  const client = sanityClient(sanityConfig);
  const articles = await client.fetch<SanityArticle[]>(query);

  return articles;
}
