// types/pace.ts

export type PaceTrendMetric = 'otb' | 'occ' | 'rev' | 'adr' | 'revpar'

export type PaceTrendRow = {
  hotel_code: string
  stay_date: string
  stay_year: number
  stay_month: number
  stay_day_label: string
  metric_code: PaceTrendMetric
  pace_1_label: string
  pace_2_label: string
  budget_final_label: string
  pace_1_value: number
  pace_2_value: number
  budget_final_value: number
  variance_value: number
  variance_pct: number | null
}

export type PaceTrendParams = {
  hotelCode: string
  stayYear: number
  stayMonth: number
  reportDate1: string
  reportDate2: string
}

export type PaceTrendChartPoint = {
  stay_date: string
  stay_day_label: string
  pace_1_value: number
  pace_2_value: number
  budget_final_value: number
}