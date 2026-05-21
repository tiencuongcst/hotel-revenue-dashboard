import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "rh_session";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(AUTH_COOKIE_NAME);

  const isLoginPage = request.nextUrl.pathname === "/login";

  if (!sessionCookie && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (sessionCookie && isLoginPage) {
    return NextResponse.redirect(new URL("/reports/performance", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/reports/:path*",
    "/dashboard/:path*",
    "/login",
  ],
};