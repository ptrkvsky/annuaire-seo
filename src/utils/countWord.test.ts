import { expect, test } from 'vitest';
import countWord from './countWord';

// Edit an assertion and save to see HMR in action

test('countWord("lorem ipsum dolor sit amet")', () => {
  const nbWords = countWord('lorem ipsum dolor sit amet');
  expect(nbWords).toBe(5);
});

test('countWord("")', () => {
  const nbWords = countWord('');
  expect(nbWords).toBe(0);
});
