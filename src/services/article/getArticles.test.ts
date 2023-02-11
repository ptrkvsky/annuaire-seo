import { expect, test } from 'vitest';
import { getArticles } from './getArticles';
// Edit an assertion and save to see HMR in action

test('getArticleBySlug()', async () => {
  const articles = await getArticles();
  expect(articles).toBeDefined();
  expect(articles.length).toBeGreaterThan(0);
});
