import { createCookie, createCookieSessionStorage } from '@remix-run/node';

export const cookie = createCookie('remix-session', {
  maxAge: 20,
  secrets: ['Mati'],
});

export const cookieStorage = createCookieSessionStorage({
  cookie,
});
