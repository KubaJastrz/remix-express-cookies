import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

export const loader = async ({ request }: LoaderArgs) => {
  const cookie = request.headers.get('Cookie') || '';
  await fetch('http://localhost:6000/logout', {
    method: 'POST',
    headers: {
      Cookie: cookie,
    },
  });
  return redirect('/', {
    headers: {
      'Set-Cookie': 'express-session=0;',
    },
  });
};
