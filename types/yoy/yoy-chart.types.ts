export type YoyChartRow = {
  current_report_date: string | null;
  last_year_report_date: string | null;

  stay_month: number;
  month_label: string;

  occ_current: number | null;
  occ_last_year: number | null;
  occ_budget: number | null;

  rev_current: number | null;
  rev_last_year: number | null;
  rev_budget: number | null;

  adr_current: number | null;
  adr_last_year: number | null;
  adr_budget: number | null;
};

export type YoyChartResponse =
  YoyChartRow[];
