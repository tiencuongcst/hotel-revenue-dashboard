// services/pace.service.ts

import { createClient } from '@supabase/supabase-js'
import type { PaceTrendParams, PaceTrendRow } from '@/types/pace'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

function normalizeDate(value: string): string {
  return value.slice(0, 10)
}

export async function getPaceTrendCompare(
  params: PaceTrendParams
): Promise<PaceTrendRow[]> {
  const { data, error } = await supabase.rpc('rpc_get_pace_trend_compare', {
    p_hotel_code: params.hotelCode,
    p_stay_year: params.stayYear,
    p_stay_month: params.stayMonth,
    p_report_date_1: normalizeDate(params.reportDate1),
    p_report_date_2: normalizeDate(params.reportDate2),
  })

  if (error) {
    throw new Error(`Failed to get pace trend compare: ${error.message}`)
  }

  return (data ?? []) as PaceTrendRow[]
}

export type PaceAvailableReportDateRow = {
  report_date: string
}

export async function getPaceAvailableReportDates(params: {
  hotelCode: string
  stayYear: number
  stayMonth: number
}): Promise<PaceAvailableReportDateRow[]> {
  const { data, error } = await supabase.rpc(
    'rpc_get_pace_available_report_dates',
    {
      p_hotel_code: params.hotelCode,
      p_stay_year: params.stayYear,
      p_stay_month: params.stayMonth,
    }
  )

  if (error) {
    throw new Error(`Failed to get pace available report dates: ${error.message}`)
  }

  return ((data ?? []) as PaceAvailableReportDateRow[]).map((item) => ({
    report_date: normalizeDate(item.report_date),
  }))
}