import { expect, test } from 'vitest';
import { createUser } from './createUser';
import { deleteUser } from './deleteUser';
// Edit an assertion and save to see HMR in action

test('createUser()', async () => {
  const newUser = await createUser('testUser@gmail.com');
  expect(newUser?.email).toBe('testUser@gmail.com');
  // Delete User for test
  newUser?._id && (await deleteUser(newUser._id));
});
