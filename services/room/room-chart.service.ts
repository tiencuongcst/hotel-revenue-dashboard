import { createSupabaseServerClient }
from "@/lib/supabase/client";

import type {
  RoomFilterParams,
} from "@/types/room/room-filter.types";

import type {
  RoomChartResponse,
} from "@/types/room/room-chart.types";

export async function getRoomCharts(
  params: RoomFilterParams
): Promise<RoomChartResponse> {

  const supabase =
    createSupabaseServerClient();

  const { data, error } =
    await supabase.rpc(
      "rpc_room_charts",
      {
        p_hotel_code: params.hotelCode,
        p_year_stay: params.yearStay,
        p_month_stay: params.monthStay,
        p_report_date: params.reportDate,
      }
    );

  if (error) {
    console.error(
      "rpc_room_charts error",
      error
    );

    throw new Error(
      "Failed to load room chart data"
    );
  }

  if (!data) {
    return {
      snapshot_report_date: null,
      adr_daily: [],
      occ_daily: [],
    };
  }

  return data as RoomChartResponse;
}