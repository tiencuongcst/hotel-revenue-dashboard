export type RegionTab = "source-markets" | "trend";

export type RegionFilterOption = {
  hotel_code: string;
  hotel_name: string | null;
  stay_year: number;
  stay_month: number;
  stay_year_month: string;
  market_group: string;
};

export type RegionSummary = {
  total_guests: number;
  total_markets: number;
  total_male: number;
  total_female: number;
  unknown_gender: number;
  male_pct: number;
  female_pct: number;
};

export type RegionMarketDetail = {
  market_group: string;
  guest_count: number;
  male: number;
  female: number;
  unknown_gender: number;
  male_pct: number;
  female_pct: number;
  market_share_pct: number;
};

export type RegionNationalityTrend = {
  stay_year: number;
  stay_month: number;
  stay_year_month: string;
  market_group: string;
  guest_count: number;
};

export type RegionFilters = {
  hotelCode: string | null;
  year: number | null;
  month: number | null;
  marketGroup: string | null;
};
