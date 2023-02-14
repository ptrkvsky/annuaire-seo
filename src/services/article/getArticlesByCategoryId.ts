import { sanityConfig } from '@/config/sanityConfig';
import type { SanityArticle } from '@/interfaces/SanityArticle';
import sanityClient from '@sanity/client';

export default async function getArticlesByCategoryId(idCategory: string) {
  const query = `*[_type == "article" && isActive == true && articleCategory._ref == $idCategory]`;
  const params = { idCategory };
  const client = sanityClient(sanityConfig);
  const articles = await client.fetch<SanityArticle[]>(query, params);

  return articles;
}
