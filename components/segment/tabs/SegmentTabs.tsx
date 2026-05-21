"use client";

import { useMemo, useState } from "react";
import type { SegmentMonthlyPerformanceRow } from "@/types/segment/segment-performance.types";
import type { SegmentPickupDailyRow } from "@/types/segment/segment-pickup.types";
import SegmentMonthlyPieChart from "@/components/segment/charts/SegmentMonthlyPieChart";
import SegmentMonthlyPerformanceTable from "@/components/segment/tables/SegmentMonthlyPerformanceTable";
import SegmentPickupMatrixTable from "@/components/segment/tables/SegmentPickupMatrixTable";

type Props = {
  performanceRows: SegmentMonthlyPerformanceRow[];
  pickupRows: SegmentPickupDailyRow[];
  stayYear: number;
  stayMonth: number;
};

function getSegmentSortOrder(segment: string) {
  const key = segment.trim().toUpperCase();

  if (key === "OTA") return 10;
  if (key === "FIT") return 20;
  if (key === "TA") return 30;
  if (key === "B2B") return 40;
  if (key === "CORPORATE" || key === "CORP") return 50;
  if (key === "FOC") return 60;
  if (key === "WALK-IN" || key === "WALK IN" || key === "WALKIN") return 70;
  if (key === "OTHER") return 9999;

  return 999;
}

function sortRows(rows: SegmentMonthlyPerformanceRow[]) {
  return [...rows].sort((a, b) => {
    const orderA = getSegmentSortOrder(a.segment_group);
    const orderB = getSegmentSortOrder(b.segment_group);

    if (orderA !== orderB) return orderA - orderB;

    return a.segment_group.localeCompare(b.segment_group);
  });
}

function buildYearTotalRows(
  rows: SegmentMonthlyPerformanceRow[],
  stayYear: number
): SegmentMonthlyPerformanceRow[] {
  const map = new Map<string, SegmentMonthlyPerformanceRow>();

  for (const row of rows) {
    const key = row.segment_group;

    if (!map.has(key)) {
      map.set(key, {
        ...row,
        stay_year: stayYear,
        stay_month: 0,
        month_label: String(stayYear),
        otb: 0,
        rev: 0,
        adr: 0,
        otb_share: 0,
        rev_share: 0,
      });
    }

    const item = map.get(key);
    if (!item) continue;

    item.otb += Number(row.otb ?? 0);
    item.rev += Number(row.rev ?? 0);
  }

  const values = Array.from(map.values());
  const totalRev = values.reduce((sum, row) => sum + Number(row.rev ?? 0), 0);
  const totalOtb = values.reduce((sum, row) => sum + Number(row.otb ?? 0), 0);

  return sortRows(
    values.map((row) => ({
      ...row,
      adr: row.otb > 0 ? row.rev / row.otb : 0,
      rev_share: totalRev > 0 ? (row.rev / totalRev) * 100 : 0,
      otb_share: totalOtb > 0 ? (row.otb / totalOtb) * 100 : 0,
    }))
  );
}

export default function SegmentTabs({
  performanceRows,
  pickupRows,
  stayYear,
  stayMonth,
}: Props) {
  const [activeTab, setActiveTab] = useState<"performance" | "pickup">(
    "performance"
  );

  const groupedRows = useMemo(() => {
    const map = new Map<number, SegmentMonthlyPerformanceRow[]>();

    for (const row of performanceRows) {
      if (!map.has(row.stay_month)) {
        map.set(row.stay_month, []);
      }

      map.get(row.stay_month)?.push(row);
    }

    return Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;

      return {
        month,
        title: new Date(stayYear, month - 1, 1).toLocaleString("en-US", {
          month: "short",
          year: "2-digit",
        }),
        rows: sortRows(map.get(month) ?? []),
      };
    });
  }, [performanceRows, stayYear]);

  const yearTotalRows = useMemo(
    () => buildYearTotalRows(performanceRows, stayYear),
    [performanceRows, stayYear]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={() => setActiveTab("performance")}
          style={{
            border: 0,
            borderRadius: 8,
            padding: "9px 20px",
            background: activeTab === "performance" ? "#b91c1c" : "#065f46",
            color: "#ffffff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Performance
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("pickup")}
          style={{
            border: 0,
            borderRadius: 8,
            padding: "9px 20px",
            background: activeTab === "pickup" ? "#b91c1c" : "#065f46",
            color: "#ffffff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Daily Pickup
        </button>
      </div>

      {activeTab === "performance" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {groupedRows.map((group) => (
            <section
              key={group.month}
              style={{
                width: "fit-content",
                maxWidth: "100%",
                overflowX: "auto",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                background: "#ffffff",
                boxShadow: "0 1px 6px rgba(15,23,42,0.08)",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: "8px 16px",
                  fontWeight: 800,
                  fontSize: 16,
                  borderBottom: "1px solid #e2e8f0",
                  color: "#0f172a",
                }}
              >
                {group.title}
              </div>

              {group.rows.length === 0 ? (
                <div
                  style={{
                    width: 1120,
                    minHeight: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#64748b",
                    fontWeight: 600,
                  }}
                >
                  No data for {group.title}
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "720px 400px",
                    gap: 16,
                    width: 1152,
                    padding: 16,
                    background: "#ffffff",
                  }}
                >
                  <SegmentMonthlyPerformanceTable rows={group.rows} />
                  <SegmentMonthlyPieChart rows={group.rows} title="POR" />
                </div>
              )}
            </section>
          ))}

          <section
            style={{
              width: "fit-content",
              maxWidth: "100%",
              overflowX: "auto",
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              background: "#ffffff",
              boxShadow: "0 1px 6px rgba(15,23,42,0.08)",
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "8px 16px",
                fontWeight: 800,
                fontSize: 16,
                borderBottom: "1px solid #e2e8f0",
                color: "#0f172a",
              }}
            >
              {stayYear}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "720px 400px",
                gap: 16,
                width: 1152,
                padding: 16,
                background: "#ffffff",
              }}
            >
              <SegmentMonthlyPerformanceTable rows={yearTotalRows} />
              <SegmentMonthlyPieChart rows={yearTotalRows} title="POR" />
            </div>
          </section>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <SegmentPickupMatrixTable
            rows={pickupRows}
            stayYear={stayYear}
            stayMonth={stayMonth}
            metric="pickup_otb"
            title="Daily Pickup OTB"
          />

          <SegmentPickupMatrixTable
            rows={pickupRows}
            stayYear={stayYear}
            stayMonth={stayMonth}
            metric="pickup_rev"
            title="Daily Pickup Revenue"
          />
        </div>
      )}
    </div>
  );
}