export type SegmentPickupDailyRow = {
  hotel_code: string;
  stay_year: number;
  stay_month: number;
  stay_date: string;
  stay_day: number;
  segment_group: string;

  pace1_report_date: string;
  pace1_otb: number;
  pace1_rev: number;
  pace1_adr: number;

  pace2_report_date: string;
  pace2_otb: number;
  pace2_rev: number;
  pace2_adr: number;

  pickup_otb: number;
  pickup_rev: number;
  pickup_adr: number;
};

export type SegmentPickupDailyParams = {
  hotelCode: string;
  stayYear: number;
  stayMonth: number;
  pace1Date: string;
  pace2Date: string;
};