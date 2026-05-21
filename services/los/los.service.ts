import { createSupabaseServerClient } from "@/lib/supabase/server";

import type {
  LosHotelOption,
  LosMonthlyActualRow,
} from "@/types/los";

export async function getLosHotels(): Promise<LosHotelOption[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("hotel_info")
    .select(
      `
      hotel_code,
      hotel_name
      `
    )
    .eq("is_active", true)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    throw new Error(`Cannot load LOS hotels: ${error.message}`);
  }

  return data ?? [];
}

export async function getLosMonthlyActual(params: {
  hotelCode: string;
  stayYear: number;
  stayMonth: number;
}): Promise<LosMonthlyActualRow[]> {
  if (!params.hotelCode || !params.stayYear || !params.stayMonth) {
    return [];
  }

  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("vw_los_monthly_actual")
    .select(
      `
      hotel_code,
      stay_year,
      stay_month,
      stay_month_label,
      segment_group,
      booking_count,
      avg_lead_time,
      avg_los
      `
    )
    .eq("hotel_code", params.hotelCode)
    .eq("stay_year", params.stayYear)
    .eq("stay_month", params.stayMonth)
    .neq("segment_group", "FOC")
    .order("booking_count", {
      ascending: false,
    })
    .order("segment_group", {
      ascending: true,
    });

  if (error) {
    throw new Error(`Cannot load LOS monthly actual: ${error.message}`);
  }

  return (data ?? []) as LosMonthlyActualRow[];
}

export async function getLosYearlyTrend(params: {
  hotelCode: string;
  stayYear: number;
}): Promise<LosMonthlyActualRow[]> {
  if (!params.hotelCode || !params.stayYear) {
    return [];
  }

  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("vw_los_monthly_actual")
    .select(
      `
      hotel_code,
      stay_year,
      stay_month,
      stay_month_label,
      segment_group,
      booking_count,
      avg_lead_time,
      avg_los
      `
    )
    .eq("hotel_code", params.hotelCode)
    .eq("stay_year", params.stayYear)
    .neq("segment_group", "FOC")
    .order("stay_month", {
      ascending: true,
    })
    .order("segment_group", {
      ascending: true,
    });

  if (error) {
    throw new Error(`Cannot load LOS yearly trend: ${error.message}`);
  }

  return (data ?? []) as LosMonthlyActualRow[];
}