import type { SanityArticle } from './../../interfaces/SanityArticle';
import sanityClient from '@sanity/client';
import { sanityConfig } from '../../config/sanityConfig';

/**
 *
 * @description retrun all Sanity Articles from a User
 * @returns
 */
export async function getArticlesUser(refUser: string) {
  const query = `*[_type == "article" && !(_id in path('drafts.**')) && !(_id in path('drafts.**')) && articleUser._ref == $refUser]{_createdAt,_id,intro,metaTitle,metaDesc,title,isActive,content,slug,imageMain{asset->{path,url}}, articleCategory->{title,slug,_ref, _id} }`;
  const params = { refUser };
  const client = sanityClient(sanityConfig);
  const articles = await client.fetch<SanityArticle[]>(query, params);

  return articles;
}
