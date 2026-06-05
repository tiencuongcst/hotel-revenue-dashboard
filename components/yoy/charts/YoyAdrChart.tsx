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

export function YoyAdrChart({
  rows,
}: Props) {
  const chartData = rows.map((row) => ({
    month: row.month_label,
    "Current Year": row.adr_current,
    "Last Year": row.adr_last_year,
    Budget: row.adr_budget,
  }));

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-1 text-sm font-bold uppercase text-gray-800">
        ADR YOY Trend
      </div>

      <div className="mb-4 text-xs font-medium text-gray-500">
        Current Year vs Last Year vs Budget
      </div>

      <div className="w-full overflow-x-auto">
        <LineChart width={1280} height={420} data={chartData}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#4b5563" }} />
          <YAxis tickFormatter={(value) => formatYoyMoney(Number(value))} tick={{ fontSize: 12, fill: "#4b5563" }} />
          <Tooltip formatter={(value) => formatYoyMoney(Number(value))} labelFormatter={(label) => `Month: ${label}`} />
          <Legend verticalAlign="bottom" height={40} />
          <Line type="monotone" dataKey="Current Year" stroke="#2563eb" strokeWidth={2} dot={false} connectNulls={false} />
          <Line type="monotone" dataKey="Last Year" stroke="#dc2626" strokeWidth={2} dot={false} connectNulls={false} />
          <Line type="monotone" dataKey="Budget" stroke="#16a34a" strokeWidth={2} dot={false} connectNulls={false} />
        </LineChart>
      </div>
    </div>
  );
}
