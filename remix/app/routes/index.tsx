import { Link } from '@remix-run/react';

export default function Index() {
  const isLoggedIn = false;
  return (
    <div>
      <p>{isLoggedIn ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}</p>
      <p>
        <Link to="/secret">Secret</Link>
      </p>
    </div>
  );
}
