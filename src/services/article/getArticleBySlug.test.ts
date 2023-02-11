import { expect, test } from 'vitest';
import { getArticleBySlug } from './getArticleBySlug';
// Edit an assertion and save to see HMR in action

test('getArticleBySlug(article-test)', async () => {
  const article = await getArticleBySlug('article-test', false);
  expect(article?.slug.current).toBe('article-test');
});

test('getArticleBySlug(this is not a valid slug)', async () => {
  const articleUndefined = await getArticleBySlug('this is not a valid slug');
  expect(articleUndefined).toBeUndefined();
});
