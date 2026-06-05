import { createSupabaseServerClient } from "@/lib/supabase/client";

import type {
  YoyHotelOption,
} from "@/types/yoy/yoy-filter.types";

export async function getYoyHotelOptions(): Promise<YoyHotelOption[]> {

  const supabase =
    createSupabaseServerClient();

  const { data, error } =
    await supabase
      .from("hotel_info")
      .select(
        "hotel_code, hotel_name"
      )
      .order(
        "hotel_code",
        {
          ascending: true,
        }
      )
      .limit(100);

  if (error) {
    console.error(
      "getYoyHotelOptions error:",
      error.message
    );

    return [];
  }

  return (data ?? []).map(
    (hotel) => ({
      hotel_code:
        hotel.hotel_code,

      hotel_name:
        hotel.hotel_name ??
        hotel.hotel_code,
    })
  );
}
