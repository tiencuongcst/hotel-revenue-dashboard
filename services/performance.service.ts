import { createSupabaseServerClient } from '@/lib/supabase/server';

import type {
  DashboardMonthlySummary,
  MonthlyPerformanceRow,
  PickupCurveMetric,
  PickupCurveRow,
  PerformanceDailyActualRow,
  PerformancePickupOccCurveRow,
} from '@/types/performance';

type BasePerformanceParams = {
  hotelCode: string;
  stayYear: number;
  stayMonth: number;
  reportDate: string;
};

function logRpcEmptyResult(
  rpcName: string,
  params: BasePerformanceParams,
  rowCount: number
) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[${rpcName}] params`, params);
    console.log(`[${rpcName}] rows`, rowCount);
  }
}

export async function getDashboardMonthlySummary(
  params: BasePerformanceParams
): Promise<DashboardMonthlySummary | null> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.rpc(
    'rpc_get_dashboard_monthly_summary',
    {
      p_hotel_code: params.hotelCode,
      p_stay_year: params.stayYear,
      p_stay_month: params.stayMonth,
      p_report_date: params.reportDate,
    }
  );

  if (error) {
    console.error('monthly summary error:', error.message);
    return null;
  }

  return (data?.[0] ?? null) as DashboardMonthlySummary | null;
}

export async function getMonthlyPerformanceTable(
  params: BasePerformanceParams
): Promise<MonthlyPerformanceRow[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.rpc(
    'rpc_get_monthly_performance_table',
    {
      p_report_date: params.reportDate,
      p_stay_year: params.stayYear,
      p_stay_month: params.stayMonth,
      p_hotel_code: params.hotelCode,
    }
  );

  if (error) {
    console.error('monthly performance table error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    return [];
  }

  logRpcEmptyResult(
    'rpc_get_monthly_performance_table',
    params,
    data?.length ?? 0
  );

  return (data ?? []) as MonthlyPerformanceRow[];
}

export async function getPickupCurve(
  params: BasePerformanceParams & {
    metric: PickupCurveMetric;
  }
): Promise<PickupCurveRow[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.rpc('rpc_get_pickup_curve', {
    p_hotel_code: params.hotelCode,
    p_stay_year: params.stayYear,
    p_stay_month: params.stayMonth,
    p_report_date: params.reportDate,
    p_metric: params.metric,
  });

  if (error) {
    console.error(`pickup curve ${params.metric} error:`, error.message);
    return [];
  }

  logRpcEmptyResult(
    `rpc_get_pickup_curve:${params.metric}`,
    params,
    data?.length ?? 0
  );

  return (data ?? []) as PickupCurveRow[];
}

export async function getPerformancePickupOccCurve(
  params: BasePerformanceParams
): Promise<PerformancePickupOccCurveRow[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.rpc(
    'rpc_get_performance_pickup_occ_curve',
    {
      p_report_date: params.reportDate,
      p_stay_year: params.stayYear,
      p_stay_month: params.stayMonth,
      p_hotel_code: params.hotelCode,
    }
  );

  if (error) {
    console.error('performance pickup occ curve error:', error.message);
    return [];
  }

  logRpcEmptyResult(
    'rpc_get_performance_pickup_occ_curve',
    params,
    data?.length ?? 0
  );

  return (data ?? []) as PerformancePickupOccCurveRow[];
}

export async function getPerformanceDailyActual(
  params: BasePerformanceParams
): Promise<PerformanceDailyActualRow[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.rpc(
    'rpc_get_performance_daily_actual',
    {
      p_report_date: params.reportDate,
      p_stay_year: params.stayYear,
      p_stay_month: params.stayMonth,
      p_hotel_code: params.hotelCode,
    }
  );

  if (error) {
    console.error('performance daily actual error:', error.message);
    return [];
  }

  logRpcEmptyResult(
    'rpc_get_performance_daily_actual',
    params,
    data?.length ?? 0
  );

  return (data ?? []) as PerformanceDailyActualRow[];
}

export async function getPerformanceModuleData(
  params: BasePerformanceParams
) {
  const [
    summary,
    performanceTable,
    dailyActual,
  ] = await Promise.all([
    getDashboardMonthlySummary(params),
    getMonthlyPerformanceTable(params),
    getPerformanceDailyActual(params),
  ]);

  return {
    summary,
    performanceTable,
    dailyActual,

    pickupOtb: [],
    pickupOcc: [],
    pickupRev: [],
    pickupAdr: [],
    pickupRevpar: [],
  };
}