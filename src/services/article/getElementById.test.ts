import type { SanityArticle } from './../../interfaces/SanityArticle';
import { expect, test } from 'vitest';
import { getElementById } from './getElementById';
// Edit an assertion and save to see HMR in action

test('getElement(8420f314-82cb-4891-bf39-9525b7b5f31c)', async () => {
  const sanityArticle = await getElementById<SanityArticle>(
    '8420f314-82cb-4891-bf39-9525b7b5f31c'
  );
  expect(sanityArticle).toBeDefined();
});
