import type { SanityArticle } from './../../interfaces/SanityArticle';
import sanityClient from '@sanity/client';
import { sanityConfig } from '../../config/sanityConfig';

/**
 *
 * @description retrun all Sanity Articles from a User
 * @returns
 */
export async function getArticlesUser(refUser: string) {
  const query = `*[_type == "article" && articleUser._ref == $refUser]`;
  const params = { refUser };
  const client = sanityClient(sanityConfig);
  console.log(query, params);
  const articles = await client.fetch<SanityArticle[]>(query, params);

  return articles;
}
