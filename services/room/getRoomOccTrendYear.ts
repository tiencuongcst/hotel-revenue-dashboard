import { createSupabaseServerClient } from "@/lib/supabase/client";

import type { RoomFilterParams } from "@/types/room/room-filter.types";

import type { RoomOccTrendYearRow } from "@/types/room/room-kpi.types";

export async function getRoomOccTrendYear(
  params: RoomFilterParams
): Promise<RoomOccTrendYearRow[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.rpc(
    "rpc_room_occ_trend_year",
    {
      p_hotel_code: params.hotelCode,
      p_year_stay: params.yearStay,
      p_report_date: params.reportDate,
    }
  );

  if (error) {
    console.error(error);

    throw new Error("Failed to load room occ trend year");
  }

  console.log("ROOM_OCC_TREND_YEAR", {
    params,
    data,
  });

  return data ?? [];
}