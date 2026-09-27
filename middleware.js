import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { normalizeLocale } from './src/lib/locales';
import { isSignedInPath, preferredHostUrl } from './src/lib/publicRoutes';

const isAdminRoute = createRouteMatcher(['/:locale/admin(.*)']);
const isDealerRoute = createRouteMatcher(['/:locale/portal/listings(.*)', '/:locale/portal/sales(.*)']);

function localeFromPath(pathname) {
  const segment = pathname.split('/')[1];
  return normalizeLocale(segment);
}

export default clerkMiddleware(async (auth, request) => {
  const { pathname, search } = request.nextUrl;
  const preferredUrl = preferredHostUrl(request.url, request.headers.get('host'));
  if (preferredUrl) return NextResponse.redirect(preferredUrl, 308);

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/de${search}`, request.url), 308);
  }

  if (/^\/(login|register|forgot-password|reset-password)(\/|$)/.test(pathname)) {
    return NextResponse.redirect(new URL(`/de${pathname}${search}`, request.url), 308);
  }

  if (/^\/admin(\/|$)/.test(pathname)) {
    return NextResponse.redirect(new URL(`/de${pathname}${search}`, request.url), 308);
  }

  if (isAdminRoute(request) || isDealerRoute(request) || isSignedInPath(pathname)) {
    const { userId } = await auth();
    const locale = localeFromPath(pathname);

    if (!userId) {
      const loginUrl = new URL(`/${locale}/login`, request.url);
      // Preserve route choices such as ?protection=kariv through sign-in.
      // pathname + search is same-origin by construction and the login page
      // still validates return targets before navigating.
      loginUrl.searchParams.set('returnTo', `${pathname}${search}`);
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
  matcher: ['/((?!_next|.*\\..*).*)', '/robots.txt', '/sitemap.xml'],
};
