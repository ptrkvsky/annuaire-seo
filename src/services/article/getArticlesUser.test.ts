import { expect, test } from 'vitest';
import { getArticlesUser } from './getArticlesUser';
// Edit an assertion and save to see HMR in action

test('getArticlesUser(0bc2b766-1735-45c1-bbd5-1cdf48f0e719)', async () => {
  const articles = await getArticlesUser(
    '0bc2b766-1735-45c1-bbd5-1cdf48f0e719'
  );
  expect(articles).toBeDefined();
  expect(articles.length).toBeGreaterThan(0);
});
