"use client";

import type { SegmentMonthlyPerformanceRow } from "@/types/segment/segment-performance.types";
import { formatSegmentCurrency } from "@/components/segment/utils/segment-format";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const SEGMENT_COLORS = [
  "#1f4e79",
  "#ed7d31",
  "#70ad47",
  "#00a6d6",
  "#9e2f9e",
  "#7fbf5b",
  "#5b9bd5",
  "#a5a5a5",
];

type Props = {
  rows: SegmentMonthlyPerformanceRow[];
  title?: string;
};

export default function SegmentMonthlyPieChart({ rows, title = "POR" }: Props) {
  const chartRows = rows.filter((row) => Number(row.rev ?? 0) > 0);

  return (
    <div
      style={{
        height: "100%",
        minHeight: 270,
        background: "#f7f3e8",
        padding: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: 500,
          color: "#475569",
          margin: "0 0 4px 0",
        }}
      >
        {title}
      </h3>

      {chartRows.length === 0 ? (
        <div
          style={{
            height: 230,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748b",
            fontSize: 13,
          }}
        >
          No chart data
        </div>
      ) : (
        <PieChart width={500} height={250}>
          <Pie
            data={chartRows}
            dataKey="rev"
            nameKey="segment_group"
            cx="50%"
            cy="42%"
            outerRadius={72}
            label={({ percent }) => `${((percent ?? 0) * 100).toFixed(1)}%`}
          >
            {chartRows.map((row, index) => (
              <Cell
                key={row.segment_group}
                fill={SEGMENT_COLORS[index % SEGMENT_COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [
              formatSegmentCurrency(Number(value)),
              String(name),
            ]}
          />

          <Legend
            verticalAlign="bottom"
            align="center"
            iconSize={8}
            wrapperStyle={{
              fontSize: 11,
              paddingTop: 4,
            }}
          />
        </PieChart>
      )}
    </div>
  );
}