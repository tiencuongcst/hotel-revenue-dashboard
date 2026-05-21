import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const AUTH_COOKIE_NAME = "rh_session";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const userId = body.user_id?.trim();
    const password = body.password?.trim();

    if (!userId || !password) {
      return NextResponse.json(
        { success: false, message: "Missing credentials" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase.rpc("rpc_login_user", {
      p_user_id: userId,
      p_password: password,
    });

    if (error || !data || data.length === 0) {
      console.error("Login RPC error:", error);

      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const loginUser = data[0];

    const response = NextResponse.json({
      success: true,
      user: loginUser,
    });

    response.cookies.set(AUTH_COOKIE_NAME, JSON.stringify(loginUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("login api error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}