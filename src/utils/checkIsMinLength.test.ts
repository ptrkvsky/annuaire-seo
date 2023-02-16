import { expect, test } from 'vitest';
import checkIsMinLength from './checkIsMinLength';

test('checkIsMinLength(lorem ipsum)', () => {
  const isValid = checkIsMinLength('lorem ipsum', 3);
  expect(isValid).toBeFalsy();
});

test('checkIsMinLength(lorem ipsum, 1)', () => {
  const isValid = checkIsMinLength('lorem ipsum', 1);
  expect(isValid).toBeTruthy();
});
