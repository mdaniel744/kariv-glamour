import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/:locale/admin(.*)']);
const isDealerRoute = createRouteMatcher(['/:locale/dealer(.*)']);
const isSignedInRoute = createRouteMatcher([
  '/:locale/portal(.*)',
  '/:locale/cart(.*)',
  '/:locale/wishlist(.*)',
  '/:locale/checkout(.*)',
]);

function localeFromPath(pathname) {
  const segment = pathname.split('/')[1];
  return segment === 'en' ? 'en' : 'de';
}

export default clerkMiddleware(async (auth, request) => {
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

  if (isAdminRoute(request) || isDealerRoute(request) || isSignedInRoute(request)) {
    const { userId } = await auth();
    const locale = localeFromPath(pathname);

    if (!userId) {
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isAdminRoute(request) || isDealerRoute(request)) {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const role = user.publicMetadata?.role;

      if (isAdminRoute(request) && role !== 'admin' && role !== 'super_admin') {
        return NextResponse.redirect(new URL(`/${locale}/portal`, request.url));
      }
      if (isDealerRoute(request) && role !== 'dealer') {
        return NextResponse.redirect(new URL(`/${locale}/portal`, request.url));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
