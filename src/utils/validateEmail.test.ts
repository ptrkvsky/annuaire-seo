import { expect, test } from 'vitest';
import { validateEmail } from './validateEmail';
// Edit an assertion and save to see HMR in action

test('validateEmail(johan.petrikovsky@gmail.com)', async () => {
  const isEmail = validateEmail('johan.petrikovsky@gmail.com');
  expect(isEmail).toBeTruthy();
});

test('validateEmail(emailnonvalide)', async () => {
  const isEmail = validateEmail('emailnonvalide');
  expect(isEmail).toBeFalsy();
});
