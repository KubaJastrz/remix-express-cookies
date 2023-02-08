import type { ActionFunction} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form } from '@remix-run/react';

export const action: ActionFunction = async () => {
  const response = await fetch('http://localhost:6000/login', {
    method: 'POST',
  });
  if (!response.ok) {
    return json({ error: 'Login failed' }, { status: response.status });
  }
  return redirect('/secret', {
    headers: { 'Set-Cookie': response.headers.get('Set-Cookie') || '' },
  });
};

export default function Login() {
  return (
    <Form method="post">
      <button type="submit">Login</button>
    </Form>
  );
}
