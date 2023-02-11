import type { SanityUser } from '../../interfaces/SanityUser';
import sanityClient from '../../libs/sanity/sanityClient';
import generateId from '../../utils/generateId';

export async function createUser(email: string) {
  const userId = generateId(10);
  if (userId) {
    const userToPost = {
      _id: userId,
      _type: 'user',
      email,
    };

    const createdUser = await sanityClient.instance.createIfNotExists(
      userToPost
    );
    return createdUser as unknown as SanityUser;
  }
}
