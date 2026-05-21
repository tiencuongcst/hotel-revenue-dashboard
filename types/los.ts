export type LosMonthlyActualRow = {
  hotel_code: string;

  stay_year: number;
  stay_month: number;
  stay_month_label: string;

  segment_group: string;

  booking_count: number;

  avg_lead_time: number;
  avg_los: number;
};

export type LosHotelOption = {
  hotel_code: string;
  hotel_name: string;
};