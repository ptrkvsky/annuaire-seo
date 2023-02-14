import { expect, test } from 'vitest';
import getArticlesByCategoryId from './getArticlesByCategoryId';

test('getArticlesByCategoryId(db2418f9-d00a-4b2d-a84b-354aef3f9ba0)', async () => {
  const articles = await getArticlesByCategoryId(
    'db2418f9-d00a-4b2d-a84b-354aef3f9ba0'
  );
  expect(articles.length).toBeGreaterThan(0);
  expect(articles[0].title).toBeDefined();
});
