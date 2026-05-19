export type PerformanceSearchParams = {
  hotel_code?: string;
  stay_year?: string;
  stay_month?: string;
  report_date?: string;
};

export type DashboardMonthlySummary = {
  hotel_code: string;
  hotel_name: string | null;
  stay_year: number;
  stay_month: number;
  report_date: string;

  room_sold?: number;
  room_revenue?: number;
  occupancy_pct?: number;
  adr?: number;
  revpar?: number;

  budget_revenue?: number;

  pickup_room_sold?: number;
  pickup_revenue?: number;
};

export type MonthlyPerformanceRow = {
  metric: string;

  a_this_month: number | null;
  b_last_month: number | null;
  c_same_month_ly: number | null;

  d_pct_change_vs_lm: number | null;
  e_pct_change_vs_ly: number | null;

  f_budget: number | null;
};

export type PickupCurveMetric =
  | 'otb'
  | 'occ'
  | 'rev'
  | 'adr'
  | 'revpar';

export type RawPickupCurveRow = {
  axis_day_index: number;
  axis_label_date: string;
  series_type: 'this_month' | 'last_month' | 'ly' | 'bud';

  source_report_date?: string;
  hotel_code?: string;
  hotel_name?: string | null;

  source_stay_year?: number;
  source_stay_month?: number;

  metric_code: PickupCurveMetric;
  metric_value: number | null;
};

export type PickupCurveRow = {
  label?: string;

  this_month?: number;
  last_month?: number;
  same_month_ly?: number;
  budget?: number;

  axis_label_date?: string;
  report_date?: string;

  metric_value?: number | null;
  value?: number | null;

  series_type?:
    | 'this_month'
    | 'last_month'
    | 'ly'
    | 'bud'
    | string;
};
export type PerformancePickupOccCurveRow = {
  axis_day_index: number;
  axis_label_date: string;
  series_type: 'this_month' | 'last_month' | 'ly' | 'bud';
  source_report_date: string;
  metric_value: number | null;
};

export type PerformanceDailyActualRow = {
  stay_date: string;
  room_sold: number;
  occupancy: number;
  revenue: number;
  adr: number;
  revpar: number;
};