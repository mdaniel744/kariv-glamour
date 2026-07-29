import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/de${search}`, request.url), 308);
  }

  if (/^\/(login|register|forgot-password|reset-password)(\/|$)/.test(pathname)) {
    return NextResponse.redirect(new URL(`/de${pathname}${search}`, request.url), 308);
  }

  if (/^\/admin(\/|$)/.test(pathname)) {
    return NextResponse.redirect(new URL(`/de${pathname}${search}`, request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register', '/forgot-password', '/reset-password', '/admin/:path*'],
};
