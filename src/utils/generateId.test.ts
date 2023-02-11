import { expect, test } from 'vitest';
import generateId from './generateId';

// Edit an assertion and save to see HMR in action

test('generateId(4)', () => {
  const generatedId = generateId(4);
  expect(generatedId?.length).toBe(4);
  expect(generatedId).toBeTypeOf('string');
});

test('generateId(0)', () => {
  const generatedId = generateId(0);
  expect(generatedId?.length).toBe(10);
  expect(generatedId).toBeTypeOf('string');
});

test('generateId(-1)', () => {
  const generatedId = generateId(-1);
  expect(generatedId?.length).toBe(10);
  expect(generatedId).toBeTypeOf('string');
});
