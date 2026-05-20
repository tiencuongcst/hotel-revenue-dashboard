"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: any[];
};

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#ca8a04",
  "#9333ea",
];

export function RoomAdrDailyChart({
  data,
}: Props) {

  if (!data.length) {
    return (
      <div className="rounded-xl border p-6">
        No ADR chart data
      </div>
    );
  }

  const roomNames =
    Object.keys(data[0])
      .filter(
        (key) => key !== "day_label"
      );

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="mb-4 text-lg font-bold">
        TOP ADR BY ROOM TYPE
      </div>

      <div className="h-[420px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day_label" />

            <YAxis />

            <Tooltip />

            <Legend />

            {roomNames.map(
              (roomName, index) => (
                <Line
                  key={roomName}
                  type="monotone"
                  dataKey={roomName}
                  stroke={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                  strokeWidth={2}
                  dot={false}
                />
              )
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}