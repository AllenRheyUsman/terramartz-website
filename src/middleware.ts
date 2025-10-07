// import jwt from "jsonwebtoken";
// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// // ⚠️ Secret or public key for verifying JWT (must match backend)
// const JWT_SECRET = process.env.JWT_SECRET || "";

// // Define public routes (no login required)
// const PUBLIC_PATHS = [
//   "/", // homepage
//   "/products",
//   "/cart",
//   "/login",
//   "/register",
//   "/forgot-password",
// ];

// // Middleware entry point
// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // ✅ Skip Next.js internals & static assets
//   if (
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/favicon.ico") ||
//     pathname.startsWith("/images") ||
//     pathname.startsWith("/fonts") ||
//     pathname.startsWith("/icons")
//   ) {
//     return NextResponse.next();
//   }

//   // ✅ Allow public pages
//   if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
//     return NextResponse.next();
//   }

//   // 🔑 Get JWT from cookie
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return redirectToLogin(req);
//   }

//   try {
//     // 🔒 Verify token
//     const decoded = jwt.verify(token, JWT_SECRET) as {
//       role: "CUSTOMER" | "VENDOR" | "ADMIN";
//       exp: number;
//     };

//     // ⏰ Extra safety: check expiration
//     if (Date.now() >= decoded.exp * 1000) {
//       return redirectToLogin(req);
//     }

//     // 🛡️ Role-based access
//     if (pathname.startsWith("/customer") && decoded.role !== "CUSTOMER") {
//       return redirectToHome(req);
//     }

//     if (pathname.startsWith("/vendor") && decoded.role !== "VENDOR") {
//       return redirectToHome(req);
//     }

//     if (pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
//       return redirectToHome(req);
//     }

//     // ✅ Authorized
//     return NextResponse.next();
//   } catch (err) {
//     console.error("JWT verification failed:", err);
//     return redirectToLogin(req);
//   }
// }

// /**
//  * Redirect unauthenticated users to login
//  */
// function redirectToLogin(req: NextRequest) {
//   const loginUrl = new URL("/login", req.url);
//   loginUrl.searchParams.set("redirect", req.nextUrl.pathname); // keep where they came from
//   return NextResponse.redirect(loginUrl);
// }

// /**
//  * Redirect unauthorized users to homepage
//  */
// function redirectToHome(req: NextRequest) {
//   return NextResponse.redirect(new URL("/", req.url));
// }

// /**
//  * Apply only to protected routes
//  */
// export const config = {
//   matcher: [
//     "/customer/:path*",
//     "/vendor/:path*",
//     "/admin/:path*",
//     "/cart/:path*",
//     "/checkout/:path*",
//   ],
// };

// NOTE: This middleware is currently for testing purposes.
// Once the routes are finalized, we will review and fix any issues.
// If any issues are found, kindly comment out or modify the middleware code as needed.

import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/became-a-seller", "/forgot-password"];
const REDIRECTS = [
  { prefix: "/customer", redirectTo: "/became-a-seller" },
  { prefix: "/vendor", redirectTo: "/became-a-seller" },
  { prefix: "/admin", redirectTo: "/became-a-seller" },
];

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const isAuthenticated = Boolean(token);

  for (const route of REDIRECTS) {
    if (pathname.startsWith(route.prefix) && !isAuthenticated) {
      return NextResponse.redirect(new URL(route.redirectTo, request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/vendor/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/customer/:path*",
    "/vendor/:path*",
    "/admin/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/became-a-seller",
    "/forgot-password",
  ],
};
