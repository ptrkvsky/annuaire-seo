import type { SanityArticle } from './../../interfaces/SanityArticle';
import sanityClient from '@sanity/client';
import { sanityConfig } from '../../config/sanityConfig';

/**
 *
 * @description retrun all Sanity Articles
 * @param slug - article's slug
 * @param isActive - default undefined, pass false if you want not active article
 * @returns
 */
export async function getArticleBySlug(
  slug: string,
  isActive: boolean | undefined = undefined
) {
  let isActiveQuery = '';
  const params: { slug: string; isActive?: boolean } = { slug };

  if (typeof isActive === 'boolean') {
    isActiveQuery = '&& isActive == $isActive';
    params.isActive = isActive;
  }

  const query = `*[_type == "article" && slug.current == $slug ${isActiveQuery}]{_createdAt,intro,metaTitle,metaDesc,title,isActive,content,slug,imageMain{asset->{path,url}}, articleCategory->{title,slug,_ref, _id} }`;

  const client = sanityClient(sanityConfig);
  const articles = await client.fetch<SanityArticle[]>(query, params);

  if (articles.length > 0) {
    const article = articles[0];
    return article;
  }
  return undefined;
}
