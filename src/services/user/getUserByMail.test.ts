import { expect, test } from 'vitest';
import { getUserByMail } from './getUserByMail';
// Edit an assertion and save to see HMR in action

test('getUserByMail()', async () => {
  const userJohan = await getUserByMail('johan.petrikovsky@gmail.com');
  expect(userJohan?.email).toBe('johan.petrikovsky@gmail.com');

  const userMail = await getUserByMail('mailbidon@gmail.com');
  expect(userMail).toBeUndefined();
});
