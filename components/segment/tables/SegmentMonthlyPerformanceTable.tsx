"use client";

import type { CSSProperties } from "react";
import type { SegmentMonthlyPerformanceRow } from "@/types/segment/segment-performance.types";
import {
  formatSegmentAdr,
  formatSegmentCurrency,
  formatSegmentNumber,
  formatSegmentPercent,
} from "@/components/segment/utils/segment-format";

type Props = {
  rows: SegmentMonthlyPerformanceRow[];
};

function isZero(value: number | null | undefined) {
  return Number(value ?? 0) === 0;
}

export default function SegmentMonthlyPerformanceTable({ rows }: Props) {
  const totalOtb = rows.reduce((sum, row) => sum + Number(row.otb ?? 0), 0);
  const totalRev = rows.reduce((sum, row) => sum + Number(row.rev ?? 0), 0);
  const totalAdr = totalOtb > 0 ? totalRev / totalOtb : 0;

  const border = "1px solid #d9e2ec";

  const th: CSSProperties = {
    border,
    background: "#fbf6e6",
    padding: "10px 12px",
    textAlign: "center",
    verticalAlign: "top",
    fontSize: 13,
    fontWeight: 800,
    color: "#0f172a",
    whiteSpace: "nowrap",
  };

  const td: CSSProperties = {
    border,
    padding: "8px 12px",
    fontSize: 13,
    color: "#0f172a",
    lineHeight: 1.25,
    fontVariantNumeric: "tabular-nums",
    whiteSpace: "nowrap",
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border,
        borderRadius: 10,
        overflow: "hidden",
        background: "#ffffff",
        boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <colgroup>
          <col style={{ width: "28%" }} />
          <col style={{ width: "16%" }} />
          <col style={{ width: "26%" }} />
          <col style={{ width: "14%" }} />
          <col style={{ width: "16%" }} />
        </colgroup>

        <thead>
          <tr>
            <th style={th}>Market Segment</th>
            <th style={th}>Room Sold</th>
            <th style={th}>Revenue</th>
            <th style={th}>POR</th>
            <th style={th}>ADR</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr
              key={`${row.stay_month}-${row.segment_group}`}
              style={{
                background: index % 2 === 0 ? "#ffffff" : "#f8fafc",
              }}
            >
              <td
                style={{
                  ...td,
                  textAlign: "center",
                  fontWeight: 800,
                }}
              >
                {row.segment_group}
              </td>

              <td
                style={{
                  ...td,
                  textAlign: "center",
                }}
              >
                {isZero(row.otb) ? "-" : formatSegmentNumber(row.otb)}
              </td>

              <td
                style={{
                  ...td,
                  textAlign: "right",
                }}
              >
                {isZero(row.rev) ? "-" : formatSegmentCurrency(row.rev)}
              </td>

              <td
                style={{
                  ...td,
                  textAlign: "center",
                }}
              >
                {formatSegmentPercent(row.rev_share)}
              </td>

              <td
                style={{
                  ...td,
                  textAlign: "right",
                }}
              >
                {isZero(row.adr) ? "-" : formatSegmentAdr(row.adr)}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr
            style={{
              background: "#dcfce7",
              color: "#064e3b",
              fontWeight: 900,
            }}
          >
            <td
              style={{
                ...td,
                textAlign: "center",
                fontWeight: 900,
                color: "#064e3b",
              }}
            >
              TOTAL
            </td>

            <td
              style={{
                ...td,
                textAlign: "center",
                fontWeight: 900,
                color: "#064e3b",
              }}
            >
              {formatSegmentNumber(totalOtb)}
            </td>

            <td
              style={{
                ...td,
                textAlign: "right",
                fontWeight: 900,
                color: "#064e3b",
              }}
            >
              {formatSegmentCurrency(totalRev)}
            </td>

            <td
              style={{
                ...td,
                textAlign: "center",
                fontWeight: 900,
                color: "#064e3b",
              }}
            >
              100.0%
            </td>

            <td
              style={{
                ...td,
                textAlign: "right",
                fontWeight: 900,
                color: "#064e3b",
              }}
            >
              {formatSegmentAdr(totalAdr)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}