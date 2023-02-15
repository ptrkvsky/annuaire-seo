import { test, expect } from 'vitest';
import getSisterCategories from './getSisterCategories';

test('getSisterCategories(db2418f9-d00a-4b2d-a84b-354aef3f9ba0)', async () => {
  const categories = await getSisterCategories(
    'db2418f9-d00a-4b2d-a84b-354aef3f9ba0'
  );
  expect(categories.length).toBeGreaterThan(0);
});
