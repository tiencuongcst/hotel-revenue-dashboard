"use client";

import { RoomKpiRow } from "@/types/room/room-kpi.types";
import { formatNumber } from "@/lib/format/number";
import { formatCurrency } from "@/lib/format/currency";
import { formatPercent } from "@/lib/format/percent";
import { getRoomCellClassName } from "@/components/room/utils/room-color";

type Props = {
  title: string;
  rows: RoomKpiRow[];
  formatType?: "number" | "currency" | "percent";
};

export function RoomKpiTable({
  title,
  rows,
  formatType = "number",
}: Props) {
  if (!rows.length) {
    return <div className="rounded-xl border p-6">No data</div>;
  }

  const days = Array.from(
  new Set(
    rows.flatMap((row) =>
      Object.keys(row.daily_values || {})
    )
  )
).sort((a, b) => {
  const parseDay = (value: string) => {
    const [day, month] = value.split("-");

    const monthMap: Record<string, number> = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };

    return (monthMap[month] ?? 0) * 100 + Number(day);
  };

  return parseDay(a) - parseDay(b);
});

  function formatValue(value?: number) {
    if (formatType === "currency") return formatCurrency(value);
    if (formatType === "percent") return formatPercent(value);
    return formatNumber(value);
  }

  return (
    <div className="rounded-xl border bg-white">
      <div className="border-b p-4 font-bold">
        {title}
      </div>

      <div className="room-report-table-wrapper">
        <table className="room-report-table text-[12px]">
          <thead>
            <tr>
              <th
                className="
                  room-type-cell
                  sticky
                  left-0
                  top-0
                  z-40
                  bg-gray-100
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-wide
                "
              >
                ROOM TYPE
              </th>

              {days.map((day) => (
                <th
                  key={day}
                  className="
                    sticky
                    top-0
                    z-30
                    bg-gray-100
                    text-[12px]
                  "
                >
                  {day}
                </th>
              ))}

              <th
                className="
                  month-total-cell
                  sticky
                  right-0
                  top-0
                  z-40
                  bg-gray-100
                  text-[12px]
                "
              >
                Month Total
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              const isTotalRow =
                row.room_type === "TOTAL";

              return (
                <tr
                  key={row.room_type}
                  className={
                    isTotalRow
                      ? "bg-gray-100"
                      : ""
                  }
                >
                  <td
                    className={`
                      room-type-cell
                      sticky
                      left-0
                      z-10
                      text-[12px]
                      ${
                        isTotalRow
                          ? "bg-gray-100 total-row-cell"
                          : "bg-white"
                      }
                    `}
                  >
                    {row.room_name}
                  </td>

                  {days.map((day) => {
                    const value =
                      row.daily_values?.[day];

                    return (
                      <td
                        key={day}
                        className={`
                          ${getRoomCellClassName({
                            value,
                            formatType,
                          })}
                          text-[12px]
                          ${
                            isTotalRow
                              ? "bg-gray-100 total-row-cell"
                              : ""
                          }
                        `}
                      >
                        {formatValue(value)}
                      </td>
                    );
                  })}

                  <td
                    className={`
                      month-total-cell
                      sticky
                      right-0
                      z-10
                      text-[12px]
                      ${
                        isTotalRow
                          ? "bg-gray-100 total-row-cell"
                          : "bg-white"
                      }
                    `}
                  >
                    {formatValue(
                      row.month_total
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}