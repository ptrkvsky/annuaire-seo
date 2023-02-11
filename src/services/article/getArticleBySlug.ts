import type { SanityArticle } from './../../interfaces/SanityArticle';
import sanityClient from '@sanity/client';
import { sanityConfig } from '../../config/sanityConfig';

/**
 *
 * @description retrun all Sanity Articles
 * @param slug - article's slug
 * @param isActive - default true, pass false if you want not active article
 * @returns
 */
export async function getArticleBySlug(slug: string, isActive: boolean = true) {
  const query = `*[_type == "article" && slug.current == $slug && isActive == $isActive]`;
  const params = { slug, isActive };

  const client = sanityClient(sanityConfig);
  const articles = await client.fetch<SanityArticle[]>(query, params);

  if (articles.length > 0) {
    const article = articles[0];
    return article;
  }
  return undefined;
}
