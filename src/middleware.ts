import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the access token from cookies
  const accessToken = request.cookies.get(process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN as string)?.value;

  // Redirect to home page or another page if access token exists and the user tries to access the login page
  if (pathname === '/login' && accessToken) {
    return NextResponse.redirect(new URL('/', request.url)); // Change '/' to your desired page
  }

  // Allow access to the login page if no access token is found
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // Redirect to login if no access token is found
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect specific paths
  if (pathname === '/setting') {
    return NextResponse.redirect(new URL('/setting/profile', request.url));
  }

  if (pathname === '/supplies') {
    return NextResponse.redirect(new URL('/supplies/products', request.url));
  }

  // Allow access if all conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/setting/:path*', '/supplies/:path*', '/login'],
};
