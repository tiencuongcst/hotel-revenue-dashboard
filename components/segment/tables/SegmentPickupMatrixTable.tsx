"use client";

import type { CSSProperties } from "react";
import type { SegmentPickupDailyRow } from "@/types/segment/segment-pickup.types";
import {
  buildSegmentPickupMatrix,
  getDaysInSegmentMonth,
  type SegmentPickupMetric,
} from "@/components/segment/utils/segment-pivot";
import {
  formatSegmentCurrency,
  formatSegmentNumber,
} from "@/components/segment/utils/segment-format";

type Props = {
  rows: SegmentPickupDailyRow[];
  stayYear: number;
  stayMonth: number;
  metric?: SegmentPickupMetric;
  title?: string;
};

function getSegmentSortOrder(segment: string) {
  const key = segment.trim().toUpperCase();

  if (key === "OTA") return 10;
  if (key === "FIT" || key === "FIT DIRECT") return 20;
  if (key === "TA") return 30;
  if (key === "B2B") return 40;
  if (key === "CORP" || key === "CORPORATE") return 50;
  if (key === "FOC") return 60;
  if (key === "WALK-IN" || key === "WALK IN" || key === "WALKIN") return 70;
  if (key === "OTHER") return 9999;

  return 999;
}

function formatPickupValue(metric: SegmentPickupMetric, value: number) {
  if (metric === "pickup_rev") {
    return formatSegmentCurrency(value);
  }

  return formatSegmentNumber(value);
}

function getValueStyle(value: number): CSSProperties {
  if (value > 0) {
    return {
      background: "#ecfdf5",
      color: "#047857",
      fontWeight: 700,
    };
  }

  if (value < 0) {
    return {
      background: "#fff1f2",
      color: "#be123c",
      fontWeight: 700,
    };
  }

  return {
    color: "#64748b",
  };
}

export default function SegmentPickupMatrixTable({
  rows,
  stayYear,
  stayMonth,
  metric = "pickup_rev",
  title = "Daily Pickup by Market Segment",
}: Props) {
  const days = getDaysInSegmentMonth(stayYear, stayMonth);

  const matrixRows = buildSegmentPickupMatrix(rows, metric).sort((a, b) => {
    const orderA = getSegmentSortOrder(a.segment_group);
    const orderB = getSegmentSortOrder(b.segment_group);

    if (orderA !== orderB) return orderA - orderB;

    return a.segment_group.localeCompare(b.segment_group);
  });

  const border = "1px solid #e2e8f0";

  const headerCell: CSSProperties = {
    border,
    background: "#f8f3e4",
    padding: "9px 10px",
    textAlign: "center",
    verticalAlign: "top",
    fontSize: 12,
    fontWeight: 800,
    color: "#0f172a",
    whiteSpace: "nowrap",
  };

  const bodyCell: CSSProperties = {
    border,
    padding: "8px 10px",
    textAlign: "right",
    fontSize: 11,
    fontVariantNumeric: "tabular-nums",
    whiteSpace: "nowrap",
  };

  return (
    <section
      style={{
        border,
        borderRadius: 14,
        background: "#ffffff",
        boxShadow: "0 1px 6px rgba(15,23,42,0.08)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 16px",
          borderBottom: border,
          background: "#ffffff",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 800,
            color: "#0f172a",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            margin: "6px 0 0",
            fontSize: 13,
            color: "#64748b",
          }}
        >
          Chênh lệch giữa Pace 2 và Pace 1
        </p>
      </div>

      <div style={{ overflowX: "auto", padding: 16 }}>
        <table
          style={{
            minWidth: 1280,
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  ...headerCell,
                  position: "sticky",
                  left: 0,
                  zIndex: 2,
                  width: 150,
                  textAlign: "left",
                }}
              >
                Segment
              </th>

              {days.map((day) => (
                <th key={day} style={{ ...headerCell, width: 78 }}>
                  {String(day).padStart(2, "0")}
                </th>
              ))}

              <th
                style={{
                  ...headerCell,
                  position: "sticky",
                  right: 0,
                  zIndex: 2,
                  width: 130,
                }}
              >
                TOTAL
              </th>
            </tr>
          </thead>

          <tbody>
            {matrixRows.map((row, rowIndex) => (
              <tr
                key={row.segment_group}
                style={{
                  background: rowIndex % 2 === 0 ? "#ffffff" : "#f8fafc",
                }}
              >
                <td
                  style={{
                    border,
                    padding: "8px 10px",
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    background: rowIndex % 2 === 0 ? "#ffffff" : "#f8fafc",
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#0f172a",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.segment_group}
                </td>

                {days.map((day) => {
                  const value = row.days[day] ?? 0;

                  return (
                    <td
                      key={`${row.segment_group}-${day}`}
                      style={{
                        ...bodyCell,
                        ...getValueStyle(value),
                      }}
                    >
                      {value === 0 ? "-" : formatPickupValue(metric, value)}
                    </td>
                  );
                })}

                <td
                  style={{
                    ...bodyCell,
                    position: "sticky",
                    right: 0,
                    zIndex: 1,
                    background: "#dcfce7",
                    color: row.total < 0 ? "#be123c" : "#064e3b",
                    fontWeight: 900,
                  }}
                >
                  {formatPickupValue(metric, row.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}