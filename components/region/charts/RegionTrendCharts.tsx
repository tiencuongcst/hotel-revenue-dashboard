"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { RegionNationalityTrend } from "@/types/region";

type Props = {
  data: RegionNationalityTrend[];
};

const COLORS = [
  "#00796b",
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#9467bd",
  "#d62728",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
  "#004d40",
];

function buildChartData(data: RegionNationalityTrend[]) {
  const monthMap = new Map<string, Record<string, string | number>>();

  data.forEach((item) => {
    const current = monthMap.get(item.stay_year_month) ?? {
      stay_year_month: item.stay_year_month,
    };

    current[item.market_group] = Number(item.guest_count ?? 0);
    monthMap.set(item.stay_year_month, current);
  });

  return Array.from(monthMap.values());
}

export default function RegionTrendCharts({ data }: Props) {
  const chartData = buildChartData(data);

  const markets = Array.from(
    new Set(data.map((item) => item.market_group))
  ).sort();

  return (
    <section className="region-chart-stack">
      <div className="region-chart-card">
        <div className="region-chart-title">
          NATIONALITY GUEST TREND BY MONTH
        </div>

        <div className="region-chart-body">
          <ResponsiveContainer width="100%" height={420}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stay_year_month" />
              <YAxis />
              <Tooltip />
              <Legend />

              {markets.map((market, index) => (
                <Line
                  key={market}
                  type="monotone"
                  dataKey={market}
                  name={market}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                  dot
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
