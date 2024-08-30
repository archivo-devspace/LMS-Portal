import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/setting') {
    return NextResponse.redirect(new URL('/setting/profile', request.url));
  }

  if (pathname === '/supplies') {
    return NextResponse.redirect(new URL('/supplies/products', request.url));
  }

  return NextResponse.next();
}
