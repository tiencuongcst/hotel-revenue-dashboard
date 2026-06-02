'use client';

import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { PerformanceDailyActualRow } from '@/types/performance';

type ChartType = 'occupancy' | 'revenue' | 'revpar' | 'adr_occ';

type Props = {
  title: string;
  rows?: PerformanceDailyActualRow[];
  type: ChartType;
};

function normalizeOccupancy(
  value: number | null | undefined
) {
  if (value === null || value === undefined) return 0;

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) return 0;

  return numericValue * 100;
}

function formatNumber(value: number) {
  return Number(value).toLocaleString('vi-VN');
}

export function PerformanceDailyActualCharts({
  title,
  rows = [],
  type,
}: Props) {
  const chartRows = rows.map((row) => ({
    stay_date: row.stay_date,
    room_sold: Number(row.room_sold ?? 0),
    occupancy_pct: normalizeOccupancy(row.occupancy),
    revenue: Number(row.revenue ?? 0),
    adr: Number(row.adr ?? 0),
    revpar: Number(row.revpar ?? 0),
  }));

  if (chartRows.length === 0) {
    return (
      <section className="app-card min-h-[380px]">
        <div className="app-card-header">
          <h2 className="text-lg font-bold">{title}</h2>
        </div>

        <div className="flex h-[300px] items-center justify-center text-sm text-gray-500">
          No chart data available
        </div>
      </section>
    );
  }

  return (
    <section className="app-card min-h-[380px] overflow-hidden">
      <div className="app-card-header">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>

      <div className="h-[320px] min-h-[320px] w-full min-w-0 px-4 pb-4 pt-2">
        <ResponsiveContainer
          width="100%"
          height={320}
          minWidth={300}
          minHeight={300}
        >
          {type === 'adr_occ' ? (
            <ComposedChart
              data={chartRows}
              margin={{
                top: 16,
                right: 24,
                bottom: 12,
                left: 12,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#9ec5fe" />

              <XAxis
                dataKey="stay_date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                  String(value).slice(5).replace('-', '/')
                }
              />

              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => formatNumber(Number(value))}
              />

              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />

              <Tooltip
                formatter={(value, name) => {
                  if (name === 'OCC') {
                    return [`${Number(value).toFixed(1)}%`, 'OCC'];
                  }

                  return [formatNumber(Number(value)), String(name)];
                }}
              />

              <Legend />

              <Bar
                yAxisId="left"
                dataKey="adr"
                fill="#006b5b"
                name="ADR"
              />

              <Line
                yAxisId="right"
                type="monotone"
                dataKey="occupancy_pct"
                stroke="#ff5a1f"
                strokeWidth={2}
                dot={false}
                name="OCC"
              />
            </ComposedChart>
          ) : (
            <AreaChart
              data={chartRows}
              margin={{
                top: 16,
                right: 24,
                bottom: 12,
                left: 12,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#9ec5fe" />

              <XAxis
                dataKey="stay_date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                  String(value).slice(5).replace('-', '/')
                }
              />

              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                  type === 'occupancy'
                    ? `${Number(value).toFixed(0)}%`
                    : formatNumber(Number(value))
                }
              />

              <Tooltip
                formatter={(value) => {
                  if (type === 'occupancy') {
                    return [`${Number(value).toFixed(1)}%`, 'Occupancy'];
                  }

                  return [formatNumber(Number(value)), title];
                }}
              />

              <Legend />

              <Area
                type="monotone"
                dataKey={type === 'occupancy' ? 'occupancy_pct' : type}
                stroke="#ff5a1f"
                fill="#ff5a1f"
                fillOpacity={0.18}
                strokeWidth={2}
                name={title}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  );
}