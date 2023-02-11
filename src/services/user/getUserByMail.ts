import type { SanityUser } from '../../interfaces/SanityUser';
import sanityClient from '../../libs/sanity/sanityClient';

export async function getUserByMail(
  mail: string
): Promise<SanityUser | undefined> {
  const query = `*[_type == "user" && email=="${mail}"]`;
  const users = await sanityClient.instance.fetch<SanityUser[]>(query);
  if (users.length > 0) {
    const user = users[0];
    return user;
  }
  return undefined;
}
