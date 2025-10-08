import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  const sessionCookie = getSessionCookie(req);

  const res = NextResponse.next();

  const isLoggedIn = !!sessionCookie;
  const isOnProtectedRoute = nextUrl.pathname.startsWith("/dashboard");
  const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");

  if (isOnProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackURL", nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
