import type { SegmentMonthlyPerformanceRow } from "@/types/segment/segment-performance.types";
import type { SegmentPickupDailyRow } from "@/types/segment/segment-pickup.types";

export type SegmentPickupMetric = "pickup_otb" | "pickup_rev" | "pickup_adr";

export type SegmentPickupMatrixRow = {
  segment_group: string;
  total: number;
  days: Record<number, number>;
};

export function buildSegmentPickupMatrix(
  rows: SegmentPickupDailyRow[],
  metric: SegmentPickupMetric
): SegmentPickupMatrixRow[] {
  const map = new Map<string, SegmentPickupMatrixRow>();

  for (const row of rows) {
    const key = row.segment_group;

    if (!map.has(key)) {
      map.set(key, {
        segment_group: key,
        total: 0,
        days: {},
      });
    }

    const matrixRow = map.get(key);
    if (!matrixRow) continue;

    const value = Number(row[metric] ?? 0);

    matrixRow.days[row.stay_day] = value;
    matrixRow.total += value;
  }

  return Array.from(map.values()).sort((a, b) =>
    a.segment_group.localeCompare(b.segment_group)
  );
}

export function getDaysInSegmentMonth(year: number, month: number): number[] {
  const totalDays = new Date(year, month, 0).getDate();

  return Array.from({ length: totalDays }, (_, index) => index + 1);
}

export type SegmentPerformanceMetric = "otb" | "rev" | "adr" | "rev_share";

export type SegmentPerformanceMatrixRow = {
  segment_group: string;
  sort_order: number;
  total_otb: number;
  total_rev: number;
  total_adr: number;
  months: Record<number, SegmentMonthlyPerformanceRow>;
};

export function buildSegmentPerformanceMatrix(
  rows: SegmentMonthlyPerformanceRow[]
): SegmentPerformanceMatrixRow[] {
  const map = new Map<string, SegmentPerformanceMatrixRow>();

  for (const row of rows) {
    const key = row.segment_group;

    if (!map.has(key)) {
      map.set(key, {
        segment_group: key,
        sort_order: row.sort_order ?? 999,
        total_otb: 0,
        total_rev: 0,
        total_adr: 0,
        months: {},
      });
    }

    const matrixRow = map.get(key);
    if (!matrixRow) continue;

    matrixRow.months[row.stay_month] = row;
    matrixRow.total_otb += Number(row.otb ?? 0);
    matrixRow.total_rev += Number(row.rev ?? 0);
  }

  return Array.from(map.values())
    .map((row) => ({
      ...row,
      total_adr: row.total_otb > 0 ? row.total_rev / row.total_otb : 0,
    }))
    .sort((a, b) => a.sort_order - b.sort_order);
}

export function getSegmentPerformanceMonths(
  rows: SegmentMonthlyPerformanceRow[]
) {
  const monthMap = new Map<number, string>();

  for (const row of rows) {
    monthMap.set(row.stay_month, row.month_label);
  }

  return Array.from(monthMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([month, label]) => ({
      month,
      label,
    }));
}