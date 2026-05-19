import PaceTrendChart from '@/components/charts/PaceTrendChart'
import {
  getPaceAvailableReportDates,
  getPaceTrendCompare,
} from '@/services/pace.service'
import { getHotelOptions } from '@/services/hotel.service'
import type { PaceTrendMetric } from '@/types/pace'

type PacePageSearchParams = {
  hotel_code?: string
  stay_year?: string
  stay_month?: string
  report_date_1?: string
  report_date_2?: string
}

type PacePageProps = {
  searchParams?: Promise<PacePageSearchParams>
}

const visibleMetrics: PaceTrendMetric[] = [
  'otb',
  'occ',
  'rev',
  'adr',
  'revpar',
]

function normalizeDate(value?: string | null): string {
  if (!value) return ''

  return String(value).slice(0, 10)
}

function getStringParam(value: string | undefined, fallback: string): string {
  const normalizedValue = normalizeDate(value)
  const normalizedFallback = normalizeDate(fallback)

  return normalizedValue.length > 0
    ? normalizedValue
    : normalizedFallback
}

function getNumberParam(value: string | undefined, fallback: number): number {
  const parsedValue = Number(value)

  return Number.isFinite(parsedValue)
    ? parsedValue
    : fallback
}

function subtractDays(dateValue: string, days: number): string {
  if (!dateValue) return ''

  const date = new Date(`${dateValue}T00:00:00`)

  date.setDate(date.getDate() - days)

  return date.toISOString().slice(0, 10)
}

function buildReportDateOptions(
  availableReportDates: { report_date: string }[],
  reportDate1: string,
  reportDate2: string
) {
  const dateSet = new Set<string>()

  availableReportDates.forEach((item) => {
    const reportDate = normalizeDate(item.report_date)

    if (reportDate) {
      dateSet.add(reportDate)
    }
  })

  if (reportDate1) {
    dateSet.add(normalizeDate(reportDate1))
  }

  if (reportDate2) {
    dateSet.add(normalizeDate(reportDate2))
  }

  return Array.from(dateSet)
    .sort((a, b) => a.localeCompare(b))
    .map((reportDate) => ({
      report_date: reportDate,
    }))
}

export default async function PacePage({
  searchParams,
}: PacePageProps) {
  const params = searchParams
    ? await searchParams
    : {}

  const hotelCode =
    params.hotel_code &&
    params.hotel_code.trim().length > 0
      ? params.hotel_code
      : 'GDB'

  const stayYear = getNumberParam(
    params.stay_year,
    2026
  )

  const stayMonth = getNumberParam(
    params.stay_month,
    5
  )

  const hotels = await getHotelOptions()

  const rawAvailableReportDates =
    await getPaceAvailableReportDates({
      hotelCode,
      stayYear,
      stayMonth,
    })

  const availableReportDates =
    rawAvailableReportDates
      .map((item) => ({
        report_date: normalizeDate(
          item.report_date
        ),
      }))
      .filter(
        (item) => item.report_date.length > 0
      )
      .sort((a, b) =>
        a.report_date.localeCompare(
          b.report_date
        )
      )

  const firstAvailableReportDate =
    availableReportDates[0]?.report_date ?? ''

  const lastAvailableReportDate =
    availableReportDates[
      availableReportDates.length - 1
    ]?.report_date ?? ''

  const reportDate2 = getStringParam(
    params.report_date_2,
    lastAvailableReportDate
  )

  const autoReportDate1 = subtractDays(
    reportDate2,
    5
  )

  const reportDate1 = getStringParam(
    params.report_date_1,
    autoReportDate1 ||
      firstAvailableReportDate
  )

  const reportDateOptions =
    buildReportDateOptions(
      availableReportDates,
      reportDate1,
      reportDate2
    )

  const rows =
    reportDate1 && reportDate2
      ? await getPaceTrendCompare({
          hotelCode,
          stayYear,
          stayMonth,
          reportDate1,
          reportDate2,
        })
      : []

  const filterKey = [
    hotelCode,
    stayYear,
    stayMonth,
    reportDate1,
    reportDate2,
  ].join('-')

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">
          Pace Trend
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Compare Pace 1, Pace 2 and
          Budget by stay date.
        </p>
      </div>

      <form
        key={filterKey}
        className="app-card"
        method="GET"
        action="/reports/pace"
      >
        <div className="pace-filter-grid">
          <div className="pace-filter-field">
            <label>Hotel</label>

            <select
              name="hotel_code"
              defaultValue={hotelCode}
            >
              {hotels.map((hotel) => (
                <option
                  key={hotel.hotel_code}
                  value={hotel.hotel_code}
                >
                  {hotel.hotel_name ??
                    hotel.hotel_code}
                </option>
              ))}
            </select>
          </div>

          <div className="pace-filter-field">
            <label>Year</label>

            <select
              name="stay_year"
              defaultValue={String(
                stayYear
              )}
            >
              {Array.from(
                { length: 13 },
                (_, index) => 2023 + index
              ).map((year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="pace-filter-field">
            <label>Month</label>

            <select
              name="stay_month"
              defaultValue={String(
                stayMonth
              )}
            >
              {Array.from(
                { length: 12 },
                (_, index) => index + 1
              ).map((month) => (
                <option
                  key={month}
                  value={month}
                >
                  {month
                    .toString()
                    .padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>

          <div className="pace-filter-field">
            <label>Pace 1</label>

            <input
              key={`pace-1-${filterKey}`}
              name="report_date_1"
              type="date"
              defaultValue={reportDate1}
              min={
                reportDateOptions[0]
                  ?.report_date
              }
              max={
                reportDateOptions[
                  reportDateOptions.length - 1
                ]?.report_date
              }
            />
          </div>

          <div className="pace-filter-field">
            <label>Pace 2</label>

            <input
              key={`pace-2-${filterKey}`}
              name="report_date_2"
              type="date"
              defaultValue={reportDate2}
              min={
                reportDateOptions[0]
                  ?.report_date
              }
              max={
                reportDateOptions[
                  reportDateOptions.length - 1
                ]?.report_date
              }
            />
          </div>

          <button
            type="submit"
            className="app-button-primary pace-filter-button"
          >
            Apply Filter
          </button>
        </div>
      </form>

      <div className="app-card">
        <div className="pace-legend">
          <div className="pace-legend-item">
            <span className="pace-legend-line pace-legend-line-blue" />
            <span>Pace 1</span>
          </div>

          <div className="pace-legend-item">
            <span className="pace-legend-line pace-legend-line-red" />
            <span>Pace 2</span>
          </div>

          <div className="pace-legend-item">
            <span className="pace-legend-line pace-legend-line-budget" />
            <span>Budget</span>
          </div>

          <div className="pace-legend-item">
            <span className="pace-legend-gap" />
            <span>Gap vs Budget</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {visibleMetrics.map(
          (metricCode) => (
            <PaceTrendChart
              key={metricCode}
              rows={rows}
              metricCode={metricCode}
            />
          )
        )}
      </div>
    </main>
  )
}