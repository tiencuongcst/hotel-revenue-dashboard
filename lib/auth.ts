import { cookies } from "next/headers";

const AUTH_COOKIE_NAME = "rh_session";

export type SessionUser = {
  user_id: string;
  user_name: string;
  hotel_code: string;
  can_view_all_hotels: boolean;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);

    if (!sessionCookie?.value) {
      return null;
    }

    return JSON.parse(sessionCookie.value);
  } catch (error) {
    console.error("getSessionUser error", error);

    return null;
  }
}