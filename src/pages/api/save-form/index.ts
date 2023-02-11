import type { APIContext, APIRoute } from 'astro';
import { getSession } from 'auth-astro';
import sanityClient from '../../../libs/sanity/sanityClient';
import { getUserByMail } from '../../../services/user/getUserByMail';
import generateId from '../../../utils/generateId';
import { authOpts } from '../auth/[...astroAuth]';
import { createUser } from '../../../services/user/createUser';
import { deleteUser } from '../../../services/user/deleteUser';
import type { FormArticle } from '../../../interfaces/FomArticle';
import type { SanityArticle } from '../../../interfaces/SanityArticle';
import { slugify } from '../../../utils/slugify';

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

  const body: FormArticle = await request.json();
  const postId = generateId(10);

  if (postId && sanityUser?._id) {
    const slugArticle = slugify(body.title);
    const newArticle: SanityArticle = {
      isActive: false,
      _id: postId,
      _type: 'article',
      articleCategory: {
        _ref: body.articleCategory,
        _type: 'reference',
      },
      articleUser: {
        _ref: sanityUser._id,
        _type: 'reference',
      },
      content: body.content,
      slug: {
        _type: 'slug',
        current: slugArticle,
      },
      title: body.title,
    };
    sanityClient.instance.createOrReplace(newArticle);

    return new Response(
      JSON.stringify({
        message: 'Your name was: ',
      }),
      {
        status: 200,
      }
    );
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
