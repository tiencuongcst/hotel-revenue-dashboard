import { NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "rh_session";

export async function POST() {
  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set(AUTH_COOKIE_NAME, "", {
    path: "/",
    expires: new Date(0),
  });

  return response;
}