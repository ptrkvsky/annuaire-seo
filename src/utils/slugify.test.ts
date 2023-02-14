import { expect, test } from 'vitest';
import slugify from './slugify';

// Edit an assertion and save to see HMR in action

test('countWord("lorem ipsum dolor sit amet")', () => {
  const slug = slugify('lorem ipsum dolor sit amet');
  expect(slug).toBe('lorem-ipsum-dolor-sit-amet');

  const slug2 = slugify('àvec des accents é');
  expect(slug2).toBe('avec-des-accents-e');
});
