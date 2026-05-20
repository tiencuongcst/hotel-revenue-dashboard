import { createSupabaseServerClient } from "@/lib/supabase/client";

import type { RoomHotelOption } from "@/types/room/room-filter.types";

export async function getRoomHotelOptions(): Promise<RoomHotelOption[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("hotel_info")
    .select("hotel_code, hotel_name")
    .order("hotel_code", {
      ascending: true,
    })
    .limit(100);

  if (error) {
    console.error("getRoomHotelOptions error:", error.message);
    return [];
  }

  return (data ?? []).map((hotel) => ({
    hotel_code: hotel.hotel_code,
    hotel_name: hotel.hotel_name ?? hotel.hotel_code,
  }));
}