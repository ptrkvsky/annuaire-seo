import type { SanityArticle } from '@/interfaces/SanityArticle';
import type { APIContext, APIRoute } from 'astro';
import { getSession } from 'auth-astro';
import sanityClient from '@/libs/sanity/sanityClient';
import { getUserByMail } from '@/services/user/getUserByMail';
import generateId from '@/utils/generateId';
import { authOpts } from '@/pages/api/auth/[...astroAuth]';
import { createUser } from '@/services/user/createUser';
import { deleteUser } from '@/services/user/deleteUser';
import type { IFormArticle } from '@/interfaces/FomArticle';
import { createReadStream } from 'fs';

import slugify from '@/utils/slugify';
import { getElementById } from '@/services/article/getElementById';

export async function get({ params }: APIContext) {
  await deleteUser('newUser@gmail.com');

  return {
    body: JSON.stringify({ user: 'ggwp' }),
  };
}

export const post: APIRoute = async ({ request }) => {
  let session = await getSession(request, authOpts);

  if (!session || !session?.user?.email) {
    return new Response(null, { status: 400 });
  }

  let sanityUser = await getUserByMail(session.user.email);

  if (!sanityUser) {
    sanityUser = await createUser(session?.user?.email);
  }

  const formData = await request.formData();

  const postId = formData.get('articleId') || generateId(10);
  const formDataArticleId = formData.get('articleId');
  const formDataTitle = formData.get('title');
  const formDataArticleCategory = formData.get('articleCategory');

  const filenames = await Promise.all(
    formData.getAll('imageMain').map(async (formDataEntryValue) => {
      const file = formDataEntryValue as File;
      return {
        webkitRelativePath: file.webkitRelativePath,
        lastModified: file.lastModified,
        name: file.name,
        size: file.size,
        type: file.type,
        buffer: {
          type: 'Buffer',
          value: Array.from(new Int8Array(await file.arrayBuffer()).values()),
        },
      };
    })
  );

  console.log('filenames', filenames);
  const file = Buffer.from(filenames[0].buffer.value);

  const uploadImageFromUrl = await sanityClient.instance.assets.upload(
    'image',
    file
  );
  console.log(uploadImageFromUrl);
  // formDataImageMain && createReadStream(formDataImageMain.path)

  const sanityArticle = formDataArticleId
    ? await getElementById<SanityArticle>(formDataArticleId as string)
    : undefined;

  if (postId && sanityUser?._id && formDataTitle) {
    // const slugArticle = slugify(formDataTitle as string);
    // const newArticle: SanityArticle = {
    //   isActive: sanityArticle?.isActive || false,
    //   _id: postId as string,
    //   _type: 'article',
    //   articleCategory: {
    //     _ref: formDataArticleCategory,
    //     _type: 'reference',
    //   },
    //   articleUser: {
    //     _ref: sanityUser._id,
    //     _type: 'reference',
    //   },
    //   content: formData.content,
    //   slug: {
    //     _type: 'slug',
    //     current: slugArticle,
    //   },
    //   title: formData.title,
    // };

    try {
      // await sanityClient.instance.createOrReplace(newArticle);
      return new Response(
        JSON.stringify({
          message: 'Your name was: ',
        }),
        {
          status: 200,
        }
      );
    } catch (error: any) {
      console.error('🔥 Une erreur est survenue', error.details.description);

      return new Response(
        JSON.stringify({
          message: 'Une erreur inconnue est survenue',
        }),
        {
          status: 500,
        }
      );
    }
  }

  return new Response(
    JSON.stringify({
      message: 'Your name was: ',
    }),
    {
      status: 400,
    }
  );
};
