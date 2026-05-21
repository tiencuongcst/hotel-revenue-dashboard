"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  LosMonthlyActualRow,
} from "@/types/los";

type Props = {
  rows: LosMonthlyActualRow[];
};

export function LosBarCharts({
  rows,
}: Props) {
  const losRows = [...rows].sort(
    (a, b) =>
      b.avg_los - a.avg_los
  );

  const leadRows = [...rows].sort(
    (a, b) =>
      b.avg_lead_time -
      a.avg_lead_time
  );

  return (
    <div className="los-chart-row">
      <div className="los-chart-card">
        <div className="los-chart-title">
          LOS BY SEGMENT
        </div>

        <div className="los-chart-body">
          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart
              data={losRows}
              layout="vertical"
              margin={{
                top: 10,
                right: 30,
                left: 30,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis type="number" />

              <YAxis
                dataKey="segment_group"
                type="category"
              />

              <Tooltip />

              <Bar
                dataKey="avg_los"
                fill="#eb6c2f"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="los-chart-card">
        <div className="los-chart-title">
          LEAD TIME BY SEGMENT
        </div>

        <div className="los-chart-body">
          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart
              data={leadRows}
              layout="vertical"
              margin={{
                top: 10,
                right: 30,
                left: 30,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis type="number" />

              <YAxis
                dataKey="segment_group"
                type="category"
              />

              <Tooltip />

              <Bar
                dataKey="avg_lead_time"
                fill="#eb6c2f"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}