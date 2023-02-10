import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { cookieStorage } from '~/cookie';

export const action: ActionFunction = async () => {
  const response = await fetch('http://localhost:6000/login', {
    method: 'POST',
  });
  if (!response.ok) {
    return json({ error: 'Login failed' }, { status: response.status });
  }

  const session = await cookieStorage.getSession();
  session.set('express-session', response.headers.get('Set-Cookie') || '');

  return redirect('/secret', {
    headers: { 'Set-Cookie': await cookieStorage.commitSession(session) },
  });
};

export default function Login() {
  return (
    <Form method="post">
      <button type="submit">Login</button>
    </Form>
  );
}
