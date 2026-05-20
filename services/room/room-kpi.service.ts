import { createSupabaseServerClient }
from "@/lib/supabase/client";

import type {
  RoomKpiResponse,
  RoomKpiRow,
} from "@/types/room/room-kpi.types";

import type {
  RoomFilterParams,
} from "@/types/room/room-filter.types";

function sortRoomRows(
  rows: RoomKpiRow[]
): RoomKpiRow[] {

  return [...rows].sort((a, b) => {

    const orderA =
      a.display_order ?? 999999;

    const orderB =
      b.display_order ?? 999999;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.room_name.localeCompare(
      b.room_name
    );
  });
}

export async function getRoomKpi(
  params: RoomFilterParams
): Promise<RoomKpiResponse> {

  const supabase =
    createSupabaseServerClient();

  const { data, error } =
    await supabase.rpc(
      "rpc_room_kpi_tables",
      {
        p_hotel_code: params.hotelCode,
        p_year_stay: params.yearStay,
        p_month_stay: params.monthStay,
        p_report_date: params.reportDate,
      }
    );

  if (error) {

    console.error(error);

    throw new Error(
      "Failed to load room KPI data"
    );
  }

  if (!data) {

    return {
      snapshot_report_date: null,
      otb: [],
      occ: [],
      rev: [],
      adr: [],
      revpar: [],
    };
  }

  return {
    snapshot_report_date:
      data.snapshot_report_date,

    otb: sortRoomRows(data.otb ?? []),

    occ: sortRoomRows(data.occ ?? []),

    rev: sortRoomRows(data.rev ?? []),

    adr: sortRoomRows(data.adr ?? []),

    revpar: sortRoomRows(data.revpar ?? []),
  };
}