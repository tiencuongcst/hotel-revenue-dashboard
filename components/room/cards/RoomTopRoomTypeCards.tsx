import type { RoomKpiRow } from "@/types/room/room-kpi.types";
import { formatCurrency } from "@/lib/format/currency";
import { formatPercent } from "@/lib/format/percent";

type Props = {
  adrRows: RoomKpiRow[];
  occRows: RoomKpiRow[];
};

function getTopRow(rows: RoomKpiRow[]) {
  return [...rows]
    .filter((row) => Number(row.month_total) > 0)
    .sort((a, b) => Number(b.month_total ?? 0) - Number(a.month_total ?? 0))[0];
}

export function RoomTopRoomTypeCards({ adrRows, occRows }: Props) {
  const topAdr = getTopRow(adrRows);
  const topOcc = getTopRow(occRows);

  return (
    <div className="room-top-cards">
      <div className="room-top-card">
        <div className="room-top-card-label">Top ADR by Room Type</div>
        <div className="room-top-card-title">{topAdr?.room_name ?? "-"}</div>
        <div className="room-top-card-value">
          {topAdr ? formatCurrency(topAdr.month_total) : "-"}
        </div>
      </div>

      <div className="room-top-card">
        <div className="room-top-card-label">Top OCC by Room Type</div>
        <div className="room-top-card-title">{topOcc?.room_name ?? "-"}</div>
        <div className="room-top-card-value">
          {topOcc ? formatPercent(topOcc.month_total) : "-"}
        </div>
      </div>
    </div>
  );
}