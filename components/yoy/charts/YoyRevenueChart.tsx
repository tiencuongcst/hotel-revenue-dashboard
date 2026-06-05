"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  YoyChartRow,
} from "@/types/yoy/yoy-chart.types";

import {
  formatYoyMoney,
} from "@/components/yoy/utils/yoy-format";

type Props = {
  rows: YoyChartRow[];
};

export function YoyRevenueChart({
  rows,
}: Props) {
  const chartData = rows.map((row) => ({
    month: row.month_label,
    "Current Year": row.rev_current,
    "Last Year": row.rev_last_year,
    Budget: row.rev_budget,
  }));

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-1 text-sm font-bold uppercase text-gray-800">
        Revenue YOY Trend
      </div>

      <div className="mb-4 text-xs font-medium text-gray-500">
        Current Year vs Last Year vs Budget
      </div>

      <div className="w-full overflow-x-auto">
        <LineChart
          width={1280}
          height={420}
          data={chartData}
          margin={{
            top: 24,
            right: 48,
            left: 16,
            bottom: 48,
          }}
        >
          <CartesianGrid
            stroke="#e5e7eb"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#4b5563" }} />

          <YAxis
            tickFormatter={(value) => formatYoyMoney(Number(value))}
            tick={{ fontSize: 12, fill: "#4b5563" }}
          />

          <Tooltip
            formatter={(value) => formatYoyMoney(Number(value))}
            labelFormatter={(label) => `Month: ${label}`}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
              fontSize: 12,
            }}
          />

          <Legend verticalAlign="bottom" height={40} wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />

          <Line type="monotone" dataKey="Current Year" stroke="#2563eb" strokeWidth={2} dot={false} activeDot={{ r: 5, strokeWidth: 2 }} connectNulls={false} />
          <Line type="monotone" dataKey="Last Year" stroke="#dc2626" strokeWidth={2} dot={false} activeDot={{ r: 5, strokeWidth: 2 }} connectNulls={false} />
          <Line type="monotone" dataKey="Budget" stroke="#16a34a" strokeWidth={2} dot={false} activeDot={{ r: 5, strokeWidth: 2 }} connectNulls={false} />
        </LineChart>
      </div>
    </div>
  );
}
