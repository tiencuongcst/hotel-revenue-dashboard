export type SegmentMonthlyPerformanceRow = {
  hotel_code: string;
  report_date: string;
  stay_year: number;
  stay_month: number;
  month_label: string;
  segment_group: string;
  otb: number;
  rev: number;
  adr: number;
  otb_share: number;
  rev_share: number;
  sort_order: number;
};

export type SegmentMonthlyPerformanceParams = {
  hotelCode: string;
  stayYear: number;
  reportDate: string;
};