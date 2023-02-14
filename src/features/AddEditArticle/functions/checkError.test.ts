import type { IFormState } from './../interfaces/IFormState';
import { test, expect } from 'vitest';
import checkError from './checkError';

const fixtureFormState: IFormState = {
  articleId: undefined,
  title: '',
  articleCategory: '',
  content: '',
};

test('checkError(fixtureFormState)', () => {
  const error = checkError(fixtureFormState);
  expect(error?.errorCategory).toBe('Vous devez sélectionner une catégorie');
});
