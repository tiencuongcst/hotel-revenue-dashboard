export type RoomChartPoint = {
  day_label: string;
  values: Record<string, number>;
};

export type RoomChartResponse = {
  snapshot_report_date: string | null;

  adr_daily: RoomChartPoint[];

  occ_daily: RoomChartPoint[];
};