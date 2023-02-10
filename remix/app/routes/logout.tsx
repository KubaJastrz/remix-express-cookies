import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { cookieStorage } from '~/cookie';

export const loader = async ({ request }: LoaderArgs) => {
  const session = await cookieStorage.getSession(request.headers.get('Cookie') || '');
  const cookie = session.get('express-session') || '';

  await fetch('http://localhost:6000/logout', {
    method: 'POST',
    headers: {
      Cookie: cookie,
    },
  });

  return redirect('/', {
    headers: {
      'Set-Cookie': await cookieStorage.destroySession(session),
    },
  });
};
