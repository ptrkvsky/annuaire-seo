import sanityClient from '../../libs/sanity/sanityClient';

export async function deleteUser(documentId: string) {
  const createdUser = await sanityClient.instance
    .delete(documentId)
    .then(() => {
      console.log('Document supprimé');
    })
    .catch((err) => {
      console.error('🔥 Delete failed: ', err.message);
    });

  console.log('createdUser', createdUser);
}
