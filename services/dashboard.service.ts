import { createSupabaseServerClient } from '@/lib/supabase/server';

import type {
  DashboardMetricDailyRow,
} from '@/types/dashboard';

export async function getDashboardDailyMetrics():
Promise<DashboardMetricDailyRow[]> {

  const supabase =
    createSupabaseServerClient();

  const { data, error } = await supabase
    .from('vw_dashboard_metric_daily')
    .select(`
      hotel_code,
      stay_date,
      room_sold,
      room_revenue,
      occupancy_pct,
      adr,
      revpar
    `)
    .limit(100);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as DashboardMetricDailyRow[];
}