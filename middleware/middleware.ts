// middleware.ts
import { auth } from "../lib/auth.js";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname, search } = req.nextUrl;

  const isAuthRoute = pathname.startsWith("/auth");
  // Public routes can be listed here if you have more, e.g.: ["/", "/about"]
  const isPublic = isAuthRoute;

  if (!isLoggedIn && !isPublic) {
    const loginUrl = new URL("/auth/login", req.nextUrl);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  // Skip static files and API
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
