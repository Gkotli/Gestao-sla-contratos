import { NextResponse } from 'next/server';

export function middleware(req) {
  const auth = req.headers.get('authorization');

  const username = process.env.SITE_USER;
  const password = process.env.SITE_PASSWORD;

  const validAuth =
    'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

  if (auth !== validAuth) {
    return new Response('Acesso restrito', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Site Privado"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
