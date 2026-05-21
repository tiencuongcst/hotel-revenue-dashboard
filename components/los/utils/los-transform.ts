import type {
  LosMonthlyActualRow,
} from "@/types/los";

export function transformLosTrendData(
  rows: LosMonthlyActualRow[]
) {
  const monthMap = new Map<
    number,
    Record<string, string | number>
  >();

  for (const row of rows) {
    const existing =
      monthMap.get(row.stay_month) ??
      ({
        stay_month: row.stay_month,
        stay_month_label:
          row.stay_month_label,
      } as Record<
        string,
        string | number
      >);

    existing[
      `los_${row.segment_group}`
    ] = row.avg_los;

    existing[
      `lead_${row.segment_group}`
    ] = row.avg_lead_time;

    monthMap.set(
      row.stay_month,
      existing
    );
  }

  return Array.from(
    monthMap.values()
  ).sort(
    (a, b) =>
      Number(a.stay_month) -
      Number(b.stay_month)
  );
}