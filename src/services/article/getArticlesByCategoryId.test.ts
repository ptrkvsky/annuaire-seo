import { expect, test } from 'vitest';
import getArticlesByCategoryId from './getArticlesByCategoryId';

test('getArticlesByCategoryId(5786ba5f-9d0d-47bd-9dbd-99c1c8bfeb2d)', async () => {
  const articles = await getArticlesByCategoryId(
    '5786ba5f-9d0d-47bd-9dbd-99c1c8bfeb2d'
  );
  expect(articles.length).toBeGreaterThan(0);
  expect(articles[0].title).toBeDefined();
});
