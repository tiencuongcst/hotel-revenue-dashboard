export function transformRoomChartData(
  rows: any[]
) {
  return rows.map((row) => ({
    day_label: row.day_label,
    ...row.values,
  }));
}