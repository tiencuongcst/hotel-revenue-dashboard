import { createSupabaseServerClient }
from "@/lib/supabase/client";

import type {
  YoyFilterParams,
} from "@/types/yoy/yoy-filter.types";

import type {
  YoyChartResponse,
} from "@/types/yoy/yoy-chart.types";

export async function getYoyCharts(
  params: YoyFilterParams
): Promise<YoyChartResponse> {

  const supabase =
    createSupabaseServerClient();

  const { data, error } =
    await supabase.rpc(
      "rpc_yoy_charts",
      {
        p_hotel_code: params.hotelCode,
        p_year: params.yearStay,
        p_report_date: params.reportDate,
      }
    );

  if (error) {
    console.error(
      "rpc_yoy_charts error",
      error
    );

    throw new Error(
      "Failed to load YOY chart data"
    );
  }

  return (data ?? []) as YoyChartResponse;
}
