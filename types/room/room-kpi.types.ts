export type RoomKpiDailyValues = Record<string, number>;

export type RoomKpiRow = {
  room_type: string;
  room_name: string;
  display_order?: number | null;
  month_total: number;
  daily_values: RoomKpiDailyValues;
};

export type RoomKpiResponse = {
  snapshot_report_date: string | null;
  otb: RoomKpiRow[];
  occ: RoomKpiRow[];
  rev: RoomKpiRow[];
  adr: RoomKpiRow[];
  revpar: RoomKpiRow[];
};

export type RoomKpiFormatType =
  | "number"
  | "currency"
  | "percent";