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
  LosMonthlyActualRow,
} from "@/types/los";

import { LOS_CHART_COLORS } from "@/components/los/utils/los-chart-colors";

import { transformLosTrendData } from "@/components/los/utils/los-transform";

type Props = {
  rows: LosMonthlyActualRow[];
};

export function LosTrendCharts({
  rows,
}: Props) {
  const trendRows =
    transformLosTrendData(rows);

  const segments = Array.from(
    new Set(
      rows.map(
        (row) =>
          row.segment_group
      )
    )
  );

  return (
    <div className="los-trend-column">

      <LosTrendCard title="LOS TREND BY SEGMENT">

        <LineChart
          width={980}
          height={360}
          data={trendRows}
          margin={{
            top: 10,
            right: 30,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="stay_month_label"
          />

          <YAxis />

          <Tooltip />

          <Legend />

          {segments.map(
            (
              segment,
              index
            ) => (
              <Line
                key={`los-${segment}`}
                type="monotone"
                dataKey={`los_${segment}`}
                name={segment}
                stroke={
                  LOS_CHART_COLORS[
                    index %
                      LOS_CHART_COLORS.length
                  ]
                }
                strokeWidth={2}
                connectNulls
              />
            )
          )}
        </LineChart>

      </LosTrendCard>

      <LosTrendCard title="LEAD TIME TREND BY SEGMENT">

        <LineChart
          width={980}
          height={360}
          data={trendRows}
          margin={{
            top: 10,
            right: 30,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="stay_month_label"
          />

          <YAxis />

          <Tooltip />

          <Legend />

          {segments.map(
            (
              segment,
              index
            ) => (
              <Line
                key={`lead-${segment}`}
                type="monotone"
                dataKey={`lead_${segment}`}
                name={segment}
                stroke={
                  LOS_CHART_COLORS[
                    index %
                      LOS_CHART_COLORS.length
                  ]
                }
                strokeWidth={2}
                connectNulls
              />
            )
          )}
        </LineChart>

      </LosTrendCard>

    </div>
  );
}

function LosTrendCard({
  title,
  children,
}: {
  title: string;

  children: React.ReactNode;
}) {
  return (
    <section className="los-trend-card">

      <div className="los-chart-title">
        {title}
      </div>

      <div className="los-trend-body">
        {children}
      </div>

    </section>
  );
}