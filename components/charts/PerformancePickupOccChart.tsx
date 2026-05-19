'use client';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { PerformancePickupOccCurveRow } from '@/types/performance';

type Props = {
  rows: PerformancePickupOccCurveRow[];
};

type ChartRow = {
  axis_day_index: number;
  axis_label_date: string;
  this_month?: number | null;
  last_month?: number | null;
  ly?: number | null;
  bud?: number | null;
};

export function PerformancePickupOccChart({ rows }: Props) {
  const chartMap = new Map<number, ChartRow>();

  rows.forEach((row) => {
    const current = chartMap.get(row.axis_day_index) ?? {
      axis_day_index: row.axis_day_index,
      axis_label_date: row.axis_label_date,
    };

    const value =
      row.metric_value === null ? null : Number(row.metric_value) * 100;

    if (row.series_type === 'this_month') current.this_month = value;
    if (row.series_type === 'last_month') current.last_month = value;
    if (row.series_type === 'ly') current.ly = value;
    if (row.series_type === 'bud') current.bud = value;

    chartMap.set(row.axis_day_index, current);
  });

  const chartRows = Array.from(chartMap.values()).sort(
    (a, b) => a.axis_day_index - b.axis_day_index
  );

  return (
    <section className="app-card mb-6 xl:col-span-2 overflow-hidden">
      <div className="bg-[#0a4a32] px-4 py-2 text-white">
        <h2 className="text-center text-base font-bold uppercase">
          OCC Daily Pickup by Report Dates
        </h2>
      </div>

      <div style={{ width: '100%', height: 460, padding: 16 }}>
        {chartRows.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-[#6c757d]">
            No chart data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartRows}
              margin={{ top: 20, right: 24, left: 8, bottom: 48 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#9ec5fe" />

              <XAxis
                dataKey="axis_label_date"
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
                tickFormatter={(value) => {
                  const day = String(value).slice(8, 10);
                  return Number(day) % 2 === 1 ? day : '';
                }}
                tick={{ fontSize: 12, fill: '#0a4a32' }}
              />

              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12, fill: '#0a4a32' }}
              />

              <Tooltip />

              <Legend verticalAlign="top" />

              <Line type="monotone" dataKey="bud" name="Budget" stroke="#4b5563" strokeWidth={2} dot={false} connectNulls />
              <Line type="monotone" dataKey="last_month" name="Previous" stroke="#7b2d2d" strokeWidth={2} dot={false} connectNulls />
              <Line type="monotone" dataKey="ly" name="LY" stroke="#ff5a1f" strokeWidth={2} dot={false} connectNulls />
              <Line type="monotone" dataKey="this_month" name="Current" stroke="#006b5b" strokeWidth={3} dot={false} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
