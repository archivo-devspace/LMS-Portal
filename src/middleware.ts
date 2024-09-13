import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";

const allPath = ['/', '/setting/profile', '/setting/security', '/supplies/products', '/supplies/categories'];
const loggedInAsAdminPath = allPath;
const loggedInAsStaffPath = ['/', '/setting/profile', '/setting/security'];
const loggedOutPath = ['/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loginUrl = new URL('/login', request.url);
  const homeUrl = new URL('/', request.url);

  // Get the access token from cookies
  const accessToken = request.cookies.get(process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN as string)?.value;

  // Redirect to login if no access token is found
  if (!accessToken) {
    return loggedOutPath.includes(pathname) ? NextResponse.next() : NextResponse.redirect(loginUrl);
  }

  // Decode the JWT to extract the user details
  let decodedToken: any;
  try {
    decodedToken = jwtDecode(accessToken);
  } catch (error) {
    console.error('Invalid token:', error);
    return NextResponse.redirect(loginUrl);
  }

  const { role: userRole, sub: userId } = decodedToken;

  // Check if token has a valid user identifier
  if (!userId) {
    console.error('Invalid token: missing user identifier');
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logged-in users to home if they try to access logged-out paths
  if (loggedOutPath.includes(pathname)) {
    return NextResponse.redirect(homeUrl);
  }

  // Admin access control
  if (userRole === 'ADMIN') {
    if (pathname === '/setting') {
      return NextResponse.redirect(new URL('/setting/profile', request.url));
    }
    if ( pathname === '/supplies') {
      return NextResponse.redirect(new URL('/supplies/products', request.url));
    }
    if (loggedInAsAdminPath.includes(pathname)) {
      return NextResponse.next();
    }
  }

  // Normal user access control
  if (userRole === 'NORMAL_USER') {
    if (pathname === '/setting') {
      return NextResponse.redirect(new URL('/setting/profile', request.url));
    }
    if (loggedInAsStaffPath.includes(pathname)) {
      return NextResponse.next();
    }
    if (allPath.includes(pathname)) {
      return NextResponse.rewrite(new URL('/denied', request.url));
    }
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  // Default: Allow access
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
