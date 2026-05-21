import { createSupabaseServerClient } from "@/lib/supabase/server";

import {
  SegmentPickupDailyParams,
  SegmentPickupDailyRow,
} from "@/types/segment/segment-pickup.types";

export async function getSegmentPickupDaily(
  params: SegmentPickupDailyParams
): Promise<SegmentPickupDailyRow[]> {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase.rpc(
      "rpc_get_segment_pickup_daily",
      {
        p_hotel_code: params.hotelCode,
        p_stay_year: params.stayYear,
        p_stay_month: params.stayMonth,
        p_report_date_1: params.pace1Date,
        p_report_date_2: params.pace2Date,
      }
    );

    if (error) {
      console.error(
        "[getSegmentPickupDaily] Supabase RPC Error:",
        error
      );

      throw new Error(error.message);
    }

    return (data ?? []) as SegmentPickupDailyRow[];
  } catch (error) {
    console.error(
      "[getSegmentPickupDaily] Unexpected Error:",
      error
    );

    return [];
  }
}