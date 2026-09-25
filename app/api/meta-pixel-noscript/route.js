import { NextResponse } from 'next/server';

const PIXEL_URL = 'https://www.facebook.com/tr?id=1084417767682071&ev=PageView&noscript=1';
const CONSENT_KEY = 'kariv-meta-marketing-consent-v1';
const RESPONSE_HEADERS = { 'Cache-Control': 'private, no-store' };

export function GET(request) {
  if (request.cookies.get(CONSENT_KEY)?.value !== 'accepted') {
    return new NextResponse(null, { status: 204, headers: RESPONSE_HEADERS });
  }

  return NextResponse.redirect(PIXEL_URL, { status: 307, headers: RESPONSE_HEADERS });
}
