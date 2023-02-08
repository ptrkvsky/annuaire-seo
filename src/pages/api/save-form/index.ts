import type { APIContext, APIRoute } from 'astro';
import { getSession } from 'auth-astro';
import generateId from '../../../utils/generateId';
import { getToday } from '../../../utils/getToday';
import { authOpts } from '../auth/[...astroAuth]';

export async function get({ params, request }: APIContext) {
  console.log(params);
  // console.log(request);
  return {
    body: JSON.stringify({
      path: new URL(request.url).pathname,
    }),
  };
}

export const post: APIRoute = async ({ request }) => {
  let session = await getSession(request, authOpts);

  if (!session) {
    return new Response(null, { status: 400 });
  }

  const body = await request.json();

  const { email, content } = body;

  const dataToPost = {
    _id: generateId(10),
    _type: 'article',
    date: getToday(),
  };

  return new Response(
    JSON.stringify({
      message: 'Your name was: ' + email,
    }),
    {
      status: 200,
    }
  );
};
