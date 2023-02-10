import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { cookieStorage } from '~/cookie';

export const loader = async ({ request }: LoaderArgs) => {
  const session = await cookieStorage.getSession(request.headers.get('Cookie') || '')
  const cookie = session.get('express-session') || '';

  const response = await fetch('http://localhost:6000/secret', {
    method: 'GET',
    headers: {
      Cookie: cookie,
    },
  });
  if (!response.ok) {
    console.log(response)
    return redirect('/login', {
      headers: {
        'Set-Cookie': await cookieStorage.destroySession(session),
      }
    });
  }
  return {
    secret: (await response.json()).secret,
  };
};

export default function Secret() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/logout">Logout</Link>
      <pre>secret: {data?.secret}</pre>
    </div>
  );
}
