import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken');
  const { pathname } = request.nextUrl;

  if ((pathname === '/login' || pathname === '/signup') && accessToken) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  } else if (pathname !== '/login' && pathname !== '/signup' && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
};

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/mypage',
    '/wiki/:path*',
    '/wikilist',
    '/boards',
    '/board/:path*',
    '/addboards',
    '/testinterceptor'
  ],
};
