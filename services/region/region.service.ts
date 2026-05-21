import { createSupabaseServerClient } from "@/lib/supabase/server";

import type {
  RegionFilterOption,
  RegionFilters,
  RegionMarketDetail,
  RegionNationalityTrend,
  RegionSummary,
} from "@/types/region";

export async function getRegionFilters(
  hotelCode: string | null = null
): Promise<RegionFilterOption[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.rpc("rpc_source_market_filters", {
    p_hotel_code: hotelCode,
  });

  if (error) {
    console.error("getRegionFilters:", error.message);
    return [];
  }

  return (data ?? []) as RegionFilterOption[];
}

export async function getRegionSummary(
  filters: RegionFilters
): Promise<RegionSummary | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.rpc("rpc_source_market_summary", {
    p_hotel_code: filters.hotelCode,
    p_stay_year: filters.year,
    p_stay_month: filters.month,
  });

  if (error) {
    console.error("getRegionSummary:", error.message);
    return null;
  }

  return ((data ?? [])[0] ?? null) as RegionSummary | null;
}

export async function getRegionMarketDetail(
  filters: RegionFilters
): Promise<RegionMarketDetail[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.rpc("rpc_source_market_detail", {
    p_hotel_code: filters.hotelCode,
    p_stay_year: filters.year,
    p_stay_month: filters.month,
  });

  if (error) {
    console.error("getRegionMarketDetail:", error.message);
    return [];
  }

  return (data ?? []) as RegionMarketDetail[];
}

export async function getRegionNationalityTrend(
  filters: RegionFilters
): Promise<RegionNationalityTrend[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.rpc(
    "rpc_source_market_nationality_trend",
    {
      p_hotel_code: filters.hotelCode,
      p_stay_year: filters.year,
      p_market_group: filters.marketGroup,
    }
  );

  if (error) {
    console.error("getRegionNationalityTrend:", error.message);
    return [];
  }

  return (data ?? []) as RegionNationalityTrend[];
}
