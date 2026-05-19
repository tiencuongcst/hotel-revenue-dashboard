// components/charts/PaceTrendChart.tsx

'use client'

import {
  Area,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type {
  PaceTrendChartPoint,
  PaceTrendMetric,
  PaceTrendRow,
} from '@/types/pace'

type PaceTrendChartProps = {
  rows: PaceTrendRow[]
  metricCode: PaceTrendMetric
}

type PaceTrendChartData = PaceTrendChartPoint & {
  gap_base_value: number
  gap_range_value: number
}

const metricTitle: Record<PaceTrendMetric, string> = {
  otb: 'Room Sold',
  occ: 'Occupancy',
  rev: 'Revenue',
  adr: 'ADR',
  revpar: 'RevPAR',
}

function formatValue(value: number, metricCode: PaceTrendMetric): string {
  if (metricCode === 'occ') return `${(value * 100).toFixed(0)}%`
  if (metricCode === 'rev' || metricCode === 'adr' || metricCode === 'revpar') {
    return `${Math.round(value / 1_000_000)}M`
  }

  return value.toFixed(0)
}

function getPeakValue(data: PaceTrendChartData[]): number | null {
  if (data.length === 0) return null

  return Math.max(...data.map((item) => Number(item.pace_2_value || 0)))
}

export default function PaceTrendChart({
  rows,
  metricCode,
}: PaceTrendChartProps) {
  const metricRows = rows.filter((row) => row.metric_code === metricCode)

  const chartData: PaceTrendChartData[] = metricRows.map((row) => {
    const pace2Value = Number(row.pace_2_value)
    const budgetValue = Number(row.budget_final_value)

    return {
      stay_date: row.stay_date,
      stay_day_label: row.stay_day_label,
      pace_1_value: Number(row.pace_1_value),
      pace_2_value: pace2Value,
      budget_final_value: budgetValue,
      gap_base_value: Math.min(pace2Value, budgetValue),
      gap_range_value: Math.abs(budgetValue - pace2Value),
    }
  })

  const peakValue = getPeakValue(chartData)
  const pace1Label = metricRows[0]?.pace_1_label ?? 'Pace 1'
  const pace2Label = metricRows[0]?.pace_2_label ?? 'Pace 2'
  const budgetLabel = metricRows[0]?.budget_final_label ?? 'Budget'
  const latestValue = chartData[chartData.length - 1]?.pace_2_value ?? 0

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          {metricTitle[metricCode]} Pace Trend
        </h2>

        <div className="w-fit rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm">
          ● Latest: {formatValue(latestValue, metricCode)}
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-[240px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
          No pace data for selected filters.
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="h-[360px] min-w-[900px]">
            <ResponsiveContainer width="100%" height={360}>
              <ComposedChart
                data={chartData}
                margin={{ top: 18, right: 24, left: 12, bottom: 24 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                <XAxis
                  dataKey="stay_day_label"
                  interval={1}
                  angle={-35}
                  textAnchor="end"
                  height={58}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />

                <YAxis
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={(value) =>
                    formatValue(Number(value), metricCode)
                  }
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #e2e8f0',
                  }}
                  formatter={(value) =>
                    formatValue(Number(value), metricCode)
                  }
                  labelFormatter={(label) => `Stay date: ${label}`}
                />

                <Area
                  type="monotone"
                  dataKey="gap_base_value"
                  stackId="gap"
                  stroke="none"
                  fill="transparent"
                  isAnimationActive={false}
                />

                <Area
                  type="monotone"
                  dataKey="gap_range_value"
                  stackId="gap"
                  name="Gap vs Budget"
                  stroke="none"
                  fill="#94a3b8"
                  fillOpacity={0.22}
                  isAnimationActive={false}
                />

                <Line
                  type="monotone"
                  dataKey="budget_final_value"
                  name={budgetLabel}
                  stroke="#047857"
                  strokeWidth={2.5}
                  strokeDasharray="8 6"
                  dot={false}
                />

                <Line
                  type="monotone"
                  dataKey="pace_1_value"
                  name={pace1Label}
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={false}
                />

                <Line
                  type="monotone"
                  dataKey="pace_2_value"
                  name={pace2Label}
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  dot={false}
                >
                  <LabelList
                    dataKey="pace_2_value"
                    position="top"
                    content={(props) => {
                      const value = Number(props.value)

                      if (peakValue === null || value !== peakValue) {
                        return null
                      }

                      return (
                        <text
                          x={props.x}
                          y={Number(props.y) - 8}
                          fill="#dc2626"
                          fontSize={11}
                          fontWeight={700}
                          textAnchor="middle"
                        >
                          {formatValue(value, metricCode)}
                        </text>
                      )
                    }}
                  />
                </Line>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-500">
        Shaded gray area represents the gap between Budget and Pace 2.
      </div>
    </section>
  )
}