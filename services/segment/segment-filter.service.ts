import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SegmentFilters } from "@/types/segment/segment-filter.types";

export async function getSegmentDefaultFilters(): Promise<SegmentFilters> {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("vw_segment_daily")
      .select(
        `
        hotel_code,
        report_date,
        stay_year,
        stay_month
      `
      )
      .order("report_date", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      throw new Error(error?.message ?? "Cannot load default filters");
    }

    const previousReportDate = await getPreviousAvailableSegmentReportDate(
      data.hotel_code,
      data.report_date
    );

    return {
      hotelCode: data.hotel_code,
      stayYear: Number(data.stay_year),
      stayMonth: Number(data.stay_month),
      reportDate: data.report_date,
      pace1Date: data.report_date,
      pace2Date: previousReportDate ?? data.report_date,
    };
  } catch (error) {
    console.error("[getSegmentDefaultFilters] Unexpected Error:", error);

    return {
      hotelCode: "",
      stayYear: new Date().getFullYear(),
      stayMonth: new Date().getMonth() + 1,
      reportDate: "",
      pace1Date: "",
      pace2Date: "",
    };
  }
}

export async function getPreviousAvailableSegmentReportDate(
  hotelCode: string,
  reportDate: string
): Promise<string | null> {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("vw_segment_daily")
      .select("report_date")
      .eq("hotel_code", hotelCode)
      .lt("report_date", reportDate)
      .order("report_date", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data.report_date;
  } catch (error) {
    console.error(
      "[getPreviousAvailableSegmentReportDate] Unexpected Error:",
      error
    );

    return null;
  }
}