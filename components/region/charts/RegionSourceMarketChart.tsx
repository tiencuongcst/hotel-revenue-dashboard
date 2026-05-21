"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { RegionMarketDetail } from "@/types/region";

type Props = {
  data: RegionMarketDetail[];
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

export default function RegionSourceMarketChart({ data }: Props) {
  return (
    <section className="region-source-grid">
      <div className="region-chart-card">
        <div className="region-chart-title">GUESTS BY MARKET</div>
        <div className="region-chart-body">
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="market_group" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="guest_count" name="Guests" fill="#00796b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="region-chart-card">
        <div className="region-chart-title">MARKET SHARE</div>
        <div className="region-chart-body">
          <ResponsiveContainer width="100%" height={340}>
            <PieChart>
              <Pie
                data={data}
                dataKey="guest_count"
                nameKey="market_group"
                outerRadius={120}
                label
              >
                {data.map((item, index) => (
                  <Cell
                    key={item.market_group}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
