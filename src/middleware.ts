import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";

const loggedInAsAdminPath = ['/' ,'/setting/profile', '/setting/security', '/supplies/products', '/supplies/categories'];
const loggedInAsStaffPath = [ '/','/setting/profile', '/setting/security'];
const loggedOutPath = ['/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the access token from cookies
  const accessToken = request.cookies.get(process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN as string)?.value;

  // Redirect to login if no access token is found
  if (!accessToken) {
    if (loggedOutPath.includes(pathname)) {
      return NextResponse.next(); // Allow access to login and registration paths
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Decode the JWT to extract the user role
  let userRole: string;
  try {
    const decodedToken: any = jwtDecode(accessToken);
    userRole = decodedToken.role;
  } catch (error) {
    console.error('Invalid token:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect users already logged in to the home page if they try to access logged out paths
  if (accessToken && loggedOutPath.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Check access for ADMIN users
  if (userRole === 'ADMIN') {
    // Redirect if accessing unauthorized paths
    if (pathname === '/setting' || pathname === '/supplies') {
      return NextResponse.redirect(new URL('/setting/profile', request.url));
    }
    // Admin can access any admin-designated route
   if (loggedInAsAdminPath.includes(pathname)) {
      return NextResponse.next();
    }
  }

  // Check access for NORMAL_USER users
  if (userRole === 'NORMAL_USER') {
    // Redirect if accessing unauthorized paths
    if (pathname === '/setting') {
      return NextResponse.redirect(new URL('/setting/profile', request.url));
    }

    // Normal users can access only allowed routes
     if (loggedInAsStaffPath.includes(pathname)) {
      return NextResponse.next();
    }

    // If trying to access unauthorized paths, redirect to home
    return NextResponse.rewrite(new URL('/denied', request.url));
  }

  // Allow access if all conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/setting/:path*', '/supplies/:path*', '/login'],
};




// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { jwtDecode } from "jwt-decode";

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Get the access token from cookies
//   const accessToken = request.cookies.get(process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN as string)?.value;


//     // Allow access to the login page if no access token is found
//   if (pathname === '/login') {
//     return NextResponse.next();
//     }
  
//   // Redirect to the login page if no access token is found
//   if (!accessToken) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // Decode the JWT to extract the user role
//   let userRole;
//   try {
//     const decodedToken = jwtDecode(accessToken);
//     userRole = decodedToken.role;
//   } catch (error) {
//     console.error('Invalid token:', error);
//     return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login if token is invalid
//   }

//   // Role-based access control
//   if (pathname === '/login' && accessToken) {
//     return NextResponse.redirect(new URL('/', request.url)); // Redirect to home if logged in
//   }

//   if (userRole === 'ADMIN') {
//     // Admin can access all routes
//     return NextResponse.next();
//   }

//   if (userRole === 'NORMAL_USER') {
//     // Normal users can access specific routes
//     if (
//       pathname === '/' || 
//       pathname.startsWith('/setting/profile') ||
//       pathname.startsWith('/setting/security')
//     ) {
//       return NextResponse.next();
//     } else {
//       // Redirect to home if trying to access unauthorized paths
//       return NextResponse.redirect(new URL('/', request.url));
//     }
//   }

//   // Fallback: Deny access if the role is not recognized
//   return NextResponse.redirect(new URL('/login', request.url));
// }

// export const config = {
//   matcher: ['/', '/setting/:path*', '/supplies/:path*', '/login'],
// };
