'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { PickupCurveRow } from '@/types/performance';

type Props = {
  title: string;
  rows: PickupCurveRow[];
};

function normalizeRows(rows: PickupCurveRow[]) {
  return rows.map((row) => ({
    label: row.axis_label_date ?? row.report_date ?? '',
    value: Number(row.metric_value ?? row.value ?? 0),
    series_type: row.series_type ?? 'this_month',
  }));
}

export function PickupMetricChart({ title, rows }: Props) {
  const chartRows = normalizeRows(rows);

  return (
    <section className="app-card">
      <div className="app-card-header">
        <h2 className="text-lg font-bold text-[#212529]">{title}</h2>
      </div>

      <div className="app-card-body">
        {chartRows.length === 0 ? (
          <div className="flex h-[280px] items-center justify-center text-sm text-[#6c757d]">
            No chart data available
          </div>
        ) : (
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartRows}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 12, fill: '#6c757d' }}
                />
                <YAxis tick={{ fontSize: 12, fill: '#6c757d' }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0a4a32"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </section>
  );
}
