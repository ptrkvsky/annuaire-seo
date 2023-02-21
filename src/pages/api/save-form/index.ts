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
import checkIsMinLength from '@/utils/checkIsMinLength';
import checkForm, {
  ParamsCheckForm,
} from '@/features/AddEditArticle/api/checkForm';
import getFileFromField from '@/features/AddEditArticle/api/getFileFromField';

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
  const formDataTitle = formData.get('title') as string;
  const formDataArticleCategory = formData.get('articleCategory') as string;
  const formDataContent = formData.get('content') as string;
  const file = await getFileFromField(formData, 'imageMain');

  const params = {
    formDataTitle,
    formDataArticleCategory,
    formDataContent,
  } as ParamsCheckForm;

  checkForm(params);

  const sanityArticle = formDataArticleId
    ? await getElementById<SanityArticle>(formDataArticleId as string)
    : undefined;

  let uploadImageFromUrl = null;
  let asset = sanityArticle?.imageMain.asset;
  if (file) {
    uploadImageFromUrl = await sanityClient.instance.assets.upload(
      'image',
      file
    );
    asset = {
      _ref: uploadImageFromUrl._id,
      _type: 'reference',
    };
  }

  if (postId && sanityUser?._id && formDataTitle) {
    const slugArticle = slugify(formDataTitle as string);

    const newArticle: SanityArticle = {
      isActive: sanityArticle?.isActive || false,
      _id: postId as string,
      _type: 'article',
      articleCategory: {
        _ref: formDataArticleCategory,
        _type: 'reference',
      },
      imageMain: {
        _type: 'image',
        asset,
      },
      articleUser: {
        _ref: sanityUser._id,
        _type: 'reference',
      },
      content: JSON.parse(formDataContent) as any,
      slug: {
        _type: 'slug',
        current: slugArticle,
      },
      title: formDataTitle,
      metaTitle: '',
      metaDesc: '',
      intro: '',
    };

    try {
      // await sanityClient.instance.createOrReplace(newArticle);
      return new Response(
        JSON.stringify({
          message: 'Your name was: ',
          uploadImageFromUrl,
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
