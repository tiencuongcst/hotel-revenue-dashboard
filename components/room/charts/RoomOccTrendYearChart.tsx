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

import type { RoomOccTrendYearRow } from "@/types/room/room-kpi.types";

type Props = {
  rows: RoomOccTrendYearRow[];
};

const MONTHS = [
  { key: "01", label: "Jan" },
  { key: "02", label: "Feb" },
  { key: "03", label: "Mar" },
  { key: "04", label: "Apr" },
  { key: "05", label: "May" },
  { key: "06", label: "Jun" },
  { key: "07", label: "Jul" },
  { key: "08", label: "Aug" },
  { key: "09", label: "Sep" },
  { key: "10", label: "Oct" },
  { key: "11", label: "Nov" },
  { key: "12", label: "Dec" },
];

const COLORS = [
  "#0f766e",
  "#2563eb",
  "#dc2626",
  "#7c3aed",
  "#ea580c",
  "#0891b2",
  "#65a30d",
  "#be123c",
  "#4338ca",
  "#15803d",
  "#b45309",
];

export function RoomOccTrendYearChart({ rows }: Props) {
  const validRows = rows.filter((room) => {
    const roomKey = room.room_type || room.room_name;

    return (
      roomKey &&
      MONTHS.some(
        (month) =>
          room.values?.[month.key] !== null &&
          room.values?.[month.key] !== undefined
      )
    );
  });

  if (!validRows.length) {
    return (
      <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">
        No room trend data
      </div>
    );
  }

  const chartData = MONTHS.map((month) => {
    const item: Record<string, string | number | null> = {
      month: month.label,
    };

    validRows.forEach((room) => {
      const roomKey = room.room_type || room.room_name;
      const rawValue = room.values?.[month.key];

      if (!roomKey) return;

      item[roomKey] =
        rawValue === null || rawValue === undefined
          ? null
          : Number((rawValue * 100).toFixed(1));
    });

    return item;
  });

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-1 text-sm font-bold uppercase text-gray-800">
        Room Occupancy Trend by Room Type
      </div>

      <div className="mb-4 text-xs font-medium text-gray-500">
        Monthly OCC trend by room type
      </div>

      <div className="w-full overflow-x-auto">
        <LineChart
          width={1280}
          height={560}
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

          <XAxis
            dataKey="month"
            tick={{
              fontSize: 12,
              fill: "#4b5563",
            }}
            axisLine={{
              stroke: "#d1d5db",
            }}
            tickLine={false}
          />

          <YAxis
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            tick={{
              fontSize: 12,
              fill: "#4b5563",
            }}
            axisLine={{
              stroke: "#d1d5db",
            }}
            tickLine={false}
          />

          <Tooltip
            formatter={(value) => `${Number(value).toFixed(1)}%`}
            labelFormatter={(label) => `Month: ${label}`}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
              fontSize: 12,
            }}
          />

          <Legend
            verticalAlign="bottom"
            height={40}
            wrapperStyle={{
              fontSize: 12,
              paddingTop: 16,
            }}
          />

          {validRows.map((room, index) => {
            const roomKey = room.room_type || room.room_name;

            if (!roomKey) return null;

            return (
              <Line
                key={roomKey}
                type="monotone"
                dataKey={roomKey}
                name={room.room_name}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={{
                  r: 2,
                  strokeWidth: 1,
                }}
                activeDot={{
                  r: 5,
                  strokeWidth: 2,
                }}
                connectNulls={false}
              />
            );
          })}
        </LineChart>
      </div>
    </div>
  );
}