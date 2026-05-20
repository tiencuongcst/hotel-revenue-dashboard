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

  const days = Object.keys(rows[0].daily_values || {});

  function formatValue(value?: number) {
    if (formatType === "currency") return formatCurrency(value);
    if (formatType === "percent") return formatPercent(value);
    return formatNumber(value);
  }

  return (
    <div className="rounded-xl border bg-white">
      <div className="border-b p-4 font-bold">{title}</div>

      <div className="room-report-table-wrapper max-h-[70vh]">
        <table className="room-report-table">
          <thead className="sticky top-0 z-20">
            <tr>
              <th className="room-type-cell sticky left-0 z-30 bg-gray-100 text-xs font-bold uppercase tracking-wide">
                ROOM TYPE
              </th>

              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}

              <th className="sticky right-0 z-30 bg-gray-100 font-bold text-gray-950">
                Month Total
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.room_type}>
                <td className="room-type-cell sticky left-0 z-10 bg-white">
                  {row.room_name}
                </td>

                {days.map((day) => {
                  const value = row.daily_values?.[day];

                  return (
                    <td
                      key={day}
                      className={getRoomCellClassName({
                        value,
                        formatType,
                      })}
                    >
                      {formatValue(value)}
                    </td>
                  );
                })}

                <td
  className="
    sticky
    right-0
    z-10
    bg-white
    font-extrabold
    text-gray-950
  "
>
                  {formatValue(row.month_total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}