import { createSupabaseServerClient } from "@/lib/supabase/server";

import {
  SegmentMonthlyPerformanceParams,
  SegmentMonthlyPerformanceRow,
} from "@/types/segment/segment-performance.types";

export async function getSegmentMonthlyPerformance(
  params: SegmentMonthlyPerformanceParams
): Promise<SegmentMonthlyPerformanceRow[]> {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase.rpc(
      "rpc_get_segment_monthly_performance",
      {
        p_hotel_code: params.hotelCode,
        p_stay_year: params.stayYear,
        p_report_date: params.reportDate,
      }
    );

    if (error) {
      console.error(
        "[getSegmentMonthlyPerformance] Supabase RPC Error:",
        error
      );

      throw new Error(error.message);
    }

    return (data ?? []) as SegmentMonthlyPerformanceRow[];
  } catch (error) {
    console.error("[getSegmentMonthlyPerformance] Unexpected Error:", error);

    return [];
  }
}